import { View, Text, Button, Image } from 'react-native'
import React from 'react'
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const Upload = () => {

  const [image, setImage] = useState(require("../../assets/images/Image_placeholder.png"));
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    console.log("Image upload is selected!")
    let result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        allowsEditing : true,
        quality : 1
      }
      
    )

    if(result.canceled){
      console.log("User Cancelled Image Upload");
    }
    else{
      console.log("Image selection result : ",result);
      setImage(result.assets[0]);
    }
  };
  
  return (
    <>
        <View style={
      {
        display : 'flex',
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
      }
    }>
            <TouchableOpacity style={
              {
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                padding: 10,
              }
            } 
            onPress={pickImage}>
        <Text>Upload Image</Text>
      </TouchableOpacity>
       
    </View>
    <View style={
      {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom : "10em",
      }
    }>
      <Image source={image}
      resizeMode='contain'
      />
    </View>
    </>
  )
}

export default Upload