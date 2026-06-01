import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

const colors = {
  primary: "#3B82F6",
  card: "#FFFFFF",
  text: "#111827",
  subtitle: "#6B7280",
  background: "#F4F6F8",
};

const tabs = [
  {
    name: "dashboard",
    label: "Inicio",
    icon: "home",
    iconActive: "home",
  },
  {
    name: "calificaciones",
    label: "Calificaciones",
    icon: "document-text-outline",
    iconActive: "document-text",
  },
  {
    name: "comunicados",
    label: "Comunicados",
    icon: "chatbubble-ellipses-outline",
    iconActive: "chatbubble-ellipses",
  },
];

export default function BottomTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (name) => {
    return pathname === `/${name}` || pathname === name;
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = isActive(tab.name);
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(`/${tab.name}`)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={active ? tab.iconActive : tab.icon}
              size={22}
              color={active ? colors.primary : colors.subtitle}
            />
            <Text
              style={[
                styles.tabLabel,
                active && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
            {active && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.card,
    paddingTop: 8,
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    position: "relative",
  },
  tabLabel: {
    fontSize: 11,
    color: colors.subtitle,
    marginTop: 4,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: "700",
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    width: 24,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.primary,
  },
});
