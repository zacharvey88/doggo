import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome6 } from '@expo/vector-icons';
import { Link, Tabs } from "expo-router";
import { Pressable, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { Session } from "@supabase/supabase-js";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
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
  },[]);

  useEffect(()=>{
    fetchAvatar()
  },[session])

  const fetchAvatar = async () => {
    const { data, error, status } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", session?.user.id)
    .single();
    if (data) {
      setAvatarUrl(`https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/${data.avatar_url}`);
    }
  }

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null, // Hides the tab
          title: "Home"
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="magnifying-glass" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="airlines"
        options={{
          title: "Airlines",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="plane" color={color} />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "My Trips",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome6 name="route" size={24} color={color} />,
        // headerRight: () => (
        //   <View style={{ flexDirection: "row", alignItems: "center" }}>
        //     <Text style={{ marginRight: 10 }}>Add Trip</Text>
        //     <Link href="/create-trip" asChild>
        //       <Pressable>
        //         {({ pressed }) => (
        //           <FontAwesome
        //             name="plus"
        //             size={25}
        //             color={Colors[colorScheme ?? "light"].text}
        //             style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        //           />
        //         )}
        //       </Pressable>
        //     </Link>
        //   </View>
        // ),

        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (session && session.user) {
              return <Image source={{ uri: avatarUrl }} style={{ width: 30, height: 30, borderRadius: 15 }}/>;
            } else {
              return <Ionicons name="person-circle-sharp" size={30} color={color} />;
            }
          },
        }}
      />
    </Tabs>
  );
}
