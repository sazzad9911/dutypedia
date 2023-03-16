import React from 'react'
import { StyleSheet, View,Text } from 'react-native'

export default function WithdrawCart({}) {
  return (
    <View style={styles.container}>
        <View style={styles.leftBox}>
          <Text style={styles.text}>5 Dec 2022</Text>
          
        </View>
        <View style={styles.middleBox}>
        <Text style={styles.text}>500000</Text>
        </View>
        <View style={styles.rightBox}>
        <Text style={styles.text}>Canceled</Text>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
  leftBox:{
    flex:1,
    alignItems:"center",
    flexDirection:"row"
  },
  middleBox:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  rightBox:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row"
  },
  container:{
    flexDirection:"row",
    borderBottomWidth:1,
    borderBottomColor:"#e6e6e6",
    padding:8,
    marginVertical:4
  },
  text:{
    color:"#484848",
    fontSize:14
  }
})