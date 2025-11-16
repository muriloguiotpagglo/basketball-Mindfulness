import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
    width: '90%',
    maxWidth: 400,
  },
  animationContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backboard: { width: 80, height: 48, backgroundColor: '#d1d5db', borderWidth: 2, borderColor: '#9ca3af', borderRadius: 4, marginBottom: 4, position: 'relative' },
  backboardInner: { position: 'absolute', top: 4, left: 4, right: 4, bottom: 4, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#d1d5db' },
  rim: { width: 64, height: 12, backgroundColor: '#D55C15', borderRadius: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  net: { position: 'absolute', top: '100%', width: 64, height: 32, backgroundColor: '#f3f4f6', borderTopColor: '#d1d5db', borderTopWidth: 2, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, opacity: 0.7, transform: [{ translateY: -10 }] },
  basketball: { position: 'absolute' },
  basketballImage: { width: 40, height: 40 },
  celebrationContent: {
    alignItems: 'center',
    gap: 16,
    marginTop: 100, 
    zIndex: 2,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  mainLogo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c02e00',
  },
  subtitle: {
    fontSize: 18,
    color: '#D55C15',
  },
  streakBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakText: {
    fontWeight: '500',
    color: '#c02e00',
  },
  streakValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D55C15',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#D55C15',
  },
  specialMilestone: {
    backgroundColor: '#fff7ed',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D55C15',
  },
  specialMilestoneText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#c02e00',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D55C15',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
