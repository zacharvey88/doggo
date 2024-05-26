import { View, Text } from "./Themed";
import { StyleSheet, Image} from "react-native";
import dateFormat from "dateformat";
import { FontAwesome6, FontAwesome, Entypo} from "@expo/vector-icons";
import { Database } from "../lib/database.types";
import { useEffect } from "react";

export default function TripCard({trip, setModalVisible} : {trip: Database['public']['Tables']['trips']['Row'], setModalVisible: any}) {

  return (
    <View>
      <Image source={{ uri: trip.accommodation.photos[0] }} style={styles.photo}></Image>
      <View style={styles.trip}>
        <View style={{ backgroundColor: "#f9f9f9" }}>
          <Text style={styles.tripName}>{trip.title}</Text>
          <View style={styles.feature}>
            <FontAwesome name="map-marker" style={styles.icon}/>
            <Text style={styles.tripDates}>{trip.accommodation.title} in {trip.location}</Text>
          </View>
          <View style={styles.feature}>
            <FontAwesome name="plane" style={styles.icon}/>
            <Text style={styles.tripDates}>{trip.airlines.airline_name}</Text>
          </View>
          <View style={styles.feature}>
            <Entypo name="calendar" style={styles.icon}/>
            <Text style={styles.tripDates}>{dateFormat(trip.start_date, "dd mmm yyyy")} to {dateFormat(trip.end_date, "dd mmm yyyy")}</Text>
          </View>

        </View>
        <View style={styles.icons}>
          <FontAwesome6 name="edit" style={styles.icon}></FontAwesome6>
          <FontAwesome6 name="trash" style={styles.icon}></FontAwesome6>
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
    shadowOffset: { width: 0, height: 1 },
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