import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from "../services/api"; // aquele arquivo api.ts que a gente comentou
import styles from './styles';

export default function ModalScreen() {
  const [email, setEmail] = useState("") //pra pegar o email
  const [error, setError] = useState("") //guarda a mensagem do erro
  const [password, setPassword] = useState("");
  
  const router = useRouter(); //explica essa porra aq

  const handleLogin = async () => {
    // const domain = "@estudante.ifms.edu.br"; 
    if (email == ""){
      setError("Faça login para entrar.")
      return;
    }
    // if (!email.endsWith(domain)) {
    //   setError("Use seu e-mail institucional para fazer login.");
    //   return;
    // }

    try {
      // chamada para o backend
      const response = await api.post("/auth/login", {
        email: email,
        password: password, // precisa criar um state pra senha tb
      });

      //pega o token do backend 
      const { access_token } = response.data;

      //salva pra usar depois (no asyncstorage)
      await AsyncStorage.setItem("token", access_token);

      setError(""); //kimpa os erros
      router.push("./main"); //só vaii pra tela principal se o login deu certo
    } catch (err: any) {
      console.log(err.response?.data?.detail || "Erro no login");
      setError(err.response?.data?.detail || "Usuário ou senha inválidos");
    }
};

  //para utilizar a fonte poppins
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <MaterialCommunityIcons name="cookie-outline" size={40} color="#ffff" marginTop="20"/>
        <Text style={styles.title}>biteByte</Text>
      </View>
      <View style={styles.boxTwo}>
          <Text style={styles.login}>Login</Text>
          <TextInput value={email} placeholder='example@estudante.ifms.edu.br' style={styles.input } onChangeText={setEmail} autoCapitalize='none'></TextInput>

          <TextInput value={password} placeholder='Digite sua senha' style={styles.input} onChangeText={setPassword} secureTextEntry></TextInput>
    
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnRegister} onPress={() => router.push('./register')}>
            <Text style={styles.registerInfo}>Não possui conta? Crie uma!</Text>
          </TouchableOpacity>

          {error ? (<Text style={styles.msgError}>{error}</Text>) : null}

      </View>
    </View>
  );
}

