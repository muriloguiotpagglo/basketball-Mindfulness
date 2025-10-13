import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';

interface WellnessDataPoint {
  date: string;
  wellbeing: number;
  stress: number;
  energy: number;
  focus: number;
}

interface SessionDataPoint {
  category: string;
  sessions: number;
  completion: number;
}

interface PlayerPerformanceData {
  name: string;
  improvement: number;
  sessions: number;
  streak: number;
}

interface MoodDistributionData {
  name: string;
  value: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const wellnessData: WellnessDataPoint[] = [
  { date: "1/12", wellbeing: 78, stress: 32, energy: 85, focus: 72 },
  { date: "2/12", wellbeing: 82, stress: 28, energy: 88, focus: 79 },
  { date: "3/12", wellbeing: 75, stress: 45, energy: 70, focus: 68 },
  { date: "4/12", wellbeing: 88, stress: 22, energy: 92, focus: 85 },
  { date: "5/12", wellbeing: 84, stress: 30, energy: 87, focus: 81 },
  { date: "6/12", wellbeing: 79, stress: 38, energy: 83, focus: 76 },
  { date: "7/12", wellbeing: 91, stress: 18, energy: 95, focus: 89 }
];

const sessionData: SessionDataPoint[] = [
  { category: "Respiração", sessions: 45, completion: 89 },
  { category: "Meditação", sessions: 32, completion: 76 },
  { category: "Visualização", sessions: 28, completion: 82 },
  { category: "Relaxamento", sessions: 38, completion: 91 }
];

const playerPerformance: PlayerPerformanceData[] = [
  { name: "João Silva", improvement: 15, sessions: 28, streak: 7 },
  { name: "Maria Santos", improvement: 8, sessions: 22, streak: 12 },
  { name: "Pedro Lima", improvement: 22, sessions: 35, streak: 15 },
  { name: "Ana Costa", improvement: -3, sessions: 15, streak: 3 },
  { name: "Carlos Mendes", improvement: 12, sessions: 25, streak: 9 }
];

const moodDistribution: MoodDistributionData[] = [
  { name: "Excelente", value: 35, color: "#10b981", legendFontColor: "#10b981", legendFontSize: 14 },
  { name: "Bom", value: 28, color: "#3b82f6", legendFontColor: "#3b82f6", legendFontSize: 14 },
  { name: "Neutro", value: 20, color: "#f59e0b", legendFontColor: "#f59e0b", legendFontSize: 14 },
  { name: "Ruim", value: 12, color: "#f97316", legendFontColor: "#f97316", legendFontSize: 14 },
  { name: "Péssimo", value: 5, color: "#ef4444", legendFontColor: "#ef4444", legendFontSize: 14 }
];


const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`, // Cor principal do eixo
  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`, 
  propsForDots: {
    r: "4",
    strokeWidth: "2",
  }
};


const LineChartTrends: React.FC = () => {
    const data = {
        labels: wellnessData.map(d => d.date),
        datasets: [
            { data: wellnessData.map(d => d.wellbeing), color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, name: "Bem-estar" }, // orange-600
            { data: wellnessData.map(d => d.energy), color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, name: "Energia" }, // emerald-500
            { data: wellnessData.map(d => d.focus), color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, name: "Foco" }, // blue-500
            { data: wellnessData.map(d => d.stress), color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, name: "Stress" }, // red-500
        ],
        legend: ["Bem-estar", "Energia", "Foco", "Stress"]
    };

    return (
        <LineChart
            data={data}
            width={screenWidth - 32} 
            height={280}
            chartConfig={{
                ...chartConfig,
                propsForBackground: {
                    borderRadius: 8
                }
            }}
            bezier
            style={styles.chartStyle}
        />
    );
};


// 2. Gráfico de Barras por Sessões
const BarChartSessions: React.FC = () => {
    const data = {
        labels: sessionData.map(d => d.category),
        datasets: [
            { data: sessionData.map(d => d.sessions) },
        ]
    };

    return (
        <BarChart
            data={data}
            width={(screenWidth - 48) / 2} // Meia tela menos padding
            height={200}
            chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, // Barras Laranja
            }}
            style={styles.chartStyle}
            fromZero={true}
            showValuesOnTopOfBars={true}
        />
    );
};


// 
const SessionCompletionList: React.FC = () => (
    <View style={styles.completionListContainer}>
        {sessionData.map((item, index) => (
            <View key={index} style={styles.completionItem}>
                <Text style={styles.completionCategory}>{item.category}</Text>
                <View style={styles.completionProgressWrapper}>
                    <View style={styles.progressBarBackground}>
                        <View 
                            style={[
                                styles.progressBarFill, 
                                { width: `${item.completion}%` }
                            ]}
                        />
                    </View>
                    <Text style={styles.completionPercentage}>{item.completion}%</Text>
                </View>
            </View>
        ))}
    </View>
);


const PlayerPerformanceList: React.FC = () => (
    <View style={styles.playerList}>
        {playerPerformance.map((player, index) => (
            <View key={index} style={styles.playerItem}>
                <View style={styles.playerInfo}>
                    <View style={styles.playerIconBg}>
                        <Icon name="users" size={20} color="#f97316" />
                    </View>
                    <View>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <Text style={styles.playerSessions}>{player.sessions} sessões concluídas</Text>
                    </View>
                </View>
                <View style={styles.playerStats}>
                    <Badge 
                        variant="default" 
                        color={player.improvement >= 0 ? '#10b981' : '#ef4444'} // green-500 ou red-500
                    >
                        {player.improvement >= 0 ? "+" : ""}{player.improvement}%
                    </Badge>
                    <View style={styles.playerStreak}>
                        <Icon name="target" size={16} color="#6b7280" />
                        <Text style={styles.playerStreakText}>{player.streak} dias</Text>
                    </View>
                </View>
            </View>
        ))}
    </View>
);


const PieChartMood: React.FC = () => (
    <View style={styles.pieChartWrapper}>
        <PieChart
            data={moodDistribution}
            width={(screenWidth - 32) / 2} 
            height={200}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
        />
    </View>
);


const MoodInsights: React.FC = () => (
    <View style={styles.moodInsightsContainer}>
        <View style={[styles.moodInsightBox, styles.insightBoxGreen]}>
            <Text style={styles.insightTitleGreen}>Tendência Positiva</Text>
            <Text style={styles.insightTextGreen}>
                63% da equipe relatou humor positivo (Excelente/Bom) nos últimos 7 dias
            </Text>
        </View>
        <View style={[styles.moodInsightBox, styles.insightBoxYellow]}>
            <Text style={styles.insightTitleYellow}>Atenção Necessária</Text>
            <Text style={styles.insightTextYellow}>
                17% da equipe relatou humor negativo. Considere sessões adicionais de suporte
            </Text>
        </View>
        <View style={[styles.moodInsightBox, styles.insightBoxBlue]}>
            <Text style={styles.insightTitleBlue}>Recomendação</Text>
            <Text style={styles.insightTextBlue}>
                Manter foco em atividades de bem-estar e mindfulness
            </Text>
        </View>
    </View>
);


export function AnalyticsReports() {
  const [activeTab, setActiveTab] = useState("trends");

  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.contentPadding}>
      
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Relatórios e Análises</Text>
        <Text style={styles.subtitle}>Insights detalhados sobre o bem-estar da equipe</Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.selectTrigger}>
            <Text style={styles.selectText}>Últimos 30 dias</Text>
            <Icon name="chevron-down" size={16} color="#6b7280" />
        </TouchableOpacity>
        <Button 
            title="Exportar" 
            onPress={() => console.log('Exportar')} 
            iconName="download" 
            variant="outline"
            style={{ width: 'auto', flexGrow: 0 }}
        />
      </View>

      <View style={styles.metricGrid}>
        <Card style={styles.metricCard}>
            <View style={styles.metricContent}>
                <View>
                    <Text style={styles.metricLabel}>Bem-estar Médio</Text>
                    <Text style={styles.metricValue}>82%</Text>
                </View>
                <View style={styles.trendUp}>
                    <Icon name="trending-up" size={16} color="#10b981" style={{ marginRight: 4 }} />
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
                    <Icon name="trending-up" size={16} color="#10b981" style={{ marginRight: 4 }} />
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
                    <Icon name="trending-down" size={16} color="#ef4444" style={{ marginRight: 4 }} />
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
                    <Icon name="trending-up" size={16} color="#10b981" style={{ marginRight: 4 }} />
                    <Text style={styles.trendTextUp}>+12</Text>
                </View>
            </View>
        </Card>
      </View>

      {/* Tabs */}
      <Tabs defaultValue="trends" style={styles.tabsWrapper}>
        <TabsList style={styles.tabsListStyle}>
            <TabsTrigger value="trends" icon={<Icon name="zap" size={16} />}><Text style={{fontSize: 12}}>Tendências</Text></TabsTrigger>
            <TabsTrigger value="sessions" icon={<Icon name="bar-chart-2" size={16} />}><Text style={{fontSize: 12}}>Sessões</Text></TabsTrigger>
            <TabsTrigger value="players" icon={<Icon name="users" size={16} />}><Text style={{fontSize: 12}}>Individual</Text></TabsTrigger>
            <TabsTrigger value="mood" icon={<Icon name="smile" size={16} />}><Text style={{fontSize: 12}}>Ânimo</Text></TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends">
            <Card>
                <CardHeader>
                    <CardTitle>Evolução do Bem-estar da Equipe</CardTitle>
                </CardHeader>
                <CardContent style={{ paddingHorizontal: 0 }}>
                    <LineChartTrends />
                    <View style={styles.legendContainer}>
                        {data.legend.map((name, index) => (
                            <View key={index} style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: data.datasets[index].color(1) }]} />
                                <Text style={styles.legendText}>{name}</Text>
                            </View>
                        ))}
                    </View>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="sessions">
            <View style={styles.sessionsGrid}>
                <Card style={styles.halfCard}>
                    <CardHeader>
                        <CardTitle>Sessões por Categoria</CardTitle>
                    </CardHeader>
                    <CardContent style={{paddingHorizontal: 0}}>
                        <BarChartSessions />
                    </CardContent>
                </Card>
                <Card style={styles.halfCard}>
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
                <Card style={styles.halfCard}>
                    <CardHeader>
                        <CardTitle>Distribuição de Humor</CardTitle>
                    </CardHeader>
                    <CardContent style={{paddingHorizontal: 0}}>
                        <PieChartMood />
                    </CardContent>
                </Card>
                <Card style={styles.halfCard}>
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


const data = {
    labels: wellnessData.map(d => d.date),
    datasets: [
        { data: wellnessData.map(d => d.wellbeing), color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, name: "Bem-estar" },
        { data: wellnessData.map(d => d.energy), color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`, name: "Energia" },
        { data: wellnessData.map(d => d.focus), color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, name: "Foco" },
        { data: wellnessData.map(d => d.stress), color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, name: "Stress" },
    ],
    legend: ["Bem-estar", "Energia", "Foco", "Stress"]
};

