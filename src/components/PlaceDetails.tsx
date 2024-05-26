// src/components/PlaceDetails.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from "react-native";

const PlaceDetails = ({
  displayName,
  formattedAddress,
  location,
  googleMapsUri,
  photos,
  primaryTypeDisplayName,
  shortFormattedAddress,
  openNow,
  internationalPhoneNumber,
  websiteUri,
  weekdayDescriptions,
}) => {
  if (!displayName) return null;
  const photoUri ="https://media.istockphoto.com/id/184928432/photo/pizza-from-the-top-pepperoni-cheese.jpg?s=612x612&w=0&k=20&c=wkC4yrZLcvHqg-9kQtRb1wan_z15eiO1Z297OFSuxpg="
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{displayName}</Text>
      <Text style={styles.type}>{primaryTypeDisplayName}</Text>
      <Text style={styles.address}>{formattedAddress}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {photos &&
          photos.map((photo, index) => (
            <Image
              key={index}
              source={
                  {
                    uri: photoUri
                //   uri: `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.EXPO_PUBLIC_API_KEY}&maxWidthPx=400`,
                }
              }
              style={styles.image}
              resizeMode="cover"
            />
          ))}
      </ScrollView>

      <Text style={styles.link} onPress={() => openLink(googleMapsUri)}>
        View on Google Maps
      </Text>

      {websiteUri && (
        <Text style={styles.link} onPress={() => openLink(websiteUri)}>
          Visit Website
        </Text>
      )}

      {internationalPhoneNumber && (
        <Text style={styles.phone}>{internationalPhoneNumber}</Text>
      )}

      <Text style={styles.openNow}>{openNow}</Text>
      {/* <Text style={styles.address}>{shortFormattedAddress}</Text> */}
      <View style={styles.weekdayContainer}>
        <Text> hihihi</Text>
        {/* {weekdayDescriptions &&
          weekdayDescriptions.map((description, index) => (
            <Text key={index} style={styles.weekday}>
              {description}
            </Text>
          ))} */}
      </View>
    </View>
  );
};

const openLink = (url) => {
  Linking.openURL(url);
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  type: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 16,
  },
  scrollView: {
    marginBottom: 16,
  },
  scrollViewContent: {
    gap: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  link: {
    fontSize: 16,
    color: "#1E90FF",
    textAlign: "center",
    marginTop: 8,
  },
  phone: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  openNow: {
    fontSize: 16,
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 8,
  },
  weekdayContainer: {
    marginTop: 8,
  },
  weekday: {
    fontSize: 14,
    color: "#666",
  },
});

export default PlaceDetails;
