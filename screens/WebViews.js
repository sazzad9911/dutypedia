import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
import SubHeader from "../components/SubHeader";
import { setHideBottomBar } from "../Reducers/hideBottomBar";

export default function WebViews({ navigation, route }) {
  const url = route?.params?.url;
  const title=route?.params?.title;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const inset=useSafeAreaInsets()
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
      <WebView scalesPageToFit={false}
      style={{ flex: 1 }} source={{ uri: url }} />
    </View>
  );
}
