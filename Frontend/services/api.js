import { Platform } from "react-native";

const API_URL = Platform.OS === "web"
  ? "http://localhost:8000"
  : "http://192.168.1.16:8000";

export async function fetchDashboard() {
  const res = await fetch(`${API_URL}/api/dashboard`);
  if (!res.ok) throw new Error("Error al conectar con el servidor");
  return res.json();
}
