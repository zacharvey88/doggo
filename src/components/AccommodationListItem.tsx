import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Json } from '@/src/lib/database.types';
import { Link, Stack } from 'expo-router';

type AccommodationListItemProps = {
  accom: {
    accommodation_id: number;
    description: string,
    address: string;
    phone: string | null;
    photos: Json | undefined;
    title: string;
  };
};

const AccommodationListItem = ({ accom }: AccommodationListItemProps) => {
  const photoUri = Array.isArray(accom.photos) && accom.photos.length > 0 ? (accom.photos[0] as string) : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {photoUri ? (
          <Image
            source={{
              uri: photoUri,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{accom.title}</Text>
        <Text>{accom.description}</Text>
        <Link href={{
          pathname: `/search/${accom.accommodation_id}`,
          params: {
            title: accom.title,
            description: accom.description,
            address: accom.address,
            phone: accom.phone,
            photos: photoUri
          }
        }} asChild>
        <Button
          style={styles.button}
          title="See More"
        />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 415,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageContainer: {
    width: '98%',
    height: '60%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    marginTop: 3,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: 'blue',
  },
  button: {
    alignSelf: 'stretch',
    borderRadius: 10,
    height: 40,
    marginTop: 10,
    color: '#841584'
  },
});

export default AccommodationListItem;
