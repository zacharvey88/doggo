import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Airlines" }} />
      <Stack.Screen name="[id]" options={{ title: "Airline Policies" }} />
      <Stack.Screen name="[id]/reviews" options={{ title: "Reviews" }} />
    </Stack>
  );
}
