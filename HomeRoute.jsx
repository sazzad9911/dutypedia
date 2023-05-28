import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { primaryColor, backgroundColor, assentColor } from "./assets/colors";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProfileOption from "./components/ProfileOption";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { logOut, logoutVendor } from "./Class/auth";
import { dashboard, logout } from "./assets/icon";
import { SvgXml } from "react-native-svg";
import OtherProfile from "./screens/OtherProfile";
import OtherProfileHeader from "./components/OtherProfileHeader";
import AllPackageList from "./screens/Seller/AllPackageList";
import Home from "./screens/Home";
import SubHeader from "./components/SubHeader";
import Home_Next from "./screens/Home_Next";
import { getFavoriteCategories } from "./Class/auth";
import { useRoute } from "@react-navigation/native";
import CategoryList from "./screens/CategoryList";
import OfferNow from "./screens/Seller/OfferNow";
import FixedOffers from "./screens/Seller/FixedOffers";
import ManageOrder from "./screens/ManageOrder";
import OrderDetails from "./screens/Seller/OrderDetails";
import { io } from "socket.io-client";
import Notice from "./screens/UserNotice";
import NewHeader from "./components/NewHeader";
import { ViewCart } from "./screens/Vendor/Notice";
import CompanyCalendar from "./screens/Seller/CompanyCalendar";
import { getOnlineUsers, socket } from "./Class/socket";
import AddServiceList from "./screens/AddServiceList";
import AppointmentList from "./screens/Seller/Appointment/AppointmentList";
import AppointmentHeader from "./components/Appointment/AppointmentHeader";
import CreateAppointment from "./screens/Seller/Appointment/CreateAppointment";
import AppointmentDetails from "./screens/Seller/Appointment/AppointmentDetails";
import FixedService from "./screens/FixedService";
import PackageService from "./screens/PackageService";
import ChatScreen from "./screens/ChatScreen";
import SubscriptionService from "./screens/SubscriptionService";
import InstallmentService from "./screens/InstallmentService";
import UserNotice from "./screens/UserNotice";
import Feed from "./screens/Feed";
import CommonHeader from "./screens/create_dashboard/CommonHeader";
import FinalReview from "./screens/create_dashboard/FinalReview";
import About from "./screens/create_dashboard/About";
import Location from "./screens/create_dashboard/Location";
import ServiceDescribe from "./screens/create_dashboard/ServiceDescribe";
import Skills from "./screens/create_dashboard/Skills";
import NewPricing from "./screens/create_dashboard/NewPricing";
import WorkingTime from "./screens/create_dashboard/WorkingTime";
import Established from "./screens/create_dashboard/Established";
import StakeHolder from "./screens/create_dashboard/StakeHolder";
import YourInformation from "./screens/create_dashboard/YourInformation";
import BusinessTitle from "./screens/create_dashboard/BusinessTitle";
import InitialPage from "./screens/create_dashboard/InitialPage";
import AllReview from "./screens/AllReview";
import CancelOrderConfirmation from "./screens/Seller/OrderScript/CancelOrderConfirmation";
import TableData from "./screens/Seller/TableData";
import SubCategories from "./screens/Seller/SubCategories";
import Category from "./screens/Seller/Category";
import Pricing from "./screens/Seller/Pricing";
import Service from "./screens/Seller/Service";
import Address from "./screens/Seller/Address";
import ServiceOrder from "./screens/order/ServiceOrder";
import ChooseDateOrder from "./screens/order/ChooseDateOrder";
import InstructionOrder from "./screens/order/InstructionOrder";
import { SearchSecond, SearchThird } from "./screens/Search";
import ServiceCategory from "./screens/create_dashboard/ServiceCategory";
import ExtraFacilities from "./screens/create_dashboard/ExtraFacilities";
import ProfileKeyWord from "./screens/create_dashboard/ProfileKeyWord";

const Stack = createStackNavigator();

const HomeRoute = ({ navigation }) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const [NewState, setNewState] = React.useState(false);
  const interestCategory = useSelector((state) => state.interestCategory);
  const [Loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();

  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        options={{
          headerShown: false,
        }}
        component={Feed}
      />
      <Stack.Screen
        name="AllPackageList"
        options={{
          header: (props) => <SubHeader title="Fixed Price" {...props} />,
        }}
        component={AllPackageList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchSecond"
        component={SearchSecond}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchThird"
        component={SearchThird}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Notice"
        component={Notice}
      /> */}
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="ViewCart"
        component={ViewCart}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="CategoryList"
        component={CategoryList}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="OfferNow"
        component={OfferNow}
      />
      <Stack.Screen
        options={{
          header: (props) => <SubHeader title="Confirm Order" {...props} />,
        }}
        name="FixedOffers"
        component={FixedOffers}
      />
      <Stack.Screen
        name="ManageOrder"
        options={{
          headerShown: false,
        }}
        component={ManageOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderDetails"
        component={OrderDetails}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <SubHeader {...props} title={"Cancel confirmation"} />
          ),
        }}
        name="CancelOrderConfirmation"
        component={CancelOrderConfirmation}
      />
      <Stack.Screen
        name="Company Calender"
        options={{
          header: (props) => <SubHeader {...props} title={"Working Time"} />,
        }}
        component={CompanyCalendar}
      />
      <Stack.Screen
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
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubscriptionService"
        component={SubscriptionService}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="InstallmentService"
        component={InstallmentService}
      />
      <Stack.Screen
        name="UserNotice"
        options={{
          headerShown: false,
        }}
        component={UserNotice}
      />

      {
        //service screen
      }
      <Stack.Screen
        options={{
          header: (props) => (
            <CommonHeader no={true} {...props} title={"Business account"} />
          ),
        }}
        name="InitialServiceCreate"
        component={InitialPage}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <CommonHeader {...props} title={"Business Title"} />
          ),
        }}
        name="BusinessTitle"
        component={BusinessTitle}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <CommonHeader {...props} title={"Your Information"} />
          ),
        }}
        name="YourInformation"
        component={YourInformation}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Stakeholder"} />,
        }}
        name="Stakeholder"
        component={StakeHolder}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Established"} />,
        }}
        name="Established"
        component={Established}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Working Time"} />,
        }}
        name="WorkingTime"
        component={WorkingTime}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Pricing"} />,
        }}
        name="NewPricing"
        component={NewPricing}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Skills"} />,
        }}
        name="Skills"
        component={Skills}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <CommonHeader {...props} title={"Service Describe"} />
          ),
        }}
        name="ServiceDescribe"
        component={ServiceDescribe}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Location"} />,
        }}
        name="Location"
        component={Location}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"About"} />,
        }}
        name="About"
        component={About}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="FinalReview"
        component={FinalReview}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AllReview"
        component={AllReview}
      />
      {
        //new
      }
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
        name="ServiceCategory"
        options={{
          header: (props) => (
            <CommonHeader {...props} title={"Service Category"} />
          ),
        }}
        component={ServiceCategory}
      />
      <Stack.Screen
        name="ExtraFacilities"
        options={{
          header: (props) => (
            <CommonHeader {...props} title={"Extra Facilities"} />
          ),
        }}
        component={ExtraFacilities}
      />
      <Stack.Screen
        name="ProfileKeyword"
        options={{
          header: (props) => (
            <CommonHeader {...props} title={"Profile Keyword"} />
          ),
        }}
        component={ProfileKeyWord}
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
          headerShown: false,
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
        options={{
          headerShown: false,
        }}
        name="ServiceOrder"
        component={ServiceOrder}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ChooseDateOrder"
        component={ChooseDateOrder}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="InstructionOrder"
        component={InstructionOrder}
      />
    </Stack.Navigator>
  );
};
export default HomeRoute;
const New = () => {
  return <View style={{ flex: 1, backgroundColor: "red" }} />;
};
