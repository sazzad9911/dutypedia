import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { getAllTransactions } from "../../../Class/account";
import IconButton from "../../../components/IconButton";
import TransactionCart from "./TransactionCart";

export default function RecentTransaction({navigation}) {
  const [data, setData] = useState();
  const user=useSelector(state=>state.user)
  const vendor=useSelector(state=>state.vendor)

  useEffect(()=>{
    if(user&&vendor){
      getAllTransactions(user.token,vendor.service.id,3,0).then(res=>{
        setData(res.data.orders)
      }).catch(err=>{
        console.error(err.response.data.msg)
      })
    }
  },[])
  return (
    <View
      style={{
        flex: 1,
      }}>
      {data&&data.length>0 && (
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
            navigation.navigate("AllTransactions")
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
      {data&&data.map((doc,i)=>(
        <TransactionCart key={i} data={doc}/>
      ))}
      {data&&data.length==0&&(<NoThing/>)}
    </View>
  );
}
const icon = `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 16.5L8.5 9L1 1.5" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export const NoThing = () => {
  return (
    <View style={{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      paddingVertical:20
    }}>
      <Text
        style={{
          fontSize: 16,
          color: "black",
          textAlign: "center",
        }}>
        No Transaction found
      </Text>
    </View>
  );
};
