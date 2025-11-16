import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Professional {
  id: string;
  name: string;
  role: string;
  specialty: string;
  rating: number;
  athletes: number;
  type: 'nutrition' | 'physiotherapy';
}

interface Athlete {
  id: string;
  name: string;
  status: 'active' | 'pending';
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  hydration?: number;
  nextMeal?: string;
}

export default function MultiprofissionalScreen() {
  const [selectedTab, setSelectedTab] = useState<'nutrition' | 'physiotherapy'>('nutrition');
  // const navigation = useNavigation();

  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Dr. Ricardo Nutrients',
      role: 'Nutricionista',
      specialty: 'Nutrição Esportiva',
      rating: 4.9,
      athletes: 8,
      type: 'nutrition'
    },
    {
      id: '2',
      name: 'Fisio Ana Recovery',
      role: 'Fisioterapeuta',
      specialty: 'Medicina Esportiva',
      rating: 4.8,
      athletes: 6,
      type: 'physiotherapy'
    }
  ];

  const athletes: Athlete[] = [
    {
      id: '1',
      name: 'João Silva',
      status: 'active',
      calories: 2800,
      carbs: 350,
      protein: 140,
      fat: 93,
      hydration: 85,
      nextMeal: 'Almoço - 12:30'
    },
    {
      id: '2',
      name: 'Maria Santos',
      status: 'pending'
    }
  ];

  const filteredProfessionals = professionals.filter(p => p.type === selectedTab);

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  const renderProfessionalCard = (professional: Professional) => (
    <View key={professional.id} style={styles.professionalCard}>
      <View style={styles.professionalHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon 
              name={professional.type === 'nutrition' ? 'nutrition-outline' : 'body-outline'} 
              size={24} 
              color="#D55C15" 
            />
          </View>
        </View>
        <View style={styles.professionalInfo}>
          <Text style={styles.professionalName}>{professional.name}</Text>
          <Text style={styles.professionalRole}>{professional.role}</Text>
          <Text style={styles.professionalSpecialty}>{professional.specialty}</Text>
          <View style={styles.professionalFooter}>
            {renderStars(professional.rating)}
            <Text style={styles.athletesCount}>{professional.athletes} atletas</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAthleteCard = (athlete: Athlete) => (
    <View key={athlete.id} style={styles.athleteCard}>
      <View style={styles.athleteHeader}>
        <Text style={styles.athleteName}>{athlete.name}</Text>
        <View style={[
          styles.statusPill,
          athlete.status === 'active' ? styles.statusActive : styles.statusPending
        ]}>
          <Text style={[
            styles.statusText,
            athlete.status === 'active' ? styles.statusTextActive : styles.statusTextPending
          ]}>
            {athlete.status === 'active' ? 'Ativo' : 'Pendente'}
          </Text>
        </View>
      </View>

      {athlete.status === 'active' && (
        <>
          <View style={styles.metricsGrid}>
            <View style={styles.metricColumn}>
              <Text style={styles.metricLabel}>Calorias</Text>
              <Text style={styles.metricValue}>{athlete.calories} kcal</Text>
              <Text style={styles.metricLabel}>Carboidratos</Text>
              <Text style={styles.metricValue}>{athlete.carbs}g</Text>
            </View>
            <View style={styles.metricColumn}>
              <Text style={styles.metricLabel}>Proteína</Text>
              <Text style={styles.metricValue}>{athlete.protein}g</Text>
              <Text style={styles.metricLabel}>Gordura</Text>
              <Text style={styles.metricValue}>{athlete.fat}g</Text>
            </View>
          </View>

          <View style={styles.hydrationContainer}>
            <Text style={styles.metricLabel}>Hidratação</Text>
            <Text style={styles.hydrationPercent}>{athlete.hydration}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: athlete.hydration ? `${athlete.hydration}%` : '0%' }]} />
          </View>

          <View style={styles.mealSchedule}>
            <Icon name="time-outline" size={16} color="#6b7280" />
            <Text style={styles.mealText}>{athlete.nextMeal}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Icon name="chatbubble-outline" size={16} color="#374151" />
              <Text style={styles.contactButtonText}>Contato</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.planButton}>
              <Icon name="document-text-outline" size={16} color="#FFFFFF" />
              <Text style={styles.planButtonText}>Plano</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Equipe Multidisciplinar</Text>
            <Text style={styles.subtitle}>Nutrição e fisioterapia integradas ao cuidado dos atletas</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.professionalsSection}>
        {filteredProfessionals.map(renderProfessionalCard)}
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            selectedTab === 'nutrition' && styles.tabButtonActive,
            { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }
          ]}
          onPress={() => setSelectedTab('nutrition')}
        >
          <Icon 
            name="nutrition-outline" 
            size={16} 
            color={selectedTab === 'nutrition' ? '#D55C15' : '#6b7280'} 
          />
          <Text style={[
            styles.tabText,
            selectedTab === 'nutrition' && styles.tabTextActive
          ]}>
            Nutrição
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            selectedTab === 'physiotherapy' && styles.tabButtonActive,
            { borderTopRightRadius: 12, borderBottomRightRadius: 12 }
          ]}
          onPress={() => setSelectedTab('physiotherapy')}
        >
          <Icon 
            name="body-outline" 
            size={16} 
            color={selectedTab === 'physiotherapy' ? '#D55C15' : '#6b7280'} 
          />
          <Text style={[
            styles.tabText,
            selectedTab === 'physiotherapy' && styles.tabTextActive
          ]}>
            Fisioterapia
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.athletesSection}>
        {athletes.map(renderAthleteCard)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4, // Alinha melhor com o título
  },
  professionalsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  professionalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  professionalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  professionalInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  professionalRole: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  professionalSpecialty: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  professionalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 4,
  },
  athletesCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f3f4f6',
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#D55C15',
    fontWeight: '500',
  },
  athletesSection: {
    paddingHorizontal: 20,
  },
  athleteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  athleteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  athleteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusActive: {
    backgroundColor: '#000000',
  },
  statusPending: {
    backgroundColor: '#f3f4f6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTextActive: {
    color: '#FFFFFF',
  },
  statusTextPending: {
    color: '#374151',
  },
  metricsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metricColumn: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  hydrationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hydrationPercent: {
    fontSize: 14,
    color: '#000000',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1f2937',
    borderRadius: 3,
  },
  mealSchedule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  mealText: {
    fontSize: 14,
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  planButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    gap: 8,
  },
  planButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});