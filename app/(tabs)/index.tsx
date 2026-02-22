import Button from "@/components/Button";
import { extractTextFromImage } from "@/lib/ocrUtils";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [addModalVisible, setAddModalVisible] = useState(false);

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
          const result = await ImagePicker.launchImageLibraryAsync();
          if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const text = await extractTextFromImage(imageUri);
            console.log(text);
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
