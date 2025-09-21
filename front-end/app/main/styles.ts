import { StyleSheet } from "react-native";

const styles = StyleSheet.create(
{    container: {
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
        backgroundColor: "#fff",
        marginBottom: 12
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
        backgroundColor: "#ffff",
        borderRadius: 12,
        margin: 20,
        borderWidth: 3,
        borderColor: "#424242",
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
    }

});

export default styles