import { StyleSheet } from "react-native";

const styles = StyleSheet.create({    
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    },
  box:{
    width: "80%",
    height: "55%",
    borderWidth: 3,
    borderColor: "#F9A825",
    borderRadius: 12,


    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // sombra Android
    elevation: 5,
    backgroundColor: "#E0E0E0", 
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center"
    },

  title: {
    paddingTop:8,
    fontSize: 24,
    color: "#1B5E20",
    fontFamily: "Poppins_700Bold",
    },
  titleDois:{
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "center", 
    fontFamily: "Poppins_400Regular",
    },

  accept: {
    width: "30%",
    height: 54,
    backgroundColor: "#1B5E20",
    borderRadius: 12,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
           // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

        // sombra Android
    elevation: 5,
    marginBottom: 12
    },
    
  refuse: {
    width: "30%",
    height: 54,
    borderRadius: 12,
    margin: 20,
    borderWidth: 3,
    borderColor: "#424242",
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
      // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

      // sombra Android
    elevation: 5,
    },
  boxBnt:{
    flexDirection: "row",
    justifyContent: "space-between"
    },
  textBtn:{
    fontFamily: "Poppins_700Bold",
    fontSize: 18
    },
  textBtn2:{
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#ffff"
    },
  item: {
    alignItems: "center",
    width: "100%",
    height: "100%"
    },
  text: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#424242",
    margin: 10
    },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // fundo escuro
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  botao: {
    width:80,
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    margin: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  boxBut: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textDate: {
    color: "#ffff",
    fontFamily: "Poppins_700Bold",
    fontSize: 20
  },
  boxDate: {
    margin: 20,
    width: 220,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#1B5E20",

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // sombra Android
    elevation: 5,
    marginBottom: 12,

  },
  test:{
    width: "100%",
    height: "7%",
    backgroundColor: "#ffff"
  },
});

export default styles