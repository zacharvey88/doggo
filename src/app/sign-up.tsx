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
import { Link, useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import Colors from "@/src/constants/Colors";
import { StatusBar } from "expo-status-bar";

const SignUpScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  async function signUpWithEmail() {
    if (!validateEmail(email)) {
      Alert.alert("Invalid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Sign-up successful!");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        Alert.alert(signInError.message);
      } else {
        router.push("/search");
      }
    }

    setLoading(false);
  }

  async function resetPassword() {
    if (!validateEmail(email)) {
      Alert.alert("Invalid email address");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Password reset email sent!");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("@/assets/images/background.png")}
        style={styles.background}
      />
      <View style={styles.foreground}>
        <Text style={styles.titleText}>Don't Leave Doggo At Home!</Text>
        <Text style={styles.subtitleText}>Create an account now</Text>
        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="Email"
            placeholderTextColor="#7c7c7c"
            style={[styles.input, emailFocused && styles.focused]}
            autoCapitalize="none"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Password"
            placeholderTextColor="#7c7c7c"
            style={[styles.input, passwordFocused && styles.focused]}
            secureTextEntry
          />
          {passwordFocused && (
            <Text style={styles.passwordHint}>
              Password must be at least 6 characters
            </Text>
          )}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={signUpWithEmail}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>
     
        </View>
        <View style={styles.signinContainer}>
          <Text style={styles.text}>Already have an account?</Text>
          <Link replace href="/sign-in" style={styles.textButton}>
            Login
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.9,
  },
  foreground: {
    padding: 30,
  },
  titleText: {
    marginTop: 40,
    fontSize: 40,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    marginTop: 40,
    fontWeight: "500",
    alignSelf: "center",
  },
  form: {
    marginTop: 180,
  },
  input: {
    padding: 10,
    marginBottom: 15,
    borderColor: "#cfd4d4",
    borderRadius: 10,
    height: 50,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowColor: Colors.light.tint,
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
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    color: "gray",
    fontSize: 16,
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 40,
  },
  focused: {
    borderColor: "#2A99D0",
    borderWidth: 2,
  },
  passwordHint: {
    color: "gray",
    fontSize: 14,
    marginBottom: 15,
  },
});

export default SignUpScreen;