import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles';
import { Icon } from '../../components/ui/Icon';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { createCheckIn } from '../../services/checkin';

const moodOptions = [
  { value: 100, label: 'Excelente', iconName: 'smile', color: '#22c55e' },
  { value: 66, label: 'Bom', iconName: 'smile', color: '#3b82f6' },
  { value: 50, label: 'Neutro', iconName: 'meh', color: '#eab308' },
  { value: 25, label: 'Ruim', iconName: 'frown', color: '#D55C15' },
];

export default function DailyCheckIn() {
  const [activeTab, setActiveTab] = useState<'pre' | 'post'>('pre');
  const [humorPre, setHumorPre] = useState<number | null>(null);
  const [humorPos, setHumorPos] = useState<number | null>(null);

  const [energia, setEnergia] = useState(50);
  const [sono, setSono] = useState(50);
  const [stress, setStress] = useState(50);
  const [motivacao, setMotivacao] = useState(50);
  const [condicaoFisica, setCondicaoFisica] = useState(50);
  const [satisfacaoPessoal, setSatisfacaoPessoal] = useState(50);
  const [alimentacao, setAlimentacao] = useState(50);
  const [preocupacao, setPreocupacao] = useState(50);

  const [intensidadeTreino, setIntensidadeTreino] = useState<number | undefined>(undefined);
  const [feedbackTreino, setFeedbackTreino] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sliders = useMemo(
    () => [
      { label: 'Nível de Energia', value: energia, set: setEnergia, iconName: 'zap', iconColor: '#eab308' },
      { label: 'Qualidade do Sono', value: sono, set: setSono, iconName: 'moon', iconColor: '#3b82f6' },
      { label: 'Nível de Stress', value: stress, set: setStress, iconName: 'brain', iconColor: '#a855f7' },
      { label: 'Motivação', value: motivacao, set: setMotivacao, iconName: 'heart', iconColor: '#ef4444' },
      { label: 'Condição Física', value: condicaoFisica, set: setCondicaoFisica, iconName: 'zap', iconColor: '#22c55e' },
      { label: 'Satisfação Pessoal', value: satisfacaoPessoal, set: setSatisfacaoPessoal, iconName: 'thumbs-up', iconColor: '#6366f1' },
      { label: 'Alimentação', value: alimentacao, set: setAlimentacao, iconName: 'utensils', iconColor: '#D55C15' },
      { label: 'Preocupação', value: preocupacao, set: setPreocupacao, iconName: 'alert-circle', iconColor: '#D55C15' },
    ],
    [energia, sono, stress, motivacao, condicaoFisica, satisfacaoPessoal, alimentacao, preocupacao]
  );

  const submit = async () => {
    setError(null);
    if (humorPre == null) {
      setError('Selecione o humor pré-treino.');
      setActiveTab('pre');
      return;
    }
    if (humorPos == null) {
      setError('Selecione o humor pós-treino.');
      setActiveTab('post');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        data: new Date().toISOString(),
        humorPre,
        humorPos,
        energia,
        sono,
        stress,
        motivacao,
        condicaoFisica,
        satisfacaoPessoal,
        alimentacao,
        preocupacao,
        intensidadeTreino,
        feedbackTreino: feedbackTreino?.trim() || undefined,
      };
      await createCheckIn(payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
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
      setIntensidadeTreino(undefined);
      setFeedbackTreino('');
      setActiveTab('pre');
    } catch (e: any) {
      if (e?.code === 'ERR_NETWORK') {
        setError('Servidor indisponível. Verifique se o backend está rodando na porta 3001.');
      } else {
        setError(e?.response?.data?.message ?? 'Falha ao enviar check-in.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Check-in Diário</Text>
        <Text style={styles.subtitle}>Preencha seu estado antes e depois do treino.</Text>
      </View>

      <View style={styles.tabsContainer}>
        <View style={styles.tabsList}>
          <TouchableOpacity style={[styles.tabsTrigger, activeTab === 'pre' && styles.tabsTriggerActive]} onPress={() => setActiveTab('pre')}>
            <Icon name="clock" size={16} color={activeTab === 'pre' ? '#000' : '#6b7280'} style={{ marginRight: 4 }} />
            <Text style={[styles.tabsText, activeTab === 'pre' && styles.tabsTextActive]}>Pré-Treino</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabsTrigger, activeTab === 'post' && styles.tabsTriggerActive]} onPress={() => setActiveTab('post')}>
            <Icon name="trending-up" size={16} color={activeTab === 'post' ? '#000' : '#6b7280'} style={{ marginRight: 4 }} />
            <Text style={[styles.tabsText, activeTab === 'post' && styles.tabsTextActive]}>Pós-Treino</Text>
          </TouchableOpacity>
        </View>

        {error && (
          <View style={{ paddingHorizontal: 4 }}>
            <Text style={{ color: '#ef4444' }}>{error}</Text>
          </View>
        )}

        {success && (
          <View style={{ paddingHorizontal: 4 }}>
            <Text style={{ color: '#22c55e' }}>Check-in enviado com sucesso!</Text>
          </View>
        )}

        {activeTab === 'pre' && (
          <View style={styles.tabsContent}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Icon name="smile" size={20} color="#000" style={{ marginRight: 8 }} />
                  Humor pré-treino
                </CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.moodGrid}>
                  {moodOptions.map(option => (
                    <TouchableOpacity
                      key={option.label}
                      style={[styles.moodOption, humorPre === option.value ? styles.moodOptionSelected : styles.moodOptionUnselected]}
                      onPress={() => setHumorPre(option.value)}
                    >
                      <Icon name={option.iconName} size={32} color={option.color} style={{ marginBottom: 8 }} />
                      <Text style={styles.moodLabel}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Níveis de Bem-estar</CardTitle>
              </CardHeader>
              <CardContent>
                {sliders.map(s => (
                  <View key={s.label} style={styles.sliderContainer}>
                    <View style={styles.sliderHeader}>
                      <View style={styles.flexRow}>
                        <Icon name={s.iconName} size={16} color={s.iconColor} style={{ marginRight: 8 }} />
                        <Text style={styles.label}>{s.label}</Text>
                      </View>
                      <Text style={styles.sliderValue}>{s.value}%</Text>
                    </View>
                    <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={s.value} onSlidingComplete={s.set} minimumTrackTintColor="#D55C15" maximumTrackTintColor="#d1d5db" />
                  </View>
                ))}
              </CardContent>
            </Card>
          </View>
        )}

        {activeTab === 'post' && (
          <View style={styles.tabsContent}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Icon name="smile" size={20} color="#000" style={{ marginRight: 8 }} />
                  Humor pós-treino
                </CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.moodGrid}>
                  {moodOptions.map(option => (
                    <TouchableOpacity
                      key={option.label}
                      style={[styles.moodOption, humorPos === option.value ? styles.moodOptionSelected : styles.moodOptionUnselected]}
                      onPress={() => setHumorPos(option.value)}
                    >
                      <Icon name={option.iconName} size={32} color={option.color} style={{ marginBottom: 8 }} />
                      <Text style={styles.moodLabel}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avaliação do Treino</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderHeader}>
                    <View style={styles.flexRow}>
                      <Icon name="zap" size={16} color="#D55C15" style={{ marginRight: 8 }} />
                      <Text style={styles.label}>Intensidade do Treino</Text>
                    </View>
                    <Text style={styles.sliderValue}>{intensidadeTreino ?? 0}%</Text>
                  </View>
                  <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={intensidadeTreino ?? 0} onSlidingComplete={setIntensidadeTreino} minimumTrackTintColor="#D55C15" maximumTrackTintColor="#d1d5db" />
                </View>
                <TextInput style={styles.textarea} placeholder="Feedback do treino (opcional)" value={feedbackTreino} onChangeText={setFeedbackTreino} multiline />
              </CardContent>
            </Card>
          </View>
        )}
      </View>

      <View style={{ marginTop: 24, alignItems: 'center' }}>
        <Button title={submitting ? 'Enviando...' : 'Enviar Check-in'} onPress={submit} disabled={submitting} iconName="save" />
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}