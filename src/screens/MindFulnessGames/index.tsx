import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
// Ícones oficiais e seguros
import { 
  Wind, 
  Target, 
  Brain, 
  Trophy, 
  Play, 
  RotateCcw 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// --- COMPONENTE: JOGO DE RESPIRAÇÃO (Lógica Principal) ---
const BreathingGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [instruction, setInstruction] = useState('Pronto para começar?');
  const [subInstruction, setSubInstruction] = useState('Sincronize sua respiração');
  const [cycleCount, setCycleCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [precision, setPrecision] = useState(100);
  
  // Valores de Animação
  const scaleAnim = useRef(new Animated.Value(1)).current; // Escala da bola
  const progressAnim = useRef(new Animated.Value(0)).current; // Barra de progresso
  const opacityAnim = useRef(new Animated.Value(1)).current; // Opacidade do texto

  // Timer Geral
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Controle do Jogo
  const startGame = () => {
    setIsActive(true);
    setCycleCount(0);
    setTimeElapsed(0);
    runBreathingCycle();
  };

  const stopGame = () => {
    setIsActive(false);
    setInstruction('Pronto para começar?');
    setSubInstruction('Sincronize sua respiração');
    
    // Resetar animações suavemente
    scaleAnim.stopAnimation();
    progressAnim.stopAnimation();
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    
    progressAnim.setValue(0);
  };

  // Lógica da Barra de Progresso
  const animateProgress = (duration: number) => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false, // width não suporta native driver
    }).start();
  };

  // Ciclo de Respiração 4-7-8
  const runBreathingCycle = () => {
    if (!isActive && timeElapsed > 0) return; // Checagem de segurança

    // 1. INSPIRE (4 segundos)
    setInstruction('Inspire');
    setSubInstruction('Pelo nariz (4s)');
    animateProgress(4000);

    Animated.timing(scaleAnim, {
      toValue: 1.5, // Bola cresce
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;

      // 2. SEGURE (7 segundos)
      setInstruction('Segure');
      setSubInstruction('Mantenha o ar (7s)');
      animateProgress(7000);

      // Pequena pulsação para indicar "segurando"
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, { toValue: 0.7, duration: 500, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 1, duration: 500, useNativeDriver: true })
        ]),
        { iterations: 7 }
      ).start();

      setTimeout(() => {
        opacityAnim.setValue(1); // Reset opacidade
        
        // 3. EXPIRE (8 segundos)
        setInstruction('Expire');
        setSubInstruction('Pela boca (8s)');
        animateProgress(8000);

        Animated.timing(scaleAnim, {
          toValue: 1, // Bola encolhe
          duration: 8000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            setCycleCount(c => c + 1);
            // Loop infinito se ainda ativo
            // Pequeno delay para garantir que o React processou o estado
            setTimeout(() => {
                // Verificação simples para continuar
               runBreathingCycle();
            }, 100);
          }
        });
      }, 7000);
    });
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.gameCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Respiração 4-7-8</Text>
        <Text style={styles.cardSubtitle}>Sincronize sua respiração com a bola</Text>
      </View>

      <View style={styles.cardContent}>
        {/* Visualizador (Bola) */}
        <View style={styles.visualizerArea}>
          <View style={styles.circleContainer}>
            {/* Sombra simulada */}
            <View style={styles.circleShadow} />
            
            <Animated.View 
              style={[
                styles.breathingCircle, 
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
              <Animated.View style={{ opacity: opacityAnim, alignItems: 'center' }}>
                <Wind size={32} color="#fff" style={{marginBottom: 4}} />
                <Text style={styles.circleText}>{isActive ? cycleCount : '0'} ciclos</Text>
              </Animated.View>
            </Animated.View>
          </View>
        </View>

        {/* Instruções */}
        <View style={styles.instructionArea}>
          <Text style={styles.mainInstruction}>{instruction}</Text>
          
          {/* Barra de Progresso */}
          <View style={styles.progressBarContainer}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
          
          <Text style={styles.subInstruction}>{subInstruction}</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#2563eb' }]}>{timeElapsed}s</Text>
            <Text style={styles.statLabel}>Tempo</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#16a34a' }]}>{cycleCount * 15}</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#ea580c' }]}>{precision}%</Text>
            <Text style={styles.statLabel}>Precisão</Text>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionButtons}>
          {!isActive ? (
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]} 
              onPress={startGame}
            >
              <Play size={18} color="#fff" />
              <Text style={styles.primaryButtonText}>Começar</Text>
            </TouchableOpacity>
          ) : (
             <TouchableOpacity 
              style={[styles.button, styles.stopButton]} 
              onPress={stopGame}
            >
              <Text style={styles.stopButtonText}>Parar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.button, styles.outlineButton]}
            onPress={stopGame}
          >
            <RotateCcw size={18} color="#0f172a" />
            <Text style={styles.outlineButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

// --- TELA PRINCIPAL ---
const MiniGamesScreen = () => {
  const [activeTab, setActiveTab] = useState('breathing');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Cabeçalho da Página */}
      <View style={styles.pageHeader}>
        <View style={styles.titleRow}>
          {/* Placeholder para Logo de Basquete */}
          <View style={styles.logoPlaceholder}>
             <Brain size={32} color="#ea580c" />
          </View>
          <Text style={styles.pageTitle}>Mini Jogos de Mindfulness</Text>
        </View>
        <Text style={styles.pageDescription}>
          Treine sua mente através de jogos interativos e divertidos
        </Text>
      </View>

      {/* Tabs (Segmented Control) */}
      <View style={styles.tabsWrapper}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'breathing' && styles.activeTab]}
            onPress={() => setActiveTab('breathing')}
          >
            <Wind size={16} color={activeTab === 'breathing' ? '#0f172a' : '#64748b'} />
            <Text style={[styles.tabText, activeTab === 'breathing' && styles.activeTabText]}>Respiração</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'focus' && styles.activeTab]}
            onPress={() => setActiveTab('focus')}
          >
            <Target size={16} color={activeTab === 'focus' ? '#0f172a' : '#64748b'} />
            <Text style={[styles.tabText, activeTab === 'focus' && styles.activeTabText]}>Foco</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'meditation' && styles.activeTab]}
            onPress={() => setActiveTab('meditation')}
          >
            <Brain size={16} color={activeTab === 'meditation' ? '#0f172a' : '#64748b'} />
            <Text style={[styles.tabText, activeTab === 'meditation' && styles.activeTabText]}>Meditação</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'ranking' && styles.activeTab]}
            onPress={() => setActiveTab('ranking')}
          >
            <Trophy size={16} color={activeTab === 'ranking' ? '#0f172a' : '#64748b'} />
            <Text style={[styles.tabText, activeTab === 'ranking' && styles.activeTabText]}>Ranking</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo das Abas */}
      <View style={styles.tabContent}>
        {activeTab === 'breathing' && <BreathingGame />}
        
        {activeTab !== 'breathing' && (
          <View style={styles.emptyState}>
            <Trophy size={48} color="#cbd5e1" />
            <Text style={styles.emptyStateText}>Em breve...</Text>
          </View>
        )}
      </View>

    </ScrollView>
  );
};

// --- ESTILOS (Baseados no Tailwind do Figma) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // bg-gray-50
  },
  contentContainer: {
    paddingBottom: 40,
  },
  
  // Header
  pageHeader: {
    padding: 24,
    paddingBottom: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#fff7ed', // orange-50
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 24, // text-3xl
    fontWeight: 'bold',
    color: '#0f172a',
    flexShrink: 1,
  },
  pageDescription: {
    fontSize: 16,
    color: '#64748b', // text-muted-foreground
    textAlign: 'center',
  },

  // Tabs
  tabsWrapper: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9', // bg-muted
    padding: 4,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#0f172a',
    fontWeight: '600',
  },

  // Game Card
  tabContent: {
    paddingHorizontal: 24,
  },
  gameCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  cardContent: {
    padding: 24,
  },

  // Visualizer (Bola)
  visualizerArea: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  circleContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleShadow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#60a5fa', // Sombra azul
    opacity: 0.2,
    transform: [{ scale: 0.9 }, { translateY: 10 }],
  },
  breathingCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#3b82f6', // blue-500 (Simulando gradiente com cor sólida vibrante)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 10,
  },
  circleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Instruções
  instructionArea: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  mainInstruction: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  subInstruction: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    maxWidth: 300,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#D55C15', // Primary
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },

  // Botões
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: '#D55C15',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  stopButton: {
    backgroundColor: '#ef4444',
  },
  stopButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  outlineButtonText: {
    color: '#0f172a',
    fontWeight: '600',
    marginLeft: 8,
  },

  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: '#94a3b8',
  }
});

export default MiniGamesScreen;