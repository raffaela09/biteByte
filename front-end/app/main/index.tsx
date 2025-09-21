import { Poppins_400Regular, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function  main() {
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
    return(
        <View style={styles.container}>
            <View style={styles.titleDois}>
                <MaterialCommunityIcons name="cookie-outline" size={40} color="#1B5E20" />
                <Text style={styles.title}>Cardapio do dia:</Text>
            </View>
            
            <View style={styles.box}>
                <Text>oiiiii</Text>
            </View>

            <View style={styles.boxBnt}>
                <TouchableOpacity style={styles.refuse}>
                  <Text style={styles.textBtn}>Recusar</Text>
                  </TouchableOpacity> 
                <TouchableOpacity style={styles.accept}>
                  <Text style={styles.textBtn2}>Aceitar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

