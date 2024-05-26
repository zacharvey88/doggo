import { Stack } from "expo-router";

export default function SearchStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, headerBackTitleVisible: false }}
      />
      <Stack.Screen name="[id]" options={{ title: "Accommodation" }} />
      <Stack.Screen name="[id]/reviews" options={{ title: "Reviews" }} />
      <Stack.Screen
        name="place-details"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
