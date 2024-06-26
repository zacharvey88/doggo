import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import dateFormat from 'dateformat';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
export default function ReviewCard({ review, reviews, setFilteredReviews, filteredReviews, toggleModal, setExistingRating, setExistingReviewText, table, setReviewId }: { review: { review_id: number, rating: number, review_text: string, avatar_url: string, created_at: string, username: string, table: string, setReviewId: any } }) {
  
  const { review_id, rating, review_text, created_at} = review;
  const { avatar_url, username } = review.profiles  
  const { session } = useAuth()
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
    
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            setFilteredReviews(filteredReviews.filter((review) => review.review_id !== review_id))
            const { data, error } = await supabase
            .from(`${table}`)
            .delete()
            .eq('review_id', review_id);

            if (error) {
              Alert.alert('Something went wrong. Please try again.')
              setFilteredReviews(reviews)
            } 
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }

  const handleEditReview = async () => {
    setReviewId(review_id)
    setExistingRating(rating)
    setExistingReviewText(review_text)
    toggleModal()
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
    width:"100%"
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
