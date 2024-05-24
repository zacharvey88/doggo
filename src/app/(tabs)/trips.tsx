import { StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';
import { Database, Json } from '@/src/lib/database.types';
import TripAccomodation from '@/src/components/TripAccommodation';
import TripAirline from '@/src/components/TripAirline';
import TripAccomodationPhoto from '@/src/components/TripAccommodationPhoto';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import DeleteTrip from '@/src/components/DeleteTrip';

export default function TabTrips() {
  const [loading, setLoading] = useState(false)

  const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    }, [])
    
  const [trips, setTrips] = useState<Database['public']['Tables']['trips']['Row'][]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [tripId, setTripId] = useState(0)
    useEffect(()=>{
      if(session){
      getTripInfo()
    }
    },[session?.user.id])
    async function getTripInfo () {
          setLoading(true)
          const {data} = await supabase.from('trips').select('*').eq("user_id",session.user.id)
          if(data){
            setTrips(data)
          }
          setLoading(false)
      }

      return (
        <>
          {session && session.user ? (
            loading ? (
              <View style={styles.container}>

              <Text>loading</Text>
              </View>
            ) : (
              <View style={styles.container}>
                <Link href="/Trip" asChild>
                <Pressable style={styles.addTripButton}><AntDesign name="pluscircle" size={60} color="lightblue" /></Pressable>
                </Link>
                <FlatList
                  data={trips}
                  renderItem={({ item }) => {
                    const toggleModal = () => {
                      setModalVisible(!isModalVisible);
                      setTripId(item.trip_id)
                    };
                    return (
                    <>
                      <Modal style={styles.modal}
                        isVisible={isModalVisible}
                        animationIn="slideInUp"
                        onBackdropPress={toggleModal}
                        backdropOpacity={0.4}
                        backdropColor="black">
                        <View style={styles.modal}>
                          <DeleteTrip trip_id={tripId} setModalVisible={setModalVisible}/>
                        </View>
                      </Modal>
                      <View style={styles.placeItem}>
                        <TripAccomodationPhoto accom={item.accommodation_id}/>
                        <Text style={styles.title}>{item.title}</Text> 
                        <Text style={styles.tripText}>
                          <TripAccomodation accom={item.accommodation_id}/> 
                        </Text>
                        <Text style={styles.tripText}>
                          <TripAirline airline={item.airline_id}/>
                        </Text>
                        <Text style={styles.tripText}>{item.start_date}   -   {item.end_date}</Text>
                        <View style={styles.iconContainer}>

                        <Pressable>
                          <AntDesign name="edit" size={24} color="black" />
                        </Pressable>

                        <Pressable onPress={toggleModal}>
                          <Ionicons name="trash-bin" size={24} color="black" />
                        </Pressable>
                        
                      </View>
                    </View>
                      </>
                    )
                  }}
                />
              </View>
            )
          ) : (
            <View style={styles.container}>
              <Text style={styles.signInTitle}>You are not currently signed in</Text>
                    <Text style={styles.signInTitle2}>To view your trips you must be signed in</Text>
              <Link href='/profile' asChild>
                <Pressable style={styles.button}>
                  <Text style={styles.signInText}>
                    Sign in
                  </Text>
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
    padding: 16,
    backgroundColor: '#fff',
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignSelf:"center",
    position: "absolute",
    top: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgb(1,140,220)',
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
   bottom:10,
   right:10,
   zIndex:1,
  },
  iconContainer: {
    backgroundColor: '#F9F9F9',
    flex:1,
    flexDirection:"row",
    justifyContent:"flex-end",
  },  
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    margin: 0,
    borderRadius: 40,
  },
  signInText: {
    fontWeight:"bold",
    fontSize:30,
    color:"white"
  },
  signInTitle: {
    marginTop:40,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInTitle2: {
    marginTop:5,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
