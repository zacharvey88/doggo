import { View, StyleSheet } from "react-native";
import AccommodationForm from "../components/accommodation-components/AccommodationForm";
import { useLocalSearchParams } from "expo-router";

export default function AddAccommodation() {
  const {
    existingAccommodation_id,
    existingTitle,
    existingDescription,
    existingAddress,
    existingPhone,
    existingPhotos,
    existingPostcode,
    existingBooking_url,
    existingCity,
    existingCountry,
    existingState,
    existingRating,
    edit,
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <AccommodationForm
          existingAccommodation_id={existingAccommodation_id}
          existingTitle={existingTitle}
          existingDescription={existingDescription}
          existingAddress={existingAddress}
          existingPhone={existingPhone}
          existingPhotos={existingPhotos}
          existingPostcode={existingPostcode}
          existingBooking_url={existingBooking_url}
          existingCity={existingCity}
          existingCountry={existingCountry}
          existingState={existingState}
          existingRating={existingRating}
          edit={edit}
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
});
