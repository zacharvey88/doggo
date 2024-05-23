import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/src/components/Themed';
import { SearchBar, Icon } from "react-native-elements";
import { FlatList } from 'react-native';
import AccommodationListItem from '@/src/components/AccommodationListItem';
import { supabase } from '@/src/lib/supabase';
import { Json } from '@/src/lib/database.types';
import { FontAwesome6 } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';

export default function TabSearch() {
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    setSearch(search);
  };

  const [accom, setAccom] = useState<{
    accommodation_id: number
    description: string
    address: string
    phone: string | null
    photos: Json | null
    title: string
  }[]>([]);
  useEffect(() => {
    getAccom();
  }, []);
  async function getAccom() {
    const { data } = await supabase.from("accommodation").select('*')
    setAccom(
      data as {
        accommodation_id: number;
        description: string;
        address: string;
        phone: string | null;
        photos: Json | null;
        title: string;
      }[]
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Friendly Places</Text>
      <SearchBar
        placeholder="Enter a city!"
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
      />
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
      </View>
      <View style={styles.list}>
        
      <FlatList
        data={accom}
        renderItem={({ item }) => <AccommodationListItem accom={item} />}
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        
      />
      </View>
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
  }
});
