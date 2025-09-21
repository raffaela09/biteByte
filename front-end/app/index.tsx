import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';


export default function ModalScreen() {
  const router = useRouter();

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
      <View style={styles.box}>
        <MaterialCommunityIcons name="cookie-outline" size={40} color="#1B5E20" />
        <Text style={styles.title}>biteByte</Text>
      </View>
          <TextInput placeholder='Digite seu email' style={styles.input}></TextInput>
          <TouchableOpacity style={styles.btn} onPress={() => router.push('./main')}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>
          <Text style={styles.info}>Faça login com seu e-mail institucional.</Text>
    </View>
  );
}

