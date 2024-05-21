import { StyleSheet, Image, Text, View } from 'react-native';

type AccommodationListItemProps = {
    accom: {
        title: string;
        image: string | null;
    }
}

const AccommodationListItem = ({accom}: AccommodationListItemProps) => {
    return (
        <View>
            <Image source={{uri: accom.image}} style={styles.image} resizeMode='contain'/>
            <Text style={styles.title}>{accom.title}</Text>
        </View>
    )
}

export default AccommodationListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    color: 'red'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
});