import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, Pressable } from "react-native";
import { Json } from "@/src/lib/database.types";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import { StarRatingDisplay } from "react-native-star-rating-widget";

type AccommodationListItemProps = {
  accommodation: {
    accommodation_id: number;
    description: string;
    address: string;
    phone: string | null;
    photos: [];
    title: string;
    postcode: number | string;
    booking_url: string;
    city: string;
    country: string;
  };
};


const AccommodationListItem: React.FC<AccommodationListItemProps> = ({accommodation}) => {

  const [rating, setRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getRating();
  }, [rating]);

  const getRating = async () => {
    const { data: ratings, error } = await supabase
      .from("reviews_accommodation")
      .select("rating")
      .eq("accommodation_id", accommodation.accommodation_id )
    if (ratings) {
      const totalRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0)
      const averageRating = totalRatings / ratings.length
      setRating(averageRating)
    }
  }

  return (
    <View style={styles.container}>
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
                photos: accommodation.photos,
                postcode: accommodation.postcode,
                booking_url: accommodation.booking_url,
                city: accommodation.city,
                country: accommodation.country,
                rating: rating
              },
            })
          }
        >
      <View style={styles.imageContainer}>
        {accommodation.photos ? (
          <Image
            source={{ uri: accommodation.photos[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.title}>{accommodation.title}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.city}>{accommodation.city}, {accommodation.country} </Text>
          <StarRatingDisplay rating={rating} starSize={20}></StarRatingDisplay>
        </View>
          {/* <Text style={styles.buttonText}>View Full Details</Text> */}
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    flex: 1,
    overflow: "hidden",
    marginBottom: 10,
    height: 'auto',
    minHeight: 220,
    backgroundColor: '#F9F9F9',
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    marginBottom: 3,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  city: {
    fontSize: 16,
  }
});

export default AccommodationListItem;
