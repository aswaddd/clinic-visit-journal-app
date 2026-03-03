import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FieldRecord from "./FieldRecord";

type Props = {
  id?: string;
  createdDate?: string;
  dateTime: string;
  location: string;
  doctor: string;
  prescription: string;
  diagnosis: string;
  doctorNote: string;
  personalNote: string;
  nextVisit: string;
};

function formatCreatedDate(createdDate?: string, id?: string): string | null {
  let iso: string | null = null;
  if (createdDate) iso = createdDate;
  else if (id && /^\d+$/.test(id)) iso = new Date(parseInt(id, 10)).toISOString();
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PastVisit(props: Props) {
  const [expanded, setExpanded] = useState(false);
  const createdLabel = formatCreatedDate(props.createdDate, props.id);

  const handleEdit = () => {
    router.push({
      pathname: "../pages/editVisitPage",
      params: { visitId: props.id || props.dateTime },
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.dateRow}>
          <Feather name="calendar" size={16} color="#3B82F6" />
          <Text style={styles.dateText}>{props.dateTime}</Text>
        </View>
        <Pressable onPress={handleEdit} hitSlop={8}>
          <Feather name="edit-2" size={18} color="#3B82F6" />
        </Pressable>
      </View>

      {props.location ? (
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={14} color="#9CA3AF" />
          <Text style={styles.locationText}>{props.location}</Text>
        </View>
      ) : null}

      {expanded && (
        <View style={styles.details}>
          <FieldRecord title="Doctor" icon="user" content={props.doctor} />
          <FieldRecord title="Diagnosis" icon="clipboard" content={props.diagnosis} />
          <FieldRecord title="Prescription" icon="heart" content={props.prescription} />
          <FieldRecord title="Doctor's Note" icon="book" content={props.doctorNote} />
          <FieldRecord title="Personal Note" icon="pen-tool" content={props.personalNote} />
          <FieldRecord title="Next Visit" icon="clock" content={props.nextVisit} />
        </View>
      )}

      <Pressable style={styles.toggleRow} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.toggleText}>{expanded ? "Show less" : "Show more"}</Text>
        <Feather name={expanded ? "chevron-up" : "chevron-down"} size={16} color="#3B82F6" />
      </Pressable>

      {createdLabel && (
        <Text style={styles.createdText}>Added {createdLabel}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  locationText: {
    fontSize: 14,
    color: "#6B7280",
  },
  details: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    gap: 14,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
  },
  createdText: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 10,
  },
});
