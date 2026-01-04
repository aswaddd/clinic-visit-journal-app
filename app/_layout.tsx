import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import migrations from "../drizzle/migrations";

export const DATABASE_NAME = "db.db";

const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb);

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME} options={{ enableChangeListener: true }} useSuspense>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: "Home" }} />
          <Stack.Screen name="pages/pastVisitsPage" options={{ headerTitle: "Past Visits" }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
