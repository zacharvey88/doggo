import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ReviewsList from "@/src/components/ReviewsList";
export default function Reviews() {

  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ReviewsList id={id} table='reviews_airlines'/>
    </View>
  );}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }
  });