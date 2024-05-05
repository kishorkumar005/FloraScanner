import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Camera = () => {

  const [image, setImage] = useState(null);

  const CaptureImage = async () => {
    console.log("Image Capture Option is selected");
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.Images,
      allowsEditing : true,
      quality : 1

    })

    if(result.canceled){
      console.log("User Cancelled Image Capture");
    }
    else{
      setImage(result.assets[0]);
      console.log("Image Captured Sucessfully");
    }
  }
  return (

    <SafeAreaView
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
        <View>
          <TouchableOpacity
          style = {
            {
              alignItems : 'center',
              justifyContent : 'center',
              backgroundColor: '#DDDDDD',
              padding: 10,
            }
          }
          onPress={CaptureImage}
          >
            <Text>Capture Image</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
 
  )
}

export default Camera