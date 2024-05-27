import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { supabase } from '@/src/lib/supabase'
import { useEffect, useState } from 'react'
import { Database } from '@/src/lib/database.types'
import ReviewCard from './ReviewCard'
import { useLocalSearchParams } from 'expo-router'
import Modal from 'react-native-modal'
import ReviewForm from "@/src/components/ReviewForm";
export default function UserReviewsList({ id, table }: { id: number; table: keyof Database['public']['Tables'] }) {
  const [reviews, setReviews] = useState<Database['public']['Tables'][typeof table]['Row'][]>([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [loading, setLoading] = useState(false);
  const session = useLocalSearchParams()
  const [isModalVisible, setModalVisible] = useState(false);
  const [existingReviewText, setExistingReviewText] = useState('')
  const [existingRating, setExistingRating] = useState(0)

  useEffect(() => {
    getReviews();    
  }, [id, table]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function getReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select('*, profiles(username, avatar_url)')
      .eq(table === 'reviews_accommodation' ? 'accommodation_id' : 'airline_id', id)
      .order('created_at', { ascending: false });
    if (data) {
      setReviews(data);
      setFilteredReviews(data);      
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
                id={id}
                edit={true}
                setModalVisible={setModalVisible}
                session={session}
                existingReviewText={existingReviewText}
                existingRating={existingRating}
              />
            </View>
          </Modal>
          <FlatList
            data={filteredReviews}
            renderItem={({ item }) => (
              <ReviewCard
                review={item}
                session={session}
                reviews={reviews}
                filteredReviews={filteredReviews}
                setFilteredReviews={setFilteredReviews}
                setModalVisible={setModalVisible}
                setExistingRating={setExistingRating}
                setExistingReviewText={setExistingReviewText}
              />
            )}
            contentContainerStyle={{ padding: 10 }}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginBottom: 30,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    margin: 0,
    borderRadius: 40,
  },
})



// import { useEffect, useState } from "react"
// import { View, Text, StyleSheet, FlatList } from "react-native"
// import { supabase } from "../lib/supabase"
// import { Database } from "../lib/database.types"
// import { ActivityIndicator } from "react-native"
// import ReviewCard from "./ReviewCard"

// export default function UserReviewsList({id}) {

//   const [loading, setLoading] = useState(false)
//   const [userReviews, setUserReviews] = useState<Database['public']['Tables']['reviews_airlines']['Row'][]>([]);

//   useEffect(()=>{
//     getUserReviews()
//   },[])

//   async function getUserReviews() {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from('reviews_airlines')
//       .select('*')
//       .eq('user_id', id)
//       .order('created_at', { ascending: false });
//     if (data) {
//       setUserReviews(data); 
//       console.log(data);
//     }
//     setLoading(false);    
//   }

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <>
//           <ActivityIndicator style={styles.loading} />
//           <Text>Loading</Text>
//         </>
//       ) : (
//         <FlatList 
//           data={userReviews} 
//           // renderItem={({ item }) => <ReviewCard review={item}/>} 
//           contentContainerStyle={{ padding: 10 }}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex : 1,
//     alignItems: 'center',
//   },
//   loading: {
//     marginBottom: 30
//   }
// })