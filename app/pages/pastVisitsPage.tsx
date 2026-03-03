import PastVisit from "@/components/PastVisit";
import { loadVisits, VisitRecord } from "@/lib/storageUtils";
import {
  filterVisits,
  sortVisits,
  type SortDir,
  type SortField,
} from "@/lib/visitFilters";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SORT_OPTIONS: { field: SortField; label: string }[] = [
  { field: "date", label: "Date" },
  { field: "created", label: "Recently Added" },
  { field: "location", label: "Location" },
  { field: "doctor", label: "Doctor" },
  { field: "diagnosis", label: "Diagnosis" },
];

export default function PastVisitsPage() {
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setVisits(await loadVisits());
        } catch (error) {
          console.error("Error loading visits:", error);
        } finally {
          setLoading(false);
        }
      })();
    }, []),
  );

  const displayedVisits = useMemo(() => {
    const filtered = filterVisits(visits, searchQuery);
    return sortVisits(filtered, sortField, sortDir);
  }, [visits, searchQuery, sortField, sortDir]);

  const handleSortPress = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {visits.length > 0 && (
        <View style={styles.toolbar}>
          <View style={styles.searchRow}>
            <Feather name="search" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by date, location, doctor..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.sortRow}>
            <Text style={styles.sortLabel}>Sort:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sortScrollContent}
            >
              {SORT_OPTIONS.map(({ field, label }) => (
              <Pressable
                key={field}
                style={[
                  styles.sortChip,
                  sortField === field && styles.sortChipActive,
                ]}
                onPress={() => handleSortPress(field)}
              >
                <Text
                  style={[
                    styles.sortChipText,
                    sortField === field && styles.sortChipTextActive,
                  ]}
                >
                  {label}
                </Text>
                {sortField === field && (
                  <Feather
                    name={sortDir === "asc" ? "chevron-up" : "chevron-down"}
                    size={14}
                    color="#3B82F6"
                  />
                )}
              </Pressable>
            ))}
            </ScrollView>
          </View>
        </View>
      )}

      {displayedVisits.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            {visits.length === 0
              ? "No visit records yet."
              : "No matches for your search."}
          </Text>
        </View>
      ) : (
        displayedVisits.map((visit, i) => (
          <PastVisit key={visit.id || `${visit.dateTime}-${i}`} {...visit} />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  toolbar: {
    gap: 12,
    marginBottom: 4,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1F2937",
    paddingVertical: 0,
  },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortScrollContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sortLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginRight: 4,
  },
  sortChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  sortChipActive: {
    backgroundColor: "#DBEAFE",
  },
  sortChipText: {
    fontSize: 13,
    color: "#6B7280",
  },
  sortChipTextActive: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
  },
});
