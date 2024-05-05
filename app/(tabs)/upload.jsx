// import { View, Text, Button, Image } from 'react-native'
// import React from 'react'
// import * as ImagePicker from "expo-image-picker";
// import { useState } from 'react';
// import { TouchableOpacity } from 'react-native';

// const Upload = () => {

//   const [image, setImage] = useState(require("../../assets/images/Image_placeholder.png"));
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       selectionLimit: 1,
//       base64: true, // Include base64 data for sending to the API
//     });
  
//     if (result.canceled) {
//       console.log("User Cancelled Image Upload");
//       return;
//     }
  
//     const { uri, base64 } = result.assets[0]; // Extract image data
  
//     try {
//       const response = await fetch('http://localhost:8000/predict', { // Replace with your API URL
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ image: base64 }), // Send base64 encoded image
//       });
  
//       const predictionData = await response.json();
//       console.log("Prediction:", predictionData); // Log prediction data in console
//       // Update UI to display predicted class, confidence, and details (optional)
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };
  
  

  
//   return (
//     <>
//         <View style={
//       {
//         display : 'flex',
//         flex : 1,
//         alignItems : 'center',
//         justifyContent : 'center',
//       }
//     }>
//             <TouchableOpacity style={
//               {
//                 alignItems: 'center',
//                 backgroundColor: '#DDDDDD',
//                 padding: 10,
//               }
//             } 
//             onPress={pickImage}>
//         <Text>Upload Image</Text>
//       </TouchableOpacity>
       
//     </View>
//     <View style={
//       {
//         flex : 1,
//         alignItems : 'center',
//         justifyContent : 'center',
//         marginBottom : "10em",
//       }
//     }>
//       <Image source={image}
//       resizeMode='contain'
//       />
//     </View>
//     </>
//   )
// }

// export default Upload

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const Upload = () => {
  const [image, setImage] = useState(require("../../assets/images/Image_placeholder.png"));
  const [prediction, setPrediction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      selectionLimit: 1,
      base64: true, // Include base64 data for sending to the API
    });
  
    if (result.cancelled) {
      console.log("User Cancelled Image Upload");
      return;
    }
  
    const { uri, base64 } = result.assets[0]; // Extract image data
  
    try {
      const response = await fetch('https://florascannerapi.onrender.com/predict', { // Replace with your API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }), // Send base64 encoded image
      });
  
      const predictionData = await response.json();
      console.log("Prediction:", predictionData); // Log prediction data in console
      setPrediction(predictionData);
      setModalVisible(true); // Show modal with prediction result
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
   <SafeAreaView style={styles.containerout}>
         <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

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
      <Text style={styles.modalText}>Prediction Result</Text>
      <Text style={styles.resultText}>Class: {prediction?.class}</Text>
      <Text style={styles.resultText}>Confidence: {prediction?.confidence}%</Text>
      <Text style={styles.modalText}>Details</Text>
      {prediction?.details && (
        <View>
          {Object.entries(prediction.details).map(([key, value], index) => (
            <View key={index} style={styles.detailContainer}>
              <Text style={styles.detailTitle}>{key}:</Text>
              <Text style={styles.detailText}>{value}</Text>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: '#2196F3' }}
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
    marginTop : 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
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
