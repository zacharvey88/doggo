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

const ProfileScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const [session, setSession] = useState<Session | null>(null);
  const { session } = useAuth();
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  useEffect(() => {
    if (!session) {
      setModalVisible(true);
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
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
      <SignInModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
