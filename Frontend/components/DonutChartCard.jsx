import { View, Text, StyleSheet } from "react-native";

const colors = {
  card: "#FFFFFF",
  text: "#111827",
  subtitle: "#6B7280",
};

const SIZE = 150;
const HALF = SIZE / 2;
const STROKE = 20;
const INNER_SIZE = SIZE - STROKE * 2;

export default function DonutChartCard({ data, titulo }) {
  const total = data.reduce((s, d) => s + d.valor, 0);

  const slices = [];
  let currentAngle = 0;

  data.forEach((item) => {
    const degrees = (item.porcentaje / 100) * 360;
    const start = currentAngle;
    const end = currentAngle + degrees;
    slices.push({ ...item, start, end, degrees });
    currentAngle = end;
  });

  const renderSlices = () => {
    const elements = [];

    slices.forEach((slice, sIndex) => {
      let remaining = slice.degrees;
      let rot = slice.start;

      while (remaining > 0) {
        const span = Math.min(remaining, 180);

        elements.push(
          <View
            key={`${sIndex}-${rot}`}
            style={{
              position: "absolute",
              width: HALF,
              height: SIZE,
              overflow: "hidden",
              transform: [{ rotate: `${rot - 90}deg` }],
            }}
          >
            <View
              style={{
                position: "absolute",
                left: -(HALF) * (1 - span / 180),
                width: SIZE,
                height: SIZE,
                borderRadius: HALF,
                borderWidth: STROKE,
                borderColor: slice.color,
                backgroundColor: "transparent",
              }}
            />
          </View>
        );

        rot += span;
        remaining -= span;
      }
    });

    return elements;
  };

  return (
    <View style={styles.container}>
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}

      <View style={styles.chartRow}>
        <View style={styles.donutWrapper}>
          <View style={styles.donut}>
            {renderSlices()}
            <View style={styles.center}>
              <Text style={styles.centerNumber}>{total}</Text>
              <Text style={styles.centerLabel}>Total</Text>
            </View>
          </View>
        </View>

        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <View style={styles.legendText}>
                <Text style={styles.legendLabel}>{item.label}</Text>
                <Text style={styles.legendValue}>
                  {item.valor} ({item.porcentaje}%)
                </Text>
              </View>
            </View>
          ))}
        </View>
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
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  donutWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  donut: {
    width: SIZE,
    height: SIZE,
    borderRadius: HALF,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    width: INNER_SIZE,
    height: INNER_SIZE,
    borderRadius: INNER_SIZE / 2,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  centerNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },
  centerLabel: {
    fontSize: 11,
    color: colors.subtitle,
    marginTop: 2,
  },
  legend: {
    flex: 1,
    marginLeft: 16,
    gap: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  legendValue: {
    fontSize: 11,
    color: colors.subtitle,
    marginTop: 1,
  },
});
