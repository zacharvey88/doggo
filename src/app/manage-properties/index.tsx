import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";
import {
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import dateFormat from "dateformat";
import { Button } from "react-native-elements";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { Text, View } from "../../components/Themed";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ScreenHeight } from "react-native-elements/dist/helpers";

type AccommodationListItemProps = {
  accom: {
    accommodation_id: number;
    description: string;
    address: string;
    phone: string | null;
    photos: string[];
    title: string;
    postcode: number | string;
    booking_url: string;
    city: string;
    country: string;
    rating: number;
  };
};

const ManageProperties: React.FC<AccommodationListItemProps> = () => {
  const [accommodation, setAccommodation] = useState<
    Database["public"]["Tables"]["accommodation"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { session, profile } = useAuth();

  useEffect(() => {
    getAccommodation();
  }, []);

  async function getAccommodation() {
    setLoading(true);
    const { data } = await supabase
      .from("accommodation")
      .select("*")
      .eq("user_id", session?.user.id);
    if (data) {
      setAccommodation(data);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          style={{ width: "100%" }}
          data={accommodation}
          ListEmptyComponent={() => (
            <Text style={styles.noProperty}>You don't have any properties</Text>
          )}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.placeItem}
                onPress={() =>
                  router.push({
                    pathname: `/manage-properties/${item.accommodation_id}`,
                    params: {
                      accommodation_id: item.accommodation_id,
                      title: item.title,
                      description: item.description,
                      address: item.address,
                      phone: item.phone,
                      photos: item.photos,
                      postcode: item.postcode,
                      booking_url: item.booking_url,
                      city: item.city,
                      country: item.country,
                      rating: item.rating,
                    },
                  })
                }
              >
                <View style={styles.imageContainer}>
                  {item.photos && item.photos.length > 0 ? (
                    <Image
                      source={{ uri: item.photos[0] }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text>No Image Available</Text>
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.titleContainer}>
                    <Text style={styles.city}>
                      {item.city}, {item.country}{" "}
                    </Text>
                    <StarRatingDisplay rating={item.rating} starSize={20} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.accommodation_id.toString()}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.addTripButton}
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
  container: {
    padding: 20,
    width: "100%",
    borderRadius: 15,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tripItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    marginVertical: 10,
  },
  tripName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A90CD",
  },
  tripDates: {
    fontSize: 16,
  },
  tripCity: {
    fontSize: 16,
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
  placeItem: {
    marginBottom: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    minWidth: "100%",
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
  addTripButton: {
    position: "absolute",
    top: ScreenHeight*0.7,
    right: 30,
    zIndex: 2,
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
});

export default ManageProperties;
