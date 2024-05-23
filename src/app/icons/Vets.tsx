import { View } from "@/src/components/Themed"
import { Stack } from "expo-router"
import { Text } from "react-native-elements"

const Vets = () => {
    return (
        <View>
            <Stack.Screen options={{ title: 'Vets' }} />
            <Text>
                Hi from the Vets Page
            </Text>
        </View>
    )
}

export default Vets