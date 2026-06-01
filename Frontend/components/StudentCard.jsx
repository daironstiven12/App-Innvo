import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const colors = {
  primary: "#3B82F6",
  card: "#FFFFFF",
  text: "#111827",
  subtitle: "#6B7280",
};

export default function StudentCard({ nombre, carrera, institucion }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="school" size={22} color={colors.primary} />
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ACTIVO</Text>
        </View>
      </View>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.carrera}>{carrera}</Text>
      <View style={styles.divider} />
      <View style={styles.institucionRow}>
        <Ionicons name="location" size={14} color={colors.subtitle} />
        <Text style={styles.institucion}>{institucion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
  },
  nombre: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  carrera: {
    fontSize: 13,
    color: colors.subtitle,
    marginTop: 4,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  institucionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  institucion: {
    fontSize: 12,
    color: colors.subtitle,
    marginLeft: 6,
  },
});
