import { Stack } from 'expo-router'
import Vets from '../../icons/Vets'

export default function SearchStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Search" }} />
      <Stack.Screen name="[id]" options={{ title: "Accommodation" }} />
      <Stack.Screen name="[id]/reviews" options={{ title: "Reviews" }} />
      {/* <Stack.Screen name="Vets" options={{ title: "Vets" }} />
      <Stack.Screen name="Parks" options={{ title: "Parks" }} />
      <Stack.Screen name="Shops" options={{ title: "Shops" }} />
      <Stack.Screen name="Beaches" options={{ title: "Beaches" }} /> */}
    </Stack>
  );
}