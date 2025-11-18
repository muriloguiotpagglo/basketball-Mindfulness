import { api } from "./api";

export interface DashBoardData {
    totalAtletas: number;
    comparacaoMesPassado: number;

    bemEstarMedio: number;

    sessoesHoje: number;
    porcentagemSessoes: number;

    stressMedio: number;

    atividadesRecentes: {
        nome: string,
        status: string
    }[]
}

export async function getData(): Promise< DashBoardData> {
  const res = await api.get('/users/dashboard');
  return res.data?.data;
}