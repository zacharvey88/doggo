import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import StarRating from 'react-native-star-rating-widget'
import { Button } from 'react-native-elements'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function addReviewForm({id, setModalVisible}) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAddReview = async () => {
    
    const { data, error } = await supabase
      .from('reviews_airlines')
      .insert(
        {
          user_id: session?.user.id,
          airline_id: id,
          rating: rating,
          review_text: reviewText
        }
      )
      if (error && error.code === '42501') {
          Alert.alert('Error', 'You must be logged in to submit a review')
      } else {
        setModalVisible(false)
        Alert.alert('Success!', 'Review submitted.')
      }
  }

  return (
    <View style={styles.container}>
      <Text>How would you rate your experience?</Text>
      <StarRating
        style={styles.stars}
        rating={rating}
        onChange={setRating}
      />
      <TextInput 
        multiline={true} 
        numberOfLines={4} 
        style={styles.input}
        placeholder="Enter your review..."
        onChangeText={setReviewText}
        >
      </TextInput>
      <Button 
        style={styles.btn}
        title="Submit"  
        titleStyle={styles.buttonTitle}
        onPress={handleAddReview}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    height: 200,
    width: 300,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  stars: {
    margin: 10
  },
  btn: {
    margin: 10,
    width:  80,
    height: 40
  },
  buttonTitle: {
    fontSize: 14
  }
})