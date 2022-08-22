import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoute from "./screens/TabRoute";
import ChatScreen from "./screens/ChatScreen";
import ChatHead from "./components/ChatHead";
import OtherProfile from "./screens/OtherProfile";
const Stack = createNativeStackNavigator();
import { secondaryColor } from "./assets/colors";
import SearchScreen from "./screens/SearchScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ManageOrder from './screens/ManageOrder';

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryColor,
    },
  };

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Dashboard"
            component={TabRoute}
          />
          <Stack.Screen
            options={{ header: (props) => <ChatHead {...props} /> }}
            name="ChatScreen"
            component={ChatScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OtherProfile"
            component={OtherProfile}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SearchScreen"
            component={SearchScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ManageOrder"
            component={ManageOrder}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </GestureHandlerRootView>
  );
}
