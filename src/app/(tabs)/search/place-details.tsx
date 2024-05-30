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
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const PlaceDetailsScreen = () => {
  const params = useLocalSearchParams();
  const place = JSON.parse(params.place);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };
  const {
    displayName,
    formattedAddress,
    primaryTypeDisplayName,
    currentOpeningHours,
    internationalPhoneNumber,
    websiteUri,
    photos,
    googleMapsUri,
  } = place;

  const handleCallPress = (phoneNumber:string) => {
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
            {photos.slice(0,5).map((photo: string, index: number) => (
              <Image
                key={index}
                source={{
                  // uri: restaurantImages[index],
                  uri: `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.EXPO_PUBLIC_API_KEY}&maxWidthPx=300`,
                }}
                style={styles.image}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noImagesText}>No Images Available</Text>
        )}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" style={styles.icon} />
            <Text
              style={styles.address}
              onPress={() => Linking.openURL(googleMapsUri)}
            >
              {formattedAddress}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" style={styles.icon} />
            <Text
              style={[
                styles.status,
                { color: currentOpeningHours?.openNow ? "green" : "#b10604" },
              ]}
            >
              {currentOpeningHours?.openNow ? "Open Now" : "Closed"}
            </Text>

            <TouchableOpacity onPress={toggleAccordion}>
              <Text style={styles.seeMoreHours}>
                {isAccordionExpanded ? "Hide hours" : "See more hours"}
              </Text>
            </TouchableOpacity>
          </View>
          {isAccordionExpanded && currentOpeningHours.weekdayDescriptions && (
            <View style={styles.accordionContent}>
              {currentOpeningHours.weekdayDescriptions.map(
                (description: string, index: number) => (
                  <Text key={index} style={styles.hours}>
                    {description}
                  </Text>
                )
              )}
            </View>
          )}

          {internationalPhoneNumber && (
            <View style={styles.infoRow}>
              <FontAwesome name="phone" style={styles.icon} />
              <TouchableOpacity
                onPress={() => handleCallPress(internationalPhoneNumber)}
              >
                <Text style={styles.phone}>{internationalPhoneNumber}</Text>
              </TouchableOpacity>
            </View>
          )}
          {websiteUri && (
            <View style={styles.infoRow}>
              <FontAwesome name="globe" style={styles.icon} />
              <Text
                style={styles.website}
                onPress={() => Linking.openURL(websiteUri)}
                numberOfLines={1}
              >
                {websiteUri}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "#f5f5f5",
    color: "gray",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
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
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginVertical: 8,
  },
  infoContainer: {
    marginTop: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  type: {
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  phone: {
    fontSize: 14,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  website: {
    fontSize: 14,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  address: {
    fontSize: 14,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  hoursContainer: {
    marginTop: 14,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  hours: {
    fontSize: 14,
    marginVertical: 2,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 8,
  },
  icon: {
    marginRight: 20,
    marginLeft: 5,
    fontSize: 24,
    color: Colors.light.tint,
  },
  seeMoreHours: {
    color: Colors.light.tint,
    textDecorationLine: "underline",
    marginLeft: 8,
  },
  accordionContent: {
    marginLeft: 45, 
    marginTop: 8,
    marginBottom: 8,
    color: "gray"
  },
});

export default PlaceDetailsScreen;
