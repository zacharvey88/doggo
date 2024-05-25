// src/components/PlacesComponent.tsx
import React, { useEffect, useState } from "react";
import beaches from "@/data/beaches.json"
import restaurants from "@/data/restaurants.json"
import vets from "@/data/vets.json"
import parks from "@/data/parks.json"
import shops from "@/data/shops.json"
 
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { fetchPlaces } from "../api/googlePlacesApi";
import { Link } from "expo-router";

const PlacesComponent = ({ location, category }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const photoUri ="https://media.istockphoto.com/id/184928432/photo/pizza-from-the-top-pepperoni-cheese.jpg?s=612x612&w=0&k=20&c=wkC4yrZLcvHqg-9kQtRb1wan_z15eiO1Z297OFSuxpg="

//   useEffect(() => {
//     const fetchPlacesData = async () => {
//       setLoading(true);
//       let searchString = "";
//       switch (category) {
//         case "Restaurants":
//           searchString = `Pet-friendly restaurants in ${location}`;
//           break;
//         case "Vets":
//           searchString = `vets in ${location}`;
//           break;
//         case "Parks":
//           searchString = `Dog-friendly parks in ${location}`;
//           break;
//         case "Beaches":
//           searchString = `Dog-friendly beaches in ${location}`;
//           break;
//         case "Shops":
//           searchString = `Pet shops in ${location}`;
//           break;
//       }

//       try {
//         const data = await fetchPlaces(searchString);
// setPlaces(data.places || []);
//       } catch (error) {
//         console.error("Error fetching places data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlacesData();
//   }, [location, category]);

   useEffect(() => {
    const fetchPlacesData = async () => {
      setLoading(true);
      let data
      switch (category) {
        case "Restaurants":
          data = restaurants
          break;
        case "Vets":
          data = vets
          break;
        case "Parks":
          data = parks
          break;
        case "Beaches":
          data = beaches
          break;
        case "Shops":
          data = shops
          break;
      }

      try {
        // const data = await fetchPlaces(searchString);
setPlaces(data.places || []);
      } catch (error) {
        console.error("Error fetching places data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacesData();
  }, [location, category]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
// console.log(places[0].photos[0].name)
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: `/search/placeDetails`,
              params: {
                id: item.id,
                displayName: item.displayName.text,
                formattedAddress: item.formattedAddress,
                googleMapsUri: item.googleMapsUri,
              },
            }}
            asChild
          >
            <Pressable style={styles.placeItem}>
              {item.photos ? (
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.scrollViewContent}
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollView}
                >
                  {/* remove the .slice to get all the photos, limit for now due to $$$ */}
                  {item.photos.slice(0, 3).map((photo, index) => (
                    <Image
                      key={index}
                      source={{
                        // uri: `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.EXPO_PUBLIC_API_KEY}&maxWidthPx=400`,
                        uri: photoUri,
                      }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  ))}
                </ScrollView>
              ) : (
                <Text>No Image Available</Text>
              )}
              <Text style={styles.placeName}>{item.displayName.text}</Text>
              <Text style={styles.placeName}>
                {item.shortFormattedAddress}
              </Text>
              <Text style={styles.placeName}>
                {item.primaryTypeDisplayName.text}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  placeName: {
    fontSize: 16,
   
  },
  image: {
    width: 100, // Adjust this value as needed
    height: 100, // Adjust this value as needed
    borderRadius: 5,
  },
  scrollView: {
    marginBottom: 10, // Adjust this value as needed
  },
  scrollViewContent: {
    gap: 10,
  },
});


export default PlacesComponent;
