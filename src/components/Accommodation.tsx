import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import AccommodationListItem from "@/src/components/AccommodationListItem";
import { supabase } from "@/src/lib/supabase";
import { Database } from "@/src/lib/database.types";


export default function AccommodationTab({searchTerm}) {

    const [accommodation, setAccommodation] = useState<
        Database["public"]["Tables"]["accommodation"]["Row"][]
        >([]);
        const [filteredAccommodations, setFilteredAccommodations] = useState<
        Database["public"]["Tables"]["accommodation"]["Row"][]
        >([]);
        const [loading, setLoading] = useState(false);
    
        useEffect(() => {
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
          }, [searchTerm]);

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

          return(
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
          )
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
          
            }
        });