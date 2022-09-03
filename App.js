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
import React from "react"

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
    'Poppins-Light': require("./assets/fonts/Poppins-Light.ttf"),
    'Poppins-Medium': require("./assets/fonts/Poppins-Medium.ttf"),
    'Poppins-Thin': require("./assets/fonts/Poppins-Thin.ttf"),
    'Poppins-SemiBold': require("./assets/fonts/Poppins-SemiBold.ttf")
  });

  // React.useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = React.useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView  style={{ flex: 1 }}>
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
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
