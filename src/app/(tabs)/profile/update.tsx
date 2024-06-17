import { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { StyleSheet, View, Alert, ScrollView, TouchableOpacity, Text } from "react-native";
import { Input } from "@rneui/themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import Avatar from "@/src/components/Avatar";
import { useAuth } from "@/src/providers/AuthProvider";

export default function UpdateAccount() {
  const {
    username: initialUsername,
    avatarUrl: initialAvatarUrl,
    fullName: initialFullName,
    email: initialEmail,
  } = useLocalSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(initialUsername || "");
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || "");
  const [fullName, setFullName] = useState(initialFullName || "");
  const [email, setEmail] = useState(initialEmail || "");
  const router = useRouter();
  const { session } = useAuth();

  async function updateProfile({
    username,
    avatar_url,
    fullName,
  }: {
    username: string;
    avatar_url: string;
    fullName: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session.user.id,
        username,
        avatar_url,
        full_name: fullName,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      setUsername(username);
      setAvatarUrl(avatar_url);
      setFullName(fullName);

      Alert.alert("Account updated successfully");
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.verticallySpaced}>
        <Input
          label="Email"
          value={email}
          disabled
          inputStyle={styles.inputDisabled}
        />
        <View style={styles.avatarContainer}>
          <Avatar
            size={120}
            url={avatarUrl}
            onUpload={(url: string) => {
              setAvatarUrl(url);
              updateProfile({ username, fullName, avatar_url: url });
            }}
          />
        </View>
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          inputStyle={styles.input}
        />
      </View>
        <TouchableOpacity 
          style={styles.button} 
          disabled={loading}
          onPress={() =>
            updateProfile({ username, avatar_url: avatarUrl, fullName })
          }>
          <Text style={styles.buttonText}> {loading ? "Loading ..." : "Update Profile"} </Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "white",
  },
  verticallySpaced: {
    paddingVertical: 10,
    alignSelf: "stretch",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    color: "#333",
  },
  inputDisabled: {
    color: "#999",
  },
  button: {
    height: 45,
    padding: 10,
    backgroundColor: '#2A99D0',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'futura'
  },
});
