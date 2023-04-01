import React from "react";
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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
const Stack = createStackNavigator();

const Message = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MessageScreen"
        component={MessageScreen}
      />
      <Stack.Screen
        name="ChatScreen"
        options={{
          headerShown: false,
        }}
        component={ChatScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SearchScreen"
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

export default Message;
const MessageScreen = ({navigation}) => {
  const inset = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#4ADE80" }}>
      <View
        style={{
          height: inset?.top,
        }}
      />
      <StatusBar style="light" backgroundColor="#4ADE80" />
      <TouchableOpacity onPress={()=>{
        navigation.navigate("SearchScreen")
      }} style={{
        position:"absolute",
        top:(inset.top+15),
        right:20,
        zIndex:1
      }}>
        <SvgXml xml={searchIcon} />
      </TouchableOpacity>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#ffffff",
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#4ADE80",
            marginLeft: 20,
            marginRight: 60,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  lineHeight: 16,
                  color: focused ? "#ffffff" : "#E8E8E8",
                }}>
                Chats
              </Text>
            ),
          }}
          name="Chat List"
          component={ChatList}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  lineHeight: 16,
                  color: focused ? "#ffffff" : "#E8E8E8",
                }}>
                Contact list
              </Text>
            ),
          }}
          name="Contact List"
          component={ContactList}
        />
      </Tab.Navigator>
    </View>
  );
};

const searchIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.15625 14.0625C11.4182 14.0625 14.0625 11.4182 14.0625 8.15625C14.0625 4.89432 11.4182 2.25 8.15625 2.25C4.89432 2.25 2.25 4.89432 2.25 8.15625C2.25 11.4182 4.89432 14.0625 8.15625 14.0625Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.333 12.3328L15.7502 15.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const SearchScreen = ({navigation}) => {
  const inset = useSafeAreaInsets();
  const chatSearchRef=useSelector(state=>state.chatSearchRef)
  const dispatch=useDispatch()

  return (
    <View style={{ flex: 1, backgroundColor: "#4ADE80" }}>
      <View
        style={{
          height: inset?.top,
        }}
      />
      <StatusBar style="light" backgroundColor="#4ADE80" />
      <View
        style={{
          flexDirection: "row",
          //justifyContent: vendor ? "space-between" : "flex-end",
          paddingVertical: 16,
          alignItems:"center",
          paddingBottom:6,
          paddingHorizontal:20
        }}>
        <View style={{
            flexDirection:"row",
            borderRadius:4,
            backgroundColor:"#ffffff",
            flex:1,
            height:32,
            paddingHorizontal:16,
            alignItems:"center"
        }}>
            <TextInput onChangeText={e=>dispatch(setChatSearchRef(e))} value={chatSearchRef} style={{flex:1}} placeholder="Type name"/>
            <SvgXml xml={searchIcon}/>
        </View>
        <Pressable onPress={()=>{
            navigation.goBack()
        }} style={{
            marginLeft:8
        }}>
            <Text style={{
                fontWeight:"700",
                fontSize:16,
                color:"#ffffff"
            }}>Cancel</Text>
        </Pressable>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#ffffff",
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#4ADE80",
            marginLeft: 20,
            marginRight: 20,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  lineHeight: 16,
                  color: focused ? "#ffffff" : "#E8E8E8",
                }}>
                Chats
              </Text>
            ),
          }}
          name="Chat List"
          initialParams={{
            search:true
          }}
          component={ChatList}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  lineHeight: 16,
                  color: focused ? "#ffffff" : "#E8E8E8",
                }}>
                Contact list
              </Text>
            ),
          }}
          name="Contact List"
          initialParams={{
            search:true
          }}
          component={ContactList}
        />
      </Tab.Navigator>
    </View>
  );
};