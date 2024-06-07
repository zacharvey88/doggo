// src/app/tabs/search/PlaceDetailsScreen.tsx
import React, {useEffect, useState} from "react";
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
import Colors from "@/src/constants/Colors";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import TripListSmall from "@/src/components/trip-components/TripListSmall";
import { useAuth } from "@/src/providers/AuthProvider";
export default function PlaceDetailsScreen() {

  const params = useLocalSearchParams();
  const { session } = useAuth();
  const place = JSON.parse(params.place);
  const [isTripModalVisible, setTripModalVisible] = useState(false);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const {
    displayName,
    formattedAddress,
    currentOpeningHours,
    internationalPhoneNumber,
    websiteUri,
    photos,
    googleMapsUri,
    reviews,
  } = place;

  const toggleAccordion = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  const handleCallPress = (phoneNumber:string) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const toggleTripModal = () => {
    setTripModalVisible(!isTripModalVisible);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {photos && photos.length > 0 ? (
          <ScrollView horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageContainer}>
            {photos.slice(0,5).map((photo: string, index: number) => (
              <Image
                key={index}
                source={{
                  uri: `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.EXPO_PUBLIC_API_KEY}&maxWidthPx=300`,
                }}
                style={photos.length > 1 ? styles.image : styles.singleImage}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noImagesText}>No Images Available</Text>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{displayName.text}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" style={styles.icon} />
            <Text
              style={styles.address}
              onPress={() => Linking.openURL(googleMapsUri)}
            >
              {formattedAddress.replace(/\b\w/g, (char) => char.toUpperCase())}
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
                Visit Website
              </Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Entypo name="add-to-list" style={styles.icon} />
            <Text
              style={styles.website}
              onPress={toggleTripModal}
              numberOfLines={1}
            >
              Add to a trip
            </Text>
          </View>

          <Modal
            isVisible={isTripModalVisible}
            animationIn="slideInUp"
            onBackdropPress={toggleTripModal}
            backdropOpacity={0.8}
            backdropColor="black"
          >
            <View style={styles.modalContent}>
              <TripListSmall
                user_id={session?.user.id}
                toggleModal={toggleTripModal}
                place={{name: displayName.text, address: formattedAddress, link: googleMapsUri}}
              />
            </View>
          </Modal>

          <View>
            {reviews}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    color: "gray",
    marginTop: -10
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    marginBottom: 10,
  },
  titleContainer: {
    margin: 10,
  },
  noImagesText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginVertical: 8,
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
    color: Colors.light.tint,
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
  singleImage: {
    width: 370,
    height: 200,
    borderRadius: 8,
  },
  icon: {
    marginRight: 20,
    marginLeft: 5,
    fontSize: 24,
    color: Colors.light.tint,
  },
  seeMoreHours: {
    color: Colors.light.tint,
    marginLeft: 8,
  },
  accordionContent: {
    marginLeft: 45, 
    marginTop: 8,
    marginBottom: 8,
    color: "gray"
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    margin: 0,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
});
