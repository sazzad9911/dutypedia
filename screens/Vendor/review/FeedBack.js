import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../../../Cart/ReviewCart";
import { replyReview } from "../../../Class/service";
import IconButton from "../../../components/IconButton";
import TextArea from "../../../components/TextArea";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";

export default function FeedBack({ navigation, route }) {
  const data = route?.params?.data;
  const [text, setText] = useState();
  const user = useSelector((state) => state.user);
  const [textError, setTextError] = useState();
  const dispatch=useDispatch()
  const isFocused=useIsFocused()

  React.useEffect(() => {
    if (isFocused) {
      dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      dispatch(setHideBottomBar(true));
    }, 50);
  }, [isFocused]);
  
  const reply = async () => {
    if (!text) {
      setTextError("*your reply text is required");
      return;
    }
    replyReview(user.token, data.id, text).then(res=>{
        navigation.goBack();
    }).catch(err=>{
        Alert.alert("Ops!", err.response.data.msg);
    })
  };

  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 28,
        }}>
        <Cart data={data} noReplay={true} />
        <View style={{ height: 28 }} />
        <TextArea
          error={textError}
          value={text}
          onChange={setText}
          style={{
            width: "100%",
          }}
          placeholderTextColor={"#767676"}
          placeholder={"type your reply...."}
        />
        <View style={{ height: 28 }} />
        <IconButton disabled={text?false:true} active={text?true:false}
          onPress={reply}
          style={{
            height: 40,
            color: "#A3A3A3",
          }}
          title={"Done"}
        />
      </View>
    </ScrollView>
  );
}
