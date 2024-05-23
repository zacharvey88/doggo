import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useState } from 'react'
import StarRating from 'react-native-star-rating-widget'
import { Button } from 'react-native-elements'
import { supabase } from '../lib/supabase'

export default function addReviewForm() {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const handleAddReview = async () => {
    const { data, error } = await supabase
      .from('reviews_airlines')
      .insert([
        {
          rating,
          review_text: reviewText
        }
      ])
      .select()
      if (error) {
        console.log(error)
        if (error.code === '42501') {
          console.log('No user on the session')
      } else {
        console.log(data)
      }
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