import axios, { AxiosHeaders } from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3002' : 'http://localhost:3002';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    return config;
  }

  const headers =
    config.headers instanceof AxiosHeaders
      ? config.headers
      : new AxiosHeaders(config.headers as any);

  headers.set('Authorization', `Bearer ${token}`);
  config.headers = headers;

  return config;
});