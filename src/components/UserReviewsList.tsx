import { FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import { supabase } from '@/src/lib/supabase'
import { useEffect, useState } from 'react'
import { Database } from '@/src/lib/database.types'
import Modal from 'react-native-modal'
import ReviewForm from "@/src/components/ReviewForm";
import { useAuth } from "@/src/providers/AuthProvider";
import UserReviewCard from './UserReviewCard'

export default function UserReviewsList({ id}: { id: number}) {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [existingReviewText, setExistingReviewText] = useState('')
  const [existingRating, setExistingRating] = useState(0)
  const {session, profile} = useAuth()
  const [table, setTable] = useState('reviews_airlines')

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
      .select(`*, ${table === 'reviews_airlines' ? 'airlines(airline_name)' : 'accommodation(title)'}`)
      .eq('user_id', id)
      .order('created_at', { ascending: false });
    if (data) {
      setReviews(data);
      setFilteredReviews(data);      
    }
    if (error) {
      console.log(error);
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
        <View style={styles.tabs}>
          <Pressable onPress={()=>{setTable('reviews_airlines')}} style={styles.tab}><Text style={styles.tabText}>Airline Reviews</Text></Pressable>
          <Pressable onPress={()=>{setTable('reviews_accommodation')}} style={styles.tab}><Text style={styles.tabText}>Property Reviews</Text></Pressable>
          <Pressable onPress={()=>{setTable('reviews_airlines')}} style={styles.tab}><Text style={styles.tabText}>Property Listings</Text></Pressable>
        </View>
        <FlatList 
          data={filteredReviews} 
          renderItem={({ item }) => <UserReviewCard 
                review={item} 
                table={table} 
                reviews={reviews} 
                filteredReviews={filteredReviews} 
                setFilteredReviews={setFilteredReviews} 
                setModalVisible={setModalVisible} 
                setExistingRating={setExistingRating} 
                setExistingReviewText={setExistingReviewText}/>} 
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
  tabs: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A90CD',
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600'
  }
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