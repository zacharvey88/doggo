import { View } from "@/src/components/Themed";
import { Stack } from "expo-router";
import { Text } from "react-native-elements";

const Shops = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Shops" }} />
      <Text>Hi from the Shops Page</Text>
    </View>
  );
};

export default Shops;
