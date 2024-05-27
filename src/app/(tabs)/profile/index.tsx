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
        <View style={styles.container}>
          <Text style={styles.text}>Please log in to view your profile</Text>
          <TouchableOpacity
              style={styles.button}
              onPress={()=>router.push('/sign-in')
}
            // onPress={() => setLoginModalVisible(true)}
          >
            <Text style={styles.buttonText}>Login</Text>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
