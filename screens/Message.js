import React from "react";
import { ScrollView, Text } from "react-native";
import ChatCart from "./../Cart/ChatCart";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatList from "./message/ChatList";
import ContactList from "./message/ContactList";
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();

const Message = (props) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#4ADE80",
          },
        }}
      >
        <Tab.Screen name="Chat List" component={ChatList} />
        <Tab.Screen name="Contact List" component={ContactList} />
      </Tab.Navigator>
    </SafeAreaView>
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ChatCart navigation={props.navigation} active={true} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} active={true} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} />
      <ChatCart navigation={props.navigation} />
    </ScrollView>
  );
};

export default Message;
