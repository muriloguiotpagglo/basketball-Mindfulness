import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export async function login(email: string, senha: string) {
  const res = await api.post('/login', { email, senha });
  const token: string = res.data?.token;
  if (token) {
    await AsyncStorage.setItem('token', token);
  }
  return { token };
}

export async function logout() {
  await AsyncStorage.removeItem('token');
}

export async function getToken() {
  return AsyncStorage.getItem('token');
}