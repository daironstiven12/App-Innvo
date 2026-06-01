import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import BottomTabs from "../components/BottomTabs";

const colors = {
  background: "#F4F6F8",
  text: "#111827",
  subtitle: "#6B7280",
  card: "#FFFFFF",
  primary: "#3B82F6",
};

const years = ["2026", "2025"];
const periods = ["Periodo 1", "Periodo 2", "Periodo 3", "Periodo 4"];

const subjects = [
  { name: "QUÍMICA", category: "CIENCIAS NATURALES ..." },
  { name: "FILOSOFÍA", category: "CIENCIAS SOCIALES" },
  { name: "ECONOMÍA", category: "CIENCIAS SOCIALES" },
  { name: "EDUCACIÓN ARTÍSTICA", category: "EDUCACIÓN ARTÍSTICA" },
];

export default function Calificaciones() {
  const [selectedYear, setSelectedYear] = useState("2026");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>Académico</Text>
          <Text style={styles.subtitulo}>
            Calificaciones: Adrian Gunampio Barri...
          </Text>
        </View>

        <View style={styles.yearRow}>
          {years.map((year) => (
            <TouchableOpacity
              key={year}
              style={[
                styles.yearTab,
                selectedYear === year && styles.yearTabActive,
              ]}
              onPress={() => setSelectedYear(year)}
            >
              <Text
                style={[
                  styles.yearText,
                  selectedYear === year && styles.yearTextActive,
                ]}
              >
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.periodsCard}>
          {periods.map((period, index) => (
            <View
              key={period}
              style={[
                styles.periodRow,
                index < periods.length - 1 && styles.periodBorder,
              ]}
            >
              <Text style={styles.periodText}>{period}</Text>
            </View>
          ))}
        </View>

        <View style={styles.subjectsCard}>
          {subjects.map((subject, index) => (
            <View
              key={subject.name}
              style={[
                styles.subjectRow,
                index < subjects.length - 1 && styles.subjectBorder,
              ]}
            >
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectCategory}>{subject.category}</Text>
            </View>
          ))}
        </View>
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
  scrollContent: {
    paddingBottom: 100,
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
  yearRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  yearTab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  yearTabActive: {
    backgroundColor: colors.primary,
  },
  yearText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.subtitle,
  },
  yearTextActive: {
    color: "#FFFFFF",
  },
  periodsCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  periodRow: {
    paddingVertical: 14,
  },
  periodBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  periodText: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
  },
  subjectsCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  subjectRow: {
    paddingVertical: 14,
  },
  subjectBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  subjectName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  subjectCategory: {
    fontSize: 12,
    color: colors.subtitle,
    marginTop: 3,
  },
});
