import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from "react-native";

import PlacesComponent from "@/src/components/PlacesComponents";


export default function RestaurantsTab({searchTerm, category}) {

    const [loading, setLoading] = useState(false);
    console.log("3.", category)

    return(
        <PlacesComponent location={searchTerm} category={category}/>
    )
}