import { api } from './api';

export type MindfulnessPractice = {
  id: number;
  titulo: string;
  tipo: 'respiracao' | 'foco' | 'meditacao';
  duracao: number;
  descricao?: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  imageUrl?: string;
  category?: string;
  participants?: number;
};

export type CreateUsuarioMindfulnessDto = {
  mindfulnessId: number;
  dataRealizada: string;
  duracaoReal?: number;
  feedback?: string;
  pontuacao?: number;
};

export async function listPractices(): Promise<MindfulnessPractice[]> {
  const res = await api.get('/mindfulness/practices');
  return res.data?.data ?? [];
}

export async function createMyPractice(dto: CreateUsuarioMindfulnessDto) {
  const res = await api.post('/mindfulness/my-practices', dto);
  return res.data?.data;
}