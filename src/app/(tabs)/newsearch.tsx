import GooglePlacesInput from "@/src/components/AutoComplete";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@/src/constants/ApiKey";
import PlacesComponent from "@/src/components/PlacesComponents";
const newsearch = () => {
    const[search, setSearch]= useState("")
    console.log("search term: ", search)
    useEffect(()=>{
        
    },[search])
  return (
    <View style={{ zIndex: 1, flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data);
          setSearch(data.description)
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        onFail={(error) => console.log(error)}
      />
      <PlacesComponent location={search}/>
    </View>
  );
};

export default newsearch;
