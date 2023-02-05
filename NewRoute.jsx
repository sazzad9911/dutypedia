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

const Stack = createStackNavigator();

const NewRoute = ({ navigation,route }) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const [NewState, setNewState] = React.useState(false);
  const interestCategory = useSelector((state) => state.interestCategory);
  const [Loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();
  const serviceId=route.params.serviceId;
  const data=route.params.data;



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
        options={{
          headerStyle: {
            backgroundColor: "green",
          },
          headerShown: false,
        }}
        name="BargainingService"
        component={OtherProfile}
        initialParams={{
            serviceId:serviceId,
            data:data
        }}
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
    </Stack.Navigator>
  );
};
export default NewRoute;
const New = () => {
  return <View style={{ flex: 1, backgroundColor: "red" }} />;
};
