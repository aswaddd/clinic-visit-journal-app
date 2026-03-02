import VisitForm, { VisitFormData } from "@/components/VisitForm";
import { addVisit } from "@/lib/storageUtils";
import { router, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";

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

export default function AddVisitPage() {
  const params = useLocalSearchParams();
  const initialData: VisitFormData = params.formData
    ? JSON.parse(params.formData as string)
    : EMPTY_FORM;

  const handleSave = async (data: VisitFormData) => {
    try {
      await addVisit(data);
      Alert.alert("Success", "Visit record saved!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Error", "Failed to save. Please try again.");
    }
  };

  return (
    <VisitForm
      title="New Visit"
      subtitle="Fill in the details from your medical visit."
      initialData={initialData}
      onSave={handleSave}
    />
  );
}
