import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text } from '@/src/components/Themed';
import { SearchBar } from "react-native-elements";
import { FlatList } from 'react-native';
import AccommodationListItem from '@/src/components/AccommodationListItem';
import { supabase } from '@/src/lib/supabase';
import { FontAwesome6 } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Database } from '@/src/lib/database.types';

export default function TabSearch() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [accommodation, setAccommodation] = useState<Database['public']['Tables']['accommodation']['Row'][]>([]);
  const [filteredAccommodation, setFilteredAccommodation] = useState<Database['public']['Tables']['accommodation']['Row'][]>([]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    getAccommodation();
  }, []);


  async function getAccommodation() {
    setLoading(true);
    const { data, error } = await supabase
      .from('accommodation')
      .select('*')
      .order('accommodation_id', { ascending: true });
    if (data) {
      setAccommodation(data);
      setFilteredAccommodation(data); 
    } 
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <Stack.Screen options={{ title: ""}} />
          <ActivityIndicator style={styles.loading} />
          <Text>Loading</Text>
        </>
      ) : (
        <>
            <Text style={styles.title}>Pet Friendly Places</Text>
            <SearchBar
              placeholder="Enter a city!"
              onChange={setSearch}
              value={search}
              lightTheme
              round
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.searchInput} />

          
          <View style={styles.container_filter}>
              <View style={styles.iconContainer}>
                <FontAwesome6 name="shield-dog" style={styles.icon} />
                <Text style={styles.filterText}>Vets</Text>
              </View>
              <View style={styles.iconContainer}>
                <FontAwesome6 name="shop" style={styles.icon} />
                <Text style={styles.filterText}>Shops</Text>
              </View>
              <View style={styles.iconContainer}>
                <FontAwesome6 name="tree" style={styles.icon} />
                <Text style={styles.filterText}>Parks</Text>
              </View>
              <View style={styles.iconContainer}>
                <FontAwesome6 name="umbrella-beach" style={styles.icon} />
                <Text style={styles.filterText}>Beaches</Text>
              </View>
            </View><View style={styles.list}>

              <FlatList
                data={accommodation}
                renderItem={({ item }) => <AccommodationListItem accommodation={item} />}
                numColumns={1}
                contentContainerStyle={{ gap: 10, padding: 10 }} />
            </View></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_filter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    marginTop:10,
  },
  iconContainer: {
    alignItems: "center",
    marginLeft: 10,
    marginRight: 20
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  filterText: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10, 
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
  list: {
    flex: 1
  },
  loading: {
    marginBottom: 30,
  }
});
