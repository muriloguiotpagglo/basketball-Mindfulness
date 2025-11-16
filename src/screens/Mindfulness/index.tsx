import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from '../../components/ui/Icon';
import { AppLogo } from '../../components/ui/AppLogo';
import styles from './styles';
import { Alert } from 'react-native';
import { listPractices, createMyPractice, MindfulnessPractice } from '../../services/mindfulness';
import { getToken } from '../../services/auth';


interface MindfulnessSession {
  id: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  title: string;
  description: string;
  duration: number; 
  participants: number;
  imageUrl: string;
}

interface Milestone {
  id: string;
  days: number;
  achieved: boolean;
}

const mindfulnessSessions: MindfulnessSession[] = [
  {
    id: '1',
    level: 'Iniciante',
    category: 'Respiração',
    title: 'Respiração para Foco',
    description: 'Técnica de respiração 4-7-8 para melhorar concentração durante jogos',
    duration: 10,
    participants: 8,
    imageUrl: 'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    level: 'Intermediário',
    category: 'Meditação',
    title: 'Meditação da Confiança',
    description: 'Visualização guiada para fortalecer autoconfiança e performance',
    duration: 15,
    participants: 12,
    imageUrl: 'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const milestones: Milestone[] = [
  { id: 'm1', days: 3, achieved: true },
  { id: 'm2', days: 7, achieved: true },
  { id: 'm3', days: 14, achieved: false },
  { id: 'm4', days: 21, achieved: false },
  { id: 'm5', days: 30, achieved: false },
];

const currentStreak = 5;

const MindfulnessScreen: React.FC = () => {
  const [practices, setPractices] = useState<MindfulnessPractice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    listPractices()
      .then(setPractices)
      .catch(() => setError('Falha ao carregar práticas'))
      .finally(() => setLoading(false));
  }, []);

  const nivelLabel = (nivel: string) => {
    if (nivel === 'iniciante') return 'Iniciante';
    if (nivel === 'intermediario') return 'Intermediário';
    return 'Avançado';
  };

  const handleCompleteSession = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Autenticação necessária', 'Faça login na aba Configurações.');
      return;
    }
    if (practices.length === 0) {
      Alert.alert('Nenhuma prática disponível');
      return;
    }
    const p = practices[0];
    try {
      await createMyPractice({
        mindfulnessId: p.id,
        dataRealizada: new Date().toISOString(),
        duracaoReal: p.duracao,
        feedback: 'Sessão concluída no app',
        pontuacao: p.duracao,
      });
      Alert.alert('Sucesso', 'Sessão registrada!');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível registrar a sessão');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Icon name="menu" size={24} color="#ffffff" style={styles.menuIcon} />
          </TouchableOpacity>
          <AppLogo size={24} />
          <View>
            <Text style={styles.appName}>MindfulBasket</Text>
            <Text style={styles.appSubtitle}>Sistema de Monitoramento</Text>
          </View>
        </View>
        <View style={styles.profileIcon}>
          <Text style={styles.profileText}>TS</Text>
        </View>
      </View>
      {/* Seção de Título */}
      <View style={styles.titleSection}>
        <View style={styles.titleHeader}>
            <Icon name="mindfulness" size={24} color="#ffffff" style={styles.titleIcon} />
            <Text style={styles.titleText}>Sessões de Mindfulness</Text>
            <TouchableOpacity style={styles.newSessionButton}>
                <Text style={styles.newSessionButtonText}>Nova Sessão</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.subtitleText}>Práticas guiadas para bem-estar mental da equipe</Text>
      </View>

      {/* Contador de Dias Consecutivos */}
      <View style={styles.streakContainer}>
        <Icon name="fire" size={24} color="#D55C15" style={styles.streakIcon} />
        <Text style={styles.streakNumber}>{currentStreak}</Text>
        <Text style={styles.streakLabel}>dias consecutivos</Text>
        <View style={styles.streakStatusBadge}>
            <Text style={styles.streakStatusText}>Aquecendo</Text>
        </View>
        <Text style={styles.streakSubtext}>2 dias para "Em Chamas"</Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.completeButton}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="zap" size={18} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={styles.completeButtonText}>Completei Sessão!</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Próximos Marcos */}
      <View style={styles.milestonesContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="trophy" size={20} color="#D55C15" style={{ marginRight: 8 }} />
          <Text style={styles.milestonesTitle}>Próximos Marcos</Text>
        </View>
        <View style={styles.milestonesGrid}>
          {milestones.map(milestone => (
            <View key={milestone.id} style={[styles.milestoneBox, milestone.achieved ? styles.milestoneAchieved : styles.milestonePending]}>
              <Text style={styles.milestoneDays}>{milestone.days}</Text>
              <Icon name={milestone.achieved ? 'star' : 'target'} size={18} color={milestone.achieved ? '#D55C15' : '#374151'} />
            </View>
          ))}
        </View>
      </View>

      {/* Lista de Sessões */}
      <View style={styles.sessionListContainer}>
        {mindfulnessSessions.map(session => (
          <View key={session.id} style={styles.sessionCard}>
            <Image source={{ uri: session.imageUrl }} style={styles.sessionImage} />
            <View style={styles.sessionTagsContainer}>
                <View style={[styles.sessionTag, styles.levelTag]}><Text style={styles.sessionTagText}>{session.level}</Text></View>
                <View style={[styles.sessionTag, styles.categoryTag]}><Text style={styles.sessionTagText}>{session.category}</Text></View>
            </View>
            <View style={styles.playIconContainer}>
                <Icon name="play" size={20} color="#ffffff" />
            </View>
            <View style={styles.sessionDetailsContainer}>
                <View style={styles.sessionTitleRow}>
                    <Text style={styles.sessionTitle}>{session.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="zap" size={14} color="#D55C15" style={{ marginRight: 4 }} />
                      <Text style={styles.sessionDuration}>{session.duration}min</Text>
                    </View>
                </View>
                <Text style={styles.sessionDescription}>{session.description}</Text>
                <View style={styles.sessionFooter}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="users" size={14} color="#374151" style={{ marginRight: 4 }} />
                      <Text style={styles.sessionParticipants}>{session.participants} participantes</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        ))}
      </View>
      {loading && <Text style={{ color: '#fff' }}>Carregando práticas...</Text>}
      {error && <Text style={{ color: '#ef4444' }}>{error}</Text>}

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteSession}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="zap" size={18} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.completeButtonText}>Completei Sessão!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sessionListContainer}>
        {practices.map((session) => (
          <View key={session.id} style={styles.sessionCard}>
            <Image
              source={{ uri: session.imageUrl || 'https://placehold.co/600x400/282828/ffffff?text=Mindfulness' }}
              style={styles.sessionImage}
            />
            <View style={styles.sessionTagsContainer}>
              <View style={[styles.sessionTag, styles.levelTag]}>
                <Text style={styles.sessionTagText}>{nivelLabel(session.nivel)}</Text>
              </View>
              <View style={[styles.sessionTag, styles.categoryTag]}>
                <Text style={styles.sessionTagText}>{session.category || 'Geral'}</Text>
              </View>
            </View>
            <View style={styles.playIconContainer}>
              <Icon name="play" size={20} color="#ffffff" />
            </View>
            <View style={styles.sessionDetailsContainer}>
              <View style={styles.sessionTitleRow}>
                <Text style={styles.sessionTitle}>{session.titulo}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="zap" size={14} color="#D55C15" style={{ marginRight: 4 }} />
                  <Text style={styles.sessionDuration}>{session.duracao}min</Text>
                </View>
              </View>
              <Text style={styles.sessionDescription}>
                {session.descricao || 'Sem descrição'}
              </Text>
              <View style={styles.sessionFooter}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="users" size={14} color="#374151" style={{ marginRight: 4 }} />
                  <Text style={styles.sessionParticipants}>{session.participants ?? 0} participantes</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default MindfulnessScreen;
