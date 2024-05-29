import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Linking, ScrollView, Alert} from "react-native";
import { Button } from "react-native-elements";
import {StarRatingDisplay} from "react-native-star-rating-widget";
import Modal from "react-native-modal"
import ReviewForm from "@/src/components/ReviewForm";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/src/lib/supabase";
import TripListSmall from "@/src/components/TripListSmall";
import { useAuth } from "@/src/providers/AuthProvider";
export default function Airline() {

  const [rating, setRating] = useState(0);
  const router = useRouter();
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [isTripModalVisible, setTripModalVisible] = useState(false);
  const {session, loading, profile} = useAuth()

  useEffect(() => {
    getRating();
  }, [rating]);

  const { 
    id, 
    airline_name,
    airline_logo_url,
    policy_url,
    policy_reservations,
    policy_cabin,
    policy_cargo,
    policy_checked_baggage,
    policy_guidelines,
    policy_restrictions
  } = useLocalSearchParams();

  const getRating = async () => {
    const { data: ratings, error } = await supabase
      .from("reviews_airlines")
      .select("rating")
      .eq("airline_id", id)
    if (ratings) {
      const totalRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0)
      const averageRating = totalRatings / ratings.length
      setRating(averageRating)
    }
  }

  const toggleReviewModal = () => {
    setReviewModalVisible(!isReviewModalVisible);
  };

  const toggleTripModal = () => {
    setTripModalVisible(!isTripModalVisible);
  };

  const handleAddButton = (button) => { 
    
    if (session && session.user) {  
      button === 'review' ? toggleReviewModal() : toggleTripModal()
    } else {
    
      Alert.alert(
        "Not Logged In",
        `You must be logged in to ${button === 'review' ? "add a review" : "add to a trip"}`,
        [
          {
            text: "Okay",
            style: "default",
          },
          {
            text: "Login",
            onPress: ()=>router.push('/sign-in'),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  }

  const goToReviews = () => {
    router.push({
      pathname: `/airlines/${id}/reviews`,
      params: {
        session: session,
      }
    });
  };


  return (
    <>
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
            toggleModal={toggleReviewModal}
            session={session}
            table={'airlines'}
          />
        </View>
      </Modal>

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
            toggleModal={toggleTripModal}
            table={"airlines"}
            airline_id={id}
          />
        </View>
      </Modal>

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Stack.Screen options={{ title: "" }} />
        <Text style={styles.title}>{airline_name}</Text>
        <StarRatingDisplay rating={rating} /> 
        <View style={styles.buttonContainer}>
          <Button 
            title="Visit Website" 
            titleStyle={{ fontSize: 14 }}
            style={styles.button}
            onPress={() => {Linking.openURL(policy_url)}}
          />
          <Button 
            title="See Reviews" 
            titleStyle={{ fontSize: 14 }}
            style={styles.button}
            onPress={goToReviews}
          />
          <Button 
            title="Add Review" 
            titleStyle={{ fontSize: 14 }}
            style={styles.button}
            onPress={()=>{handleAddButton('review')}}
            
          />
          <Button 
            title="Add to trip" 
            titleStyle={{ fontSize: 14 }}
            style={styles.button}
            onPress={()=>{handleAddButton('trip')}}
          />
        </View>
        {policy_reservations && 
        <View style={styles.textContainer}>
          <Text style={styles.header}>Reservations Policy</Text>
          <Text style={styles.text}>{policy_reservations}</Text>
        </View>
        }
        {policy_cabin &&
        <View style={styles.textContainer}>
          <Text style={styles.header}>Cabin Policy</Text>
          <Text style={styles.text}>{policy_cabin}</Text>
        </View>
        }
        {policy_cargo &&
        <View style={styles.textContainer}>
          <Text style={styles.header}>Cargo Policy</Text>
          <Text style={styles.text}>{policy_cargo}</Text>
        </View>
        }
        {policy_checked_baggage &&
        <View style={styles.textContainer}>
          <Text style={styles.header}>Checked Baggage Policy</Text>
          <Text style={styles.text}>{policy_checked_baggage}</Text>
        </View>
        } 
        {policy_guidelines &&
        <View style={styles.textContainer}>
          <Text style={styles.header}>Guidelines</Text>
          <Text style={styles.text}>{policy_guidelines}</Text>
        </View>
        }
        {policy_restrictions &&
        <View style={styles.textContainer}>
          <Text style={styles.header}>Restrictions</Text>
          <Text style={styles.text}>{policy_restrictions}</Text>
        </View>
        }
        {!(policy_reservations || policy_cabin || policy_cargo || policy_checked_baggage || policy_guidelines || policy_restrictions) && 
          <Text style={styles.noInfo}>No Information Available</Text>
        }
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
  image: {
    width: '100%',
    height: 200,
  },
  reviewText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    margin: 3,
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
  modalReview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    margin: 0,
    borderRadius: 40,
  },
  modalTrip: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    margin: 0,
  },
  noInfo: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
  }
});
