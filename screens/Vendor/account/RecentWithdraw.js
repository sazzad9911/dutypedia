import { useIsFocused } from "@react-navigation/native";
import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { getAllWithdraws } from "../../../Class/account";
import IconButton from "../../../components/IconButton";
import WithdrawCart from "./WithdrawCart";

export default function RecentWithdraw({navigation}) {
  const [data, setData] = useState();
  const user=useSelector(state=>state.user)
  const vendor=useSelector(state=>state.vendor)
  const isFocused=useIsFocused()
  useEffect(() => {
    if(user&&vendor){
      getAllWithdraws(user.token,vendor.service.id).then(res=>{
        setData(res.data)
      }).catch(err=>{
        console.error(err.response.data.msg)
      })
    }
  }, [isFocused])
  
  return (
    <View
      style={{
        flex: 1,
      }}>
      {data && data.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
            }}>
            Recent Transaction
          </Text>
          <IconButton onPress={()=>{
            navigation.navigate("AllWithdraws")
          }}
            style={{
              borderWidth: 0,
              fontSize: 16,
            }}
            Icon={() => <SvgXml xml={icon} />}
            title={"view all"}
          />
        </View>
      )}
      <TopBox/>
      {data && data.map((doc, i) => i<6? <WithdrawCart key={i} data={doc} />:<></>)}
      {data && data.length == 0 && <NoThing />}
    </View>
  );
}
const NoThing = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text
        style={{
          fontSize: 16,
          color: "black",
          textAlign: "center",
        }}>
        No Withdraw found
      </Text>
    </View>
  );
};
const icon = `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 16.5L8.5 9L1 1.5" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export const TopBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        <Text style={styles.text}>Date</Text>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.text}>Amount</Text>
      </View>
      <View style={styles.rightBox}>
        <Text style={styles.text}>Status</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  leftBox: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  middleBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  rightBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    padding: 8,
    marginVertical: 4,
  },
  text: {
    fontSize: 16,
  },
});
