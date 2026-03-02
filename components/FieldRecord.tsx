import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  content: string;
};

export default function FieldRecord({ title, icon, content }: Props) {
  if (!content) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name={icon} size={16} color="#3B82F6" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  content: {
    fontSize: 15,
    color: "#1F2937",
    marginLeft: 24,
    lineHeight: 22,
  },
});
