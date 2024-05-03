import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Image } from 'react-native'
import CustomButton from './CustomButton'
import { TouchableOpacity } from 'react-native-web'

const FormLayout = ({title,value,placeholder,handleChangeText}) => {
  
  const [showPassword,setShowPassword] = useState(false)
  return (
    <View style ={{
      width : "100%",
      marginTop : "25px",
      alignItems : 'center',
      justifyContent : 'center',
      
    }}>
      <Text>{title}</Text>
      <View style = {
        {
          // border : "#000000 solid 5px",
          width : "80%",
          height : "50px",
          padding : "10px",
          
          borderRadius : '10px',
          backgroundColor : "#d1c9c9"
        }
      }>
       <TextInput 
      placeholder= {placeholder} 
      placeholderTextColor="#7b7b8b"
      onChangeText = {handleChangeText}
      secureTextEntry = { title === "Password" && !showPassword}

      />
      {title === "Password" && (
        <TouchableOpacity 
        onPress = {() => setShowPassword(!showPassword)}
        >
            <Image source = {require("../assets/icons/eye.png")}
            resizeMode='contain'
            />
        </TouchableOpacity>
      )}
      </View>
     
    </View>
  )
}

export default FormLayout