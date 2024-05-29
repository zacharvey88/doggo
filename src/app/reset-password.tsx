import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import Colors from "@/src/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const router = useRouter()
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Please enter your email address");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      Alert.alert(error.message);
    } else {
        Alert.alert("Password reset email sent!");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.foreground}>
        <Text style={styles.titleText}>Reset Password</Text>
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
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Send Reset Email"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  foreground: {
    padding: 30,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "700",
    color: "black",
    marginTop: 30,
    textAlign: "center",
  },
  form: {
    marginTop: 40,
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
  focused: {
    borderColor: "#2A99D0",
    borderWidth: 2,
  },
});

export default ResetPassword;
