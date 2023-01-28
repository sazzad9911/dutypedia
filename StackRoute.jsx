import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionSpecs } from "@react-navigation/stack";
import TabRoute from "./screens/TabRoute";
import ChatScreen from "./screens/ChatScreen";
import ChatHead from "./components/ChatHead";
import OtherProfile from "./screens/OtherProfile";
const Stack = createStackNavigator();
import { Color } from "./assets/colors";
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
import { getService, getDashboard } from "./Class/service";
import AllService from "./screens/Vendor/AllService";
import VendorCalender from "./screens/Vendor/VendorCalender";
import VendorAddress from "./screens/Vendor/VendorAddress";
import Expenses from "./screens/Vendor/Expenses";
import { AddExpenses } from "./screens/Vendor/Expenses";
import DashboardList from "./screens/Vendor/DashboardList";
import Category from "./screens/Seller/Category";
import Support from "./screens/Support";
import Feed from "./screens/Feed";
import { getJson } from "./Class/storage";
import { getSocket, socket } from "./Class/socket";
import VendorProfile from "./screens/VendorProfile";
import AddPackage, { AddScreen } from "./screens/services/AddPackage";
import AppointmentHeader from "./components/Appointment/AppointmentHeader";
import AppointmentList from "./screens/Seller/Appointment/AppointmentList";
import CreateAppointment from "./screens/Seller/Appointment/CreateAppointment";
import AppointmentDetails from "./screens/Seller/Appointment/AppointmentDetails";
import VendorAppointmentList from "./screens/Vendor/Appointment/VendorAppointmentList";
import CreateVendorAppointment from "./screens/Vendor/Appointment/CreateVendorAppointment";
import AppointmentForm from "./screens/Vendor/Appointment/AppointmentForm";
import RequestAppointmentList from "./screens/Vendor/Appointment/RequestAppointmentList";
import VendorAppointmentListDetails from "./screens/Vendor/Appointment/VendorAppointmentListDetails";
import UserAppointmentList from "./screens/Seller/UserAppointment/UserAppointmentList";
import UserRequestAppointment from "./screens/Seller/UserAppointment/UserRequestAppointment";
import UserAppointmentDetails from "./screens/Seller/UserAppointment/UserAppointmentDetails";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FixedService from "./screens/FixedService";
import PackageService from "./screens/PackageService";
import { SubscriptionDates } from "./screens/Seller/SubscriptionDates";
import * as Network from 'expo-network';

export default function StackRoute() {
  const user = useSelector((state) => state.user);
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const [load, setLoad] = React.useState(false);
  const [Vendor, setVendor] = React.useState(false);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  const [userId, setUserId] = React.useState();

  React.useEffect(() => {

    checkUser()
      .then((res) => {
        //console.log(res)
        if (res) {
          setUserId(res.user.id);
          dispatch({ type: "SET_USER", playload: res });
          getDashboard(res.token).then((result) => {
            if (result && result.data && result.data.dashboards) {
              dispatch({
                type: "SET_VENDOR_INFO",
                playload: result.data.dashboards,
              });
              setLoad(!load);
            } else {
              dispatch({ type: "SET_VENDOR_INFO", playload: false });
              setLoad(!load);
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
    getJson("theme").then((data) => {
      if (data) {
        dispatch({ type: "SET_THEME", playload: data });
      }
    });
    (async()=>{
      const net=await Network.getNetworkStateAsync();
      if(net && !net.isConnected){
        Alert.alert("Ops!","You are offline")
      }
    })()
  }, []);
  React.useEffect(() => {
    if (userId) {
      socket.on("connect", () => {
        getSocket(userId);
      });
    }
  }, [socket + userId]);
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
        <Text style={{ color: textColor }}>Loading.....</Text>
      </View>
    );
  }
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
      }}
    >
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
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
              headerShown: false,
            }}
            name="Dashboard"
            component={TabRoute}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SearchScreen_1"
            component={SearchScreen}
          />
          {/* <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: "green",
              },
              headerShown: false,
            }}
            name="OtherProfile"
            component={OtherProfile}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="FixedService"
            component={FixedService}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PackageService"
            component={PackageService}
          /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="LogIn"
            component={Login}
          />
          {/* <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ChatScreen"
            component={ChatScreen}
          /> */}

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
          <Stack.Screen
            name="SubCategories"
            options={{
              header: (props) => <SubHeader {...props} />,
            }}
            component={SubCategories}
          />
          <Stack.Screen
            name="Category"
            options={{
              headerShown: false,
            }}
            component={Category}
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
              headerShown:false,
             // : (props) => <SubHeader title="Service" {...props} />
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
            name="VendorProfile_1"
            options={{
              headerShown: false,
            }}
            component={VendorProfile}
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
            name="Vendor Address"
            options={{
              header: (props) => <SubHeader title="Address" {...props} />,
            }}
            component={VendorAddress}
          />
          <Stack.Screen
            name="Support_1"
            options={{
              header: (props) => <SubHeader title="Report" {...props} />,
            }}
            component={Support}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddPackage"
            component={AddPackage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddPackageScreen"
            component={AddScreen}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="AppointmentList"
            component={AppointmentList}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="CreateAppointment"
            component={CreateAppointment}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="AppointmentDetails"
            component={AppointmentDetails}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="VendorAppointmentList"
            component={VendorAppointmentList}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CreateVendorAppointment"
            component={CreateVendorAppointment}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="AppointmentForm"
            component={AppointmentForm}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="RequestAppointmentList"
            component={RequestAppointmentList}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="VendorAppointmentListDetails"
            component={VendorAppointmentListDetails}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="UserAppointmentList"
            component={UserAppointmentList}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="UserRequestAppointment"
            component={UserRequestAppointment}
          />
          <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="UserAppointmentDetails"
            component={UserAppointmentDetails}
          />
          <Stack.Screen
            options={{
              headerShown:false
            }}
            name="SubscriptionDates"
            component={SubscriptionDates}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
const New = () => {
  return (
    <View
      style={{
        backgroundColor: "green",
        flex: 1,
      }}
    ></View>
  );
};
