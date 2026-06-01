import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import AnalyticsHeader from "../components/AnalyticsHeader";
import SubjectGradeItem from "../components/SubjectGradeItem";
import DonutChartCard from "../components/DonutChartCard";
import ComparativeChart from "../components/ComparativeChart";
import { fetchDashboard } from "../services/api";

const colors = {
  background: "#F4F6F8",
  text: "#111827",
  subtitle: "#6B7280",
  card: "#FFFFFF",
};

export default function Analiticas() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <AnalyticsHeader titulo="Analíticas" subtitulo="Rendimiento académico" />
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </SafeAreaView>
    );
  }

  const { calificaciones, desempeno, comparativas } = data;

  const renderGradeItem = ({ item }) => (
    <SubjectGradeItem materia={item.materia} nota={item.nota} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={calificaciones}
        renderItem={renderGradeItem}
        keyExtractor={(item) => item.materia}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <AnalyticsHeader titulo="Analíticas" subtitulo="Rendimiento académico" />
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Calificaciones por Asignatura</Text>
            </View>

            <View style={styles.gradesCard}>
              {calificaciones && calificaciones.slice(0, 8).map((item, index) => (
                <View
                  key={item.materia}
                  style={index < 7 ? styles.gradeBorder : null}
                >
                  <SubjectGradeItem materia={item.materia} nota={item.nota} />
                </View>
              ))}
              <View style={styles.verMas}>
                <Text style={styles.verMasLinea}>
                  ... y {calificaciones.length - 8} materias más
                </Text>
              </View>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <>
            {desempeno && desempeno.niveles && (
              <DonutChartCard data={desempeno.niveles} titulo="Distribución por Desempeño" />
            )}
            {comparativas && (
              <ComparativeChart data={comparativas} titulo="Rendimiento Comparativo" />
            )}
            <View style={{ height: 40 }} />
          </>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  gradesCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  gradeBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  verMas: {
    alignItems: "center",
    paddingVertical: 12,
  },
  verMasLinea: {
    fontSize: 12,
    color: colors.subtitle,
    fontWeight: "500",
  },
});
