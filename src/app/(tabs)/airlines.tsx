import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { supabase } from '@/src/lib/supabase';
import { useEffect, useState } from 'react'; 
import { Database } from '@/src/lib/database.types';

export default function TabAirlines() {

  const[airlines, setAirlines] = useState<Database['public']['Tables']['airlines']['Row'][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAirlines();
  }, []);

  async function getAirlines() {
    setLoading(true);
    const { data, error } = await supabase
      .from('airlines')
      .select('*')
      .order('airline_name', { ascending: true });
    if (data) {
      setAirlines(data);      
    } else {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading</Text> : <FlatList data={airlines} renderItem={({ item }) => <Text>{item.airline_name}</Text>} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
