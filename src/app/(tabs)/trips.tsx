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
                  <Text style={styles.title}>Add a new trip:</Text>
                <Link href="/" asChild>
                  <Pressable style={styles.addTripButton}></Pressable>
                </Link>
                <FlatList
                  data={trips}
                  renderItem={({ item }) => {
                    return (
                    <View style={styles.placeItem}>
                      <TripAccomodationPhoto accom={item.accommodation_id}/>
                      <Text style={styles.title}>{item.title}</Text> 
                      <Text style={styles.tripText}><TripAccomodation accom={item.accommodation_id}/> </Text>
                      <Text style={styles.tripText}><TripAirline airline={item.airline_id}/> </Text>
                      <Text style={styles.tripText}>{item.start_date}   -   {item.end_date}</Text>
                    </View>
                    )
                  }}
                />
              </View>
            )
          ) : (
            <View>
              <Text>You are not currently signed in</Text>
              <Link href='/sign-in' asChild>
                <Pressable>
                  <Text>
                    To view your trips you must be signed in
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
    position: "absolute",
    bottom: "8%",
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
    padding:25,
    backgroundColor:"lightblue",
    borderRadius:"50%",
    alignItems: "center",
    height:50,
    width:50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    marginBottom:10,
    float:"right",
  },
});
