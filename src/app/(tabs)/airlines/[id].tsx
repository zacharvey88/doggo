import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Linking, ScrollView} from "react-native";
import { Button } from "react-native-elements";
import {StarRatingDisplay} from "react-native-star-rating-widget";
import Modal from "react-native-modal"
import AddReviewForm from "@/src/components/AddReviewForm";
export default function Airline() {

  const [rating, setRating] = useState(4);
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Modal style={styles.modal}
        isVisible={isModalVisible}
        animationIn="slideInUp"
        onBackdropPress={toggleModal}
        backdropOpacity={0.8}
        backdropColor="black"
        >
        <View style={styles.modal}>
          <AddReviewForm />
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
            onPress={() => router.push(`/airlines/${id}/reviews`)}
          />
          <Button 
            title="Add Review" 
            titleStyle={{ fontSize: 14 }}
            style={styles.button}
            onPress={toggleModal}
            
          />
          <Button 
            title="Add to trip" 
            titleStyle={{ fontSize: 14 }}
            style={styles.button}
            onPress={() => {}}
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    margin: 0,
    borderRadius: 40,
  },
});
