import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  AppState,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/src/constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import Button from "./Button";
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? "Signing in..." : "Sign in"}
      />
      <View style={styles.signupContainer}>
        <Text style={styles.text}>Don't have an account?</Text>
      <Link href="/sign-up" style={styles.textButton}>
        Sign up
      </Link>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    color: Colors.light.tint,
    marginVertical: 10,
    marginLeft: 5,
    textDecorationLine: 'underline',
    fontSize: 16,

  },
  text:{
    alignSelf: "center",
    marginVertical: 10,
    color: 'gray',
    fontSize: 16,


  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    
  },
});

export default SignInScreen;
