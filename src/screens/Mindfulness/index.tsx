import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  Image, 
  Modal, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import styles from './styles';
import { listPractices, MindfulnessPractice } from '../../services/mindfulness';
// Ícones importados (assumindo lucide-react-native instalado)
import { 
  Flame, 
  Zap, 
  Trophy, 
  Star, 
  Target, 
  Play, 
  Clock, 
  Users, 
  RotateCcw 
} from 'lucide-react-native';

const FALLBACK_IMAGES = [
  require('../../assets/image.png'),
  require('../../assets/image copy.png'),
  require('../../assets/image copy 2.png'),
];

// Componente auxiliar para badges do Milestone
const MilestoneItem = ({ day, active, complete, icon: IconComponent }: any) => {
  let borderColor = '#e2e8f0';
  let bgColor = '#f8fafc';
  let textColor = '#64748b';

  if (active) {
    borderColor = '#fdba74'; // orange-300
    bgColor = '#fff7ed'; // orange-50
    textColor = '#c2410c'; // orange-700
  } else if (complete) {
    borderColor = '#22c55e'; // green-500
    bgColor = '#f0fdf4'; // green-50
    textColor = '#15803d'; // green-700
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<MindfulnessPractice | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listPractices();
        if (mounted) setPractices(data);
      } catch (e: any) {
        if (mounted) setError('Não foi possível carregar as práticas.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // --- Cabeçalho da Lista (Dashboard) ---
  const renderHeader = () => (
    <View>
      {/* Top Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.logoRow}>
            {/* Placeholder para Logo */}
            <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center'}}>
                 <Flame size={24} color="#D55C15" />
            </View>
            <Text style={styles.pageTitle}>Sessões de Mindfulness</Text>
          </View>
          <TouchableOpacity style={styles.newSessionButton}>
            <Text style={styles.newSessionText}>Nova Sessão</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.pageSubtitle}>Práticas guiadas para bem-estar mental da equipe</Text>
      </View>

      {/* Seção de Streak */}
      <View style={styles.streakContainer}>
        <View style={styles.streakCard}>
          <View style={styles.streakBg} />
          <View style={styles.streakIconContainer}>
            <Flame size={64} color="#f97316" fill="#f97316" />
          </View>
          <Text style={styles.streakCount}>5</Text>
          <Text style={styles.streakLabel}>dias consecutivos</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakBadgeText}>🔥 Aquecendo</Text>
          </View>
          <Text style={styles.streakFooterText}>2 dias para "Em Chamas"</Text>
        </View>

        <View style={styles.streakActionsRow}>
          <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
            <Zap size={16} color="#fff" />
            <Text style={styles.completeButtonText}>Completei Sessão!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.resetButton]}>
             <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção de Milestones */}
      <View style={styles.milestonesCard}>
        <View style={styles.sectionTitleRow}>
          <Trophy size={18} color="#eab308" />
          <Text style={styles.sectionTitle}>Próximos Marcos</Text>
        </View>
        <View style={styles.milestonesGrid}>
          <MilestoneItem day="3" complete icon={Star} />
          <MilestoneItem day="7" active icon={Target} />
          <MilestoneItem day="14" icon={Target} />
          <MilestoneItem day="21" icon={Target} />
          <MilestoneItem day="30" icon={Target} />
        </View>
      </View>
    </View>
  );

  // --- Rodapé da Lista (Estatísticas) ---
  const renderFooter = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statsHeader}>
        <Text style={styles.sectionTitle}>Estatísticas de Participação</Text>
      </View>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#ea580c' }]}>156</Text>
          <Text style={styles.statLabel}>Sessões Completadas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#16a34a' }]}>89%</Text>
          <Text style={styles.statLabel}>Taxa de Conclusão</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#2563eb' }]}>42h</Text>
          <Text style={styles.statLabel}>Tempo Total</Text>
        </View>
      </View>
    </View>
  );

  // --- Renderização do Card Individual ---
  const renderItem = ({ item }: { item: MindfulnessPractice }) => {
    const description = item.descricao && item.descricao.trim().length > 0 ? item.descricao : 'Sem descrição';
    // Fallback para imagem
    const imageSource = item.imageUrl ? { uri: item.imageUrl } : FALLBACK_IMAGES[item.id % FALLBACK_IMAGES.length];

    // Cores baseadas no nível
    let badgeBg = '#dcfce7'; // green-100
    let badgeText = '#166534'; // green-800
    if (item.nivel === 'intermediario') {
      badgeBg = '#fef9c3'; // yellow-100
      badgeText = '#854d0e'; // yellow-800
    } else if (item.nivel === 'avancado') {
      badgeBg = '#fee2e2'; // red-100
      badgeText = '#991b1b'; // red-800
    }

    // Dados mockados para visual igual ao Figma (já que a interface original pode não ter)
    const duration = "10min"; 
    const participants = Math.floor(Math.random() * 20) + 5;

    return (
      <View style={styles.practiceCard}>
        {/* Imagem e Badges */}
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

        {/* Conteúdo do Card */}
        <View style={styles.cardContent}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <View style={styles.durationRow}>
              <Zap size={14} color="#64748b" />
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          </View>
          
          <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>
          
          <View style={styles.cardFooter}>
            <View style={styles.participantsRow}>
              <Users size={14} color="#64748b" />
              <Text style={styles.footerText}>{participants} participantes</Text>
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
          onPress={() => {
            setError(null);
            setLoading(true);
            // Lógica de retry...
          }}
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
        ListEmptyComponent={(
          <View style={styles.centered}>
            <Text style={{color: '#9ca3af'}}>Nenhuma prática encontrada.</Text>
          </View>
        )}
      />

      {/* Modal de Detalhes Simplificado */}
      <Modal visible={showDetails} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
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
                    {selectedPractice.descricao}
                  </Text>

                  <TouchableOpacity 
                    style={styles.modalCloseButton} 
                    onPress={() => { setShowDetails(false); setSelectedPractice(null); }}
                  >
                    <Text style={styles.modalCloseText}>Fechar</Text>
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