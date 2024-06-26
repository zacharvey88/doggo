import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AccommodationTab from "@/src/components/accommodation-components/Accommodation";
import { useNavigation } from "expo-router";
import PlacesList from "@/src/components/PlacesList";
import { Entypo } from "@expo/vector-icons";

export default function TabSearch() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Stays");
  const [places, setPlaces] = useState([])
  const navigation = useNavigation()
  const categories = [
    { name: "Stays", icon: "bed" },
    { name: "Restaurants", icon: "utensils" },
    { name: "Vets", icon: "hospital" },
    { name: "Parks", icon: "tree" },
    { name: "Beaches", icon: "umbrella-beach" },
    { name: "Shops", icon: "shop" },
  ];

  const goToMap = () => {
    navigation.navigate('map-screen', {places});
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : (
          <>
            <View style={styles.searchContainer}>
              <GooglePlacesAutocomplete
                fetchDetails={true}
                placeholder="Enter a city"
                onPress={(data, details = null) => {
                  setSearchTerm(data.description);
                }}
                query={{
                  key: process.env.EXPO_PUBLIC_API_KEY,
                  language: "en",
                }}
                onFail={(error) => Alert.alert(error.message)}
                styles={{
                  container: styles.autocompleteContainer,
                  listView: styles.listView,
                  textInputContainer: styles.textInputContainer,
                  textInput: styles.textInput,
                  
                }}
                renderLeftButton={() => (
                  <View style={styles.leftIconContainer}>
                    <Ionicons name="search-outline" style={styles.searchIcon} />
                  </View>
                )}
              />
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.scrollViewContent}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.name}
                  style={[
                    styles.iconContainer,
                    selectedCategory === category.name &&
                      styles.selectedIconContainer,
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
                </TouchableOpacity>
              ))}
            </ScrollView>
            {selectedCategory === "Stays" ? (
              <AccommodationTab searchTerm={searchTerm} />
            ) : (
              <PlacesList
                location={searchTerm}
                category={selectedCategory}
                places={places}
                setPlaces={setPlaces}
              />
            )}
          </>
        )}

        {selectedCategory !== "Stays" ? 
          <TouchableOpacity onPress={goToMap} style={styles.mapIconContainer}>
            <Text style={styles.mapView}>Map View</Text>
            <Entypo name="location" style={styles.mapIcon} />
          </TouchableOpacity>
        : null}

      </View>
    </SafeAreaView>
 )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 15,
    zIndex: 2,
    paddingHorizontal: 10,
  },
  leftIconContainer: {
    position: "absolute",
    top: 15,
    left: 8,
    zIndex: 1,
  },
  autocompleteContainer: {
    width: "100%",
    zIndex: 2,
    alignSelf: "center",
  },
  listView: {
    position: "absolute",
    top: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    zIndex: 3,
  },
  textInputContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
    flexDirection: "row",
  },
  textInput: {
    height: 48,
    color: "#5d5d5d",
    fontSize: 18,
    backgroundColor: "#eee",
    borderRadius: 15,
    paddingLeft: 40,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
  },
  scrollView: {
    padding: 8,
    maxHeight: 100,
  },
  scrollViewContent: {
    gap: 10,
    zIndex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 40,
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  icon: {
    fontSize: 20,
  },
  filterText: {
    fontSize: 16,
  },
  selectedIconContainer: {
    backgroundColor: "#2A99D0",
    shadowColor: "#2A99D0",
    borderWidth: 2,
    borderColor: "#2A99D0",
    zIndex: 1,
  },
  selectedIcon: {
    color: "#FFFFFF",
  },
  searchIcon: {
    fontSize: 18,
    color: "#5d5d5d",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  list: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  mapIconContainer:{
    height: 40,
    width: 110,
    zIndex: 2,
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#2A99D0',
    borderRadius: 20,
    padding: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: .5,
    shadowRadius: 2,
  },
  mapIcon: {
    fontSize: 22,
    color: '#fff'
  },
  mapView: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
})