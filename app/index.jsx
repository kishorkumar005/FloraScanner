import { View, Text, StyleSheet,  ImageBackground, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const IndexLayout = () => {
  const font = require("../assets/fonts/InknutAntiqua-ExtraBold.ttf");
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/images/splash.png")} resizeMode='contain' style={{
        width : "20em",
        height : "20em",
      }}>

      </Image>
      <View style={styles.content}>
          <Text style={styles.message} font = {font}>Welcome to Flora Scanner!</Text>
          <Link href="/upload" style={styles.link}>
            Click To Explore
          </Link>
        </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
    backgroundColor : "#69f662",
  },
  backgroundimg : {
    opacity : "10",
  },
  content: {
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: '#007bff',
    
  },
});

export default IndexLayout;
