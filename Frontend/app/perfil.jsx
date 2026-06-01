import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchDashboard } from "../services/api";

const colors = {
  background: "#F4F6F8",
  text: "#111827",
  subtitle: "#6B7280",
  card: "#FFFFFF",
  primary: "#3B82F6",
};

const iconMap = {
  correo: "mail",
  telefono: "call",
  direccion: "map",
  ingreso: "calendar",
};

const labelMap = {
  correo: "Correo",
  telefono: "Teléfono",
  direccion: "Dirección",
  ingreso: "Ingreso",
};

export default function Perfil() {
  const [estudiante, setEstudiante] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchDashboard()
      .then((data) => setEstudiante(data.estudiante || null))
      .catch(() => {});
  }, []);

  if (!estudiante) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.titulo}>Perfil</Text>
        </View>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </SafeAreaView>
    );
  }

  const infoItems = [
    { icon: iconMap.correo, label: labelMap.correo, value: estudiante.correo || "" },
    { icon: iconMap.telefono, label: labelMap.telefono, value: estudiante.telefono || "" },
    { icon: iconMap.direccion, label: labelMap.direccion, value: estudiante.direccion || "" },
    { icon: iconMap.ingreso, label: labelMap.ingreso, value: estudiante.ingreso || "" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Perfil</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{estudiante.iniciales || "--"}</Text>
          </View>
          <Text style={styles.nombre}>{estudiante.nombre}</Text>
          <Text style={styles.carrera}>{estudiante.carrera}</Text>
        </View>

        <View style={styles.infoCard}>
          {infoItems.map((item, index) => (
            <View
              key={index}
              style={[
                styles.infoRow,
                index < infoItems.length - 1 && styles.infoRowBorder,
              ]}
            >
              <View style={styles.infoIconContainer}>
                <Ionicons name={item.icon} size={18} color={colors.primary} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.configButton}
          onPress={() => router.push("/configuracion")}
        >
          <Ionicons name="settings-outline" size={20} color={colors.subtitle} />
          <Text style={styles.configText}>Configuración</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.subtitle} />
        </TouchableOpacity>

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
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingTop: 12,
  },
  profileCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  nombre: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  carrera: {
    fontSize: 13,
    color: colors.subtitle,
    marginTop: 6,
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.subtitle,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginTop: 2,
  },
  configButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  configText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 12,
  },
});
