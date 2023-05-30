import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { serverTimeToLocalDate } from "../../../action";
import Barcode from "../../../components/Barcode";
import IconButton from "../../../components/IconButton";
const { width, height } = Dimensions.get("window");

export default function OrderInfo({
  orderId,
  date,
  services,
  title,
  facilities,
  vendor,
  onAddService,
  status,
  serviceError,
  type,
  accepted
}) {
  const [wid, setWid] = useState(0);
  //console.log(services)
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View
          onLayout={(e) => {
            setWid(e.nativeEvent.layout.width);
          }}>
          <Text style={styles.text}>Order id: {orderId}</Text>
          <Text style={[styles.text, { marginTop: 11 }]}>
            Date: {serverTimeToLocalDate(date)}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 36,
            width: width > 390 ? 130 : width - (40 + wid + 36),
          }}>
          <View
            style={{
              height: 36,
              overflow: "hidden",
              width: width > 390 ? 130 : width - (40 + wid + 36),
            }}>
            <Barcode
              height="36"
              width={width > 390 ? 130 : width - (40 + wid + 36)}
              value={orderId ? orderId : "dsfff"}
              options={{ format: "CODE128", background: "#ffffff" }}
              rotation={0}
            />
          </View>
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {
                textAlign: "center",
                letterSpacing: 1.1,
                marginTop: 8,
                marginLeft: 8,
                fontSize: 12,
              },
            ]}>
            {orderId}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 36,
          marginBottom: 24,
        }}>
        <Text style={styles.headLine}>Service/Item name</Text>
        {services && services.length > 0 ? (
          <View>
            <Text style={[styles.text, { marginTop: 12 }]}>
              {title}
            </Text>
            <Text style={[styles.text, { marginTop: 12 }]}>
              {services?.map((doc, i) => {
                return `${i == 0 ? "" : ", "}${doc}`;
              })}
            </Text>
          </View>
        ) : vendor ? (
          <View>
            <Text style={[styles.font, { marginTop: 24 }]}>
              Add the service you want to sell
            </Text>
            <View style={{ flexDirection: "row",marginTop:12 }}>
              <IconButton disabled={status=="CANCELLED"?true:false} onPress={onAddService} active={true} LeftIcon={()=><SvgXml xml={icon}/>}
               style={styles.button} title={"Add service"} />
            </View>
          </View>
        ) : (
          <Text
            style={[
              styles.font,
              {
                marginTop: 12,
                color: "red",
              },
            ]}>
            Please give clear instructions to the seller via chat. They will add
            the services to your receipt as per your requirements.
          </Text>
        )}
        {serviceError&&(
          <Text style={{
            marginVertical:3,
            color:"red"
          }}>{serviceError}</Text>
        )}
        {facilities && facilities.length > 0 && (
          <View
            style={{
              marginTop: 24,
            }}>
            <Text style={styles.headLine}>{type=="PACKAGE"?"Package":"Extra"} Facilities</Text>
            <Text style={[styles.text, { marginTop: 12 }]}>
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
  headLine: {
    fontSize: 20,
    fontWeight: "400",
  },
  font: {
    fontWeight: "400",
    fontSize: 16,
    
  },
  button: {
    height: 40,
  },
});
const icon=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 9H17M9 17V1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`