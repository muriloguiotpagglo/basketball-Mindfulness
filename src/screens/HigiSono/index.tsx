import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Icon } from '../../components/ui/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import styles from './style';

// --- Dados para o Card "Por que o sono é importante?" ---
const whySleepData = [
  {
    title: 'Recuperação Muscular',
    text: 'O sono profundo é quando ocorre a maior parte da recuperação e crescimento muscular.',
    icon: 'dumbbell',
    color: '#3b82f6', // Azul
  },
  {
    title: 'Função Cognitiva',
    text: 'Melhora a tomada de decisões, tempo de reação e coordenação motora.',
    icon: 'brain',
    color: '#3b82f6', // Azul
  },
  {
    title: 'Sistema Imunológico',
    text: 'Fortalece as defesas do corpo contra lesões e doenças.',
    icon: 'wind',
    color: '#3b82f6', // Azul
  },
];

// --- Dados para as Dicas (6 categorias) ---
const tipsCategories = [
  {
    category: 'Rotina',
    icon: 'clock',
    color: '#3b82f6', // Azul
    bgColor: '#eff6ff', // Azul claro
    tips: [
      { title: 'Horário Regular', priority: 'Alta', text: 'Mantenha horários consistentes para dormir e acordar, mesmo nos fins de semana. Isso ajuda a regular o relógio biológico.' },
      { title: 'Ritual de Relaxamento', priority: 'Alta', text: 'Crie uma rotina de 30-60 minutos antes de dormir com atividades relaxantes como leitura ou alongamentos suaves.' },
    ]
  },
  {
    category: 'Ambiente',
    icon: 'bed-double',
    color: '#8b5cf6', // Roxo
    bgColor: '#f5f3ff', // Roxo claro
    tips: [
      { title: 'Temperatura Ideal', priority: 'Alta', text: 'Mantenha o quarto entre 18-22°C. Um ambiente mais fresco favorece um sono mais profundo e reparador.' },
      { title: 'Escuridão Total', priority: 'Alta', text: 'Use cortinas blackout ou máscaras de dormir. A escuridão estimula a produção de melatonina, hormônio do sono.' },
      { title: 'Silêncio e Tranquilidade', priority: 'Média', text: 'Minimize ruídos. Se necessário, use protetores auriculares ou sons brancos suaves para mascarar barulhos externos.' },
    ]
  },
  {
    category: 'Tecnologia',
    icon: 'smartphone',
    color: '#f97316', // Laranja
    bgColor: '#fff7ed', // Laranja claro
    tips: [
      { title: 'Evite Telas Antes de Dormir', priority: 'Alta', text: 'Desligue dispositivos eletrônicos pelo menos 1 hora antes de dormir. A luz azul inibe a produção de melatonina.' },
      { title: 'Modo Noturno', priority: 'Média', text: 'Se precisar usar dispositivos à noite, ative o modo noturno ou filtros de luz azul para reduzir o impacto.' },
    ]
  },
  {
    category: 'Alimentação',
    icon: 'utensils',
    color: '#16a34a', // Verde
    bgColor: '#f0fdf4', // Verde claro
    tips: [
      { title: 'Evite Cafeína', priority: 'Alta', text: 'Não consuma café, chá preto, refrigerantes ou chocolate pelo menos 6 horas antes de dormir.' },
      { title: 'Refeições Leves à Noite', priority: 'Média', text: 'Evite refeições pesadas 3 horas antes de dormir. Prefira lanches leves se necessário, como frutas ou iogurte.' },
      { title: 'Hidratação Equilibrada', priority: 'Média', text: 'Beba água ao longo do dia, mas reduza a ingestão 2 horas antes de dormir para evitar interrupções noturnas.' },
    ]
  },
  {
    category: 'Atividade Física',
    icon: 'dumbbell',
    color: '#ef4444', // Vermelho
    bgColor: '#fef2f2', // Vermelho claro
    tips: [
      { title: 'Exercícios Regulares', priority: 'Alta', text: 'Pratique atividades físicas regularmente, mas evite exercícios intensos 3-4 horas antes de dormir.' },
      { title: 'Alongamentos Noturnos', priority: 'Média', text: 'Alongamentos suaves e yoga podem ajudar a relaxar o corpo e preparar para o sono.' },
    ]
  },
  {
    category: 'Mental',
    icon: 'brain',
    color: '#4f46e5', // Indigo
    bgColor: '#eef2ff', // Indigo claro
    tips: [
      { title: 'Técnicas de Relaxamento', priority: 'Alta', text: 'Pratique meditação, respiração profunda ou mindfulness para acalmar a mente antes de dormir.' },
      { title: 'Evite Preocupações', priority: 'Média', text: 'Se pensamentos estressantes surgirem, anote-os em um papel para lidar amanhã. Isso ajuda a esvaziar a mente.' },
      { title: 'Visualização Positiva', priority: 'Baixa', text: 'Use técnicas de visualização de cenários calmos e agradáveis para facilitar o adormecimento.' },
    ]
  },
];

// --- Dados para a Dica Bônus ---
const bonusTipData = [
  { label: '10h', text: 'Sem cafeína 10 horas antes de dormir' },
  { label: '3h', text: 'Sem refeições pesadas ou álcool 3 horas antes' },
  { label: '2h', text: 'Sem trabalho ou atividades estressantes 2 horas antes' },
  { label: '1h', text: 'Sem telas 1 hora antes de dormir' },
  { label: '0', text: 'Zero vezes apertar soneca - levante na primeira vez que o alarme tocar' },
];

/**
 * Componente de Badge de Prioridade (Alta, Média, Baixa)
 */
const PriorityBadge = ({ priority }: { priority: 'Alta' | 'Média' | 'Baixa' }) => {
  const variants = {
    'Alta': { color: '#b91c1c', backgroundColor: '#fee2e2' }, // Red
    'Média': { color: '#d97706', backgroundColor: '#fef3c7' }, // Yellow/Amber
    'Baixa': { color: '#15803d', backgroundColor: '#dcfce7' }, // Green
  };
  const style = variants[priority] || variants['Baixa'];

  return (
    <View style={[styles.priorityBadge, { backgroundColor: style.backgroundColor }]}>
      <Text style={[styles.priorityBadgeText, { color: style.color }]}>{priority}</Text>
    </View>
  );
};

/**
 * Tela Principal de Higienização do Sono
 */
export default function SleepHygieneScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      
      {/* --- Cabeçalho --- */}
      <View style={styles.headerContainer}>
        <View style={styles.headerIconContainer}>
          <Icon name="moon" size={32} color="#3b82f6" />
        </View>
        <Text style={styles.mainTitle}>Higienização do Sono</Text>
        <Text style={styles.subtitle}>
          O sono de qualidade é essencial para a recuperação física e mental dos atletas. Siga estas dicas para otimizar seu descanso e melhorar seu desempenho.
        </Text>
      </View>

      {/* --- Card "Por que o sono é importante?" --- */}
      <Card style={styles.introCard}>
        <CardHeader>
          <View style={styles.introCardHeader}>
            <Icon name="moon" size={20} color="#3b82f6" />
            <CardTitle style={styles.introCardTitle}>Por que o sono é importante para atletas?</CardTitle>
          </View>
        </CardHeader>
        <CardContent style={styles.whySleepContainer}>
          {whySleepData.map((item, index) => (
            <View key={index} style={styles.whySleepItem}>
              <Icon name={item.icon as any} size={32} color={item.color} />
              <Text style={styles.whySleepItemTitle}>{item.title}</Text>
              <Text style={styles.whySleepItemText}>{item.text}</Text>
            </View>
          ))}
        </CardContent>
      </Card>

      {/* --- Lista de Categorias e Dicas --- */}
      {tipsCategories.map((category) => (
        <Card key={category.category} style={styles.categoryCard}>
          <CardHeader>
            <View style={[styles.categoryIconContainer, { backgroundColor: category.bgColor }]}>
              <Icon name={category.icon as any} size={20} color={category.color} />
            </View>
            <Text style={styles.categoryTitle}>{category.category}</Text>
          </CardHeader>
          <CardContent style={styles.categoryContent}>
            {category.tips.map((tip) => (
              <View key={tip.title} style={styles.tipItemContainer}>
                <View style={styles.tipHeader}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <PriorityBadge priority={tip.priority as any} />
                </View>
                <Text style={styles.tipText}>{tip.text}</Text>
              </View>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* --- Dica Extra: Regra 10-3-2-1-0 --- */}
      <Card style={styles.bonusCard}>
        <CardHeader>
          <View style={styles.introCardHeader}>
            <Icon name="sun" size={20} color="#16a34a" />
            <CardTitle style={[styles.introCardTitle, { color: '#16a34a' }]}>
              Dica Extra: Regra do 10-3-2-1-0
            </CardTitle>
          </View>
        </CardHeader>
        <CardContent style={styles.bonusContent}>
          {bonusTipData.map((item) => (
            <View key={item.label} style={styles.bonusTipItem}>
              <View style={styles.bonusTipLabel}>
                <Text style={styles.bonusTipLabelText}>{item.label}</Text>
              </View>
              <Text style={styles.bonusTipText}>{item.text}</Text>
            </View>
          ))}
        </CardContent>
      </Card>

    </ScrollView>
  );
}