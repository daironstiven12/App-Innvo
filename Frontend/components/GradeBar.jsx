import { View, Text, StyleSheet } from "react-native";

const colors = {
  text: "#111827",
  subtitle: "#6B7280",
  line: "#F3F4F6",
  danger: "#EF4444",
  success: "#10B981",
  primary: "#3B82F6",
  warning: "#F59E0B",
};

function getGradeColor(nota) {
  if (nota >= 4.1) return colors.success;
  if (nota >= 3.5) return colors.primary;
  if (nota >= 3.0) return colors.warning;
  return colors.danger;
}

export default function GradeBar({ materia, nota, color }) {
  const barColor = color || getGradeColor(nota);
  const porcentaje = Math.min((nota / 5) * 100, 100);
  const posicionLinea = 60;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.materiaRow}>
          <View style={[styles.dot, { backgroundColor: barColor }]} />
          <Text style={styles.materia} numberOfLines={1}>
            {materia}
          </Text>
        </View>
        <Text style={[styles.nota, { color: barColor }]}>
          {nota.toFixed(1)}
        </Text>
      </View>
      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            { width: `${porcentaje}%`, backgroundColor: barColor },
          ]}
        />
        <View style={[styles.minLine, { left: `${posicionLinea}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  materiaRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  materia: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  nota: {
    fontSize: 14,
    fontWeight: "800",
  },
  barBg: {
    height: 5,
    backgroundColor: colors.line,
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  minLine: {
    position: "absolute",
    top: -2,
    width: 2,
    height: 9,
    backgroundColor: colors.danger,
    borderRadius: 1,
  },
});
