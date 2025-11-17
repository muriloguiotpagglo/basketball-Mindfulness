import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

export default function AnalyticsReports() {
  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.contentPadding}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Relatórios e Análises</Text>
        <Text style={styles.subtitle}>Insights detalhados sobre o bem-estar da equipe</Text>
      </View>
    </ScrollView>
  );
}