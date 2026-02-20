import Button from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
          onPress={() => toggleAddVisitModal}
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
          onPress={() => toggleAddVisitModal}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Visit Record</Text>
            <Button label="Scan Visit" style={styles.buttonModal} />
            <Button
              label="Input Visit Form"
              style={styles.buttonModal}
              onPress={handleInputVisitForm}
            />
            <Button label="Import Visit" style={styles.buttonModal} />
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
