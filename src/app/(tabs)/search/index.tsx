import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, ActivityIndicator, FlatList } from "react-native";
import { Text } from "@/src/components/Themed";
import { SearchBar } from "react-native-elements";
import AccommodationListItem from "@/src/components/AccommodationListItem";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

export default function TabSearch() {
  const [accommodation, setAccommodation] = useState<Database['public']['Tables']['accommodation']['Row'][]>([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<Database['public']['Tables']['accommodation']['Row'][]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAccommodation();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredAccommodations(accommodation);
    } else {
      const filtered = accommodation.filter((acc) =>
        acc.city.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredAccommodations(filtered);
    }
  }, [searchTerm, accommodation]);

  async function getAccommodation() {
    setLoading(true);
    const { data, error } = await supabase
      .from("accommodation")
      .select("*")
      .order("accommodation_id", { ascending: true });
    if (data) {
      setAccommodation(data);
      setFilteredAccommodations(data); 
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
          <Text style={styles.title}>Pet Friendly Places</Text>
          <SearchBar
            placeholder="Enter a city!"
            onChangeText={(value) => setSearchTerm(value)}
            value={searchTerm}
            lightTheme
            round
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
          />
          <View style={styles.container_filter}>
            <Link href={"../../icons/Vets"} asChild>
              <Pressable style={styles.iconContainer}>
                <FontAwesome6 name="shield-dog" style={styles.icon} />
                <Text style={styles.filterText}>Vets</Text>
              </Pressable>
            </Link>

            <Link href={"../../icons/Shops"} asChild>
              <Pressable style={styles.iconContainer}>
                <FontAwesome6 name="shop" style={styles.icon} />
                <Text style={styles.filterText}>Shops</Text>
              </Pressable>
            </Link>

            <Link href={"../../icons/Parks"} asChild>
              <Pressable style={styles.iconContainer}>
                <FontAwesome6 name="tree" style={styles.icon} />
                <Text style={styles.filterText}>Parks</Text>
              </Pressable>
            </Link>

            <Link href={"../../icons/Beaches"} asChild>
              <Pressable style={styles.iconContainer}>
                <FontAwesome6 name="umbrella-beach" style={styles.icon} />
                <Text style={styles.filterText}>Beaches</Text>
              </Pressable>
            </Link>
          </View>
          <View style={styles.list}>
            <FlatList
              data={filteredAccommodations}
              renderItem={({ item }) => <AccommodationListItem accommodation={item} />}
              contentContainerStyle={{ gap: 10, padding: 10 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    justifyContent: "center",
  },
  container_filter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    marginTop: 10,
  },
  iconContainer: {
    alignItems: "center",
    marginLeft: 10,
    marginRight: 20,
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
    flex: 1,
  },
});

