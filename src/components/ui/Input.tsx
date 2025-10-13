import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  style?: object;
}

export const Input: React.FC<InputProps> = (props) => {
  return <TextInput style={[styles.input, props.style]} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937',
  },
});
