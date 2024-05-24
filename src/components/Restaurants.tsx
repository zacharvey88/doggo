import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from "react-native";

import { GOOGLE_MAPS_API_KEY } from "@/src/constants/ApiKey";
import PlacesComponent from "@/src/components/PlacesComponents";


export default function RestaurantsTab({searchTerm}) {

    const [loading, setLoading] = useState(false);

    return(
        <View style={styles.container}>
            <Text>Restaurants</Text>
            <PlacesComponent location={searchTerm}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 100
    },
})