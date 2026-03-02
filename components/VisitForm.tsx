import Feather from "@expo/vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export interface VisitFormData {
  dateTime: string;
  location: string;
  doctor: string;
  prescription: string;
  diagnosis: string;
  doctorNote: string;
  personalNote: string;
  nextVisit: string;
}

type FieldDef = {
  key: keyof VisitFormData;
  label: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  placeholder: string;
  multiline?: boolean;
  isDate?: boolean;
  required?: boolean;
};

const FIELDS: FieldDef[] = [
  { key: "dateTime", label: "Date & Time", icon: "calendar", placeholder: "Select date and time", isDate: true, required: true },
  { key: "location", label: "Location", icon: "map-pin", placeholder: "e.g., City Hospital", required: true },
  { key: "doctor", label: "Doctor", icon: "user", placeholder: "e.g., Dr. Smith" },
  { key: "diagnosis", label: "Diagnosis", icon: "clipboard", placeholder: "e.g., Common cold" },
  { key: "prescription", label: "Prescription", icon: "heart", placeholder: "e.g., Ibuprofen 400mg, twice daily", multiline: true },
  { key: "doctorNote", label: "Doctor's Note", icon: "book", placeholder: "Notes from the doctor", multiline: true },
  { key: "personalNote", label: "Personal Note", icon: "pen-tool", placeholder: "Your personal observations", multiline: true },
  { key: "nextVisit", label: "Next Visit", icon: "clock", placeholder: "Select next visit date", isDate: true },
];

interface Props {
  title: string;
  subtitle: string;
  initialData: VisitFormData;
  onSave: (data: VisitFormData) => void;
  onDelete?: () => void;
}

export default function VisitForm({ title, subtitle, initialData, onSave, onDelete }: Props) {
  const [formData, setFormData] = useState<VisitFormData>(initialData);
  const [errors, setErrors] = useState({ dateTime: false, location: false });
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [pickerField, setPickerField] = useState<"dateTime" | "nextVisit">("dateTime");
  const [tempDate, setTempDate] = useState(new Date());

  const handleChange = (key: keyof VisitFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "dateTime" || key === "location") {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const openDatePicker = (field: "dateTime" | "nextVisit") => {
    setPickerField(field);
    setPickerMode("date");
    setPickerVisible(true);
  };

  const handleDateChange = (_: any, date?: Date) => {
    if (date) setTempDate(date);
  };

  const handlePickerAction = () => {
    if (pickerMode === "date") {
      setPickerMode("time");
      return;
    }
    const formatted = tempDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    handleChange(pickerField, formatted);
    setPickerVisible(false);
    setPickerMode("date");
  };

  const handleSave = () => {
    const newErrors = {
      dateTime: !formData.dateTime.trim(),
      location: !formData.location.trim(),
    };
    setErrors(newErrors);
    if (!newErrors.dateTime && !newErrors.location) {
      onSave(formData);
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {FIELDS.map((field) => (
          <View key={field.key} style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Feather name={field.icon} size={18} color="#3B82F6" />
              <Text style={styles.label}>{field.label}</Text>
              {field.required && <Text style={styles.required}>*</Text>}
            </View>

            {field.isDate ? (
              <Pressable onPress={() => openDatePicker(field.key as "dateTime" | "nextVisit")}>
                <TextInput
                  style={[
                    styles.input,
                    field.required && errors[field.key as "dateTime" | "location"] && styles.inputError,
                  ]}
                  placeholder={field.placeholder}
                  placeholderTextColor="#9CA3AF"
                  value={formData[field.key]}
                  editable={false}
                  pointerEvents="none"
                />
              </Pressable>
            ) : (
              <TextInput
                style={[
                  field.multiline ? styles.multilineInput : styles.input,
                  field.required && errors[field.key as "dateTime" | "location"] && styles.inputError,
                ]}
                placeholder={field.placeholder}
                placeholderTextColor="#9CA3AF"
                value={formData[field.key]}
                onChangeText={(v) => handleChange(field.key, v)}
                multiline={field.multiline}
              />
            )}

            {field.required && errors[field.key as "dateTime" | "location"] && (
              <Text style={styles.errorText}>This field is required</Text>
            )}
          </View>
        ))}

        <View style={styles.actions}>
          {onDelete && (
            <Pressable style={styles.deleteBtn} onPress={onDelete}>
              <Feather name="trash-2" size={18} color="#EF4444" />
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          )}
          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Visit</Text>
          </Pressable>
        </View>
      </View>

      <Modal visible={pickerVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>
              {pickerMode === "date" ? "Select Date" : "Select Time"}
            </Text>
            <DateTimePicker
              value={tempDate}
              mode={pickerMode}
              display="spinner"
              onChange={handleDateChange}
            />
            <Pressable style={styles.pickerBtn} onPress={handlePickerAction}>
              <Text style={styles.pickerBtnText}>
                {pickerMode === "date" ? "Next" : "Done"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  fieldGroup: {
    marginTop: 20,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  required: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#1F2937",
  },
  multilineInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#1F2937",
    minHeight: 90,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 28,
    gap: 12,
  },
  saveBtn: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  deleteText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  pickerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  pickerBtn: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 16,
    alignItems: "center",
  },
  pickerBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
