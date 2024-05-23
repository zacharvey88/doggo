import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { supabase } from '@/src/lib/supabase'
import { useEffect, useState } from 'react'
import { Database } from '@/src/lib/database.types'
import ReviewCard from './ReviewCard'
export default function ReviewsList({ id, table }: { id: number; table: keyof Database['public']['Tables'] }) {
  const [reviews, setReviews] = useState<Database['public']['Tables'][typeof table]['Row'][]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getReviews();
  }, [id, table]);

  async function getReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq(table === 'reviews_accommodation' ? 'accommodation_id' : 'airline_id', id)
      .order('created_at', { ascending: false });
    if (data) {
      setReviews(data);
      
    }
    setLoading(false);
  }
  
  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator style={styles.loading} />
          <Text>Loading</Text>
        </>
      ) : (
        <>
        <FlatList data={reviews} renderItem={({ item }) => <ReviewCard review={item} />} />
        </>
      )}
    </View>
  )
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
  loading: {
    marginBottom: 30,
  }
})