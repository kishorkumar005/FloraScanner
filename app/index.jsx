import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const IndexLayout = () => {
  return (
    <SafeAreaView>
      <View>
      <Link href="/sign_in" 
      className='flex-1 items-center justify-center'
      >Go to Sign UP</Link>
    </View>
    </SafeAreaView>
  )
}

export default IndexLayout