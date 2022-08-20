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
const Tab = createBottomTabNavigator();

const TabRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search-sharp" : "search-outline";
          } else if (route.name === "Message") {
            iconName = focused ? "paper-plane-sharp" : "paper-plane-outline";
          } else if (route.name === "Notification") {
            iconName = focused
              ? "notifications-sharp"
              : "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person-circle-sharp"
              : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#808080",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{ header: () => <Header /> }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{ header: () => <Header /> }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{ header: () => <ChatHeader /> }}
        name="Message"
        component={Message}
      />
      <Tab.Screen
        options={{ header: () => <Header /> }}
        name="Notification"
        component={Notification}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabRoute;
