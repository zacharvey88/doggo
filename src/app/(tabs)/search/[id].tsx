import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Linking, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import {StarRatingDisplay} from "react-native-star-rating-widget";

export default function Accommodation() {

    const [rating, setRating] = useState(4);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        id,
        title,
        description,
        address,
        phone, 
        photos,
        postcode,
        booking_url,
        city,
        country
    } = useLocalSearchParams();
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Stack.Screen options={{ title: '' }}/>
                <Text style={styles.title}>{title}</Text>
                {photos ? (
                <Image
                    source={{
                    uri: photos,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
                ) : (
                <Text>No Image Available</Text>
                )}
                <StarRatingDisplay rating={rating}/>
                <View style={styles.buttonContainer}>
                    <Button 
                    title="Book Now" 
                    titleStyle={{ fontSize: 14 }}
                    style={styles.button}
                    onPress={() => {Linking.openURL(booking_url)}}
                    />
                    <Button 
                    title="See Reviews" 
                    titleStyle={{ fontSize: 14 }}
                    style={styles.button}
                    onPress={() => router.push(`/search/${id}/reviews`)}
                    />
                    <Button 
                    title="Add to trip" 
                    titleStyle={{ fontSize: 14 }}
                    style={styles.button}
                    onPress={() => {}}
                    />
                </View>

                {description &&
                <View style={styles.textContainer}>
                    <Text style={styles.header}>Description</Text>
                    <Text style={styles.text}>{description}</Text>
                </View>
                }
                {address &&
                <View style={styles.textContainer}>
                    <Text style={styles.header}>Address</Text>
                    <Text style={styles.text}>{address}</Text>
                    <Text style={styles.text}>{postcode}</Text>
                    <Text style={styles.text}>{city}</Text>
                    <Text style={styles.text}>{country}</Text>
                </View>
                }
                {phone &&
                <View style={styles.textContainer}>
                    <Text style={styles.header}>Phone</Text>
                    <Text style={styles.text}>{phone}</Text>
                </View>
                }

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    scrollContainer: {
      alignItems: 'center',
      padding: 20,
    },
    reviewText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 15,
    },
    button: {
      margin: 10,
      height: 35,  
    },
    textContainer: {
      marginBottom: 20,
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      marginTop: 5,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#3A90CD',
      marginBottom: 10,
      textAlign: 'center',
      paddingVertical: 5,
      backgroundColor: '#f0f0f0',
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: '#3A90CD',
    },
    image: {
        width: '100%',
        height: 275,
    },
});

