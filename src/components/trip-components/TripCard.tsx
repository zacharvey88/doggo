import { StyleSheet, Image, Pressable, View, Text, Dimensions} from "react-native";
import dateFormat from "dateformat";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function TripCard({
  trip,
  setTripId,
  trips,
  filteredTrips,
  setFilteredTrips,
}: {
  trip: any;
  setTripId: any;
  trips: any;
  filteredTrips: any;
  setFilteredTrips: any;
}) {
  const { airline_name = "" } = trip.airlines ?? {};
  const {
    title = "",
    photos = [],
  } = trip.accommodation ?? {};

  const start_date = trip.start_date
    ? dateFormat(trip.start_date, "dd mmm yyyy")
    : "";
  const end_date = trip.end_date
    ? `to ${dateFormat(trip.end_date, "dd mmm yyyy")}`
    : "";
  const location = trip.location ? `in ${trip.location}` : "";

  const [existingTripName, setExistingTripName] = useState("");
  const [existingDestination, setExistingDestination] = useState("");
  const [existingStartDate, setExistingStartDate] = useState("");
  const [existingEndDate, setExistingEndDate] = useState("");
  const [existingAirline, setExistingAirline] = useState("");
  const [existingAccommodation, setExistingAccommodation] = useState("");

  const handleEditTrip = (
    trip_id: any,
    title: any,
    location: any,
    start_date: any,
    end_date: any,
    airline_name: any,
    accommodation_title: any,
  ) => {
    setTripId(trip_id);
    setExistingTripName(title ?? "");
    setExistingDestination(location ?? "");
    setExistingStartDate(start_date ?? "");
    setExistingEndDate(end_date ?? "");
    setExistingAccommodation(accommodation_title ?? "");
    setExistingAirline(airline_name ?? "");

    router.push(
      `/add-trip?trip_id=${trip_id}&existingTripName=${title}&existingDestination=${location}&existingStartDate=${start_date}&existingEndDate=${end_date}&existingAirline=${airline_name}&existingAccommodation=${accommodation_title}&edit='true'`
    );
  };

  return (
    <View>
      {photos && photos.length > 0 ? (
        <Image
          source={{ uri: photos[0] }}
          style={styles.photo}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require('@/assets/images/photo-placeholder.png')}
          style={styles.photo}
          resizeMode="cover"
        />
      )}
      <View style={styles.tripCard}>
        <Text style={styles.tripName}>{trip.title}</Text>
        <View style={styles.features}>
          <View style={styles.featureIconColumn}>
            <Entypo name="location" style={styles.featureIcon} />
            <FontAwesome name="plane" style={styles.featureIcon} />
            <Entypo name="calendar" style={styles.featureIcon} />
          </View>
          <View style={styles.featureTextColumn}>
            <Text style={styles.featureText}>{title} {location}</Text>
            <Text style={styles.featureText}>{airline_name}</Text>
            <Text style={styles.featureText}>{start_date} {end_date}</Text>
          </View>
        </View>
        <View style={styles.editIconContainer}>
          <Pressable
            onPress={() => {
              handleEditTrip(
                trip.trip_id,
                trip.title,
                trip.location,
                trip.start_date,
                trip.end_date,
                trip.airlines?.airline_name,
                trip.accommodation?.title,
              );
            }}
          >
            <MaterialIcons name="edit-note" style={styles.editIcon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
  },
  tripCard: {
    width: 380,
    position: "relative",
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  tripName: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
    fontFamily: "Futura",
  },
  featureText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',  
  },
  photo: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 0,
  },
  features: {
    flexDirection: "row",
    gap: 10,
  },
  featureIconColumn: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  featureTextColumn: {
    flexDirection: "column",
    justifyContent: 'space-between'
  },
  featureIcon: {
    fontSize: 20,
    color: "#3A90CD",
    marginBottom: 8,
  },
  editIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    position: "absolute",
    top: 10,
    right: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  editIcon: {
    fontSize: 25,
    },
});