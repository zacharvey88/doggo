import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: false, headerBackTitleVisible: false }} />
       <Stack.Screen name="[id]" options={{ headerShown: false, headerBackTitleVisible: false}} />
    </Stack>
  );
}
