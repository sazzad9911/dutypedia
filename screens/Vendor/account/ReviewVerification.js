import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";

export default function ReviewVerification() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isFocused) {
      //dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      //dispatch(setHideBottomBar(true));
    }, 50);
  }, [isFocused]);
  return <View></View>;
}
