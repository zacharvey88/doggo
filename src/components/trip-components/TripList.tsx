import { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { ActivityIndicator, View, Text } from "react-native";
import TripCard from "./TripCard";

export default function TripList({
  user_id,
  setTripId,
  setTrips,
  filteredTrips,
  setFilteredTrips,
  trips,
  loading,
}: {
  user_id: string;
  setTripId: any;
  setTrips: any;
  filteredTrips: any;
  setFilteredTrips: any;
  trips: any;
  loading: boolean
}) {

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <FlatList
          data={filteredTrips}
          keyExtractor={(item) => item.trip_id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListEmptyComponent={
            <Text style={{ fontSize: 16 }}>You have no trips saved</Text>
          }
          renderItem={({ item }) => (
            <TripCard
              trip={item}
              setTripId={setTripId}
              trips={trips}
              filteredTrips={filteredTrips}
              setFilteredTrips={setFilteredTrips}
            ></TripCard>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  noTrips: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A90CD",
    textAlign: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
