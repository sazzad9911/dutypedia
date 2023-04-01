//import {  } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  DevSettings,
  Modal,
} from "react-native";
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
import React, { useEffect, useState, useRef } from "react";
import {
  MD3LightTheme as Default,
  Provider as PaperProvider,
} from "react-native-paper";
import { checkUser } from "./Class/auth";
import StackRoute from "./StackRoute";
import { useSelector } from "react-redux";
import { Color } from "./assets/colors";
import { RootSiblingParent } from "react-native-root-siblings";
import * as Network from "expo-network";
import CustomAppStatusBar from "./Hooks/AppBar";
import Button from "./components/Button";
import IconButton from "./components/IconButton";
//import { getStream } from "./Utils";
import { socket } from "./Class/socket";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
  const getNetwork = async () => {
    const network = await Network.getNetworkStateAsync();
    console.log(network);
  };
  //getNetwork()

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <RootSiblingParent>
            <Views />
            {/* <WebRTC/> */}
          </RootSiblingParent>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
const Views = () => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const statusBar = useSelector((state) => state.statusBar);
  const [ModalVisible, setModalVisible] = React.useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <CustomAppStatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={statusBar?.backgroundColor}
      /> */}
      <StackRoute />
      <Modal
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(!ModalVisible);
        }}></Modal>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#313131",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  text: {
    fontSize: 30,
  },
  rtcview: {
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    width: "80%",
    backgroundColor: "black",
  },
  rtc: {
    width: "80%",
    height: "100%",
  },
  toggleButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const WebRTC = () => {
  return null;
};
