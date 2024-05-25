import { StyleSheet, Image, Pressable } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';


export default function TabHome() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])



  return (
    <View style={styles.container}>
      <Image style={styles.image}source={require("../../../assets/images/logo.png")} resizeMode="contain"/>
      <View style={styles.btnContainer}>     
        <Text style={styles.signInText}>DON'T LEAVE DOGGO AT HOME!</Text>
        <Link href="/search" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              Start Planning Your Trip 
            </Text>
          </Pressable>
        </Link>
        {!session?.user && (
          <Link href='/profile' asChild>
            <Pressable style={styles.signInButton}>
              <Text style={styles.buttonText}>Sign In / Register</Text>
            </Pressable>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    maxHeight:"100%",
    maxWidth:"100%",
    flex:1,
    paddingTop: 100,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#3990CD',
    marginBottom: 8,
    width: 250,

  },
  signInButton: {
    paddingVertical: 12,
    paddingHorizontal: 57,
    borderRadius: 10,
    backgroundColor: '#3990CD',
    width: 250,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width:"100%",
    height:"60%",
  },
  signInText: {
    fontWeight:"bold",
    marginBottom: 20,
    fontSize: 18,
    color: '#3990CD',
    fontFamily: 'Futura-CondensedMedium',
  }
});
