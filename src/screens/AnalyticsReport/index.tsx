import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  ActivityIndicator, // Para o loading
  Alert // Para erros de exportação
} from 'react-native';
import styles from './styles'; // Seu arquivo de estilos
import { Icon } from '../../components/ui/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';


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

// --- COMPONENTES DE GRÁFICO (Todas as Tabs agora são dinâmicas) ---

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
        data={barData}
        height={200}
        barWidth={28}
        spacing={30}
        initialSpacing={20}
        roundedTop
        hideRules={false}
        xAxisLabelTextStyle={{ color: '#6b7280' }}
        yAxisTextStyle={{ color: '#6b7280' }}
      />
    </View>
  );
}

function SessionCompletionList() {
  return (
    <View style={styles.completionListContainer}>
      {sessionData.map((item, index) => (
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

function PlayerPerformanceList() {
  return (
    <View style={styles.playerList}>
      {playerPerformance.map((player, index) => (
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

function PieChartMood() {
  const pieData = moodDistribution.map(m => ({ value: m.value, color: m.color }));
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

function MoodInsights() {
  return (
    <View style={styles.moodInsightsContainer}>
      <View style={[styles.moodInsightBox, styles.insightBoxGreen]}>
        <Text style={styles.insightTitleGreen}>Tendência Positiva</Text>
        <Text style={styles.insightTextGreen}>63% da equipe relatou humor positivo (Excelente/Bom) nos últimos 7 dias</Text>
      </View>
      <View style={[styles.moodInsightBox, styles.insightBoxYellow]}>
        <Text style={styles.insightTitleYellow}>Atenção Necessária</Text>
        <Text style={styles.insightTextYellow}>17% da equipe relatou humor negativo. Considere sessões adicionais de suporte</Text>
      </View>
      <View style={[styles.moodInsightBox, styles.insightBoxBlue]}>
        <Text style={styles.insightTitleBlue}>Recomendação</Text>
        <Text style={styles.insightTextBlue}>Manter foco em atividades de bem-estar e mindfulness</Text>
      </View>
    </View>
  );
}

export default function AnalyticsReports() {
  const dataLegend = {
    legend: ['Bem-estar', 'Energia', 'Foco', 'Stress'],
    colors: ['#D55C15', '#10b981', '#3b82f6', '#ef4444'],
  };

  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.contentPadding}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Relatórios e Análises</Text>
        <Text style={styles.subtitle}>Insights detalhados sobre o bem-estar da equipe</Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.selectTrigger}>
          <Text style={styles.selectText}>Últimos 30 dias</Text>
          <Icon name="chevron-down" size={16} color="#6b7280" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
        <Button title="Exportar" onPress={() => {}} iconName="download" variant="outline" style={{ width: 'auto', flexGrow: 0 }} />
      </View>

      <View style={styles.metricGrid}>
        <Card style={styles.metricCard}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Bem-estar Médio</Text>
              <Text style={styles.metricValue}>82%</Text>
            </View>
            <View style={styles.trendUp}>
              <Icon name="arrow-up-right" size={16} color="#10b981" style={{ marginRight: 4 }} />
              <Text style={styles.trendTextUp}>+5%</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.metricCard}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Participação</Text>
              <Text style={styles.metricValue}>89%</Text>
            </View>
            <View style={styles.trendUp}>
              <Icon name="arrow-up-right" size={16} color="#10b981" style={{ marginRight: 4 }} />
              <Text style={styles.trendTextUp}>+3%</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.metricCard}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Stress Médio</Text>
              <Text style={styles.metricValue}>29%</Text>
            </View>
            <View style={styles.trendDown}>
              <Icon name="arrow-up-right" size={16} color="#ef4444" style={{ marginRight: 4, transform: [{ rotate: '225deg' }] }} />
              <Text style={styles.trendTextDown}>-8%</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.metricCard}>
          <View style={styles.metricContent}>
            <View>
              <Text style={styles.metricLabel}>Sessões</Text>
              <Text style={styles.metricValue}>143</Text>
            </View>
            <View style={styles.trendUp}>
              <Icon name="arrow-up-right" size={16} color="#10b981" style={{ marginRight: 4 }} />
              <Text style={styles.trendTextUp}>+12</Text>
            </View>
          </View>
        </Card>
      </View>

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
              <LineChartTrends />
              <View style={styles.legendContainer}>
                {dataLegend.legend.map((name, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: dataLegend.colors[index] }]} />
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
                <BarChartSessions />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conclusão</CardTitle>
              </CardHeader>
              <CardContent>
                <SessionCompletionList />
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
              <PlayerPerformanceList />
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
                <PieChartMood />
              </CardContent>
            </Card>
            <Card style={{}}>
              <CardHeader>
                <CardTitle>Insights de Humor</CardTitle>
              </CardHeader>
              <CardContent>
                <MoodInsights />
              </CardContent>
            </Card>
          </View>
        </TabsContent>
      </Tabs>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}