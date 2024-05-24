import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import StarRating from 'react-native-star-rating-widget'
import { Button } from 'react-native-elements'
import { supabase } from '../lib/supabase'

export default function addReviewForm({id, setModalVisible, session, edit, existingRating, existingReviewText }: {id: number, setModalVisible: any, session: Session | null, edit?: { review_id: number, rating: number, review_text: string }, existingRating?: number, existingReviewText?: string}) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    console.log(existingRating);
    
    if(edit) {      
      getExistingReview()
    }    
  }, [])

  const  getExistingReview = async () => {
    const { data, error } = await supabase
      .from('reviews_airlines')
      .select('review_text, rating')
      .eq('review_id', edit.review_id)
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setExistingReviewText(data[0].review_text)
      setExistingRating(data[0].rating)
    }
  }

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
        Alert.alert('Thanks, your review was submitted.')
      }
  }

  const handleEditReview = async () => {
    const { data, error } = await supabase
      .from('reviews_airlines')
      .update(
        {
          rating: rating,
          review_text: reviewText
        }
      )
      .eq('review_id', edit.review_id)
      if (error) {
        Alert.alert('Something went wrong. Please try again.')
      } else {
        setModalVisible(false)
        Alert.alert('Thanks, your review was updated.')
      }
  }

  return (
    <View style={styles.container}>
      {edit ? null : <Text>How was your experience?</Text>}
      <StarRating
        style={styles.stars}
        rating={edit ? existingRating : rating}
        onChange={setRating}
      /><TextInput 
      multiline={true} 
      numberOfLines={4} 
      style={styles.input}
      onChangeText={setReviewText}
      placeholder={edit ? '' : 'Write a review...'}
      value={edit ? existingReviewText : reviewText}
    >
    </TextInput>
      <Button 
        style={styles.btn}
        title="Submit"  
        titleStyle={styles.buttonTitle}
        onPress={edit ? handleEditReview : handleAddReview}
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