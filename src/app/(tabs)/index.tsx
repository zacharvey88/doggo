import { StyleSheet, Image, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Link } from 'expo-router';

export default function TabHome() {
  return (
    <View style={styles.container}>

      <Image style={styles.image}source={require("../../../assets/images/logo.png")} resizeMode="contain"/>
      <Link href="/search" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Start Planning Your Trip
          </Text>
        </Pressable>
      </Link>
      <Link href='/sign-in' asChild>
      <Pressable style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign In / Register</Text>
      </Pressable>
      </Link>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    maxHeight:"100%",
    maxWidth:"100%",
    flex:1
  },
  button: {
    position: "absolute",
    bottom: "20%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgb(1,140,220)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width:"100%",
    height:"60%",
  },
  signInText: {
    fontWeight:"bold",
  },
  signInButton: {
    position: "absolute",
    bottom: "13%",
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 57,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgb(1,140,220)',
    
  }
});
