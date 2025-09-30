import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.117:8000", //colocar o 
});

// Intercepta requests e adiciona o token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//login
export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  await AsyncStorage.setItem("token", response.data.access_token);
  return response.data;
};

//cardapio
export const getMenu = async () => {
  const response = await api.get("/menu/"); //ja inclui o token 
  return response.data; //devolve um array com o cardapio - o json que o back retornou
};

//confirmar presencaa
export const marcarPresenca = async () => {
  const response = await api.post("/marking/");
  return response.data;
};

export default api;
