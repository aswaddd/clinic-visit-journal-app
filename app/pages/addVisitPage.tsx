import { addVisit } from "@/lib/storageUtils";
import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddVisitPage() {
  const params = useLocalSearchParams();
  const initialFormData = params.formData
    ? typeof params.formData === "string"
      ? JSON.parse(params.formData)
      : params.formData
    : null;

  const [formData, setFormData] = useState({
    dateTime: initialFormData?.dateTime || "",
    location: initialFormData?.location || "",
    doctor: initialFormData?.doctor || "",
    prescription: initialFormData?.prescription || "",
    diagnosis: initialFormData?.diagnosis || "",
    doctorNote: initialFormData?.doctorNote || "",
    personalNote: initialFormData?.personalNote || "",
    nextVisit: initialFormData?.nextVisit || "",
  });

  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [pickerField, setPickerField] = useState<"dateTime" | "nextVisit">(
    "dateTime",
  );
  const [tempDate, setTempDate] = useState(new Date());
  const [errors, setErrors] = useState({
    dateTime: false,
    location: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === "dateTime" || field === "location") {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const openDatePicker = (field: "dateTime" | "nextVisit") => {
    setPickerField(field);
    setPickerMode("date");
    setPickerVisible(true);
  };

  const handleDateTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleNextPicker = () => {
    setPickerMode("time");
  };

  const handleDonePicker = () => {
    const formatted = tempDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setFormData((prev) => ({
      ...prev,
      [pickerField]: formatted,
    }));
    if (pickerField === "dateTime") {
      setErrors((prev) => ({ ...prev, dateTime: false }));
    }
    setPickerVisible(false);
    setPickerMode("date");
  };

  const validateForm = async () => {
    const newErrors = {
      dateTime: formData.dateTime.trim() === "",
      location: formData.location.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.dateTime && !newErrors.location) {
      try {
        await addVisit(formData);
        Alert.alert("Success", "Visit record saved successfully!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } catch {
        Alert.alert("Error", "Failed to save visit record. Please try again.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <Text style={styles.recordTitle}>Create New Visit Record</Text>
          <Text>Fill in the details from your medical visit below.</Text>
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="calendar"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.label}>Date and Time</Text>
          </View>
          <TouchableOpacity onPress={() => openDatePicker("dateTime")}>
            <TextInput
              style={[styles.input, errors.dateTime && styles.inputError]}
              placeholder="e.g., January 17, 2026 at 2:00 PM"
              value={formData.dateTime}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          {errors.dateTime && (
            <Text style={styles.errorText}>Required field</Text>
          )}
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="map-pin"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.label}>Location</Text>
          </View>
          <TextInput
            style={[styles.input, errors.location && styles.inputError]}
            placeholder="e.g., City Hospital"
            value={formData.location}
            onChangeText={(value) => handleInputChange("location", value)}
          />
          {errors.location && (
            <Text style={styles.errorText}>Required field</Text>
          )}
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="user"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.label}>Doctor</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="e.g., Dr. Smith"
            value={formData.doctor}
            onChangeText={(value) => handleInputChange("doctor", value)}
          />
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="clipboard"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.label}>Diagnosis</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="e.g., Common cold"
            value={formData.diagnosis}
            onChangeText={(value) => handleInputChange("diagnosis", value)}
          />
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="heart"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.label}>Prescription</Text>
          </View>
          <TextInput
            style={styles.multilineInput}
            placeholder="e.g., Ibuprofen 400mg, twice daily"
            value={formData.prescription}
            onChangeText={(value) => handleInputChange("prescription", value)}
            multiline
          />
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="book"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.label}>Doctors Note</Text>
          </View>
          <TextInput
            style={styles.multilineInput}
            placeholder="Notes from the doctor"
            value={formData.doctorNote}
            onChangeText={(value) => handleInputChange("doctorNote", value)}
            multiline
          />
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="pen-tool"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.label}>Personal Note</Text>
          </View>
          <TextInput
            style={styles.multilineInput}
            placeholder="Your personal observations"
            value={formData.personalNote}
            onChangeText={(value) => handleInputChange("personalNote", value)}
            multiline
          />
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Feather
              name="clock"
              size={24}
              color="blue"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.label}>Next Visit Date and Time</Text>
          </View>
          <TouchableOpacity onPress={() => openDatePicker("nextVisit")}>
            <TextInput
              style={styles.input}
              placeholder="e.g., February 1, 2026 at 10:00 AM"
              value={formData.nextVisit}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={validateForm}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={pickerVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={tempDate}
              mode={pickerMode}
              display="spinner"
              onChange={handleDateTimeChange}
            />
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={
                pickerMode === "date" ? handleNextPicker : handleDonePicker
              }
            >
              <Text style={styles.pickerButtonText}>
                {pickerMode === "date" ? "Next" : "Done"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 20,
    paddingBottom: 40,
  },
  container: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#007AFF",
    justifyContent: "flex-start",
    padding: 30,
    width: "90%",
    gap: 20,
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  multilineInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
  saveButton: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pickerButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
  },
  pickerButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
