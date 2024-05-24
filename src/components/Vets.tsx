import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from "react-native";

import { GOOGLE_MAPS_API_KEY } from "@/src/constants/ApiKey";
import PlacesComponent from "@/src/components/PlacesComponents";


export default function VetsTab({searchTerm, category}) {

    const [loading, setLoading] = useState(false);

    return(
        <PlacesComponent location={searchTerm} category={category}/>
    )
}