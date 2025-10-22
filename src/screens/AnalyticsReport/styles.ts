import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentPadding: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    header: {
        marginBottom: 20,
        marginTop: 10,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#a0a0a0',
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    selectTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#282828',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    selectText: {
        color: '#fff',
        fontSize: 14,
    },
    metricGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    metricCard: {
        width: (width - 32 - 16) / 2, // screenWidth - padding - gap / 2
        marginBottom: 16,
        backgroundColor: '#282828',
        borderRadius: 12,
        padding: 15,
    },
    metricContent: {
        // Adicione estilos específicos se houver
    },
    metricLabel: {
        fontSize: 14,
        color: '#a0a0a0',
        marginBottom: 5,
    },
    metricValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    metricHint: {
        fontSize: 12,
        color: '#10b981',
        marginTop: 5,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#444',
        borderRadius: 4,
        marginTop: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#f97316',
        borderRadius: 4,
    },
    sessionsGrid: {
        // flexDirection: 'row', // Removido conforme nossa discussão anterior
        // justifyContent: 'space-between', // Removido conforme nossa discussão anterior
        gap: 16, // Adicionado para espaçamento vertical
        marginBottom: 20,
    },
    halfCard: {
        // width: '48%', // Removido conforme nossa discussão anterior
        flex: 1, // Para ocupar o espaço disponível em coluna
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
    completionListContainer: {
        // Estilos para o contêiner da lista de conclusão
        paddingVertical: 10,
    },
    completionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    completionCategory: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
    },
    completionProgressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBarBackground: {
        width: 100, // Largura fixa para a barra de progresso
        height: 8,
        backgroundColor: '#444',
        borderRadius: 4,
        marginRight: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#f97316',
        borderRadius: 4,
    },
    completionPercentage: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    playerList: {
        marginBottom: 20,
    },
    playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#282828',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerIconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    playerSessions: {
        fontSize: 12,
        color: '#a0a0a0',
    },
    playerStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerStreak: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    playerStreakText: {
        fontSize: 14,
        color: '#a0a0a0',
    },
    pieChartWrapper: {
        alignItems: 'center',
        marginBottom: 20,
    },
    moodInsightsContainer: {
        marginBottom: 20,
    },
    moodInsightBox: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    insightBoxGreen: {
        backgroundColor: '#166534',
    },
    insightBoxYellow: {
        backgroundColor: '#422006',
    },
    insightBoxBlue: {
        backgroundColor: '#1e3a8a',
    },
    insightTitleGreen: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#22c55e',
        marginBottom: 5,
    },
    insightTextGreen: {
        fontSize: 14,
        color: '#a0a0a0',
    },
    insightTitleYellow: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f97316',
        marginBottom: 5,
    },
    insightTextYellow: {
        fontSize: 14,
        color: '#a0a0a0',
    },
    insightTitleBlue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#60a5fa',
        marginBottom: 5,
    },
    insightTextBlue: {
        fontSize: 14,
        color: '#a0a0a0',
    },
    // Estilos para Tabs (se houver)
    tabsContainer: {
        marginBottom: 20,
    },
    tabsList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#282828',
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
    },
    tabsTrigger: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    tabsTriggerActive: {
        backgroundColor: '#f97316',
    },
    tabsTriggerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tabsTriggerTextInactive: {
        color: '#a0a0a0',
    },
});
