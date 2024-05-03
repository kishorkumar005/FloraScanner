import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack options={{
      headerShown: false,
    }}>
      <Stack.Screen name='sign_in'
      options={{
        headerShown : false,
      }}
      >
      </Stack.Screen>
    </Stack>
  )
}

export default AuthLayout