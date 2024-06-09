import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ placesData }) => {

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: placesData.length > 0 ? placesData[0].location.latitude : 53.4808,
          longitude: placesData.length > 0 ? placesData[0].location.longitude : -2.2426,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >

        {placesData.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.location.latitude,
              longitude: place.location.longitude,
            }}
            title={place.displayName.text}
            description={place.formattedAddress}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;