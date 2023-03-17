import { View,Text, StyleSheet, Image } from 'react-native'
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
        <Card/>
        <Card/>
        <Card/>
    </View>
  )
}
const Card=()=>{
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:"https://www.usan.com/wp-content/uploads/2013/09/customer-self-service.jpg"}}/>
            <View style={{
                marginLeft:7,
            }}>
                <Text style={styles.headLine}>I will give you best it service & best support</Text>
            </View>
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
        flexDirection:"row",
        flex:1
    },
    image:{
        height:92,
        width:95,
        borderRadius:20,

    },
    headLine:{
        fontSize:16,
        fontWeight:"500"
    }
})
