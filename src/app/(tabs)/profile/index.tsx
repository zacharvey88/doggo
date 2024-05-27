import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/src/lib/supabase";
import Account from "@/src/components/Account";
import SignInModal from "@/src/components/SignInModal";
import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const { session } = useAuth();
const router = useRouter()
  useEffect(() => {
    if (!session) {
      setLoginModalVisible(true);
    }
  }, [session]);

  return (
    <>
      {session && session.user ? (
        <Account session={session} />
      ) : (
        <View style={styles.signInContainer}>
          <FontAwesome name="sign-in" style={styles.signInIcon}></FontAwesome>
          <Text style={styles.signInTitle}>Sign in to view your profile</Text>

          <TouchableOpacity
            // onPress={() => setLoginModalVisible(true)}
            style={styles.signInButton}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={styles.btnTitle}>Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <SignInModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      /> */}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  text: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#2A99D0",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 100,
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 60
  },
  signInIcon: {
    fontSize: 60,
    color: "#3990CD",
    marginBottom: 10,
  },
  signInTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  btnTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  signInButton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "#3990CD",
    marginTop: 15,
    width: "45%",
  },
});
