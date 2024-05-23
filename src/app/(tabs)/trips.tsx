import { StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';
import { Database, Json } from '@/src/lib/database.types';

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
          console.log(data)
          if(data){
            setTrips(data)
          }
          setLoading(false)
      }
      console.log(trips)
      return (
        <>
          {session && session.user ? (
            loading ? (
              <View style={styles.container}>

              <Text>loading</Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={trips}
                  renderItem={({ item }) => {
                    { console.log(item, "heelololo") }
                    return <Text style={styles.title}>{item.title} accommodation:{item.accommodation_id} airline:{item.airline_id} start date:{item.start_date} end date:{item.end_date}</Text>;
                  }}
                  contentContainerStyle={{ gap: 10, padding: 10 }}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"blue"
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
});
