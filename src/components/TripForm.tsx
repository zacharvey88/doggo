import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Modal,
  Pressable,
  Alert,
  LogBox,
} from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { useRouter, useNavigation } from "expo-router";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

LogBox.ignoreLogs([
  "Warning: DatePicker: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
  "Warning: Header: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
]);

type TripFormProps = {
  airline_id?: number;
  accommodation_id?: number;
  existingTripName: string;
  existingDestination: string;
  existingStartDate: string;
  existingEndDate: string;
  existingAirline: string;
  existingAccommodation: string;
  edit: boolean;
  trip_id: number;
};

export default function TripForm({
  airline_id,
  accommodation_id,
  existingTripName,
  existingDestination,
  existingStartDate,
  existingEndDate,
  existingAirline,
  existingAccommodation,
  edit,
  trip_id,
}: TripFormProps) {
  const [title, setTitle] = useState(existingTripName);
  const [startDate, setStartDate] = useState(existingStartDate);
  const [endDate, setEndDate] = useState(existingEndDate);
  const [destination, setDestination] = useState(existingDestination);
  const [airline, setAirline] = useState(existingAirline || "Not selected");
  const [accommodation, setAccommodation] = useState(
    existingAccommodation || "Not selected"
  );

  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { session } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (airline_id) fetchAirline();
    if (accommodation_id) fetchAccommodation();
  }, [airline_id, accommodation_id]);

  const fetchAirline = async () => {
    const { data, error } = await supabase
      .from("airlines")
      .select("airline_name")
      .eq("airline_id", airline_id);

    if (!error && data && data.length > 0) {
      setAirline(data[0].airline_name);
    }
  };

  const fetchAccommodation = async () => {
    const { data, error } = await supabase
      .from("accommodation")
      .select("title")
      .eq("accommodation_id", accommodation_id);

    if (!error && data && data.length > 0) {
      setAccommodation(data[0].title);
    }
  };

  const minDate = getFormatedDate(
    new Date(new Date().setDate(new Date().getDate() + 1)),
    "YYYY/MM/DD"
  );

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!title) errors.title = "Title is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    const tripData = {
      user_id: session?.user.id,
      start_date: startDate,
      end_date: endDate,
      title,
      location: destination,
      ...(airline_id && { airline_id }),
      ...(accommodation_id && { accommodation_id }),
    };

    const { error } = await supabase.from("trips").insert(tripData);
    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("trips");
    }
  };

  const handleEdit = async () => {
    if (!validateForm()) return;

    const tripData = {
      user_id: session?.user.id,
      start_date: startDate,
      end_date: endDate,
      title,
      location: destination,
    };

    const { error } = await supabase
      .from("trips")
      .update(tripData)
      .eq("trip_id", trip_id);
    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("trips");
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
        <FormInput
          label="Trip Name"
          placeholder="Enter Trip Title"
          value={title}
          onChangeText={setTitle}
          errorMessage={errors.title}
        />
        <FormInput
          label="Destination"
          placeholder="Enter your destination"
          value={destination}
          onChangeText={setDestination}
        />
        <FormInput
          label="Start Date"
          placeholder="Enter Start Date"
          value={startDate}
          onFocus={() => setStartOpen(true)}
          editable={false}
          errorMessage={errors.startDate}
        />
        <FormInput
          label="End Date"
          placeholder="Enter End Date"
          value={endDate}
          onFocus={() => setEndOpen(true)}
          editable={false}
          errorMessage={errors.endDate}
        />
        <FormInput
          label="Airline"
          placeholder="Not selected"
          value={airline}
          editable={false}
          rightIcon={
            <Feather name="search" size={15} onPress={() => router.push("/")} />
          }
        />
        <FormInput
          label="Accommodation"
          placeholder="Not selected"
          value={accommodation}
          editable={false}
          rightIcon={
            <Feather
              name="search"
              size={15}
              onPress={() => router.push("/search")}
            />
          }
        />
      </View>
      <ModalView
        isVisible={startOpen}
        onClose={() => setStartOpen(false)}
        onConfirm={confirmStartDate}
        minDate={minDate}
        selectedDate={tempStartDate || startDate}
        onDateChange={setTempStartDate}
      />
      <ModalView
        isVisible={endOpen}
        onClose={() => setEndOpen(false)}
        onConfirm={confirmEndDate}
        minDate={minDate}
        selectedDate={tempEndDate || endDate}
        onDateChange={setTempEndDate}
      />
      <View style={styles.buttonContainer}>
        <FormButton
          onPress={edit ? handleEdit : submitForm}
          title="Save"
          iconName="save"
        />
        <FormButton onPress={handleClose} title="Cancel" />
      </View>
    </SafeAreaView>
  );
}

type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  editable?: boolean;
  errorMessage?: string;
  rightIcon?: JSX.Element;
};

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  editable = true,
  errorMessage,
  rightIcon,
}: FormInputProps) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, !editable && styles.readonlyInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        editable={editable}
      />
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
    {errorMessage && <Text style={styles.errorstext}>{errorMessage}</Text>}
  </View>
);

type FormButtonProps = {
  onPress: () => void;
  title: string;
  iconName?: string;
};

const FormButton = ({ onPress, title, iconName }: FormButtonProps) => (
  <Pressable onPress={onPress} style={styles.button}>
    {iconName && <FontAwesome name={iconName} size={16} color={"white"} />}
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

type ModalViewProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  minDate: string;
  selectedDate: string;
  onDateChange: (date: string) => void;
};

const ModalView = ({
  isVisible,
  onClose,
  onConfirm,
  minDate,
  selectedDate,
  onDateChange,
}: ModalViewProps) => (
  <Modal animationType="slide" transparent={true} visible={isVisible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <DatePicker
          mode="calendar"
          minimumDate={minDate}
          selected={selectedDate}
          onDateChange={onDateChange}
          style={styles.datePicker}
        />
        <View style={styles.modalButtonContainer}>
          <Pressable
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

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
  readonlyInput: {
    backgroundColor: "#f0f0f0",
    color: "#a0a0a0",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  rightIcon: {
    position: "absolute",
    right: 15,
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
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    marginBottom: 5,
    marginVertical: 10,
    fontFamily: "Futura",
    color: "black",
  },
  button: {
    backgroundColor: "#3A90CD",
    borderRadius: 10,
    height: 40,
    width: 135,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
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
