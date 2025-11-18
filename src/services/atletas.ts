import { api } from "./api";

export interface AnalyticsPlayerListData {
  id: number;
  name: string;
  avatar: string | null;
  position: string;
  status: string;
  statusColor: string;
  metrics: {
    wellbeing: number;
    stress: number;
    sleep: number;
    focus: number;
  };
  lastCheckinDate: string | null;
  streak: number;
}

export interface CheckInData {
  id: number;
  data: string; 
  humorPre: number;
  stress: number;
  sono: number;
  foco: number;
  motivacao: number;
  energia: number;
  humorPos?: number;
  dataCheckOut?: string | null;
  usuarioId: number;
  condicaoFisica:number;
  alimentacao: number;
  satisfacaoPessoal: number;
  preocupacao: number;
  intensidadeTreino?: number;
}

export async function getAnalyticsPlayerListData(): Promise<AnalyticsPlayerListData[]> {
  const res = await api.get('/review/player-list');
  return res.data;
}

export async function getCheckinHistoryForUser(userId: number): Promise<CheckInData[]> {
  const res = await api.get(`/checkin/user/${userId}`);
  return res.data.data;
}

export async function getCheckinForUserAndDay(userId: number, date: string): Promise<CheckInData[]> {
  const res = await api.get(`/checkin/day/${userId}`, {
    params: { date }
  });
  return res.data;
}