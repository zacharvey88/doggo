import { StyleSheet, Image, Text, View } from 'react-native';
import { Json } from '@/src/lib/database.types';

type AccommodationListItemProps = {
    accom:{
        accommodation_id: number
        address: string
        phone: string | null
        photos: Json
        title: string
      }
    }


const AccommodationListItem = ({accom}: AccommodationListItemProps) => {
    return (
        <View>
            {/* <Image source={{uri: accom.photos}} style={styles.image} resizeMode='contain'/> */}
            <Text style={styles.title}>{accom.title}</Text>
        </View>
    )
}

export default AccommodationListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: 'white'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
});