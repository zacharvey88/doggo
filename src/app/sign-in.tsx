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
import {
  Link,
  useRouter,
  useNavigation,
  useLocalSearchParams,
} from "expo-router";
import { supabase } from "@/src/lib/supabase";
import Colors from "@/src/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
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
        navigation.navigate("search");
      } else {
        navigation.goBack();
      }
    }
    setLoading(false);
  }

  // async function resetPassword() {
  //   if (!email) {
  //     Alert.alert("Please enter your email address to reset password");
  //     return;
  //   }

  //   const { error } = await supabase.auth.resetPasswordForEmail(email);
  //   if (error) {
  //     Alert.alert(error.message);
  //   } else {
  //     Alert.alert("Password reset email sent!");
  //   }
  // }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollViewContent}
      enableOnAndroid={true}
      extraScrollHeight={100}
    >
      <StatusBar style="light" />
      <Image
        source={require("@/assets/images/background.png")}
        style={styles.background}
      />
      <View style={styles.foreground}>
        <Image
          source={require("@/assets/images/paw.png")}
          style={styles.pawImage}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>Welcome! </Text>
        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="Email"
            placeholderTextColor="#7c7c7c"
            autoCapitalize="none"
            style={[styles.input, emailFocused && styles.focused]}
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
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={signInWithEmail}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() =>router.replace("/reset-password")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.text}>Don't have an account? </Text>
          <Link replace href="/sign-up" style={styles.textButton}>
            Sign up
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.9,
  },
  pawImage: {
    width: 150,
    height: 150,
    marginTop: 10,
    opacity: 0.8,
    alignSelf: "center",
  },
  foreground: {
    padding: 30,
  },
  titleText: {
    fontSize: 50,
    fontWeight: "700",
    color: "white",
    marginTop: 30,
    textAlign: "center",
    fontFamily:"Futura"
  },
  form: {
    marginTop: 160,
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
  forgotPasswordButton: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: "gray",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },
  focused: {
    borderColor: "#2A99D0",
    borderWidth: 2,
  },
});

export default SignInScreen;
