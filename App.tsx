import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { MainScreen } from './src/screens/MainScreen/MainScreen'; 
import LoginScreen from './src/screens/Auth/LoginScreen';
import { getToken } from './src/services/auth';

export default function App() {
  const [checked, setChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getToken().then((token) => {
      setIsAuthenticated(!!token);
      setChecked(true);
    });
  }, []);

  if (!checked) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#f97316" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <MainScreen onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
