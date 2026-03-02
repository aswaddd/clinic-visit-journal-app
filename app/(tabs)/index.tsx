import { checkLLMReady, processImageAndNavigate } from "@/lib/importUtils";
import Feather from "@expo/vector-icons/Feather";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LLAMA3_2_1B, useLLM } from "react-native-executorch";
import { SafeAreaView } from "react-native-safe-area-context";

const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export default function Index() {
  const [isProcessing, setIsProcessing] = useState(false);
  const llm = useLLM({ model: LLAMA3_2_1B });

  useEffect(() => {
    console.log("LLM State:", {
      isReady: llm.isReady,
      downloadProgress: llm.downloadProgress,
      error: llm.error,
    });
  }, [llm.isReady, llm.error, llm.downloadProgress]);

  const handleCameraScan = async () => {
    if (!checkLLMReady(llm)) return;

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Camera access is needed to scan documents.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });
    if (!result.canceled) {
      await processImageAndNavigate(result.assets[0].uri, llm, setIsProcessing);
    }
  };

  const handlePhotoImport = async () => {
    if (!checkLLMReady(llm)) return;

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      await processImageAndNavigate(result.assets[0].uri, llm, setIsProcessing);
    }
  };

  const handleFileImport = async () => {
    if (!checkLLMReady(llm)) return;

    const result = await DocumentPicker.getDocumentAsync({
      type: IMAGE_MIME_TYPES,
    });
    if (result.assets?.length) {
      await processImageAndNavigate(result.assets[0].uri, llm, setIsProcessing);
    }
  };

  const handleImportVisit = () => {
    Alert.alert("Import Visit", "Choose source", [
      { text: "Photos", onPress: handlePhotoImport },
      { text: "Files", onPress: handleFileImport },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Clinic Journal</Text>
        <View style={styles.statusBadge}>
          <View
            style={[styles.statusDot, { backgroundColor: llm.isReady ? "#22C55E" : "#F59E0B" }]}
          />
          <Text style={styles.statusText}>
            {llm.isReady ? "AI Ready" : `Loading ${(llm.downloadProgress * 100).toFixed(0)}%`}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionLabel}>New Visit</Text>
        <View style={styles.row}>
          <ActionCard
            icon="camera"
            label="Scan"
            onPress={handleCameraScan}
          />
          <ActionCard
            icon="image"
            label="Import"
            onPress={handleImportVisit}
          />
          <ActionCard
            icon="edit-3"
            label="Manual"
            onPress={() => router.push("../pages/addVisitPage")}
          />
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 32 }]}>History</Text>
        <Pressable
          style={styles.historyCard}
          onPress={() => router.push("../pages/pastVisitsPage")}
        >
          <View style={styles.historyLeft}>
            <Feather name="clock" size={22} color="#3B82F6" />
            <Text style={styles.historyText}>View past visits</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </Pressable>
      </View>

      <Modal visible={isProcessing} transparent>
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Extracting visit data...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function ActionCard({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.actionCard} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Feather name={icon} size={24} color="#3B82F6" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  historyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  loadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  loadingText: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
});
