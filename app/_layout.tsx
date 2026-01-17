import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerTitle: "Home" }}
      />
      <Stack.Screen
        name="pages/pastVisitsPage"
        options={{ headerTitle: "Past Visits" }}
      />
      <Stack.Screen
        name="pages/addVisitPage"
        options={{ headerTitle: "Add New Visit" }}
      />
      <Stack.Screen
        name="pages/editVisitPage"
        options={{ headerTitle: "Edit Visit" }}
      />
    </Stack>
  );
}
