import React from "react";
import { ScrollView, Text } from "react-native";
import ChatCart from "../Cart/ChatCart";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatList from "./message/ChatList";
import ContactList from "./message/ContactList";
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from "./ChatScreen";
const Stack = createStackNavigator();

const Message = (props) => {
  
  return(
    <Stack.Navigator>
      <Stack.Screen options={{
        headerShown:false
      }} name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="ChatScreen" options={{
        headerShown:false 
      }} component={ChatScreen} />
    </Stack.Navigator>
  )
};

export default Message;
const MessageScreen=()=>{
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
}