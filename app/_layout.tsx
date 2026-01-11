import { initializeDefaultData } from "@/lib/storageUtils";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    initializeDefaultData();
  }, []);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: 'Home' }} />
      <Stack.Screen name="pages/pastVisitsPage" options={{headerTitle: 'Past Visits'}} />
    </Stack>
  );
}
