import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import { Link, useNavigation } from "expo-router";
import Colors from "../constants/Colors";
import UserReviewsList from "./UserReviewsList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const defaultImage = "https://i.sstatic.net/l60Hf.png";

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
    const unsubscribe = navigation.addListener("focus", () => {
      if (session) {
        fetchProfile();
      }
    });

    return unsubscribe;
  }, [navigation, session]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : (
          <>
            <View style={styles.badge}>
              <Image
                source={{
                  uri: avatarUrl
                    ? `https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`
                    : defaultImage,
                }}
                style={styles.image}
              />
              <Text style={styles.fullname}>{fullname}</Text>
              <Text style={styles.username}>{username}</Text>

              <Link
                style={styles.textButton}
                href={{
                  pathname: "/profile/update",
                  params: { username, avatarUrl, fullname, email },
                }}
              >
                Edit Profile
              </Link>
            </View>

            <View style={styles.listArea}>
              <UserReviewsList id={session?.user.id} table="reviews_airlines" />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  badge: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 10,
  },
  textButton: {
    color: Colors.light.tint,
    textDecorationLine: "underline",
    fontSize: 16,
    marginTop: 10,
  },
  fullname: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
  },
  username: {
    color: "gray",
    fontSize: 18,
    marginBottom: 20,
  },
  listArea: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
