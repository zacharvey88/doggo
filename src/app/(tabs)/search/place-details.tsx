// src/app/tabs/search/PlaceDetailsScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { restaurantImages } from "@/data/restaurantImages";
import Colors from "@/src/constants/Colors";


const PlaceDetailsScreen = () => {
  const params = useLocalSearchParams();
  const place = JSON.parse(params.place);

  const {
    displayName,
    formattedAddress,
    primaryTypeDisplayName,
    currentOpeningHours,
    internationalPhoneNumber,
    websiteUri,
    weekdayDescriptions,
    photos,
    googleMapsUri,
  } = place;

  const handleCallPress = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{displayName.text}</Text>
        {photos && photos.length > 0 ? (
          <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
            {photos.map((photo, index) => (
              <Image
                key={index}
                source={{
                  uri: restaurantImages[index],
                }}
                style={styles.image}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noImagesText}>No Images Available</Text>
        )}
        <Text
          style={styles.mapsLink}
          onPress={() => Linking.openURL(googleMapsUri)}
        >
          {formattedAddress}
        </Text>
        <Text style={styles.type}>{primaryTypeDisplayName.text}</Text>
        <Text
          style={[
            styles.status,
            { color: currentOpeningHours?.openNow ? "green" : "red" },
          ]}
        >
          {currentOpeningHours?.openNow ? "Open Now" : "Closed"}
        </Text>
        {internationalPhoneNumber && (
          <TouchableOpacity
            onPress={() => handleCallPress(internationalPhoneNumber)}
          >
            <Text style={styles.phone}>{internationalPhoneNumber}</Text>
          </TouchableOpacity>
        )}
        {websiteUri && (
          <Text
            style={styles.website}
            onPress={() => Linking.openURL(websiteUri)}
          >
            Visit website
          </Text>
        )}
        {weekdayDescriptions && weekdayDescriptions.length > 0 && (
          <View style={styles.hoursContainer}>
            <Text style={styles.hoursTitle}>Opening Hours:</Text>
            {weekdayDescriptions.map((description, index) => (
              <Text key={index} style={styles.hours}>
                {description}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  imageContainer: {
    paddingVertical: 8,
  },
  noImagesText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginVertical: 8,
  },
  type: {
    fontSize: 18,
    marginVertical: 4,
    fontWeight: "500",
    textAlign: "center",
  },
  status: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: "center",
  },
  phone: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: "center",
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },
  website: {
    fontSize: 16,
    marginVertical: 4,
    color: Colors.light.tint,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  mapsLink: {
    fontSize: 16,
    marginVertical: 4,
    color: Colors.light.tint,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  hoursContainer: {
    marginTop: 16,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  hours: {
    fontSize: 16,
    marginVertical: 2,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default PlaceDetailsScreen;
