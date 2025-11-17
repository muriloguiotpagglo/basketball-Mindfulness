import { api } from './api';

export type CreateCheckinPayload = {
  data: string;
  humorPre: number;
  humorPos: number;
  energia: number;
  sono: number;
  stress: number;
  motivacao: number;
  condicaoFisica: number;
  satisfacaoPessoal: number;
  alimentacao: number;
  preocupacao: number;
  intensidadeTreino?: number;
  feedbackTreino?: string;
};

export async function createCheckIn(payload: CreateCheckinPayload) {
  const res = await api.post('/checkin', payload);
  return res.data?.data;
}

export async function listMyCheckIns() {
  const res = await api.get('/checkin/me');
  return res.data?.data ?? [];
}