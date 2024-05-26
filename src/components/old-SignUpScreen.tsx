import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import Colors from "../constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up",  }} />

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
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? "Signing up..." : "Sign Up"}
      />
      <View style={styles.signinContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <Link replace href="/sign-in" style={styles.textButton}>
          Sign in
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
    textDecorationLine: "underline",
    fontSize: 16,
  },
  text: {
    alignSelf: "center",
    marginVertical: 10,
    color: "gray",
    fontSize: 16,
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SignUpScreen;
