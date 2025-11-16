import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { Icon } from '../../components/ui/Icon';
import { AppLogo } from '../../components/ui/AppLogo';

import AnalyticsReports from '../AnalyticsReport';
import DailyCheckIn from '../DailyCheckin';
import { SettingsPage } from './SettingsPage';
import MindfulnessScreen from '../Mindfulness'
import { logout } from '../../services/auth'

const { width } = Dimensions.get('window');

const PlayerProfile = () => <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Player Profile</Text></View>;
const SleepHygiene = () => <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Sleep Hygiene</Text></View>;
const Multidisciplinary = () => <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Multidisciplinary</Text></View>;

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard' },
    { id: 'players', label: 'Atletas', iconName: 'players' },
    { id: 'mindfulness', label: 'Mindfulness', iconName: 'mindfulness' },
    { id: 'sleep-hygiene', label: 'Higienização do Sono', iconName: 'sleep-hygiene' },
    { id: 'multidisciplinary', label: 'Multiprofissional', iconName: 'multidisciplinary' },
    { id: 'checkin', label: 'Check-in', iconName: 'checkin' },
    { id: 'analytics', label: 'Relatórios', iconName: 'analytics' },
    { id: 'settings', label: 'Configurações', iconName: 'settings' },
];

const Navigation = ({ onToggleMenu, avatarText }: any) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onToggleMenu} style={styles.headerLeft}>
            <Icon name="menu" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
            <View style={styles.headerCenterRow}>
                <AppLogo size={24} style={{ marginRight: 8 }} />
                <View>
                    <Text style={styles.appTitle}>MindfulBasket</Text>
                    <Text style={styles.appSubtitle}>Sistema de Monitoramento</Text>
                </View>
            </View>
        </View>
        <View style={styles.headerRight}>
            <Text style={styles.avatar}>{avatarText}</Text>
        </View>
    </View>
);

const SideMenu = ({ activeTab, onTabChange, onClose, avatarText, onLogout }: { activeTab: string, onTabChange: (tab: string) => void, onClose: () => void, avatarText: string, onLogout: () => void }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.sideMenuContainer}>
                
                <View style={styles.sideMenuHeader}>
                    
                    <TouchableOpacity onPress={onClose} style={styles.sideMenuHeaderClose}>
                        <Icon name="close" size={20} color="#374151" />
                    </TouchableOpacity>
                    
                    <AppLogo size={24} style={styles.sideMenuLogo} />
                    <View style={styles.sideMenuHeaderCenter}>
                        <Text style={styles.sideMenuAppTitle}>MindfulBasket</Text>
                        <Text style={styles.sideMenuAppSubtitle}>Sistema de Monitoramento</Text>
                    </View>
                    <View style={styles.sideMenuHeaderRight}>
                        <Text style={styles.avatar}>{avatarText}</Text>
                    </View>
                </View>

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
                            <Icon name={item.iconName} size={20} color="#6b7280" style={{ width: 30, textAlign: 'center' }} />
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
    </Modal>
);

const TeamDashboard = () => (
    <ScrollView contentContainerStyle={styles.dashboardScrollContent} style={styles.dashboardContainer}>

        <View style={styles.mainCard}>
            <View>
                <Text style={styles.mainCardTitle}>Dashboard da Equipe</Text>
                <Text style={styles.mainCardSubtitle}>Monitoramento de bem-estar e mindfulness</Text>
            </View>
            <Image
                source={{ uri: 'https://placehold.co/60x60/ffffff/000?text=BRASILIA' }}
                style={styles.teamLogo}
            />
        </View>

        <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total de Atletas</Text>
            <Text style={styles.metricValue}>12</Text>
            <Text style={styles.metricHint}>+2 desde o mês passado</Text>
        </View>
        <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Bem-estar Médio</Text>
            <Text style={styles.metricValue}>78%</Text>
            <View style={styles.progressBar}><View style={[styles.progressFill, { width: '78%' }]} /></View>
        </View>
        <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Sessões Hoje</Text>
            <Text style={styles.metricValue}>8</Text>
            <Text style={styles.metricHint}>67% dos atletas ativos</Text>
        </View>
        <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Nível de Stress</Text>
            <Text style={styles.metricValue}>35%</Text>
            <View style={styles.progressBar}><View style={[styles.progressFill, { width: '35%', backgroundColor: '#D55C15' }]} /></View>
        </View>

        <View style={styles.activitiesCard}>
            <Text style={styles.activitiesTitle}>Atividades Recentes</Text>
            <View style={styles.activityItem}>
                <Text style={styles.activityName}>João Silva</Text>
                <Text style={styles.activityStatus}>Concluído</Text>
            </View>
            <View style={styles.activityItem}>
                <Text style={styles.activityName}>Maria Santos</Text>
                <Text style={styles.activityStatus}>Bom</Text>
            </View>
        </View>

        <View style={{ height: 50 }} />
    </ScrollView>
);


export const MainScreen: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(true);
        console.log("Comportamento de abrir menu lateral acionado. Estado isMenuOpen: true");
    };
    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setIsMenuOpen(false);
            if (onLogout) onLogout();
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <TeamDashboard />;
            case "players":
                return <PlayerProfile />;
            case "mindfulness":
                return <MindfulnessScreen />;
            case "sleep-hygiene":
                return <SleepHygiene />;
            case "multidisciplinary":
                return <Multidisciplinary />;
            case "checkin":
                return <DailyCheckIn />;
            case "analytics":
                return <AnalyticsReports />;
            case "settings":
                return <SettingsPage />;
            default:
                return <TeamDashboard />;
        }
    };

    return (
        <View style={styles.container}>
            <Navigation onToggleMenu={handleToggleMenu} avatarText="TS" />
            <View style={styles.mainContent}>
                {renderContent()}
            </View>

            {isMenuOpen && (
                <SideMenu
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onClose={() => setIsMenuOpen(false)}
                    avatarText="TS"
                    onLogout={handleLogout}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    mainContent: {
        flex: 1,
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
        flex: 1,
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
        paddingTop: 8,
    },
    sideMenuHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        width: '100%',
    },
    sideMenuHeaderClose: {
        position: 'absolute',
        top: 40,
        left: 8,
        zIndex: 10,
    },
    sideMenuCloseIcon: {
        fontSize: 20,
        color: '#374151',
        fontWeight: '500',
    },
    sideMenuLogo: {
        width: 24,
        height: 24,
        marginLeft: 40,
    },
    sideMenuAppTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    sideMenuAppSubtitle: {
        fontSize: 11,
        color: '#9ca3af',
    },
    sideMenuHeaderCenter: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 8,
    },
    sideMenuHeaderRight: {
        justifyContent: 'center',
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
        color: '#1f2937',
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

    // Estilos do Dashboard (Conteúdo, mantidos)
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
        color: '#10b981',
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
    },
    placeholderText: {
        fontSize: 20,
        color: '#6b7280',
    },
});
