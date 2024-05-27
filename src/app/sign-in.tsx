import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import Colors from "@/src/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
   const { from } = useLocalSearchParams();
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      if (from === "landing") {
        router.push("/search");
      } else {
        navigation.goBack(); 
      }
    }
    setLoading(false);
  }


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("@/assets/images/background.png")}
        style={styles.background}
      />
      <View style={styles.foreground}>
        <Text style={styles.titleText}>Login here</Text>
        <Text style={styles.subtitleText}>
          Welcome back, you've been missed!
        </Text>
        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#7c7c7c"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#7c7c7c"
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={signInWithEmail}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.text}>Don't have an account?</Text>
          <Link replace href="/sign-up" style={styles.textButton}>
            Sign up
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.8,
  },
  foreground: {
    padding: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 50,
  },
  subtitleText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  form: {
    marginTop: 50,
  },
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#EBEEEC",
    borderRadius: 10,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2A99D0",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  textButton: {
    color: Colors.light.tint,
    marginVertical: 10,
    textDecorationLine: "underline",
    fontSize: 16,
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    color: "gray",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5
  },
});

export default SignInScreen;
