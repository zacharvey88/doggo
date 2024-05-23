import { View, StyleSheet, Text} from "react-native";
import { useLocalSearchParams } from "expo-router";
import ReviewsList from "@/src/components/ReviewsList";

export default function accommodationReviews() {

    const { id } = useLocalSearchParams();
    
    return (
        <View style={styles.container}>
            <ReviewsList id={id} table='reviews_accommodation'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }
  });