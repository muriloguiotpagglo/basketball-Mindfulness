import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNSlider from '@react-native-community/slider';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  [key: string]: any;
  style?: any;
}

export const Slider: React.FC<SliderProps> = ({ 
    value, 
    onValueChange, 
    minimumValue = 0, 
    maximumValue = 100, 
    step = 1,
    minimumTrackTintColor = '#f97316',
    maximumTrackTintColor = '#d1d5db',
    ...props
}) => {
  return (
    <RNSlider
      style={styles.slider}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      value={value}
      onSlidingComplete={onValueChange}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 40,
  },
});
