import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { Pressable, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";

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
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [validForm, setValidForm] = useState(false);
  const {session, loading, profile} = useAuth()

  //date picker toggle
  const toggleStartDatePicker = () => {
    setShowStartPicker(!showStartPicker);
  };

  const toggleEndDatePicker = () => {
    setShowEndPicker(!showEndPicker);
  };

  const onChangeStartDate = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentStartDate = selectedDate || new Date();
      setStartDate(currentStartDate);

      if (Platform.OS === "android") {
        toggleStartDatePicker();
        setStartDate(currentStartDate.toDateString());
      }
    } else {
      toggleStartDatePicker();
    }
  };

  const onChangeEndDate = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentEndDate = selectedDate || new Date();
      setEndDate(currentEndDate);

      if (Platform.OS === "android") {
        toggleEndDatePicker();
        setEndDate(currentEndDate.toDateString());
      }
    } else {
      toggleEndDatePicker();
    }
  };

  const confirmIOSStartDate = () => {
    setStartDate(new Date().toDateString());
    toggleStartDatePicker();
  };

  const confirmIOSEndDate = () => {
    setEndDate(new Date().toDateString());
    toggleEndDatePicker();
  };

  // validate form

  const validateForm = () => {
    let errors = {};

    if (!accommodation) errors.accommodation = "Accommodation is required";
    if (!airline) errors.airline = "Airline is required";
    if (!title) errors.title = "Title is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const getAirlinesId = async () => {
    const { data } = await supabase
      .from("airlines")
      .select("*")
      .eq("airline_name", airline);
    if (data) {
      setAirlineId(data[0].airline_id);
    }
  };
  const getAccommodationId = async () => {
    const { data } = await supabase
      .from("accommodation")
      .select("*")
      .eq("title", accommodation);
    if (data) {
      setAccommodationId(data[0].accommodation_id);
    }
  };

  const submitForm = async () => {
    const { data, error } = await supabase.from("trips").insert({
      user_id: session?.user.id,
      airline_id: airlineId, // sort this Sun Express 169
      accommodation_id: accommodationId, //id Seaside Villa
      start_date: startDate,
      end_date: endDate,
      title: title,
    });
    if (!error) {
      onTripAdded();
      toggleCreateModal();
    }
  };

  // const submitForm = async () => {
  //   const { data, error } = await supabase.from("trips").insert({
  //     user_id: session?.user.id,
  //     airline_id: airlineId, // sort this Sun Express 169
  //     accommodation_id: accommodationId, //id Seaside Villa
  //     start_date: startDate,
  //     end_date: endDate,
  //     title: title,
  //   });
  //   if (error && error.code === "42501") {
  //     Alert.alert("Error", "You must be logged in to submit a review");
  //   } else {
  //     Alert.alert("Success!", "Review submitted.");
  //   }
  //     setAccommodation("");
  //     setAirline("");
  //     setStartDate("");
  //     setEndDate("");
  //     setTitle("");
  //     setErrors({});
  //     toggleCreateModal()
  // };

  const handleSubmit = () => {
    if (validateForm()) {
      getAirlinesId();
      getAccommodationId();
      submitForm();
    }
  };

  // return

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
      <TextInput
        style={styles.input}
        placeholder="Enter Accommodation Name"
        value={accommodation}
        onChangeText={setAccommodation}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {errors.accommodation ? (
        <Text style={styles.errorstext}>{errors.accommodation}</Text>
      ) : null}

      {showStartPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={new Date()}
          onChange={onChangeStartDate}
          style={styles.datePicker}
        />
      )}

      {showStartPicker && Platform.OS === "ios" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              { backgroundColor: "#11182711" },
            ]}
            onPress={toggleStartDatePicker}
          >
            <Text style={[styles.buttonText, { color: "#075985" }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.pickerButton]}
            onPress={confirmIOSStartDate}
          >
            <Text style={[styles.buttonText]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      <Pressable onPress={toggleStartDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Enter Start Date"
          value={startDate}
          onChangeText={setStartDate}
          editable={false}
        />
      </Pressable>

      {errors.startDate ? (
        <Text style={styles.errorstext}>{errors.startDate}</Text>
      ) : null}

      {showEndPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={new Date()}
          onChange={onChangeEndDate}
          style={styles.datePicker}
        />
      )}

      {showEndPicker && Platform.OS === "ios" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              styles.pickerButton,
              { backgroundColor: "#11182711" },
            ]}
            onPress={toggleEndDatePicker}
          >
            <Text style={[styles.buttonText, { color: "#075985" }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.pickerButton]}
            onPress={confirmIOSEndDate}
          >
            <Text style={[styles.buttonText]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      <Pressable onPress={toggleEndDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Enter End Date"
          value={endDate}
          onChangeText={setEndDate}
          editable={false}
        />
      </Pressable>

      {errors.endDate ? (
        <Text style={styles.errorstext}>{errors.endDate}</Text>
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
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSubmit} />
        <Button title="Cancel" onPress={toggleCreateModal} />
      </View>
    </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
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

