import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';

interface AvatarProps {
  children: React.ReactNode; 
  imageUrl?: string; 
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ children, imageUrl, style }) => {
  return (
    <View style={[styles.avatar, style]}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.avatarImage} 
          onError={() => console.log(`Erro ao carregar imagem: ${imageUrl}`)}
        />
      ) : (
        <Text style={styles.avatarFallback}>
          {children}
        </Text>
      )}
    </View>
  );
};

export const AvatarFallback: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => (
    <Text style={[styles.avatarFallback, style]}>{children}</Text>
);

export const AvatarImage: React.FC<{ imageUrl: string; style?: ViewStyle }> = ({ imageUrl, style }) => (
    <Image 
        source={{ uri: imageUrl }} 
        style={[styles.avatarImage, style]} 
    />
);


const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24, 
    backgroundColor: '#ffedd5', 
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarFallback: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D55C15',
    textTransform: 'uppercase',
  }
});
