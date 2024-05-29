import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Pressable, Platform, Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { useRouter, useNavigation } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import Accommodation from "../app/(tabs)/search/[id]";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TripForm({ airline_id, accommodation_id }: { airline_id?: number; accommodation_id?: number }) {
  //form state
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  const [destination, setDestination] = useState("");
  const [airline, setAirline] = useState("Not selected")
  const [accommodation, setAccommodation] = useState("Not selected")

  //date picker state
  const [startOpen, setStartOpen] = useState(false); // open and close the modal
  const [endOpen, setEndOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [validForm, setValidForm] = useState(false);
  const { session, loading, profile } = useAuth();
  const router = useRouter();

  //date picker toggle
  const toggleStartDatePicker = () => {
    setStartOpen(!startOpen);
  };

  const toggleEndDatePicker = () => {
    setEndOpen(!endOpen);
  };


  useEffect(()=>{
    getAirline()
    getAccommodation()
    console.log(airline);
    console.log(accommodation);
    console.log(airline_id);
    
  },[])

  const getAirline = async () => {
    const { data, error } = await supabase
    .from("airlines")
    .select('airline_name')
    .eq('airline_id', airline_id)
    if (error) {
      console.log(error);
    } else {      
      setAirline(data[0].airline_name);
    }
  }


  const getAccommodation = async () => {
    const { data, error } = await supabase
    .from("accommodation")
    .select('title')
    .eq('accommodation_id', accommodation_id)
    if (error) {
      console.log(error);
    } else {
      setAccommodation(data[0].title);
    }
  }

  const today = new Date();
  const minDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const minDateForEndDate = minDate + 1;

  const onChangeStartDate = (propDate) => {
    setStartDate(propDate);
  };

  const onChangeEndDate = (propDate) => {
    setEndDate(propDate);
  };

  // validate form

  const validateForm = () => {
    let errors = {};

    if (!title) errors.title = "Title is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const submitForm = async () => {

    const tripData = {
      user_id: session?.user.id,
      start_date: startDate,
      end_date: endDate,
      title: title,
      location: destination,
      ...(airline_id ? { airline_id: parseInt(airline_id) } : {}),
      ...(accommodation_id ? { accommodation_id: parseInt(accommodation_id) } : {})
    };  

    const { data, error } = await supabase
      .from("trips")
      .insert(tripData);
    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("trips");
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      submitForm();
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Trip Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Trip Title"
          value={title}
          onChangeText={setTitle}
          autoCorrect={false}
          autoCapitalize="words"
        />
        {errors.title ? (
          <Text style={styles.errorstext}>{errors.title}</Text>
        ) : null}

        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your destination"
          value={destination}
          onChangeText={setDestination}
          autoCorrect={false}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Start Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Start Date"
            value={startDate}
            onChangeText={setStartDate}
            editable={false}
            onPress={toggleStartDatePicker}
          />

        <Modal animationType="slide" transparent={true} visible={startOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                minimumDate={minDate}
                selected={startDate}
                onDateChange={onChangeStartDate}
                style={styles.datePicker}
              />

              <Pressable onPress={toggleStartDatePicker}>
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {errors.startDate ? (
          <Text style={styles.errorstext}>{errors.startDate}</Text>
        ) : null}

        <Text style={styles.label}>End Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter End Date"
          value={endDate}
          onChangeText={setEndDate}
          editable={false}
          onPress={toggleEndDatePicker}
        />

        <Text style={styles.label}>Airline</Text>
        <TextInput
          style={[styles.input, styles.readonlyInput]}
          defaultValue={airline}
          editable={false}
        />

        <Text style={[styles.label]}>Accommodation</Text>
        <TextInput
          style={[styles.input, styles.readonlyInput]}
          defaultValue={accommodation}
          editable={false}
        />

        <Modal animationType="slide" transparent={true} visible={endOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                selected={minDateForEndDate}
                minimumDate={minDateForEndDate}
                onDateChange={onChangeEndDate}
                style={styles.datePicker}
              />

              <Pressable onPress={toggleEndDatePicker}>
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {errors.endDate ? (
          <Text style={[styles.errorstext]}>{errors.endDate}</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <FontAwesome name="save" size={16} color={'white'}></FontAwesome>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>

        <Pressable onPress={handleClose} style={styles.button}>
        {/* <MaterialCommunityIcons name="cancel" size={16} color={'white'}></MaterialCommunityIcons> */}
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        {/* <Button style={styles.button} title="Cancel" onPress={() => router.push("/trips")} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    height: "50%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  input: {
    width: 300,
    marginHorizontal: 15,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
  errorstext: {
    color: "#cc0000",
    marginVertical: 5,
    marginLeft: 15,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
    fontFamily: "Futura",
    textAlign: "center",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  formTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Futura",
    marginBottom: 20,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    marginBottom: 5,
    marginVertical: 10,
    fontFamily: "Futura",
    color: '#3A90CD'
  },
  button: {
    backgroundColor: "#3A90CD",
    borderRadius: 10,
    height: 40,
    width: 135,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  readonlyInput: {
    backgroundColor: '#f0f0f0', 
    color: '#a0a0a0', 
  },
});
