import React, { useState } from "react";
import { View,Text } from "react-native";
import { SvgXml } from "react-native-svg";
import IconButton from "../../../components/IconButton";
import WithdrawCart from "./WithdrawCart";


export default function RecentWithdraw() {
  const [data,setData]=useState(["fsf",'sdfs',"sdf"])
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
          <IconButton
            style={{
              borderWidth: 0,
              fontSize: 16,
            }}
            Icon={() => <SvgXml xml={icon} />}
            title={"view all"}
          />
        </View>
      )}
      {data&&data.map((doc,i)=>(
        <WithdrawCart key={i} data={doc}/>
      ))}
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