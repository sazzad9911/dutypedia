import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { serverTimeToLocalDate } from "../../../action";
import Barcode from "../../../components/Barcode";
const { width, height } = Dimensions.get("window");

export default function OrderInfo({ orderId, date,services,title,facilities }) {
  return (
    <View style={{
        paddingHorizontal: 20,
    }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          alignItems: "center",
          justifyContent:"space-between"
        }}>
        <View>
          <Text style={styles.text}>Order id: {orderId}</Text>
          <Text style={[styles.text, { marginTop: 11 }]}>
            Date: {serverTimeToLocalDate(date)}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 36,
            width: 140,
          }}>
          <View
            style={{
              height: 36,
              overflow: "hidden",
              width: 140,
            }}>
            <Barcode
              height="36"
              width="100"
              value={orderId ? orderId : "dsfff"}
              options={{ format: "CODE128", background: "#ffffff" }}
              rotation={0}
            />
          </View>
          <Text
            style={[
              styles.text,
              { textAlign: "right", letterSpacing: 1.9, marginTop: 8 },
            ]}>
            {orderId}
          </Text>
        </View>
      </View>
      <View style={{
        marginTop:36,
        marginBottom:24
      }}>
        <Text style={styles.headLine}>Service/Item name</Text>
        {services&&services.length>0?(
            <View>
                <Text style={[styles.text,{lineHeight:24,marginTop:12}]}>{title}</Text>
                <Text style={[styles.text,{lineHeight:20,marginTop:12}]}>
                {services.map((doc, i) => {
                  return `${i == 0 ? "" : ", "}${doc.data.title}`;
                })}
                </Text>
            </View>
        ):(
            <Text style={[styles.font,{
                marginTop:12,
                color:"red"
            }]}>Please give clear instructions to the seller via chat. They will add the services to your receipt as per your requirements.</Text>
        )}
        {facilities&&facilities.length>0&&(
            <View style={{
                marginTop:24
            }}>
                <Text style={styles.headLine}>Facilities</Text>
                <Text style={[styles.text,{marginTop:12}]}>
                {facilities.map((doc, i) => {
                  return `${i == 0 ? "" : ", "}${doc.title}`;
                })}
                </Text>
            </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  headLine:{
    fontSize:20,
    fontWeight:"400"
  },
  font:{
    fontWeight:"400",
    fontSize:16,
    lineHeight:24
  }
});
