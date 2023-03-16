import { StyleSheet } from "react-native";

const customStyle=StyleSheet.create({
    shadow:{
        shadowColor:"rgba(0, 0, 0, 0.25)",
        shadowOffset:{
            x:1,
            y:0
        },
        shadowRadius:10,
        shadowOpacity:.8,
        elevation:5
    },
    mediumText:{
        fontFamily:"Poppins-Medium",
        fontSize:16
    },
    largeFont:{
        fontSize:24,
        fontWeight:"600"
    }
})
export default customStyle