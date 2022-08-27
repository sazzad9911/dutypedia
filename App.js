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
import OtherProfileHeader from './components/OtherProfileHeader';
import AllReviewHeader from './components/AllReviewHeader';
import AllReview from './screens/AllReview';

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryColor,
    },
  };

  return (
    <Provider store={store}>
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
              options={{ header: (props)=><OtherProfileHeader {...props}/> }}
              name="OtherProfile"
              component={OtherProfile}
            />

            <Stack.Screen
              options={{ header: (props) => <SubHeader {...props} /> }}
              name="ManageOrder"
              component={ManageOrder}
            />
            <Stack.Screen options={{ header: (props) => <AllReviewHeader {...props}/>}}
            name="AllReview"
            component={AllReview}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
