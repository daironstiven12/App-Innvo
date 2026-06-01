import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import StudentCard from "../components/StudentCard";
import PeriodTabs from "../components/PeriodTabs";
import MetricCard from "../components/MetricCard";
import ScheduleCard from "../components/ScheduleCard";
import GradeBar from "../components/GradeBar";
import PerformanceDonut from "../components/PerformanceDonut";
import ComparativeChart from "../components/ComparativeChart";
import SectionTitle from "../components/SectionTitle";
import BottomTabs from "../components/BottomTabs";
import { fetchDashboard } from "../services/api";

const colors = {
  background: "#F4F6F8",
  text: "#111827",
  subtitle: "#6B7280",
  card: "#FFFFFF",
};

function getGradeColor(nota) {
  if (nota >= 4.1) return "#10B981";
  if (nota >= 3.5) return "#3B82F6";
  if (nota >= 3.0) return "#F59E0B";
  return "#EF4444";
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [periodoActivo, setPeriodoActivo] = useState("1");
  const router = useRouter();

  useEffect(() => {
    fetchDashboard()
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <Header titulo="Académico" subtitulo="Inicio" iniciales="--" />
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
        <BottomTabs />
      </SafeAreaView>
    );
  }

  const { estudiante, metricas, horario, calificaciones, desempeno, comparativas, periodos } = data;

  const renderMetrica = ({ item }) => (
    <MetricCard icono={item.icono} valor={item.valor} titulo={item.titulo} color={item.color} />
  );

  const renderScheduleItem = (item, index) => (
    <ScheduleCard
      key={index}
      inicio={item.inicio}
      fin={item.fin}
      materia={item.materia}
      docente={item.docente}
      isLast={index === horario.length - 1}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header titulo="Académico" subtitulo="Inicio" iniciales={estudiante?.iniciales || "--"} />

        {estudiante && (
          <StudentCard nombre={estudiante.nombre} carrera={estudiante.carrera} institucion={estudiante.institucion} />
        )}

        {periodos && (
          <PeriodTabs activo={periodoActivo} onSelect={setPeriodoActivo} />
        )}

        <SectionTitle titulo="Métricas" />

        <FlatList
          data={metricas}
          renderItem={renderMetrica}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsGrid}
        />

        <View style={styles.sectionRow}>
          <SectionTitle titulo="Horario de Hoy" />
          <TouchableOpacity onPress={() => router.push("/horario")}>
            <Text style={styles.sectionLink}>Ver más</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scheduleContainer}>
          {horario && horario.filter((item) => item.dia === "Lunes").map((item, index) => renderScheduleItem(item, index))}
        </View>

        <View style={styles.sectionRow}>
          <SectionTitle titulo="Calificaciones por Asignatura" />
          <TouchableOpacity onPress={() => router.push("/analiticas")}>
            <Text style={styles.sectionLink}>Analíticas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gradesCard}>
          {calificaciones && calificaciones.map((item, index) => (
            <View
              key={item.materia}
              style={index < calificaciones.length - 1 ? styles.gradeBorder : null}
            >
              <GradeBar
                materia={item.materia}
                nota={item.nota}
                color={getGradeColor(item.nota)}
              />
            </View>
          ))}
        </View>

        {desempeno && desempeno.niveles && (
          <PerformanceDonut data={desempeno.niveles} titulo="Distribución por Desempeño" />
        )}

        {comparativas && (
          <ComparativeChart data={comparativas} titulo="Rendimiento Comparativo" />
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  metricsGrid: {
    paddingHorizontal: 14,
  },
  scheduleContainer: {
    paddingHorizontal: 20,
  },
  gradesCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
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
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  sectionLink: {
    fontSize: 13,
    color: colors.subtitle,
    fontWeight: "500",
    marginTop: 12,
  },
});
