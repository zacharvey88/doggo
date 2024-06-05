import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from "react-native";
import { Button } from "react-native-elements";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { supabase } from "@/src/lib/supabase";
import Modal from "react-native-modal";
import TripListSmall from "@/src/components/trip-components/TripListSmall";
import { useAuth } from "@/src/providers/AuthProvider";
import ReviewForm from "@/src/components/review-components/ReviewForm";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import ReviewsList from "@/src/components/review-components/ReviewsList";

export default function Accommodation() {
  const router = useRouter();
  const [isTripModalVisible, setTripModalVisible] = useState(false);
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const { session } = useAuth();
  const [rating, setRating] = useState(0);
  const {
    id,
    title,
    description,
    address,
    phone,
    photos,
    postcode,
    booking_url,
    city,
    state,
    country,
  } = useLocalSearchParams();

  const formattedAddress = `${address},+${city},+${state},+${postcode},+${country}`

  const toggleTripModal = () => {
    setTripModalVisible(!isTripModalVisible);
  };

  const toggleReviewModal = () => {
    setReviewModalVisible(!isReviewModalVisible);
  };

  useEffect(() => {
    getRating();
  }, []);

  const getRating = async () => {
    const { data: ratings, error } = await supabase
      .from("reviews_accommodation")
      .select("rating")
      .eq("accommodation_id", id);
    if (ratings) {
      const totalRatings = ratings.reduce(
        (acc, rating) => acc + rating.rating,
        0
      );
      const averageRating = totalRatings / ratings.length;
      setRating(averageRating);
    }
  };

  const images = photos ? photos.split(",") : [];

  const handleAddButton = (button: string) => {
    if (session && session.user) {
      button === "review" ? toggleReviewModal() : toggleTripModal();
    } else {
      Alert.alert(
        "Not Logged In",
        `You must be logged in to ${
          button === "review" ? "add a review" : "add to a trip"
        }`,
        [
          {
            text: "Okay",
            style: "default",
          },
          {
            text: "Login",
            onPress: () => router.push("/sign-in"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal
        isVisible={isTripModalVisible}
        animationIn="slideInUp"
        onBackdropPress={toggleTripModal}
        backdropOpacity={0.8}
        backdropColor="black"
      >
        <View style={styles.modalTrip}>
          <TripListSmall
            user_id={session?.user.id}
            toggleModal={toggleTripModal}
            table={"accommodation"}
            accommodation_id={id}
          />
        </View>
      </Modal>

      <Modal
        isVisible={isReviewModalVisible}
        animationIn="slideInUp"
        onBackdropPress={toggleReviewModal}
        backdropOpacity={0.8}
        backdropColor="black"
      >
        <View style={styles.modalReview}>
          <ReviewForm
            id={id}
            edit={false}
            toggleModal={toggleReviewModal}
            session={session}
            table={"accommodation"}
          />
        </View>
      </Modal>

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.card}>
            <Stack.Screen options={{ title: "", headerBackTitle: "Back" }} />
            {photos ? (
              <ScrollView
                horizontal
                contentContainerStyle={styles.imageContainer}
              >
                {images.map((photo: string, index: number) => (
                  <Image
                    key={index}
                    source={{
                      uri: images[index],
                    }}
                    style={styles.image}
                  />
                ))}
              </ScrollView>
            ) : (
              <Text>No Image Available</Text>
            )}
            <Text style={styles.title}>{title}</Text>
            <StarRatingDisplay style={styles.rating} rating={rating} />

            {description && (
              <View style={styles.textContainer}>
                <Text style={styles.text}>{description}</Text>
              </View>
            )}

            <View style={styles.infoContainer}>

              <View style={styles.infoRow}>
                <FontAwesome name="map-marker" style={styles.icon} />
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.co.uk/maps/search/${formattedAddress}`)}>
                  <Text style={styles.address}>
                    {address}, {city}, {postcode}, {country}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <FontAwesome name="phone" style={styles.icon} />
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
                  <Text style={styles.phone}>{phone}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Book Now"
                titleStyle={{ fontSize: 14 }}
                style={styles.button}
                onPress={() => {
                  Linking.openURL(booking_url);
                }}
              />

              <Button
                title="Add Review"
                titleStyle={{ fontSize: 14 }}
                style={styles.button}
                onPress={() => {
                  handleAddButton("review");
                }}
              />

              <Button
                title="Add to trip"
                titleStyle={{ fontSize: 14 }}
                style={styles.button}
                onPress={() => {
                  handleAddButton("trip");
                }}
              />
            </View>
            <ReviewsList id={id} table="reviews_accommodation" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  rating: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    height: 35,
  },
  textContainer: {
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 5,
    marginBottom: 15,
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A90CD",
    marginBottom: 10,
    textAlign: "center",
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    padding: 100,
    margin: 5,
  },
  imageContainer: {
    paddingVertical: 8,
  },
  scrollView: {
    marginBottom: 10,
  },
  modalTrip: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    margin: 0,
  },
  modalReview: {
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    margin: 0,
    borderRadius: 40,
    height: "43%",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#3A90CD",
  },
  reviewTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
    marginTop: 10,
    color: "#3A90CD",
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
    color: "gray",
  },
  divider: {
      borderBottomColor: 'gray',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginVertical: 10
  }
});
