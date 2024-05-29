import { View, StyleSheet, Text } from "react-native"
import AccommodationForm from "../components/AccommodationForm"

export default function AddAccommodation() {

    return (
        <View style={styles.container}>
        <View style={styles.form}>
          <AccommodationForm/>
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