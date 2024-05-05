import { View, Text,Image } from 'react-native'
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
        title : "Upload",
        tabBarIcon : ({color,focused}) => {
          return(
            <Image 
            source = {require("../../assets/icons/upload_icon.png")}
            resizeMode='contain' 
            style={{
              width : 50,
              height : 50,
            }}
            tintColor={color}
            />
          )
        }
      }}
      />

<Tabs.Screen name='camera' 
      options={{
        title : "Camera",
        tabBarIcon : ({color,focused}) => {
          return(
            <Image 
            source = {require("../../assets/icons/capture_image.png")}
            resizeMode='contain' 
            style={{
              width : 30,
              height : 30,
            }}
            tintColor={color}
            />
          )
        }
      }}
      />


    </Tabs>
  )
}

export default TabsLayout