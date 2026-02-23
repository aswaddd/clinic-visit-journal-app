import Button from "@/components/Button";
import { extractVisitDataFromText } from "@/lib/llmUtils";
import { extractTextFromImage } from "@/lib/ocrUtils";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LLAMA3_2_1B, useLLM } from "react-native-executorch";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [isExtracting, setIsExtracting] = useState(false);
  const llm = useLLM({ model: LLAMA3_2_1B });

  useEffect(() => {
    console.log("LLM State:", {
      isReady: llm.isReady,
      downloadProgress: llm.downloadProgress,
      error: llm.error,
    });
  }, [llm.isReady, llm.error, llm.downloadProgress]);

  const toggleAddVisitModal = () => {
    Alert.alert("Add Visit Record", undefined, [
      {
        text: "Scan Visit",
        onPress: () => {
          // Scan functionality
        },
      },
      {
        text: "Input Visit Form",
        onPress: handleInputVisitForm,
      },
      {
        text: "Import Visit",
        onPress: handleImportVisit,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleInputVisitForm = () => {
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

            setIsExtracting(true);
            const formData = await extractVisitDataFromText(ocrText, llm);
            setIsExtracting(false);
            console.log(formData);
            router.push({
              pathname: "../pages/addVisitPage",
              params: { formData: JSON.stringify(formData) },
            });
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
      <Modal visible={isExtracting} transparent={true}>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
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
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
