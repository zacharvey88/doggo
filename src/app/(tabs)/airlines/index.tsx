import { FlatList, StyleSheet, Image, ActivityIndicator, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { supabase } from '@/src/lib/supabase';
import { useEffect, useState } from 'react'; 
import { Database } from '@/src/lib/database.types';
import { SearchBar } from 'react-native-elements';
import { Link, Stack } from 'expo-router';

export default function TabAirlines() {

  const [airlines, setAirlines] = useState<Database['public']['Tables']['airlines']['Row'][]>([]);
  const [filteredAirlines, setFilteredAirlines] = useState<Database['public']['Tables']['airlines']['Row'][]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAirlines();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredAirlines(airlines);
    } else {
      const filtered = airlines.filter((airline) => 
        airline.airline_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAirlines(filtered);
    }
  }, [searchTerm, airlines]);

  async function getAirlines() {
    setLoading(true);
    const { data, error } = await supabase
      .from('airlines')
      .select('*')
      .order('airline_name', { ascending: true });
    if (data) {
      setAirlines(data);
      setFilteredAirlines(data); 
    } 
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <Stack.Screen options={{ title: "Airlines"}} />
          <ActivityIndicator style={styles.loading} />
          <Text>Loading</Text>
        </>
      ) : (
        <>
          <SearchBar
            placeholder="Search for an airline..."
            onChangeText={value => setSearchTerm(value)}
            value={searchTerm}
            lightTheme
            round
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
          />
          <FlatList
            data={filteredAirlines}
            keyExtractor={(item) => item.airline_id.toString()}
            numColumns={2}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            columnWrapperStyle={{ gap: 10 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => 
              <Link href={`/airlines/${item.airline_id}`} asChild>
                <Pressable>
                <Image 
                  source={{ uri: item.airline_logo_url }} 
                  style={styles.image} 
                  resizeMode='contain' />
                </Pressable>
              </Link>
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchInput: {
    backgroundColor: "#e0e0e0",
  },
  loading: {
    marginBottom: 30,
  }
});
