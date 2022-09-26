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
import SubCategories from "./screens/Seller/SubCategories";
import Pricing from "./screens/Seller/Pricing";
import Service from "./screens/Seller/Service";
import Address from "./screens/Seller/Address";
import Review from "./screens/Seller/Review";
import AllServiceList from "./screens/Seller/AllServiceList";
import CompanyCalendar from "./screens/Seller/CompanyCalendar";
import Login from "./screens/Login";
import { checkUser } from "./Class/auth";
import { useSelector, useDispatch } from "react-redux";
import { getService } from "./Class/service";
import AllService from './screens/Vendor/AllService';
import VendorCalender from './screens/Vendor/VendorCalender';
import VendorAddress from './screens/Vendor/VendorAddress';

export default function StackRoute() {
  const user = useSelector((state) => state.user);
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const [load, setLoad] = React.useState(false);
  const [Vendor,setVendor] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    checkUser()
      .then((res) => {
        //console.log(res)
        if (res) {
          dispatch({ type: "SET_USER", playload: res });
          getService(res.token).then((result) => {
            if (result && !result.msg) {
              dispatch({ type: "SET_VENDOR_INFO", playload: result });
              console.log('ok')
              setLoad(!load);
            }else{
              dispatch({ type: "SET_VENDOR_INFO", playload: false });
              setLoad(!load);
              console.log('not ok')
            }
          });
        } else {
          setLoad(!load);
          dispatch({ type: "SET_USER", playload: [] });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryColor,
    },
  };

  if (!user && !load) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading.....</Text>
      </View>
    );
  }
  return (
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
        {Array.isArray(user) && load ? (
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
            name="LogIn"
            component={Login}
          />
        ) : (
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
        )}

        <Stack.Screen
          options={{
            header: (props) => <ChatHead {...props} />,
          }}
          name="ChatScreen"
          component={ChatScreen}
        />

        <Stack.Screen
          options={{
            header: (props) => <AllReviewHeader title="23 Review" {...props} />,
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

        <Stack.Screen
          name="SubCategories"
          options={{
            header: (props) => <SubHeader {...props} />,
          }}
          component={SubCategories}
        />
        <Stack.Screen
          name="SubCategories_1"
          options={{
            header: (props) => <SubHeader {...props} />,
          }}
          component={SubCategories}
        />
        <Stack.Screen
          name="Pricing"
          options={{
            header: (props) => <SubHeader title="Pricing" {...props} />,
          }}
          component={Pricing}
        />
        <Stack.Screen
          name="Service"
          options={{
            header: (props) => <SubHeader title="Service" {...props} />,
          }}
          component={Service}
        />
        <Stack.Screen
          name="Address"
          options={{
            header: (props) => <SubHeader title="Address" {...props} />,
          }}
          component={Address}
        />
        <Stack.Screen
          name="Review"
          options={{
            header: (props) => <SubHeader title="Review" {...props} />,
          }}
          component={Review}
        />
        <Stack.Screen
          name="Service List"
          options={{
            header: (props) => <SubHeader title="Service List" {...props} />,
          }}
          component={AllServiceList}
        />
        <Stack.Screen
          name="Service List_1"
          options={{
            header: (props) => <SubHeader title="Service List" {...props} />,
          }}
          component={AllService}
        />
        <Stack.Screen
          name="Company Calender"
          options={{
            header: (props) => (
              <SubHeader title="Company Calender" {...props} />
            ),
          }}
          component={CompanyCalendar}
        />
        <Stack.Screen
          name="Vendor Calender"
          options={{
            header: (props) => (
              <SubHeader title="Company Calender" {...props} />
            ),
          }}
          component={VendorCalender}
        />
        <Stack.Screen
          name="Vendor Address"
          options={{
            header: (props) => <SubHeader title="Address" {...props} />,
          }}
          component={VendorAddress}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
