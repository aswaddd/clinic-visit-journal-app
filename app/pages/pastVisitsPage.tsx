import PastVisit from "@/components/PastVisit";
import { loadVisits, VisitRecord } from "@/lib/storageUtils";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PastVisitsPage() {
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {visits.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No visit records yet.</Text>
        </View>
      ) : (
        visits.map((visit, i) => (
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
