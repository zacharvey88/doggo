import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { StyleSheet, View, Alert, Text, Image } from "react-native";
import { Session } from "@supabase/supabase-js";
import { Link, useNavigation } from "expo-router";
import Colors from "../constants/Colors";
import Button from "./Button";
import Avatar from "./Avatar";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select("username, avatar_url, full_name, email")
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFullname(data.full_name);
        setAvatarUrl(data.avatar_url);
        setEmail(data.email);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProfile();
    }
  }, [session]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (session) {
        fetchProfile();
      }
    });

    return unsubscribe;
  }, [navigation, session]);

  return (
    <View style={styles.container}>
      <View style={styles.badge}>



        <Image source={{ uri: `https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/${avatarUrl}` || null }} style={styles.image} />
        <Text style={styles.fullname}>{fullname}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <Link
        style={styles.textButton}
        href={{
          pathname: "/profile/update",
          params: { username, avatarUrl, fullname, email },
        }}
      >
        Edit Profile
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign Out"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginTop: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  badge: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  image: {
    width: "40%",
    aspectRatio: 1,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 100,
  },
  textButton: {
    color: Colors.light.tint,
    textDecorationLine: "underline",
    alignSelf: "center",
    fontSize: 16,
  },
  fullname: {
    marginTop: 16,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
  username: {
    alignSelf: "center",
    color: "gray",
    fontSize: 18,
  },
});
