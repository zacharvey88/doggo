import { View } from "@/src/components/Themed";
import { Stack } from "expo-router";
import { Text } from "react-native-elements";

const Beaches = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Beaches" }} />
      <Text>Hi from the Beaches Page</Text>
    </View>
  );
};

export default Beaches 
