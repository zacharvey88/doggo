import { Text, View } from '@/src/components/Themed';
import { Button } from 'react-native-elements'
import { supabase } from '../lib/supabase'
import { Alert, Pressable, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router';



export default function DeleteTrip({trip_id, setModalVisible, setDeletePressed}){

const deleteTrip = async () => {
    const { data, error } = await supabase
    .from('trips')
    .delete()
    .eq("trip_id", trip_id)

if (error && error.code === '42501') {
    Alert.alert('Error', 'You must be logged in to do this.')
} else {
  setModalVisible(false)
  setDeletePressed(true)
  Alert.alert('Trip deleted successfully!')
}
}
const handleCancel = ()=>{
    setModalVisible(false)
    setDeletePressed(false)
}

return (
<View style={styles.container}>
    <Text style={styles.deleteText}>Are you sure you wish to delete this trip?</Text>

    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={deleteTrip}><Text style={styles.buttonText}>Yes</Text></Pressable>
        <Pressable style={styles.button} onPress={handleCancel}><Text style={styles.buttonText}>Cancel</Text></Pressable>
    </View>

</View>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        padding: 20,
    },
    deleteText: {
        fontWeight: "bold",
        fontSize:18
    },
    buttonContainer: {
        flex:1,
        flexDirection:"row"
    },
    button: {
        alignItems:"center",
        alignContent:"center",
        padding:20,
        width:100,
        backgroundColor:"rgb(1,140,220)",
        borderRadius:20,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize:20,
        color:"white",
    }
})