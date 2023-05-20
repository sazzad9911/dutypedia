import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  useRoute,
} from "@react-navigation/native";
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
import VendorAddress from "./screens/Vendor/VendorAddress";
import Expenses from "./screens/Vendor/Expenses";
import { AddExpenses } from "./screens/Vendor/Expenses";
import DashboardList from "./screens/Vendor/DashboardList";
import Category from "./screens/Seller/Category";
import Support from "./screens/Support";
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
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import FixedService from "./screens/FixedService";
import PackageService from "./screens/PackageService";
import { SubscriptionDates } from "./screens/Seller/SubscriptionDates";
import * as Network from "expo-network";
import AccountHeader from "./screens/Vendor/account/AccountHeader";
import WithdrawFirst from "./screens/Vendor/account/WithdrawFirst";
import WithdrawSecond from "./screens/Vendor/account/WithdrawSecond";
import WithdrawFinal from "./screens/Vendor/account/WithdrawFinal";
import ServiceScreen from "./screens/ServiceScreen";
import ServiceHeader from "./components/LandingPage/ServiceHeader";
import Search from "./screens/Search";
import InitialPage from "./screens/create_dashboard/InitialPage";
import CommonHeader from "./screens/create_dashboard/CommonHeader";
import BusinessTitle from "./screens/create_dashboard/BusinessTitle";
import YourInformation from "./screens/create_dashboard/YourInformation";
import StakeHolder from "./screens/create_dashboard/StakeHolder";
import Established from "./screens/create_dashboard/Established";
import WorkingTime from "./screens/create_dashboard/WorkingTime";
import NewPricing from "./screens/create_dashboard/NewPricing";
import Skills from "./screens/create_dashboard/Skills";
import ServiceDescribe from "./screens/create_dashboard/ServiceDescribe";
import Location from "./screens/create_dashboard/Location";
import About from "./screens/create_dashboard/About";
import FinalReview from "./screens/create_dashboard/FinalReview";
import ChatImage from "./screens/message/ChatImage";
import SignUp_1 from "./screens/signup/SignUp_1";
import SignUp_2 from "./screens/signup/SignUp_2";
import SignUp_3 from "./screens/signup/SignUp_3";
import Recovery from "./screens/signup/Recovery";
import Reset from "./screens/signup/Reset";
import UserProfile from "./screens/UserProfile";
import WebViews from "./screens/WebViews";

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

  
 
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryColor,
    },
  };


  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          gestureEnabled: true,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        })}>
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
          options={{
            headerShown: false,
          }}
          name="ChatImage"
          component={ChatImage}
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
          options={{ header:(props)=><SubHeader title={"Login"} {...props}/> }}
          name="LogIn"
          component={Login}
        />
        <Stack.Screen
          options={{ header:(props)=><SubHeader title={"Phone number verification"} {...props}/> }}
          name="Recovery"
          component={Recovery}
        />
        <Stack.Screen
          options={{ header:(props)=><SubHeader title={"Password reset"} {...props}/> }}
          name="Reset"
          component={Reset}
        />
        <Stack.Screen
          options={{ header:(props)=><SubHeader title={"Phone number verification"} {...props}/> }}
          name="SignUp_1"
          component={SignUp_1}
        />
        <Stack.Screen
          options={{ header:(props)=><SubHeader title={"Phone number verification"} {...props}/> }}
          name="SignUp_2"
          component={SignUp_2}
        />
        <Stack.Screen
          options={{ header:(props)=><SubHeader title={"User information"} {...props}/> }}
          name="SignUp_3"
          component={SignUp_3}
        />
        {/* <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ChatScreen"
            component={ChatScreen}
          /> */}

        
        
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
            header: (props) => <SubHeader title="Your Service List" {...props} />,
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
           headerShown:false
          }}
          name="CreateAppointment"
          component={CreateAppointment}
        />
        <Stack.Screen
          options={{
            headerShown:false
          }}
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
        {/* <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="VendorAppointmentList"
            component={VendorAppointmentList}
          /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateVendorAppointment"
          component={CreateVendorAppointment}
        />
        <Stack.Screen
          options={{
            headerShown:false
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
            headerShown:false
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
          name="UserRequestAppointment"
          component={UserRequestAppointment}
        />
        <Stack.Screen
          options={{
            headerShown:false
          }}
          name="UserAppointmentDetails"
          component={UserAppointmentDetails}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SubscriptionDates"
          component={SubscriptionDates}
        />
        <Stack.Screen
          options={{
            header: (props) => <AccountHeader title={"Withdraw"} {...props} />,
          }}
          name="WithdrawFirst"
          component={WithdrawFirst}
        />
        <Stack.Screen
          options={{
            header: (props) => <AccountHeader title={"Withdraw"} {...props} />,
          }}
          name="WithdrawSecond"
          component={WithdrawSecond}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="WithdrawFinal"
          component={WithdrawFinal}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ServiceScreen"
          component={ServiceScreen}
        />
        {
          //new service account screens
        }
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfile}
        />
        <Stack.Screen
        options={{ headerShown: false }}
        name="WebViewsGlobal"
        component={WebViews}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const New = () => {
  return (
    <View
      style={{
        backgroundColor: "green",
        flex: 1,
      }}></View>
  );
};
