import { View, Text, StyleSheet } from "react-native";

const colors = {
  card: "#FFFFFF",
  text: "#111827",
  subtitle: "#6B7280",
};

const SIZE = 140;
const HALF = SIZE / 2;
const STROKE = 20;
const INNER = SIZE - STROKE * 2;

export default function PerformanceDonut({ data, titulo }) {
  const total = data.reduce((s, d) => s + d.valor, 0);

  const slices = [];
  let current = 0;
  data.forEach((item) => {
    const deg = (item.porcentaje / 100) * 360;
    slices.push({ ...item, deg, start: current });
    current += deg;
  });

  const renderArcs = () => {
    const els = [];
    slices.forEach((seg, si) => {
      let rem = seg.deg;
      let rot = seg.start;
      while (rem > 0) {
        const span = Math.min(rem, 180);
        els.push(
          <View
            key={`${si}-${rot}`}
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
                borderColor: seg.color,
                backgroundColor: "transparent",
              }}
            />
          </View>
        );
        rot += span;
        rem -= span;
      }
    });
    return els;
  };

  return (
    <View style={styles.container}>
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}
      <View style={styles.content}>
        <View style={styles.donutWrap}>
          <View style={styles.donut}>
            {renderArcs()}
            <View style={styles.center}>
              <Text style={styles.centerNum}>{total}</Text>
              <Text style={styles.centerLabel}>Total</Text>
            </View>
          </View>
        </View>
        <View style={styles.legend}>
          {data.map((item, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
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
    padding: 18,
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
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  donutWrap: {
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
    width: INNER,
    height: INNER,
    borderRadius: INNER / 2,
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
  centerNum: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
  },
  centerLabel: {
    fontSize: 10,
    color: colors.subtitle,
    marginTop: 1,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
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
