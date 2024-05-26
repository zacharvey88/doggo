import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { Json } from "@/src/lib/database.types";
import { useRouter } from "expo-router";

type AccommodationListItemProps = {
  accommodation: {
    accommodation_id: number;
    description: string;
    address: string;
    phone: string | null;
    photos: Json | null;
    title: string;
    postcode: number | string;
    booking_url: string;
    city: string;
    country: string;
  };
};

const AccommodationListItem: React.FC<AccommodationListItemProps> = ({
  accommodation,
}) => {
  const router = useRouter();
  const photoUri =
    Array.isArray(accommodation.photos) && accommodation.photos.length > 0
      ? (accommodation.photos[0] as string)
      : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{accommodation.title}</Text>
        <Text>{accommodation.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: `/search/${accommodation.accommodation_id}`,
              params: {
                title: accommodation.title,
                description: accommodation.description,
                address: accommodation.address,
                phone: accommodation.phone,
                photos: photoUri,
                postcode: accommodation.postcode,
                booking_url: accommodation.booking_url,
                city: accommodation.city,
                country: accommodation.country,
              },
            })
          }
        >
          <Text style={styles.buttonText}>See More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 415,
    overflow: "hidden",
    marginBottom: 10,
  },
  imageContainer: {
    width: "98%",
    height: "60%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3,
    marginTop: 3,
    borderRadius: 10,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    alignSelf: "stretch",
    borderRadius: 10,
    height: 40,
    marginTop: 10,
    backgroundColor: "#841584",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AccommodationListItem;
