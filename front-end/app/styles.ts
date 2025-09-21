import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center",
    paddingHorizontal: 16,
  },
  box: {
    flexDirection: "row", // ícone e texto lado a lado
    alignItems: "center",
    marginBottom: 20, // espaço para o input
  },
  title: {
    fontSize: 32,
    color: "#1B5E20",
    fontFamily: "Poppins_700Bold",
    
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 3,
    borderColor: "#F9A825",
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // sombra Android
    elevation: 5,
    backgroundColor: "#fff",
  },
  btn: {
    borderRadius:12,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: "70%",
    backgroundColor: "#1B5E20",

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // sombra Android
    elevation: 5,

  }, 
  btnText:{
    color: "#ffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    marginTop: 12,
    fontSize: 12,
    

  }

});

export default styles