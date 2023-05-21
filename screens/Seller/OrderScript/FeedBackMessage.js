import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import customStyle from "../../../assets/stylesheet";
import { completeOrder, postReview } from "../../../Class/service";
import { socket } from "../../../Class/socket";
import ActivityLoader from "../../../components/ActivityLoader";
import IconButton from "../../../components/IconButton";
import TextArea from "../../../components/TextArea";

export default function FeedBackMessage({ navigation, route }) {
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const order = route?.params?.order;
  const communication = route?.params?.communication;
  const describe = route?.params?.describe;
  const quality = route?.params?.quality;
  const [text, setText] = useState();

  const confirmDelivery = async () => {
    setLoader(true);
    try {
      await completeOrder(user.token, order.id);
      await postReview(
        user.token,
        communication,
        describe,
        quality,
        text,
        order?.id
      );
      navigation.navigate("OrderDetails",{data:order,orderId:order?.id,type:order.type})
      socket.emit("updateOrder", {
        receiverId: order.user.id,
        order: order,
      });
      socket.emit("updateOrder", {
        receiverId: order.service.user.id,
        order: order,
      });
      
      setLoader(true);
    } catch (err) {
      setLoader(true);
      Alert.alert(err.message);
    }
  };
  if (loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <TextArea
          value={text}
          onChange={setText}
          style={{
            marginTop: 28,
            borderColor: "#D1D1D1",
          }}
          placeholder={"Type your experience with the seller...."}
        />
        <IconButton
          onPress={confirmDelivery}
          active={true}
          style={[styles.mt24, styles.button]}
          title={"Done"}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  headLine: {
    fontSize: 24,
    
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
   
    fontWeight: "400",
  },
  font: {
    fontSize: 20,
    fontWeight: "400",
  },
  mt24: {
    marginTop: 24,
  },
  mt28: {
    marginTop: 28,
  },
  mt16: {
    marginTop: 16,
  },
  button: {
    borderColor: "#D1D1D1",
    height: 40,
    marginBottom: 32,
  },
  box: {
    padding: 24,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 4,
    alignItems: "center",
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
