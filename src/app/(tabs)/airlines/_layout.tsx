import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "Airlines" }} />
      <Stack.Screen name="[id]" options={{ title: "", headerBackTitle: "Back", headerBackTitleVisible: true }} />
      <Stack.Screen name="[id]/reviews" options={{ title: "", headerBackTitle: "Back", headerBackTitleVisible: true }} />
    </Stack>
  );
}
