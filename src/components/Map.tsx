import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, Linking } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { router } from "expo-router";
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";

const Map = ({ placesData }) => {

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={()=>router.back()}>
          <Ionicons name='caret-back-circle' size={20}></Ionicons>
          <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
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
        >
          <Image
            source={require('assets/images/map-pin-paw.png')}
            style={styles.mapIcon} 
            resizeMode="contain" 
          />
          <Callout tooltip>
            <TouchableOpacity style={styles.calloutContainer} onPress={place.websiteUri ? ()=>Linking.openURL(place.websiteUri) : null}>
              <View style={styles.calloutCard}>
                <Text style={styles.calloutTitle}>{place.displayName.text}</Text>
                <View style={styles.calloutRow}>
                  <Entypo name="home" style={[styles.calloutIcon, {alignSelf: 'top', marginTop: 2}]}/>
                  <Text style={styles.calloutText}>{place.formattedAddress}</Text>
                </View>
                <View style={styles.calloutRow}>
                  <FontAwesome name="phone-square" style={styles.calloutIcon}/>
                  <Text style={styles.calloutText}>{place.internationalPhoneNumber}</Text>
                </View>
                <Text
                style={[
                  styles.status,
                  {
                    color: place.currentOpeningHours?.openNow
                      ? "green"
                      : "#b10604",
                  },
                ]}
              >
                {place.currentOpeningHours?.openNow ? "Open Now" : "Closed"}
              </Text>
              </View>
            </TouchableOpacity>
          </Callout>
        </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Map;


const styles = StyleSheet.create({
  backButtonContainer:{
    backgroundColor: '#fff',
    borderRadius: 99,
    zIndex: 1,
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  backButton: {
    textAlign: 'center',
    fontSize: 16,
  },
  mapIcon:{
    height: 40,
    width: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  calloutContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 150,
  },
  calloutCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  calloutText: {
    textAlignVertical: 'center',
  },
  calloutRow:{
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    marginTop: 5,
  },
  calloutIcon: {
    fontSize: 15,
    color: '#2A99D0',
    alignSelf: 'center'
  },
})