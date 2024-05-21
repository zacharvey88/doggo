import { StyleSheet, Image, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Link } from 'expo-router';

export default function TabHome() {
  return (
    <View style={styles.container}>
      <Image style={styles.image}source={require("../../../assets/images/logo.png")}/>

    <Link href="/search" asChild>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Start Planning Your Trip
        </Text>
      </Pressable>
    </Link>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop:40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgb(1,130,200)',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    height:"50%",
    width:"80%",
  }
});
