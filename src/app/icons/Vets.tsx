import { View } from "@/src/components/Themed"
import { Stack } from "expo-router"
import { Text } from "react-native-elements"
import { useState, useEffect} from "react"
import { Database } from "@/src/lib/database.types"
import { FlatList } from "react-native"
import { supabase } from "@/src/lib/supabase"
import { StyleSheet } from "react-native"
import { Image } from "react-native-elements"

const Vets = () => {
     const [vets, setVets] = useState<
       Database["public"]["Tables"]["vets"]["Row"][]
         >([]);
    
     useEffect(() => {
       getVets();
     }, []);
    
     async function getVets() {
       const { data, error } = await supabase.from("vets").select("*");
       if (data) {
         setVets(data);
       }
     }



    return (
      <View>
        <Stack.Screen options={{ title: "Vets" }} />
        <Text>Hi from the Vets Page</Text>
        <FlatList
          data={vets}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.placeItem}>
              <Text style={styles.placeType}>{item.title}</Text>
              <Text style={styles.placeAddress}>{item.address}</Text>
              {item.photos[0] ? (
                <Image
                  source={{
                    uri: item.photos[0],
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Text>No Image Available</Text>
              )}
            </View>
          )}
        />
      </View>
    );
}

export default Vets

const styles = StyleSheet.create({
    image: { 
        width: 100,
        height: 100
    },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: 16,
  },
  placeGoogleMapsUri: {
    fontSize: 14,
    color: '#666',
  },
  placeType: {
    fontSize: 14,
    color: '#666',
  },
  placeLocation: {
    fontSize: 14,
    color: '#666',
  },
});




