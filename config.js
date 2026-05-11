import { Platform } from "react-native";

const PORT = 5000;
const DEV_LAN_IP = "172.20.10.3";

const envUrl =
  typeof process !== "undefined" && process.env && process.env.EXPO_PUBLIC_API_URL
    ? process.env.EXPO_PUBLIC_API_URL
    : null;

const webHost =
  typeof window !== "undefined" && window.location && window.location.hostname
    ? window.location.hostname
    : "localhost";

const BASE_URL = envUrl
  ? envUrl
  : Platform.OS === "web"
    ? `http://${webHost}:${PORT}`
    : `http://${DEV_LAN_IP}:${PORT}`;

export default BASE_URL;
