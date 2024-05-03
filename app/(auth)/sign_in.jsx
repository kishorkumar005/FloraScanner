import { View, Text,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormLayout from '../../components/Form'
import { useState } from 'react'

const font = require("../../assets/fonts/InknutAntiqua-ExtraBold.ttf")
const SignIn = () => {

  const [form, setForm] = useState({email : "", password : ""})
  
  return (
    <SafeAreaView>
      <View style = {{
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',       
      }}
      className = "w-full h-full"
      >
        <Image source = {require("../../assets/images/splash.png")}
        resizeMode='contain'
        style = {
          {
            width : "100px",
            height : "100px"
          }
        }
        ></Image>
        <Text font = {font}> Login To continue</Text>
        <FormLayout 
          title = "Email"
          value = {form.email}
          placeholder= "example.gmail.com"
          handleChangeText = {
            (e) => setForm({...form, email : e})
          }
          keyboardType = "email-address"
        />
         <FormLayout 
          title = "Password"
          value = {form.password}
          handleChangeText = {
            (e) => setForm({...form, password : e})
          }
          keyboardType = "email-address"
        />
      </View>
    </SafeAreaView>
  )
}

export default SignIn