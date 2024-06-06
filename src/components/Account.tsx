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
  Pressable,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import { Link, useNavigation } from "expo-router";
import Colors from "../constants/Colors";
import UserReviewsList from "@components/review-components/UserReviewsList";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const defaultImage = "https://i.sstatic.net/l60Hf.png";
  const [table, setTable] = useState("reviews_airlines");

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
        setFullName(data.full_name);
        setAvatarUrl(data.avatar_url);
        setEmail(data.email);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
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

  const handleSignOut = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) Alert.alert(error.message)
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["right", "left", "top"]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <>
          <View style={styles.badge}>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={handleSignOut}
            >
              <FontAwesome style={styles.icon} name="sign-out" />
            </TouchableOpacity>
            <Image
              source={{
                uri: avatarUrl
                  ? `https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`
                  : defaultImage,
              }}
              style={styles.image}
            />
            <Text style={styles.fullName}>{fullName}</Text>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.links}>
              <Link
                style={styles.textButton}
                href={{
                  pathname: "/profile/update",
                  params: { username, avatarUrl, fullName, email },
                }}
              >
                Edit Profile
              </Link>
              <Link
                style={styles.textButton}
                push
                href="/profile/manage-properties"
              >
                Manage Properties
              </Link>
            </View>
          </View>
          <View style={styles.tabs}>
            <Pressable
              onPress={() => {
                setTable("reviews_airlines");
              }}
              style={[
                styles.tab,
                table === "reviews_airlines" && styles.activeTab,
              ]}
            >
              <FontAwesome
                name="plane"
                style={[
                  styles.tabIcon,
                  table === "reviews_airlines" && styles.activeTabIcon,
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  table === "reviews_airlines" && styles.activeTabText,
                ]}
              >
                Airline Reviews
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setTable("reviews_accommodation");
              }}
              style={[
                styles.tab,
                table === "reviews_accommodation" && styles.activeTab,
              ]}
            >
              <FontAwesome
                name="home"
                style={[
                  styles.tabIcon,
                  table === "reviews_accommodation" && styles.activeTabIcon,
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  table === "reviews_accommodation" && styles.activeTabText,
                ]}
              >
                Property Reviews
              </Text>
            </Pressable>
          </View>
          <View style={styles.listArea}>
            <UserReviewsList user_id={session?.user.id} table={table} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -40,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  textButton: {
    color: Colors.light.tint,
    textDecorationLine: "underline",
    fontSize: 16,
    marginTop: 10,
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 5,
    marginTop: 10,
    color: "#333",
  },
  username: {
    color: "gray",
    fontSize: 18,
  },
  listArea: {
    flexGrow: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  signOutButton: {
    position: "absolute",
    top: 15,
    right: 25,
    zIndex: 1,
  },
  icon: {
    color: "#636363",
    fontSize: 30,
  },
  tabs: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
    padding: 10,
    width: "95%",
    marginTop: 10,
  },
  tab: {
    marginTop: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#3A90CD",
  },
  tabText: {
    color: "gray",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },
  activeTabText: {
    color: "#3A90CD",
  },
  tabIcon: {
    fontSize: 24,
    color: "gray",
  },
  activeTabIcon: {
    color: "#3A90CD",
  },
  links: {
    flexDirection: "row",
    gap: 10,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    margin: 0,
    borderRadius: 40,
  },
});
