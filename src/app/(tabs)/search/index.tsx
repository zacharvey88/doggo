import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Text } from "@/src/components/Themed";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Stack } from "expo-router";
import AccommodationTab from "@/src/components/Accommodation";
import PlacesComponent from "@/src/components/PlacesComponents";

export default function TabSearch() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    { name: "Accommodations", icon: "bed" },
    { name: "Restaurants", icon: "utensils" },
    { name: "Vets", icon: "shield-dog" },
    { name: "Parks", icon: "tree" },
    { name: "Beaches", icon: "umbrella-beach" },
    { name: "Shops", icon: "shopping-bag" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("Accommodations");

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <Stack.Screen options={{ title: "Search Pet Friendly Places"}} />
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
                setSearchTerm(data.description);
              }}
              query={{
                key: process.env.EXPO_PUBLIC_API_KEY,
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
          {selectedCategory==='Accommodations' && <AccommodationTab searchTerm={searchTerm} />}
          {selectedCategory==='Restaurants' && <PlacesComponent location={searchTerm} category={selectedCategory}/>}
          {selectedCategory==='Vets' && <PlacesComponent location={searchTerm} category={selectedCategory}/>}
          {selectedCategory==='Parks' && <PlacesComponent location={searchTerm} category={selectedCategory}/>}
          {selectedCategory==='Beaches' && <PlacesComponent location={searchTerm} category={selectedCategory}/>}
          {selectedCategory==='Shops' && <PlacesComponent location={searchTerm} category={selectedCategory}/>}
          </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    top: 40, 
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
    backgroundColor: "#FF6347", 
    shadowColor: "#FF6347", 
    borderWidth: 2, 
    borderColor: "#FF6347", 
  },
  selectedIcon: {
    color: "#FFFFFF", 
  },
  selectedText: {
    color: "#FFFFFF", 

  },
  list: {
    flex: 1,
    width: "100%",
    alignItems: "center",

  },
});

export default TabSearch;
