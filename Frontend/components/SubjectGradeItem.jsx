import { View, Text, StyleSheet } from "react-native";

const colors = {
  text: "#111827",
  subtitle: "#6B7280",
  line: "#E5E7EB",
  danger: "#EF4444",
  success: "#10B981",
  primary: "#3B82F6",
  warning: "#F59E0B",
};

function getGradeColor(nota) {
  if (nota >= 4.5) return colors.success;
  if (nota >= 3.5) return colors.primary;
  if (nota >= 3.0) return colors.warning;
  return colors.danger;
}

function getGradeLabel(nota) {
  if (nota >= 4.5) return "Excelente";
  if (nota >= 3.5) return "Bueno";
  if (nota >= 3.0) return "Básico";
  return "Bajo";
}

export default function SubjectGradeItem({ materia, nota }) {
  const gradeColor = getGradeColor(nota);
  const porcentaje = Math.min((nota / 5) * 100, 100);
  const minAprobatoria = 3.0;
  const posicionLinea = (minAprobatoria / 5) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.materiaRow}>
          <View style={[styles.indicator, { backgroundColor: gradeColor }]} />
          <Text style={styles.materia}>{materia}</Text>
        </View>
        <Text style={[styles.nota, { color: gradeColor }]}>
          {nota.toFixed(1)}
        </Text>
      </View>

      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              { width: `${porcentaje}%`, backgroundColor: gradeColor },
            ]}
          />
          <View
            style={[
              styles.minLine,
              { left: `${posicionLinea}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.label, { color: gradeColor }]}>
          {getGradeLabel(nota)}
        </Text>
        <Text style={styles.minLabel}>Mín. 3.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  materiaRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  materia: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    letterSpacing: 0.3,
  },
  nota: {
    fontSize: 15,
    fontWeight: "800",
  },
  barContainer: {
    marginBottom: 6,
  },
  barBackground: {
    height: 6,
    backgroundColor: "#F3F4F6",
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
    height: 10,
    backgroundColor: colors.danger,
    borderRadius: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },
  minLabel: {
    fontSize: 10,
    color: colors.subtitle,
  },
});
