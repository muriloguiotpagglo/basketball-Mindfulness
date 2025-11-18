import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // cinza bem claro (bg-gray-50)
  },
  contentContainer: {
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#6b7280',
  },
  errorText: {
    color: '#ef4444',
    marginBottom: 10,
  },
  
  // --- Header Principal ---
  headerContainer: {
    padding: 24,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  newSessionButton: {
    backgroundColor: '#D55C15', // Primary color
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  newSessionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // --- Seção de Streak (Fogo) ---
  streakContainer: {
    margin: 24,
    marginTop: 12,
    marginBottom: 12,
  },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 24,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 12,
  },
  streakBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fed7aa', // orange-200
    opacity: 0.2,
  },
  streakIconContainer: {
    marginBottom: 16,
    transform: [{ scale: 1.2 }],
  },
  streakCount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0f172a',
  },
  streakLabel: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
  },
  streakBadge: {
    backgroundColor: '#ffedd5', // orange-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  streakBadgeText: {
    color: '#c2410c', // orange-700
    fontSize: 12,
    fontWeight: 'bold',
  },
  streakFooterText: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 12,
  },

  // --- Botões de Ação do Streak ---
  streakActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  completeButton: {
    backgroundColor: '#f97316', // Laranja vibrante
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  resetButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resetButtonText: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 14,
  },

  // --- Milestones (Marcos) ---
  milestonesCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  milestonesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milestoneItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    width: 50,
    height: 60,
  },
  milestoneNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  // --- Lista de Práticas (Cards) ---
  listPadding: {
    paddingHorizontal: 24,
    gap: 24, // Espaçamento entre itens da lista
  },
  practiceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImageContainer: {
    height: 192, // h-48
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  badgesContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  cardBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  playButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D55C15',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // --- Conteúdo do Card ---
  cardContent: {
    padding: 24,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 14,
    color: '#64748b',
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
  },
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },

  // --- Footer de Estatísticas ---
  statsContainer: {
    margin: 24,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statsHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  statsGrid: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },

  // --- Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    padding: 24,
  },
  modalScroll: {
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  
  // --- NOVOS ESTILOS ---
  // Botão Principal do Modal (Laranja)
  modalCompleteButton: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#D55C15', // Botão Primário
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#D55C15',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  modalCompleteButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff', // Texto branco
  },
  
  // Botão secundário (Cancelar/Fechar pequeno - ícone)
  modalCloseIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 10,
  }
});

export default styles;