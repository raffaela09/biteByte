import { Poppins_400Regular, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api from "services/api";
import styles from "./styles";

type MenuItem = {
  id: number;
  date: string; // vem como YYYY-MM-DD do back
  main_course: string;
};

// Função utilitária para formatar a data no padrão brasileiro
function formatDateBR(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export default function Main() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [error, setError] = useState("");

  // Buscar cardápio no back
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get("/menu");
        setMenu(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Erro ao carregar cardápio");
      } finally {
        setMenuLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleOption = (option: boolean) => {
    setSelectedOption(option);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    if (selectedOption === null) return;

    try {
      setLoading(true);
      const response = await api.post("/marking", {
        presence: selectedOption,
        date: new Date().toISOString().split("T")[0], //devolve pro back como yyyy/mm/d
      });

      Alert.alert("Sucesso", response.data?.mensagem || "Marcação registrada!");
      setModalVisible(false);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Erro ao marcar presença";
      Alert.alert("Ops!", msg);
      setModalVisible(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.test}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#424242" marginBottom={10}/>
        </TouchableOpacity>
      </View>
      <View style={styles.titleDois}>
        <MaterialCommunityIcons
          name="cookie-outline"
          size={40}
          color="#1B5E20"
        />
        <Text style={styles.title}>Cardápio do dia:</Text>
      </View>

      <View style={styles.box}>
        {menuLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : (
          <FlatList
            data={menu}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.boxDate}>
                  <Text style={styles.textDate}>{formatDateBR(item.date)}</Text>
                </View>
                <View>
                  <Text style={styles.text}>
                   {item.main_course}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.boxBnt}>
        <TouchableOpacity
          style={styles.refuse}
          onPress={() => handleOption(false)}
        >
          <Text style={styles.textBtn}>Recusar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accept}
          onPress={() => handleOption(true)}
        >
          <Text style={styles.textBtn2}>Aceitar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Você tem certeza? Não poderá mudar depois de marcar.</Text>

            <View style={styles.boxBut}>
              <Pressable
                style={[styles.botao, { backgroundColor: "red", marginTop: 16 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoBotao}>Voltar</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.botao,
                  { backgroundColor: "#1B5E20", marginTop: 16 },
                ]}
                onPress={handleConfirm}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.textoBotao}>Confirmar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
