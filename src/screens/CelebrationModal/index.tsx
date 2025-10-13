import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions, Animated, Easing } from "react-native";
import Icon from 'react-native-vector-icons/Feather'; 
import styles from './styles';

const basketballLogo = require('./assets/basketball-logo.png'); 

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakCount: number;
}

const { width, height } = Dimensions.get('window');

const confettiColors = ['#f97316', '#ef4444', '#f59e0b', '#ec4899'];

const ConfettiPiece: React.FC<{ initialX: number; color: string }> = ({ initialX, color }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(Math.random() * 360)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: Math.random() * 2000 + 2000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, height],
  });

  const rotate = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: 12,
        height: 12,
        backgroundColor: color,
        borderRadius: 6,
        left: initialX,
        top: -12,
        transform: [{ translateY }, { rotate }],
      }}
    />
  );
};

export function CelebrationModal({ isOpen, onClose, streakCount }: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const streakText = `${streakCount} ${streakCount === 1 ? 'dia' : 'dias'}`;
  
  const basketballAnim = useRef(new Animated.ValueXY({ x: -width, y: -height / 2 })).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      
      Animated.timing(basketballAnim.y, {
        toValue: 20,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.timing(basketballAnim.x, {
        toValue: 0,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();

      
      Animated.timing(contentAnim, {
        toValue: 1,
        delay: 500,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

    } else {
      setShowConfetti(false);
      basketballAnim.setValue({ x: -width, y: -height / 2 });
      contentAnim.setValue(0);
    }
  }, [isOpen]);

  const getStreakMessage = () => {
    if (streakCount >= 21) return "Lendário!";
    if (streakCount >= 14) return "Incandescente!";
    if (streakCount >= 7) return "Em chamas!";
    return "Aquecendo!";
  };

  const confettiPieces = Array.from({ length: 50 }, (_, i) => i);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {showConfetti && confettiPieces.map((piece, i) => (
            <ConfettiPiece
              key={i}
              initialX={Math.random() * width}
              color={confettiColors[Math.floor(Math.random() * confettiColors.length)]}
            />
          ))}

          <View style={styles.animationContainer}>
            <View>
              <View style={styles.backboard}></View>
              <View style={styles.backboardInner}></View>
              <View style={styles.rim}></View>
              <View style={styles.net}></View>
            </View>
            
            <Animated.View
              style={[
                styles.basketball,
                { transform: [{ translateX: basketballAnim.x }, { translateY: basketballAnim.y }] }
              ]}
            >
                <Image source={basketballLogo} style={styles.basketballImage} />
            </Animated.View>
          </View>

          <Animated.View
            style={[styles.celebrationContent, { opacity: contentAnim, transform: [{ translateY: contentAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}
          >
            <View style={styles.iconsContainer}>
              <Icon name="award" size={50} color="#f59e0b" style={{ transform: [{ rotate: '-10deg' }] }} />
              <Image source={basketballLogo} style={styles.mainLogo} />
            </View>

            <Text style={styles.title}>🎉 Incrível!</Text>
            <Text style={styles.subtitle}>Você completou mais uma sessão!</Text>

            <View style={styles.streakBox}>
              <View style={styles.streakHeader}>
                <Icon name="star" size={16} color="#f59e0b" />
                <Text style={styles.streakText}>Sequência Atual</Text>
                <Icon name="star" size={16} color="#f59e0b" />
              </View>
              <Text style={styles.streakValue}>{streakText}</Text>
            </View>

            {streakCount >= 3 && (
              <View style={styles.statusContainer}>
                <Icon name="star" size={14} color="#f59e0b" />
                <Text style={styles.statusText}>{getStreakMessage()}</Text>
                <Icon name="star" size={14} color="#f59e0b" />
              </View>
            )}

            {streakCount % 7 === 0 && streakCount > 0 && (
              <View style={styles.specialMilestone}>
                <Text style={styles.specialMilestoneText}>
                  🏆 Marco Especial: {streakText}!
                </Text>
              </View>
            )}
          </Animated.View>

          <Animated.View style={{ opacity: contentAnim, marginTop: 24 }}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </View>
    </Modal>
  );
}

