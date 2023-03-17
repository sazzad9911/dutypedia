import { View,Text, StyleSheet } from 'react-native'
import React from 'react'
import customStyle from '../../assets/stylesheet'

export default function PopularCategory() {
  return (
    <View style={{
        marginHorizontal:28
    }}>
        <View style={[customStyle.flexBox,{marginTop:20,marginBottom:8}]}>
            <Text style={customStyle.landingHeadLine}>Popular Category</Text>
            <Text style={styles.buttonText}>See all</Text>
        </View>

    </View>
  )
}
const Card=()=>{
    return(
        <View style={styles.container}>

        </View>
    )
}
const styles=StyleSheet.create({
    buttonText:{
        color:"#00B22D",
        fontSize:16
    },
    container:{
        paddingVertical:16,
        flexDirection:"row"
    },
    image:{
        height:92,
        width:95,
        borderTopLeftRadius:16
    }
})
