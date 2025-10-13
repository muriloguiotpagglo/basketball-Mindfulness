import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';

interface SwitchProps {
  onValueChange: (value: boolean) => void;
  value: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ onValueChange, value }) => {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: value ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => onValueChange(!value));
  };

  const trackColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e5e7eb', '#f97316'], 
  });

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26], 
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.container}>
      <Animated.View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX: thumbPosition }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 56,
  },
  track: {
    height: 32,
    width: 56,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    position: 'absolute',
    left: 0, 
  },
});
