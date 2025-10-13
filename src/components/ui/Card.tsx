import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Card: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.cardHeader}>{children}</View>
);

export const CardTitle: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <Text style={[styles.cardTitle, style]}>{children}</Text>
);

export const CardContent: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <View style={[styles.cardContent, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6', 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937', 
  },
  cardContent: {
    padding: 16,
  },
});
