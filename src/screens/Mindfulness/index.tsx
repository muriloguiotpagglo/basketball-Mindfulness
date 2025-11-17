import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import styles from './styles';
import { listPractices, MindfulnessPractice } from '../../services/mindfulness';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '../../components/ui';

const MindfulnessScreen: React.FC = () => {
  const [practices, setPractices] = useState<MindfulnessPractice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listPractices();
        if (mounted) setPractices(data);
      } catch (e: any) {
        if (mounted) setError('Não foi possível carregar as práticas.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D55C15" />
        <Text style={styles.loadingText}>Carregando práticas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar novamente" variant="outline" onPress={() => {
          setError(null);
          setLoading(true);
          (async () => {
            try {
              const data = await listPractices();
              setPractices(data);
            } catch (e: any) {
              setError('Não foi possível carregar as práticas.');
            } finally {
              setLoading(false);
            }
          })();
        }} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: MindfulnessPractice }) => {
    const description = item.descricao && item.descricao.trim().length > 0 ? item.descricao : 'Sem descrição';
    const imageSource = item.imageUrl ? { uri: item.imageUrl } : require('../../assets/logo.png');

    return (
      <Card style={styles.card}>
        <CardHeader>
          <View style={styles.header}>
            <CardTitle style={styles.title}>{item.titulo}</CardTitle>
            <View style={styles.badgeRow}>
              <Badge style={styles.badge}>{item.nivel}</Badge>
            </View>
          </View>
        </CardHeader>
        <CardContent>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.metaRow}>
            <Badge variant="outline" style={styles.metaBadge}>{item.tipo}</Badge>
            <Text style={styles.metaText}>{item.duracao} min</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <Button title="Iniciar" onPress={() => {}} style={styles.startButton} />
        </CardContent>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={practices}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={(
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Nenhuma prática disponível.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MindfulnessScreen;
