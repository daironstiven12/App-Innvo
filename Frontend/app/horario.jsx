import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ScheduleCard from "../components/ScheduleCard";
import { fetchDashboard } from "../services/api";

const colors = {
  background: "#F4F6F8",
  text: "#111827",
  subtitle: "#6B7280",
  card: "#FFFFFF",
  primary: "#3B82F6",
};

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function Horario() {
  const [horario, setHorario] = useState([]);
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const router = useRouter();

  useEffect(() => {
    fetchDashboard()
      .then((data) => setHorario(data.horario || []))
      .catch(() => {});
  }, []);

  const horarioFiltrado = horario.filter((item) => item.dia === diaActivo);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.titulo}>Horario</Text>
          <Text style={styles.subtitulo}>Semana actual</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.diasContainer}
      >
        {dias.map((dia) => (
          <TouchableOpacity
            key={dia}
            onPress={() => setDiaActivo(dia)}
            style={[styles.diaTab, diaActivo === dia && styles.diaTabActive]}
          >
            <Text
              style={[
                styles.diaText,
                diaActivo === dia && styles.diaTextActive,
              ]}
            >
              {dia}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {horarioFiltrado.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Sin clases este día</Text>
          </View>
        ) : (
          <View style={styles.scheduleList}>
            {horarioFiltrado.map((item, index) => (
              <ScheduleCard
                key={index}
                inicio={item.inicio}
                fin={item.fin}
                materia={item.materia}
                docente={item.docente}
                isLast={index === horarioFiltrado.length - 1}
              />
            ))}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  headerText: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  subtitulo: {
    fontSize: 13,
    color: colors.subtitle,
    marginTop: 2,
  },
  diasContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  diaTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.card,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  diaTabActive: {
    backgroundColor: colors.primary,
  },
  diaText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.subtitle,
  },
  diaTextActive: {
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingTop: 4,
  },
  scheduleList: {
    paddingHorizontal: 20,
  },
  empty: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: colors.subtitle,
    fontSize: 14,
  },
});
