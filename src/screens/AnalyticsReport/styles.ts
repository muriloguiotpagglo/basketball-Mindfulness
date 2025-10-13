import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    contentPadding: {
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        gap: 8,
    },
    selectTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: '#fff',
        width: 150,
    },
    selectText: {
        fontSize: 14,
        color: '#1f2937',
        marginRight: 8,
    },
    
    // Métricas Rápidas
    metricGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 8,
    },
    metricCard: {
        width: '48%', // Duas colunas em mobile
        marginBottom: 8,
    },
    metricContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
    },
    metricLabel: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    trendUp: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#10b981',
    },
    trendDown: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#ef4444',
    },
    trendTextUp: {
        fontSize: 12,
        color: '#10b981',
        fontWeight: '500',
    },
    trendTextDown: {
        fontSize: 12,
        color: '#ef4444',
        fontWeight: '500',
    },

    // Gráficos
    chartStyle: {
        marginVertical: 8,
        borderRadius: 8,
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 4,
    },

    // Tabs e Conteúdo
    tabsWrapper: {
        flex: 1,
    },
    tabsListStyle: {
        width: '100%',
        maxWidth: Dimensions.get('window').width - 32, // Ocupa a largura total menos o padding
    },
    sessionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 20,
    },
    halfCard: {
        width: '48%',
    },

    // Lista de Conclusão de Sessões
    completionListContainer: {
        gap: 12,
        paddingTop: 8,
    },
    completionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    completionCategory: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1f2937',
    },
    completionProgressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
        justifyContent: 'flex-end',
    },
    progressBarBackground: {
        width: 80,
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#f97316',
        borderRadius: 4,
    },
    completionPercentage: {
        fontSize: 14,
        fontWeight: '500',
        color: '#f97316',
    },

    // Lista de Jogadores
    playerList: {
        gap: 16,
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    playerIconBg: {
        width: 40,
        height: 40,
        backgroundColor: '#fff7ed',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1f2937',
    },
    playerSessions: {
        fontSize: 12,
        color: '#6b7280',
    },
    playerStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    playerStreak: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    playerStreakText: {
        fontSize: 14,
        color: '#6b7280',
    },

    // Mood Insights
    pieChartWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: 16,
    },
    moodInsightsContainer: {
        gap: 12,
        paddingTop: 8,
    },
    moodInsightBox: {
        padding: 12,
        borderRadius: 8,
    },
    insightBoxGreen: {
        backgroundColor: '#ecfdf5', // green-50
    },
    insightTitleGreen: {
        fontWeight: '500',
        color: '#065f46', // green-800
        marginBottom: 4,
    },
    insightTextGreen: {
        fontSize: 12,
        color: '#059669', // green-600
    },

    insightBoxYellow: {
        backgroundColor: '#fffbe3', // yellow-50
    },
    insightTitleYellow: {
        fontWeight: '500',
        color: '#92400e', // yellow-800
        marginBottom: 4,
    },
    insightTextYellow: {
        fontSize: 12,
        color: '#b45309', // yellow-600
    },
    
    insightBoxBlue: {
        backgroundColor: '#eff6ff', // blue-50
    },
    insightTitleBlue: {
        fontWeight: '500',
        color: '#1e40af', // blue-800
        marginBottom: 4,
    },
    insightTextBlue: {
        fontSize: 12,
        color: '#2563eb', // blue-600
    },
});


export default styles;
