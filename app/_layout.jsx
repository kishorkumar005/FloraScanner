import { Stack } from 'expo-router';
import { StyleSheet} from 'react-native';

export default function App() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' 
      options={{
        headerShown : false,
      }}
      ></Stack.Screen>  
      <Stack.Screen name='index' 
      options={{
        headerShown : false,
      }}
      ></Stack.Screen>    
      </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
