import React from 'react'
import { StyleSheet, View,Text } from 'react-native'
import { serverTimeToLocalDate } from '../../../action'
import { exporters } from './expoters'

export default function WithdrawCart({data}) {
 // console.log(data)
  return (
    <View style={styles.container}>
        <View style={styles.leftBox}>
          <Text style={styles.text}>{data&&serverTimeToLocalDate(data.createdAt)}</Text>
          
        </View>
        <View style={styles.middleBox}>
        <Text style={styles.text}>{data?.amount}</Text>
        </View>
        <View style={styles.rightBox}>
        <Text style={styles.text}>{data&&exporters(data.status)}</Text>
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