import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import AccommodationListItem from "@/src/components/AccommodationListItem";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";

type AccommodationTabProps = {
  searchTerm: string;
};

const AccommodationTab: React.FC<AccommodationTabProps> = ({ searchTerm }) => {
  const [accommodation, setAccommodation] = useState<
    Database["public"]["Tables"]["accommodation"]["Row"][]
  >([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<
    Database["public"]["Tables"]["accommodation"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getAccommodation() {
      setLoading(true);
      const { data, error } = await supabase
        .from("accommodation")
        .select("*")
        .order("accommodation_id", { ascending: true });
      if (data) {
        setAccommodation(data);
        setFilteredAccommodations(data);
      } else {
        console.error(error);
      }
      setLoading(false);
    }
    getAccommodation();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredAccommodations(accommodation);
    } else {
      const filtered = accommodation.filter((acc) =>
        searchTerm.toLowerCase().includes(acc.city.toLowerCase())
      );
      setFilteredAccommodations(filtered);
    }
  }, [searchTerm, accommodation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
      style={{width: '100%'}}
        data={filteredAccommodations}
        renderItem={({ item }) => (
          <AccommodationListItem accommodation={item} />
        )}
        keyExtractor={(item) => item.accommodation_id.toString()}
        contentContainerStyle={{ gap: 10, padding: 10}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
    width: '100%',
  },
});

export default AccommodationTab;
