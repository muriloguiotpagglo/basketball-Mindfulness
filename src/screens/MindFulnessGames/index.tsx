import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Animated, 
  Easing,
  Image
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import styles from "./styles";

const { width, height } = Dimensions.get('window');

const FeatherIcon = Icon;

const basketballLogoUri = 'https://placehold.co/100x100/f97316/ffffff?text=B+Logo';
const alienFaceUri = 'https://placehold.co/100x100/3b82f6/ffffff?text=Alien';

interface Player {
  id: string;
  name: string;
  avatar: string;
  totalScore: number;
  breathingBest: number;
  focusBest: number;
  meditationMinutes: number;
  streak: number;
}

const mockPlayers: Player[] = [
  { id: "1", name: "João Silva", avatar: "JS", totalScore: 2450, breathingBest: 96, focusBest: 89, meditationMinutes: 120, streak: 7 },
  { id: "2", name: "Pedro Lima", avatar: "PL", totalScore: 2380, breathingBest: 94, focusBest: 92, meditationMinutes: 135, streak: 15 },
  { id: "3", name: "Maria Santos", avatar: "MS", totalScore: 2290, breathingBest: 91, focusBest: 88, meditationMinutes: 98, streak: 12 },
  { id: "4", name: "Ana Costa", avatar: "AC", totalScore: 2150, breathingBest: 87, focusBest: 85, meditationMinutes: 87, streak: 3 },
  { id: "5", name: "Carlos Mendes", avatar: "CM", totalScore: 2080, breathingBest: 89, focusBest: 82, meditationMinutes: 76, streak: 9 }
];


const Card: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.cardHeader}>{children}</View>
);

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.cardTitle}>{children}</Text>
);

const CardContent: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <View style={[styles.cardContent, style]}>{children}</View>
);

const Button: React.FC<{ 
  title: string; 
  onPress: () => void; 
  iconName?: string; 
  variant?: 'default' | 'outline';
  disabled?: boolean;
}> = ({ title, onPress, iconName, variant = 'default', disabled = false }) => (
  <TouchableOpacity
    style={[
      styles.button, 
      variant === 'outline' && styles.buttonOutline, 
      disabled && styles.buttonDisabled
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    {iconName && <FeatherIcon name={iconName} size={16} color={variant === 'outline' ? '#f97316' : '#fff'} style={{ marginRight: 8 }} />}
    <Text style={[styles.buttonText, variant === 'outline' && styles.buttonOutlineText]}>{title}</Text>
  </TouchableOpacity>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const Progress: React.FC<{ value: number }> = ({ value }) => (
  <View style={styles.progressBarBackground}>
    <View style={[styles.progressBarFill, { width: `${value}%` }]} />
  </View>
);

function BreathingGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const [cycle, setCycle] = useState(0);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimeRef = useRef(0);
  const ballScaleAnim = useRef(new Animated.Value(0.5)).current;

  const phases = {
    inhale: { duration: 4000, instruction: "Inspire pelo nariz", color: "#3b82f6" }, // blue
    hold: { duration: 7000, instruction: "Segure a respiração", color: "#a855f7" }, // purple
    exhale: { duration: 8000, instruction: "Expire pela boca", color: "#10b981" }, // green
    rest: { duration: 1000, instruction: "Relaxe", color: "#6b7280" } // gray
  };

  const currentPhase = phases[phase];
  const totalPhaseDuration = currentPhase.duration;

  const animateBall = (startScale: number, endScale: number, duration: number) => {
    ballScaleAnim.setValue(startScale);
    Animated.timing(ballScaleAnim, {
      toValue: endScale,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isPlaying) {
      let startScale = 0.5;
      let endScale = 0.5;
      if (phase === 'inhale') {
        startScale = 0.5; endScale = 1.0;
      } else if (phase === 'exhale') {
        startScale = 1.0; endScale = 0.5;
      } else if (phase === 'hold') {
        startScale = 1.0; endScale = 1.0;
      } else if (phase === 'rest') {
        startScale = 0.5; endScale = 0.5;
      }
      animateBall(startScale, endScale, totalPhaseDuration);

      intervalRef.current = setInterval(() => {
        phaseTimeRef.current += 100;
        setGameTime(prev => prev + 0.1);

        if (phaseTimeRef.current >= totalPhaseDuration) {
          phaseTimeRef.current = 0;
          
          if (phase === "rest") {
            setCycle(prev => prev + 1);
            setScore(prev => prev + 100); 
            setPhase("inhale");
          } else {
            const nextPhases: { [key: string]: "inhale" | "hold" | "exhale" | "rest" } = { 
              inhale: "hold", 
              hold: "exhale", 
              exhale: "rest" 
            };
            setPhase(nextPhases[phase]);
          }
        }
      }, 100);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, phase, totalPhaseDuration]);

  const handleStart = () => {
    setIsPlaying(true);
    setPhase("inhale");
    setCycle(0);
    setScore(0);
    setGameTime(0);
    phaseTimeRef.current = 0;
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    Animated.timing(ballScaleAnim, { toValue: 0.5, duration: 300, useNativeDriver: true }).start();
  };

  const handleReset = () => {
    handleStop();
    setPhase("inhale");
    setCycle(0);
    setScore(0);
    setGameTime(0);
    phaseTimeRef.current = 0;
  };

  const progressValue = (phaseTimeRef.current / currentPhase.duration) * 100;

  const getPhaseColorStyle = () => {
    const color = currentPhase.color;
    return { 
      backgroundColor: color,
      shadowColor: color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 10,
      elevation: 10,
    };
  };

  return (
    <View style={styles.gameWrapper}>
      <Card>
        <CardHeader style={styles.cardHeaderCentered}>
          <CardTitle>Respiração 4-7-8</CardTitle>
          <Text style={styles.mutedText}>Sincronize sua respiração com a bola</Text>
        </CardHeader>
        <CardContent style={styles.gameContent}>
          <View style={styles.breathingBallContainer}>
            <Animated.View
              style={[
                styles.breathingBall,
                getPhaseColorStyle(),
                { transform: [{ scale: ballScaleAnim }] }
              ]}
            >
              <View style={styles.breathingBallInner}>
                <FeatherIcon name="wind" size={32} color="white" />
                <Text style={styles.breathingBallText}>{cycle} ciclos</Text>
              </View>
            </Animated.View>
          </View>

          <View style={styles.phaseInfo}>
            <Text style={styles.phaseInstruction}>{currentPhase.instruction}</Text>
            <Progress value={progressValue} />
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#3b82f6' }]}>{Math.round(gameTime)}s</Text>
              <Text style={styles.statLabel}>Tempo</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>{score}</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#f97316' }]}>100%</Text>
              <Text style={styles.statLabel}>Precisão</Text>
            </View>
          </View>

          <View style={styles.controls}>
            {!isPlaying ? (
              <Button title="Começar" onPress={handleStart} iconName="play" />
            ) : (
              <Button title="Pausar" onPress={handleStop} iconName="pause" variant="outline" />
            )}
            <Button title="Reiniciar" onPress={handleReset} iconName="rotate-ccw" variant="outline" />
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function FocusGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startPulse = () => {
    pulseAnim.setValue(1);
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  const stopPulse = () => {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      startPulse();
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        if (timeLeft % 2 === 0) {
          setTargetPosition({
            x: Math.random() * 70 + 15, 
            y: Math.random() * 70 + 15
          });
        }
      }, 1000);
    } else if (timeLeft === 0 && intervalRef.current) {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
      stopPulse();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopPulse();
    };
  }, [isPlaying, timeLeft]);

  const handleTargetClick = () => {
    if (!isPlaying) return;
    setHits(prev => prev + 1);
    setScore(prev => prev + 100);
    setTargetPosition({
      x: Math.random() * 70 + 15,
      y: Math.random() * 70 + 15
    });
  };

  const handleAreaClick = () => {
    if (!isPlaying) return;
    setMisses(prev => prev + 1);
    setScore(prev => Math.max(0, prev - 20));
  };

  const handleStart = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setHits(0);
    setMisses(0);
    setTargetPosition({ x: 50, y: 50 });
  };

  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;

  return (
    <View style={styles.gameWrapper}>
      <Card>
        <CardHeader style={styles.cardHeaderCentered}>
          <CardTitle>Jogo de Foco</CardTitle>
          <Text style={styles.mutedText}>Toque nos alvos para treinar concentração</Text>
        </CardHeader>
        <CardContent style={styles.gameContent}>
          <View style={styles.statsGrid4Col}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#3b82f6' }]}>{timeLeft}s</Text>
              <Text style={styles.statLabel}>Tempo</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#10b981' }]}>{score}</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#f97316' }]}>{hits}</Text>
              <Text style={styles.statLabel}>Acertos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#a855f7' }]}>{accuracy}%</Text>
              <Text style={styles.statLabel}>Precisão</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.focusGameArea}
            onPress={handleAreaClick}
            activeOpacity={1}
            disabled={!isPlaying}
          >
            {isPlaying && (
              <Animated.View
                style={[
                  styles.focusTarget,
                  { 
                    left: `${targetPosition.x}%`, 
                    top: `${targetPosition.y}%`, 
                    transform: [{ translateX: -32 }, { translateY: -32 }, { scale: pulseAnim }]
                  }
                ]}
              >
                <TouchableOpacity onPress={handleTargetClick} style={styles.targetInner}>
                    <Image source={{ uri: basketballLogoUri }} style={styles.targetImage} />
                </TouchableOpacity>
              </Animated.View>
            )}
            
            {!isPlaying && timeLeft === 60 && (
              <View style={styles.gamePlaceholder}>
                <Image source={{ uri: basketballLogoUri }} style={styles.placeholderImage} />
                <Text style={styles.placeholderText}>Toque em "Começar" para iniciar o jogo</Text>
              </View>
            )}

            {!isPlaying && timeLeft === 0 && (
              <View style={styles.gamePlaceholder}>
                <FeatherIcon name="trophy" size={50} color="#f59e0b" style={{ marginBottom: 10 }} />
                <Text style={styles.placeholderText}>Fim de Jogo! Pontuação: {score}</Text>
                <Button title="Jogar Novamente" onPress={handleStart} style={{ marginTop: 15 }} />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.controls}>
            <Button 
              title={isPlaying ? "Jogando..." : timeLeft === 0 ? "Reiniciar" : "Começar"} 
              onPress={handleStart} 
              iconName="play"
              disabled={isPlaying && timeLeft > 0}
            />
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function MeditationTimer() {
  const [duration, setDuration] = useState(5); 
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setIsCompleted(true);
            setIsActive(false);
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setIsCompleted(false);
    if (timeLeft === 0 || timeLeft === duration * 60) {
       setTimeLeft(duration * 60);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsCompleted(false);
    setTimeLeft(duration * 60);
  };

  const handleSetDuration = (newDuration: number) => {
    if (!isActive) {
      setDuration(newDuration);
      setTimeLeft(newDuration * 60);
      setIsCompleted(false);
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1.0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      Animated.timing(pulseAnim, {
        toValue: 1.0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive]);


  return (
    <View style={styles.gameWrapper}>
      <Card>
        <CardHeader style={styles.cardHeaderCentered}>
          <CardTitle>Timer de Meditação</CardTitle>
          <Text style={styles.mutedText}>Mantenha a calma e foque na respiração</Text>
        </CardHeader>
        <CardContent style={styles.gameContent}>
          <View style={styles.timerCircleContainer}>
            <Animated.View style={[styles.timerCircleBackground, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.timerCircleForeground}>
                <FeatherIcon name="brain" size={48} color="white" style={{ marginBottom: 8 }} />
                <Text style={styles.timerTimeText}>{formatTime(timeLeft)}</Text>
                
                <View style={[
                    StyleSheet.absoluteFill, 
                    {
                        backgroundColor: isCompleted ? '#22c55e' : 'rgba(255, 255, 255, 0.2)',
                        opacity: isCompleted ? 1 : 0.8,
                        transform: [{ translateY: `${100 - progress}%` }], 
                        borderBottomLeftRadius: 100,
                        borderBottomRightRadius: 100,
                        borderTopLeftRadius: progress > 0 ? 100 : 0,
                        borderTopRightRadius: progress > 0 ? 100 : 0,
                    }
                ]} />
                <View style={styles.timerCircleInnerContent}>
                    <FeatherIcon name="brain" size={48} color="white" style={{ marginBottom: 8 }} />
                    <Text style={styles.timerTimeText}>{formatTime(timeLeft)}</Text>
                </View>

              </View>
            </Animated.View>
          </View>

          {isCompleted && (
            <View style={styles.completionMessage}>
              <FeatherIcon name="trophy" size={24} color="#10b981" style={{ marginBottom: 4 }} />
              <Text style={styles.completionTitle}>Parabéns!</Text>
              <Text style={styles.completionText}>Você completou {duration} minutos de meditação</Text>
            </View>
          )}

          <View style={styles.durationButtons}>
            {[3, 5, 10, 15].map(min => (
              <Button
                key={min}
                title={`${min} min`}
                onPress={() => handleSetDuration(min)}
                variant="outline"
                style={duration === min ? styles.durationButtonActive : {}}
              />
            ))}
          </View>

          <View style={styles.controls}>
            {!isActive ? (
              <Button title="Começar" onPress={handleStart} iconName="play" />
            ) : (
              <Button title="Pausar" onPress={handlePause} iconName="pause" variant="outline" />
            )}
            <Button title="Reiniciar" onPress={handleReset} iconName="rotate-ccw" variant="outline" />
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function Rankings() {
  const sortedPlayers = [...mockPlayers].sort((a, b) => b.totalScore - a.totalScore);

  const getRankStyle = (index: number) => {
    if (index === 0) return { numberBg: '#fcd34d', numberColor: '#fff', bg: '#fff7ed', borderColor: '#fde68a' }; // Gold
    if (index === 1) return { numberBg: '#9ca3af', numberColor: '#fff', bg: '#f3f4f6', borderColor: '#d1d5db' }; // Silver
    if (index === 2) return { numberBg: '#f97316', numberColor: '#fff', bg: '#fff7ed', borderColor: '#fed7aa' }; // Bronze
    return { numberBg: '#e5e7eb', numberColor: '#6b7280', bg: '#fff', borderColor: '#e5e7eb' };
  };

  return (
    <View style={styles.gameWrapper}>
      <Card>
        <CardHeader>
          <CardTitle style={styles.rankingHeaderTitle}>
            <FeatherIcon name="trophy" size={20} color="#f59e0b" style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Ranking Geral</Text>
            <Image source={{ uri: basketballLogoUri }} style={styles.rankingLogo} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.rankingList}>
            {sortedPlayers.map((player, index) => {
              const rankStyle = getRankStyle(index);
              return (
                <View
                  key={player.id}
                  style={[styles.rankingItem, { backgroundColor: rankStyle.bg, borderColor: rankStyle.borderColor }]}
                >
                  <View style={styles.flexRow}>
                    <View style={[styles.rankNumber, { backgroundColor: rankStyle.numberBg }]}>
                      <Text style={[styles.rankNumberText, { color: rankStyle.numberColor }]}>{index + 1}</Text>
                    </View>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarFallback}>{player.avatar}</Text>
                    </View>
                    <View>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <View style={styles.playerStats}>
                        <Text style={styles.playerStatText}>🔥 {player.streak} dias</Text>
                        <Text style={styles.playerStatText}>🧘 {player.meditationMinutes}min</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.scoreDetails}>
                    <Text style={[styles.scoreValue, { color: '#f97316' }]}>{player.totalScore}</Text>
                    <Text style={styles.scoreLabel}>pontos</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </CardContent>
      </Card>

      <View style={styles.statsGridHalf}>
        <Card>
          <CardHeader>
            <CardTitle style={styles.rankingHeaderTitle}>
              <FeatherIcon name="wind" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
              <Text style={styles.cardTitle}>Melhor Respiração</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.top3List}>
              {[...mockPlayers].sort((a, b) => b.breathingBest - a.breathingBest).slice(0, 3).map((player, index) => (
                <View key={player.id} style={styles.top3Item}>
                  <View style={styles.flexRow}>
                    <Text style={styles.top3RankText}>#{index + 1}</Text>
                    <View style={[styles.avatar, { width: 32, height: 32 }]}>
                      <Text style={[styles.avatarFallback, { fontSize: 10, backgroundColor: '#dbeafe', color: '#2563eb' }]}>
                        {player.avatar}
                      </Text>
                    </View>
                    <Text style={styles.top3Name}>{player.name}</Text>
                  </View>
                  <Badge>{player.breathingBest}%</Badge>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={styles.rankingHeaderTitle}>
              <FeatherIcon name="target" size={20} color="#ef4444" style={{ marginRight: 8 }} />
              <Text style={styles.cardTitle}>Melhor Foco</Text>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.top3List}>
              {[...mockPlayers].sort((a, b) => b.focusBest - a.focusBest).slice(0, 3).map((player, index) => (
                <View key={player.id} style={styles.top3Item}>
                  <View style={styles.flexRow}>
                    <Text style={styles.top3RankText}>#{index + 1}</Text>
                    <View style={[styles.avatar, { width: 32, height: 32 }]}>
                      <Text style={[styles.avatarFallback, { fontSize: 10, backgroundColor: '#fee2e2', color: '#dc2626' }]}>
                        {player.avatar}
                      </Text>
                    </View>
                    <Text style={styles.top3Name}>{player.name}</Text>
                  </View>
                  <Badge>{player.focusBest}%</Badge>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}

// Game 5: Alien Basketball (Simplificado para Mobile)
function AlienBasketballGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player1Aim, setPlayer1Aim] = useState(50);
  const [player2Aim, setPlayer2Aim] = useState(50);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const aimIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const p1AimAnim = useRef(new Animated.Value(50)).current;
  const p2AimAnim = useRef(new Animated.Value(50)).current;

  // Animação contínua da mira
  const startAimAnimation = (aimAnim: Animated.Value) => {
    aimAnim.setValue(10); // Começa na base da barra (10%)
    Animated.loop(
      Animated.sequence([
        Animated.timing(aimAnim, {
          toValue: 90, // Vai até o topo (90%)
          duration: 1500, // 1.5 segundos para ir de 10 a 90
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(aimAnim, {
          toValue: 10, // Volta para a base
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Sincroniza o estado de mira com o valor animado para o cálculo do score
    aimAnim.addListener(({ value }) => {
        if (aimAnim === p1AimAnim) {
            setPlayer1Aim(value);
        } else {
            setPlayer2Aim(value);
        }
    });
  };

  useEffect(() => {
    if (isPlaying) {
      startAimAnimation(p1AimAnim);
      startAimAnimation(p2AimAnim);
      
      timeIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      p1AimAnim.stopAnimation();
      p2AimAnim.stopAnimation();
    }

    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
      p1AimAnim.stopAnimation();
      p2AimAnim.stopAnimation();
      p1AimAnim.removeAllListeners();
      p2AimAnim.removeAllListeners();
    };
  }, [isPlaying]);

  const calculateShootScore = (aim: number): number => {
    const perfectZone = 50;
    const distance = Math.abs(aim - perfectZone);
    if (distance <= 5) return 3; // 3 PTS
    if (distance <= 15) return 2; // 2 PTS
    if (distance <= 25) return 1; // 1 PT
    return 0; // ERRO
  };
  
  const getAimColor = (aim: number) => {
    const score = calculateShootScore(aim);
    if (score === 3) return '#22c55e'; // green-500
    if (score === 2) return '#eab308'; // yellow-500
    if (score === 1) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  const getAimLabel = (aim: number) => {
    const score = calculateShootScore(aim);
    if (score === 3) return '3 PTS';
    if (score === 2) return '2 PTS';
    if (score === 1) return '1 PT';
    return 'ERRO';
  };

  const handleShoot = (player: 1 | 2) => {
    if (!isPlaying) return;
    
    const aim = player === 1 ? player1Aim : player2Aim;
    const points = calculateShootScore(aim);
    
    if (player === 1) {
      setPlayer1Score(prev => prev + points);
    } else {
      setPlayer2Score(prev => prev + points);
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setTimeLeft(60);
  };
  
  const renderAimBar = (aimAnim: Animated.Value, aimValue: number, player: 1 | 2) => (
    <View style={styles.aimBarWrapper}>
      <View style={styles.aimBarBackground}>
        {/* Zonas de pontuação */}
        <View style={[styles.aimZone, { height: '10%', top: '45%', backgroundColor: 'rgba(34, 197, 94, 0.4)' }]} /> {/* 3 PTS */}
        <View style={[styles.aimZone, { height: '30%', top: '35%', backgroundColor: 'rgba(234, 179, 8, 0.3)' }]} />  {/* 2 PTS */}
        <View style={[styles.aimZone, { height: '50%', top: '25%', backgroundColor: 'rgba(249, 115, 22, 0.2)' }]} /> {/* 1 PT */}
        
        {/* Indicador de mira animado */}
        <Animated.View
          style={[
            styles.aimIndicator,
            { top: aimAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              }),
              backgroundColor: getAimColor(aimValue)
            }
          ]}
        >
          <Text style={styles.aimIndicatorText}>{getAimLabel(aimValue)}</Text>
        </Animated.View>
      </View>
      
      <View style={styles.aimBarTextWrapper}>
          <Text style={[styles.aimBarText, { color: player === 1 ? '#3b82f6' : '#a855f7' }]}>
            Jogador {player}
          </Text>
          <FeatherIcon name={player === 1 ? "arrow-right" : "arrow-left"} size={16} color="#6b7280" />
      </View>
    </View>
  );


  return (
    <View style={styles.gameWrapper}>
      <Card>
        <CardHeader style={styles.cardHeaderCentered}>
          <CardTitle>Alien Basketball - 2 Jogadores</CardTitle>
          <Text style={styles.mutedText}>Acerte a mira no momento certo para fazer cestas!</Text>
        </CardHeader>
        <CardContent style={styles.gameContent}>
          {/* Placar e Timer */}
          <View style={styles.scoreBoard}>
            <View style={styles.scoreItemBlue}>
              <Text style={styles.scoreLabel}>Jogador 1</Text>
              <Text style={styles.scoreValueBig}>{player1Score}</Text>
              <Text style={styles.scoreHint}>Toque Esquerda</Text>
            </View>
            <View style={styles.scoreItemOrange}>
              <Text style={styles.scoreLabel}>Tempo</Text>
              <Text style={styles.scoreValueBig}>{timeLeft}s</Text>
            </View>
            <View style={styles.scoreItemPurple}>
              <Text style={styles.scoreLabel}>Jogador 2</Text>
              <Text style={styles.scoreValueBig}>{player2Score}</Text>
              <Text style={styles.scoreHint}>Toque Direita</Text>
            </View>
          </View>

          {/* Área do Jogo e Miras */}
          <View style={styles.alienGameArea}>
            {/* Player 1 (Left) */}
            <View style={styles.alienPlayerContainer}>
                <Image source={{ uri: alienFaceUri }} style={styles.alienImage} />
                <View style={[styles.alienBody, { backgroundColor: '#3b82f6' }]} />
            </View>
            
            {/* Mira e Quadra 2D central */}
            <View style={styles.courtAndAimContainer}>
                {renderAimBar(p1AimAnim, player1Aim, 1)}
                <View style={styles.courtCenter}>
                    <Text style={styles.courtText}>QUADRA</Text>
                    <Image source={{ uri: basketballLogoUri }} style={styles.courtLogo} />
                </View>
                {renderAimBar(p2AimAnim, player2Aim, 2)}
            </View>
            
            {/* Player 2 (Right) */}
            <View style={styles.alienPlayerContainer}>
                <Image source={{ uri: alienFaceUri }} style={styles.alienImage} />
                <View style={[styles.alienBody, { backgroundColor: '#a855f7' }]} />
            </View>
            
            {/* Placeholder / Fim de Jogo */}
            {!isPlaying && (
              <View style={styles.alienGameOverlay}>
                <FeatherIcon name="users" size={50} color="#6b7280" style={{ marginBottom: 10 }} />
                {timeLeft === 0 ? (
                  <>
                    <Text style={styles.overlayTitle}>Fim de Jogo!</Text>
                    <Text style={styles.overlaySubtitle}>{player1Score > player2Score ? '🎉 Jogador 1 Venceu!' : player2Score > player1Score ? '🎉 Jogador 2 Venceu!' : '🤝 Empate!'}</Text>
                    <Text style={styles.overlayScore}>{player1Score} - {player2Score}</Text>
                  </>
                ) : (
                  <Text style={styles.overlayTitle}>Clique em "Começar" para iniciar</Text>
                )}
              </View>
            )}

          </View>

          {/* Controles para Mobile (Toque) */}
          <View style={styles.gameControls}>
            <Button 
              title="Jogador 1 (Toque)"
              onPress={() => handleShoot(1)}
              disabled={!isPlaying}
              style={styles.player1Button}
            />
            <Button 
              title="Jogador 2 (Toque)"
              onPress={() => handleShoot(2)}
              disabled={!isPlaying}
              style={styles.player2Button}
            />
          </View>
          
          <View style={styles.controls}>
            <Button 
              title={timeLeft === 0 ? "Jogar Novamente" : isPlaying ? "Jogando..." : "Começar"}
              onPress={handleStart}
              iconName="play"
              disabled={isPlaying && timeLeft > 0}
            />
          </View>

          {/* Legenda */}
          <View style={styles.legendBox}>
            <Text style={styles.legendTitle}>Como Jogar</Text>
            <View style={styles.legendGrid}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#22c55e' }]} />
                <Text style={styles.legendText}>Zona Perfeita (3 pts)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#eab308' }]} />
                <Text style={styles.legendText}>Zona Boa (2 pts)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#f97316' }]} />
                <Text style={styles.legendText}>Zona OK (1 pt)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#ef4444' }]} />
                <Text style={styles.legendText}>Errou (0 pts)</Text>
              </View>
            </View>
            <Text style={styles.legendHint}>Toque nos botões de Jogador 1 ou 2 no momento certo!</Text>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

// --- 6. WRAPPER PRINCIPAL ---

export function MindfulnessGames() {
  const [activeTab, setActiveTab] = useState("breathing");

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Image source={{ uri: basketballLogoUri }} style={styles.headerLogo} />
          <Text style={styles.pageTitle}>Mini Jogos de Mindfulness</Text>
        </View>
        <Text style={styles.mutedText}>
          Treine sua mente através de jogos interativos e divertidos
        </Text>
      </View>

      <View style={styles.tabsListWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsList}>
          <TouchableOpacity
            style={[styles.tabTrigger, activeTab === 'breathing' && styles.tabTriggerActive]}
            onPress={() => setActiveTab('breathing')}
          >
            <FeatherIcon name="wind" size={16} color={activeTab === 'breathing' ? '#f97316' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'breathing' && styles.tabTextActive]}>Respiração</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabTrigger, activeTab === 'focus' && styles.tabTriggerActive]}
            onPress={() => setActiveTab('focus')}
          >
            <FeatherIcon name="target" size={16} color={activeTab === 'focus' ? '#f97316' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'focus' && styles.tabTextActive]}>Foco</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabTrigger, activeTab === 'alien' && styles.tabTriggerActive]}
            onPress={() => setActiveTab('alien')}
          >
            <FeatherIcon name="users" size={16} color={activeTab === 'alien' ? '#f97316' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'alien' && styles.tabTextActive]}>2 Players</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabTrigger, activeTab === 'meditation' && styles.tabTriggerActive]}
            onPress={() => setActiveTab('meditation')}
          >
            <FeatherIcon name="brain" size={16} color={activeTab === 'meditation' ? '#f97316' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'meditation' && styles.tabTextActive]}>Meditação</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabTrigger, activeTab === 'ranking' && styles.tabTriggerActive]}
            onPress={() => setActiveTab('ranking')}
          >
            <FeatherIcon name="trophy" size={16} color={activeTab === 'ranking' ? '#f97316' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'ranking' && styles.tabTextActive]}>Ranking</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.tabsContentWrapper}>
        {activeTab === 'breathing' && <BreathingGame />}
        {activeTab === 'focus' && <FocusGame />}
        {activeTab === 'alien' && <AlienBasketballGame />}
        {activeTab === 'meditation' && <MeditationTimer />}
        {activeTab === 'ranking' && <Rankings />}
      </View>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

