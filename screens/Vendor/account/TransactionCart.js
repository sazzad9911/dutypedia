import React, { useState } from "react";
import { StyleSheet, View,Text } from "react-native";
import { convertDate, dateConverter, serverTimeToLocal, serverTimeToLocalDate } from "../../../action";
import Avatar from "../../../components/Avatar";
import { exporters } from "./expoters";
import { types } from "./types";

export default function TransactionCart({data}) {
  //console.log(data)
  return (
    <View style={styles.container}>
      <View style={styles.flexBox}>
        <Text style={styles.smallText}>{data&&types.filter(d=>d.type.match(data.type))[0].title}</Text>
        <Text style={styles.smallText}>{data&&serverTimeToLocalDate(data?.createdAt)}</Text>
      </View>
      <View style={styles.flexBox}>
        <View style={styles.flexBox}>
          <Avatar style={{width:30,height:30,margin:4}} />
          <View>
            <Text style={[styles.textLarge,{fontWeight:"700"}]}>{data&&`${data.user.firstName} ${data.user.lastName}`}</Text>
            <Text style={styles.smallText}>@{data&&`${data.user.username}`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textLarge}>{data&&`${data.amount}`}</Text>
          <Text style={styles.smallText}>{data&&exporters(data.status)}</Text>
        </View>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{
    height:94,
    marginVertical:4,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#e6e6e6",
    padding:8
  },
  textLarge:{
    fontSize:16,
    fontFamily:"Poppins-Medium",
    color:"#484848"
  },
  smallText:{
    fontSize:12,
    color:"#484848"
  },
  flexBox:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingVertical:5
  }
})
