// src/components/PlacesComponent.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { fetchPlaces } from "../api/googlePlacesApi";
import { Link } from "expo-router";

const PlacesComponent = (props) => {
  const { location } = props;
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const data = await fetchPlaces(
          `Pet-friendly restaurants in ${location}`
        );
        setPlaces(data.places || []);
      } catch (error) {
        console.error("Error fetching places data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacesData();
  }, [location]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  console.log(places);

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: `/newsearch/${item.id}`,
              params: { id: item.id ,
                displayName: item.displayName.text,
                formattedAddress: item.formattedAddress,
                googleMapsUri: item.googleMapsUri,
               
              },
            }}
            asChild
          >
            <Pressable style={styles.placeItem}>
              <Text style={styles.placeName}>{item.displayName.text}</Text>
              <Text style={styles.placeAddress}>{item.formattedAddress}</Text>
              <Text style={styles.placeGoogleMapsUri}>
                {item.googleMapsUri}
              </Text>
              <Text style={styles.placeLocation}>
                Location: {item.location.latitude}, {item.location.longitude}
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
    padding: 16,
    backgroundColor: "#fff",
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
    fontSize: 18,
    fontWeight: "bold",
  },
  placeAddress: {
    fontSize: 16,
  },
  placeGoogleMapsUri: {
    fontSize: 14,
    color: "#666",
  },
  placeType: {
    fontSize: 14,
    color: "#666",
  },
  placeLocation: {
    fontSize: 14,
    color: "#666",
  },
});

export default PlacesComponent;
