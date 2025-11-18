import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';


import { AppLogo } from '../../components/ui/AppLogo'; // Para o logo no cabeçalho
import styles from './style';
import { AnalyticsPlayerListData, getAnalyticsPlayerListData } from '../../services/atletas';



/**
 * Componente Helper: Avatar do Atleta
 * Mostra a imagem se existir, ou as iniciais
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
  onCheckinPress: (id: number) => void,
  onHistoryPress: (id: number) => void
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
          onPress={() => onHistoryPress(player.id)}
        />
        <Button 
          title="Check-in"
          style={{ ...styles.footerButton, ...styles.footerButtonPrimary }}
          textStyle={styles.footerButtonTextPrimary}
          onPress={() => onCheckinPress(player.id)}
        />
      </View>
    </View>
  );
};


export default function PlayersScreen() {
  const [players, setPlayers] = useState<AnalyticsPlayerListData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Funções de placeholder para os botões
  const handleCheckin = (id: number) => {
    console.log("Navegar para Check-in do atleta:", id);
    // TODO: Navegar para a tela de Check-in, passando o ID
  };
  
  const handleHistory = (id: number) => {
    console.log("Navegar para Histórico do atleta:", id);
    // TODO: Navegar para uma nova tela de histórico
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
    </View>
  );
}