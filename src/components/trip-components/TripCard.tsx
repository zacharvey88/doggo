import { StyleSheet, Image, Pressable, View, Text, Share, TouchableOpacity, Linking } from "react-native";
import dateFormat from "dateformat";
import { FontAwesome, Entypo, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { supabase } from "@/src/lib/supabase";



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
  const {title = "", photos = []} = trip.accommodation ?? {};
  const start_date = trip.start_date ? dateFormat(trip.start_date, "dd mmm yyyy") : "";
  const end_date = trip.end_date ? `to ${dateFormat(trip.end_date, "dd mmm yyyy")}` : "";
  const location = trip.location ? `in ${trip.location}` : "";
  const notes = trip.notes ? trip.notes : "";
  const initialPlaces = trip.places ? trip.places : "";

  const [existingTripName, setExistingTripName] = useState("");
  const [existingDestination, setExistingDestination] = useState("");
  const [existingStartDate, setExistingStartDate] = useState("");
  const [existingEndDate, setExistingEndDate] = useState("");
  const [existingAirline, setExistingAirline] = useState("");
  const [existingAccommodation, setExistingAccommodation] = useState("");
  const [existingNotes, setExistingNotes] = useState("");
  const [existingPlaces, setExistingPlaces] = useState(initialPlaces);

  const handleEditTrip = (
    trip_id: number,
    title: string,
    location: string,
    start_date: any,
    end_date: any,
    airline_name: string,
    accommodation_title: string,
    notes: string,
    places: any,
  ) => {
    setTripId(trip_id);
    setExistingTripName(title ?? "");
    setExistingDestination(location ?? "");
    setExistingStartDate(start_date ?? "");
    setExistingEndDate(end_date ?? "");
    setExistingAccommodation(accommodation_title ?? "");
    setExistingAirline(airline_name ?? "");
    setExistingNotes(notes ?? "");
    setExistingPlaces(places ?? [])
  
    const encodedTitle = encodeURIComponent(title);
    const encodedLocation = encodeURIComponent(location);
    const encodedStartDate = encodeURIComponent(start_date);
    const encodedEndDate = encodeURIComponent(end_date);
    const encodedAirline = encodeURIComponent(airline_name);
    const encodedAccommodation = encodeURIComponent(accommodation_title);
    const encodedNotes = encodeURIComponent(notes);
    const encodedPlaces = encodeURIComponent(JSON.stringify(places));
  
    router.push(
      `/add-trip?trip_id=${trip_id}&existingTripName=${encodedTitle}&existingDestination=${encodedLocation}&existingStartDate=${encodedStartDate}&existingEndDate=${encodedEndDate}&existingAirline=${encodedAirline}&existingAccommodation=${encodedAccommodation}&existingNotes=${encodedNotes}&existingPlaces=${encodedPlaces}&edit=true`
    );
  };

  const handleShare = async () => {
    const message = `
      Trip: ${trip.title}
      Location: ${trip.location}
      Dates: ${start_date} ${end_date}
      Airline: ${airline_name}
      Accommodation: ${title}
      Notes: ${notes}
    `;
    try {
      const result = await Share.share({
        message: message,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const goToAccommodation = async () => {
    if (trip.accommodation_id) {
      const { data, error } = await supabase
        .from("accommodation")
        .select("*")
        .eq('accommodation_id', trip.accommodation_id);
  
      if (data && data[0]) {
        const accommodationData = data[0];
  
        router.push({
          pathname: `/search/${trip.accommodation_id}`,
          params: {
            title: accommodationData.title,
            description: accommodationData.description,
            address: accommodationData.address,
            phone: accommodationData.phone,
            photos: accommodationData.photos,
            postcode: accommodationData.postcode,
            booking_url: accommodationData.booking_url,
            city: accommodationData.city,
            country: accommodationData.country,
            rating: accommodationData.rating,
          }
        });
      } else return
    }
  };
  

  return (
    <View>
      {photos && photos.length > 0 ? (
        <TouchableOpacity
          onPress={goToAccommodation}
        >
          <Image
            source={{ uri: photos[0] }}
            style={styles.photo}
            resizeMode="cover"
          />
        </TouchableOpacity>
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

      <View style={styles.feature}>
       <Entypo name="location" style={styles.featureIcon} />
        <View>
         <Text style={[styles.featureText, {width: 285}]}>{title} {location}</Text>
       </View>
      </View>
    
      <View style={styles.feature}>
        <FontAwesome name="plane" style={[styles.featureIcon, {fontSize: 22}]} />
        <View>
          <Text style={styles.featureText}>{` ${airline_name}`}</Text>
        </View>
      </View>

      <View style={styles.feature}>
        <Entypo name="calendar" style={styles.featureIcon} />
        <View>
          <Text style={styles.featureText}>{start_date} {end_date}</Text>
        </View>
      </View>

      <View style={existingPlaces.length > 0 ? styles.placesContainer : styles.placesContainerEmpty}>
        <FontAwesome6 name="location-crosshairs" style={styles.featureIcon} />
        <View style={styles.placesList}>
          {existingPlaces.length > 0 ? existingPlaces.map((place, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(place.link)}>
              <View style={styles.placeCard}>
                <Text style={styles.place}>{place.name}</Text>
              </View>
            </TouchableOpacity>
          )) : <Text style={styles.featureText}>No places saved</Text>}
        </View>
      </View>

      <View style={styles.notesContainer}>
        <MaterialIcons name="notes" style={styles.featureIcon} />
        <Text style={styles.featureText}>{notes ? notes : "No notes for this trip"}</Text>
      </View>

    </View>

    <View style={styles.iconsContainer}>
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
              trip.notes,
              trip.places,
            );
          }}
        >
          <MaterialIcons name="edit-note" style={styles.editIcon} />
        </Pressable>
      </View>

        <View style={styles.editIconContainer}>
          <Pressable onPress={handleShare}>
            <MaterialIcons name="share" style={styles.shareIcon} />
          </Pressable>
        </View>
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
  photo: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 0,
  },
  iconsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    gap: 5
  },
  editIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  editIcon: {
    fontSize: 25,
  },
  shareIcon:{
    fontSize: 22
  },
  notesContainer: {
    flexDirection: 'row',
    gap: 10,
    width: 340,
  },
  placesContainerEmpty: {
    flexDirection: 'row',
    gap: 10,
  },
  placesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 3,
  },
  placesList: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'flex-start',
    maxWidth: '95%',
    gap: 5,
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
  features: {
    flexDirection: "column",
    alignItems: 'flex-start', 
    gap: 8,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
    color: "#3A90CD",
    alignSelf: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  featureText: {
    fontSize: 16,
    textAlign: 'left',
    flexShrink: 1,
  },
});
