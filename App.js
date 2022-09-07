import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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
import ManageOrder from "./screens/ManageOrder";
import SubHeader from "./components/SubHeader";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store";
import OtherProfileHeader from "./components/OtherProfileHeader";
import AllReviewHeader from "./components/AllReviewHeader";
import AllReview from "./screens/AllReview";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import TableData from "./screens/Seller/TableData";
import {
  MD3LightTheme as Default,
  Provider as PaperProvider,
} from "react-native-paper";

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryColor,
    },
  };
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
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
      primary: "#3498db",
      secondary: "#f1c40f",
      tertiary: "#a1b2c3",
    },
    typescale: {
      ...Default.typescale, 
      fontFamily: "Poppins-Medium"
    }
  };
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
              screenOptions={({ route, navigation }) => ({
                gestureEnabled: true,
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
              })}
            >
              <Stack.Screen
                options={{
                  headerShown: false,
                  presentation: "modal",
                  animationTypeForReplace: "push",
                  animation: "slide_from_right",
                }}
                name="Dashboard"
                component={TabRoute}
              />
              <Stack.Screen
                options={{
                  header: (props) => <ChatHead {...props} />,
                }}
                name="ChatScreen"
                component={ChatScreen}
              />

              <Stack.Screen
                options={{
                  header: (props) => (
                    <AllReviewHeader title="23 Review" {...props} />
                  ),
                }}
                name="AllReview"
                component={AllReview}
              />
              <Stack.Screen
                name="TableData"
                options={{
                  header: (props) => <SubHeader {...props} />,
                }}
                component={TableData}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}
