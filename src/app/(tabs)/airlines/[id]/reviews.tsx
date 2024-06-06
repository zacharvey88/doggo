import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ReviewsList from "@/src/components/review-components/ReviewsList";

export default function Reviews() {
  const { id, airline_name } = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Reviews for ${airline_name}`}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ReviewsList id={id} table='reviews_airlines' />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",

    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: '#3A90CD',
    marginBottom: 10,
    textAlign: "center",
  },
});
