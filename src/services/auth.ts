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

// Cadastro de usuário
export async function register(user: {
  nome: string;
  email: string;
  senha: string;
  tipo: 'atleta' | 'tecnico';
}) {
  const payload = {
    ...user,
    email: user.email.trim().toLowerCase(),
  };
  const res = await api.post('/users', payload);
  return res.data;
}