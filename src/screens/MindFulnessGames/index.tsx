import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';

interface WebGameViewProps {
  gameUrl: string; 
  onClose: () => void; 
}

const WebGameView: React.FC<WebGameViewProps> = ({ gameUrl, onClose }) => {
  const LoadingIndicatorView = () => (
    <ActivityIndicator 
      color="#f97316" 
      size="large" 
      style={styles.loading}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: gameUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={LoadingIndicatorView}
      />
    </SafeAreaView>
  );
};



export default WebGameView;