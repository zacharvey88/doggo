import { Pressable, View, Text , StyleSheet} from "react-native";
import SignInModal from "../components/SignInModal";
import Colors from "../constants/Colors";
const SignInScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.openButton}
      >
        <Text style={styles.buttonText}>Open Login</Text>
      </Pressable>

      <SignInModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  foreground: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 30,
    left: 0,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  pawImage1: {
    width: 150,
    height: 150,
  },
  pawImage2: {
    width: 80,
    height: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    height: 50,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  textButton: {
    color: Colors.light.tint,
    marginVertical: 10,
    marginLeft: 5,
    textDecorationLine: "underline",
    fontSize: 16,
  },
  text: {
    alignSelf: "center",
    marginVertical: 10,
    color: "gray",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  openButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignInScreen;
