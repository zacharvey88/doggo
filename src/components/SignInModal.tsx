import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import Colors from "@/src/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

type SignInModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    else {
      onClose();
    }
    setLoading(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image
          source={require("@/assets/images/background.png")}
          style={styles.background}
        />
        <View style={styles.foreground}>
          <Image
            source={require("@/assets/images/paw.png")}
            style={styles.pawImage1}
            resizeMode="contain"
          />
          {/* <Image
            source={require("@/assets/images/paw.png")}
            style={styles.pawImage2}
            resizeMode="contain"
          /> */}
        </View>
        <View style={styles.container2}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="close" size={30} color="white" />
          </Pressable>
          <View style={styles.title}>
            <Text style={styles.titleText}>Login</Text>
          </View>
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
            <Link href="/sign-up" style={styles.textButton} onPress={onClose}>
              Sign up
            </Link>
          </View>
        </View>
      </View>
    </Modal>
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
    paddingTop: 180,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
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
    marginTop: 150,
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
  closeButton: {
    top: -30,
    position: "absolute",
    right: 30,
    zIndex: 1,
  },
});

export default SignInModal;
