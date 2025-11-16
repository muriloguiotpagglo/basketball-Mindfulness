import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View } from "react-native";
import { Icon } from "./Icon";

interface ButtonProps {
  title: string;
  onPress: () => void;
  iconName?: string; 
  variant?: 'default' | 'outline' | 'destructive';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  iconName, 
  variant = 'default', 
  disabled = false,
  style,
  textStyle
}) => {
  const isOutline = variant === 'outline';
  const isDestructive = variant === 'destructive';

  const backgroundColor = isDestructive ? '#ef4444' : isOutline ? 'transparent' : '#D55C15';
  const borderColor = isDestructive ? '#ef4444' : isOutline ? '#D55C15' : '#D55C15';
  const textColor = isOutline ? '#D55C15' : '#fff';

  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { backgroundColor, borderColor },
        isOutline && styles.buttonOutline,
        isDestructive && styles.buttonDestructive,
        disabled && styles.buttonDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.contentRow}>
        {iconName && (
          <Icon name={iconName} size={18} color={textColor} style={{ marginRight: 8 }} />
        )}
        <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 48,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
  },
  buttonDestructive: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
