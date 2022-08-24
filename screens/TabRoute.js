import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Header from "./../components/Header";
import Search from "./Search";
import Message from "./Message";
import Notification from "./Notification";
import Profile from "./Profile";
import { Ionicons } from "@expo/vector-icons";
import ChatHeader from "./../components/ChatHeader";
import BottomBar from './../components/BottomBar';
import SearchScreen from './SearchScreen';
const Tab = createBottomTabNavigator();

const TabRoute = () => {
  return (
    <Tab.Navigator tabBar={(props)=><BottomBar {...props}/>}>
      <Tab.Screen
        options={{ header: (props) => <Header {...props}/> }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{ header: (props) => <Header {...props}/> }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{ header: (props) => <ChatHeader {...props}/> }}
        name="Message"
        component={Message}
      />
      <Tab.Screen
        options={{ header: (props) => <Header {...props}/> }}
        name="Notification"
        component={Notification}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
            options={{ headerShown: false }}
            name="SearchScreen"
            component={SearchScreen}
          />
    </Tab.Navigator>
  );
};

export default TabRoute;
