import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import TripList from "@/src/components/trip-components/TripList";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Database } from "@/src/lib/database.types";
import { useAuth } from "@/src/providers/AuthProvider";

export default function TabTrips() {
  const [loading, setLoading] = useState(false);
  const [tripId, setTripId] = useState(null);
  const [trips, setTrips] = useState<
    Database["public"]["Tables"]["trips"]["Row"][]
  >([]);
  const [filteredTrips, setFilteredTrips] = useState(trips);
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
      getTrips();
  }, []);

  async function getTrips() {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("trips")
      .select("*, accommodation(title, photos), airlines(airline_name)")
      .eq("user_id", session.user.id)
      .order("start_date", { ascending: false });
    if (data) {
      setTrips(data);
      setFilteredTrips(data);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {session && session.user ? (
        <>
          <View style={styles.container}>
            <Pressable
              style={styles.addTripButton}
              onPress={() => {
                router.push("/add-trip");
              }}
            >
              <AntDesign name="pluscircle" size={40} color="rgb(1,140,220)" />
            </Pressable>
            <TripList
              user_id={session.user.id}
              setTripId={setTripId}
              setTrips={setTrips}
              filteredTrips={filteredTrips}
              setFilteredTrips={setFilteredTrips}
              trips={trips}
              loading={loading}
            />
          </View>
        </>
      ) : (
        <View style={styles.signInContainer}>
          <FontAwesome name="sign-in" style={styles.signInIcon}></FontAwesome>
          <Text style={styles.signInTitle}>Sign in to view your trips</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={styles.btnTitle}>Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "#3990CD",
    marginTop: 15,
    width: "45%",
  },
  addTripButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 99,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  modalDelete: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#000",
    margin: 0,
    borderRadius: 20,
    height: 120,
    width: "90%",
  },
  modalCreate: {
    alignSelf: "center",
    justifyContent: "center",
    color: "#000",
    margin: 0,
    borderRadius: 20,
    padding: 10,
    height: 500,
    width: 300,
  },
  noTripsText: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: "40%",
    flex: 1,
    justifyContent: "center",
  },
  loading: {
    marginBottom: 20,
  },
  signInContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  signInIcon: {
    fontSize: 60,
    color: "#3990CD",
    marginBottom: 10,
  },
  signInTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  btnTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
