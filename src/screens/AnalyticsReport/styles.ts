import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
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
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    selectText: {
        color: '#374151',
        fontSize: 14,
    },
    metricGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    metricCard: {
        width: (width - 32 - 16) / 2,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    metricContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    metricLabel: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1f2937',
    },
    trendUp: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendDown: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendTextUp: {
        fontSize: 12,
        color: '#10b981',
        fontWeight: '600',
    },
    trendTextDown: {
        fontSize: 12,
        color: '#ef4444',
        fontWeight: '600',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#444',
        borderRadius: 4,
        marginTop: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#D55C15',
        borderRadius: 4,
    },
    sessionsGrid: {
        gap: 16,
        marginBottom: 20,
    },
    halfCard: {
        // width: '48%', // Removido conforme nossa discussão anterior
        flex: 1, // Para ocupar o espaço disponível em coluna
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 12,
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
        color: '#1f2937',
    },
    completionProgressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBarBackground: {
        width: 100,
        height: 8,
        backgroundColor: '#f3f4f6',
        borderRadius: 4,
        marginRight: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#D55C15',
        borderRadius: 4,
    },
    completionPercentage: {
        fontSize: 14,
        color: '#1f2937',
        fontWeight: 'bold',
    },
    playerList: {
        marginBottom: 20,
    },
    playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerIconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    playerSessions: {
        fontSize: 12,
        color: '#6b7280',
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
        color: '#6b7280',
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
        backgroundColor: '#ecfdf5',
    },
    insightBoxYellow: {
        backgroundColor: '#fff7ed',
    },
    insightBoxBlue: {
        backgroundColor: '#eff6ff',
    },
    insightTitleGreen: {
        fontSize: 16,
        fontWeight: '600',
        color: '#166534',
        marginBottom: 4,
    },
    insightTextGreen: {
        fontSize: 14,
        color: '#374151',
    },
    insightTitleYellow: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D55C15',
        marginBottom: 4,
    },
    insightTextYellow: {
        fontSize: 14,
        color: '#374151',
    },
    insightTitleBlue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e3a8a',
        marginBottom: 4,
    },
    insightTextBlue: {
        fontSize: 14,
        color: '#374151',
    },
    tabsWrapper: {
        marginBottom: 8,
    },
    tabsListStyle: {},
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#6b7280',
    },
});
export default styles;
