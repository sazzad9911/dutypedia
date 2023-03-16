import React, { useState } from "react";
import { StyleSheet, View,Text } from "react-native";
import Avatar from "../../../components/Avatar";

export default function TransactionCart() {
  const [data, setData] = useState(["df", "sdf", "sef"]);
  return (
    <View style={styles.container}>
      <View style={styles.flexBox}>
        <Text style={styles.smallText}>Bargaining</Text>
        <Text style={styles.smallText}>5 Dec 2023</Text>
      </View>
      <View style={styles.flexBox}>
        <View style={styles.flexBox}>
          <Avatar style={{width:30,height:30,margin:4}} />
          <View>
            <Text style={[styles.textLarge,{fontWeight:"700"}]}>Easin Arafat</Text>
            <Text style={styles.smallText}>@easinarafat</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textLarge}>500</Text>
          <Text style={styles.smallText}>Pending</Text>
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
