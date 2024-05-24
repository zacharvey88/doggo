import { Stack } from 'expo-router'

export default function SearchStack() {
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Search" }} />
      <Stack.Screen name="[id]" options={{ title: "Accommodation" }} />
      <Stack.Screen name="[id]/reviews" options={{ title: "Reviews" }} />
    </Stack>
  );
}