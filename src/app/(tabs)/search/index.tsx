import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { Text } from "@/src/components/Themed";
import AccommodationListItem from "@/src/components/AccommodationListItem";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { GOOGLE_MAPS_API_KEY } from "@/src/constants/ApiKey";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function TabSearch() {
  const [accommodation, setAccommodation] = useState<
    Database["public"]["Tables"]["accommodation"]["Row"][]
  >([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<
    Database["public"]["Tables"]["accommodation"]["Row"][]
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    { name: "Accommodations", icon: "bed" },
    { name: "Restaurants", icon: "utensils" },
    { name: "Vets", icon: "shield-dog" },
    { name: "Parks", icon: "tree" },
    { name: "Beaches", icon: "umbrella-beach" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("Accommodations");

  useEffect(() => {
    getAccommodation();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
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
          <ActivityIndicator style={styles.loading} />
          <Text>Loading</Text>
        </>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
              fetchDetails={true}
              placeholder="Search"
              onPress={(data, details = null) => {
                console.log(data);
                setSearchTerm(data.description);
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
              }}
              onFail={(error) => console.log(error)}
              styles={{
                container: styles.autocompleteContainer,
                listView: styles.listView,
                textInputContainer: styles.textInputContainer,
                textInput: styles.textInput,
              }}
            />
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {categories.map((category) => (
              <Pressable
                key={category.name}
                style={[
                  styles.iconContainer,
                  selectedCategory === category.name && styles.selectedIconContainer,

                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <FontAwesome6
                  name={category.icon}
                  style={[
                    styles.icon,
                    selectedCategory === category.name && styles.selectedIcon,
                  ]}
                />
                <Text
                  style={[
                    styles.filterText,
                    selectedCategory === category.name && styles.selectedText,
                  ]}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.list}>
            <FlatList
              data={filteredAccommodations}
              renderItem={({ item }) => (
                <AccommodationListItem accommodation={item} />
              )}
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
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  loading: {  },
  searchContainer: {
    width: "100%",
    zIndex: 2,
  },
  autocompleteContainer: {
    width: "100%",
  },
  listView: {
    position: "absolute",
    top: 40, // Adjust this value if needed
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    zIndex: 3,
  },
  textInputContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: "#5d5d5d",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  scrollView: {
    padding:10,
    maxHeight: 100,
  },
  scrollViewContent: {
    gap:10,
  },
  iconContainer: {
    flexDirection:"row",
    gap:12,
    marginTop: 40,
    alignItems: "center",
    borderRadius:8, 
    paddingHorizontal:10,
    paddingVertical:10,
    backgroundColor: "#fff",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
    
  },
  icon: {
    fontSize: 20,
  },
  filterText: {
    fontSize: 16,
  },
  selectedIconContainer: {
    backgroundColor: "#FF6347", // Background color for selected tab
    shadowColor: "#FF6347", // Shadow color for selected tab
    borderWidth: 2, // Border width for selected tab
    borderColor: "#FF6347", // Border color for selected tab
  },
  selectedIcon: {
    color: "#FFFFFF", // Customize the selected icon color (white for contrast)

  },
  selectedText: {
    color: "#FFFFFF", // Customize the selected text color (white for contrast)

  },
  list: {
    flex: 1,
    width: "100%",
    alignItems: "center",

  },
});

export default TabSearch;
