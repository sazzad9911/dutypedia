import React from "react";
import { ScrollView, Text } from "react-native";
import ChatCart from "./../Cart/ChatCart";

const Message = (props) => {
  return (
    <ScrollView>
      <ChatCart navigation={props.navigation} active={true} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} active={true} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} />
    </ScrollView>
  );
};

export default Message;
