import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BottomTabs from "../components/BottomTabs";

const colors = {
  background: "#F4F6F8",
  text: "#111827",
  subtitle: "#6B7280",
  card: "#FFFFFF",
};

export default function Comunicados() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Académico</Text>
          <Text style={styles.subtitulo}>Comunicados</Text>
        </View>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Sin comunicados</Text>
          <Text style={styles.emptySubtitle}>
            Los mensajes y circulares aparecerán aquí
          </Text>
        </View>
      </View>

      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  subtitulo: {
    fontSize: 14,
    color: colors.subtitle,
    marginTop: 4,
  },
  emptyCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.subtitle,
    marginTop: 8,
    textAlign: "center",
  },
});
