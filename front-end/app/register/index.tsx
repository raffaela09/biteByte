import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from "services/api"; // caminho relativo ajustado
import styles from './styles';

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState(""); //para usar o use state
  const [email, setEmail] = useState("");
  const [ra, setRa] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //func pra chamar o axios
  const handleRegister = async () => {
    setError(""); // limpa erro anterior
    try {
      const response = await api.post("/auth/register", {
        name,
        ra: Number(ra), 
        email,
        password,
      });

      console.log(response.data);
      router.push("./"); //volta para login após criar a conta - melhor voltar pro login ou ir direto para a tela principal?
      //lembrar de fazer um botao de voltar
    } catch (err: any) {
      console.log(err.response?.data?.detail);

      // Se o backend retornar array de validação do Pydantic
      if (Array.isArray(err.response?.data?.detail)) {
        const messages = err.response.data.detail.map(
          (d: any) => `${d.loc.join(" > ")}: ${d.msg}`
        );
        setError(messages.join("\n"));
      } else {
        //retorna a msg do back end
        setError(err.response?.data?.detail || "Erro ao criar conta");
      }
    }
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.test}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#ffff" marginTop="20"/>
        </TouchableOpacity>
      </View>

    
      <View style={styles.box}>
        <MaterialCommunityIcons name="cookie-outline" size={40} color="#ffff" />
        <Text style={styles.title}>biteByte</Text>
      </View>

      <View style={styles.boxTwo}>
        <Text style={styles.register}>Criar conta</Text>
            <TextInput
          value={name}
          placeholder='Digite seu nome'
          style={styles.input}
          onChangeText={setName}
        />

        <TextInput
          value={email}
          placeholder='Digite seu email'
          style={styles.input}
          onChangeText={setEmail}
          autoCapitalize='none'
        />

        <TextInput
          value={ra}
          placeholder='Digite seu RA'
          style={styles.input}
          onChangeText={setRa}
          keyboardType='numeric'
        />

        <TextInput
          value={password}
          placeholder='Digite sua senha'
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.msgError}>{error}</Text> : null}

        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.btnText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxLogin} onPress={() => router.push('./')}>
          <Text style={styles.login}>Já possui conta? Faça login!</Text>
        </TouchableOpacity>
      </View>
 
    </View>
  );
}
