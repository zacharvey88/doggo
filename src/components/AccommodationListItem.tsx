import { StyleSheet, Image, Text, View } from 'react-native';
import { Json } from '@/src/lib/database.types';
import { Button } from 'react-native-elements';

type AccommodationListItemProps = {
    accom:{
        accommodation_id: number
        address: string
        phone: string | null
        photos: Json | undefined
        title: string
      }
    }


const AccommodationListItem = ({ accom }: AccommodationListItemProps) => {

  const photoUri = Array.isArray(accom.photos) && accom.photos.length > 0 ?
    accom.photos[0] as string : undefined;

  
    return (
      <View style={styles.container}>
        {photoUri ? (
          <Image
            source={{
              uri: photoUri,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text>No Image Available</Text>
        )}
        <View style={styles.content}>
        <Text style={styles.title}>{accom.title}</Text>
        <Button
          // onPress={onPressLearnMore}
          style={styles.button}
          title="See More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
        </View>
    );
}

export default AccommodationListItem;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "blue",
  },
  image: {
    padding: 50,
    maxWidth: "75%",
    width: 80,
    height: 80,
    marginRight: 10,
  },
  button: {
    alignSelf: "flex-start",
    maxWidth: '50%',
    flex: 1,
    alignItems: 'right'
  },
  content: {
    justifyContent: 'center',
  },
});