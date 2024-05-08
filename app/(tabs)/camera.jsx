// import { View, Text, Image } from 'react-native'
// import React, { useState } from 'react'
// import * as ImagePicker from "expo-image-picker";
// import { TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Camera = () => {

//   const [image, setImage] = useState(null);

//   const CaptureImage = async () => {
//     console.log("Image Capture Option is selected");
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes : ImagePicker.MediaTypeOptions.Images,
//       allowsEditing : true,
//       quality : 1

//     })

//     if(result.canceled){
//       console.log("User Cancelled Image Capture");
//     }
//     else{
//       setImage(result.assets[0]);
//       console.log("Image Captured Sucessfully");
//     }
//   }
//   return (

//     <SafeAreaView
//     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
//     >
//         <View>
//           <TouchableOpacity
//           style = {
//             {
//               alignItems : 'center',
//               justifyContent : 'center',
//               backgroundColor: '#DDDDDD',
//               padding: 10,
//             }
//           }
//           onPress={CaptureImage}
//           >
//             <Text>Capture Image</Text>
//           </TouchableOpacity>
//         </View>
//     </SafeAreaView>
 
//   )
// }

// export default Camera



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';

const Upload = () => {
  const [image, setImage] = useState(require("../../assets/images/Image_placeholder.png"));
  const [prediction, setPrediction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(false);


  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      selectionLimit: 1,
      base64: true, 
    });
  
    if (result.cancelled) {
      console.log("User Cancelled Image Upload");
      return;
    }
  
    const { uri, base64 } = result.assets[0]; 
  
    try {
      setIsLoading(true);
      const response = await fetch('https://florascannerapi.onrender.com/predict', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }), 
      });
    
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
    
      const predictionData = await response.json();
      console.log("Prediction:", predictionData); 
      setPrediction(predictionData);
      setIsLoading(false);
      setModalVisible(true); 
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error.response) {
        console.log('Response:', await error.response.text()); // Log the response
      }
    }
    
    
  };

  return (
    <SafeAreaView style={styles.containerout}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Capture Image</Text>
      </TouchableOpacity>
      {isLoading ? <ActivityIndicator size="large"  />:<></>}
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}><b>Prediction Result</b></Text>
      <Text style={styles.resultText}><b>Class:</b> {prediction?.class}</Text>
      <Text style={styles.resultText}><b>Confidence:</b> {prediction?.confidence}%</Text>
      <Text style={styles.modalText}>Details</Text>
      {prediction?.details && (
        <View>
          {Object.entries(prediction.details).map(([key, value], index) => (
            <View key={index}  style={styles.detailContainer}>
              <Text style={styles.detailTitle}>{key}:</Text>
              <Text style={styles.detailText}>{value}</Text>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: '#41B06E' }}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      
      {/* <View style={styles.imageContainer}>
        <Image source={image} resizeMode='contain' style={styles.image} />
      </View> */}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "#69f662",

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#3e7d17',
    borderRadius : "0.5em",
    border : "1px solid #7bff55",
    padding: 15,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color : "#ffffff"

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    marginBottom: 10,
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Upload;
