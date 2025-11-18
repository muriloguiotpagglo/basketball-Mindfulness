import { api } from "./api";

// Tipagem baseada no seu Prisma Model (Mindfulness)
export interface MindfulnessPractice {
  id: number;
  titulo: string;
  tipo: string;       
  duracao: number;    
  descricao: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  nivel: string;      
  imageUrl: string | null;
  category: string;
  participants: number;
  createdAt?: string;
}

// Tipagem para o histórico do usuário
export interface MindfulnessHistory {
  id: number;
  usuarioId: number;
  mindfulnessId: number;
  dataRealizada: string;
  duracaoReal: number;
  pontuacao: number | null;
  feedback: string | null;
  mindfulness?: MindfulnessPractice;
}

export interface DashboardStats {
  streak: number;
  totalSessions: number;
  totalTimeMinutes: number;
  completionRate: number;
}

// DTO para criar uma nova sessão (Igual ao seu Backend)
export interface CreateSessionDTO {
  mindfulnessId: number;
  dataRealizada: string; // ISO String
  duracaoReal: number;
  feedback?: string;
  pontuacao?: number;
}

/**
 * Busca todas as práticas disponíveis (Público)
 * GET /mindfulness/practices
 */
export async function listPractices(): Promise<MindfulnessPractice[]> {
  try {
    const res = await api.get('/mindfulness/practices');
    // O controller retorna { message: string, data: [...] }
    return res.data.data; 
  } catch (error) {
    console.error("Erro ao buscar práticas:", error);
    throw error;
  }
}

/**
 * Busca o histórico do usuário logado para calcular estatísticas
 * GET /mindfulness/my-practices
 */
export async function getMyMindfulnessHistory(): Promise<MindfulnessHistory[]> {
  try {
    const res = await api.get('/mindfulness/my-practices');
    return res.data.data;
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    return [];
  }
}

/**
 * Registra uma nova sessão de mindfulness para o usuário
 * POST /mindfulness/my-practices
 */
export async function registerMindfulnessSession(data: CreateSessionDTO): Promise<any> {
  try {
    const res = await api.post('/mindfulness/my-practices', data);
    return res.data;
  } catch (error) {
    console.error("Erro ao registrar sessão:", error);
    throw error;
  }
}

/**
 * Função auxiliar (frontend) para calcular estatísticas baseadas no histórico
 */
export function calculateMindfulnessStats(history: MindfulnessHistory[]): DashboardStats {
  if (!history || history.length === 0) {
    return { streak: 0, totalSessions: 0, totalTimeMinutes: 0, completionRate: 0 };
  }

  // 1. Calcular Total de Sessões e Tempo
  const totalSessions = history.length;
  const totalTimeMinutes = history.reduce((acc, curr) => acc + (curr.duracaoReal || 0), 0);

  // 2. Calcular Streak (Dias Consecutivos)
  const sortedDates = history
    .map(h => new Date(h.dataRealizada).toISOString().split('T')[0]) // Pegar apenas YYYY-MM-DD
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const uniqueDates = [...new Set(sortedDates)];

  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Se treinou hoje ou ontem, começa a contar
  if (uniqueDates.length > 0 && (uniqueDates[0] === today || uniqueDates[0] === yesterday)) {
    streak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const current = new Date(uniqueDates[i]);
      const previous = new Date(uniqueDates[i+1]);
      
      const diffTime = Math.abs(current.getTime() - previous.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays === 1) {
        streak++;
      } else {
        break; // Quebrou a sequência
      }
    }
  }

  return {
    streak,
    totalSessions,
    totalTimeMinutes,
    completionRate: 89, // Exemplo fixo
  };
}