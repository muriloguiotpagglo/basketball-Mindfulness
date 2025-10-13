import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import styles from "./styles";

interface CheckInData {
  energy: number;
  mood: string;
  sleep: number;
  stress: number;
  motivation: number;
  physicalCondition: number;
  personalSatisfaction: number;
  nutrition: number;
  concerns: number;
  goals: string[];
  notes: string;
  postTrainingMood: string;
  trainingIntensity: number;
  trainingFeedback: string;
}

const initialCheckIn: CheckInData = {
  energy: 50,
  mood: "",
  sleep: 50,
  stress: 50,
  motivation: 50,
  physicalCondition: 50,
  personalSatisfaction: 50,
  nutrition: 50,
  concerns: 50,
  goals: [],
  notes: "",
  postTrainingMood: "",
  trainingIntensity: 50,
  trainingFeedback: ""
};

const goalOptions = [
  "Melhorar arremessos livres",
  "Aumentar resistência",
  "Trabalhar defesa",
  "Melhorar passe",
  "Controlar ansiedade",
  "Aumentar foco",
  "Trabalhar em equipe",
  "Recuperação física"
];

const moodOptions = [
  { value: "great", label: "Excelente", icon: 'smile', color: "#22c55e" },
  { value: "good", label: "Bom", icon: 'smile', color: "#3b82f6" },
  { value: "neutral", label: "Neutro", icon: 'meh', color: "#eab308" },
  { value: "bad", label: "Ruim", icon: 'frown', color: "#f97316" },
  { value: "terrible", label: "Péssimo", icon: 'frown', color: "#ef4444" }
];

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.cardHeader}>{children}</View>
);

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.cardTitle}>{children}</Text>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.cardContent}>{children}</View>
);

const Button: React.FC<{ title: string; onPress: () => void; style?: any }> = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const SliderWrapper: React.FC<{
  label: string;
  value: number;
  iconName: string;
  iconColor: string;
  onValueChange: (value: number) => void;
}> = ({ label, value, iconName, iconColor, onValueChange }) => {
  const getSliderColor = (val: number) => {
    if (val >= 70) return '#22c55e'; // green-500
    if (val >= 40) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <View style={styles.flexRow}>
          <Icon name={iconName} size={16} color={iconColor} style={{ marginRight: 8 }} />
          <Text style={styles.label}>{label}</Text>
          <Icon name="info" size={16} color="#9ca3af" style={{ marginLeft: 4 }} />
        </View>
        <Text style={[styles.sliderValue, { color: getSliderColor(value) }]}>
          {value}%
        </Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={value}
        onSlidingComplete={onValueChange}
        minimumTrackTintColor={getSliderColor(value)}
        maximumTrackTintColor="#d1d5db"
      />
    </View>
  );
};

const MoodOption: React.FC<{
  value: string;
  label: string;
  icon: string;
  color: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ value, label, icon, color, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.moodOption,
      isSelected ? styles.moodOptionSelected : styles.moodOptionUnselected,
    ]}
    onPress={onPress}
  >
    <Icon name={icon} size={32} color={color} style={{ marginBottom: 8 }} />
    <Text style={styles.moodLabel}>{label}</Text>
  </TouchableOpacity>
);

const Checkbox: React.FC<{
  label: string;
  checked: boolean;
  onPress: () => void;
}> = ({ label, checked, onPress }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Icon name="check" size={14} color="#fff" />}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

// 3. COMPONENTE PRINCIPAL
export function DailyCheckIn() {
  const [checkInData, setCheckInData] = useState<CheckInData>(initialCheckIn);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("pre");

  const handleSliderChange = (field: keyof CheckInData, value: number) => {
    setCheckInData(prev => ({ ...prev, [field]: value }));
  };

  const handleMoodChange = (mood: string) => {
    setCheckInData(prev => ({ ...prev, mood }));
  };

  const handlePostTrainingMoodChange = (postTrainingMood: string) => {
    setCheckInData(prev => ({ ...prev, postTrainingMood }));
  };

  const handleGoalToggle = (goal: string) => {
    setCheckInData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting:", checkInData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setCheckInData(initialCheckIn);
      setActiveTab("pre");
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <View style={styles.submittedContainer}>
        <Card>
          <CardContent style={styles.submittedCard}>
            <View style={styles.submittedIconWrapper}>
              <Icon name="heart" size={32} color="#22c55e" />
            </View>
            <Text style={styles.submittedTitle}>Check-in Enviado!</Text>
            <Text style={styles.submittedText}>
              Obrigado por compartilhar como você está se sentindo hoje. 
              Suas informações ajudam a equipe técnica a oferecer o melhor suporte.
            </Text>
          </CardContent>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Check-in Diário</Text>
        <Text style={styles.subtitle}>
          Como você está se sentindo hoje? Compartilhe seu estado atual conosco.
        </Text>
      </View>

      <View style={styles.tabsContainer}>
        <View style={styles.tabsList}>
          <TouchableOpacity
            style={[styles.tabsTrigger, activeTab === 'pre' && styles.tabsTriggerActive]}
            onPress={() => setActiveTab('pre')}
          >
            <Icon name="clock" size={16} color={activeTab === 'pre' ? '#000' : '#6b7280'} />
            <Text style={[styles.tabsText, activeTab === 'pre' && styles.tabsTextActive]}>Pré-Treino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabsTrigger, activeTab === 'post' && styles.tabsTriggerActive]}
            onPress={() => setActiveTab('post')}
          >
            <Icon name="trending-up" size={16} color={activeTab === 'post' ? '#000' : '#6b7280'} />
            <Text style={[styles.tabsText, activeTab === 'post' && styles.tabsTextActive]}>Pós-Treino</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'pre' && (
          <View style={styles.tabsContent}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Icon name="smile" size={20} style={{ marginRight: 8 }} />
                  Como está seu humor hoje?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.moodGrid}>
                  {moodOptions.map(option => (
                    <MoodOption
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      icon={option.icon}
                      color={option.color}
                      isSelected={checkInData.mood === option.value}
                      onPress={() => handleMoodChange(option.value)}
                    />
                  ))}
                </View>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Níveis de Bem-estar</CardTitle>
              </CardHeader>
              <CardContent>
                <SliderWrapper
                  label="Nível de Energia"
                  value={checkInData.energy}
                  iconName="zap"
                  iconColor="#eab308"
                  onValueChange={(value) => handleSliderChange('energy', value)}
                />
                <SliderWrapper
                  label="Qualidade do Sono"
                  value={checkInData.sleep}
                  iconName="moon"
                  iconColor="#3b82f6"
                  onValueChange={(value) => handleSliderChange('sleep', value)}
                />
                <SliderWrapper
                  label="Nível de Stress"
                  value={checkInData.stress}
                  iconName="brain"
                  iconColor="#a855f7"
                  onValueChange={(value) => handleSliderChange('stress', value)}
                />
                <SliderWrapper
                  label="Motivação"
                  value={checkInData.motivation}
                  iconName="heart"
                  iconColor="#ef4444"
                  onValueChange={(value) => handleSliderChange('motivation', value)}
                />
                <SliderWrapper
                  label="Condição Física"
                  value={checkInData.physicalCondition}
                  iconName="zap"
                  iconColor="#22c55e"
                  onValueChange={(value) => handleSliderChange('physicalCondition', value)}
                />
                <SliderWrapper
                  label="Satisfação Pessoal"
                  value={checkInData.personalSatisfaction}
                  iconName="thumbs-up"
                  iconColor="#6366f1"
                  onValueChange={(value) => handleSliderChange('personalSatisfaction', value)}
                />
                <SliderWrapper
                  label="Alimentação"
                  value={checkInData.nutrition}
                  iconName="utensils"
                  iconColor="#f97316"
                  onValueChange={(value) => handleSliderChange('nutrition', value)}
                />
                <SliderWrapper
                  label="Preocupação"
                  value={checkInData.concerns}
                  iconName="alert-circle"
                  iconColor="#f59e0b"
                  onValueChange={(value) => handleSliderChange('concerns', value)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Objetivos para Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.checkboxGrid}>
                  {goalOptions.map(goal => (
                    <Checkbox
                      key={goal}
                      label={goal}
                      checked={checkInData.goals.includes(goal)}
                      onPress={() => handleGoalToggle(goal)}
                    />
                  ))}
                </View>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Observações Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <TextInput
                  style={styles.textarea}
                  placeholder="Conte-nos mais..."
                  value={checkInData.notes}
                  onChangeText={(text) => setCheckInData(prev => ({ ...prev, notes: text }))}
                  multiline
                />
              </CardContent>
            </Card>

            <View style={styles.submitButtonContainer}>
              <Button
                title="Enviar Check-in Pré-Treino"
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}

        {activeTab === 'post' && (
          <View style={styles.tabsContent}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Icon name="smile" size={20} style={{ marginRight: 8 }} />
                  Como está seu humor após o treino?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.moodGrid}>
                  {moodOptions.map(option => (
                    <MoodOption
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      icon={option.icon}
                      color={option.color}
                      isSelected={checkInData.postTrainingMood === option.value}
                      onPress={() => handlePostTrainingMoodChange(option.value)}
                    />
                  ))}
                </View>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avaliação do Treino</CardTitle>
              </CardHeader>
              <CardContent>
                <SliderWrapper
                  label="Intensidade do Treino"
                  value={checkInData.trainingIntensity}
                  iconName="zap"
                  iconColor="#f97316"
                  onValueChange={(value) => handleSliderChange('trainingIntensity', value)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback do Treino</CardTitle>
              </CardHeader>
              <CardContent>
                <TextInput
                  style={styles.textarea}
                  placeholder="Como foi o treino? O que funcionou bem?..."
                  value={checkInData.trainingFeedback}
                  onChangeText={(text) => setCheckInData(prev => ({ ...prev, trainingFeedback: text }))}
                  multiline
                />
              </CardContent>
            </Card>

            <View style={styles.submitButtonContainer}>
              <Button
                title="Enviar Check-in Pós-Treino"
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
