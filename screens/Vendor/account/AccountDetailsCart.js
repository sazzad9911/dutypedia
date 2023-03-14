import React from "react";
import { View, Text,StyleSheet } from "react-native";
import IconButton from "../../../components/IconButton";

export default function AccountDetailsCart() {
  return (
    <View
      style={{
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        padding:20,
        marginHorizontal:20,
        borderRadius:10
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent:"space-between",
          alignItems:"center"
        }}>
        <View>
          <Text style={styles.smallText}>Available Amount</Text>
          <Text style={styles.largeText}>50000৳</Text>
        </View>
        <View style={{
            alignItems:"flex-end"
        }}>
          <Text style={styles.smallText}>Total Earnings</Text>
          <Text style={styles.largeText}>50000৳</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent:"space-between",
          alignItems:"center",
          marginTop:26
        }}>
        <View>
          <Text style={styles.smallText}>Pending Amount</Text>
          <Text style={styles.largeText}>50.00৳</Text>
        </View>
        <IconButton style={{
            width:100,
            height:40,
            fontFamily:"Poppins-Medium"
        }} title={"Withdraw"}/>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
    largeText:{
        fontSize:24,
        fontFamily:"Poppins-SemiBold",
    },
    smallText:{
        fontSize:16,
        fontFamily:"Poppins-Medium"
    }
})