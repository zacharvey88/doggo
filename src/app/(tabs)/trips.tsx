import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';
import TripList from '@/src/components/TripList';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal'
import DeleteTripModal from '@/src/components/DeleteTripModal';
import { Database } from '@/src/lib/database.types';
import TripForm from '@/src/components/TripForm';
import { useAuth } from "@/src/providers/AuthProvider";
import SignInModal from "@/src/components/SignInModal";

export default function TabTrips() {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [tripId, setTripId] = useState(null)
  const [trips, setTrips] = useState<Database['public']['Tables']['trips']['Row'][]>([]);
  const [filteredTrips, setFilteredTrips] = useState(trips)
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const { session } = useAuth();

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleCreateModal = () => {
    setCreateModalVisible(!isCreateModalVisible);
  };
  
  useEffect(() => {
      fetchTrips();
  }, []);

  useEffect(() => {
    if (!session) {
      setLoginModalVisible(true);
    }
  }, [session]);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  const fetchTrips = async () => {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq("user_id", session?.user.id);
  
    if (!error && data) {
      setTrips(data);
      setFilteredTrips(data); 
    }
  };

  return (
    <>
      {session && session.user ? (
        <>
          <View style={styles.container}>
              <Pressable style={styles.addTripButton} onPress={toggleCreateModal}>
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
            />
          </View>
          {/* Delete Trip Modal */}
          <Modal
            isVisible={isDeleteModalVisible}
            animationIn="slideInUp"
            onBackdropPress={toggleDeleteModal}
            backdropOpacity={0.8}
            backdropColor="black">
            <View style={styles.modalDelete}>
              <DeleteTripModal 
                trip_id={tripId} 
                setDeleteModalVisible={setDeleteModalVisible} 
                filteredTrips={filteredTrips} 
                setFilteredTrips={setFilteredTrips}
                trips={trips}
              />
            </View>
          </Modal>
          {/* Add trip modal */}
          <Modal
            isVisible={isCreateModalVisible}
            animationIn="slideInUp"
            onBackdropPress={toggleCreateModal}
            backdropOpacity={0.8}
            backdropColor="black">
            <View style={styles.modalCreate}>
            <TripForm toggleCreateModal={toggleCreateModal} onTripAdded={fetchTrips} />
            </View>
          </Modal>
          </>
      ) : (
        <View style={styles.signInContainer}>
          <FontAwesome name="sign-in" style={styles.signInIcon}></FontAwesome>
          <Text style={styles.signInTitle}>
            Sign in to see your trips
          </Text>

<!--       <Link href="/profile" asChild>
            <Pressable style={styles.signInButton}>
              <Text style={styles.btnTitle}>Sign in</Text>
            </Pressable>
          </Link> -->

          <TouchableOpacity
            style={styles.button}
            onPress={() => setLoginModalVisible(true)}
          >
            <Text style={styles.btnTitle}>Sign in</Text>
          </TouchableOpacity>

        </View>
      )}
      <SignInModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signInContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },  
  signInButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#3990CD',
    marginTop: 15,
    width: '45%',
  },
  addTripButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  modalDelete: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#000',
    margin: 0,
    borderRadius: 20,
    height: 120,
    width: '90%'
  },
  modalCreate: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#000',
    margin: 0,
    borderRadius: 20,
    padding: 10,
    height: 500,
    width: 300
  },
  btnTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  signInTitle: {
    fontSize: 16,
    textAlign: "center",
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
  signInIcon: {
    fontSize: 60,
    color: '#3990CD',
    marginBottom: 10,
  }
});
