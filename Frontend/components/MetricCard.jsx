import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const colors = {
  card: "#FFFFFF",
  text: "#111827",
  subtitle: "#6B7280",
};

const iconMap = {
  "book": "book",
  "check-circle": "checkmark-circle",
  "x-circle": "close-circle",
  "award": "trophy",
  "alert-triangle": "warning",
  "bar-chart": "bar-chart",
};

export default function MetricCard({ icono, valor, titulo, color }) {
  const iconName = iconMap[icono] || icono;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color + "18" }]}>
        <Ionicons name={iconName} size={22} color={color} />
      </View>
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  valor: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
  },
  titulo: {
    fontSize: 12,
    color: colors.subtitle,
    marginTop: 4,
    fontWeight: "500",
  },
});
