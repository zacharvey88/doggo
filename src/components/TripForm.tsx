import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput } from "react-native";

export default function TripForm() {
    const [accommodation, setAccomodation] = useState("")
    const [airline, setAirline] = useState("")
    const [beaches, setBeaches] = useState("");
    const [vets, setVets] = useState("")
    const [parks, setParks] = useState("");
    const [shops, setShops] = useState("");
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        let errors = {}

        if (!accommodation) errors.accommodation = "Accommodation is required";

    }




    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Accommodation Name"
          value={accommodation}
          onChangeText={setAccomodation}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Accommodation Name"
          value={airline}
          onChangeText={setAirline}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter  Name"
          value={beaches}
          onChangeText={setBeaches}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter  Name"
          value={vets}
          onChangeText={setVets}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter  Name"
          value={parks}
          onChangeText={setParks}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter  Name"
          value={shops}
          onChangeText={setShops}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.text}>
          Your selected accommodation is {accommodation}
        </Text>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
         flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1
    },
    text: {
        fontSize: 30,
        padding: 10
    }
})