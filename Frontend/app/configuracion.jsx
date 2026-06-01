import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const colors = {
  background: "#F4F6F8",
  text: "#111827",
  subtitle: "#6B7280",
  card: "#FFFFFF",
  primary: "#3B82F6",
  danger: "#EF4444",
};

const configItems = [
  {
    section: "General",
    items: [
      { icon: "notifications", label: "Notificaciones", value: true },
      { icon: "moon", label: "Modo oscuro", value: false },
      { icon: "language", label: "Idioma", value: "Español" },
    ],
  },
  {
    section: "Cuenta",
    items: [
      { icon: "lock-closed", label: "Cambiar contraseña" },
      { icon: "finger-print", label: "Biometría" },
    ],
  },
  {
    section: "Información",
    items: [
      { icon: "information-circle", label: "Acerca de" },
      { icon: "document-text", label: "Términos y condiciones" },
    ],
  },
];

function Toggle({ value }) {
  return (
    <View
      style={[
        toggleStyles.track,
        value && toggleStyles.trackActive,
      ]}
    >
      <View
        style={[
          toggleStyles.thumb,
          value && toggleStyles.thumbActive,
        ]}
      />
    </View>
  );
}

const toggleStyles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D1D5DB",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  trackActive: {
    backgroundColor: colors.primary,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbActive: {
    alignSelf: "flex-end",
  },
});

export default function Configuracion() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Configuración</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {configItems.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={iIndex}
                  style={[
                    styles.configRow,
                    iIndex < section.items.length - 1 && styles.configRowBorder,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={colors.subtitle}
                  />
                  <Text style={styles.configLabel}>{item.label}</Text>
                  {item.value !== undefined ? (
                    typeof item.value === "boolean" ? (
                      <Toggle value={item.value} />
                    ) : (
                      <Text style={styles.configValue}>{item.value}</Text>
                    )
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={colors.subtitle}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
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
  scrollContent: {
    paddingTop: 12,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.subtitle,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 8,
  },
  sectionCard: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  configRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  configLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: colors.text,
    marginLeft: 12,
  },
  configValue: {
    fontSize: 14,
    color: colors.subtitle,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.danger,
    marginLeft: 8,
  },
});
