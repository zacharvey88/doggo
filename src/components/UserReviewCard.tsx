import { FontAwesome } from "@expo/vector-icons";
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import dateFormat from "dateformat";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";
export default function UserReviewCard({
  review,
  reviews,
  setFilteredReviews,
  filteredReviews,
  toggleModal,
  setExistingRating,
  setExistingReviewText,
  table,
  setReviewId,
}: {
  review: {
    review_id: number;
    rating: number;
    review_text: string;
    avatar_url: string;
    created_at: string;
    username: string;
    table: string;
    setReviewId: any;
    accommodation: string;
    airlines: string;
  };
}) {
  const { review_id, rating, review_text, created_at } = review;
  const { title } = review.accommodation ? review.accommodation : "";
  const { airline_name } = review.airlines ? review.airlines : "";

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
            setFilteredReviews(
              filteredReviews.filter((review) => review.review_id !== review_id)
            );
            const { data, error } = await supabase
              .from(`${table}`)
              .delete()
              .eq("review_id", review_id);

            if (error) {
              Alert.alert("Something went wrong. Please try again.");
              setFilteredReviews(reviews);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleEditReview = () => {    
    setReviewId(review_id);
    setExistingRating(rating);
    setExistingReviewText(review_text);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ? title : airline_name}</Text>
      <View style={styles.reviewMetaContainer}>
        <View style={styles.reviewMeta}>
          <View style={styles.starContainer}>
            <StarRatingDisplay
              rating={rating}
              starSize={25}
              style={styles.stars}
            />
            <Text style={styles.date}>
              <Text style={styles.username}></Text>Written on{" "}
              {dateFormat(created_at, "dd mmmm yyyy")}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <FontAwesome
            style={[styles.button, { fontSize: 20 }]}
            name="edit"
            onPress={handleEditReview}
          />
          <FontAwesome
            style={styles.button}
            name="trash"
            onPress={handleDeleteReview}
          />
        </View>
      </View>
      <Text style={styles.reviewText}>{review_text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {  
    marginBottom: 14,
    padding: 16,
    backgroundColor: '#F9F9F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
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



