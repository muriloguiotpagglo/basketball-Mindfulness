import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Container principal e cabeçalho
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5', // zinc-100
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e5e7eb', // gray-200
    borderRadius: 12,
    marginBottom: 24,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4b5563', // gray-600
  },
  tabTextActive: {
    color: '#1f2937', // gray-900
    fontWeight: 'bold',
  },

  // Cards e Layout
  cardsContainer: {
    gap: 16,
  },
  card: {
    // Estilos para o Card (assumindo que o componente Card cuida do fundo e bordas)
  },

  // Seletor de Humor
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodOption: {
    width: Dimensions.get('window').width / 6.5, // Ajustado para 4 opções por linha com espaçamento
    height: 90,
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
  },
  moodOptionSelected: {
    borderColor: '#D55C15', // Cor primária (laranja)
    backgroundColor: '#fff7ed', // Cor de fundo mais clara para o selecionado
  },
  moodOptionUnselected: {
    borderColor: '#d1d5db', // Cor padrão
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    marginTop: 4,
  },

  // Sliders
  sliderContainer: {
    paddingVertical: 10,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  slider: {
    height: 40,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: 8
  },

  // Textarea
  textarea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#1f2937',
  },

  // Mensagem de Bloqueio (Pós-Treino)
  notAvailableMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#e5e7eb', // gray-200
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  messageText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  }

});
export default styles;