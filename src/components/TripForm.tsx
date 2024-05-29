import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { useRouter, useNavigation } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: DatePicker: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
]);

export default function TripForm() {
  // form state
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tempStartDate, setTempStartDate] = useState(""); // temporary state for start date
  const [tempEndDate, setTempEndDate] = useState(""); // temporary state for end date
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  // date picker state
  const [startOpen, setStartOpen] = useState(false); // open and close the modal
  const [endOpen, setEndOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const { session, loading, profile } = useAuth();
  const router = useRouter();

  const today = new Date();
  const minDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const minDateForEndDate = minDate + 1;

  // event handlers
  const onChangeTempStartDate = (propDate) => {
    setTempStartDate(propDate);
  };

  const onChangeTempEndDate = (propDate) => {
    setTempEndDate(propDate);
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

  const confirmStartDate = () => {
    setStartDate(tempStartDate);
    setStartOpen(false);
  };

  const confirmEndDate = () => {
    setEndDate(tempEndDate);
    setEndOpen(false);
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

        <Text style={styles.label}>Start Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Start Date"
            value={startDate}
            onChangeText={setStartDate}
            editable={false}
            onPress={() => setStartOpen(true)}
          />

        <Modal animationType="slide" transparent={true} visible={startOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                minimumDate={minDate}
                selected={tempStartDate || startDate}
                onDateChange={onChangeTempStartDate}
                style={styles.datePicker}
              />
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setStartOpen(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={confirmStartDate}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
              </View>
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
          onPress={() => setEndOpen(true)}
        />

        <Modal animationType="slide" transparent={true} visible={endOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                selected={tempEndDate || endDate}
                minimumDate={minDateForEndDate}
                onDateChange={onChangeTempEndDate}
                style={styles.datePicker}
              />
              <View style={styles.modalButtonContainer}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setEndOpen(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={confirmEndDate}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {errors.endDate ? (
          <Text style={styles.errorstext}>{errors.endDate}</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Create Your Trip</Text>
        </Pressable>

        <Pressable onPress={handleClose} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
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
    height: "50%", // Adjust the height as necessary
    padding: 20,
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
  },
  button: {
    backgroundColor: "#3A90CD",
    borderRadius: 10,
    height: 40,
    width: 135,
    padding: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "#ff5c5c",
  },
  confirmButton: {
    backgroundColor: "#3A90CD",
  },
});
