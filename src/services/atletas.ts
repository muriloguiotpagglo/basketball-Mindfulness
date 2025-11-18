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

export async function getAnalyticsPlayerListData(): Promise<AnalyticsPlayerListData[]> {
  const res = await api.get('/review/player-list');
  return res.data;
}