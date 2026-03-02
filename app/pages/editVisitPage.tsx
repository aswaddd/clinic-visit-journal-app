import VisitForm, { VisitFormData } from "@/components/VisitForm";
import { deleteVisit, loadVisits, updateVisit } from "@/lib/storageUtils";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

const EMPTY_FORM: VisitFormData = {
  dateTime: "",
  location: "",
  doctor: "",
  prescription: "",
  diagnosis: "",
  doctorNote: "",
  personalNote: "",
  nextVisit: "",
};

export default function EditVisitPage() {
  const { visitId } = useLocalSearchParams<{ visitId: string }>();
  const [initialData, setInitialData] = useState<VisitFormData | null>(null);

  useEffect(() => {
    (async () => {
      if (!visitId) return;
      const visits = await loadVisits();
      const visit = visits.find((v) => v.id === visitId || v.dateTime === visitId);
      setInitialData(visit ?? EMPTY_FORM);
    })();
  }, [visitId]);

  const handleSave = async (data: VisitFormData) => {
    try {
      await updateVisit(visitId!, data);
      Alert.alert("Success", "Visit record updated!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Error", "Failed to update. Please try again.");
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Visit", "Are you sure you want to delete this record?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteVisit(visitId!);
            Alert.alert("Deleted", "Visit record removed.", [
              { text: "OK", onPress: () => router.back() },
            ]);
          } catch {
            Alert.alert("Error", "Failed to delete. Please try again.");
          }
        },
      },
    ]);
  };

  if (!initialData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <VisitForm
      title="Edit Visit"
      subtitle="Update the details of this visit record."
      initialData={initialData}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
});
