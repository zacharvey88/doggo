import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Input } from "@rneui/themed";
import Button from "@components/Button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Session } from "@supabase/supabase-js";

export default function UpdateAccount() {
  const {
    username: initialUsername,
    avatarUrl: initialAvatarUrl,
    fullname: initialFullname,
    email: initialEmail,
  } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(initialUsername || "");
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || "");
  const [fullname, setFullname] = useState(initialFullname || "");
  const [email, setEmail] = useState(initialEmail || "");
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Correctly cleanup the auth listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function updateProfile({
    username,
    avatar_url,
    fullname,
  }: {
    username: string;
    avatar_url: string;
    fullname: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session.user.id,
        username,
        avatar_url,
        full_name: fullname,
        updated_at: new Date(),
      };

      console.log("Updating profile with:", updates); // Debug output

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      Alert.alert("Account updated successfully");
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error); // Log error to console
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Input label="Email" value={email || ""} disabled />

        <View style={styles.verticallySpaced}>
          <Input
            label="Avatar Url"
            value={avatarUrl}
            onChangeText={setAvatarUrl}
          />
        </View>
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Full Name" value={fullname} onChangeText={setFullname} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          text={loading ? "Loading ..." : "Update"}
          onPress={() =>
            updateProfile({ username, avatar_url: avatarUrl, fullname })
          }
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
