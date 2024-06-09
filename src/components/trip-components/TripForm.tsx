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
  TouchableOpacity
} from "react-native";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { LogBox } from "react-native";
import { Feather } from "@expo/vector-icons";

LogBox.ignoreLogs([
  "Warning: DatePicker: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
  "Warning: Header: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
]);
  
export default function TripForm() {
  const params = useLocalSearchParams();
  const {
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
    existingNotes,
    existingPlaces,
    place,
  } = params;

  const parsedPlace = place ? JSON.parse(decodeURIComponent(place)) : {};

  const [title, setTitle] = useState(existingTripName ?? "");
  const [startDate, setStartDate] = useState(existingStartDate ?? "");
  const [endDate, setEndDate] = useState(existingEndDate ?? "");
  const [destination, setDestination] = useState(existingDestination ?? "");
  const [airline, setAirline] = useState(existingAirline ?? "Not selected");
  const [accommodation, setAccommodation] = useState(existingAccommodation ?? "Not selected");
  const [notes, setNotes] = useState(existingNotes !== "null" || null ? existingNotes : "");
  const [places, setPlaces] = useState(() => {
    const initialPlaces = existingPlaces ? JSON.parse(decodeURIComponent(existingPlaces)) : [];
    return parsedPlace.name ? [...initialPlaces, parsedPlace] : initialPlaces;
  });
  
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState(""); 
  const navigation = useNavigation();
  
  const [startOpen, setStartOpen] = useState(false); 
  const [endOpen, setEndOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getAirline();
    getAccommodation();    
  }, []);

  const getAirline = async () => {
    const { data, error } = await supabase
    .from("airlines")
    .select('airline_name')
    .eq('airline_id', airline_id)
    if (data) {   
      setAirline(data[0].airline_name);
    }
  }

  const getAccommodation = async () => {
    const { data, error } = await supabase
    .from("accommodation")
    .select('title')
    .eq('accommodation_id', accommodation_id)
    if (data) {
      setAccommodation(data[0].title);
    }
  }
  const today = new Date();
  const minDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const minDateForEndDate = minDate + 1;


  const onChangeTempStartDate = (propDate) => {
    setTempStartDate(propDate);
  };

  const onChangeTempEndDate = (propDate) => {
    setTempEndDate(propDate);
  };

  const handleDeleteTrip = async () => {

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to remove this trip?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            // setFilteredTrips(
            //   filteredTrips.filter(
            //     (trip: { trip_id: any }) => trip.trip_id !== trip_id
            //   )
            // );
            const { data, error } = await supabase
              .from("trips")
              .delete()
              .eq("trip_id", trip_id);

              router.back()

            if (error) {
              Alert.alert("Something went wrong, please try again.");
              // setFilteredTrips(trips);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const validateForm = () => {
    let errors = {};
    if (!title) errors.title = "Title is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (page) => {
    if (validateForm()) {
      edit ? handleEdit(page) : submitForm(page);
    }
  };
  
  const submitForm = async (page) => {
    const tripData = {
      user_id: session?.user.id,
      start_date: startDate,
      end_date: endDate,
      title: title,
      location: destination,
      notes: notes,
      ...(airline_id ? { airline_id: parseInt(airline_id) } : {}),
      ...(accommodation_id ? { accommodation_id: parseInt(accommodation_id) } : {}),
      places: places,
    };
  
    const { data, error } = await supabase
      .from("trips")
      .insert(tripData);
  
    Alert.alert("Your trip was saved!");
    if (page) {
      router.push(page === "airlines" ? "/airlines" : "/search");
    } else {
      router.replace("trips");
    }
  };
  
  

  const handleSearchPress = (page) => {
    
    Alert.alert(
      "Save trip?",
      "Any changes will be lost if you continue without saving",
      [
        {
          text: "Save",
          onPress: () => {
            handleSubmit(page);
          },
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {
            router.push(page === "airlines" ? "/airlines" : "/search");
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  

  const handleEdit = async (page) => {
    const tripData = {
      user_id: session?.user.id,
      start_date: startDate,
      end_date: endDate,
      title: title,
      location: destination,
      notes: notes,
    }
    
    const { data, error } = await supabase
      .from("trips")
      .update(tripData)
      .eq('trip_id', trip_id);
  
    if (error) {
      Alert.alert(error.message);
    } else {
      if (page) {
        router.push(page === "airlines" ? "/airlines" : "/search");
      } else {
        router.replace("trips");
      }
    }
  };

  const removePlace = async (index) => {
    const updatedPlaces = places.filter((_, i) => i !== index);
  
    const { error } = await supabase
      .from('trips')
      .update({ places: updatedPlaces })
      .eq('trip_id', trip_id);

    if (error) {
      console.error('Error updating places:', error);
    } else {
      setPlaces(updatedPlaces);
    }
  };

  const confirmRemovePlace = (index) => {
    Alert.alert(
      "Confirm Removal",
      "Are you sure you want to remove this place from your trip?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => removePlace(index),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }
  

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
        <Text style={styles.formTitle}>{edit? "Edit Trip" : "Create Trip"}</Text>
        <Text style={styles.label}>Trip Name</Text>
        <TextInput
          style={[styles.input, {width: 330}]}
          placeholder="Enter Trip Title"
          placeholderTextColor={'#999'}
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
          style={[styles.input, {width: 330}]}
          placeholder="Enter your destination"
          placeholderTextColor={'#999'}
          value={destination}
          onChangeText={setDestination}
          autoCorrect={false}
          autoCapitalize="words"
        />

        <View style={{flexDirection: 'row'}}>

        <View style={{flexDirection: 'column'}}>
          <Text style={styles.label}>Start Date</Text>
            <TextInput
              style={[styles.input, {width: 160}]}
              placeholder="Select Start Date"
              placeholderTextColor={'#999'}
              value={startDate}
              onChangeText={setStartDate}
              editable={false}
              onPress={() => setStartOpen(true)}
            />

        {errors.startDate ? (
          <Text style={styles.errorstext}>{errors.startDate}</Text>
        ) : null}

        </View>

        <View style={{flexDirection: 'column'}}>
          <Text style={styles.label}>End Date</Text>
          <TextInput
            style={[styles.input, {width: 160}]}
            placeholder="Select End Date"
            placeholderTextColor={'#999'}
            value={endDate}
            onChangeText={setEndDate}
            editable={false}
            onPress={() => setEndOpen(true)}
          />

        {errors.endDate ? (
          <Text style={[styles.errorstext]}>{errors.endDate}</Text>
        ) : null}
         
         </View>

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
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={confirmStartDate}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.closeButton]}
                  onPress={() => setStartOpen(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        
        </View>

        <View>
          <Text style={[styles.label]}>Airline</Text>
          <View style={styles.disabled}>
            <TextInput
              style={[styles.input, styles.readonlyInput, { flex: 1 }]}
              defaultValue={airline}
              editable={false}
            />
            <Pressable onPress={() => handleSearchPress("airlines")}>
              <View style={styles.searchContainer}>
                <Feather name="search" size={20} style={styles.searchIcon} />
              </View>
            </Pressable>
          </View>
        </View>

        <View>
          <Text style={styles.label}>Accommodation</Text>
          <View style={styles.disabled}>
            <TextInput
              style={[styles.input, styles.readonlyInput, { flex: 1 }]}
              defaultValue={accommodation}
              editable={false}
            />
            <Pressable onPress={() => handleSearchPress("search")}>
              <View style={styles.searchContainer}>
                <Feather name="search" size={20} style={styles.searchIcon} />
              </View>
            </Pressable>
          </View>
        </View>

        {places && places.length > 0 ? (
          <View>
            <Text style={styles.label}>Saved Places</Text>
            <View style={styles.placesList}>
              {places.map((place, index) => (
                <TouchableOpacity key={index} onPress={() => confirmRemovePlace(index)}>
                  <View style={styles.placeCard}>
                    <Text style={styles.place}>{place.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}
        
        <View>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholderTextColor={'#999'}
            value={notes}
            onChangeText={setNotes}
            autoCorrect={false}
            autoCapitalize="sentences"
            multiline={true}
          />
        </View>


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
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={confirmEndDate}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.closeButton]}
                  onPress={() => setEndOpen(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.saveButton, styles.button]} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>{edit ? "Save Changes" : "Save Trip"}</Text>
            </TouchableOpacity>
            {edit && (
              <TouchableOpacity style={[styles.deleteButton, styles.button]} onPress={() => handleDeleteTrip()}>
                <Text style={styles.buttonText}>Delete Trip</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.closeButton, styles.button]} onPress={() => handleClose()}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    width: 300,
  },
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
  input: {
    marginHorizontal: 5,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  errorstext: {
    color: "#cc0000",
    marginVertical: 5,
    marginLeft: 8,
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
    marginBottom: 5,
    marginVertical: 10,
    fontFamily: "Futura",
    color: 'black'
  },
  readonlyInput: {
    backgroundColor: '#f0f0f0', 
    color: '#a0a0a0', 
  },
  modalButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 8,
  },
  modalButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 30,
  },
  button: {
    borderRadius: 8,
    padding: 10
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  closeButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  disabled: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    position: "absolute",
    top: -20,
    right: 5,
    backgroundColor: '#3A90CD',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 40,
    width: 40,
    borderWidth: .5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    color: "#fff",
  },
  notesInput: {
    height: 120,
  },
  placesList: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'flex-start',
    maxWidth: '100%',
    gap: 5,
    marginLeft: 5,
    marginBottom: 0,
  },
  placeCard: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  place:{
    fontSize: 16,
    textAlign: 'left',  
  },
});
