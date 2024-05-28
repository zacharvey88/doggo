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
            {item.photos ? (
              <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewContent}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
              >
                {item.photos.slice(0, 3).map((photo, index) => (
                  <Image
                    key={index}
                    source={{
                      uri: restaurantImages[index],
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            ) : (
              <Text>No Image Available</Text>
            )}
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    fontSize: 16,
    marginVertical: 4,
  },
  placeItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    minWidth:"100%"
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
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
    padding: 16,
    flexGrow: 1,
  },
});

export default PlacesComponent;
