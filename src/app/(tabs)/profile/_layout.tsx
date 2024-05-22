import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const AccountStack = () => {
   
  return (
    <Stack>
      <Stack.Screen name="index"  options={{title: "" }}  />
      <Stack.Screen name="update"  options={{title:"Edit Profile"}}  />
    </Stack>
  )
}

export default AccountStack