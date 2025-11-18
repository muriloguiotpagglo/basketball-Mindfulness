import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Image, 
  Modal, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import styles from './styles';
import { 
  listPractices, 
  getMyMindfulnessHistory, 
  calculateMindfulnessStats,
  registerMindfulnessSession, // Importado
  MindfulnessPractice, 
  DashboardStats
} from '../../services/mindfulness';

// Ícones
import { 
  Flame, 
  Zap, 
  Trophy, 
  Star, 
  Target, 
  Play, 
  Users, 
  X // Ícone X para fechar
} from 'lucide-react-native';

const FALLBACK_IMAGES = [
  require('../../assets/image.png'),
  require('../../assets/image copy.png'),
  require('../../assets/image copy 2.png'),
];

// Componente auxiliar para badges do Milestone
const MilestoneItem = ({ day, currentStreak }: { day: string, currentStreak: number }) => {
  const dayNum = parseInt(day, 10);
  const isComplete = currentStreak >= dayNum;
  const isActive = !isComplete && (dayNum - currentStreak <= 2 && dayNum - currentStreak > 0);

  let borderColor = '#e2e8f0';
  let bgColor = '#f8fafc';
  let textColor = '#64748b';
  let IconComponent = Target;

  if (isComplete) {
    borderColor = '#22c55e'; 
    bgColor = '#f0fdf4'; 
    textColor = '#15803d'; 
    IconComponent = Star;
  } else if (isActive) {
    borderColor = '#fdba74'; 
    bgColor = '#fff7ed'; 
    textColor = '#c2410c'; 
  }

  return (
    <View style={[styles.milestoneItem, { borderColor, backgroundColor: bgColor }]}>
      <Text style={[styles.milestoneNumber, { color: textColor }]}>{day}</Text>
      <View style={{ marginTop: 2 }}>
        <IconComponent size={12} color={textColor} />
      </View>
    </View>
  );
};

const MindfulnessScreen: React.FC = () => {
  const [practices, setPractices] = useState<MindfulnessPractice[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ streak: 0, totalSessions: 0, totalTimeMinutes: 0, completionRate: 0 });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [registering, setRegistering] = useState<boolean>(false); // Loading do botão
  const [error, setError] = useState<string | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<MindfulnessPractice | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const fetchData = async () => {
    setError(null);
    try {
      const [practicesData, historyData] = await Promise.all([
        listPractices(),
        getMyMindfulnessHistory()
      ]);

      setPractices(practicesData);
      const calculatedStats = calculateMindfulnessStats(historyData);
      setStats(calculatedStats);

    } catch (e: any) {
      console.error(e);
      setError('Não foi possível carregar os dados de mindfulness.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // --- FUNÇÃO DE CONCLUIR SESSÃO ---
  const handleCompleteSession = async () => {
    if (!selectedPractice) return;
    
    setRegistering(true);
    try {
      await registerMindfulnessSession({
        mindfulnessId: selectedPractice.id,
        dataRealizada: new Date().toISOString(),
        duracaoReal: selectedPractice.duracao,
        feedback: 'Sessão concluída via app',
        pontuacao: 100
      });

      setShowDetails(false);
      setSelectedPractice(null);
      await fetchData(); // Atualiza o streak/stats

      Alert.alert("Sucesso!", "Prática registrada. Continue assim!");

    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível registrar a sessão.");
    } finally {
      setRegistering(false);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.logoRow}>
            <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ffedd5'}}>
                 <Flame size={20} color="#D55C15" fill="#D55C15" />
            </View>
            <Text style={styles.pageTitle}>Sessões</Text>
          </View>
        </View>
        <Text style={styles.pageSubtitle}>Práticas guiadas para bem-estar mental</Text>
      </View>

      <View style={styles.streakContainer}>
        <View style={styles.streakCard}>
          <View style={styles.streakBg} />
          <View style={styles.streakIconContainer}>
            <Flame size={64} color={stats.streak > 0 ? "#f97316" : "#9ca3af"} fill={stats.streak > 0 ? "#f97316" : "none"} />
          </View>
          <Text style={styles.streakCount}>{stats.streak}</Text>
          <Text style={styles.streakLabel}>dias consecutivos</Text>
          
          {stats.streak > 0 ? (
             <View style={styles.streakBadge}>
               <Text style={styles.streakBadgeText}>🔥 Em Chamas</Text>
             </View>
          ) : (
            <View style={[styles.streakBadge, { backgroundColor: '#f3f4f6' }]}>
               <Text style={[styles.streakBadgeText, { color: '#6b7280' }]}>❄️ Comece hoje!</Text>
             </View>
          )}
          
          <Text style={styles.streakFooterText}>Mantenha a constância!</Text>
        </View>

        <View style={styles.streakActionsRow}>
          <TouchableOpacity style={[styles.actionButton, styles.resetButton]} onPress={onRefresh}>
             <Text style={styles.resetButtonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.milestonesCard}>
        <View style={styles.sectionTitleRow}>
          <Trophy size={18} color="#eab308" />
          <Text style={styles.sectionTitle}>Próximos Marcos</Text>
        </View>
        <View style={styles.milestonesGrid}>
          <MilestoneItem day="3" currentStreak={stats.streak} />
          <MilestoneItem day="7" currentStreak={stats.streak} />
          <MilestoneItem day="14" currentStreak={stats.streak} />
          <MilestoneItem day="21" currentStreak={stats.streak} />
          <MilestoneItem day="30" currentStreak={stats.streak} />
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statsHeader}>
        <Text style={styles.sectionTitle}>Estatísticas de Participação</Text>
      </View>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#ea580c' }]}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>Sessões Completas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#16a34a' }]}>{stats.completionRate}%</Text>
          <Text style={styles.statLabel}>Taxa de Conclusão</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#2563eb' }]}>{formatTime(stats.totalTimeMinutes)}</Text>
          <Text style={styles.statLabel}>Tempo Total</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: MindfulnessPractice }) => {
    const description = item.descricao && item.descricao.trim().length > 0 ? item.descricao : 'Sem descrição';
    const imageSource = item.imageUrl ? { uri: item.imageUrl } : FALLBACK_IMAGES[item.id % FALLBACK_IMAGES.length];

    let badgeBg = '#dcfce7'; 
    let badgeText = '#166534'; 
    if (item.nivel === 'intermediario') {
      badgeBg = '#fef9c3'; 
      badgeText = '#854d0e'; 
    } else if (item.nivel === 'avancado') {
      badgeBg = '#fee2e2'; 
      badgeText = '#991b1b'; 
    }

    return (
      <View style={styles.practiceCard}>
        <View style={styles.cardImageContainer}>
          <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
          <View style={styles.cardOverlay} />
          
          <View style={styles.badgesContainer}>
            <View style={[styles.cardBadge, { backgroundColor: badgeBg }]}>
              <Text style={[styles.cardBadgeText, { color: badgeText }]}>
                {item.nivel ? item.nivel.charAt(0).toUpperCase() + item.nivel.slice(1) : 'Geral'}
              </Text>
            </View>
            <View style={[styles.cardBadge, { backgroundColor: 'rgba(255,255,255,0.9)' }]}>
              <Text style={[styles.cardBadgeText, { color: '#1f2937' }]}>
                {item.tipo || 'Prática'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.playButton} onPress={() => { setSelectedPractice(item); setShowDetails(true); }}>
             <Play size={20} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <View style={styles.durationRow}>
              <Zap size={14} color="#64748b" />
              <Text style={styles.durationText}>{item.duracao}min</Text>
            </View>
          </View>
          
          <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>
          
          <View style={styles.cardFooter}>
            <View style={styles.participantsRow}>
              <Users size={14} color="#64748b" />
              <Text style={styles.footerText}>{item.participants || 0} participantes</Text>
            </View>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => { setSelectedPractice(item); setShowDetails(true); }}
            >
              <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D55C15" />
        <Text style={styles.loadingText}>Carregando dashboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={[styles.newSessionButton, { backgroundColor: '#ef4444' }]} 
          onPress={fetchData}
        >
          <Text style={styles.newSessionText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={practices}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#D55C15']} />
        }
        ListEmptyComponent={(
          <View style={styles.centered}>
            <Text style={{color: '#9ca3af'}}>Nenhuma prática disponível no momento.</Text>
          </View>
        )}
      />

      <Modal visible={showDetails} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            <TouchableOpacity 
                style={styles.modalCloseIcon} 
                onPress={() => { setShowDetails(false); setSelectedPractice(null); }}
            >
                <X size={24} color="#6b7280" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              {selectedPractice && (
                <>
                  <Text style={styles.modalTitle}>{selectedPractice.titulo}</Text>
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                    <View style={[styles.cardBadge, { backgroundColor: '#dcfce7', alignSelf: 'flex-start' }]}>
                      <Text style={[styles.cardBadgeText, { color: '#166534' }]}>{selectedPractice.nivel}</Text>
                    </View>
                    <View style={[styles.cardBadge, { backgroundColor: '#f3f4f6', alignSelf: 'flex-start' }]}>
                      <Text style={[styles.cardBadgeText, { color: '#374151' }]}>{selectedPractice.tipo}</Text>
                    </View>
                  </View>

                  <Text style={{ fontSize: 16, color: '#4b5563', lineHeight: 24 }}>
                    {selectedPractice.descricao || "Sem descrição detalhada."}
                  </Text>

                  <TouchableOpacity 
                    style={styles.modalCompleteButton} 
                    onPress={handleCompleteSession}
                    disabled={registering}
                  >
                    {registering ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.modalCompleteButtonText}>Concluir Prática</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MindfulnessScreen;