import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { supabase } from "@/src/lib/supabase";
import React, { useState } from "react";
import { Database } from "@src/lib/database.types"
import ReviewCard from "./ReviewCard";
import Modal from "react-native-modal";
import ReviewForm from "@/src/components/review-components/ReviewForm";
import { useAuth } from "@/src/providers/AuthProvider";
import { useFocusEffect } from '@react-navigation/native';
export default function ReviewsList({
  id,
  table,
  refreshAdd
}: {
  id: number;
  table: keyof Database["public"]["Tables"];
  refreshAdd: boolean;
}) {
  const [reviews, setReviews] = useState<
    Database["public"]["Tables"][typeof table]["Row"][]
  >([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [existingReviewText, setExistingReviewText] = useState("");
  const [existingRating, setExistingRating] = useState(0);
  const [review_id, setReviewId] = useState(null);
  const { session } = useAuth()
  const [refreshEdit, setRefreshEdit] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleRefreshEdit = () => {
    setRefreshEdit(!refreshEdit);
  };

  useFocusEffect(
    React.useCallback(() => {
      getReviews();
    }, [refreshAdd, refreshEdit])
  );

  async function getReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*, profiles(username, avatar_url)")
      .eq(
        table === "reviews_accommodation" ? "accommodation_id" : "airline_id", id)
      .order("created_at", { ascending: false })
    if (error) {
      Alert.alert(error.message)
    } 
    else {
      setReviews(data);
      setFilteredReviews(data);
    }
    setLoading(false);
  }
  
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
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
                id={id}
                edit={true}
                toggleModal={toggleModal}
                session={session}
                existingRating={existingRating}
                existingReviewText={existingReviewText}
                table={table}
                review_id={review_id}
                toggleRefreshEdit={toggleRefreshEdit}
              />
            </View>
          </Modal>

          <FlatList
            data={filteredReviews}
            contentContainerStyle={{ padding: 10 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <ReviewCard
                review={item}
                session={session}
                reviews={reviews}
                filteredReviews={filteredReviews}
                setFilteredReviews={setFilteredReviews}
                toggleModal={toggleModal}
                setExistingRating={setExistingRating}
                setExistingReviewText={setExistingReviewText}
                table={table}
                setReviewId={setReviewId}
              />
            )}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  loading: {
    marginBottom: 15,
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
