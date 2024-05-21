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


const AccommodationListItem = ({ accom }: AccommodationListItemProps) => {
  
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://www.peninsula.com/-/media/homepage---andy/exterior-2_1920.jpg",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{accom.title}</Text>
      </View>
    );
}

export default AccommodationListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3a90cd",
    borderRadius: 10,
    width: '45%',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "blue",
  },
  image: {
    width: "50%",
    aspectRatio: 1,
  },
});