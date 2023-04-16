import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
import ActivityLoader from "../components/ActivityLoader";
import SubHeader from "../components/SubHeader";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
const {width,height}=Dimensions.get("window")
export default function WebViews({ navigation, route }) {
  const url = route?.params?.url;
  const title=route?.params?.title;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const inset=useSafeAreaInsets()
  const [loader,setLoader]=useState(false)
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);
  return (
    <View style={{
      flex:1,
    }}>
      <SubHeader navigation={navigation} title={title}/>
      <WebView onLoadStart={()=>setLoader(true)}
      onLoadEnd={()=>setLoader(false)} scalesPageToFit={false}
      style={{ flex: 1 }} source={{ uri: url }} />
      {loader&&(
        <View style={{
          position:"absolute",
          top:0,
          left:0,
          height:height,
          width:width,
          justifyContent:"center",
          alignItems:"center"
        }}>
          <ActivityLoader/>
        </View>
      )}
    </View>
  );
}
