import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, Modal, ScrollView } from 'react-native';
import styles from './styles';
import { listPractices, MindfulnessPractice } from '../../services/mindfulness';
import { Card, CardTitle, CardContent, Badge, Button } from '../../components/ui';

const FALLBACK_IMAGES = [
  require('../../assets/image.png'),
  require('../../assets/image copy.png'),
  require('../../assets/image copy 2.png'),
  require('../../assets/image copy 3.png'),
  require('../../assets/image copy 4.png'),
  require('../../assets/image copy 5.png'),
  require('../../assets/image copy 6.png'),
];

const MindfulnessScreen: React.FC = () => {
  const [practices, setPractices] = useState<MindfulnessPractice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<MindfulnessPractice | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

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
    const imageSource = item.imageUrl ? { uri: item.imageUrl } : FALLBACK_IMAGES[item.id % FALLBACK_IMAGES.length];

    const levelColor =
      item.nivel === 'iniciante'
        ? '#10B981'
        : item.nivel === 'intermediario'
        ? '#F59E0B'
        : '#EF4444';

    return (
      <Card style={styles.card}>
        <CardContent>
          <View style={styles.imageWrapper}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.overlay}>
              <Badge style={styles.overlayBadge}>{item.tipo}</Badge>
              <Badge color={levelColor} style={styles.overlayBadge}>{item.nivel}</Badge>
            </View>
          </View>
          <CardTitle style={styles.title}>{item.titulo}</CardTitle>
          {/* duração removida conforme solicitado */}
          <Button title="Ver detalhes" onPress={() => { setSelectedPractice(item); setShowDetails(true); }} style={styles.startButton} />
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
      <Modal visible={showDetails} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {selectedPractice && (
                <>
                  <CardTitle style={styles.detailsTitle}>{selectedPractice.titulo}</CardTitle>
                  <View style={styles.detailsBadgeRow}>
                    <Badge style={styles.overlayBadge}>{selectedPractice.tipo}</Badge>
                    <Badge color={selectedPractice.nivel === 'iniciante' ? '#10B981' : selectedPractice.nivel === 'intermediario' ? '#F59E0B' : '#EF4444'} style={styles.overlayBadge}>{selectedPractice.nivel}</Badge>
                    {selectedPractice.category ? (<Badge variant="outline" style={styles.overlayBadge}>{selectedPractice.category}</Badge>) : null}
                  </View>
                  <Text style={styles.detailsText}>{selectedPractice.descricao && selectedPractice.descricao.trim().length > 0 ? selectedPractice.descricao : 'Sem descrição'}</Text>
                  <Button title="Fechar" variant="outline" onPress={() => { setShowDetails(false); setSelectedPractice(null); }} style={styles.startButton} />
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MindfulnessScreen;
