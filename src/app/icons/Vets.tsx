import { View } from "@/src/components/Themed"
import { Stack } from "expo-router"
import { Text } from "react-native-elements"
import { useState, useEffect} from "react"
import { Database } from "@/src/lib/database.types"
import { FlatList } from "react-native"
import VetsListItem from "@/src/components/VetsListItem"
import { supabase } from "@/src/lib/supabase"

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
            <Stack.Screen options={{ title: 'Vets' }} />
            <Text>
                Hi from the Vets Page
            </Text>
            <FlatList
                data={vets}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                columnWrapperStyle={{ gap: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => 
                    <Text>{item.id}</Text>}
            />
        </View>
    )
}

export default Vets