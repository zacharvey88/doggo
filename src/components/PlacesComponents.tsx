import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import beaches from "@/data/beaches.json";
import restaurants from "@/data/restaurants.json";
import vets from "@/data/vets.json";
import parks from "@/data/parks.json";
import shops from "@/data/shops.json";
import { restaurantImages } from "@/data/restaurantImages";
import { fetchPlaces } from "../api/googlePlacesApi";

const PlacesComponent = ({ location, category }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlacesData = async () => {
      setLoading(true);
      let data;
      switch (category) {
        case "Restaurants":
          data = restaurants;
          break;
        case "Vets":
          data = vets;
          break;
        case "Parks":
          data = parks;
          break;
        case "Beaches":
          data = beaches;
          break;
        case "Shops":
          data = shops;
          break;
        default:
          data = { places: [] };
      }

      try {
        setPlaces(data.places || []);
      } catch (error) {
        console.error("Error fetching places data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacesData();
  }, [location, category]);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.placeItem}
            activeOpacity={0.5}
            onPress={() =>
              router.push({
                pathname: "search/place-details",
                params: {
                  place: JSON.stringify(item),
                },
              })
            }
          >
            {/* {item.photos ? (
              <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewContent}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
              >
                {item.photos.slice(0, 1).map((photo, index) => (
                  <Image
                    key={index}
                    source={{
                      // uri: `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.EXPO_PUBLIC_API_KEY}&maxWidthPx=400`,

                      uri: restaurantImages[index],
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView> */}

            <View style={styles.imageContainer}>
              {item.photos ? (
                <Image
                  source={{
                    uri: restaurantImages[0],
                    // https://places.googleapis.com/v1/${item.photos[0].name}/media?key=${process.env.EXPO_PUBLIC_API_KEY}&maxWidthPx=400
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Text>No Image Available</Text>
              )}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.placeName}>
                {item.displayName?.text || "N/A"}
              </Text>
              <Text style={styles.address}>
                {item.shortFormattedAddress || "N/A"}
              </Text>
              <Text
                style={[
                  styles.status,
                  {
                    color: item.currentOpeningHours?.openNow
                      ? "green"
                      : "#b10604",
                  },
                ]}
              >
                {item.currentOpeningHours?.openNow ? "Open Now" : "Closed"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 5,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
  },
  address: {
    fontSize: 16,
    marginVertical: 4,
  },
  placeItem: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    minWidth: "100%",
  },

  placeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    marginBottom: 10,
  },
  scrollViewContent: {
    gap: 10,
  },
  status: {
    fontSize: 16,
  },
  listContent: {
    flexGrow: 1,
  },
});

export default PlacesComponent;
