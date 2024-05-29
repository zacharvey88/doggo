import TripForm from "@/src/components/TripForm"
import { View, StyleSheet, Text } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
export default function AddTrip() {

  const {airline_id, accommodation_id} = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TripForm airline_id={airline_id} accommodation_id={accommodation_id}/> 
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
  },
  slogan: {
    width: '50%'
  }
})