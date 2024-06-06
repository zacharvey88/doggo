import TripForm from "@/src/components/trip-components/TripForm";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
export default function AddTrip() {
  const {
    airline_id,
    accommodation_id,
    trip_id,
    existingTripName,
    existingDestination,
    existingEndDate,
    existingStartDate,
    existingAirline,
    existingAccommodation,
    edit,
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TripForm
          airline_id={airline_id}
          accommodation_id={accommodation_id}
          existingTripName={existingTripName}
          existingDestination={existingDestination}
          existingStartDate={existingStartDate}
          existingEndDate={existingEndDate}
          existingAirline={existingAirline}
          existingAccommodation={existingAccommodation}
          edit={edit ? true : false}
          trip_id={trip_id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  swipe: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  swipeText: {
    fontWeight: "bold",
  },
  form: {
    flex: 1,
    justifyContent: "center",
  },
  slogan: {
    width: "50%",
  },
});
