import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="calificaciones" />
        <Stack.Screen name="comunicados" />
        <Stack.Screen name="analiticas" />
        <Stack.Screen name="horario" />
        <Stack.Screen name="perfil" />
        <Stack.Screen name="configuracion" />
      </Stack>
    </GestureHandlerRootView>
  );
}
