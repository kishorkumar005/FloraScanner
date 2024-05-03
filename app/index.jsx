import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const IndexLayout = () => {
  return (
    <View>
      <Link href="/sign_in" >Go to Sign UP</Link>
    </View>
  )
}

export default IndexLayout