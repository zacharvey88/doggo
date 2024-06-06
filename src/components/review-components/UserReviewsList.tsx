import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import ReviewForm from "@/src/components/review-components/ReviewForm";
import { useAuth } from "@/src/providers/AuthProvider";
import UserReviewCard from "./UserReviewCard";

export default function UserReviewsList({
  user_id,
  table,
}: {
  user_id: number;
  table: string;
}) {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [existingReviewText, setExistingReviewText] = useState("");
  const [existingRating, setExistingRating] = useState(0);
  const { session } = useAuth();
  const [review_id, setReviewId] = useState(null);
  const [refreshEdit, setRefreshEdit] = useState(false)

  useEffect(() => {
    getReviews();
  }, [user_id, table, refreshEdit]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleRefreshEdit = () => {
    setRefreshEdit(!refreshEdit)
  }

  async function getReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select(
        `*, ${
          table === "reviews_airlines"
            ? "airlines(airline_name)"
            : "accommodation(title)"
        }`
      )
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });
    if (data) {
      setReviews(data);
      setFilteredReviews(data);
    }
    if (error) {
      Alert.alert(error.message)
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : reviews.length > 0 ? (
        <>
          <Modal
            style={styles.modal}
            isVisible={isModalVisible}
            animationIn="slideInUp"
            onBackdropPress={toggleModal}
            backdropOpacity={0.8}
            backdropColor="black"
          >
            <View style={styles.modal}>
              <ReviewForm
                user_id={user_id}
                edit={true}
                toggleModal={toggleModal}
                session={session}
                existingReviewText={existingReviewText}
                existingRating={existingRating}
                table={table}
                review_id={review_id}
                toggleRefreshEdit={toggleRefreshEdit}
              />
            </View>
          </Modal>
          <FlatList
            data={filteredReviews}
            // scrollEnabled={false}
            renderItem={({ item }) => (
              <UserReviewCard
                review={item}
                table={table}
                reviews={reviews}
                filteredReviews={filteredReviews}
                setFilteredReviews={setFilteredReviews}
                toggleModal={toggleModal}
                setExistingRating={setExistingRating}
                setExistingReviewText={setExistingReviewText}
                setReviewId={setReviewId}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <Text style={styles.title}>No reviews yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    marginBottom: 30,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    margin: 0,
    borderRadius: 40,
  },
});
