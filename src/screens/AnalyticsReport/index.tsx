import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import styles from './styles'; // Seu arquivo de estilos
import { Icon } from '../../components/ui/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';

// --- IMPORTAÇÃO DA AUTH (NOVO) ---
import { getCurrentUser } from '../../services/auth';

// Importa as funções e interfaces do seu serviço
import { 
  AnalyticsData, 
  getAnalyticsData,
  AnalyticsTrendData,
  getAnalyticsTrendsData,
  AnalyticsSessionData,
  getAnalyticsSessionsData,
  AnalyticsPlayerData,
  getAnalyticsPlayersData,
  AnalyticsMoodData,
  AnalyticsPieChartData,
  getAnalyticsMoodData
} from '../../services/relation'; 

const screenWidth = Dimensions.get('window').width;

// --- COMPONENTES DE GRÁFICO (MANTIDOS IGUAIS) ---

function LineChartTrends({ data }: { data?: AnalyticsTrendData[] }) {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.chartStyle, { height: 280, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#D55C15" />
      </View>
    );
  }
  const wellbeing = data.map(d => ({ value: d.wellbeing, label: d.date }));
  const energy = data.map(d => ({ value: d.energy, label: d.date }));
  const focus = data.map(d => ({ value: d.sono, label: d.date }));
  const stress = data.map(d => ({ value: d.stress, label: d.date }));

  return (
    <View style={styles.chartStyle}>
      <LineChart
        data={wellbeing} data2={energy} data3={focus} data4={stress}
        color1="#D55C15" color2="#10b981" color3="#3b82f6" color4="#ef4444"
        height={280} curved hideRules={false} showVerticalLines
        spacing={40} initialSpacing={20}
        yAxisColor={'#e5e7eb'}
        xAxisLabelTextStyle={{ color: '#6b7280' }}
        yAxisTextStyle={{ color: '#6b7280' }}
      />
    </View>
  );
}

function BarChartSessions({ data }: { data?: AnalyticsSessionData[] }) {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.chartStyle, { height: 200, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#6b7280' }}>Nenhuma sessão encontrada.</Text>
      </View>
    );
  }
  const barData = data.map(d => ({ value: d.sessions, label: d.category }));
  return (
    <View style={styles.chartStyle}>
      <BarChart
        data={barData} height={200} barWidth={28} spacing={30} initialSpacing={20}
        roundedTop hideRules={false}
        xAxisLabelTextStyle={{ color: '#6b7280' }}
        yAxisTextStyle={{ color: '#6b7280' }}
      />
    </View>
  );
}

function SessionCompletionList({ data }: { data?: AnalyticsSessionData[] }) {
  if (!data || data.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
        <Text style={{ color: '#6b7280' }}>Nenhum dado de conclusão.</Text>
      </View>
    );
  }
  return (
    <View style={styles.completionListContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.completionItem}>
          <Text style={styles.completionCategory} numberOfLines={2} ellipsizeMode="tail">
            {item.category}
          </Text>
          <View style={styles.completionProgressWrapper}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${item.completion}%` }]} />
            </View>
            <Text style={styles.completionPercentage}>{item.completion}%</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function PlayerPerformanceList({ data }: { data?: AnalyticsPlayerData[] }) {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.playerList, { justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }]}>
        <Text style={{ color: '#6b7280' }}>Nenhum dado de atleta encontrado.</Text>
      </View>
    );
  }
  return (
    <View style={styles.playerList}>
      {data.map((player, index) => (
        <View key={index} style={styles.playerItem}>
          <View style={styles.playerInfo}>
            <View style={styles.playerIconBg}>
              <Icon name="users" size={20} color="#D55C15" />
            </View>
            <View>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerSessions}>{player.sessions} sessões concluídas</Text>
            </View>
          </View>
          <View style={styles.playerStats}>
            <Badge variant="default" color={player.improvement >= 0 ? '#10b981' : '#ef4444'}>
              {player.improvement >= 0 ? '+' : ''}{player.improvement}%
            </Badge>
            <View style={styles.playerStreak}>
              <Icon name="target" size={16} color="#6b7280" style={{ marginRight: 4 }} />
              <Text style={styles.playerStreakText}>{player.streak} dias</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function PieChartMood({ data }: { data?: AnalyticsPieChartData[] }) {
  if (!data || data.length === 0) {
    return (
      <View style={[styles.pieChartWrapper, { height: 200, justifyContent: 'center' }]}>
        <Text style={{ color: '#6b7280' }}>Nenhum dado de humor.</Text>
      </View>
    );
  }
  const pieData = data.map(d => ({ value: d.value, color: d.color }));
  return (
    <View style={styles.pieChartWrapper}>
      <PieChart
        data={pieData}
        radius={90}
        innerRadius={50}
        donut
        showText
        textColor={'#1f2937'}
      />
    </View>
  );
}

function MoodInsights({ data }: { data?: { percentPositivo: number, percentNegativo: number } }) {
  if (!data) {
     return (
      <View style={[styles.moodInsightsContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#6b7280' }}>Calculando insights...</Text>
      </View>
    );
  }
  return (
    <View style={styles.moodInsightsContainer}>
      <View style={[styles.moodInsightBox, styles.insightBoxGreen]}>
        <Text style={styles.insightTitleGreen}>Tendência Positiva</Text>
        <Text style={styles.insightTextGreen}>
          {data.percentPositivo}% da equipe relatou humor positivo (Excelente/Bom) no período.
        </Text>
      </View>
      <View style={[styles.moodInsightBox, styles.insightBoxYellow]}>
        <Text style={styles.insightTitleYellow}>Atenção Necessária</Text>
        <Text style={styles.insightTextYellow}>
          {data.percentNegativo}% da equipe relatou humor negativo. Considere sessões de suporte.
        </Text>
      </View>
      <View style={[styles.moodInsightBox, styles.insightBoxBlue]}>
        <Text style={styles.insightTitleBlue}>Recomendação</Text>
        <Text style={styles.insightTextBlue}>Manter foco em atividades de bem-estar e mindfulness.</Text>
      </View>
    </View>
  );
}

const TrendIndicator = ({ value, invert = false }: { value: number | undefined | null, invert?: boolean }) => {
  if (!value || value === 0) {
    return null;
  }
  const isPositive = invert ? (value < 0) : (value > 0);
  const color = isPositive ? '#10b981' : '#ef4444';
  const iconName = 'arrow-up-right';
  const textStyle = isPositive ? styles.trendTextUp : styles.trendTextDown;
  const iconStyle = {
    marginRight: 4,
    transform: isPositive ? [] : [{ rotate: '180deg' }]
  };
  return (
    <View style={isPositive ? styles.trendUp : styles.trendDown}>
      <Icon name={iconName} size={16} color={color} style={iconStyle} /> 
      <Text style={textStyle}>
        {value > 0 ? '+' : ''}{value}%
      </Text>
    </View>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function AnalyticsReports() {
  
  // Estados para os dados da API
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [trendsData, setTrendsData] = useState<AnalyticsTrendData[]>([]);
  const [sessionsData, setSessionsData] = useState<AnalyticsSessionData[]>([]);
  const [playersData, setPlayersData] = useState<AnalyticsPlayerData[]>([]);
  const [moodData, setMoodData] = useState<AnalyticsMoodData | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [periodo, setPeriodo] = useState(30); 

  // --- ESTADOS DE PERMISSÃO (NOVO) ---
  const [verificandoPermissao, setVerificandoPermissao] = useState(true);
  const [acessoPermitido, setAcessoPermitido] = useState(false);

  // Função para buscar TODOS os dados
  const fetchData = async (dias: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const [
        mainData, 
        trendsResult, 
        sessionsResult, 
        playersResult,
        moodResult
      ] = await Promise.all([
        getAnalyticsData(dias),
        getAnalyticsTrendsData(dias),
        getAnalyticsSessionsData(dias),
        getAnalyticsPlayersData(dias),
        getAnalyticsMoodData(dias)
      ]);
      
      setData(mainData);
      setTrendsData(trendsResult);
      setSessionsData(sessionsResult);
      setPlayersData(playersResult);
      setMoodData(moodResult);

    } catch (err: any) {
      console.error("Erro ao buscar dados de analytics:", err);
      setError(err.message || "Não foi possível carregar os relatórios.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- EFFECT 1: VERIFICAÇÃO DE USUÁRIO E PERMISSÃO ---
  useEffect(() => {
    const verificarUsuario = async () => {
      setVerificandoPermissao(true);
      try {
        const user = await getCurrentUser();
        // Verifica se existe e é tecnico
        if (user && user.tipo === 'tecnico') {
          setAcessoPermitido(true);
        } else {
          setAcessoPermitido(false);
        }
      } catch (error) {
        console.error("Erro ao verificar permissão", error);
        setAcessoPermitido(false);
      } finally {
        setVerificandoPermissao(false);
      }
    };

    verificarUsuario();
  }, []);

  // --- EFFECT 2: BUSCA DADOS (Só se permitido) ---
  useEffect(() => {
    if (acessoPermitido) {
      fetchData(periodo);
    }
  }, [periodo, acessoPermitido]); 

  // Legenda dinâmica
  const dynamicLegend = {
     legend: ['Bem-estar', 'Energia', 'Foco (Sono)', 'Stress'], 
     colors: ['#D55C15', '#10b981', '#3b82f6', '#ef4444'], 
  };

  const getPeriodoTexto = () => {
    if (periodo === 30) return 'Últimos 30 dias';
    if (periodo === 15) return 'Últimos 15 dias';
    if (periodo === 5) return 'Últimos 5 dias';
    return `Últimos ${periodo} dias`;
  };

  // --- RENDERIZAÇÃO CONDICIONAL DE BLOQUEIO ---

  // 1. Carregando Permissão
  if (verificandoPermissao) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' }}>
        <ActivityIndicator size="large" color="#D55C15" />
      </View>
    );
  }

  // 2. Acesso Negado (Não é técnico)
  if (!acessoPermitido) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb', padding: 20 }}>
        <Icon name="lock" size={64} color="#9ca3af" />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937', marginTop: 20, textAlign: 'center' }}>
          Acesso Restrito
        </Text>
        <Text style={{ marginTop: 10, color: '#6b7280', textAlign: 'center', paddingHorizontal: 20 }}>
          Esta área de relatórios é exclusiva para a comissão técnica.
        </Text>
      </View>
    );
  }

  // --- RENDERIZAÇÃO NORMAL (Se for técnico) ---

  if (isLoading && !data) { 
    return (
      <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#D55C15" />
        <Text style={{ marginTop: 10, color: '#6b7280' }}>Carregando relatórios...</Text>
      </View>
    );
  }

  if (error) {
     return (
      <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Icon name="alert-triangle" size={40} color="#ef4444" />
        <Text style={{ marginTop: 10, color: '#ef4444', fontSize: 16, textAlign: 'center' }}>
          Ocorreu um erro
        </Text>
         <Text style={{ marginTop: 5, color: '#6b7280', textAlign: 'center' }}>
          {error}
        </Text>
        <Button 
          title="Tentar Novamente" 
          onPress={() => fetchData(periodo)} 
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.contentPadding}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Relatórios e Análises</Text>
        <Text style={styles.subtitle}>Insights detalhados sobre o bem-estar da equipe</Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity 
          style={styles.selectTrigger} 
          onPress={() => {
            if (periodo === 30) setPeriodo(15);
            else if (periodo === 15) setPeriodo(5);
            else setPeriodo(30);
          }}
          disabled={isLoading}
        >
          <Text style={styles.selectText}>{getPeriodoTexto()}</Text>
          {isLoading ? (
             <ActivityIndicator size="small" color="#6b7280" style={{ marginLeft: 4 }} />
          ) : (
             <Icon name="chevron-down" size={16} color="#6b7280" style={{ marginLeft: 4 }} />
          )}
        </TouchableOpacity>
        <Button title="Exportar" onPress={() => {}} iconName="download" variant="outline" style={{ width: 'auto', flexGrow: 0 }} />
      </View>

      {/* --- CARDS DE MÉTRICAS --- */}
      <View style={styles.metricGrid}>
        <Card style={styles.metricCard}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Bem-estar Médio</Text>
              <Text style={styles.metricValue}>{data?.bemEstarMedio ?? 0}%</Text>
            </View>
            <TrendIndicator value={data?.bemEstarTrend} />
          </View>
        </Card>
        <Card style={styles.metricCard}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Participação</Text>
              <Text style={styles.metricValue}>{data?.participacao ?? 0}%</Text>
            </View>
            <TrendIndicator value={data?.participacaoTrend} />
          </View>
        </Card>
        <Card style={styles.metricCard}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Stress Médio</Text>
              <Text style={styles.metricValue}>{data?.stressMedio ?? 0}%</Text>
            </View>
            <TrendIndicator value={data?.stressTrend} invert={true} />
          </View>
        </Card>
        <Card style={styles.metricCard}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Sessões</Text>
              <Text style={styles.metricValue}>{data?.sessoesFeitas ?? 0}</Text>
            </View>
            <TrendIndicator value={data?.sessoesTrend} />
          </View>
        </Card>
      </View>
      
      {/* --- TABS --- */}
      <Tabs defaultValue="trends" style={styles.tabsWrapper}>
        <TabsList style={styles.tabsListStyle}>
          <TabsTrigger value="trends"><Text style={{ fontSize: 12 }}>Tendências</Text></TabsTrigger>
          <TabsTrigger value="sessions"><Text style={{ fontSize: 12 }}>Sessões</Text></TabsTrigger>
          <TabsTrigger value="players"><Text style={{ fontSize: 12 }}>Desempenho Individual</Text></TabsTrigger>
          <TabsTrigger value="mood"><Text style={{ fontSize: 12 }}>Estado de Ânimo</Text></TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Bem-estar da Equipe</CardTitle>
            </CardHeader>
            <CardContent style={{ paddingHorizontal: 0 }}>
              <LineChartTrends data={trendsData} />
              <View style={styles.legendContainer}>
                {dynamicLegend.legend.map((name, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: dynamicLegend.colors[index] }]} />
                    <Text style={styles.legendText}>{name}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <View style={styles.sessionsGrid}>
            <Card>
              <CardHeader>
                <CardTitle>Sessões por Categoria</CardTitle>
              </CardHeader>
              <CardContent style={{ paddingHorizontal: 0 }}>
                <BarChartSessions data={sessionsData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conclusão</CardTitle>
              </CardHeader>
              <CardContent>
                <SessionCompletionList data={sessionsData} />
              </CardContent>
            </Card>
          </View>
        </TabsContent>

        <TabsContent value="players">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho Individual dos Atletas</CardTitle>
            </CardHeader>
            <CardContent>
              <PlayerPerformanceList data={playersData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood">
          <View style={styles.sessionsGrid}>
            <Card style={{}}>
              <CardHeader>
                <CardTitle>Distribuição de Humor</CardTitle>
              </CardHeader>
              <CardContent style={{ paddingHorizontal: 0 }}>
                <PieChartMood data={moodData?.pieData} />
                <View style={[styles.legendContainer, { justifyContent: 'center', paddingBottom: 16, paddingTop: 8 }]}>
                  {moodData?.pieData.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                      <Text style={styles.legendText}>{item.name}</Text>
                    </View>
                  ))}
                </View>
              </CardContent>
            </Card>
            <Card style={{}}>
              <CardHeader>
                <CardTitle>Insights de Humor</CardTitle>
              </CardHeader>
              <CardContent>
                <MoodInsights data={moodData?.insights} />
              </CardContent>
            </Card>
          </View>
        </TabsContent>
      </Tabs>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}