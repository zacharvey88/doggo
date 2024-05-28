import { useEffect, useState } from "react";
import { View, Text } from "./Themed";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";
import { StyleSheet, FlatList, Pressable, Alert } from "react-native";
import dateFormat from "dateformat";
import { FontAwesome6} from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams,  } from "expo-router";

export default function TripListSmall({user_id, setModalVisible, table} : {user_id: string, setModalVisible: any, table: string}) {

  const [trips, setTrips] = useState<Database['public']['Tables']['trips']['Row'][]>([]);
  const [loading, setLoading] = useState(false)
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(()=>{
    getTrips()
  },[])

  async function getTrips () {
    setLoading(true)
    const {data} = await supabase.from('trips').select('*').eq("user_id",user_id)
    if(data){
      setTrips(data)
    }
    setLoading(false)
  }


  const addToTrip = async (trip_id, title) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('trips')
      .update(table === "airlines" ? {airline_id: id} : {accommodation_id: id})
      .eq('trip_id', trip_id)
      if (error) {
        console.log(error);
      } else {
        setModalVisible(false)
        Alert.alert(`${table === "airlines" ? "Airline" : "Accommodation"} added to ${title}`)
      }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <FlatList
          data={trips}
          ListEmptyComponent={() => (
            <Text style={styles.noTrips}>You don't have any trips</Text>
          )}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                addToTrip(item.trip_id, item.title);
              }}
            >
              <View style={styles.tripItem}>
                <View style={{ backgroundColor: "#f9f9f9" }}>
                  <Text style={styles.tripName}>{item.title}</Text>
                  <Text style={styles.tripDates}>
                    Tokyo - {dateFormat(item.start_date, "mmm yyyy")}
                  </Text>
                </View>
                <FontAwesome6
                  name="calendar-plus"
                  style={styles.icon}
                ></FontAwesome6>
              </View>
            </Pressable>
          )}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={"Create New Trip"}
          style={styles.button}
          onPress={() => router.push('/add-trip')}
        />
        <Button
          title={"Cancel"}
          style={styles.button}
          onPress={() => setModalVisible(false)}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    borderRadius: 15,
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
    alignItems:"center",
    alignContent:"center",
    padding:10,
    width:"100%",
    height: "100%",
    backgroundColor:"rgb(1,140,220)",
    borderRadius:20,
  },
  noTrips: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A90CD",
    textAlign: "center",
  },  
  buttonContainer: {
    flex:1,
    flexDirection:"row",
    alignItems:"center",
  },
});