import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { completeOrder } from "../../../Class/service";
import { socket } from "../../../Class/socket";

export default function ClintFeedBack({ navigation, route }) {
  const [loader, setLoader] = useState(false);
  const order = route?.params?.order;
  const user = useSelector((state) => state.user);

  const confirmDelivery = () => {
    setLoader(true);
    completeOrder(user.token, order.id)
      .then((res) => {
        if (res) {
          setLoader(false);
          socket.emit("updateOrder", {
            receiverId: order.user.id,
            order: order,
          });
          socket.emit("updateOrder", {
            receiverId: order.service.user.id,
            order: order,
          });
        }
      })
      .catch((err) => {
        console.warn(err.response.data.msg);
        setLoader(false);
      });
  };
  return (
    <View>
        
    </View>
  );
}
