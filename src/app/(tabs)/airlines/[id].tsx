import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Airline() {

  const { id } = useLocalSearchParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Airline" + id }} />
      <Text style={styles.title}>Airline {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchInput: {
    backgroundColor: "#e0e0e0",
  },
  loading: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
  },
});
