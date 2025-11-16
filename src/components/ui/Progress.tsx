import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ProgressProps {
  value: number; 
  style?: any;
}

export const Progress: React.FC<ProgressProps> = ({ value, style }) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <View style={[styles.progressBarBackground, style]}>
      <View style={[styles.progressBarFill, { width: `${clampedValue}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#D55C15',
    borderRadius: 4,
  },
});
