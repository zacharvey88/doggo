import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput } from "react-native";
import { Button } from "react-native-elements";

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
          if (!airline)
              errors.airline = "Airline is required";
          if (!beaches)
              errors.beaches = "Beaches is required";
          if (!vets)
            errors.vets = "Vets is required";
          if (!parks)
              errors.parks = "Parks is required";
          if (!shops)
              errors.shops = "Shops is required";
        
        setErrors(errors)

        return Object.keys(errors).length === 0;
    }

    const handleSubmit = () => {
        console.log('hi');
        

        if (validateForm()) {
            console.log("Submitted", accommodation, airline, beaches, vets, parks, shops);
            setAccomodation("")
            setAirline("")
            setBeaches("")
            setVets("")
            setParks("")
            setShops("")
            setErrors({})
        }
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
        {errors.accommodation ? (
          <Text style={styles.errorstext}>{errors.accommodation}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter Airline Name"
          value={airline}
          onChangeText={setAirline}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.airline ? (
          <Text style={styles.errorstext}>{errors.airline}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter Beaches Name"
          value={beaches}
          onChangeText={setBeaches}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.beaches ? (
          <Text style={styles.errorstext}>{errors.beaches}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter Vets Name"
          value={vets}
          onChangeText={setVets}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.vets ? (
          <Text style={styles.errorstext}>{errors.vets}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter Parks Name"
          value={parks}
          onChangeText={setParks}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.parks ? (
          <Text style={styles.errorstext}>{errors.parks}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter Shops Name"
          value={shops}
          onChangeText={setShops}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.shops ? (
          <Text style={styles.errorstext}>{errors.shops}</Text>
            ) : null}
            <Button title="Login" onPress={() => {handleSubmit()}} />
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
    },
    errorstext: {
        color: 'red',
        marginBottom: 10
    }
})