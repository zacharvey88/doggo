import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { useEffect, useState } from "react";
import Account from "@/src/components/Account";
import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const { session } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {session && session.user ? (
        <Account session={session} />
      ) : (
        <View style={styles.signInContainer}>
          <FontAwesome name="sign-in" style={styles.signInIcon}></FontAwesome>
          <Text style={styles.signInTitle}>Sign in to view your profile</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/sign-in")}
          >
            <Text style={styles.btnTitle}>Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "#3990CD",
    marginTop: 15,
    width: "45%",
  },

  signInContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
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

});
