import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import { Icon } from '../../components/ui/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { LineChart, BarChart, PieChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

const wellnessData = [
  { date: '1/12', wellbeing: 78, stress: 32, energy: 85, focus: 72 },
  { date: '2/12', wellbeing: 82, stress: 28, energy: 88, focus: 79 },
  { date: '3/12', wellbeing: 75, stress: 45, energy: 70, focus: 68 },
  { date: '4/12', wellbeing: 88, stress: 22, energy: 92, focus: 85 },
  { date: '5/12', wellbeing: 84, stress: 30, energy: 87, focus: 81 },
  { date: '6/12', wellbeing: 79, stress: 38, energy: 83, focus: 76 },
  { date: '7/12', wellbeing: 91, stress: 18, energy: 95, focus: 89 },
];

const sessionData = [
  { category: 'Respiração', sessions: 45, completion: 89 },
  { category: 'Meditação', sessions: 32, completion: 76 },
  { category: 'Visualização', sessions: 28, completion: 82 },
  { category: 'Relaxamento', sessions: 38, completion: 91 },
];

const playerPerformance = [
  { name: 'João Silva', improvement: 15, sessions: 28, streak: 7 },
  { name: 'Maria Santos', improvement: 8, sessions: 22, streak: 12 },
  { name: 'Pedro Lima', improvement: 22, sessions: 35, streak: 15 },
  { name: 'Ana Costa', improvement: -3, sessions: 15, streak: 3 },
  { name: 'Carlos Mendes', improvement: 12, sessions: 25, streak: 9 },
];

const moodDistribution = [
  { name: 'Excelente', value: 35, color: '#10b981', legendFontColor: '#10b981', legendFontSize: 14 },
  { name: 'Bom', value: 28, color: '#3b82f6', legendFontColor: '#3b82f6', legendFontSize: 14 },
  { name: 'Neutro', value: 20, color: '#D55C15', legendFontColor: '#D55C15', legendFontSize: 14 },
  { name: 'Ruim', value: 12, color: '#ef4444', legendFontColor: '#ef4444', legendFontSize: 14 },
  { name: 'Péssimo', value: 5, color: '#374151', legendFontColor: '#374151', legendFontSize: 14 },
];

function LineChartTrends() {
  const wellbeing = wellnessData.map(d => ({ value: d.wellbeing, label: d.date }));
  const energy = wellnessData.map(d => ({ value: d.energy, label: d.date }));
  const focus = wellnessData.map(d => ({ value: d.focus, label: d.date }));
  const stress = wellnessData.map(d => ({ value: d.stress, label: d.date }));
  return (
    <View style={styles.chartStyle}>
      <LineChart
        data={wellbeing}
        data2={energy}
        data3={focus}
        data4={stress}
        height={280}
        curved
        hideRules={false}
        showVerticalLines
        spacing={40}
        initialSpacing={20}
        yAxisColor={'#e5e7eb'}
        xAxisLabelTextStyle={{ color: '#6b7280' }}
        yAxisTextStyle={{ color: '#6b7280' }}
      />
    </View>
  );
}

function BarChartSessions() {
  const barData = sessionData.map(d => ({ value: d.sessions, label: d.category }));
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