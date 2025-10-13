import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  color?: string; 
  style?: any;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  color = '#f97316',
  style 
}) => {
  const isOutline = variant === 'outline';
  
  const badgeStyle = [
    styles.badge,
    isOutline ? styles.badgeOutline : { backgroundColor: color },
    style
  ];

  const textStyle = [
    styles.badgeText,
    isOutline ? { color } : styles.badgeTextDefault
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  badgeOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  badgeTextDefault: {
    color: '#fff',
  }
});
