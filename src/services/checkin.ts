import { api } from './api';

export type CreateCheckinPayload = {
  data: string; // Data do check-in (uso para referência/busca)
  humorPre: number;
  energia: number;
  sono: number;
  stress: number;
  motivacao: number;
  condicaoFisica: number;
  satisfacaoPessoal: number;
  alimentacao: number;
  preocupacao: number;
};

export type UpdateCheckinPayload = {
    humorPos: number; 
    intensidadeTreino?: number;
    feedbackTreino?: string;
  }

export async function createPreCheckIn(payload: CreateCheckinPayload): Promise<{ id: number }> {
  const res = await api.post('/checkin', payload);
  return res.data?.data;
}

export async function updatePosCheckIn(checkinId: number, payload: UpdateCheckinPayload): Promise<any> {
  const res = await api.patch(`/checkin/checkout/${checkinId}`, payload); 
  return res.data?.data;
}

export async function listMyCheckIns() {
  const res = await api.get('/checkin/me');
  return res.data?.data ?? [];
}