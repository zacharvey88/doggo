import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Linking, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import {StarRatingDisplay} from "react-native-star-rating-widget";
import { supabase } from "@/src/lib/supabase";
import Modal from "react-native-modal";
import TripListSmall from "@/src/components/TripListSmall";
import { useAuth } from "@/src/providers/AuthProvider";
import ReviewForm from "@/src/components/ReviewForm";

export default function Accommodation() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isTripModalVisible, setTripModalVisible] = useState(false);
    const [isReviewModalVisible, setReviewModalVisible] = useState(false);
    const {session, profile} = useAuth()
    const {
        id,
        title,
        description,
        address,
        phone, 
        photos,
        postcode,
        booking_url,
        city,
        country,
        rating,
    } = useLocalSearchParams();

    const toggleTripModal = () => {
      setTripModalVisible(!isTripModalVisible);
    };

    const toggleReviewModal = () => {
      setReviewModalVisible(!isReviewModalVisible);
    };
  

    return (
      <>
      <Modal 
        isVisible={isTripModalVisible}
        animationIn="slideInUp"
        onBackdropPress={toggleTripModal}
        backdropOpacity={0.8}
        backdropColor="black"
        >
        <View style={styles.modalTrip}>
          <TripListSmall
            user_id={session?.user.id}
            setModalVisible={setTripModalVisible}
            table={"accommodation"}
          />
        </View>
      </Modal>

      <Modal
        isVisible={isReviewModalVisible}
        animationIn="slideInUp"
        onBackdropPress={toggleReviewModal}
        backdropOpacity={0.8}
        backdropColor="black"
        >
        <View style={styles.modalReview}>
          <ReviewForm 
            id={id} 
            edit={false}
            setModalVisible={setReviewModalVisible}
            session={session}
            table={'accommodation'}
          />
        </View>
      </Modal>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
  <Stack.Screen options={{ title: '', headerBackTitle:"Back" }}/>
          {/* {photos && photos.length > 0 ? (
            <ScrollView horizontal contentContainerStyle={styles.image}>
              {photos.map((photo: string, index: number) => (
                <Image
                  key={index}
                  source={{
                    uri: photos[index],
                  }}
                  style={styles.image}
                />
              ))}
            </ScrollView>
          ) : (
            <Text>No Images Available</Text>
          )} */}
          
          {photos ? (

                <Image
                    source={{
                    uri: photos,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
                ) : (
                <Text>No Image Available</Text>
                )}
          <Text style={styles.title}>{title}</Text>
          <StarRatingDisplay rating={rating} />
          <View style={styles.buttonContainer}>
            <Button
              title="Book Now"
              titleStyle={{ fontSize: 14 }}
              style={styles.button}
              onPress={() => {
                Linking.openURL(booking_url);
              }}
            />
            <Button
              title="See Reviews"
              titleStyle={{ fontSize: 14 }}
              style={styles.button}
              onPress={() => router.push(`/search/${id}/reviews`)}
            />
                      <Button 
            title="Add Review" 
            titleStyle={{ fontSize: 14 }}
            style={styles.button}
            onPress={toggleReviewModal}
            
          />
            <Button
              title="Add to trip"
              titleStyle={{ fontSize: 14 }}
              style={styles.button}
              onPress={toggleTripModal}
            />
          </View>

          {description && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>{description}</Text>
            </View>
          )}
          {address && (
            <View style={styles.textContainer}>
              <Text style={styles.header}>Address</Text>
              <Text style={styles.text}>{address}</Text>
              <Text style={styles.text}>{postcode}</Text>
              <Text style={styles.text}>{city}</Text>
              <Text style={styles.text}>{country}</Text>
            </View>
          )}
          {phone && (
            <View style={styles.textContainer}>
              <Text style={styles.header}>Phone</Text>
              <Text style={styles.text}>{phone}</Text>
            </View>
          )}
        </ScrollView>
      </View>
      </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    scrollContainer: {
      alignItems: 'center',
      padding: 20,
    },
    reviewText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 15,
    },
    button: {
      height: 35,  
    },
    textContainer: {
      marginBottom: 20,
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      marginTop: 5,
      gap: 5
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#3A90CD',
      marginBottom: 10,
      textAlign: 'center',
      paddingVertical: 5,
      backgroundColor: '#f0f0f0',
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#3A90CD',
    },
    image: {
        width: '100%',
        height: 275,
        marginBottom: 10,
        borderRadius: 10,
    },
    modalTrip: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      color: '#000',
      margin: 0,
    },
    modalReview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      color: '#000',
      margin: 0,
      borderRadius: 40,
    },
});

