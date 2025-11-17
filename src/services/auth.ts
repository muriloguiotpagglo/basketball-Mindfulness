import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';
import messaging from '@react-native-firebase/messaging'

export async function saveDeviceToken(userId: number) {
  try {
    await messaging().requestPermission();
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM token obtido!', fcmToken);
      await api.post('/users/save-token',{
        userId:userId,
        token:fcmToken,
      });
      console.log("Device token salvo com sucesso no backend");
    }
  } catch (error) {
    console.error("Erro ao salvar Device Token")
  }
}

export async function login(email: string, senha: string) {
  const res = await api.post('/login', { email, senha });
  const token: string = res.data?.token;
  if (token) {
    await AsyncStorage.setItem('token', token);

    const userId = res.data?.userId;
    if (userId) {
      await saveDeviceToken(userId);
    }
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

