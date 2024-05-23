import { StyleSheet, Text, View, Image } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import dateFormat from 'dateformat';

export default function ReviewCard({ review }: { review: { rating: number, review_text: string, avatar_url: string, created_at: string, username: string } }) {
  const { rating, review_text, created_at} = review;
  const { avatar_url, username } = review.profiles  

  return (
    <View style={styles.container}>
      <View style={styles.reviewMeta}>
        <Image 
          source={{ uri: avatar_url ? `https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/${avatar_url}` : 'https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/avatar_placeholder.png' }} 
          style={styles.avatar} />
        <View>
          <StarRatingDisplay rating={rating} starSize={25} style={styles.stars}/>
          <Text style={styles.date}>By <Text style={styles.username}>{username? username : 'Anon'}</Text> on {dateFormat(created_at, "dd mmmm yyyy")}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review_text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {  marginBottom: 16,
  padding: 16,
  backgroundColor: '#F9F9F9',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 1,
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
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stars: {
    marginVertical: 5, 
    marginLeft: -8, 
    marginTop: -5
  },
  username: {
    fontWeight: 'bold',
    color: '#3A90CD'
  }
})
