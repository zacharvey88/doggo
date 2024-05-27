import { StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { Link, router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import SignInModal from "../components/SignInModal";
export default function App() {
  const { session } = useAuth();
  // const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("@/assets/images/logo.png")}
          resizeMode="contain"
        />
        <Link href="/search" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Start Planning Your Trip</Text>
          </Pressable>
        </Link>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() =>
            router.push({ pathname: "/sign-in", params: { from: "landing" } })
          }
        >
          <Text style={styles.buttonText}>Sign In / Register</Text>
        </TouchableOpacity>
      </View>
      {/* <SignInModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    maxHeight: "100%",
    maxWidth: "100%",
    flex: 1,
    paddingTop: 100,
  },
  button: {
    position: "absolute",
    bottom: "20%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "rgb(1,140,220)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  signInText: {
    fontWeight: "bold",
  },
  signInButton: {
    position: "absolute",
    bottom: "13%",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 57,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "rgb(1,140,220)",
  },
  signOutButton: {
    position: "absolute",
    bottom: "13%",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 89,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "rgb(1,140,220)",
  },
});
