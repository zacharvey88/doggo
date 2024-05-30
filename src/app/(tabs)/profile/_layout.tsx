import { View, Text } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const AccountStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "Profile" }} />
      <Stack.Screen name="update" options={{ title: "" }} />
      <Stack.Screen name="manage-properties" options={{ title: "My Properties",  headerBackTitle: "Back"}} />
    </Stack>
  );
};

export default AccountStack;
