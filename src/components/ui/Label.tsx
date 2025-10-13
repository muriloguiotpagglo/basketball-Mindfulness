import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface LabelProps extends TextProps {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, style, ...props }) => {
  return <Text style={[styles.label, style]} {...props}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});
