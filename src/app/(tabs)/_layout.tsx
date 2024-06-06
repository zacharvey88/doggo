import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome6, Fontisto, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { supabase } from "@/src/lib/supabase";
import { Session } from "@supabase/supabase-js";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    fetchAvatar();
  }, [session]);

  const fetchAvatar = async () => {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", session?.user.id)
      .single();
    if (data) {
      setAvatarUrl(
        `https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/${data.avatar_url}`
      );
    }
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="magnifying-glass" size={24} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="airlines"
        options={{
          title: "Airlines",
          headerShown: false,
          tabBarIcon: ({ color }) => 
            <TabBarIcon name="plane" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="trips"
        options={{
          title: "My Trips",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Fontisto name="suitcase" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (session && session.user) {
              return (
                <Image
                  source={{ uri: avatarUrl }}
                  style={{ width: 30, height: 30, borderRadius: 15}}
                />
              );
            } else {
              return (
                <Ionicons name="person-circle-sharp" size={30} color={color} />
              );
            }
          },
        }}
      />
    </Tabs>
  );
}
