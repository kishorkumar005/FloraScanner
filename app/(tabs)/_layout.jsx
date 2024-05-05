import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={
      {
        headerShown : false,
      }
    }>
      <Tabs.Screen name='upload' 
      options={{
        title : "Upload"
      }}
      />

      <Tabs.Screen name='camera' 
      options={{
        title : "Camera"
      }}
      />
    </Tabs>
  )
}

export default TabsLayout