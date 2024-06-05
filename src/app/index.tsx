import {
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("@/assets/images/logo.png")}
        resizeMode="contain"
      />
      {/* <Image
        style={styles.slogan}
        source={require("@/assets/images/slogan.png")}
        resizeMode="contain"
      /> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({ pathname: "/sign-in", params: { from: "landing" } })
          }
        >
          <Text style={styles.buttonText}>LOGIN / REGISTER</Text>
        </TouchableOpacity>
        <Link href="/search" asChild>
          <Pressable style={styles.skipBtn}>
            <Text style={styles.skipText}>Continue as guest</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Futura",
  },
  logo: {
    width: "80%",
    height: "40%",
    marginBottom: 50,
  },
  slogan: {
    width: "80%",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    padding: 12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#2A99D0",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#2A99D0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  skipBtn: {
    marginTop: 12,
  },
  skipText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "gray",
  },
  tagline: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
});
