import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'; // ❗ Adicionando Alert para notificações
import Slider from '@react-native-community/slider';
import styles from './styles';
import { Icon } from '../../components/ui/Icon';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { createPreCheckIn, updatePosCheckIn } from '../../services/checkin';

// ❗ IMPORTAÇÃO CORRIGIDA: Precisamos das funções separadas de POST e PATCH
// Assumindo a estrutura de tipos e funções que definimos anteriormente:
type CreateCheckinPayload = {
  data: string;
  humorPre: number;
  energia: number;
  sono: number;
  stress: number;
  motivacao: number;
  condicaoFisica: number;
  satisfacaoPessoal: number;
  alimentacao: number;
  preocupacao: number;
};

type UpdateCheckinPayload = {
  humorPos: number;
  intensidadeTreino: number;
  feedbackTreino?: string;
};

type CheckinResponse = {
  id: number; // O ID é crucial
};


const moodOptions = [
  { value: 100, label: 'Excelente', iconName: 'smile', color: '#22c55e' },
  { value: 66, label: 'Bom', iconName: 'smile', color: '#3b82f6' },
  { value: 50, label: 'Neutro', iconName: 'meh', color: '#eab308' },
  { value: 25, label: 'Ruim', iconName: 'frown', color: '#D55C15' },
  { value: 0, label: 'Péssimo', iconName: 'frown', color: '#d51515ff'}
];

// Mapeamento dos sliders para o Pré-Check-in
const preCheckinSliders = [
  { key: 'energia', label: 'Energia', iconName: 'zap', color: '#fbbf24' },
  { key: 'sono', label: 'Qualidade do Sono', iconName: 'moon', color: '#6366f1' },
  { key: 'stress', label: 'Nível de Stress', iconName: 'trending-down', color: '#f87171' },
  { key: 'motivacao', label: 'Motivação', iconName: 'rocket', color: '#10b981' },
  { key: 'condicaoFisica', label: 'Condição Física', iconName: 'dumbbell', color: '#f97316' },
  { key: 'satisfacaoPessoal', label: 'Satisfação Pessoal', iconName: 'heart', color: '#ef4444' },
  { key: 'alimentacao', label: 'Alimentação', iconName: 'utensils', color: '#a8a29e' },
  { key: 'preocupacao', label: 'Nível de Preocupação', iconName: 'bell', color: '#374151' },
];

export default function DailyCheckIn() {
  const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
  const [submitting, setSubmitting] = useState(false);
  
  // ❗ NOVO ESTADO: Armazena o ID retornado pelo POST do Pré-Check-in
  const [lastCheckinId, setLastCheckinId] = useState<number | null>(null);
  const isPreCheckinDone = lastCheckinId !== null;

  // --- Estados do Pré-Checkin ---
  const [humorPre, setHumorPre] = useState<number | null>(null);
  const [energia, setEnergia] = useState(50);
  const [sono, setSono] = useState(50);
  const [stress, setStress] = useState(50);
  const [motivacao, setMotivacao] = useState(50);
  const [condicaoFisica, setCondicaoFisica] = useState(50);
  const [satisfacaoPessoal, setSatisfacaoPessoal] = useState(50);
  const [alimentacao, setAlimentacao] = useState(50);
  const [preocupacao, setPreocupacao] = useState(50);
  
  // --- Estados do Pós-Checkin ---
  const [humorPos, setHumorPos] = useState<number | null>(null);
  const [intensidadeTreino, setIntensidadeTreino] = useState(50);
  const [feedbackTreino, setFeedbackTreino] = useState('');

  // Mapeamento dos setters do pré-checkin
  const preCheckinSetters = useMemo(() => ({
    energia: setEnergia,
    sono: setSono,
    stress: setStress,
    motivacao: setMotivacao,
    condicaoFisica: setCondicaoFisica,
    satisfacaoPessoal: setSatisfacaoPessoal,
    alimentacao: setAlimentacao,
    preocupacao: setPreocupacao,
  }), []);

  // Verifica se o Pré-Check-in está pronto para ser enviado
  const isPreValid = humorPre !== null; 

  // Verifica se o Pós-Check-in está pronto para ser enviado
  const isPostValid = humorPos !== null && isPreCheckinDone;


  const submit = async () => {
    setSubmitting(true);
    try {
      if (activeTab === 'pre' && isPreValid) {
        // ----------------------------------------
        // 1. SUBMISSÃO DO PRÉ-CHECK-IN (POST)
        // ----------------------------------------
        const prePayload: CreateCheckinPayload = {
          data: new Date().toISOString(), // Usando data atual
          humorPre: humorPre!,
          energia,
          sono,
          stress,
          motivacao,
          condicaoFisica,
          satisfacaoPessoal,
          alimentacao,
          preocupacao,
        };

        const response = await createPreCheckIn(prePayload);
        
        // ❗ ARMAZENAR O ID RETORNADO PELO POST
        setLastCheckinId(response.id); 

        setActiveTab('post');
        // ❗ Notificação de Sucesso para o Pré-Check-in
        Alert.alert('Sucesso!', 'Pré-Check-in enviado. Agora complete o Pós-Check-in.');

      } else if (activeTab === 'post' && isPostValid) {
        // ----------------------------------------
        // 2. SUBMISSÃO DO PÓS-CHECK-IN (PATCH)
        // ----------------------------------------
        const posPayload: UpdateCheckinPayload = {
          humorPos: humorPos!,
          intensidadeTreino,
          feedbackTreino: feedbackTreino || undefined,
        };
        
        // O ID foi armazenado na submissão do 'pre'
        await updatePosCheckIn(lastCheckinId!, posPayload); 

        // ❗ Notificação de Sucesso para o Check-in Completo
        Alert.alert('Sucesso!', 'Check-in completo enviado! O seu ciclo mental do dia foi registrado.');

        // 📝 Resetar todos os estados após a conclusão do ciclo
        setLastCheckinId(null);
        setActiveTab('pre');
        setHumorPre(null);
        setHumorPos(null);
        setEnergia(50);
        setSono(50);
        setStress(50);
        setMotivacao(50);
        setCondicaoFisica(50);
        setSatisfacaoPessoal(50);
        setAlimentacao(50);
        setPreocupacao(50);
        setIntensidadeTreino(50);
        setFeedbackTreino('');


      } else {
        // ❗ Notificação de Validação
        Alert.alert('Atenção', `Por favor, complete as informações necessárias do ${activeTab === 'pre' ? 'Pré-Check-in (Humor é obrigatório)' : 'Pós-Check-in (Humor e ID do Pré são obrigatórios)'}.`);
      }
    } catch (error: any) {
      console.error('Erro ao submeter Check-in:', error.response?.data || error.message);
      // ❗ Notificação de Erro
      Alert.alert('Erro', `Falha ao enviar o Check-in. Verifique a conexão. (${error.response?.data?.message || 'Erro de rede ou ID não encontrado'})`);
    } finally {
      setSubmitting(false);
    }
  };


  const renderMoodSelector = (
    currentMood: number | null,
    setMood: (value: number) => void
  ) => (
    <View style={styles.moodGrid}>
      {moodOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.moodOption,
            currentMood === option.value ? styles.moodOptionSelected : styles.moodOptionUnselected,
          ]}
          onPress={() => setMood(option.value)}
        >
          <Icon name={option.iconName} size={32} color={currentMood === option.value ? '#D55C15' : option.color} />
          <Text style={[styles.moodLabel, currentMood === option.value && { color: '#D55C15' }]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Check-in Diário 🏀</Text>
        <Text style={styles.subtitle}>Como você está hoje antes e depois do seu treino?</Text>
      </View>

      {/* Seletor de Abas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'pre' && styles.tabButtonActive]}
          onPress={() => setActiveTab('pre')}
        >
          <Text style={[styles.tabText, activeTab === 'pre' && styles.tabTextActive]}>
            Pré-Treino {isPreCheckinDone ? '✔️' : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'post' && styles.tabButtonActive]}
          onPress={() => {
            if (isPreCheckinDone) {
              setActiveTab('post');
            } else {
              Alert.alert('Atenção', 'Você precisa enviar o Pré-Check-in primeiro para liberar esta aba.');
            }
          }}
        >
          <Text style={[styles.tabText, activeTab === 'post' && styles.tabTextActive]}>
            Pós-Treino {isPreCheckinDone ? (humorPos !== null ? '✔️' : '❓') : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {/* Conteúdo do Pré-Check-in */}
        {activeTab === 'pre' && (
          <View>
            <Card style={styles.card}>
              <CardHeader>
                <CardTitle>Humor Antes do Treino (Obrigatório)</CardTitle>
              </CardHeader>
              <CardContent>
                {renderMoodSelector(humorPre, setHumorPre)}
              </CardContent>
            </Card>

            {/* CARD PARA AGRUPAR TODOS OS SLIDERS DE AVALIAÇÃO */}
            <Card style={styles.card}>
              <CardHeader>
                <CardTitle>Avaliação Diária (Parâmetros Mentais e Físicos)</CardTitle>
              </CardHeader>
              <CardContent>
                {preCheckinSliders.map((item) => {
                  // Mapeamento dinâmico dos valores (mantido do original)
                  const currentValue = (item.key === 'energia' ? energia : 
                                      item.key === 'sono' ? sono : 
                                      item.key === 'stress' ? stress : 
                                      item.key === 'motivacao' ? motivacao : 
                                      item.key === 'condicaoFisica' ? condicaoFisica : 
                                      item.key === 'satisfacaoPessoal' ? satisfacaoPessoal : 
                                      item.key === 'alimentacao' ? alimentacao : 
                                      item.key === 'preocupacao' ? preocupacao : 50);

                  const setter = preCheckinSetters[item.key as keyof typeof preCheckinSetters];

                  return (
                    // O item individual é apenas uma View/SliderContainer, não um Card
                    <View key={item.key} style={styles.sliderContainer}>
                      <View style={styles.sliderHeader}>
                        <View style={styles.flexRow}>
                          <Icon name={item.iconName} size={16} color={item.color} style={styles.iconMargin} />
                          <Text style={styles.label}>{item.label}</Text>
                        </View>
                        <Text style={styles.sliderValue}>{currentValue}%</Text>
                      </View>
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={currentValue}
                        onSlidingComplete={setter as any} 
                        minimumTrackTintColor={item.color}
                        maximumTrackTintColor="#d1d5db"
                      />
                    </View>
                  );
                })}
              </CardContent>
            </Card>
          </View>
        )}

        {/* Conteúdo do Pós-Check-in */}
        {activeTab === 'post' && isPreCheckinDone && (
          <View>
            <Card style={styles.card}>
              <CardHeader>
                <CardTitle>Humor Após o Treino (Obrigatório)</CardTitle>
              </CardHeader>
              <CardContent>
                {renderMoodSelector(humorPos, setHumorPos)}
              </CardContent>
            </Card>

            <Card style={styles.card}>
              <CardHeader>
                <CardTitle>Avaliação do Treino</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderHeader}>
                    <View style={styles.flexRow}>
                      <Icon name="zap" size={16} color="#D55C15" style={styles.iconMargin} />
                      <Text style={styles.label}>Intensidade do Treino</Text>
                    </View>
                    <Text style={styles.sliderValue}>{intensidadeTreino ?? 0}%</Text>
                  </View>
                  <Slider 
                    style={styles.slider} 
                    minimumValue={0} 
                    maximumValue={100} 
                    step={1} 
                    value={intensidadeTreino ?? 0} 
                    onSlidingComplete={setIntensidadeTreino} 
                    minimumTrackTintColor="#D55C15" 
                    maximumTrackTintColor="#d1d5db" 
                  />
                </View>
                <TextInput 
                  style={styles.textarea} 
                  placeholder="Feedback do treino (opcional)" 
                  value={feedbackTreino} 
                  onChangeText={setFeedbackTreino} 
                  multiline 
                />
              </CardContent>
            </Card>
          </View>
        )}
        
        {/* Mensagem se tentar acessar o Pós sem fazer o Pré */}
        {activeTab === 'post' && !isPreCheckinDone && (
             <View style={styles.notAvailableMessage}>
                <Icon name="lock" size={48} color="#9ca3af" />
                <Text style={styles.messageText}>
                    Complete e envie o Pré-Check-in para liberar a seção Pós-Treino.
                </Text>
            </View>
        )}
      </View>

      <View style={{ marginTop: 24, alignItems: 'center' }}>
        <Button 
          title={submitting 
            ? 'Enviando...' 
            : `Enviar ${activeTab === 'pre' ? 'Pré-Check-in' : 'Pós-Check-in Completo'}`
          }
          onPress={submit} 
          // Desabilita se estiver enviando OU se a validação falhar
          disabled={submitting || (activeTab === 'pre' ? !isPreValid : !isPostValid)} 
          iconName="save" 
        />
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}