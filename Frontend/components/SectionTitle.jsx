import { View, Text, StyleSheet } from "react-native";

const colors = {
  text: "#111827",
};

export default function SectionTitle({ titulo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
});
