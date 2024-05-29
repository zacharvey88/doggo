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

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Password updated successfully!");
      router.push("/sign-in");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Update your password</Text>
      <Text style={styles.subtitle}>Update your password below.</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        placeholder="New Password"
        placeholderTextColor="#7c7c7c"
        secureTextEntry
        style={[styles.input, passwordFocused && styles.focused]}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onFocus={() => setConfirmPasswordFocused(true)}
        onBlur={() => setConfirmPasswordFocused(false)}
        placeholder="Confirm Password"
        placeholderTextColor="#7c7c7c"
        secureTextEntry
        style={[styles.input, confirmPasswordFocused && styles.focused]}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleUpdatePassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Updating..." : "Update"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 15,
    padding: 10,
    borderColor: "#cfd4d4",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
  },
  focused: {
    borderColor: "#2A99D0",
    borderWidth: 2,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 18,
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
});

export default UpdatePassword;
