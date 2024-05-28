import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import StarRating from 'react-native-star-rating-widget'
import { Button } from 'react-native-elements'
import { supabase } from '../lib/supabase'

export default function ReviewForm({id, setModalVisible, session, edit, existingRating, existingReviewText, table, review_id }: {id: number, setModalVisible: any, session: Session | null, edit?: { review_id: number, rating: number, review_text: string }, existingRating?: number, existingReviewText?: string, table: string, review_id: Number}) {
  const [rating, setRating] = useState(existingRating ? existingRating : 0)
  const [reviewText, setReviewText] = useState(existingReviewText ? existingReviewText : '')

  useEffect(() => {

    
    // if(edit) {      
    //   getExistingReview()
    // }    
  }, [])

  // const  getExistingReview = async () => {
  //   const { data, error } = await supabase
  //     .from(`reviews_${table}`)
  //     .select('review_text, rating')
  //     .eq('review_id', edit.review_id)
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (data) {
  //     setExistingReviewText(data[0].review_text)
  //     setExistingRating(data[0].rating)
  //   }
  // }

  const handleAddReview = async () => {
    
    const { data, error } = await supabase
      .from(`reviews_${table}`)
      .insert(
        {
          user_id: session?.user.id,
          [table === 'airlines' ? 'airline_id' : 'accommodation_id']: id,
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
      .from(`${table}`)
      .update(
        {
          rating: rating,
          review_text: reviewText
        }
      )
      .eq('review_id', review_id)
      if (error) {
        console.log(error);
        
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
        rating={rating}
        onChange={setRating}

      /><TextInput 
      multiline={true} 
      numberOfLines={4} 
      style={styles.input}
      onChangeText={setReviewText}
      placeholder={edit ? '' : 'Write a review...'}
      value={reviewText}

    >
    </TextInput>
      <View style={styles.buttonContainer}>
        <Button 
          style={styles.btn}
          title="Submit"  
          titleStyle={styles.buttonTitle}
          onPress={edit ? handleEditReview : handleAddReview}
          />
        <Button
          style={styles.btn}
          title="Cancel"  
          titleStyle={styles.buttonTitle}
          onPress={()=>{setModalVisible(false)}}
          />
      </View>
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
    height: 40,
  },
  buttonTitle: {
    fontSize: 14
  },
  buttonContainer: {
    flex:1,
    flexDirection:"row",
  },
})