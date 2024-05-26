import { useEffect, useState } from "react";
import { View, Text } from "./Themed";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";
import { StyleSheet, FlatList} from "react-native";
import { Button } from "react-native-elements";
import { Navigator } from "expo-router";
import { ActivityIndicator } from "react-native";
import TripCard from "./TripCard";

export default function TripList({user_id, setModalVisible} : {user_id: string, setModalVisible: any}) {

  const [trips, setTrips] = useState<Database['public']['Tables']['trips']['Row'][]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    getTrips() 
  },[])

  async function getTrips () {
    setLoading(true)
    const {data, error} = await supabase
    .from('trips')
    .select('*, accommodation(title, photos), airlines(airline_name)')
    .eq("user_id",user_id)
    .order('start_date', { ascending: false });
    if (error) {
      console.log(error);
    }
    if(data){
      setTrips(data)
    }
      setLoading(false)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.trip_id}
          ListEmptyComponent={() => <Text style={styles.noTrips}>You don't have any trips</Text>}
          renderItem={({ item }) => <TripCard trip={item} setModalVisible={setModalVisible}></TripCard>}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    borderRadius: 15,
  },
  noTrips: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A90CD",
    textAlign: "center",
  },
});