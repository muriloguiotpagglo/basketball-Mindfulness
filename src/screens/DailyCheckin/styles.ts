// @ts-ignore – suppress missing module error for react-native
import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Container principal e cabeçalho
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5', // zinc-100
    paddingHorizontal: 16,
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

  // Conteúdo de submissão
  submittedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
    padding: 16,
  },
  submittedCard: {
    padding: 32,
    alignItems: 'center',
    gap: 16,
  },
  submittedIconWrapper: {
    width: 64,
    height: 64,
    backgroundColor: '#dcfce7', // green-100
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  submittedTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  submittedText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Componentes de Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  cardContent: {
    padding: 16,
    gap: 16,
  },

  // Tabs
  tabsContainer: {
    flex: 1,
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
    width: '100%',
  },
  tabsTrigger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
  },
  tabsTriggerActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 8,
  },
  tabsTextActive: {
    color: '#1f2937',
  },
  tabsContent: {
    marginBottom: 16,
  },

  // Sliders e seus labels
  sliderContainer: {
    gap: 8,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },

  // Botões de Humor (Radio Group)
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    minWidth: (Dimensions.get('window').width - 32 - 40) / 5,
  },
  moodOptionSelected: {
    borderColor: '#f97316',
    backgroundColor: '#fff7ed', // orange-50
  },
  moodOptionUnselected: {
    borderColor: '#d1d5db',
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },

  // Checkboxes
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '48%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#f97316',
    borderColor: '#f97316',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },

  // Textarea
  textarea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    color: '#1f2937',
    backgroundColor: '#fff',
  },
  
  // Botão de submissão
  submitButtonContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
