import { View, Text } from "./Themed";
import { StyleSheet, Image, Pressable, Alert} from "react-native";
import dateFormat from "dateformat";
import { FontAwesome6, FontAwesome, Entypo} from "@expo/vector-icons";
import { Database } from "../lib/database.types"
import { supabase } from "../lib/supabase";

export default function TripCard({trip, setTripId, trips, filteredTrips, setFilteredTrips} : { trip: any, setTripId: any, trips: any, filteredTrips: any, setFilteredTrips: any}) {

  const { airline_name = "" } = trip.airlines ?? {};
  const { title = "", photos = ["https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/accommodation_photos/photo-placeholder.png"] } = trip.accommodation ?? {};
 
  const start_date = trip.start_date ? dateFormat(trip.start_date, "dd mmm yyyy") : ""; 
  const end_date = trip.end_date ? `to ${dateFormat(trip.end_date, "dd mmm yyyy")}` : ""; 
  const location = trip.location ? `in ${trip.location}` : "";

  const handleEditTrip = async (trip_id) => {
    // Implementation needed
  }

  const handleDeleteTrip = async (trip_id) => {
    setTripId(trip_id);

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
            setFilteredTrips(filteredTrips.filter((trip)=> trip.trip_id !== trip_id))
            const { data, error } = await supabase
            .from('trips')
            .delete()
            .eq("trip_id", trip_id)
        
            if (error) {
                Alert.alert('Something went wrong, please try again.')
                setFilteredTrips(trips)
            }
        },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
    // toggleDeleteModal();
  }


  return (
    <View>
      <Image source={{ uri: photos[0] }} style={styles.photo}></Image>
      <View style={styles.trip}>
        <View style={{ backgroundColor: "#f9f9f9" }}>
          <Text style={styles.tripName}>{trip.title}</Text>
          <View style={styles.feature}>
            <FontAwesome name="map-marker" style={styles.icon}/>
            <Text style={styles.tripDates}>{title} {location}</Text>
          </View>
          <View style={styles.feature}>
            <FontAwesome name="plane" style={styles.icon}/>
            <Text style={styles.tripDates}>{airline_name}</Text>
          </View>
          <View style={styles.feature}>
            <Entypo name="calendar" style={styles.icon}/>
            <Text style={styles.tripDates}>{start_date} {end_date}</Text>
          </View>
        </View>
        <View style={styles.icons}>
          <Pressable onPress={() => {handleEditTrip(trip.trip_id)}}><FontAwesome6 name="edit" style={styles.icon}></FontAwesome6></Pressable>
          <Pressable onPress={() => {handleDeleteTrip(trip.trip_id)}}><FontAwesome6 name="trash" style={styles.icon}></FontAwesome6></Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    borderRadius: 15,
  },
  trip: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  tripName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3A90CD",
    marginBottom: 20,
  },
  tripDates: {
    fontSize: 16,
  },
  tripCity: {
    fontSize: 16,
  },
  icon: {
    fontSize: 20,
    color: "#3A90CD",
  },
  button: {
    marginTop: 20,
    height: 40, 
    fontSize: 16,
    width: "100%",
  },
  noTrips: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A90CD",
    textAlign: "center",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#f9f9f9",
  },
  photo: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 0,
  },
  feature: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  }
});