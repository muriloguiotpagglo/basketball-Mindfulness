import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal // Importar o Modal
} from 'react-native';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';


import { AppLogo } from '../../components/ui/AppLogo'; // Para o logo no cabeçalho
import styles from './style';
import { 
  AnalyticsPlayerListData, 
  getAnalyticsPlayerListData,
  getCheckinHistoryForUser, // Importar novas funções
  getCheckinForUserAndDay,
  CheckInData // Importar o novo tipo
} from '../../services/atletas';



/**
 * Componente Helper: Avatar do Atleta
 */
const PlayerAvatar = ({ avatar, name }: { avatar: string | null, name: string }) => {
  const getInitials = (nameStr: string) => {
    const names = nameStr.split(' ');
    const first = names[0] ? names[0][0] : '';
    const last = names.length > 1 ? names[names.length - 1][0] : '';
    return (first + last).toUpperCase();
  };

  if (avatar) {
    return <Image source={{ uri: avatar }} style={styles.avatarImage} />;
  }
  
  return (
    <View style={styles.avatarFallback}>
      <Text style={styles.avatarFallbackText}>{getInitials(name)}</Text>
    </View>
  );
};

/**
 * Componente Helper: Barra de Progresso
 */
const ProgressBar = ({ value, color }: { value: number, color: string }) => {
  const clampedValue = Math.max(0, Math.min(value, 100)); // Garante 0-100
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressFill, { width: `${clampedValue}%`, backgroundColor: color }]} />
    </View>
  );
};

/**
 * Componente Helper: Métrica Individual (Ex: Bem-estar)
 */
const MetricItem = ({ icon, color, label, value }: {
  icon: string, color: string, label: string, value: number
}) => (
  <View style={styles.metricItem}>
    <View style={styles.metricHeader}>
      <Icon name={icon as any} size={16} color={color} />
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
    <View style={styles.metricValueRow}>
      <ProgressBar value={value} color={color} />
      <Text style={styles.metricValue}>{value}%</Text>
    </View>
  </View>
);

/**
 * Componente Card: Card de um Atleta
 */
const PlayerCard = ({ player, onCheckinPress, onHistoryPress }: {
  player: AnalyticsPlayerListData,
  // Mudar props para passar o objeto 'player' inteiro
  onCheckinPress: (player: AnalyticsPlayerListData) => void,
  onHistoryPress: (player: AnalyticsPlayerListData) => void
}) => {
  
  // Formata a data do último check-in
  const getLastCheckinText = () => {
    if (!player.lastCheckinDate) return 'Nenhum check-in';
    
    const date = new Date(player.lastCheckinDate);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return `Hoje, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    // TODO: Adicionar lógica para "Ontem"
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.card}>
      {/* Header do Card */}
      <View style={styles.cardHeader}>
        <PlayerAvatar avatar={player.avatar} name={player.name} />
        <View style={styles.cardHeaderInfo}>
          <View style={styles.cardHeaderTop}>
            <View>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerPosition}>{player.position}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: player.statusColor + '20' }]}>
              <Text style={[styles.statusBadgeText, { color: player.statusColor }]}>
                {player.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Conteúdo (Métricas) */}
      <View style={styles.cardContent}>
        <MetricItem icon="heart" color="#ef4444" label="Bem-estar" value={player.metrics.wellbeing} />
        <MetricItem icon="trending-up" color="#f97316" label="Stress" value={player.metrics.stress} />
        <MetricItem icon="clock" color="#3b82f6" label="Sono" value={player.metrics.sleep} />
        <MetricItem icon="brain" color="#8b5cf6" label="Foco (Motivação)" value={player.metrics.focus} />
      </View>

      {/* Footer 1 (Stats) */}
      <View style={styles.cardFooterStats}>
        <View style={styles.footerStatItem}>
          <Icon name="calendar" size={16} color="#6b7280" />
          <Text style={styles.footerStatText}>{getLastCheckinText()}</Text>
        </View>
        <View style={styles.footerStatItem}>
          <Icon name="target" size={16} color="#10b981" />
          <Text style={styles.footerStatText}>{player.streak} dias</Text>
        </View>
      </View>
      
      {/* Footer 2 (Botões) */}
      <View style={styles.cardFooterActions}>
        <Button 
          title="Ver Histórico" 
          variant="outline"
          style={styles.footerButton}
          textStyle={styles.footerButtonText}
          // Chamar a prop com o 'player'
          onPress={() => onHistoryPress(player)}
        />
        <Button 
          title="Check-in"
          style={{ ...styles.footerButton, ...styles.footerButtonPrimary }}
          textStyle={styles.footerButtonTextPrimary}
          // Chamar a prop com o 'player'
          onPress={() => onCheckinPress(player)}
        />
      </View>
    </View>
  );
};


// --------------------------------------------------------------------
// --- NOVO COMPONENTE: MODAL DE HISTÓRICO ---
// --------------------------------------------------------------------
const HistoryModal = ({ visible, onClose, player }: {
  visible: boolean,
  onClose: () => void,
  player: AnalyticsPlayerListData | null
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CheckInData[]>([]);

  useEffect(() => {
    // Só busca se o modal estiver visível e tiver um jogador
    if (visible && player) {
      const fetchHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getCheckinHistoryForUser(player.id);
          setHistory(data);
        } catch (err: any) {
          setError(err.message || "Erro ao buscar histórico.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchHistory();
    }
  }, [visible, player]); // Dependências: Roda quando visible ou player mudam

  // Helper para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderModalContent = () => {
    if (isLoading) {
      return (
        <View style={styles.modalCentered}>
          <ActivityIndicator size="large" color="#D55C15" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.modalCentered}>
          <Text style={styles.modalErrorText}>{error}</Text>
        </View>
      );
    }
    
    if (history.length === 0) {
      return (
        <View style={styles.modalCentered}>
          <Text style={styles.modalEmptyText}>Nenhum check-in encontrado.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyItemDate}>{formatDate(item.data)}</Text>
            <Text style={styles.historyItemMetrics}>
              Humor: {item.humorPre} | Energia: {item.energia} | Sono: {item.sono} | Stress: {item.stress} | Motivação {item.motivacao}
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Histórico de {player?.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Icon name="x" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            {renderModalContent()}
          </View>
        </View>
      </View>
    </Modal>
  );
};


// --------------------------------------------------------------------
// --- NOVO COMPONENTE: MODAL DE CHECK-IN ---
// --------------------------------------------------------------------
const CheckinModal = ({ visible, onClose, player }: {
  visible: boolean,
  onClose: () => void,
  player: AnalyticsPlayerListData | null
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkin, setCheckin] = useState<CheckInData | null>(null);

  useEffect(() => {
    if (visible && player) {
      const fetchCheckin = async () => {
        setIsLoading(true);
        setError(null);
        setCheckin(null);
        try {
          // Pega a data de hoje no formato YYYY-MM-DD
          const today = new Date().toISOString().split('T')[0];
          // Busca o check-in do dia para o usuário
          const data = await getCheckinForUserAndDay(player.id, today);
          
          // Pega o primeiro check-in do dia (provavelmente só haverá 1)
          if (data.length > 0) {
            setCheckin(data[0]);
          } else {
            setCheckin(null); // Nenhum check-in hoje
          }
        } catch (err: any) {
          setError(err.message || "Erro ao buscar check-in do dia.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCheckin();
    }
  }, [visible, player]);

  const renderModalContent = () => {
    if (isLoading) {
      return (
        <View style={styles.modalCentered}>
          <ActivityIndicator size="large" color="#D55C15" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.modalCentered}>
          <Text style={styles.modalErrorText}>{error}</Text>
        </View>
      );
    }
    
    if (!checkin) {
      return (
        <View style={styles.modalCentered}>
          <Text style={styles.modalEmptyText}>Nenhum check-in realizado hoje.</Text>
          {/* TODO: Você pode adicionar um botão aqui para *criar* um check-in */}
        </View>
      );
    }

    // Se encontrou, mostra os detalhes
    return (
      <ScrollView>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Humor (Pré)</Text>
          <Text style={styles.checkinDetailValue}>{checkin.humorPre}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Nível de Stress</Text>
          <Text style={styles.checkinDetailValue}>{checkin.stress}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Energia</Text>
          <Text style={styles.checkinDetailValue}>{checkin.energia}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Condicao Física</Text>
          <Text style={styles.checkinDetailValue}>{checkin.condicaoFisica}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Qualidade do Sono</Text>
          <Text style={styles.checkinDetailValue}>{checkin.sono}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Motivação</Text>
          <Text style={styles.checkinDetailValue}>{checkin.motivacao}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Sono</Text>
          <Text style={styles.checkinDetailValue}>{checkin.sono}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Satisfação Pessoal</Text>
          <Text style={styles.checkinDetailValue}>{checkin.satisfacaoPessoal}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Alimentação</Text>
          <Text style={styles.checkinDetailValue}>{checkin.alimentacao}</Text>
        </View>
        <View style={styles.checkinDetailRow}>
          <Text style={styles.checkinDetailLabel}>Preocupação</Text>
          <Text style={styles.checkinDetailValue}>{checkin.preocupacao}</Text>
        </View>
        {checkin.intensidadeTreino && (
          <View style={styles.checkinDetailRow}>
            <Text style={styles.checkinDetailLabel}>Intensidade do Treino (Pós)</Text>
            <Text style={styles.checkinDetailValue}>{checkin.intensidadeTreino}</Text>
          </View>
        )}
        {checkin.humorPos && (
          <View style={styles.checkinDetailRow}>
            <Text style={styles.checkinDetailLabel}>Humor (Pós)</Text>
            <Text style={styles.checkinDetailValue}>{checkin.humorPos}</Text>
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Check-in de {player?.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Icon name="x" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Text style={[styles.modalEmptyText, {paddingVertical: 0, paddingBottom: 10}]}>
              Data: {new Date().toLocaleDateString('pt-BR')}
            </Text>
            {renderModalContent()}
          </View>
        </View>
      </View>
    </Modal>
  );
};


// --------------------------------------------------------------------
// --- COMPONENTE PRINCIPAL: PlayersScreen ---
// --------------------------------------------------------------------
export default function PlayersScreen() {
  const [players, setPlayers] = useState<AnalyticsPlayerListData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Adicionar estados para controlar os modais
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [isCheckinModalVisible, setIsCheckinModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<AnalyticsPlayerListData | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAnalyticsPlayerListData();
      setPlayers(data);
    } catch (err: any) {
      console.error("Erro ao buscar lista de atletas:", err);
      setError(err.message || "Não foi possível carregar os atletas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Busca apenas uma vez

  // Atualizar handlers para abrir os modais
  const handleCheckin = (player: AnalyticsPlayerListData) => {
    console.log("Abrir Check-in modal para:", player.name);
    setSelectedPlayer(player);
    setIsCheckinModalVisible(true);
  };
  
  const handleHistory = (player: AnalyticsPlayerListData) => {
    console.log("Abrir Histórico modal para:", player.name);
    setSelectedPlayer(player);
    setIsHistoryModalVisible(true);
  };


  // --- RENDERIZAÇÃO ---

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#D55C15" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Tentar Novamente" onPress={fetchData} />
        </View>
      );
    }

    if (players.length === 0) {
      return (
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Nenhum atleta encontrado.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerCard 
            player={item}
            // Passar os novos handlers
            onCheckinPress={handleCheckin}
            onHistoryPress={handleHistory}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <AppLogo size={32} />
          <Text style={styles.mainTitle}>Perfis dos Atletas</Text>
        </View>
      </View>
      
      {renderContent()}

      {/* Adicionar os Modais à tela */}
      {/* Eles só serão renderizados se um jogador for selecionado */}
      {selectedPlayer && (
        <>
          <HistoryModal
            visible={isHistoryModalVisible}
            onClose={() => setIsHistoryModalVisible(false)}
            player={selectedPlayer}
          />
          <CheckinModal
            visible={isCheckinModalVisible}
            onClose={() => setIsCheckinModalVisible(false)}
            player={selectedPlayer}
          />
        </>
      )}
    </View>
  );
}