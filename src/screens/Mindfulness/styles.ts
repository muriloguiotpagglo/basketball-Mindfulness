import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Cor de fundo escura do mockup
    paddingHorizontal: 16,
  },

  // Header da Aplicação (MindfulBasket)
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10, // Ajuste conforme necessário para o status bar
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 10,
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#ccc',
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D55C15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Seção de Título (Sessões de Mindfulness)
  titleSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
    marginRight: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Permite que o título ocupe o espaço restante
  },
  newSessionButton: {
    backgroundColor: '#6d28d9', // Cor roxa de exemplo
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  newSessionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitleText: {
    fontSize: 16,
    color: '#a0a0a0',
    marginLeft: 40, // Alinha com o texto do título
  },

  // Contador de Dias Consecutivos
  streakContainer: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  streakIcon: {
    width: 60,
    height: 60,
    tintColor: '#D55C15',
    marginBottom: 10,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  streakLabel: {
    fontSize: 18,
    color: '#a0a0a0',
    marginBottom: 10,
  },
  streakStatusBadge: {
    backgroundColor: '#D55C15',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 8,
  },
  streakStatusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  streakSubtext: {
    color: '#a0a0a0',
    fontSize: 14,
  },

  // Botões de Ação
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  completeButton: {
    backgroundColor: '#10b981', // Cor verde de exemplo
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButtonText: {
    color: '#a0a0a0',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  // Próximos Marcos
  milestonesContainer: {
    marginBottom: 30,
  },
  milestonesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  milestonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  milestoneBox: {
    width: '30%', // Aproximadamente 3 por linha com espaçamento
    aspectRatio: 1, // Quadrado
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  milestoneAchieved: {
    backgroundColor: '#166534', // Verde escuro
    borderColor: '#22c55e', // Verde
  },
  milestonePending: {
    backgroundColor: '#422006', // Laranja escuro
    borderColor: '#f97316', // Laranja
  },
  milestoneDays: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  milestoneIcon: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },

  // Lista de Sessões
  sessionListContainer: {
    marginBottom: 30,
  },
  sessionCard: {
    backgroundColor: '#282828',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden', // Para borderRadius funcionar com a imagem
  },
  sessionImage: {
    width: '100%',
    height: 180,
  },
  sessionTagsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  sessionTag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 8,
  },
  levelTag: {
    backgroundColor: '#10b981', // Verde
  },
  categoryTag: {
    backgroundColor: '#D55C15',
  },
  sessionTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playIconContainer: {
    position: 'absolute',
    top: 75, // Centraliza verticalmente na imagem
    right: 15, // Alinha à direita
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 5, // Ajuste para centralizar o triângulo
  },
  sessionDetailsContainer: {
    padding: 15,
  },
  sessionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 1, // Permite que o título encolha se necessário
    marginRight: 10,
  },
  sessionDuration: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  sessionDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 10,
  },
  sessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sessionParticipants: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  detailsButtonText: {
    color: '#D55C15',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;
