import { View, Text, StyleSheet } from "react-native";

const colors = {
  card: "#FFFFFF",
  text: "#111827",
  subtitle: "#6B7280",
  background: "#F4F6F8",
  danger: "#EF4444",
};

export default function ComparativeChart({ data, titulo }) {
  const { categorias, grupos } = data;
  const maxValor = Math.max(5.0, ...grupos.flatMap((g) => g.valores));
  const minAprobatoria = 3.0;
  const posicionLinea = (minAprobatoria / maxValor) * 100;

  return (
    <View style={styles.container}>
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}

      <View style={styles.legend}>
        {grupos.map((grupo, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: grupo.color }]}
            />
            <Text style={styles.legendLabel}>{grupo.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartArea}>
        {categorias.map((cat, cIndex) => (
          <View key={cIndex} style={styles.catColumn}>
            <View style={styles.barsContainer}>
              {grupos.map((grupo, gIndex) => {
                const valor = grupo.valores[cIndex] || 0;
                const altura = (valor / maxValor) * 100;

                return (
                  <View key={gIndex} style={styles.barGroup}>
                    <Text style={styles.barValue}>{valor.toFixed(1)}</Text>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.bar,
                          {
                            height: `${altura}%`,
                            backgroundColor: grupo.color,
                          },
                        ]}
                      />
                    </View>
                  </View>
                );
              })}
            </View>

            <Text style={styles.catLabel} numberOfLines={1}>
              {cat}
            </Text>
          </View>
        ))}

        <View
          style={[
            styles.referenceLine,
            { bottom: `${posicionLinea}%` },
          ]}
        />
      </View>

      <View style={styles.minNote}>
        <View style={styles.minLineIndicator} />
        <Text style={styles.minNoteText}>
          Línea mínima aprobatoria: 3.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  titulo: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: colors.subtitle,
    fontWeight: "600",
  },
  chartArea: {
    height: 190,
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
    paddingBottom: 4,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  catColumn: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
    gap: 4,
    paddingBottom: 4,
  },
  barGroup: {
    alignItems: "center",
    width: 22,
  },
  barValue: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 3,
  },
  barTrack: {
    width: 18,
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  bar: {
    width: "100%",
    borderRadius: 4,
    minHeight: 2,
  },
  catLabel: {
    fontSize: 8,
    color: colors.subtitle,
    fontWeight: "500",
    marginTop: 6,
    textAlign: "center",
    transform: [{ rotate: "-45deg" }],
    width: 40,
  },
  referenceLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.danger,
    opacity: 0.6,
    zIndex: 10,
  },
  minNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  minLineIndicator: {
    width: 20,
    height: 2,
    backgroundColor: colors.danger,
    opacity: 0.6,
    marginRight: 6,
  },
  minNoteText: {
    fontSize: 11,
    color: colors.subtitle,
  },
});
