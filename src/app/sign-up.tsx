import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import Colors from "@/src/constants/Colors";
import { StatusBar } from "expo-status-bar";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
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
      options: {
        data: {
          full_name: fullName,
          username,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      // Store additional user info
      // const { data, error: userError } = await supabase
      //   .from("profiles")
      //   .insert([
      //     { id: supabase.auth.user()?.id, full_name: fullName, username },
      //   ]);

      // if (userError) {
      //   Alert.alert(userError.message);
      // } else {
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("@/assets/images/background.png")}
        style={styles.background}
      />
      <View style={styles.foreground}>
        {/* <Image
          source={require("@/assets/images/paw.png")}
          style={styles.pawImage1}
          resizeMode="contain"
        /> */}
      </View>
      <View style={styles.container2}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Don't Leave Doggo At Home!</Text>
          <Text style={styles.subTitle}>Create an account now</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor="#7c7c7c"
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor="#7c7c7c"
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#7c7c7c"
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#7c7c7c"
            style={styles.input}
            secureTextEntry
          />
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

        <View style={styles.signupContainer}>
          <Text style={styles.text}>Already have an account?</Text>
          <Link href="/sign-in" style={styles.textButton}>
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
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
  },
  container2: {
    display: "flex",
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  foreground: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 70,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  titleText: {
    marginTop: 50,
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    fontFamily: 'Futura',
    textAlign: 'center'
  },
  subTitle: {
    marginTop: 20,
    fontFamily: 'Futura',
    fontSize: 25,
    color: 'white'
  },
  pawImage1: {
    width: 150,
    height: 150,
  },
  pawImage2: {
    width: 80,
    height: 80,
  },
  form: {
    display: "flex",
    alignContent: "space-around",
    marginTop: 100,
  },
  label: {
    color: "gray",
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SignUpScreen;
