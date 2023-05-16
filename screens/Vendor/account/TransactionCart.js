import React, { useState } from "react";
import { StyleSheet, View,Text } from "react-native";
import { convertDate, dateConverter, serverTimeToLocal, serverTimeToLocalDate } from "../../../action";
import Avatar from "../../../components/Avatar";
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
            <Text style={[styles.textLarge,{fontWeight:"700"}]}>{data&&`${data.user.name}`}</Text>
            <Text style={styles.smallText}>@{data&&`${data.user.username}`}</Text>
          </View>
        </View>
        <View style={{
          alignItems:"flex-end"
        }}>
          {data?.type=="STARTING"?(<Text style={styles.textLarge}>{data&&`${data.offerPrice-(data.offerPrice*data.dutyFee)}`}৳</Text>):(<Text style={styles.textLarge}>{data&&`${data.amount-(data.amount*data.dutyFee)}`}৳</Text>)}
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
const exporters = (key) => {
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return "Wait for accept order";
    case "ACCEPTED":
      return "Waiting for payment";
    case "WAITING_FOR_PAYMENT":
      return "Waiting for payment";
    case "PROCESSING":
      return "Processing";
    case "DELIVERED":
      return "Pending";
    case "REFUNDED":
      return "Refunded";
    case "CANCELLED":
      return "Refunded";
    case "COMPLETED":
      return "Paid";
    case "PENDING":
      return "Pending";
    default:
      return "Unknown";
  }
};