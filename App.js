import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionSpecs } from "@react-navigation/stack";
import TabRoute from "./screens/TabRoute";
import ChatScreen from "./screens/ChatScreen";
import ChatHead from "./components/ChatHead";
import OtherProfile from "./screens/OtherProfile";
const Stack = createStackNavigator();
import { secondaryColor } from "./assets/colors";
import SearchScreen from "./screens/SearchScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import {
  MD3LightTheme as Default,
  Provider as PaperProvider,
} from "react-native-paper";
import { checkUser } from "./Class/auth";
import StackRoute from "./StackRoute";

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryColor,
    },
  };
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Roboto-Regular.ttf"),
    "Poppins-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const theme = {
    ...Default,
    roundness: 2,
    version: 3,
    colors: {
      ...Default.colors,
      primary: "#DA1E37",
      secondary: "#f1c40f",
      tertiary: "#e5e5e5",
      background: "#ffffff",
      outline: "#e5e5e5",
    },
    typescale: {
      ...Default.typescale,
      fontFamily: "Poppins-Medium",
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar barStyle='dark-content' backgroundColor='#ffffff' />
          <SafeAreaView style={{ flex: 1}}>
          <StackRoute />
          </SafeAreaView>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}
