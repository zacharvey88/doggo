import { Text, View } from '@/src/components/Themed';
import { Button } from 'react-native-elements'
import { supabase } from '../lib/supabase'
import { Alert, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router';



export default function DeleteTrip({trip_id, setModalVisible}){

const deleteTrip = async () => {
    const { data, error } = await supabase
    .from('trips')
    .delete()
    .eq("trip_id", trip_id)

if (error && error.code === '42501') {
    Alert.alert('Error', 'You must be logged in to do this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
} else {
  setModalVisible(false)
  Alert.alert('Success!', 'Successfully deleted.')
}
}
const handleCancel = ()=>{
    setModalVisible(false)
}

return (
<View style={styles.container}>
    <Text style={styles.deleteText}>Are you sure you wish to delete this?</Text>

    <View style={styles.buttonContainer}>
        <Button style={styles.button} title="yes" onPress={deleteTrip}/>
        <Button style={styles.button} title="cancel" onPress={handleCancel}/>
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
    },
    buttonContainer: {
        flex:1,
        flexDirection:"row"
    },
    button: {
        fontWeight: "bold"
    },
})