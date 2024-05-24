import { useState } from "react";
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
import { Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TripForm() {
  const [accommodation, setAccommodation] = useState("");
  const [airline, setAirline] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let errors = {};

    if (!accommodation) errors.accommodation = "Accommodation is required";
    if (!airline) errors.airline = "Airline is required";
    if (!title) errors.title = "Title is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";
    if (!userId) errors.userId = "userId is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(
        "Submitted",
        accommodation,
        airline,
        startDate,
        endDate,
        title,
        userId
      );
      setAccommodation("");
      setAirline("");
      setStartDate("");
      setEndDate("");
      setUserId("");
      setTitle("");
      setErrors({});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Trip Title"
        value={title}
        onChangeText={setTitle}
        autoCorrect={false}
        autoCapitalize="none"
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
      <TextInput
        style={styles.input}
        placeholder="Enter userId"
        value={userId}
        onChangeText={setUserId}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {errors.userId ? (
        <Text style={styles.errorstext}>{errors.userId}</Text>
      ) : null}
      <Button title="Login" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
  errorstext: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
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
});
