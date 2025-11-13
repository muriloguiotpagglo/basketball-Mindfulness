import React from 'react';
import { Image, ImageStyle } from 'react-native';

type Props = {
  size?: number;
  style?: ImageStyle | ImageStyle[];
};

export const AppLogo: React.FC<Props> = ({ size = 24, style }) => {
  return (
    <Image
      source={require('../../assets/logo.png')}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
};
