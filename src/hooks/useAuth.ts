import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
    });
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user);
        setLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return { user, loading };
};
