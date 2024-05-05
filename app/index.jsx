import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'




const IndexLayout = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Call fetchMessage function when the component mounts
    fetchMessage();
  }, []); // Empty dependency array to ensure this effect runs only once

  const fetchMessage = async () => {
    try {
      const response = await fetch('https://florascannerapi.onrender.com');
      const data = await response.json();
      console.log("Response : ",response);
      console.log("Data : ",data);
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <SafeAreaView>
      <View>
        <Text>{message}</Text>
      <Link href="/upload" 
      className='flex-1 items-center justify-center'
      >Go to Sign UP</Link>
    </View>
    </SafeAreaView>
  )
}

export default IndexLayout