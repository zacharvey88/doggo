import { View } from "@/src/components/Themed";
import { Stack } from "expo-router";
import { Text } from "react-native-elements";

const Parks = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Parks" }} />
      <Text>Hi from the Parks Page</Text>
    </View>
  );
};

export default Parks;
