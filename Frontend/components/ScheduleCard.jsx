import { View, Text, StyleSheet } from "react-native";

const colors = {
  primary: "#3B82F6",
  card: "#FFFFFF",
  text: "#111827",
  subtitle: "#6B7280",
  line: "#E5E7EB",
};

export default function ScheduleCard({ inicio, fin, materia, docente, isLast }) {
  return (
    <View style={styles.container}>
      <View style={styles.timeColumn}>
        <Text style={styles.time}>{inicio}</Text>
        <View style={styles.timeDot} />
        <Text style={styles.time}>{fin}</Text>
      </View>
      <View style={styles.lineColumn}>
        <View style={[styles.line, isLast && styles.lineHidden]} />
        <View style={styles.dot} />
      </View>
      <View style={styles.content}>
        <Text style={styles.materia}>{materia}</Text>
        <Text style={styles.docente}>{docente}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 4,
  },
  timeColumn: {
    width: 50,
    alignItems: "center",
    paddingTop: 2,
  },
  time: {
    fontSize: 11,
    color: colors.subtitle,
    fontWeight: "600",
  },
  timeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.subtitle,
    marginVertical: 6,
  },
  lineColumn: {
    width: 24,
    alignItems: "center",
    marginHorizontal: 8,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.line,
    position: "absolute",
    top: 0,
    bottom: 0,
  },
  lineHidden: {
    opacity: 0,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginTop: 8,
    zIndex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  materia: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  docente: {
    fontSize: 12,
    color: colors.subtitle,
    marginTop: 4,
  },
});
