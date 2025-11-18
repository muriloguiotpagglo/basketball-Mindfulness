import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 16,
  },
  // --- Cabeçalho ---
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eff6ff', // blue-50
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  // --- Card "Por que o sono é importante?" ---
  introCard: {
    backgroundColor: '#eff6ff', // blue-50
    borderRadius: 12,
    marginBottom: 24,
    borderColor: '#dbeafe', // blue-200
    borderWidth: 1,
  },
  introCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  introCardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3b82f6', // blue-600
    marginLeft: 10,
  },
  whySleepContainer: {
    gap: 16,
  },
  whySleepItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  whySleepItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
  },
  whySleepItemText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  // --- Cards de Categoria ---
  categoryCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8, // Menos espaço em cima
    gap: 16,
  },
  // --- Item de Dica ---
  tipItemContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#e5e7eb', // gray-200
    paddingLeft: 12,
    paddingVertical: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1, // Permite que o texto quebre a linha
    marginRight: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  // --- Badge de Prioridade ---
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  // --- Card Bônus (10-3-2-1-0) ---
  bonusCard: {
    backgroundColor: '#f0fdf4', // green-50
    borderRadius: 12,
    marginBottom: 32,
    borderColor: '#bbf7d0', // green-200
    borderWidth: 1,
  },
  bonusContent: {
    gap: 16,
    marginTop: 8,
  },
  bonusTipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bonusTipLabel: {
    backgroundColor: '#22c55e', // green-500
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 40, // Garante alinhamento
    alignItems: 'center',
  },
  bonusTipLabelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bonusTipText: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
    lineHeight: 20,
  },
});

export default styles;