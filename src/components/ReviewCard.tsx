import { StyleSheet, Text, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import dateFormat, { masks } from 'dateformat';

export default function ReviewCard({ review }: { review: { rating: number, review_text: string, avatar_url: string, created_at: string } }) {
  const { rating, review_text, avatar_url, created_at } = review;

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dateFormat(created_at, "dd mmmm yyyy h:MM:ss TT")}</Text>
      <StarRatingDisplay rating={rating} />
      <Text style={styles.reviewText}>{review_text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: { 
    width: 100, 
    height: 100
  },
  reviewText: {
    textAlign: 'center',
    fontSize: 16
  },
  date: {
    textAlign: 'center',
    fontSize: 14
  }
})