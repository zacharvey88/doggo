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
  Pressable,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import { Link, useNavigation } from "expo-router";
import Colors from "../constants/Colors";
import UserReviewsList from "./UserReviewsList";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const defaultImage = "https://i.sstatic.net/l60Hf.png";
  const [table, setTable] = useState("reviews_airlines");

  const router = useRouter();

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
            if (error) Alert.alert(error.message);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["right", "left", "top"]}>
      <ScrollView style={styles.container}>
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
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="logout"
                ></MaterialCommunityIcons>
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
                <Pressable
                  onPress={() => {
                    router.push("/my-accommodation");
                  }}
                >
                  <Text style={styles.textButton}>Manage Properties</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.tabs}>
              <Pressable
                onPress={() => {
                  setTable("reviews_airlines");
                }}
                style={styles.tab}
              >
                <Text style={styles.tabText}>Airline Reviews</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setTable("reviews_accommodation");
                }}
                style={styles.tab}
              >
                <Text style={styles.tabText}>Property Reviews</Text>
              </Pressable>
              {/* <Pressable onPress={()=>{setTable('reviews_airlines')}} style={styles.tab}><Text style={styles.tabText}>Property Listings</Text></Pressable> */}
            </View>
            <View style={styles.listArea}>
              <UserReviewsList id={session?.user.id} table={table} />
            </View>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 1,
    color: "gray",
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
    // flexShrink: 1,
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
  signOutButtonText: {
    fontSize: 50,
  },
  tabs: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
    padding: 10,
    width: "95%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A90CD",
    padding: 5,
    borderRadius: 5,
  },
  tabText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  links: {
    flexDirection: "row",
    gap: 10,
  },
});
