import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ChatCart from "../Cart/ChatCart";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatList from "./message/ChatList";
import ContactList from "./message/ContactList";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./ChatScreen";
import { StatusBar } from "expo-status-bar";
import { SvgXml } from "react-native-svg";
import { setChatSearchRef } from "../Reducers/chatSearchRef";
import { useDispatch, useSelector } from "react-redux";
import ChatImage from "./message/ChatImage";
import ChatHeader from "./message/ChatHeader";
import SellerList from "./message/SellerList";
import Member, { AddOnlineUser } from "./Vendor/Member";
import UserProfile from "./UserProfile";
import { setChatBottomRef } from "../Reducers/chatBottomRef";
const Stack = createStackNavigator();

const Message = (props) => {
  const dispatch = useDispatch();
  const chatSearchRef = useSelector((state) => state.chatSearchRef);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            header: (props) => (
              <ChatHeader
                onContact={() => {
                  dispatch(setChatBottomRef({type:"Contact",index:0}))
                }}
                onSearch={() => {
                  dispatch(setChatBottomRef({type:"Search",index:0}))    
                }}
                {...props}
              />
            ),
          }}
          name="MessageScreen"
          component={ChatList}
        />
        <Stack.Screen
          name="ChatScreen"
          options={{
            headerShown: false,
          }}
          component={ChatScreen}
        />

        
        <Stack.Screen
          name="Member"
          options={{
            headerShown: false,
          }}
          component={Member}
        />
        <Stack.Screen
          name="AddOnlineUser"
          options={{
            headerShown: false,
          }}
          component={AddOnlineUser}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfile}
        />
      </Stack.Navigator>
      
    </View>
  );
};

export default Message;


