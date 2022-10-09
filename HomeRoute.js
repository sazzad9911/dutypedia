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

const Stack = createStackNavigator();

const HomeRoute = ({ navigation }) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = useSelector((state) => state.vendor);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        options={{
          headerShown: false,
        }}
        component={Home}
      />
      <Stack.Screen
        name="NewFeed"
        options={{
          headerShown: false,
        }}
        component={Home_Next}
      />

      <Stack.Screen
        name="AllPackageList"
        options={{
          header: (props) => <SubHeader title="Fixed Price" {...props} />,
        }}
        component={AllPackageList}
      />
      <Stack.Screen
        options={{ header: (props) => <OtherProfileHeader {...props} /> }}
        name="OtherProfile"
        component={OtherProfile}
      />
    </Stack.Navigator>
  );
};
export default HomeRoute;
