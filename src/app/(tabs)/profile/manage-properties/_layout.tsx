import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
        options={{ headerBackVisible: true, headerBackTitleVisible: true, headerBackTitle: "Back", headerTitle:"My Properties", headerShown:false}} />
      <Stack.Screen name="[id]" 
        options={{ headerTitle:"",headerBackTitle: "Back", headerShown:false }} />
    </Stack>
  );
}