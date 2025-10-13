import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle, } from '../../components/ui/Card';
import { Label } from '../../components/ui/Label';
import { Input } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';
import { Button } from '../../components/ui/Button';
import Icon from 'react-native-vector-icons/Feather';

export const SettingsPage: React.FC = () => {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [sessionRemindersEnabled, setSessionRemindersEnabled] = useState(true);
  const [reportsEnabled, setReportsEnabled] = useState(true);

  const [anonymousData, setAnonymousData] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  const [wellnessTarget, setWellnessTarget] = useState('80');
  const [participationTarget, setParticipationTarget] = useState('85');
  const [sessionTarget, setSessionTarget] = useState('3');

  const handleSave = () => {
    console.log("Configurações salvas!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Configurações</Text>
      </View>

      <View style={styles.grid}>
        
        <Card>
          <CardHeader>
            <CardTitle>Configurações da Equipe</CardTitle>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            <View style={styles.formGroup}>
              <Label>Nome da Equipe</Label>
              <Input defaultValue="Equipe Principal" />
            </View>
            <View style={styles.formGroup}>
              <Label>Nome do Treinador</Label>
              <Input defaultValue="Treinador Silva" />
            </View>
            <View style={styles.formGroup}>
              <Label>Temporada</Label>
              <Input keyboardType="numeric" defaultValue="2024" />
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            <View style={styles.switchRow}>
              <Label>Lembrete de Check-in</Label>
              <Switch value={remindersEnabled} onValueChange={setRemindersEnabled} />
            </View>
            <View style={styles.switchRow}>
              <Label>Alertas de Bem-estar</Label>
              <Switch value={alertsEnabled} onValueChange={setAlertsEnabled} />
            </View>
            <View style={styles.switchRow}>
              <Label>Lembretes de Sessão</Label>
              <Switch value={sessionRemindersEnabled} onValueChange={setSessionRemindersEnabled} />
            </View>
            <View style={styles.switchRow}>
              <Label>Relatórios Semanais</Label>
              <Switch value={reportsEnabled} onValueChange={setReportsEnabled} />
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metas e Objetivos</CardTitle>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            <View style={styles.formGroup}>
              <Label>Meta de Bem-estar (%)</Label>
              <Input 
                keyboardType="numeric" 
                value={wellnessTarget}
                onChangeText={setWellnessTarget} 
              />
            </View>
            <View style={styles.formGroup}>
              <Label>Meta de Participação (%)</Label>
              <Input 
                keyboardType="numeric" 
                value={participationTarget}
                onChangeText={setParticipationTarget} 
              />
            </View>
            <View style={styles.formGroup}>
              <Label>Sessões por Semana</Label>
              <Input 
                keyboardType="numeric" 
                value={sessionTarget}
                onChangeText={setSessionTarget}
              />
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacidade e Dados</CardTitle>
          </CardHeader>
          <CardContent style={styles.cardContent}>
            <View style={styles.switchRow}>
              <Label>Dados Anônimos</Label>
              <Switch value={anonymousData} onValueChange={setAnonymousData} />
            </View>
            <View style={styles.switchRow}>
              <Label>Compartilhar com Equipe Técnica</Label>
              <Switch value={dataSharing} onValueChange={setDataSharing} />
            </View>
            <View style={styles.privacyButtons}>
              <Button 
                title="Exportar Dados" 
                onPress={() => console.log('Exportar')} 
                variant="outline" 
                iconName="download"
              />
              <Button 
                title="Excluir Todos os Dados" 
                onPress={() => console.log('Excluir')} 
                variant="destructive"
                iconName="trash-2"
              />
            </View>
          </CardContent>
        </Card>
      </View>

      <View style={styles.saveButtonContainer}>
        <Button 
          title="Salvar Configurações" 
          onPress={handleSave} 
          iconName="save"
        />
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  grid: {
    gap: 16,
  },
  cardContent: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  privacyButtons: {
    gap: 8,
    marginTop: 8,
  },
  saveButtonContainer: {
    marginTop: 24,
    alignItems: 'center', 
  },
});
