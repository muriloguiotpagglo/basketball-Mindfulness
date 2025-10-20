import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MainScreen } from './src/screens/MainScreen/MainScreen'; 

export default function App() {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
