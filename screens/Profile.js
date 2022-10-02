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
import { primaryColor, backgroundColor, assentColor } from "./../assets/colors";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProfileOption from "./../components/ProfileOption";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createStackNavigator } from "@react-navigation/stack";
import ManageOrder from "./ManageOrder";
import Appointment from "./Appointment";
import SubHeader from "./../components/SubHeader";
import Upcoming from "./Appointment/Upcoming";
import AppointmentDetails from "./Appointment/AppointmentDetails";
import Previous from "./Appointment/Previous";
import SaveList from "./SaveList";
import Request from "./Appointment/Request";
import Receive from "./Appointment/Receive";
import Send from "./Appointment/Send";
import Support from "./Support";
import ImageViewer from "./ImageViewer";
import Header from "./../components/Header";
import { useSelector, useDispatch } from "react-redux";
import VendorProfile from "./VendorProfile";
import Menu from "./Vendor/Menu";
import { logOut,logoutVendor } from "../Class/auth";
import { dashboard, logout } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import DashboardList from './Vendor/DashboardList';
import Notice,{AddNotice,ViewCart} from './Vendor/Notice';
import Member,{AddOfflineUser,AddOnlineUser} from './Vendor/Member';
import Expenses,{AddExpenses} from './Vendor/Expenses';

const Stack = createStackNavigator();

const Profile = ({ navigation }) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = useSelector((state) => state.vendor);
  return (
    <Stack.Navigator>
      {vendor ? (
        <Stack.Screen
          name="MainProfile"
          options={{
            headerShown: false,
          }}
          component={Menu}
        />
      ) : (
        <Stack.Screen
          name="MainProfile"
          options={{
            headerShown: false,
          }}
          component={MainProfile}
        />
      )}
      <Stack.Screen
        name="VendorProfile"
        options={{
          headerShown: false,
        }}
        component={VendorProfile}
      />
      <Stack.Screen
        name="ManageOrder"
        options={{
          header: (props) => <SubHeader title="Manage Order" {...props} />,
        }}
        component={ManageOrder}
      />
      <Stack.Screen
        name="Appointment"
        options={{
          header: (props) => <SubHeader title="Appointment" {...props} />,
        }}
        component={Appointment}
      />
      <Stack.Screen
        name="Upcoming"
        options={{
          header: (props) => <SubHeader title="Appointment" {...props} />,
        }}
        component={Upcoming}
      />
      <Stack.Screen
        name="AppointmentDetails"
        options={{
          header: (props) => <SubHeader title="Appointment" {...props} />,
        }}
        component={AppointmentDetails}
      />
      <Stack.Screen
        name="Previous"
        options={{
          header: (props) => <SubHeader title="Appointment" {...props} />,
        }}
        component={Previous}
      />
      <Stack.Screen
        name="Request"
        options={{
          header: (props) => <SubHeader title="Appointment" {...props} />,
        }}
        component={Request}
      />
      <Stack.Screen
        name="Receive"
        options={{
          header: (props) => <SubHeader title="Appointment" {...props} />,
        }}
        component={Receive}
      />
      <Stack.Screen
        name="Send"
        options={{
          header: (props) => <SubHeader title="Appointment" {...props} />,
        }}
        component={Send}
      />
      <Stack.Screen
        name="SaveList"
        options={{
          headerShown: false,
        }}
        component={SaveList}
      />
      <Stack.Screen
        name="Support"
        options={{
          header: (props) => <SubHeader title="Contact Form" {...props} />,
        }}
        component={Support}
      />
      <Stack.Screen
        name="ImageViewer"
        options={{
          header: (props) => <SubHeader title="Contact Form" {...props} />,
        }}
        component={ImageViewer}
      />
      <Stack.Screen
          name="DashboardList"
          options={{
            headerShown: false,
          }}
          component={DashboardList}
        />
        <Stack.Screen
          name="Notice"
          options={{
            headerShown: false,
          }}
          component={Notice}
        />
        <Stack.Screen
          name="AddNotice"
          options={{
            header:(props)=><SubHeader title="Add Notice" {...props} />
          }}
          component={AddNotice}
        />
        <Stack.Screen
          name="ViewCart"
          options={{
            headerShown: false,
          }}
          component={ViewCart}
        />
        <Stack.Screen
          name="Member"
          options={{
            headerShown: false,
          }}
          component={Member}
        />
        <Stack.Screen
          name="AddOfflineUser"
          options={{
            headerShown: false,
          }}
          component={AddOfflineUser}
        />
        <Stack.Screen
          name="AddOnlineUser"
          options={{
            headerShown: false,
          }}
          component={AddOnlineUser}
        />
         <Stack.Screen
          name="Expenses"
          options={{
            headerShown: false,
          }}
          component={Expenses}
        />
        <Stack.Screen
          name="AddExpenses"
          options={{
            header:(props)=><SubHeader title="Add Expenses" {...props} />
          }}
          component={AddExpenses}
        />
    </Stack.Navigator>
  );
};

const { width, height } = Dimensions.get("window");
const MainProfile = (props) => {
  const window = Dimensions.get("window");
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const navigation = props.navigation;
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [LogOut, setLogOut]= React.useState(false);

  React.useEffect(() => {
    if(user&&!Array.isArray(user)){
      setLogOut(false)
    }
  }, [user]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const pickBackgroundImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setBackgroundImage(result.uri);
    }
  };
  if (LogOut) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading.....</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={pickBackgroundImage}
            style={[styles.icon, styles.iconTop]}
          >
            <EvilIcons name="camera" size={24} color="red" />
          </TouchableOpacity>
          {backgroundImage ? (
            <Image
              source={{ uri: backgroundImage }}
              style={styles.backgroundContainer}
            />
          ) : (
            <LinearGradient
              style={styles.backgroundContainer}
              colors={["#983C85", "#983C85", "#983C53"]}
            ></LinearGradient>
          )}

          <View style={styles.profile}>
            {image ? (
              <Image style={styles.image} source={{ uri: image }} />
            ) : (
              <FontAwesome name="user" size={80} color="#983C85" />
            )}
            <TouchableOpacity
              onPress={pickImage}
              style={[styles.icon, styles.iconBottom]}
            >
              <EvilIcons name="camera" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headLine}>
            {user ? user.user.firstName + " " + user.user.lastName : "-"}
          </Text>
          <Text style={styles.text}>@{user ? user.user.username : ""}</Text>
        </View>
        <ProfileOption
          badge={true}
          onPress={() => {
            navigation.navigate("ManageOrder");
          }}
          Icon={() => <Octicons name="checklist" size={24} color="black" />}
          title="Manage Order"
        />
        <ProfileOption
          badge={true}
          onPress={() => {
            navigation.navigate("Appointment");
          }}
          Icon={() => <AntDesign name="calendar" size={24} color="black" />}
          title="Appointment"
        />
        <ProfileOption
          onPress={() => {
            
          }}
          Icon={() => <AntDesign name="wallet" size={24} color="black" />}
          title="Account Balance"
        />
        <ProfileOption
          onPress={() => {
            navigation.navigate("SaveList");
          }}
          Icon={() => <AntDesign name="hearto" size={24} color="black" />}
          title="Saved"
        />
        <ProfileOption
          onPress={() => {
            navigation.navigate("MainCategory");
          }}
          Icon={() => <Ionicons name="business" size={24} color="black" />}
          title="Create a business account"
        />
        {vendorInfo && (
          <ProfileOption
            onPress={() => {
              navigation.navigate("DashboardList");
            }}
            Icon={() => <SvgXml xml={dashboard} height="24" width="24" />}
            title="Login To Business Account"
          />
        )}
        <ProfileOption
          onPress={() => {
            setLogOut(true);
            logOut();
            logoutVendor();
            dispatch({type:'SET_VENDOR',playload:false});
            dispatch({ type: "SET_USER", playload: [] });
            dispatch({ type: "SET_VENDOR_INFO", playload: false });
            navigation.goBack()
          }}
          Icon={() => (
            <Ionicons name="log-out-outline" size={24} color="black" />
          )}
          title="Log Out"
        />
        <ProfileOption
          onPress={() => {
            navigation.navigate("Support");
          }}
          Icon={() => <FontAwesome name="support" size={24} color="black" />}
          title="Support"
        />
      </ScrollView>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  backgroundContainer: {
    minHeight: 200,
  },
  container: {
    minHeight: 315,
    backgroundColor: primaryColor,
  },
  profile: {
    borderWidth: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: backgroundColor,
    width: 90,
    height: 90,
    marginTop: -45,
    alignSelf: "center",
    backgroundColor: primaryColor,
    borderColor: backgroundColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5,
    shadowColor: backgroundColor,
    elevation: 5,
    shadowOpacity: 0.1,
  },
  iconTop: {
    position: "absolute",
    right: 20,
    top: 50,
    zIndex: 4,
  },
  iconBottom: {
    position: "absolute",
    zIndex: 4,
    bottom: -10,
    right: -10,
  },
  headLine: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Poppins-Medium",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#666666",
    marginTop: -10,
  },
  image: {
    width: 80,
    height: 80,
  },
});
