import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#F9FAFB" },
        headerTintColor: "#1F2937",
        headerTitleStyle: { fontWeight: "600" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "#F9FAFB" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="pages/pastVisitsPage"
        options={{ headerTitle: "Past Visits" }}
      />
      <Stack.Screen
        name="pages/addVisitPage"
        options={{ headerTitle: "Add Visit" }}
      />
      <Stack.Screen
        name="pages/editVisitPage"
        options={{ headerTitle: "Edit Visit" }}
      />
    </Stack>
  );
}
