import Button from "@/components/Button";
import { extractVisitDataFromText } from "@/lib/llmUtils";
import { extractTextFromImage } from "@/lib/ocrUtils";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LLAMA3_2_1B, useLLM } from "react-native-executorch";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const llm = useLLM({ model: LLAMA3_2_1B });

  useEffect(() => {
    console.log("LLM State:", {
      isReady: llm.isReady,
      downloadProgress: llm.downloadProgress,
      error: llm.error,
    });
  }, [llm.isReady, llm.error, llm.downloadProgress]);

  const toggleAddVisitModal = () => {
    setAddModalVisible(!addModalVisible);
  };

  const handleInputVisitForm = () => {
    setAddModalVisible(false);
    router.push("../pages/addVisitPage");
  };

  const handleSeePastVisit = () => {
    router.push("../pages/pastVisitsPage");
  };

  const handleImportVisit = () => {
    Alert.alert("Import Visit", "Choose source", [
      {
        text: "Photos",
        onPress: async () => {
          if (!llm.isReady) {
            Alert.alert(
              "Model Loading",
              `The AI model is still loading (${(llm.downloadProgress * 100).toFixed(0)}%). Please wait a moment and try again.`,
            );
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync();
          if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const ocrText = await extractTextFromImage(imageUri);
            console.log("Extracted OCR Text:", ocrText);

            const formData = await extractVisitDataFromText(ocrText, llm);
            console.log(formData);
          }
        },
      },
      {
        text: "Files",
        onPress: async () => {
          const result = await DocumentPicker.getDocumentAsync();
          if (result.assets?.length) console.log("success");
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {llm.isReady ? (
        <Text style={{ padding: 5, color: "green", fontSize: 12 }}>
          ✓ AI Model Ready
        </Text>
      ) : (
        <Text style={{ padding: 5, color: "orange", fontSize: 12 }}>
          ⏳ Loading AI Model... {(llm.downloadProgress * 100).toFixed(0)}%
        </Text>
      )}
      <View
        style={{
          flex: 1,
          gap: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          label="Add visit record"
          onPress={() => toggleAddVisitModal()}
          style={styles.button}
        />
        <Button
          label="See past visits"
          onPress={handleSeePastVisit}
          style={styles.button}
        />
      </View>
      <Modal visible={addModalVisible} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => toggleAddVisitModal()}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Visit Record</Text>
            <Button label="Scan Visit" style={styles.buttonModal} />
            <Button
              label="Input Visit Form"
              style={styles.buttonModal}
              onPress={handleInputVisitForm}
            />
            <Button
              label="Import Visit"
              style={styles.buttonModal}
              onPress={handleImportVisit}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#007AFF",
  },
  buttonModal: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#007AFF",
    width: "90%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 18,
    width: "80%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
