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
import { Button } from "react-native-elements";
import { Pressable, Platform, Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import DatePicker from "react-native-modern-datepicker"
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

export default function TripForm({toggleCreateModal, onTripAdded}: {toggleCreateModal: any, onTripAdded: () => void}) {
  //form state
  const [accommodation, setAccommodation] = useState("");
  const [airline, setAirline] = useState("");
  const [airlineId, setAirlineId] = useState(null);
  const [accommodationId, setAccommodationId] = useState(null);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //date picker state
  const [startOpen, setStartOpen] = useState(false); // open and close the modal
  const [endOpen, setEndOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState("");
  const [validForm, setValidForm] = useState(false);
  const { session, loading, profile } = useAuth();

  //date picker toggle
  const toggleStartDatePicker = () => {
    setStartOpen(!startOpen);
  };

  const toggleEndDatePicker = () => {
    setEndOpen(!endOpen);
  };

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
    
    const { data, error } = await supabase.from("trips").insert({
      user_id: session?.user.id,
      start_date: startDate,
      end_date: endDate,
      title: title,
    });
    
    if (!error) {
      onTripAdded();
      toggleCreateModal();
    }
  };
  

  const handleSubmit = async () => {    
    if (validateForm()) {
       submitForm();

      
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.formTitle}>Create Your Trip</Text>
      <View>
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

        <Pressable onPress={toggleStartDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="Enter Start Date"
            value={startDate}
            onChangeText={setStartDate}
            editable={false}
          />
        </Pressable>

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

        <Pressable onPress={toggleEndDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="Enter End Date"
            value={endDate}
            onChangeText={setEndDate}
            editable={false}
          />
        </Pressable>

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
          <Text style={styles.errorstext}>{errors.endDate}</Text>
        ) : null}

      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSubmit} />
        <Button title="Cancel" onPress={toggleCreateModal} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    height: '50%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
    container: {
      backgroundColor: "#fff",
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 10,
      marginVertical: 20
    },
    input: {
      marginHorizontal: 15,
      marginTop: 15,
      height: 35,
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
      marginLeft: 20
    },
    button: {
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      marginTop: 30,
      marginBottom: 15,
      backgroundColor: "#075985",
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#fff",
    },
    datePicker: {
      height: 120,
      marginTop: -10,
    },
    pickerButton: {
      paddingHorizontal: 20,
    },
    formTitle: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
    }
  });

