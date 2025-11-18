import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  // --- Cabeçalho ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  headerButton: {
    backgroundColor: '#D55C15', // Cor primária
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- Card de Atleta ---
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden', // Para conter os elementos
  },
  
  // --- Header do Card ---
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarFallback: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fee2e2', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarFallbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D55C15', 
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  playerPosition: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // --- Conteúdo do Card (Métricas) ---
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%', // Duas colunas
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 6,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  
  // --- Barra de Progresso ---
  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6', // gray-100
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  // --- Footer 1 (Stats) ---
  cardFooterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6', // gray-100
  },
  footerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerStatText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
  },

  // --- Footer 2 (Ações) ---
  cardFooterActions: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footerButtonPrimary: {
    backgroundColor: '#D55C15',
    marginLeft: 8,
    borderColor: '#D55C15',
  },
  footerButtonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- NOVOS ESTILOS PARA OS MODAIS ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo escuro semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 12,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1, 
  },
  modalCloseButton: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: '#374151',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  modalBody: {
    // O conteúdo do modal ficará aqui
  },
  
  // --- Estilos para Modal de Histórico ---
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  historyItemDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  historyItemMetrics: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },

  // --- Estilos para Modal de Check-in ---
  checkinDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    alignItems: 'center',
  },
  checkinDetailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkinDetailIcon: {
    marginRight: 8,
    color: '#6b7280', // Cor padrão para os ícones (cinza)
  },
  checkinDetailLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  checkinDetailValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  
  // --- Estilos para Loading/Error no Modal ---
  modalCentered: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalErrorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
  },
  modalEmptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 20,
  }
});

export default styles;