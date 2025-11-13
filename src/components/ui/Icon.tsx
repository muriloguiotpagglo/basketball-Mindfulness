import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ICONS } from '../../icons/map';

type Props = {
  name: string;
  size?: number;
  color?: string;
  style?: any;
};

export const Icon: React.FC<Props> = ({ name, size = 20, color = '#000', style }) => {
  const descriptor = ICONS[name] ?? { family: 'Feather', name: 'help-circle' };
  if (descriptor.family === 'Feather') {
    return <Feather name={descriptor.name} size={size} color={color} style={style} />;
  }
  if (descriptor.family === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons name={descriptor.name} size={size} color={color} style={style} />;
  }
  return <Ionicons name={descriptor.name as any} size={size} color={color} style={style} />;
};
