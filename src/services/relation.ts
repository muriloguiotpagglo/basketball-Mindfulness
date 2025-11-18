import { api } from "./api";

export interface AnalyticsData {
    bemEstarMedio: number;
    participacao: number;
    stressMedio: number;
    sessoesFeitas: number;

    bemEstarTrend: number;
    participacaoTrend: number;
    stressTrend: number;
    sessoesTrend: number;
}

export interface AnalyticsTrendData {
  date: string;     
  wellbeing: number;
  stress: number;
  energy: number;
  sono: number;
}

export interface AnalyticsSessionData {
  category: string;
  sessions: number;
  completion: number;
}

export interface AnalyticsPlayerData {
  name: string;
  improvement: number;
  sessions: number;
  streak: number;
}

export interface AnalyticsPieChartData {
  name: string;
  value: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export interface AnalyticsMoodData {
  pieData: AnalyticsPieChartData[];
  insights: {
    percentPositivo: number;
    percentNegativo: number;
  };
}

export async function getAnalyticsData(dias: number): Promise<AnalyticsData> {
  
  const res = await api.get('/review/data', {
    params: {
      dias: dias 
    }
  });

  return res.data;
}

export async function getAnalyticsTrendsData(dias: number): Promise<AnalyticsTrendData[]> {
  const res = await api.get('/review/trends', {
    params: { 
      dias: dias 
    }
  });

  return res.data;
}

export async function getAnalyticsSessionsData(dias: number): Promise<AnalyticsSessionData[]> {
  const res = await api.get('/review/sessions', { 
    params: { 
      dias: dias 
    }
  });
  return res.data;
}

export async function getAnalyticsPlayersData(dias: number): Promise<AnalyticsPlayerData[]> {
  const res = await api.get('/review/players', { 
    params: { 
      dias: dias 
    }
  });
  return res.data;
}

export async function getAnalyticsMoodData(dias: number): Promise<AnalyticsMoodData> {
  const res = await api.get('/review/mood', { 
    params: { 
      dias: dias 
    }
  });
  return res.data;
}