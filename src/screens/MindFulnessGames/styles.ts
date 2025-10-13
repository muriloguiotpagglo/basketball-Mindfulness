import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f4f5', // zinc-100
  },
  gameWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  mutedText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  
  // Cards e containers genéricos
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cardHeaderCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  cardContent: {
    padding: 16,
    gap: 20,
  },
  
  // Tabs
  tabsListWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabsList: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 4,
    gap: 4,
  },
  tabTrigger: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  tabTriggerActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f97316',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginLeft: 4,
  },
  tabTextActive: {
    color: '#1f2937',
  },
  tabsContentWrapper: {
    flex: 1,
  },

  // Botões
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f97316',
    flex: 1,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f97316',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonOutlineText: {
    color: '#f97316',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  statsGrid4Col: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },

  // Breathing Game
  breathingBallContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 256,
  },
  breathingBall: {
    width: 192,
    height: 192,
    borderRadius: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingBallInner: {
    alignItems: 'center',
  },
  breathingBallText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  phaseInfo: {
    alignItems: 'center',
    gap: 8,
  },
  phaseInstruction: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    maxWidth: 300,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#f97316',
    borderRadius: 4,
  },

  // Focus Game
  focusGameArea: {
    width: '100%',
    height: 250,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1e5f8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  focusTarget: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  targetInner: {
    width: '100%',
    height: '100%',
  },
  targetImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gamePlaceholder: {
    alignItems: 'center',
  },
  placeholderImage: {
    width: 60,
    height: 60,
    opacity: 0.4,
    marginBottom: 10,
  },
  placeholderText: {
    color: '#6b7280',
    fontSize: 16,
  },

  // Meditation Timer
  timerCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    position: 'relative',
  },
  timerCircleBackground: {
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: '#a855f7', // purple-500
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Importante para o overlay de progresso
  },
  timerCircleForeground: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  timerCircleInnerContent: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3,
  },
  timerTimeText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
  },
  completionMessage: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ecfdf5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  completionText: {
    fontSize: 14,
    color: '#047857',
  },
  durationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  durationButtonActive: {
    backgroundColor: '#fff7ed',
    borderColor: '#f97316',
    borderWidth: 2,
  },

  // Ranking
  rankingHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankingLogo: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  rankingList: {
    gap: 12,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  rankNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffedd5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallback: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f97316',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  playerStats: {
    flexDirection: 'row',
    gap: 8,
  },
  playerStatText: {
    fontSize: 12,
    color: '#6b7280',
  },
  scoreDetails: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsGridHalf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  top3List: {
    gap: 10,
  },
  top3Item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  top3RankText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    width: 20,
    textAlign: 'center',
  },
  top3Name: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  scoreItemBlue: { flex: 1, backgroundColor: '#eff6ff', padding: 12, borderRadius: 8, alignItems: 'center' },
  scoreItemOrange: { flex: 1, backgroundColor: '#fff7ed', padding: 12, borderRadius: 8, alignItems: 'center' },
  scoreItemPurple: { flex: 1, backgroundColor: '#f5f3ff', padding: 12, borderRadius: 8, alignItems: 'center' },
  scoreLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  scoreValueBig: { fontSize: 28, fontWeight: 'bold' },
  scoreHint: { fontSize: 10, color: '#6b7280', marginTop: 4 },
  
  alienGameArea: {
    width: '100%',
    height: 400,
    backgroundColor: '#fb923c', 
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'relative',
    alignItems: 'flex-end',
  },
  alienPlayerContainer: {
    alignItems: 'center',
    width: 60,
    marginBottom: 10,
    zIndex: 10,
  },
  alienImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: -10,
  },
  alienBody: {
    width: 40,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  courtAndAimContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '100%',
      position: 'relative',
      paddingHorizontal: 10,
  },
  courtCenter: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
  },
  courtText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 0.4)',
  },
  courtLogo: {
      width: 60,
      height: 60,
      opacity: 0.3,
  },
  aimBarWrapper: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 10,
    zIndex: 11,
  },
  aimBarBackground: {
    width: 24,
    height: '100%',
    backgroundColor: '#374151',
    borderRadius: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  aimZone: {
      position: 'absolute',
      width: '100%',
      left: 0,
      borderRadius: 2,
      opacity: 0.6,
  },
  aimIndicator: {
    position: 'absolute',
    width: '150%',
    height: 20,
    left: '-25%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -10 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  aimIndicatorText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  aimBarTextWrapper: {
      alignItems: 'center',
      marginTop: 5,
  },
  aimBarText: {
    fontSize: 12,
    fontWeight: '600',
  },
  gameControls: {
    flexDirection: 'row',
    gap: 16,
  },
  player1Button: {
    backgroundColor: '#3b82f6',
    flex: 1,
  },
  player2Button: {
    backgroundColor: '#a855f7',
    flex: 1,
  },
  alienGameOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  overlaySubtitle: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
  overlayScore: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  legendBox: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 10,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 13,
    color: '#4b5563',
  },
  legendHint: {
      fontSize: 12,
      color: '#92400e',
      textAlign: 'center',
      marginTop: 10,
  }
});

export default styles;