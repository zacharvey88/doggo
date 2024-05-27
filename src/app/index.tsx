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
          style={styles.logo}
          source={require("@/assets/images/logo.png")}
          resizeMode="contain"
        />

        <Image
          style={styles.slogan}
          source={require("@/assets/images/slogan.png")}
          resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
          <Link href="/search" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>PLAN YOUR TRIP</Text>
            </Pressable>
          </Link>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() =>
              router.push({ pathname: "/sign-in", params: { from: "landing" } })
            }
          >
            <Text style={styles.buttonText}>LOGIN / REGISTER</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
    fontFamily: 'Roboto'
  },
  logo: {
    width: "90%",
    height: "60%",
  },
  signInText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
    button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#3990CD",
    width: 260,
    alignItems: 'center'
  },
  signInButton: {
    paddingVertical: 12,
    paddingHorizontal: 57,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#3990CD",
    width: 260,
    alignItems: 'center'
  },
  slogan: {
    width: '80%'
  }
});
