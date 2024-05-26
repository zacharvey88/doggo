import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';
import TripList from '@/src/components/TripList';
import { AntDesign } from '@expo/vector-icons';

export default function TabTrips() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // const deletedTrips = trips;

  // if (tripId && deletePressed) {
  //   if (deletedTrips.length > 0) {
  //     for (let i = 0; i < deletedTrips.length; i++) {
  //       if (deletedTrips[i].trip_id === tripId) {
  //         deletedTrips.splice(i, 1);
  //         setDeletePressed(false);
  //       }
  //     }
  //   }
  // }

  // if (session) {
  //   if (trips.length === 0) {
  //     return (
  //       <View style={styles.container}>
  //         <Text style={styles.noTripsText}>
  //           You haven't created any trips yet
  //         </Text>
  //         <Link href="/Trip" asChild>
  //           <Pressable style={styles.addTripButton}>
  //             <AntDesign name="pluscircle" size={30} color="rgb(1,140,220)" />
  //           </Pressable>
  //         </Link>
  //       </View>
  //     );
  //   }
  // }

  return (
    <>
      {session && session.user ? (
          <View style={styles.container}>
              <Pressable style={styles.addTripButton} onPress={() => setModalVisible(true)}>
                <AntDesign name="pluscircle" size={40} color="rgb(1,140,220)" />
              </Pressable>
            <TripList
              user_id={session.user.id}
              setModalVisible={setModalVisible}
            />
          </View>
      ) : (
        <View style={styles.signInContainer}>
          <Text style={styles.signInTitle}>
            You must be logged in to see your trips
          </Text>
          <Link href="/profile" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.btnTitle}>Sign in</Text>
            </Pressable>
          </Link>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },  
  placeItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#3990CD',
    marginTop: 20,
    width: '72%',
  },
  tripText: {
    fontSize: 14,
    color: '#666',
  },
  addTrip: {
    color: "black",
  },
  addTripButton: {
   position:"absolute",
   bottom:20,
   right:20,
   zIndex:1,
  },
  iconContainer: {
    backgroundColor: '#F9F9F9',
    flex:1,
    flexDirection:"row",
    justifyContent:"flex-end",
    gap:15,
  },  
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    margin: 0,
    borderRadius: 40,
    padding: 40
  },
  btnTitle: {
    fontWeight:"bold",
    fontSize:16,
    color:"white"
  },
  signInTitle: {
    marginTop:40,
    fontSize: 16,
    textAlign: 'center',
  },
  noTripsText: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: "40%",
    flex:1,
    justifyContent:"center"
  },
  loading: {
    marginBottom: 20,
  },
});
