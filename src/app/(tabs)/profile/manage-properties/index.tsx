import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { Text, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";

const ManageProperties = () => {
  const [accommodation, setAccommodation] = useState<
    Database["public"]["Tables"]["accommodation"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    getAccommodation();
  }, []);

  async function getAccommodation() {
    setLoading(true);
    const { data } = await supabase
      .from("accommodation")
      .select("*")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });

    if (data) {
      const accommodationsWithRatings = await Promise.all(
        data.map(async (item) => {
          const rating = await getRating(item.accommodation_id);
          return { ...item, rating };
        })
      );
      setAccommodation(accommodationsWithRatings);
    }
    setLoading(false);
  }

  const getRating = async (accommodation_id) => {
    const { data: ratings, error } = await supabase
      .from("reviews_accommodation")
      .select("rating")
      .eq("accommodation_id", accommodation_id);
    if (ratings) {
      const totalRatings = ratings.reduce(
        (acc, rating) => acc + rating.rating,
        0
      );
      const averageRating = totalRatings / ratings.length;
      return averageRating;
    }
    return 0;
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          style={{ width: "100%" }}
          data={accommodation}
          ListEmptyComponent={() => (
            <Text style={styles.noProperty}>You don't have any properties</Text>
          )}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: `/search/${item.accommodation_id}`,
                      params: {
                        title: item.title,
                        description: item.description,
                        address: item.address,
                        phone: item.phone,
                        photos: item.photos,
                        postcode: item.postcode,
                        booking_url: item.booking_url,
                        city: item.city,
                        // state: item.state,
                        country: item.country,
                        rating: item.rating
                      },
                    })
                  }
                  style={styles.propertyCard}
                >
                  <View style={styles.imageContainer}>
                    {item.photos && item.photos.length > 0 ? (
                      <Image
                        source={{ uri: item.photos[0] }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={require('@/assets/images/photo-placeholder.png')}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.titleContainer}>
                      <Text style={styles.city}>
                        {item.city}, {item.country}{" "}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editIconContainer}
                  onPress={() =>
                    router.push({
                      pathname: `/add-accommodation/`,
                      params: {
                        existingAccommodation_id: item.accommodation_id,
                        existingTitle: item.title,
                        existingDescription: item.description,
                        existingAddress: item.address,
                        existingPhone: item.phone,
                        existingPostcode: item.postcode,
                        existingBookingUrl: item.booking_url,
                        existingCity: item.city,
                        existingCountry: item.country,
                        existingState: item.state,
                        existingPhotos: Array.isArray(item.photos) ? item.photos : [],
                        edit: true,
                      },
                    })
                  }>
                  <MaterialIcons name="edit-note" size={25} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.accommodation_id.toString()}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.addPropertyButton}
        onPress={() => {
          router.push("/add-accommodation");
        }}
      >
        <AntDesign name="pluscircle" size={40} color="rgb(1,140,220)" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor:"#fff"
  },
  container: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tripItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  icon: {
    fontSize: 20,
    color: "#3A90CD",
  },
  button: {
    padding: 5,
    flexGrow: 1,
    backgroundColor: "rgb(1,140,220)",
    borderRadius: 10,
  },
  noProperty: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A90CD",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  propertyCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 150,
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
  addPropertyButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 3,
    backgroundColor: "#fff",
    borderRadius: 99,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 3,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  city: {
    fontSize: 16,
  },
  editIconContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    position: "absolute",
    top: 30,
    right: 30,
    zIndex: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  editIcon: {
    color: "#000",
  },
});

export default ManageProperties;
