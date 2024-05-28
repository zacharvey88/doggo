import {
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Text, View } from "@/src/components/Themed";
import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";
import { Database } from "@/src/lib/database.types";
import { SearchBar } from "react-native-elements";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function TabAirlines() {
  const [airlines, setAirlines] = useState<
    Database["public"]["Tables"]["airlines"]["Row"][]
  >([]);
  const [filteredAirlines, setFilteredAirlines] = useState<
    Database["public"]["Tables"]["airlines"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAirlines();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
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
      .from("airlines")
      .select("*")
      .order("airline_name", { ascending: true });
    if (data) {
      setAirlines(data);
      setFilteredAirlines(data);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : (
          <>
            <SearchBar
              placeholder="Search airline pet policies"
              onChangeText={(value) => setSearchTerm(value)}
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
              contentContainerStyle={styles.flatListContent}
              columnWrapperStyle={styles.columnWrapper}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Link
                  href={{
                    pathname: `/airlines/${item.airline_id}`,
                    params: {
                      airline_name: item.airline_name,
                      airline_logo_url: item.airline_logo_url,
                      policy_url: item.airline_pet_policy_url,
                      policy_reservations: item.pet_policy_reservations,
                      policy_cabin: item.pet_policy_cabin,
                      policy_cargo: item.pet_policy_cargo,
                      policy_checked_baggage: item.pet_policy_checked_baggage,
                      policy_guidelines: item.pet_policy_guidelines,
                      policy_restrictions: item.pet_policy_restrictions,
                    },
                  }}
                  asChild
                >
                  <Pressable>
                    <Image
                      source={{ uri: item.airline_logo_url }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </Pressable>
                </Link>
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 170,
    height: 100,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    margin: 5,
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#e0e0e0",
  },
  loading: {
    marginBottom: 30,
  },
  flatListContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
