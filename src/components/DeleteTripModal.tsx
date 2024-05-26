import { Text, View } from '@/src/components/Themed';
import { supabase } from '../lib/supabase'
import { Alert, Pressable, StyleSheet } from 'react-native'

export default function DeleteTrip({trip_id, setDeleteModalVisible, filteredTrips, setFilteredTrips, trips} : {trip_id: Number, setDeleteModalVisible: any, filteredTrips: any, setFilteredTrips: any, trips: any}){

const deleteTrip = async () => {
    setFilteredTrips(filteredTrips.filter((trip)=> trip.trip_id !== trip_id))
    const { data, error } = await supabase
    .from('trips')
    .delete()
    .eq("trip_id", trip_id)

    if (error) {
        Alert.alert('Something went wrong, please try again.')
        setFilteredTrips(trips)
    } else {
        setDeleteModalVisible(false)
        Alert.alert('Trip deleted successfully!')
    }
}

return (
<View style={styles.container}>
    <Text style={styles.deleteText}>Are you sure you wish to delete this trip?</Text>

    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={deleteTrip}><Text style={styles.buttonText}>Yes</Text></Pressable>
        <Pressable style={styles.button} onPress={()=>{setDeleteModalVisible(false)}}><Text style={styles.buttonText}>Cancel</Text></Pressable>
    </View>

</View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        padding: 20,
    },
    deleteText: {
        fontSize:16
    },
    buttonContainer: {
        flex:1,
        flexDirection:"row",
        marginTop: 20,
        gap: 10
    },
    button: {
        alignItems:"center",
        alignContent:"center",
        padding:10,
        width:100,
        height: 35,
        backgroundColor:"rgb(1,140,220)",
        borderRadius:20,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize:16,
        color:"white",
    }
})