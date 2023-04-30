import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import customStyle from "../../../assets/stylesheet";
import { socket } from "../../../Class/socket";
import ActivityLoader from "../../../components/ActivityLoader";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";

export default function AmarPay({ navigation, order,url,onClose }) {
  //const url = route?.params?.url;
  const [loader, setLoader] = useState(false);
  const user=useSelector(state=>state.user)
  // const isFocused=useIsFocused()
  // const dispatch=useDispatch()
  // const orderId=route?.params?.orderId;
  // const sellerId=route?.params?.sellerId;
  // const buyerId=route?.params?.buyerId;
  // const order=route?.params?.order;

  // React.useEffect(() => {
  //   if (isFocused) {
  //     //console.log("hidden")
  //     dispatch(setHideBottomBar(true));
  //     setTimeout(() => {
  //       dispatch(setHideBottomBar(true));
  //     }, 50);
  //   } else {
  //     //console.log("seen")
  //     dispatch(setHideBottomBar(false));
  //   }
  // }, [isFocused]);

  if (loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  

  return (
    <WebView
      onLoadStart={()=>setLoader(true)}
      onLoadEnd={()=>setLoader(false)}
      onNavigationStateChange={(newNavState)=>{
        const { url } = newNavState;
        setLoader(false)
        console.log(url)
        let arr=url.split("=")
        if(arr[arr.length-1]=="success"){
          socket.emit("updateOrder", {
            receiverId: order.service.user.id,
            order: order
          });
          socket.emit("updateOrder", {
            receiverId: user?.user?.id,
            order: order
          });
          onClose()
          navigation.navigate("PaymentStatus",{type:true,order:order})
        }else if(arr[arr.length-1]=="failed"){
          onClose()
          navigation.navigate("PaymentStatus",{type:false,order:order})
        }else if(arr[arr.length-1]=="cancel"){
          onClose()
        }
      }}
      style={{
        flex: 1,
      }}
      source={{ uri: url }}
    />
  );
}
