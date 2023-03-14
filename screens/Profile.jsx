import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  RefreshControl,
  StatusBar,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "../assets/colors";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProfileOption from "../components/ProfileOption";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createStackNavigator } from "@react-navigation/stack";
import ManageOrder from "./ManageOrder";
import Appointment from "./Appointment";
import SubHeader from "../components/SubHeader";
import Upcoming from "./Appointment/Upcoming";
import AppointmentDetails from "./Appointment/AppointmentDetails";
import Previous from "./Appointment/Previous";
import SaveList from "./SaveList";
import Request from "./Appointment/Request";
import Receive from "./Appointment/Receive";
import Send from "./Appointment/Send";
import Support from "./Support";
import ImageViewer from "./ImageViewer";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import VendorProfile from "./VendorProfile";
import Menu from "./Vendor/Menu";
import { logOut, logoutVendor } from "../Class/auth";
import { dashboard, logout } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import DashboardList from "./Vendor/DashboardList";
import Notice,{ AddNotice, ViewCart } from "./Vendor/Notice";
import Member, { AddOfflineUser, AddOnlineUser } from "./Vendor/Member";
import Expenses, { AddExpenses } from "./Vendor/Expenses";
import ServiceSettings from "./Vendor/ServiceSettings";
import Review from "./Seller/Review";
import AllPackageList from "./Seller/AllPackageList";
import OtherProfile from "./OtherProfile";
import OtherProfileHeader from "../components/OtherProfileHeader";
import { CheckBox } from "./Seller/Pricing";
import { Switch } from "react-native-paper";
import { storeJson } from "../Class/storage";
import { getOrders } from "../Class/service";
import OrderDetails from "./Seller/OrderDetails";
import AddServiceList from "./AddServiceList";
import UserNotice from "./UserNotice";
import CompanyCalendar from "./Seller/CompanyCalendar";
import OnlineUserProfile from "./Vendor/OnlineUserProfile";
import UserProfile from "./UserProfile";
import OfflineProfile from "./OfflineProfile";
import Note, { AddNote, ViewNote } from "./Vendor/Note";
import AddPackage from "./services/AddPackage";
import { SafeAreaView } from "react-native-safe-area-context";
import VendorFixedService from "./Vendor/VendorFixedService";
import VendorPackageService from "./Vendor/VendorPackageService";
import AddSubscription from "./services/AddSubscription";
import VendorSubscriptionService from "./Vendor/VendorSubscriptionService";
import SubscriptionScript from "./services/SubscriptionScript";
import AddInstallment from "./services/AddInstallment";
import VendorInstallmentService from "./Vendor/VendorInstallmentService";
import InstallmentScript from "./services/InstallmentScript";
import EditVendorInfo from "./Profile/EditVendorInfo";
import MemberAppointment from "./Vendor/Appointment/MemberAppointment";
import EditService from "./Profile/EditService";
import EditPackageService,{AddScreen} from "./Profile/EditPackageService";
import EditSubscriptionService from "./Profile/EditSubscriptionService";
import EditInstallmentService from "./Profile/EditInstallmentService";
import EditServiceList from "./Profile/EditServiceList";
import EditSubCategory from "./Profile/EditSubCategory";
import EditTableData from "./Profile/EditTableData";
import ActivityLoader from "../components/ActivityLoader";
import { fileFromURL } from "../action";
import { uploadFile } from "../Class/upload";
import { updateUserData } from "../Class/update";
import { getUserInfo } from "../Class/member";
import AccountBalance from "./Vendor/account/AccountBalance";
import AccountHeader from "./Vendor/account/AccountHeader";
//import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const Profile = ({ navigation }) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = useSelector((state) => state.vendor);
  //const user=useSelector(state=>state.user)
  //console.log(user.user.id)
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
        name="EditVendorInfo"
        options={{
          header: (props) => (
            <SubHeader title="Personal Information" {...props} />
          ),
        }}
        component={EditVendorInfo}
      />
      <Stack.Screen
        name="VendorAccountBalance"
        options={{
          header: (props) => (
            <AccountHeader title="Personal Information" {...props} />
          ),
        }}
        component={AccountBalance}
      />
      <Stack.Screen
        name="EditService"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditService}
      />
      <Stack.Screen
        name="EditPackageService"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditPackageService}
      />
      <Stack.Screen
        name="EditPackageScreen"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={AddScreen}
      />
      <Stack.Screen
        name="EditSubscriptionService"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditSubscriptionService}
      />
      <Stack.Screen
        name="EditInstallmentService"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditInstallmentService}
      />
      <Stack.Screen
        name="EditServiceList"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditServiceList}
      />
      <Stack.Screen
        name="EditSubCategory"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditSubCategory}
      />
      <Stack.Screen
        name="EditSubCategory_1"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditSubCategory}
      />
      <Stack.Screen
        name="EditTableData"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditTableData}
      />
      <Stack.Screen
        name="VendorFixedService"
        options={{
          headerShown: false,
        }}
        component={VendorFixedService}
      />
      <Stack.Screen
        name="MemberAppointment"
        options={{
          header: (props) => (
            <SubHeader
              style={{
                paddingBottom: 0,
                marginBottom: -20,
              }}
              title="User Appointments"
              {...props}
            />
          ),
        }}
        component={MemberAppointment}
      />
      <Stack.Screen
        name="VendorPackageService"
        options={{
          headerShown: false,
        }}
        component={VendorPackageService}
      />
      <Stack.Screen
        name="VendorSubscriptionService"
        options={{
          headerShown: false,
        }}
        component={VendorSubscriptionService}
      />
      <Stack.Screen
        name="VendorInstallmentService"
        options={{
          headerShown: false,
        }}
        component={VendorInstallmentService}
      />
      <Stack.Screen
        name="ManageOrder"
        options={{
          headerShown: false,
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
        name="UserNotice"
        options={{
          headerShown: false,
        }}
        component={UserNotice}
      />
      <Stack.Screen
        name="AddNotice"
        options={{
          header: (props) => <SubHeader title="Add Notice" {...props} />,
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
          header: (props) => <SubHeader title="Add Expenses" {...props} />,
        }}
        component={AddExpenses}
      />
      <Stack.Screen
        name="ServiceSettings"
        options={{
          headerShown: false,
        }}
        component={ServiceSettings}
      />
      <Stack.Screen
        name="Review"
        options={{
          header: (props) => <SubHeader title="Review" {...props} />,
        }}
        component={Review}
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
        name="OrderDetails"
        component={OrderDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddServiceList_1"
        component={AddServiceList}
      />

      <Stack.Screen
        name="Vendor Calender"
        options={{
          headerShown: false,
        }}
        component={CompanyCalendar}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserProfile"
        component={UserProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OfflineProfile"
        component={OfflineProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddNote"
        component={AddNote}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ViewNote"
        component={ViewNote}
      />
      <Stack.Screen
        name="AccountBalance"
        options={{
          headerShown: false,
        }}
        component={AccountBalance}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Note"
        component={Note}
      />
      <Stack.Screen
        name="OnlineUserProfile"
        options={{
          headerShown: false,
        }}
        component={OnlineUserProfile}
      />
      <Stack.Screen
        name="Company Calender"
        options={{
          headerShown: false,
        }}
        component={CompanyCalendar}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddSubscription"
        component={AddSubscription}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddInstallment"
        component={AddInstallment}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubscriptionScript"
        component={SubscriptionScript}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="InstallmentScript"
        component={InstallmentScript}
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
  const [LogOut, setLogOut] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const textColor = colors.getTextColor();
  const [Orders, setOrders] = React.useState(null);
  const [Loader, setLoader] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const userOrders = useSelector((state) => state.userOrders);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    //console.log(vendorInfo)
    if (user && !Array.isArray(user)) {
      setLogOut(false);
      setImage(user.user.profilePhoto)
    }
    //console.log(user);
  }, [user]);
  React.useEffect(() => {
    setOrders(userOrders);
    
  }, [userOrders + Refresh]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      return result.assets[0]
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
  const updateProfilePicture=async(image)=>{
    let arr=[]
    arr.push(fileFromURL(image))
    const res=await uploadFile(arr,user.token)
    updateUserData(user.token,{
      profilePhotoUrl:res[0]
    }).then(res=>{
      //console.log(res.data)
      getUser(res.data.token)
      console.warn("Upload Successful")
    }).catch(err=>{
      console.error(err.response.data.msg)
    })
  }
  const getUser=async(token)=>{
    const res=await getUserInfo(user.token,user.user.id)
    storeJson("user",{
      token:token,
      user:res.data.user
    })
    dispatch({ type: "SET_USER", playload: {
      token:token,
      user:res.data.user
    } });
  }

  const styles = StyleSheet.create({
    backgroundContainer: {
      minHeight: 200,
    },
    container: {
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
      marginTop: -160,
      alignSelf: "center",
      backgroundColor: primaryColor,
      borderColor: textColor,
      borderRadius: 45,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
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
      top: 20,
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
      marginTop: 10,
      fontFamily: "Poppins-Medium",
      color: textColor,
    },
    text: {
      fontSize: 16,
      fontFamily: "Poppins-Medium",
      color: "#666666",
      marginTop: -10,
    },
    image: {
      width: 90,
      height: 90,
    },
  });
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <ActivityLoader/>
      </View>
    );
  }
  if (LogOut) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: textColor }}>Loading.....</Text>
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#F2F2F6" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              //setPageChange(true);
              onRefresh();
            }}
          />
        }>
        <StatusBar backgroundColor={primaryColor} />
        <View style={styles.container}>
          {/* <TouchableOpacity
            onPress={() => {
              storeJson("theme", !isDark);
              dispatch({ type: "SET_THEME", playload: !isDark });
            }}
            style={[styles.iconTop]}>
            <SvgXml xml={lightIcon} height="30" width="30" />
          </TouchableOpacity> */}
          {backgroundImage ? (
            <Image
              source={{ uri: backgroundImage }}
              style={styles.backgroundContainer}
            />
          ) : (
            <LinearGradient
              style={styles.backgroundContainer}
              colors={["#F2F2F6", "#F2F2F6", "#F2F2F6"]}></LinearGradient>
          )}

          <View
            
            style={styles.profile}>
            {image ? (
              <Image style={styles.image} source={{ uri: image }} />
            ) : (
              <FontAwesome name="user" size={80} color="#983C85" />
            )}
            
          </View>
          <Pressable onPress={() => {
              pickImage().then(res=>{
                updateProfilePicture(res)
              })
            }} style={{
              position:"absolute",
              right:"35.5%",
              top:88,
              zIndex:100,
              backgroundColor:"#F7F7F7",
              padding:4,
              borderRadius:15
            }}>
          <SvgXml  xml={editIcon} width="20" height={"20"}/>
          </Pressable>
          <View
            style={{
              alignSelf: "center",
            }}>
            <Text style={styles.headLine}>
               {user ? user.user.firstName + " " + user.user.lastName : "-"}
              <Text
                style={{
                  fontSize: 12,
                }}>
                {" "}
                (
                {user && user.user.gender
                  ? user.user.gender.toUpperCase()
                  : "N/A"}
                )
              </Text>
            </Text>
            <Text
              style={[
                styles.text,
                {
                  marginTop: -2,
                  color: "#6366F1",
                },
              ]}>
              @{user ? user.user.username : ""}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: primaryColor,
            paddingVertical: 10,
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius: 10,
            paddingLeft: 10,
          }}>
          <View
            style={{
              borderColor: "#F1EFEF",
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: textColor,
                fontFamily: "Poppins-Medium",
                marginBottom: 5,
              }}>
              Mobile
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#6366F1",
                fontFamily: "Poppins-Medium",
                marginBottom: 10,
              }}>
              {user && user.user.phone ? user.user.phone : "N/A"}
            </Text>
          </View>
          <View style={{ height: 10 }} />
          <View
            style={{
              borderColor: "#F1EFEF",
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: textColor,
                fontFamily: "Poppins-Medium",
                marginBottom: 5,
              }}>
              Email
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#6366F1",
                fontFamily: "Poppins-Medium",
                marginBottom: 10,
              }}>
              {user && user.user.email ? user.user.email : "N/A"}
            </Text>
          </View>
          <View style={{ height: 10 }} />
          <View
            style={{
              borderColor: "#F1EFEF",
              borderBottomWidth: 0,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: textColor,
                fontFamily: "Poppins-Medium",
                marginBottom: 5,
              }}>
              Address
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#6366F1",
                fontFamily: "Poppins-Medium",
                marginBottom: 5,
              }}>
              {user && user.user.address ? user.user.address : "N/A"}
            </Text>
          </View>
          <Pressable
            style={{
              position: "absolute",
              right: 10,
              bottom: 15,
            }}>
            <Text> Edit</Text>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: primaryColor,
            paddingVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            paddingLeft: 10,
          }}>
          <ProfileOption
            style={{
              paddingHorizontal: 0,
            }}
            badge={Orders ? Orders.length : false}
            onPress={() => {
              navigation.navigate("ManageOrder");
            }}
            Icon={() => (
              <View
                style={{
                  backgroundColor: "#379DF1",
                  width: 25,
                  height: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}>
                <SvgXml xml={orderIcon} height="15" width="15" />
              </View>
            )}
            title="Manage Order"
          />
          <ProfileOption
            style={{ paddingHorizontal: 0 }}
            onPress={() => {
              navigation.navigate("UserAppointmentList");
            }}
            Icon={() => (
              <View
                style={{
                  backgroundColor: "#7611D2",
                  width: 25,
                  height: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}>
                <SvgXml xml={calenderIcon} height="15" width="15" />
              </View>
            )}
            title="Appointment"
          />
          <ProfileOption
            style={{ paddingHorizontal: 0 }}
            onPress={() => {
              navigation.navigate("SaveList");
            }}
            Icon={() => (
              <View
                style={{
                  backgroundColor: "#E2E2E2",
                  width: 25,
                  height: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}>
                <SvgXml xml={loveIcon} height="15" width="15" />
              </View>
            )}
            title="Saved"
          />
          <ProfileOption
            action={true}
            style={{ paddingHorizontal: 0 }}
            onPress={() => {
              navigation.navigate("AccountBalance");
            }}
            Icon={() => (
              <View
                style={{
                  backgroundColor: "#E2E2E2",
                  width: 25,
                  height: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}>
                <SvgXml xml={accountIcon} height="15" width="15" />
              </View>
            )}
            title="Account Balance"
          />
        </View>
        <View style={{ height: 20 }} />
        <View
          style={{
            backgroundColor: primaryColor,
            paddingVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            paddingLeft: 10,
          }}>
          {vendorInfo && (
            <View
              style={{
                paddingHorizontal: 0,
                flexDirection: "row",
              }}>
              <View
                style={{
                  backgroundColor: "#12668F",
                  width: 25,
                  height: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}>
                <SvgXml xml={dashboardIcon} height="15" width="15" />
              </View>
              <View
                style={{
                  borderColor: "#F1EFEF",
                  borderBottomWidth: 0.5,
                  marginLeft: 10,
                  flex: 1,
                  paddingBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: "Poppins-SemiBold",
                    color: textColor,
                    fontSize: 16,
                  }}>
                  Login To Business Account
                </Text>
              </View>
            </View>
          )}
          {vendorInfo &&
            vendorInfo.map((doc, i) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DashboardList", { data: doc });
                }}
                key={i}
                style={{
                  paddingHorizontal: 0,
                  flexDirection: "row",
                  marginTop: 10,
                }}>
                <View
                  style={{
                    backgroundColor: "#12668F",
                    width: 25,
                    height: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{ uri: doc.image }}
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    borderColor: "#F1EFEF",
                    borderBottomWidth: 0.5,
                    marginLeft: 10,
                    flex: 1,
                    paddingBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      color: textColor,
                      fontSize: 16,
                    }}>
                    {doc.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Category");
            }}
            style={{
              flexDirection: "row",
              marginVertical: 10,
            }}>
            <AntDesign name="plus" size={20} color="#6366F1" />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#6366F1",
              }}>
              Add Account
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <View
          style={{
            backgroundColor: primaryColor,
            paddingVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            paddingLeft: 10,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setLogOut(true);
              logOut();
              logoutVendor();
              dispatch({ type: "SET_VENDOR", playload: false });
              dispatch({ type: "SET_USER", playload: [] });
              dispatch({ type: "SET_VENDOR_INFO", playload: false });
              navigation.navigate("Home");
            }}
            style={{
              paddingHorizontal: 0,
              flexDirection: "row",
            }}>
            <View
              style={{
                backgroundColor: "#C1D3F7",
                width: 25,
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}>
              <SvgXml xml={logoutIcon} height="15" width="15" />
            </View>
            <View
              style={{
                borderColor: "#F1EFEF",
                borderBottomWidth: 0.5,
                marginLeft: 10,
                flex: 1,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  fontSize: 16,
                }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Support");
            }}
            style={{
              paddingHorizontal: 0,
              flexDirection: "row",
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: "#F1EFEF",
                width: 25,
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}>
              <SvgXml xml={supportIcon} height="15" width="15" />
            </View>
            <View
              style={{
                borderColor: "#E2E2E2",
                borderBottomWidth: 0,
                marginLeft: 10,
                flex: 1,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  fontSize: 16,
                }}>
                Support
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
const lightIcon = `<svg id="_5262027" data-name="5262027" xmlns="http://www.w3.org/2000/svg" width="39.055" height="39.055" viewBox="0 0 39.055 39.055">
<g id="_f1f1f4ff" data-name="#f1f1f4ff">
  <path id="Path_20054" data-name="Path 20054" d="M18.505,0H19.53c0,1.779-.015,3.561.043,5.34-1.681.32-1.141,2.313-1.172,3.53-.052.711.68.982,1.169,1.288q-.032,1.03-.046,2.06a7.753,7.753,0,0,0-5.275,2.359,7.254,7.254,0,0,0-.674,9.074,7.663,7.663,0,0,0,5.953,3.188c.006.687.021,1.37.04,2.056-.406.3-1.04.458-1.135,1.031a13.4,13.4,0,0,0,.015,2.926c.153.5.708.662,1.1.931-.027,1.757,0,3.515-.024,5.272H18.6A19.639,19.639,0,0,1,0,20.534V18.743A19.621,19.621,0,0,1,18.505,0M12.311,7.417c-.793.662-.2,1.663.244,2.34.418.595.65,1.541,1.492,1.648a1.126,1.126,0,0,0,1.147-1.623A22.251,22.251,0,0,0,13.98,7.671a1.131,1.131,0,0,0-1.669-.253M7.75,12.049a1.154,1.154,0,0,0,.11,2.06,7.55,7.55,0,0,0,2.52,1.214,1.16,1.16,0,0,0,.3-2.224c-.934-.409-1.846-1.507-2.929-1.05M6.206,18.438a1.152,1.152,0,0,0,0,2.172,16.613,16.613,0,0,0,2.941.018,1.151,1.151,0,0,0,0-2.206,18.2,18.2,0,0,0-2.941.015m3.372,5.52a11.031,11.031,0,0,0-2.224,1.422A1.134,1.134,0,0,0,8.781,27.03a12.774,12.774,0,0,0,2.413-1.489c.818-1-.632-2.4-1.617-1.584m3.945,3.893a12.889,12.889,0,0,0-1.5,2.432A1.132,1.132,0,0,0,13.663,31.7,10.3,10.3,0,0,0,15.2,29.27,1.134,1.134,0,0,0,13.523,27.851Z" fill="#f1f1f4"/>
  <path id="Path_20055" data-name="Path 20055" d="M47.755,52.707a5,5,0,0,1,4.955-4.989c.546.088,1.089.2,1.629.317a7.474,7.474,0,0,0,0,9.3c-.54.116-1.083.232-1.629.317A5,5,0,0,1,47.755,52.707Z" transform="translate(-33.183 -33.158)" fill="#f1f1f4"/>
</g>
<g id="_e2dff4ff" data-name="#e2dff4ff" transform="translate(19.521)">
  <path id="Path_20056" data-name="Path 20056" d="M63.989,0H65.7A19.59,19.59,0,0,1,77.826,5.69,19.849,19.849,0,0,1,83.513,17.6v3.393A19.673,19.673,0,0,1,65.7,39.055H63.98c.024-1.757,0-3.515.024-5.272.415-.244.952-.421,1.117-.931a15.152,15.152,0,0,0,.012-2.929c-.1-.564-.69-.754-1.108-1.028-.018-.687-.034-1.37-.04-2.056a9.026,9.026,0,0,0,3.68-.97,8.277,8.277,0,0,0,4.607.891,7.461,7.461,0,0,0,5.1-3.32,7.286,7.286,0,0,0,.113-7.649,7.471,7.471,0,0,0-5.19-3.494,8.268,8.268,0,0,0-4.629.888,8.975,8.975,0,0,0-3.683-.967q.014-1.03.046-2.06c.5-.287,1.19-.6,1.132-1.3-.061-1.211.506-3.027-1.019-3.542-.027,0-.082.015-.11.021C63.974,3.561,63.989,1.779,63.989,0Z" transform="translate(-63.98)" fill="#e2dff4"/>
</g>
<g id="_616173ff" data-name="#616173ff" transform="translate(5.437 5.318)">
  <path id="Path_20057" data-name="Path 20057" d="M60.175,20.982c.031-1.217-.51-3.21,1.172-3.53.027-.006.082-.018.11-.021a25.384,25.384,0,0,0-.113,4.839C60.856,21.964,60.123,21.692,60.175,20.982Z" transform="translate(-47.21 -17.43)" fill="#616173"/>
  <path id="Path_20058" data-name="Path 20058" d="M39.466,23.714a1.131,1.131,0,0,1,1.669.253,22.252,22.252,0,0,1,1.214,2.111A1.126,1.126,0,0,1,41.2,27.7c-.842-.107-1.074-1.053-1.492-1.648C39.271,25.377,38.673,24.377,39.466,23.714Z" transform="translate(-32.591 -21.615)" fill="#616173"/>
  <path id="Path_20059" data-name="Path 20059" d="M24.069,39.24c1.083-.458,2,.641,2.929,1.05a1.16,1.16,0,0,1-.3,2.224,7.55,7.55,0,0,1-2.52-1.214A1.154,1.154,0,0,1,24.069,39.24Z" transform="translate(-21.756 -32.51)" fill="#616173"/>
  <path id="Path_20060" data-name="Path 20060" d="M42.243,42.4a7.753,7.753,0,0,1,5.275-2.359q0,1.172,0,2.343a4.966,4.966,0,0,0,0,9.931q0,1.176,0,2.346a7.663,7.663,0,0,1-5.953-3.188A7.254,7.254,0,0,1,42.243,42.4Z" transform="translate(-33.431 -33.141)" fill="#616173"/>
  <path id="Path_20061" data-name="Path 20061" d="M87.753,40.471l1.025-.171a7.471,7.471,0,0,1,5.19,3.494,7.286,7.286,0,0,1-.113,7.649,7.461,7.461,0,0,1-5.1,3.32l-1-.156C87.689,49.9,87.679,45.182,87.753,40.471Z" transform="translate(-66.379 -33.322)" fill="#616173"/>
  <path id="Path_20062" data-name="Path 20062" d="M18.588,60.277a18.2,18.2,0,0,1,2.941-.015,1.151,1.151,0,0,1,0,2.206,16.614,16.614,0,0,1-2.941-.018A1.152,1.152,0,0,1,18.588,60.277Z" transform="translate(-17.819 -47.157)" fill="#616173"/>
  <path id="Path_20063" data-name="Path 20063" d="M25.84,77.963c.986-.815,2.435.583,1.617,1.584a12.774,12.774,0,0,1-2.413,1.489,1.134,1.134,0,0,1-1.428-1.651A11.031,11.031,0,0,1,25.84,77.963Z" transform="translate(-21.7 -59.323)" fill="#616173"/>
  <path id="Path_20064" data-name="Path 20064" d="M40.607,90.756a1.134,1.134,0,0,1,1.675,1.419,10.3,10.3,0,0,1-1.535,2.435A1.132,1.132,0,0,1,39.1,93.187,12.889,12.889,0,0,1,40.607,90.756Z" transform="translate(-32.521 -68.223)" fill="#616173"/>
  <path id="Path_20065" data-name="Path 20065" d="M60.245,95.731c.095-.574.729-.735,1.135-1.031-.061,1.629-.052,3.259-.021,4.888-.391-.269-.946-.427-1.1-.931A13.4,13.4,0,0,1,60.245,95.731Z" transform="translate(-47.25 -71.124)" fill="#616173"/>
</g>
<g id="_454554ff" data-name="#454554ff" transform="translate(19.511 5.318)">
  <path id="Path_20066" data-name="Path 20066" d="M64.005,22.269a25.385,25.385,0,0,1,.113-4.839c1.526.516.958,2.331,1.019,3.542C65.2,21.668,64.509,21.982,64.005,22.269Z" transform="translate(-63.946 -17.43)" fill="#454554"/>
  <path id="Path_20067" data-name="Path 20067" d="M63.99,40.04a8.975,8.975,0,0,1,3.683.967,13.471,13.471,0,0,0-2.05,1.693c-.54-.119-1.083-.229-1.629-.317Q63.993,41.212,63.99,40.04Z" transform="translate(-63.977 -33.141)" fill="#454554"/>
  <path id="Path_20068" data-name="Path 20068" d="M63.99,79.547c.546-.085,1.089-.2,1.629-.317a13.173,13.173,0,0,0,2.053,1.693,9.025,9.025,0,0,1-3.68.97Q63.993,80.722,63.99,79.547Z" transform="translate(-63.977 -60.374)" fill="#454554"/>
  <path id="Path_20069" data-name="Path 20069" d="M64.027,94.7c.418.275,1.01.464,1.108,1.028a15.153,15.153,0,0,1-.012,2.929c-.165.51-.7.686-1.117.931C63.975,97.959,63.966,96.329,64.027,94.7Z" transform="translate(-63.971 -71.124)" fill="#454554"/>
</g>
<g id="_7a7a93ff" data-name="#7a7a93ff" transform="translate(19.534 12.242)">
  <path id="Path_20070" data-name="Path 20070" d="M67.694,41.064a8.268,8.268,0,0,1,4.629-.888l-1.025.171c-.073,4.711-.064,9.425,0,14.136l1,.156a8.276,8.276,0,0,1-4.607-.891,13.174,13.174,0,0,1-2.053-1.693,7.474,7.474,0,0,1,0-9.3A13.472,13.472,0,0,1,67.694,41.064Z" transform="translate(-64.021 -40.121)" fill="#7a7a93"/>
</g>
</svg>
`;
const orderIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14.613" height="15.728" viewBox="0 0 14.613 15.728">
<g id="_ffffffff" data-name="#ffffffff" transform="translate(0 0)">
  <path id="Path_20038" data-name="Path 20038" d="M39.8,30.136A3.93,3.93,0,0,1,44.392,33.3a6.892,6.892,0,0,1,.063,1.261c.757,0,1.514,0,2.271,0a1.136,1.136,0,0,1,1.1,1.1q.006,3.485,0,6.971a4.274,4.274,0,0,1-.139,1.487A2.539,2.539,0,0,1,45.356,45.8q-4.833,0-9.667,0a2.572,2.572,0,0,1-2.469-2.469q-.008-3.828,0-7.658a1.123,1.123,0,0,1,1.045-1.1c.775-.01,1.551,0,2.327,0a8.776,8.776,0,0,1,.032-1.06A3.931,3.931,0,0,1,39.8,30.136m-.569,1.372a2.811,2.811,0,0,0-1.444,1.847,5.073,5.073,0,0,0-.077,1.207q2.808,0,5.616,0a4.777,4.777,0,0,0-.092-1.266,2.806,2.806,0,0,0-4-1.788m-2.254,4.776a.555.555,0,0,0-.387.489,5.145,5.145,0,0,0,.173,1.771,3.932,3.932,0,0,0,7.657-.676,8.514,8.514,0,0,0,.02-1.038.558.558,0,0,0-1.114-.05,5.5,5.5,0,0,1-.086,1.263,2.806,2.806,0,0,1-5.525-.471c-.023-.282.007-.565-.019-.847A.56.56,0,0,0,36.981,36.284Z" transform="translate(-33.217 -30.071)" fill="#fff"/>
</g>
</svg>
`;
const calenderIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17.675" height="17.585" viewBox="0 0 17.675 17.585">
<path id="Path_20039" data-name="Path 20039" d="M11.395,7.07a.626.626,0,0,1,1.152.054,8.251,8.251,0,0,1,.032,1.184q2.658,0,5.317,0a8.342,8.342,0,0,1,.031-1.175.623.623,0,0,1,1.158-.044,7.359,7.359,0,0,1,.038,1.22c.736.017,1.473-.034,2.208.028a3.1,3.1,0,0,1,2.676,2.559,22.523,22.523,0,0,1,.026,3.07c0,2.452.011,4.9-.006,7.356A3.082,3.082,0,0,1,20.913,24.3q-5.677,0-11.356,0A3.1,3.1,0,0,1,6.44,21.036c.006-2.306,0-4.612,0-6.919,0-1.031-.1-2.065,0-3.094A3.083,3.083,0,0,1,8.394,8.527a9.274,9.274,0,0,1,2.958-.219,6.809,6.809,0,0,1,.043-1.238M8.21,10.155c-.627.591-.509,1.5-.5,2.28H22.771c.006-.779.118-1.691-.508-2.281-.813-.853-2.1-.457-3.137-.549a4.6,4.6,0,0,1-.072,1.267.617.617,0,0,1-1.111-.044A6.242,6.242,0,0,1,17.9,9.606q-2.658,0-5.317,0a6.141,6.141,0,0,1-.048,1.223.621.621,0,0,1-1.112.048A4.825,4.825,0,0,1,11.35,9.6c-1.04.094-2.327-.305-3.14.551m1.852,5.4a.816.816,0,1,0,1.046,1.014.822.822,0,0,0-1.046-1.014m3.225.018a.817.817,0,1,0,1.128.851.822.822,0,0,0-1.128-.851m3.237.014a.816.816,0,1,0,1.163.687.825.825,0,0,0-1.163-.687m3.354-.031a.816.816,0,1,0,1.048,1.017.821.821,0,0,0-1.048-1.017m-9.783,3.26a.816.816,0,1,0,1.023.991.821.821,0,0,0-1.023-.991m9.817,0a.816.816,0,1,0,1.026.986.82.82,0,0,0-1.026-.986m-6.76.1a.815.815,0,1,0,1.258.575.822.822,0,0,0-1.258-.575m3.338-.04a.815.815,0,1,0,1.194.624A.821.821,0,0,0,16.49,18.875Z" transform="translate(-6.401 -6.715)" fill="#fff"/>
</svg>
`;
const loveIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17.961" height="16.435" viewBox="0 0 17.961 16.435">
<g id="_000000ff" data-name="#000000ff" transform="translate(0 -5.388)">
  <path id="Path_20041" data-name="Path 20041" d="M0,10.322A5.186,5.186,0,0,1,4.214,5.439,6.117,6.117,0,0,1,9,7.179a7.7,7.7,0,0,1,3.1-1.671,4.578,4.578,0,0,1,4.214,1.2,5.585,5.585,0,0,1,1.652,3.6v.7a7.185,7.185,0,0,1-1.7,4,45.366,45.366,0,0,1-4.99,5.366,6.4,6.4,0,0,1-2.155,1.44c-.71.018-1.252-.543-1.793-.932a43.7,43.7,0,0,1-4.98-5.1A8.37,8.37,0,0,1,0,11.146Z" transform="translate(0 0)" fill="#da1e37"/>
</g>
</svg>
`;
const accountIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15.813" height="15.813" viewBox="0 0 15.813 15.813">
<g id="Group_10121" data-name="Group 10121" transform="translate(-39.812 -626.652)">
  <g id="_1936112" data-name="1936112" transform="translate(31.838 618.68)">
    <g id="_000000ff" data-name="#000000ff" transform="translate(7.974 7.972)">
      <path id="Path_20275" data-name="Path 20275" d="M8.349,8.368a1.281,1.281,0,0,1,.931-.375h6.06a1.277,1.277,0,0,1,1.3,1.241c0,.331,0,.661,0,.992a3.354,3.354,0,0,1,1.813-.695,3.318,3.318,0,0,1,3.531,3.558,1.325,1.325,0,0,1,.844.318,1.273,1.273,0,0,1,.44.928c0,.351,0,.7,0,1.053a1.413,1.413,0,0,1,.44.611,1.841,1.841,0,0,1,.07.665q0,2.008,0,4.017a2.2,2.2,0,0,1-.061.706,1.281,1.281,0,0,1-1.18.886c-1.966,0-3.932,0-5.9,0a1.629,1.629,0,0,1-.145.841,1.284,1.284,0,0,1-1.128.688q-2.934,0-5.868,0a2.2,2.2,0,0,1-.566-.04,1.282,1.282,0,0,1-.918-.9,2.4,2.4,0,0,1-.046-.656V9.3a1.278,1.278,0,0,1,.375-.931m.194.608a1.323,1.323,0,0,0-.058.546h7.649a1.593,1.593,0,0,0-.034-.478.763.763,0,0,0-.484-.5,1.4,1.4,0,0,0-.47-.042h-5.9a.767.767,0,0,0-.7.473m-.058,1.057q0,5.61,0,11.22h5.123a2.469,2.469,0,0,1-.024-.414q0-3.236,0-6.472a1.283,1.283,0,0,1,.892-1.214,3.331,3.331,0,0,1,.907-.06,3.318,3.318,0,0,1,.745-2.368c.017-.23,0-.461.007-.692H8.485m8.735.414a2.8,2.8,0,0,0-.189,4.65.213.213,0,0,0,.154.037c.415,0,.83,0,1.245,0,0-.181,0-.361,0-.542a1.139,1.139,0,0,1-.464-.27,1.035,1.035,0,0,1-.3-.717c.168,0,.337,0,.505,0a.577.577,0,0,0,.158.359.509.509,0,0,0,.856-.476.515.515,0,0,0-.5-.393,1.029,1.029,0,0,1-.887-.519,1.015,1.015,0,0,1,.065-1.1,1.084,1.084,0,0,1,.567-.389c0-.18,0-.361,0-.542h.509c0,.181,0,.361,0,.542a1.138,1.138,0,0,1,.464.269,1.041,1.041,0,0,1,.3.717c-.169,0-.337,0-.506,0a.589.589,0,0,0-.142-.343.505.505,0,0,0-.606-.111.511.511,0,0,0-.252.616.524.524,0,0,0,.515.35,1.022,1.022,0,0,1,.942.714,1.011,1.011,0,0,1-.193.957,1.108,1.108,0,0,1-.524.335c0,.18,0,.361,0,.542.415,0,.83,0,1.245,0,.045,0,.1.006.135-.024a2.8,2.8,0,0,0-3.1-4.663M14.145,14.1a.765.765,0,0,0,.175.809.779.779,0,0,0,.571.225c.468,0,.937,0,1.405,0a4.114,4.114,0,0,1-.395-.506c-.347-.01-.693,0-1.04,0q0-.254,0-.508c.255,0,.51,0,.765,0-.063-.166-.12-.336-.166-.507-.212,0-.424-.005-.635,0a.765.765,0,0,0-.68.494m7.766-.5a3.431,3.431,0,0,1-.836,1.53c.458,0,.915,0,1.373,0a2.759,2.759,0,0,1,.316.022c0-.295.011-.59-.005-.885a.781.781,0,0,0-.847-.668m-7.816,1.79q0,2.8,0,5.609a.767.767,0,0,0,.473.7,1.249,1.249,0,0,0,.515.059h7.43a.769.769,0,0,0,.759-.7c.01-.277,0-.554,0-.831-1.031,0-2.062,0-3.093,0a1.529,1.529,0,0,1-.31-3.018,2.823,2.823,0,0,1,.662-.04q1.37,0,2.741,0c0-.266,0-.533,0-.8a.766.766,0,0,0-.494-.68,1.437,1.437,0,0,0-.524-.05h-7.4a1.334,1.334,0,0,1-.764-.251m5.284,2.729a1.019,1.019,0,0,0,.586,1.57,2.039,2.039,0,0,0,.506.033c.935,0,1.87,0,2.8,0q0-1.019,0-2.038c-1.021,0-2.041,0-3.062,0a1.025,1.025,0,0,0-.835.437M8.485,21.765c0,.277-.006.554,0,.831a.768.768,0,0,0,.759.7h6.126a.768.768,0,0,0,.694-.451,1.267,1.267,0,0,0,.068-.568c-.447,0-.894,0-1.341,0a1.318,1.318,0,0,1-.953-.508Q11.163,21.766,8.485,21.765Z" transform="translate(-7.974 -7.993)"/>
      <path id="Path_20276" data-name="Path 20276" d="M407.979,7.975q.253,0,.508,0c0,.17,0,.339,0,.509h-.509Q407.976,8.229,407.979,7.975Z" transform="translate(-395.226 -7.973)"/>
      <path id="Path_20277" data-name="Path 20277" d="M391.975,23.983c.17,0,.34,0,.509,0q0,.254,0,.509c-.17,0-.34,0-.509,0C391.972,24.322,391.972,24.152,391.975,23.983Z" transform="translate(-379.732 -23.471)"/>
      <path id="Path_20278" data-name="Path 20278" d="M423.98,23.979q.255,0,.509,0,0,.254,0,.508c-.17,0-.339,0-.509,0Q423.981,24.233,423.98,23.979Z" transform="translate(-410.719 -23.467)"/>
      <path id="Path_20279" data-name="Path 20279" d="M407.978,39.98h.509c0,.17,0,.34,0,.509q-.254,0-.508,0Q407.975,40.235,407.978,39.98Z" transform="translate(-395.225 -38.96)"/>
      <path id="Path_20280" data-name="Path 20280" d="M471.979,87.975q.253,0,.508,0c0,.17,0,.34,0,.509h-.509Q471.976,88.229,471.979,87.975Z" transform="translate(-457.186 -85.422)"/>
      <path id="Path_20281" data-name="Path 20281" d="M199.992,103.988h.509q0,.255,0,.51h-.509C199.991,104.328,199.991,104.158,199.992,103.988Z" transform="translate(-193.87 -100.927)"/>
      <path id="Path_20282" data-name="Path 20282" d="M455.975,103.979q.254,0,.509,0,0,.254,0,.509c-.17,0-.34,0-.509,0C455.972,104.318,455.972,104.148,455.975,103.979Z" transform="translate(-441.691 -100.917)"/>
      <path id="Path_20283" data-name="Path 20283" d="M487.98,103.978q.255,0,.509,0c0,.169,0,.339,0,.508-.17,0-.339,0-.509,0Q487.981,104.232,487.98,103.978Z" transform="translate(-472.679 -100.916)"/>
      <path id="Path_20284" data-name="Path 20284" d="M183.988,119.992h.51q0,.254,0,.509h-.51Q183.987,120.246,183.988,119.992Z" transform="translate(-178.377 -116.42)"/>
      <path id="Path_20285" data-name="Path 20285" d="M215.99,119.992h.51q0,.255,0,.509h-.51Q215.99,120.246,215.99,119.992Z" transform="translate(-209.359 -116.42)"/>
      <path id="Path_20286" data-name="Path 20286" d="M471.979,119.98h.509c0,.17,0,.34,0,.509q-.254,0-.508,0Q471.975,120.235,471.979,119.98Z" transform="translate(-457.186 -116.409)"/>
      <path id="Path_20287" data-name="Path 20287" d="M199.992,135.99h.509q0,.255,0,.51h-.509C199.991,136.33,199.991,136.16,199.992,135.99Z" transform="translate(-193.87 -131.909)"/>
      <path id="Path_20288" data-name="Path 20288" d="M271.988,151.988h.509q0,.255,0,.509h-.509Q271.987,152.243,271.988,151.988Z" transform="translate(-263.571 -147.397)"/>
      <path id="Path_20289" data-name="Path 20289" d="M399.988,151.988h.509q0,.255,0,.509h-.509Q399.987,152.243,399.988,151.988Z" transform="translate(-387.491 -147.397)"/>
      <path id="Path_20290" data-name="Path 20290" d="M375.975,335.975q.253,0,.507,0,0,.253,0,.507-.254,0-.507,0Q375.97,336.228,375.975,335.975Z" transform="translate(-364.242 -325.517)"/>
      <path id="Path_20291" data-name="Path 20291" d="M119.987,456h1.529q0,.254,0,.509-.765,0-1.529,0C119.986,456.337,119.986,456.168,119.987,456Z" transform="translate(-116.415 -441.716)"/>
    </g>
    <g id="_aab2bdff" data-name="#aab2bdff" transform="translate(8.483 8.483)">
      <path id="Path_20292" data-name="Path 20292" d="M24.016,24.445a.767.767,0,0,1,.7-.473h5.9a1.4,1.4,0,0,1,.47.042.763.763,0,0,1,.484.5,1.593,1.593,0,0,1,.034.478H23.958A1.323,1.323,0,0,1,24.016,24.445Z" transform="translate(-23.956 -23.971)" fill="#aab2bd"/>
      <path id="Path_20293" data-name="Path 20293" d="M23.973,439.991q2.678,0,5.355,0a1.318,1.318,0,0,0,.953.508c.447.006.894,0,1.341,0a1.267,1.267,0,0,1-.068.568.768.768,0,0,1-.694.451H24.734a.768.768,0,0,1-.759-.7c-.009-.277,0-.554,0-.831m3.06.51c0,.17,0,.339,0,.509h1.529q0-.254,0-.509Z" transform="translate(-23.971 -426.728)" fill="#aab2bd"/>
    </g>
    <g id="_69d6f4ff" data-name="#69d6f4ff" transform="translate(8.484 10.013)">
      <path id="Path_20294" data-name="Path 20294" d="M24,72h7.65c0,.23.011.462-.007.692a3.318,3.318,0,0,0-.745,2.368,3.332,3.332,0,0,0-.907.06,1.283,1.283,0,0,0-.892,1.214q0,3.236,0,6.472a2.468,2.468,0,0,0,.024.414H24q0-5.61,0-11.22m5.61,1.02c0,.17,0,.34,0,.51H29.1q0,.255,0,.509h.51c0,.17,0,.34,0,.51h.509q0-.255,0-.51h.51q0-.255,0-.509h-.51q0-.255,0-.51Z" transform="translate(-23.995 -71.995)" fill="#69d6f4"/>
      <path id="Path_20295" data-name="Path 20295" d="M200,120h.509q0,.254,0,.509H200Q200,120.257,200,120Z" transform="translate(-194.392 -118.472)" fill="#69d6f4"/>
    </g>
    <g id="_fcd770ff" data-name="#fcd770ff" transform="translate(15.881 10.014)">
      <path id="Path_20296" data-name="Path 20296" d="M257.354,72.414a2.8,2.8,0,0,1,3.1,4.663c-.038.03-.09.02-.135.024-.415,0-.83,0-1.245,0,0-.181,0-.361,0-.542a1.108,1.108,0,0,0,.524-.335,1.011,1.011,0,0,0,.193-.957,1.022,1.022,0,0,0-.942-.714.524.524,0,0,1-.514-.35.511.511,0,0,1,.252-.616.505.505,0,0,1,.606.111.589.589,0,0,1,.142.343c.168,0,.337,0,.506,0a1.041,1.041,0,0,0-.3-.717,1.138,1.138,0,0,0-.464-.269c0-.18,0-.361,0-.542h-.509c0,.18,0,.361,0,.542a1.084,1.084,0,0,0-.567.389,1.015,1.015,0,0,0-.065,1.1,1.028,1.028,0,0,0,.887.519.515.515,0,0,1,.5.393.509.509,0,0,1-.856.476.577.577,0,0,1-.158-.359c-.169,0-.337,0-.505,0a1.035,1.035,0,0,0,.3.717,1.139,1.139,0,0,0,.464.27c0,.18,0,.361,0,.542-.415,0-.83,0-1.245,0a.213.213,0,0,1-.154-.037,2.8,2.8,0,0,1,.189-4.65m-.829,2.136q0,.255,0,.509h.509q0-.255,0-.509h-.509m4.08,0q0,.255,0,.509h.509q0-.255,0-.509Z" transform="translate(-256.015 -71.999)" fill="#fcd770"/>
    </g>
    <g id="_8cc152ff" data-name="#8cc152ff" transform="translate(14.095 13.579)">
      <path id="Path_20297" data-name="Path 20297" d="M200.06,184.465a.765.765,0,0,1,.68-.494c.211-.005.423,0,.635,0,.047.172.1.341.166.507-.255,0-.51,0-.765,0q0,.254,0,.508c.346.005.693-.005,1.04,0a4.113,4.113,0,0,0,.395.506c-.469,0-.937,0-1.405,0a.779.779,0,0,1-.571-.225A.765.765,0,0,1,200.06,184.465Z" transform="translate(-200.01 -183.964)" fill="#8cc152"/>
      <path id="Path_20298" data-name="Path 20298" d="M419.786,183.847a.781.781,0,0,1,.847.668c.017.295.006.59.005.885a2.758,2.758,0,0,0-.316-.022c-.458,0-.915,0-1.373,0A3.43,3.43,0,0,0,419.786,183.847Z" transform="translate(-411.971 -183.843)" fill="#8cc152"/>
      <path id="Path_20299" data-name="Path 20299" d="M360.192,312.431a1.025,1.025,0,0,1,.835-.437c1.02,0,2.041,0,3.062,0q0,1.019,0,2.038c-.935,0-1.87,0-2.8,0a2.035,2.035,0,0,1-.506-.033,1.019,1.019,0,0,1-.586-1.57m.328.329q0,.253,0,.507.253,0,.507,0,0-.254,0-.507Q360.774,312.755,360.52,312.759Z" transform="translate(-354.909 -307.908)" fill="#8cc152"/>
    </g>
    <g id="_b4dd7fff" data-name="#b4dd7fff" transform="translate(14.095 15.373)">
      <path id="Path_20300" data-name="Path 20300" d="M200,240.12a1.334,1.334,0,0,0,.764.251h7.4a1.437,1.437,0,0,1,.524.05.765.765,0,0,1,.494.68c0,.267,0,.533,0,.8q-1.37,0-2.741,0a2.824,2.824,0,0,0-.662.04,1.529,1.529,0,0,0,.31,3.018c1.031,0,2.063,0,3.093,0,0,.277.006.554,0,.831a.769.769,0,0,1-.759.7h-7.43a1.25,1.25,0,0,1-.515-.059.767.767,0,0,1-.473-.7Q200,242.925,200,240.12Z" transform="translate(-199.996 -240.12)" fill="#b4dd7f"/>
    </g>
  </g>
  <ellipse id="Ellipse_2163" data-name="Ellipse 2163" cx="2.5" cy="2" rx="2.5" ry="2" transform="translate(48 629)" fill="#fcd770"/>
  <g id="Rectangle_7431" data-name="Rectangle 7431" transform="translate(49 632.7)" fill="#fcd770" stroke="#fcd770" stroke-width="1">
    <rect width="3" height="1.1" stroke="none"/>
    <rect x="0.5" y="0.5" width="2" height="0.1" fill="none"/>
  </g>
  <text id="_" data-name="৳" transform="translate(49.5 633)" stroke="#000" stroke-width="0.2" font-size="4"  font-weight="500"><tspan x="0" y="0">৳</tspan></text>
</g>
</svg>
`;
const dashboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="15.173" height="17.419" viewBox="0 0 15.173 17.419">
<g id="_000000ff" data-name="#000000ff" transform="translate(-46.542 -15.526)">
  <path id="Path_20045" data-name="Path 20045" d="M127.77,15.527h7.571a1.124,1.124,0,0,1,1.139,1.142q0,7.387,0,14.774a2.136,2.136,0,0,1-.073.776,1.128,1.128,0,0,1-1.066.727h-10.1a1.124,1.124,0,0,1-1.119-1.137q0-1.612,0-3.225a4.456,4.456,0,0,0,2.741-.153,4.491,4.491,0,0,0-2.741-8.54c0-.237,0-.475,0-.712.662,0,1.324,0,1.986,0a1.686,1.686,0,0,0,1.665-1.677c0-.658,0-1.315,0-1.973m2.115,1.157a.281.281,0,0,0-.117.375.291.291,0,0,0,.282.153h4.784a2.685,2.685,0,0,0,.291-.006.281.281,0,0,0,.227-.322.287.287,0,0,0-.3-.234q-2.481,0-4.963,0a.41.41,0,0,0-.2.035m0,1.123a.282.282,0,0,0-.129.353.289.289,0,0,0,.3.176h5a.285.285,0,0,0,.3-.218.28.28,0,0,0-.261-.34c-1.666,0-3.332,0-5,0a.419.419,0,0,0-.2.033m0,1.125a.282.282,0,0,0-.127.35.292.292,0,0,0,.3.178h5a.288.288,0,0,0,.3-.222.284.284,0,0,0-.3-.34q-2.481,0-4.963,0a.413.413,0,0,0-.2.035m.031,1.109a.282.282,0,0,0-.159.363.289.289,0,0,0,.3.179h2.463a.288.288,0,0,0,.306-.225.28.28,0,0,0-.27-.334c-.82,0-1.641,0-2.461,0a.519.519,0,0,0-.174.02m3.193,5.6q0,3.091,0,6.181h1.685q0-3.09,0-6.181h-1.686m-2.81,1.686q0,2.247,0,4.494h1.686q0-2.247,0-4.495-.843,0-1.686,0m-2.809,1.684q0,1.4,0,2.81.843,0,1.686,0,0-1.4,0-2.81Z" transform="translate(-74.766)" fill="#fff"/>
  <path id="Path_20046" data-name="Path 20046" d="M124.12,18.64l3.09-3.09q0,.969,0,1.938a1.158,1.158,0,0,1-.124.54,1.126,1.126,0,0,1-.975.611C125.447,18.642,124.784,18.639,124.12,18.64Z" transform="translate(-74.768 -0.023)" fill="#fff"/>
  <path id="Path_20047" data-name="Path 20047" d="M47.324,149.35a3.952,3.952,0,0,1,2.871-1.57c0,1.308,0,2.615,0,3.923-.005.131.1.217.188.3l2.666,2.666a3.93,3.93,0,0,1-5.726-5.319Z" transform="translate(0 -127.464)" fill="#fff"/>
  <path id="Path_20048" data-name="Path 20048" d="M162.906,147.78a3.93,3.93,0,0,1,3.638,3.639h-3.638Q162.9,149.6,162.906,147.78Z" transform="translate(-112.148 -127.464)" fill="#fff"/>
  <path id="Path_20049" data-name="Path 20049" d="M173.87,263.733h3.241a3.934,3.934,0,0,1-.949,2.293Q175.016,264.88,173.87,263.733Z" transform="translate(-122.716 -239.217)" fill="#fff"/>
</g>
</svg>
`;
const logoutIcon = `<svg id="_000000ff" data-name="#000000ff" xmlns="http://www.w3.org/2000/svg" width="15.719" height="19.219" viewBox="0 0 15.719 19.219">
<path id="Path_20053" data-name="Path 20053" d="M71.772,21.39a4.627,4.627,0,0,0-1.226-.086H66.658a2.516,2.516,0,0,0-1.618.583,2.55,2.55,0,0,0-.895,1.58,4.127,4.127,0,0,0-.027.648v13.43a5.476,5.476,0,0,0,.032.84,2.552,2.552,0,0,0,.937,1.59,2.523,2.523,0,0,0,1.569.545h3.81a6.219,6.219,0,0,0,1.165-.053,2.621,2.621,0,0,0,2.1-2.6q0-3.043,0-6.086c1.044,0,2.089,0,3.134,0l-1.018.981a1.464,1.464,0,0,0-.358.423.877.877,0,0,0,.136.958.886.886,0,0,0,.975.233,1.046,1.046,0,0,0,.383-.275c.875-.882,1.756-1.76,2.632-2.643a.61.61,0,0,0,.17-.694c-.039-.1-.011-.209-.069-.3a2,2,0,0,0-.345-.393l-2.495-2.5a.876.876,0,0,0-1.259,1.22c.414.417.834.827,1.249,1.243q-1.567,0-3.134,0,0-2.82,0-5.639a4.529,4.529,0,0,0-.066-1.063,2.635,2.635,0,0,0-1.889-1.948m1.955,8.649c0,.582,0,1.164,0,1.747q-2.185,0-4.369,0a.873.873,0,1,1,0-1.745Q71.544,30.037,73.727,30.039Z" transform="translate(-64.118 -21.303)" fill="#333"/>
</svg>
`;
const supportIcon = `<svg id="_000000ff" data-name="#000000ff" xmlns="http://www.w3.org/2000/svg" width="16.368" height="16.368" viewBox="0 0 16.368 16.368">
<path id="Path_20071" data-name="Path 20071" d="M5.639,0H5.96a5.766,5.766,0,0,1,5.069,3.453.323.323,0,0,1-.115.4.522.522,0,0,1-.3.054,6.676,6.676,0,0,0-3.062.739A6.764,6.764,0,0,0,4.946,7.021a6.677,6.677,0,0,0-1.031,4.008.5.5,0,0,1-.053.346.347.347,0,0,1-.311.134c-.684,0-1.368,0-2.052,0a.986.986,0,0,1-.939-.82A.957.957,0,0,1,.966,9.76a1.038,1.038,0,0,1,.5-.172A5.77,5.77,0,0,1,0,5.9V5.548A6.02,6.02,0,0,1,.267,4.034a5.824,5.824,0,0,1,2.172-2.97A5.743,5.743,0,0,1,5.639,0Z" fill="#fff"/>
<path id="Path_20072" data-name="Path 20072" d="M154.479,153.072a5.756,5.756,0,0,1,9.06,4.593v.262a5.779,5.779,0,0,1-1.464,3.687.985.985,0,0,1,.767.451.963.963,0,0,1-.083,1.134,1,1,0,0,1-.647.336H157.17a.51.51,0,0,0-.248-.067,5.752,5.752,0,0,1-2.443-10.4m.574,4.094a.639.639,0,1,0,.593.132.641.641,0,0,0-.593-.132m2.557,0a.639.639,0,1,0,.609.145.641.641,0,0,0-.609-.145m2.558,0a.639.639,0,1,0,.594.133A.642.642,0,0,0,160.168,157.166Z" transform="translate(-147.171 -147.168)" fill="#fff"/>
</svg>
`;
const editIcon=`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18">
  <g id="Group_17885" data-name="Group 17885" transform="translate(-1.5 -3)">
    <path id="Path_28063" data-name="Path 28063" d="M6.827,6.175A2.31,2.31,0,0,1,5.186,7.23c-.38.054-.757.112-1.134.175a2.179,2.179,0,0,0-1.8,2.169V18A2.25,2.25,0,0,0,4.5,20.25h15A2.25,2.25,0,0,0,21.75,18V9.574a2.18,2.18,0,0,0-1.8-2.169q-.566-.094-1.134-.175a2.31,2.31,0,0,1-1.64-1.055l-.822-1.316A2.192,2.192,0,0,0,14.616,3.82a48.774,48.774,0,0,0-5.232,0A2.192,2.192,0,0,0,7.648,4.859L6.827,6.175Z" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_28064" data-name="Path 28064" d="M16.5,12.75A4.5,4.5,0,1,1,12,8.25a4.5,4.5,0,0,1,4.5,4.5Zm2.25-2.25h.008v.008H18.75Z" fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>
`