import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const AccountStack = () => {
   
  return (
    <Stack>
      <Stack.Screen name="(profile)" options={{ headerShown:false }} />
    </Stack>
  )
}

export default AccountStack