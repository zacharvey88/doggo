import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Link, useRouter } from "expo-router";
import TripList from "@/src/components/TripList";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import DeleteTripModal from "@/src/components/DeleteTripModal";
import { Database } from "@/src/lib/database.types";
import TripForm from "@/src/components/TripForm";
import { useAuth } from "@/src/providers/AuthProvider";
import SignInModal from "@/src/components/SignInModal";

export default function TabTrips() {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tripId, setTripId] = useState(null);
  const [trips, setTrips] = useState<
    Database["public"]["Tables"]["trips"]["Row"][]
  >([]);
  const [filteredTrips, setFilteredTrips] = useState(trips);
  const { session } = useAuth();
  const router = useRouter();

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  useEffect(() => {
    if (session) {
      getTrips();
    }
  }, [session]);

  async function getTrips() {
    if (!session?.user?.id) {
      console.log("User not logged in");
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("trips")
      .select("*, accommodation(title, photos), airlines(airline_name)")
      .eq("user_id", session.user.id)
      .order("start_date", { ascending: false });
    if (error) {
      console.log(error);
    }
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
              setDeleteModalVisible={setDeleteModalVisible}
              isDeleteModalVisible={isDeleteModalVisible}
              toggleDeleteModal={toggleDeleteModal}
              setTripId={setTripId}
              setTrips={setTrips}
              filteredTrips={filteredTrips}
              setFilteredTrips={setFilteredTrips}
              trips={trips}
            />
          </View>
          <Modal
            isVisible={isDeleteModalVisible}
            animationIn="slideInUp"
            onBackdropPress={toggleDeleteModal}
            backdropOpacity={0.8}
            backdropColor="black"
          >
            <View style={styles.modalDelete}>
              <DeleteTripModal
                trip_id={tripId}
                setDeleteModalVisible={setDeleteModalVisible}
                filteredTrips={setFilteredTrips}
                setFilteredTrips={setFilteredTrips}
                trips={trips}
              />
            </View>
          </Modal>
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
    backgroundColor: "white",
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Futura",
    color: "#3990CD",
  },
  addTripButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
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
