import { View, StyleSheet} from "react-native";
import { useLocalSearchParams } from "expo-router";
import ReviewsList from "@/src/components/review-components/ReviewsList";

export default function AccommodationReviews() {

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