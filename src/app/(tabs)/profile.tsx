import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/src/lib/supabase";
import Account from "@/src/components/Account";
import SignInScreen from "@/src/components/SignInScreen";
import { Redirect } from "expo-router";

const profile = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        
        <SignInScreen />
        // <Redirect href="/sign-in"/>
        
      )}
    </>
  );
};

export default profile;
