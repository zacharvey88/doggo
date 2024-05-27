import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import dateFormat from 'dateformat';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
export default function ReviewCard({ review, reviews, setFilteredReviews, filteredReviews, setModalVisible, setExistingRating, setExistingReviewText, table }: { review: { review_id: number, rating: number, review_text: string, avatar_url: string, created_at: string, username: string, table: string } }) {
  const { review_id, rating, review_text, created_at} = review;
  const { avatar_url, username } = review.profiles  
  const session = useLocalSearchParams().session as string;
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => { 
    getUsername()
  },[session])  

  const getUsername = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user?.id);
    if (data) {
      setCurrentUser(data[0]?.username);
    }    
  }
  const handleDeleteReview = async () => {    
    setFilteredReviews(filteredReviews.filter((review) => review.review_id !== review_id))
    const { data, error } = await supabase
    .from(`${table}`)
    .delete()
    .eq('review_id', review_id);
    if (error) {
      Alert.alert('Something went wrong. Please try again.')
      setFilteredReviews(reviews)
    }
  }

  const handleEditReview = async () => {
    setExistingRating(rating)
    setExistingReviewText(review_text)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.reviewMetaContainer}>
        <View style={styles.reviewMeta}>
          <Image 
            source={{ uri: avatar_url ? `https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/${avatar_url}` : 'https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/avatar_placeholder.png' }} 
            style={styles.avatar} />
          <View style={styles.starContainer}>
            <StarRatingDisplay rating={rating} starSize={25} style={styles.stars}/>
            <Text style={styles.date}>By <Text style={styles.username}>{username? username : 'Anon'}</Text> on {dateFormat(created_at, "dd mmmm yyyy")}</Text>
          </View>
        </View>
        {currentUser === username ?
          <View style={styles.buttonContainer}>
            <FontAwesome style={[styles.button, { fontSize: 20 }]} name="edit" onPress={handleEditReview} />
            <FontAwesome style={styles.button} name="trash" onPress={handleDeleteReview} />
          </View>
          : null}
      </View>
      <Text style={styles.reviewText}>{review_text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {  
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F9F9F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: { 
    width: 50, 
    height: 50,
    marginRight: 10
  },
  reviewText: {
    marginTop: 10,
    fontSize: 15,
  },
  date: {
    textAlign: 'left',
    fontSize: 14
  },
  reviewMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    marginVertical: 5, 
    marginLeft: -8, 
    marginTop: -5
  },
  username: {
    fontWeight: 'bold',
    color: '#3A90CD'
  },
  buttonContainer: {
    height: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start' 
  },
  button: {
    fontSize: 18,
    color: '#3A90CD',
  }
})
