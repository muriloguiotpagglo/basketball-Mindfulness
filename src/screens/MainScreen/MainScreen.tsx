// 1. IMPORTAR AS FERRAMENTAS NECESSÁRIAS
import React, { useRef, useState, useEffect } from 'react'; // Adicionamos 'useEffect'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing,
    ActivityIndicator, // (Opcional) Para um loading mais bonito
} from 'react-native';
import { Icon } from '../../components/ui/Icon';
import { AppLogo } from '../../components/ui/AppLogo';

import AnalyticsReports from '../AnalyticsReport';
import DailyCheckIn from '../DailyCheckin';
import MindfulnessScreen from '../Mindfulness';
import { SettingsPage } from './SettingsPage';
 
import { logout } from '../../services/auth';
import { DashBoardData, getData } from '../../services/dashboard';


const { width } = Dimensions.get('window');

// ... (Componentes PlayerProfile, SleepHygiene, Multidisciplinary e menuItems permanecem iguais) ...
const PlayerProfile = () => <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Player Profile</Text></View>;
const SleepHygiene = () => <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Sleep Hygiene</Text></View>;
const menuItems = [
    // ... (menuItems)
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard' },
    { id: 'players', label: 'Atletas', iconName: 'players' },
    { id: 'mindfulness', label: 'Mindfulness', iconName: 'mindfulness' },
    { id: 'sleep-hygiene', label: 'Higienização do Sono', iconName: 'sleep-hygiene' },
    { id: 'checkin', label: 'Check-in', iconName: 'checkin' },
    { id: 'analytics', label: 'Relatórios', iconName: 'analytics' },
    { id: 'settings', label: 'Configurações', iconName: 'settings' },
];


// ... (Componentes Navigation e SideMenu permanecem iguais) ...
const Navigation = ({ onToggleMenu, avatarText, isMenuOpen, menuAnim, onLayoutHeader }: any) => (
    // ... (código do Navigation)
    <View style={[styles.headerContainer, isMenuOpen && styles.headerNoBorder]} onLayout={onLayoutHeader}>
        <TouchableOpacity onPress={onToggleMenu} style={styles.headerLeft} hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
            <View style={{ width: 24, height: 24 }}>
                <Animated.View style={{ position: 'absolute', opacity: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }), transform: [{ rotate: menuAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] }) }] }}>
                    <Icon name="menu" size={24} color="#374151" />
                </Animated.View>
                <Animated.View style={{ position: 'absolute', opacity: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), transform: [{ rotate: menuAnim.interpolate({ inputRange: [0, 1], outputRange: ['-90deg', '0deg'] }) }] }}>
                    <Icon name="close" size={24} color="#374151" />
                </Animated.View>
            </View>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
            <View style={styles.headerCenterRow}>
                <AppLogo size={24} style={{ marginRight: 8 }} />
                <View>
                    <Text style={styles.appTitle}>MindDunk</Text>
                    <Text style={styles.appSubtitle}>Sistema de Monitoramento</Text>
                </View>
            </View>
        </View>
        <View style={styles.headerRight}>
            <Text style={styles.avatar}>{avatarText}</Text>
        </View>
    </View>
);

const SideMenu = ({ activeTab, onTabChange, onClose, onLogout, topOffset }: { activeTab: string, onTabChange: (tab: string) => void, onClose: () => void, onLogout: () => void, topOffset: number }) => (
    // ... (código do SideMenu)
    <View style={[styles.modalOverlay, { top: topOffset }]}>
        <View style={styles.sideMenuContainer}>
            <ScrollView style={styles.sideMenuScroll}>
                {menuItems.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.menuItem, activeTab === item.id && styles.menuItemActive]}
                        onPress={() => {
                            onTabChange(item.id);
                            onClose();
                        }}
                    >
                        <Icon name={item.iconName} size={20} color={activeTab === item.id ? '#D55C15' : '#6b7280'} style={{ width: 30, textAlign: 'center' }} />
                        <Text style={[styles.menuLabelLight, activeTab === item.id && styles.menuLabelActiveLight]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.sideMenuFooter}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={onLogout}
                >
                    <Icon name="logout" size={20} color="#ef4444" style={{ width: 30, textAlign: 'center' }} />
                    <Text style={styles.logoutLabel}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style={styles.modalTouchOutside} onPress={onClose} />
    </View>
);


// 3. REFATORAR O TEAMDASHBOARD PARA ACEITAR PROPS
const TeamDashboard = ({ data, loading, error, onRetry }: { 
    data: DashBoardData | null; 
    loading: boolean; 
    error: string | null;
    onRetry: () => void; // Função para tentar buscar dados novamente
}) => {

    // 3.1. LIDAR COM O ESTADO DE CARREGAMENTO (LOADING)
    if (loading) {
        return (
            <View style={styles.placeholderContainer}>
                <ActivityIndicator size="large" color="#D55C15" />
                <Text style={styles.placeholderText}>Carregando dados...</Text>
            </View>
        );
    }

    // 3.2. LIDAR COM O ESTADO DE ERRO
    if (error) {
        return (
            <View style={styles.placeholderContainer}>
                <Text style={[styles.placeholderText, { marginBottom: 16 }]}>Ocorreu um erro: {error}</Text>
                <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // 3.3. LIDAR COM SUCESSO, MAS SEM DADOS
    if (!data) {
        return (
            <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>Nenhum dado encontrado.</Text>
            </View>
        );
    }

    // 3.4. (Opcional) Formatar o texto de comparação
    const comparacaoTexto = data.comparacaoMesPassado >= 0 
        ? `+${data.comparacaoMesPassado}` 
        : `${data.comparacaoMesPassado}`;
    
    const comparacaoCor = data.comparacaoMesPassado >= 0 
        ? '#10b981' // Verde (positivo)
        : '#ef4444'; // Vermelho (negativo)

    // 3.5. RENDERIZAR OS DADOS DINÂMICOS
    return (
        <ScrollView contentContainerStyle={styles.dashboardScrollContent} style={styles.dashboardContainer}>

            <View style={styles.mainCard}>
                <View>
                    <Text style={styles.mainCardTitle}>Dashboard da Equipe</Text>
                    <Text style={styles.mainCardSubtitle}>Monitoramento de bem-estar e mindfulness</Text>
                </View>
                <Image
                    source={{ uri: 'https://placehold.co/60x60/ffffff/000?text=TEAM' }} // TODO: Mudar para o logo do time
                    style={styles.teamLogo}
                />
            </View>

            {/* Total de Atletas */}
            <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Total de Atletas</Text>
                <Text style={styles.metricValue}>{data.totalAtletas}</Text>
                <Text style={[styles.metricHint, { color: comparacaoCor }]}>
                    {comparacaoTexto} desde o mês passado
                </Text>
            </View>
            
            {/* Bem-estar Médio */}
            <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Bem-estar Médio</Text>
                <Text style={styles.metricValue}>{data.bemEstarMedio}%</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${data.bemEstarMedio}%` }]} />
                </View>
            </View>
            
            {/* Sessões Hoje */}
            <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Sessões Hoje</Text>
                <Text style={styles.metricValue}>{data.sessoesHoje}</Text>
                <Text style={styles.metricHint}>{data.porcentagemSessoes}% dos atletas ativos</Text>
            </View>
            
            {/* Nível de Stress */}
            <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Nível de Stress</Text>
                <Text style={styles.metricValue}>{data.stressMedio}%</Text>
                <View style={styles.progressBar}>
                    <View style={[
                        styles.progressFill, 
                        { width: `${data.stressMedio}%`, backgroundColor: '#D55C15' } 
                    ]} />
                </View>
            </View>

            {/* Atividades Recentes */}
            <View style={styles.activitiesCard}>
                <Text style={styles.activitiesTitle}>Atividades Recentes</Text>
                {data.atividadesRecentes.length > 0 ? (
                    data.atividadesRecentes.map((item:any, index:any) => (
                        <View style={styles.activityItem} key={index}>
                            <Text style={styles.activityName}>{item.nome}</Text>
                            <Text style={styles.activityStatus}>{item.status}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.activityName}>Nenhuma atividade recente.</Text>
                )}
            </View>

            <View style={{ height: 50 }} />
        </ScrollView>
    );
};


export const MainScreen: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const menuAnim = useRef(new Animated.Value(0)).current;

    // 4. ADICIONAR ESTADO PARA OS DADOS DO DASHBOARD
    const [dashboardData, setDashboardData] = useState<DashBoardData | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Começa falso
    const [error, setError] = useState<string | null>(null);

    // 5. FUNÇÃO PARA BUSCAR OS DADOS
    const fetchDashboardData = async () => {
        console.log("Buscando dados do dashboard...");
        setIsLoading(true);
        setError(null);
        setDashboardData(null); // Limpa dados antigos
        try {
            // Chama a função da tua API
            const data = await getData(); 
            // Se quiseres depurar, podes adicionar o console.log aqui:
            // console.log("DADOS RECEBIDOS:", JSON.stringify(data, null, 2));
            setDashboardData(data);
        } catch (err: any) {
            console.error("Erro ao buscar dados:", err);
            setError(err.message || "Não foi possível carregar os dados.");
        } finally {
            setIsLoading(false);
        }
    };

    // 6. USAR useEffect PARA CHAMAR A FUNÇÃO
    useEffect(() => {
        // Busca os dados apenas se a aba 'dashboard' estiver ativa
        if (activeTab === 'dashboard') {
            fetchDashboardData();
        }
        // Este 'effect' vai correr sempre que 'activeTab' mudar
    }, [activeTab]);

    const handleToggleMenu = () => {
        // ... (código existente)
        const next = !isMenuOpen;
        setIsMenuOpen(next);
        Animated.timing(menuAnim, { toValue: next ? 1 : 0, duration: 200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }).start();
    };
    const handleLogout = async () => {
        // ... (código existente)
        try {
            await logout();
        } finally {
            setIsMenuOpen(false);
            Animated.timing(menuAnim, { toValue: 0, duration: 200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }).start();
            if (onLogout) onLogout();
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                // 7. PASSAR OS DADOS, LOADING E ERRO PARA O COMPONENTE
                return (
                    <TeamDashboard 
                        data={dashboardData} 
                        loading={isLoading} 
                        error={error}
                        onRetry={fetchDashboardData} // Passa a função para o botão "Tentar Novamente"
                    />
                );
            case "players":
                return <PlayerProfile />;
            case "mindfulness":
                return <MindfulnessScreen />;
            // ... (outros cases)
            case "sleep-hygiene":
                return <SleepHygiene />;
            case "checkin":
                return <DailyCheckIn />;
            case "analytics":
                return <AnalyticsReports />;
            case "settings":
                return <SettingsPage />;
            default:
                return (
                    <TeamDashboard 
                        data={dashboardData} 
                        loading={isLoading} 
                        error={error}
                        onRetry={fetchDashboardData}
                    />
                );
        }
    };

    return (
        <View style={styles.container}>
            <Navigation onToggleMenu={handleToggleMenu} avatarText="TS" isMenuOpen={isMenuOpen} menuAnim={menuAnim} onLayoutHeader={(e: any) => setHeaderHeight(e.nativeEvent.layout.height)} />
            <View style={styles.mainContent}>
                {renderContent()}
            </View>

            {isMenuOpen && (
                <SideMenu
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onClose={() => { setIsMenuOpen(false); Animated.timing(menuAnim, { toValue: 0, duration: 200, easing: Easing.inOut(Easing.quad), useNativeDriver: true }).start(); }}
                    onLogout={handleLogout}
                    topOffset={headerHeight}
                />
            )}
        </View>
    );
};


// 8. ADICIONAR ESTILOS PARA OS NOVOS ELEMENTOS (BOTÃO TENTAR NOVAMENTE)
const styles = StyleSheet.create({
    // ... (todos os teus estilos existentes)
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        minHeight: 80,
    },
    headerNoBorder: {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 56,
    },
    headerCenter: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRight: {
        justifyContent: 'center',
        width: 56,
    },
    headerCenterRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navigationText: {
        color: '#374151',
        fontSize: 24,
        marginRight: 8,
    },
    headerLogo: {
        width: 24,
        height: 24,
    },
    appTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
    },
    appSubtitle: {
        fontSize: 11,
        color: '#9ca3af',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#D55C15',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 32,
        fontWeight: 'bold',
        fontSize: 14,
    },

    modalOverlay: {
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'row',
    },
    modalTouchOutside: {
        flex: 1,
    },
    sideMenuContainer: {
        width: width * 0.8,
        backgroundColor: '#fff',
        height: '100%',
    },
    sideMenuScroll: {
        flex: 1,
        paddingTop: 16,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderLeftWidth: 0,
        backgroundColor: 'transparent',
    },
    menuItemActive: {
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        marginHorizontal: 8,
    },
    menuIconLight: {
        fontSize: 20,
        color: '#6b7280',
        width: 30,
        textAlign: 'center',
    },
    menuLabelLight: {
        fontSize: 16,
        color: '#1f2937',
        marginLeft: 10,
        fontWeight: '400',
    },
    menuLabelActiveLight: {
        color: '#000',
        fontWeight: '600',
    },
    sideMenuFooter: {
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    logoutLabel: {
        fontSize: 16,
        color: '#ef4444',
        marginLeft: 10,
        fontWeight: '600',
    },

    dashboardContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    dashboardScrollContent: {
        paddingBottom: 24,
    },
    mainCard: {
        backgroundColor: '#D55C15',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainCardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    mainCardSubtitle: {
        fontSize: 14,
        color: '#fee2e2',
    },
    teamLogo: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    metricCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    metricLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    metricHint: {
        fontSize: 12,
        color: '#10b981', // Cor padrão (verde)
    },
    progressBar: {
        height: 6,
        backgroundColor: '#e5e7eb',
        borderRadius: 3,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#10b981',
        borderRadius: 3,
    },
    activitiesCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        marginTop: 8,
    },
    activitiesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1f2937',
    },
    activityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    activityName: {
        fontSize: 14,
        color: '#1f2937',
    },
    activityStatus: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#10b981',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20, // Adicionado para centralizar texto de erro
    },
    placeholderText: {
        fontSize: 20,
        color: '#6b7280',
        textAlign: 'center', // Adicionado
        marginBottom: 10,
    },
    // NOVO ESTILO
    retryButton: {
        backgroundColor: '#D55C15',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    // NOVO ESTILO
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});