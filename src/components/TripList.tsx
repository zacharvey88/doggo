import { useEffect, useState } from "react";
import { View, Text } from "./Themed";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";
import { StyleSheet, FlatList} from "react-native";
import { Button } from "react-native-elements";
import { Navigator } from "expo-router";
import { ActivityIndicator } from "react-native";
import TripCard from "./TripCard";

export default function TripList({user_id, toggleDeleteModal, setTripId, setTrips, filteredTrips, setFilteredTrips, trips} : {user_id: string, toggleDeleteModal: any, setTripId: any, setTrips: any, filteredTrips: any, setFilteredTrips: any, trips: any}) {

  const [loading, setLoading] = useState(false)

  // useEffect(()=>{
  //   getTrips()
  // },[])

  // async function getTrips () {
  //   setLoading(true)
  //   const {data, error} = await supabase
  //   .from('trips')
  //   .select('*, accommodation(title, photos), airlines(airline_name)')
  //   .eq("user_id",user_id)
  //   .order('start_date', { ascending: false });
  //   if (error) {
  //     console.log(error);
  //   }
  //   if(data){
  //     setTrips(data)
  //     setFilteredTrips(data)
  //   }
  //     setLoading(false)
  // }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <FlatList
          data={filteredTrips}
          keyExtractor={(item) => item.trip_id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListEmptyComponent={
            <Text style={{ fontSize: 16 }}>You have no trips saved</Text>
          }
          renderItem={({ item }) => (
            <TripCard
              trip={item}
              toggleDeleteModal={toggleDeleteModal}
              setTripId={setTripId}
              trips={trips}
              filteredTrips={filteredTrips}
              setFilteredTrips={setFilteredTrips}
            ></TripCard>
          )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  noTrips: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A90CD",
    textAlign: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});