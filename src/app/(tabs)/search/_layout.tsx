import { Stack } from "expo-router";

export default function SearchStack() {
  return (
    <Stack>


      <Stack.Screen name="index" options={{ headerShown: false, title: "Search" }} />
      <Stack.Screen name="[id]" options={{ title: "Accommodation", headerBackTitleVisible: true, headerBackTitle: "Back" }} />
      <Stack.Screen name="[id]/reviews" options={{ title: "", headerBackTitleVisible: true, headerBackTitle: "Back" }} />
      <Stack.Screen
        name="place-details"
        options={{
          headerTitle: "",

          headerBackTitleVisible: true,
          headerBackTitle: "Search",
        }}
      />
    </Stack>
  );
}
