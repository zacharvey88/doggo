import TripForm from "@/src/components/TripForm"
import { View, StyleSheet, Text } from "react-native"
import { AntDesign } from "@expo/vector-icons"
export default function AddTrip() {


  return (
    <View style={styles.container}>
      <View style={styles.swipe}>
        <AntDesign name="arrowdown"></AntDesign>
        <Text style={styles.swipeText}>swipe down to close</Text>
        <AntDesign name="arrowdown"></AntDesign>
      </View>
      <View style={styles.form}>
        <TripForm /> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  swipe: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  swipeText:{
    fontWeight: 'bold'
  },
  form: {
    flex: 1,
    justifyContent: 'center'
  }
})