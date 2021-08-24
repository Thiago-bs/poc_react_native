import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Auth from './src/Auth'
import { AuthProvider } from './src/contexts/AuthContex';

export default function App() {
  const theme = "dark"
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <AuthProvider>
      <View style={styles.container}>
       <Auth onLogin={() =>{
          setIsLoggedIn(true)
        }}/>
      </View>
    </AuthProvider>

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
