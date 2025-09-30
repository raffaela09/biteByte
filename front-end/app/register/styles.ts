import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center",
    backgroundColor: "#1B5E20"

  },
  box: {
    flexDirection: "row", // ícone e texto lado a lado
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20, // espaço para o input
    width: "100%",
    height: "10%"
  },
  title: {
    fontSize: 32,
    color: "#ffff",
    fontFamily: "Poppins_700Bold",
    
  },
  input: {
    marginBottom: 20,
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
    backgroundColor: "#E0E0E0",
  },
  btn: {
    borderRadius:12,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: "80%",
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
    // fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
  info: {
    marginTop: 12,
    fontSize: 12,
  },
  login: {
    color: "#424242",
    fontFamily: "Poppins_400Regular",
    fontSize: 16
  },
  boxLogin: {
    marginTop: 30
  },
  msgError:{
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "red",
    marginTop: 12 
  },
  test:{
    paddingTop: 10,
    paddingLeft: 10,
    width: "100%",
    height: "10%",
    justifyContent: "center" ,
    backgroundColor: "#1B5E20"
  },
  boxTwo:{
    height: "80%",
    width: "100%",
    backgroundColor: "#ffff",
    alignItems: "center",
    borderTopLeftRadius: "6%",
  },
  register: {
    fontFamily: "Poppins_700Bold",
    fontSize: 25,
    color: "#424242",
    marginBottom: 20,
    marginTop: 20,
  }


});

export default styles