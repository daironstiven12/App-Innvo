import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const colors = {
  primary: "#3B82F6",
  card: "#FFFFFF",
  text: "#111827",
  subtitle: "#6B7280",
};

const periodos = [
  { id: "1", label: "Periodo 1" },
  { id: "2", label: "Periodo 2" },
  { id: "3", label: "Periodo 3" },
  { id: "4", label: "Periodo 4" },
];

export default function PeriodTabs({ activo, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {periodos.map((p) => {
        const isActive = p.id === activo;
        return (
          <TouchableOpacity
            key={p.id}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onSelect && onSelect(p.id)}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {p.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.subtitle,
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
});
