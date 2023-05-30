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
import Notice, { AddNotice, ViewCart } from "./Vendor/Notice";
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
import UserProfile, { MemberOrderList } from "./UserProfile";
import OfflineProfile from "./OfflineProfile";
import Note, { AddNote, ViewNote } from "./Vendor/Note";
import AddPackage from "./services/AddPackage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
import EditPackageService, { AddScreen } from "./Profile/EditPackageService";
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
import AllTransactions from "./Vendor/account/AllTransactions";
import { AllWithdraws } from "./Vendor/account/AllWithdraws";
import ReviewScreen from "./Vendor/review/ReviewScreen";
import AllReviewHeader from "../components/AllReviewHeader";
import FeedBack from "./Vendor/review/FeedBack";
import RequestVerification from "./Vendor/account/RequestVerification";
import FirstStepVerification from "./Vendor/account/FirstStepVerification";
import SecondStepVerification from "./Vendor/account/SecondStepVerification";
import ThirdStepVerification from "./Vendor/account/ThirdStepVerification";
import ReviewVerification from "./Vendor/account/ReviewVerification";
import ConfirmationScreen from "./Vendor/account/ConfirmationScreen";
import SearchOrder from "./SearchOrder";
import WebViews from "./WebViews";
import Avatar from "../components/Profile/Avatar";
import SquireCart from "../components/Profile/SquireCart";
import FlatCart from "../components/Profile/FlatCart";
import Location from "./UserProfile/Location";
import EditLocation from "./UserProfile/EditLocation";
import Email from "./UserProfile/Email";
import EditEmail from "./UserProfile/EditEmail";
import Mobile from "./UserProfile/Mobile";
import EditMobile from "./UserProfile/EditMobile";
import UserAppointmentList from "./Seller/UserAppointment/UserAppointmentList";
import ImportantNotice from "./Seller/OrderScript/ImportantNotice";
import CancelOrderConfirmation from "./Seller/OrderScript/CancelOrderConfirmation";
import AmarPay from "./Seller/OrderScript/AmarPay";
import PaymentStatus from "./Seller/OrderScript/PaymentStatus";
import ClintFeedBack from "./Seller/OrderScript/ClintFeedBack";
import FeedBackMessage from "./Seller/OrderScript/FeedBackMessage";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import SupportCenter from "./support/SupportCenter";
import SupportDescription from "./support/SupportDescription";
import SupportForm from "./support/SupportForm";
import VendorAddress from "./Vendor/VendorAddress";
import Service from "./Seller/Service";
import ServiceOrder from "./order/ServiceOrder";
import ChooseDateOrder from "./order/ChooseDateOrder";
import InstructionOrder from "./order/InstructionOrder";
import CommonHeader from "./create_dashboard/CommonHeader";
import EditStakeHolder from "./Profile/EditStakeHolder";
import EditYourInformation from "./Profile/EditYourInformation";
import EditBusinessTitle from "./Profile/EditBusinessTitle";
import EditVendorAddress from "./Vendor/EditVendorAddress";
import FakeVendorProfile from "./Vendor/FakeVendorProfile";
import EditServicePrice from "./Profile/EditServicePrice";
import EditAbout from "./Profile/EditAbout";
import ExtraFacilities from "./create_dashboard/ExtraFacilities";
import ProfileKeyWord from "./create_dashboard/ProfileKeyWord";
import EditKeywords from "./Profile/EditKeywords";
import EditExtraFacilities from "./Profile/EditExtraFacilities";
import EditServiceCategory from "./Profile/EditServiceCategory";
import EditSkills from "./Profile/EditSkills";
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
        name="Service"
        options={{
          headerShown: false,
          // : (props) => <SubHeader title="Service" {...props} />
        }}
        component={Service}
      />
      <Stack.Screen
        name="VendorProfile"
        options={{
          headerShown: false,
        }}
        component={VendorProfile}
      />
       <Stack.Screen
        name="FakeVendorProfile"
        options={{
          headerShown: false,
        }}
        component={FakeVendorProfile}
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
          // header: (props) => (
          //   <AccountHeader title="Account Balance" {...props} />
          // ),
          headerShown: false,
        }}
        component={AccountBalance}
      />
      <Stack.Screen
        name="AllTransactions"
        options={{
          // header: (props) => (
          //   <AccountHeader title="All transaction" {...props} />
          // ),
          headerShown: false,
        }}
        component={AllTransactions}
      />
      <Stack.Screen
        name="CustomerReview"
        options={{
          headerShown: false,
        }}
        component={ReviewScreen}
      />
      <Stack.Screen
        name="FeedBack"
        options={{
          header: (props) => (
            <AllReviewHeader title="Client feedback" {...props} />
          ),
        }}
        component={FeedBack}
      />
      <Stack.Screen
        name="AllWithdraws"
        options={{
          // header: (props) => (
          //   <AccountHeader title="All withdraw" {...props} />
          // ),
          headerShown: false,
        }}
        component={AllWithdraws}
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
        name="EditServicePrice"
        options={{
          header: (props) => (
            <SubHeader title="Service Information" {...props} />
          ),
        }}
        component={EditServicePrice}
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
          // header: (props) => (
          //   <SubHeader
          //     style={{
          //       paddingBottom: 0,
          //       marginBottom: -20,
          //     }}
          //     title="User Appointments"
          //     {...props}
          //   />
          // ),
          headerShown: false,
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
        name="MemberOrderList"
        options={{
          headerShown: false,
        }}
        component={MemberOrderList}
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
        name="SearchOrder"
        options={{
          headerShown: false,
        }}
        component={SearchOrder}
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
          headerShown: false,
        }}
        component={SupportCenter}
      />
      <Stack.Screen
        name="SupportDescription"
        options={{
          headerShown: false,
        }}
        component={SupportDescription}
      />
      <Stack.Screen
        name="SupportForm"
        options={{
          headerShown: false,
        }}
        component={SupportForm}
      />
      <Stack.Screen
        name="ImageViewer"
        options={{
          header: (props) => <SubHeader title="Contact Form" {...props} />,
        }}
        component={ImageViewer}
      />
      {!vendor && (
        <Stack.Screen
          name="DashboardList"
          options={{
            headerShown: false,
          }}
          component={DashboardList}
        />
      )}
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
        options={{
          header: (props) => (
            <SubHeader {...props} title={"Important Notice"} />
          ),
        }}
        name="ImportantNotice"
        component={ImportantNotice}
      />
      <Stack.Screen
        options={{
          header: (props) => <SubHeader {...props} title={"Payment status"} />,
        }}
        name="PaymentStatus"
        component={PaymentStatus}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AmarPay"
        component={AmarPay}
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
        options={{
          header: (props) => <SubHeader title={"Select Service"} {...props} />,
        }}
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
        name="WebViews"
        component={WebViews}
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
        name="RequestVerification"
        options={{
          headerShown: false,
          //header:(props)=><AllReviewHeader {...props} title="Account verification" />,
        }}
        component={RequestVerification}
      />
      <Stack.Screen
        name="FirstStepVerification"
        options={{
          headerShown: false,
          //header:(props)=><AllReviewHeader {...props} title="Account verification" />,
        }}
        component={FirstStepVerification}
      />
      <Stack.Screen
        name="SecondStepVerification"
        options={{
          headerShown: false,
          //header:(props)=><AllReviewHeader {...props} title="Account verification" />,
        }}
        component={SecondStepVerification}
      />
      <Stack.Screen
        name="ThirdStepVerification"
        options={{
          headerShown: false,
          // header:(props)=><AllReviewHeader {...props} title="Account verification" />,
        }}
        component={ThirdStepVerification}
      />
      <Stack.Screen
        name="ReviewVerification"
        options={{
          headerShown: false,
          //header:(props)=><AllReviewHeader {...props} title="Account verification" />,
        }}
        component={ReviewVerification}
      />
      <Stack.Screen
        name="ConfirmationScreen"
        options={{
          headerShown: false,
        }}
        component={ConfirmationScreen}
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
          header:props=><SubHeader {...props} title={"Working Time"}/>,
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
      <Stack.Screen
        options={{
          header: (props) => <SubHeader title={"Location"} {...props} />,
        }}
        name="UserLocation"
        component={Location}
      />
      <Stack.Screen
        options={{
          header: (props) => <SubHeader title="Location" {...props} />,
        }}
        name="EditLocation"
        component={EditLocation}
      />
      <Stack.Screen
        options={{ header: (props) => <SubHeader title="Email" {...props} /> }}
        name="Email"
        component={Email}
      />
      <Stack.Screen
        options={{ header: (props) => <SubHeader title="Email" {...props} /> }}
        name="EditEmail"
        component={EditEmail}
      />
      <Stack.Screen
        options={{
          header: (props) => <SubHeader title={"Mobile"} {...props} />,
        }}
        name="Mobile"
        component={Mobile}
      />
      <Stack.Screen
        options={{
          header: (props) => <SubHeader title={"Feedback"} {...props} />,
        }}
        name="ClintFeedBack"
        component={ClintFeedBack}
      />
      <Stack.Screen
        options={{
          header: (props) => <SubHeader title={"Clint feedback"} {...props} />,
        }}
        name="FeedBackMessage"
        component={FeedBackMessage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditMobile"
        component={EditMobile}
      />
      <Stack.Screen
        options={{
          header: (props) => <SubHeader {...props} title="Location" />,
        }}
        name="VendorAddress"
        component={VendorAddress}
      />
      <Stack.Screen
        options={{
          header: (props) => <SubHeader {...props} title="Location" />,
        }}
        name="EditVendorAddress"
        component={EditVendorAddress}
      />
      <Stack.Screen
        options={{
          // header: (props) => (
          //   <AppointmentHeader title={"Appointment"} {...props} />
          // ),
          headerShown: false,
        }}
        name="UserAppointmentList"
        component={UserAppointmentList}
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
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Business Title"} />,
        }}
        name="EditBusinessTitle"
        component={EditBusinessTitle}
      />
       <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Your Information"} />,
        }}
        name="EditYourInformation"
        component={EditYourInformation}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Stakeholder"} />,
        }}
        name="EditStakeHolder"
        component={EditStakeHolder}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Profile Keywords"} />,
        }}
        name="EditKeywords"
        component={EditKeywords}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Extra Facilities"} />,
        }}
        name="EditExtraFacilities"
        component={EditExtraFacilities}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Service Category"} />,
        }}
        name="EditServiceCategory"
        component={EditServiceCategory}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"Skills"} />,
        }}
        name="EditSkills"
        component={EditSkills}
      />
      <Stack.Screen
        options={{
          header: (props) => <CommonHeader {...props} title={"About"} />,
        }}
        name="EditAbout"
        component={EditAbout}
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
    if(user?.token){
      getUser(user?.token)
    }
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    //console.log(vendorInfo)
    if (user && !Array.isArray(user)) {
      setLogOut(false);
      setImage(user.user.profilePhoto);
    }
    //console.log(user);
  }, [user]);
  React.useEffect(() => {
    setOrders(userOrders);
    // console.log("ds")
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
      return result.assets[0];
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
  const updateProfilePicture = async (image) => {
    let arr = [];
    arr.push(fileFromURL(image));
    const res = await uploadFile(arr, user.token);
    updateUserData(user.token, {
      profilePhotoUrl: res[0],
    })
      .then((res) => {
        //console.log(res.data)
        getUser(res.data.token);
        console.warn("Upload Successful");
      })
      .catch((err) => {
        console.error(err.response.data.msg);
      });
  };
  const getUser = async (token) => {
    const res = await getUserInfo(user.token, user.user.id);
    storeJson("user", {
      token: token,
      user: res.data.user,
    });
    dispatch({
      type: "SET_USER",
      playload: {
        token: token,
        user: res.data.user,
      },
    });
  };
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const vendor = useSelector((state) => state.vendor);

  React.useEffect(() => {
    if (isFocused) {
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 50);
    } else {
      // dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);

  const styles = StyleSheet.create({
    backgroundContainer: {
      minHeight: 200,
    },
    container: {
      alignItems: "center",
      paddingHorizontal: 20,
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
      fontSize: 32,
      marginTop: 20,
      fontWeight: "500",
      flex: 1,
    },
    text: {
      fontSize: 20,
      fontWeight: "400",
      color: "#1A1A1A",
      marginTop: 4,
    },
    image: {
      width: 90,
      height: 90,
    },
    subContainer: {
      paddingVertical: 16,
      paddingHorizontal: 12,
      backgroundColor: "white",
      borderRadius: 12,
      marginTop: 20,
      paddingRight: 0,
    },
  });
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  //console.log(user)
  // if(vendor){
  //   return <Menu navigation={navigation}/>
  // }
  if (!user || Array.isArray(user)) {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View style={{ height: inset?.top, backgroundColor: "#F2F2F6" }} />
        <StatusBar backgroundColor={"#F2F2F6"} />
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
          <View style={styles.container}>
            <Avatar containerStyle={{ marginTop: 12 }} edit={false} />
            <Text
              numberOfLines={1}
              style={[styles.headLine, { marginTop: 28 }]}>
              Viewing as a guest
            </Text>

            <View style={[styles.subContainer, { marginTop: 28 }]}>
              <FlatCart
                onPress={() => {
                  navigation.navigate("LogIn");
                }}
                style={{ borderBottomWidth: 1, paddingTop: 0 }}
                icon={logins}
                title={"Login"}
                value={"Login to discover more"}
                disableGo={true}
                type={""}
              />
              <FlatCart
                onPress={() => {
                  navigation.navigate("SignUp_1");
                }}
                style={{ paddingBottom: 0, borderBottomWidth: 0 }}
                icon={openbusiness}
                title={"Create an account"}
                value={"Grow your business"}
                type={""}
              />
            </View>
            <View style={[styles.subContainer, { marginBottom: 20 }]}>
              <FlatCart
                onPress={() => {
                  navigation.navigate("WebViews", {
                    url: "https://duty.com.bd/about",
                    title: "About Us",
                  });
                }}
                icon={info}
                title={"About duty"}
                value={"Transforming the future"}
                type={""}
                style={{ paddingTop: 0 }}
              />
              <FlatCart
                onPress={() => {
                  navigation.navigate("WebViews", {
                    url: "https://duty.com.bd/legal/app/privacy-policy",
                    title: "Privacy Policy",
                  });
                }}
                icon={agreement}
                title={"Privacy Policy"}
                value={"Review our agreements"}
                type={""}
              />
              <FlatCart
                onPress={() => {
                  navigation.navigate("WebViews", {
                    url: "https://duty.com.bd/legal/app/terms-and-conditions",
                    title: "Term & Condition",
                  });
                }}
                icon={terms}
                title={"Terms & condition"}
                value={"Comply with our rules"}
                type={""}
              />
              <FlatCart
                onPress={() => {
                  navigation.navigate("WebViews", {
                    url: "https://duty.com.bd/legal/app/order-policy",
                    title: "Order policy",
                  });
                }}
                icon={order}
                title={"Order policy"}
                value={"Order like a pro, enjoy the benefits!"}
                type={""}
              />
              <FlatCart
                onPress={() => {
                  navigation.navigate("WebViews", {
                    url: "https://duty.com.bd/legal/app/refund-policy",
                    title: "Refund policy",
                  });
                }}
                icon={refund}
                title={"Refund policy"}
                value={"No hassle, just refunds!"}
                type={""}
              />
             <FlatCart
                onPress={() => {
                  navigation.navigate("WebViews", {
                    url: "https://duty.com.bd/legal/app/withdraw-policy",
                    title: "Withdrawal policy",
                  });
                }}
                icon={withdrawal}
                title={"Withdrawal policy"}
                value={"Easy withdrawals, your funds your way!"}
                type={""}
              />
              
              <FlatCart
                onPress={() => {
                  navigation.navigate("WebViews", {
                    url: "https://duty.com.bd/contact",
                    title: "Contact Us",
                  });
                }}
                style={{ borderBottomWidth: 0, paddingBottom: 0 }}
                icon={support}
                title={"Contact Us"}
                value={"Talk to us"}
                type={""}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{ height: inset?.top, backgroundColor: "#F2F2F6" }} />
      <StatusBar backgroundColor={"#F2F2F6"} />
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
        <View style={styles.container}>
          <Avatar
            onEdit={() => {
              pickImage().then((res) => {
                updateProfilePicture(res);
              });
            }}
            containerStyle={{ marginTop: 12 }}
            edit={true}
            source={{ uri: image }}
          />
          <Text numberOfLines={1} style={styles.headLine}>
            {user ? user.user.name : ""}
          </Text>
          <Text style={styles.text}>
            {user && user.user.gender ? user.user.gender.toUpperCase() : "N/A"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}>
            <SquireCart
              onPress={() => {
                navigation.navigate("ManageOrder");
              }}
              title={"Your Order"}
              icon={cart}
            />
            <SquireCart
              onPress={() => {
                navigation.navigate("UserAppointmentList");
              }}
              style={{
                marginHorizontal: 24,
              }}
              title={"Appointment"}
              icon={calender}
            />
            <SquireCart
              onPress={() => {
                navigation.navigate("SaveList");
              }}
              title={"Favorite"}
              icon={love}
            />
          </View>
          <View style={styles.subContainer}>
            <FlatCart
              onPress={() => {
                navigation.navigate("Mobile",{user:user?.user});
              }}
              style={{ paddingTop: 0 }}
              icon={call}
              title={"Phone"}
              value={user?.user?.phone}
              type={user?.user?.hidePhone?"Private":"Public"}
            />
            <FlatCart
              onPress={() => {
                navigation.navigate("Email",{user:user?.user});
              }}
              icon={email}
              title={"Email"}
              value={user?.user?.email}
              type={user?.user?.hideEmail?"Private":"Public"}
            />
            <FlatCart
              onPress={() => {
                //console.log(user?.user)
                navigation.navigate("UserLocation");
              }}
              icon={location}
              title={"Address"}
              value={user?.user?.address?`${user?.user?.address.division}, ${user?.user?.address?.district}`:null}
              type={user?.user?.hideAddress?"Private":"Public"}
            />
            <FlatCart
              onPress={() => {
                navigation.navigate("WebViews", {
                  url: "https://duty.com.bd/about",
                  title: "About Us",
                });
              }}
              icon={info}
              title={"Company"}
              value={"Transforming the future"}
              type={""}
            />
            <FlatCart
              onPress={() => {
                navigation.navigate("WebViews", {
                  url: "https://duty.com.bd/legal/app/privacy-policy",
                  title: "Privacy Policy",
                });
              }}
              icon={agreement}
              title={"Privacy policy"}
              value={"Review our agreement"}
              type={""}
            />
            <FlatCart
              onPress={() => {
                navigation.navigate("WebViews", {
                  url: "https://duty.com.bd/legal/app/terms-and-conditions",
                  title: "Terms & Conditions",
                });
              }}
              icon={terms}
              title={"Terms & condition"}
              value={"Comply with our rules"}
              type={""}
            />
            <FlatCart
              onPress={() => {
                navigation.navigate("WebViews", {
                  url: "https://duty.com.bd/legal/app/order-policy",
                  title: "Order Policy",
                });
              }}
              icon={order}
              title={"Order policy"}
              value={"Order like a pro, enjoy the benefits!"}
              type={""}
            />
            <FlatCart
              onPress={() => {
                navigation.navigate("WebViews", {
                  url: "https://duty.com.bd/legal/app/refund-policy",
                  title: "Refund Policy",
                });
              }}
              icon={refund}
              title={"Refund policy"}
              value={"No hassle, just refunds!"}
              type={""}
            />
            
            <FlatCart
              onPress={() => {
                navigation.navigate("WebViews", {
                  url: "https://duty.com.bd/legal/app/withdraw-policy",
                  title: "Withdrawal Policy",
                });
              }}
              icon={withdrawal}
              title={"Withdrawal policy"}
              value={"Easy withdrawals, your funds your way!"}
              type={""}
            />
            <FlatCart
              // onPress={()=>{
              //   navigation.navigate("WebViews",{url:"https://duty.com.bd/profile/support",title:"Support"})
              // }}
              onPress={() => {
                navigation.navigate("Support");
              }}
              style={{ borderBottomWidth: 0, paddingBottom: 0 }}
              icon={support}
              title={"Support"}
              value={"Talk to us"}
              type={""}
            />
          </View>
          <View style={[styles.subContainer, { marginBottom: 20 }]}>
            <FlatCart
              onPress={() => {
                navigation.navigate("DashboardList");
              }}
              style={{ paddingTop: 0 }}
              icon={business}
              title={"Business account"}
              value={"Grow your business"}
              type={""}
            />
            <FlatCart
              onPress={() => {
                setLogOut(true);
                logOut();
                logoutVendor();
                dispatch({ type: "SET_VENDOR", playload: false });
                dispatch({ type: "SET_USER", playload: [] });
                dispatch({ type: "SET_VENDOR_INFO", playload: false });
                navigation.navigate("Feed");
              }}
              style={{ borderBottomWidth: 0, paddingBottom: 0 }}
              icon={logouts}
              title={"Logout"}
              value={"Leave session"}
              disableGo={true}
              type={""}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

{
  //new icons
}
const cart = `<svg width="57" height="52" viewBox="0 0 57 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 8C0.5 3.58172 4.08172 0 8.5 0H48.5C52.9183 0 56.5 3.58172 56.5 8V44C56.5 48.4183 52.9183 52 48.5 52H8.5C4.08172 52 0.5 48.4183 0.5 44V8Z" fill="#4ADE80"/>
<path d="M27.6251 12.1185C28.6007 11.9495 29.6027 11.9614 30.5733 12.1534C31.544 12.3455 32.4642 12.714 33.281 13.2376C34.0979 13.7613 34.7952 14.4298 35.333 15.2048C35.8708 15.9798 36.2384 16.8459 36.4147 17.7533C36.5288 18.4959 36.5693 19.2466 36.5358 19.9961C37.9862 19.9998 39.4362 19.9934 40.8862 19.9988C41.44 20.015 41.9663 20.2267 42.3579 20.5909C42.7495 20.9552 42.9769 21.4444 42.9938 21.959C43.001 26.0952 43.0019 30.2318 42.9967 34.3687C42.9866 35.254 43.0736 36.1699 42.7295 37.0167C42.3952 37.8747 41.7893 38.6186 40.9914 39.1506C40.1934 39.6825 39.2409 39.9777 38.2591 39.9972C32.0861 40.0009 25.9128 40.0009 19.7391 39.9972C18.5 39.9518 17.3249 39.4742 16.4481 38.6595C15.5712 37.8448 15.0571 36.753 15.0083 35.6017C14.9983 31.0586 14.9973 26.5148 15.0055 21.9704C15.0138 21.4695 15.2242 20.9898 15.5949 20.6261C15.9657 20.2624 16.4699 20.0413 17.0077 20.0065C18.4933 19.9888 19.98 20.0045 21.4659 19.9981C21.4452 19.3683 21.4655 18.7379 21.5267 18.1104C21.7293 16.6403 22.429 15.2679 23.525 14.1911C24.621 13.1142 26.0567 12.3885 27.6251 12.1185ZM26.535 14.5614C25.8461 14.892 25.242 15.3569 24.7642 15.9243C24.2864 16.4917 23.9461 17.1483 23.7666 17.8492C23.626 18.5568 23.577 19.2776 23.6206 19.9961C27.2078 19.9979 30.7945 19.9979 34.3808 19.9961C34.4299 19.2411 34.3704 18.4833 34.2039 17.7429C34.0012 17.0174 33.6253 16.3436 33.1042 15.7715C32.583 15.1993 31.9299 14.7435 31.1933 14.4378C30.4567 14.1322 29.6555 13.9845 28.8491 14.0057C28.0427 14.0269 27.2518 14.2165 26.535 14.5604M22.2159 23.0634C22.013 23.1226 21.8339 23.237 21.7017 23.3919C21.5695 23.5467 21.4904 23.7348 21.4746 23.9319C21.3869 24.9926 21.4989 26.0594 21.8053 27.0844C22.3161 28.6114 23.3741 29.93 24.8035 30.8207C26.2329 31.7113 27.9474 32.1204 29.6619 31.9799C31.3763 31.8393 32.9872 31.1576 34.2266 30.0481C35.4661 28.9387 36.2593 27.4683 36.4743 25.8818C36.5276 25.267 36.5405 24.6497 36.5128 24.0335C36.5181 23.7746 36.4144 23.524 36.2237 23.3351C36.033 23.1463 35.7705 23.0341 35.4921 23.0225C35.2137 23.0108 34.9414 23.1007 34.7333 23.2729C34.5252 23.4451 34.3976 23.686 34.3779 23.9443C34.3527 24.6949 34.4243 25.4589 34.2132 26.1928C33.9094 27.3509 33.17 28.3699 32.1284 29.0657C31.0868 29.7616 29.8117 30.0885 28.5334 29.9873C27.2551 29.8862 26.0579 29.3636 25.1579 28.5141C24.258 27.6646 23.7146 26.5441 23.626 25.355C23.5825 24.8539 23.6393 24.3485 23.5901 23.8467C23.5643 23.707 23.5067 23.5739 23.4212 23.4565C23.3356 23.3391 23.2241 23.24 23.094 23.1658C22.9639 23.0916 22.8183 23.0441 22.6669 23.0265C22.5154 23.0088 22.3617 23.0214 22.2159 23.0634Z" fill="white"/>
</svg>
`;
const calender = `<svg width="56" height="52" viewBox="0 0 56 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0H48C52.4183 0 56 3.58172 56 8V44C56 48.4183 52.4183 52 48 52H8C3.58172 52 0 48.4183 0 44V8Z" fill="#3478F6"/>
<path d="M21.9187 12.5662C22.0029 12.3895 22.1371 12.2416 22.3044 12.1411C22.4717 12.0406 22.6647 11.9919 22.8594 12.0011C23.0541 12.0103 23.2418 12.0769 23.399 12.1927C23.5563 12.3085 23.676 12.4683 23.7434 12.6522C23.8052 13.2785 23.8222 13.9085 23.7941 14.5373C26.6008 14.5373 29.4081 14.5373 32.2158 14.5373C32.1884 13.9133 32.2048 13.2882 32.2649 12.6665C32.3306 12.4788 32.4509 12.3153 32.6103 12.1973C32.7696 12.0792 32.9605 12.012 33.1583 12.0045C33.3561 11.9969 33.5516 12.0493 33.7194 12.1549C33.8871 12.2605 34.0194 12.4143 34.0991 12.5964C34.1726 13.2411 34.1928 13.8909 34.1593 14.5389C35.3251 14.566 36.4924 14.4848 37.6566 14.5835C38.7051 14.7139 39.6839 15.1807 40.4475 15.9147C41.2111 16.6488 41.7188 17.6108 41.8952 18.6579C42.0195 20.2844 42.0333 21.9176 41.9364 23.546C41.9364 27.45 41.9538 31.3477 41.9269 35.2582C41.8839 36.5396 41.3437 37.7532 40.4219 38.6393C39.5001 39.5255 38.2699 40.0137 36.9945 39.9997C30.9999 39.9997 25.0042 39.9997 19.0075 39.9997C18.338 40.0043 17.6746 39.8713 17.0581 39.6087C16.4416 39.3461 15.885 38.9596 15.4226 38.4729C14.9602 37.9861 14.6017 37.4094 14.3692 36.7783C14.1366 36.1472 14.035 35.4749 14.0704 34.8028C14.0799 31.1312 14.0704 27.4596 14.0704 23.7864C14.0704 22.1448 13.912 20.4985 14.0704 18.8601C14.18 17.9781 14.5258 17.1425 15.0709 16.4426C15.616 15.7427 16.3399 15.2047 17.1654 14.886C18.6984 14.5179 20.2804 14.4001 21.8506 14.5373C21.8137 13.8796 21.8365 13.2198 21.9187 12.5662ZM16.8739 17.4781C15.8808 18.4191 16.0677 19.8664 16.082 21.1083H39.9375C39.947 19.868 40.1244 18.4159 39.1328 17.4765C37.8451 16.1184 35.8066 16.7489 34.164 16.6024C34.2189 17.2769 34.1806 17.9558 34.05 18.6197C33.9637 18.7831 33.8333 18.9186 33.6738 19.0107C33.5142 19.1028 33.3321 19.1478 33.1482 19.1405C32.9644 19.1332 32.7864 19.0739 32.6346 18.9693C32.4828 18.8648 32.3635 18.7193 32.2903 18.5497C32.2043 17.9049 32.1815 17.2532 32.2222 16.604C29.4154 16.604 26.6082 16.604 23.8004 16.604C23.8397 17.254 23.8142 17.9063 23.7244 18.5513C23.6502 18.7198 23.5307 18.8641 23.3792 18.9679C23.2278 19.0718 23.0505 19.131 22.8673 19.139C22.6842 19.1469 22.5025 19.1033 22.3427 19.0129C22.1829 18.9226 22.0514 18.7891 21.9631 18.6277C21.835 17.9581 21.7961 17.2743 21.8475 16.5944C20.2002 16.7441 18.1617 16.1088 16.8739 17.4717M19.8074 26.0696C19.5988 26.1422 19.4122 26.2673 19.2653 26.433C19.1184 26.5986 19.0162 26.7993 18.9685 27.016C18.9207 27.2326 18.9288 27.4579 18.9922 27.6705C19.0557 27.883 19.1722 28.0757 19.3307 28.2302C19.4891 28.3846 19.6844 28.4957 19.8977 28.5528C20.111 28.6099 20.3353 28.6111 20.5492 28.5564C20.7631 28.5016 20.9595 28.3927 21.1197 28.24C21.2798 28.0873 21.3984 27.8959 21.4642 27.6841C21.5317 27.4549 21.5355 27.2115 21.4752 26.9803C21.4149 26.7491 21.2927 26.539 21.122 26.3726C20.9513 26.2062 20.7385 26.09 20.5068 26.0366C20.275 25.9832 20.0331 25.9946 19.8074 26.0696ZM24.9155 26.0983C24.7059 26.1869 24.5232 26.3296 24.3859 26.5118C24.2486 26.6941 24.1615 26.9095 24.1333 27.1363C24.1052 27.3632 24.137 27.5935 24.2257 27.8041C24.3143 28.0146 24.4565 28.198 24.6381 28.3357C24.8197 28.4734 25.0341 28.5605 25.2598 28.5884C25.4856 28.6162 25.7146 28.5838 25.9239 28.4943C26.1332 28.4048 26.3154 28.2615 26.452 28.0787C26.5886 27.8959 26.6749 27.6802 26.7022 27.4532C26.7269 27.2277 26.6929 26.9996 26.6035 26.7913C26.5141 26.583 26.3724 26.4016 26.1922 26.265C26.012 26.1283 25.7996 26.0411 25.5758 26.0119C25.352 25.9827 25.1244 26.0124 24.9155 26.0983ZM30.0427 26.1205C29.8304 26.2214 29.6494 26.3784 29.5192 26.5748C29.389 26.7713 29.3145 26.9996 29.3037 27.2354C29.2929 27.4712 29.3462 27.7055 29.4578 27.9131C29.5695 28.1207 29.7353 28.2939 29.9374 28.4139C30.1396 28.5339 30.3705 28.5964 30.6053 28.5945C30.8401 28.5925 31.0699 28.5264 31.2701 28.4031C31.4703 28.2797 31.6333 28.1039 31.7416 27.8945C31.8499 27.6851 31.8994 27.45 31.8848 27.2144C31.8684 27.0041 31.8018 26.8008 31.6908 26.6218C31.5797 26.4428 31.4274 26.2933 31.2467 26.186C31.066 26.0787 30.8622 26.0167 30.6526 26.0053C30.4431 25.994 30.2338 26.0335 30.0427 26.1205ZM35.3552 26.0712C35.1474 26.1445 34.9617 26.27 34.8157 26.4357C34.6697 26.6014 34.5682 26.8019 34.521 27.0181C34.4737 27.2343 34.4821 27.4591 34.5455 27.6711C34.6089 27.8831 34.7252 28.0753 34.8832 28.2294C35.0412 28.3836 35.2358 28.4946 35.4485 28.552C35.6612 28.6093 35.885 28.6111 36.0986 28.5571C36.3121 28.5031 36.5084 28.3951 36.6688 28.2434C36.8292 28.0918 36.9484 27.9014 37.0151 27.6904C37.0847 27.4606 37.09 27.2159 37.0303 26.9832C36.9706 26.7506 36.8482 26.5389 36.6767 26.3716C36.5052 26.2043 36.2911 26.0877 36.0579 26.0347C35.8248 25.9817 35.5816 25.9943 35.3552 26.0712ZM19.8596 31.2617C19.6437 31.3268 19.4485 31.4475 19.2933 31.6118C19.1382 31.7761 19.0285 31.9784 18.9751 32.1985C18.9217 32.4186 18.9265 32.649 18.989 32.8667C19.0515 33.0843 19.1696 33.2818 19.3315 33.4394C19.4934 33.5971 19.6935 33.7094 19.9119 33.7653C20.1303 33.8212 20.3595 33.8187 20.5766 33.7581C20.7938 33.6975 20.9914 33.5808 21.1499 33.4197C21.3084 33.2586 21.4222 33.0586 21.48 32.8396C21.5363 32.6166 21.5331 32.3826 21.4707 32.1613C21.4082 31.9399 21.2888 31.739 21.1244 31.579C20.96 31.4189 20.7565 31.3052 20.5344 31.2495C20.3123 31.1938 20.0796 31.1981 19.8596 31.2617ZM35.409 31.2617C35.1931 31.3274 34.998 31.4486 34.8432 31.6135C34.6883 31.7784 34.5791 31.9812 34.5264 32.2016C34.4737 32.4221 34.4792 32.6526 34.5426 32.8702C34.6059 33.0879 34.7248 33.285 34.8875 33.4422C35.0501 33.5993 35.2508 33.7109 35.4697 33.7658C35.6885 33.8208 35.9179 33.8173 36.1349 33.7555C36.352 33.6938 36.5492 33.576 36.7069 33.414C36.8647 33.2519 36.9775 33.0511 37.0341 32.8316C37.0896 32.6086 37.0856 32.3748 37.0224 32.1538C36.9592 31.9329 36.839 31.7326 36.6741 31.5733C36.5092 31.414 36.3054 31.3013 36.0832 31.2466C35.8611 31.1919 35.6285 31.1971 35.409 31.2617ZM24.7017 31.421C24.5096 31.5487 24.3551 31.7258 24.254 31.9339C24.153 32.1419 24.1092 32.3733 24.1271 32.6041C24.145 32.835 24.224 33.0567 24.356 33.2465C24.4879 33.4363 24.668 33.5871 24.8774 33.6833C25.0869 33.7796 25.3182 33.8177 25.5472 33.7938C25.7763 33.77 25.9949 33.6849 26.1802 33.5475C26.3656 33.4101 26.511 33.2253 26.6014 33.0124C26.6918 32.7994 26.7238 32.5661 26.6943 32.3365C26.6633 32.1195 26.5787 31.9137 26.4481 31.7382C26.3174 31.5626 26.145 31.4229 25.9467 31.3317C25.7483 31.2406 25.5304 31.201 25.3129 31.2166C25.0953 31.2322 24.8852 31.3025 24.7017 31.421ZM29.9888 31.3573C29.7819 31.4686 29.609 31.6345 29.4889 31.8373C29.3687 32.04 29.3058 32.2718 29.307 32.5077C29.3081 32.7437 29.3732 32.9749 29.4953 33.1764C29.6175 33.3779 29.7919 33.5422 29.9999 33.6515C30.208 33.7608 30.4417 33.811 30.676 33.7967C30.9103 33.7824 31.1363 33.7041 31.3297 33.5704C31.5231 33.4366 31.6765 33.2523 31.7735 33.0375C31.8704 32.8226 31.9073 32.5852 31.88 32.3508C31.8528 32.1423 31.7759 31.9434 31.6559 31.7711C31.5359 31.5988 31.3763 31.4582 31.1907 31.3611C31.0051 31.264 30.7989 31.2135 30.5897 31.2136C30.3804 31.2138 30.1743 31.2647 29.9888 31.362V31.3573Z" fill="white"/>
</svg>
`;
const love = `<svg width="56" height="52" viewBox="0 0 56 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8C0 3.58172 3.58172 0 8 0H48C52.4183 0 56 3.58172 56 8V44C56 48.4183 52.4183 52 48 52H8C3.58172 52 0 48.4183 0 44V8Z" fill="#FF6C50"/>
<path d="M35.104 12C32.208 12 29.616 13.3843 28 15.5079C27.1746 14.4206 26.1028 13.5375 24.8697 12.9286C23.6365 12.3196 22.276 12.0017 20.896 12C15.984 12 12 15.9326 12 20.7933C12 22.6652 12.304 24.3955 12.832 26C15.36 33.8652 23.152 38.5685 27.008 39.8584C27.552 40.0472 28.448 40.0472 28.992 39.8584C32.848 38.5685 40.64 33.8652 43.168 26C43.696 24.3955 44 22.6652 44 20.7933C44 15.9326 40.016 12 35.104 12Z" fill="white"/>
</svg>
`;
const call = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#65C466"/>
<path d="M13.0636 16.95L11.2108 18.8C10.8202 19.19 10.1993 19.19 9.7987 18.81C9.68853 18.7 9.57837 18.6 9.4682 18.49C8.45545 17.472 7.52138 16.3789 6.67401 15.22C5.85278 14.08 5.19179 12.94 4.71107 11.81C4.24036 10.67 4 9.58 4 8.54C4 7.86 4.12018 7.21 4.36054 6.61C4.6009 6 4.98147 5.44 5.51227 4.94C6.15323 4.31 6.85428 4 7.59539 4C7.87581 4 8.15623 4.06 8.40661 4.18C8.667 4.3 8.89735 4.48 9.07762 4.74L11.4011 8.01C11.5814 8.26 11.7116 8.49 11.8017 8.71C11.8918 8.92 11.9419 9.13 11.9419 9.32C11.9419 9.56 11.8718 9.8 11.7316 10.03C11.6014 10.26 11.4111 10.5 11.1708 10.74L10.4096 11.53C10.2994 11.64 10.2494 11.77 10.2494 11.93C10.2494 12.01 10.2594 12.08 10.2794 12.16C10.3095 12.24 10.3395 12.3 10.3595 12.36C10.5398 12.69 10.8503 13.12 11.2909 13.64C11.7416 14.16 12.2223 14.69 12.7431 15.22C12.8433 15.32 12.9534 15.42 13.0536 15.52C13.4542 15.91 13.4642 16.55 13.0636 16.95ZM24 20.33C23.9987 20.7074 23.9131 21.0798 23.7496 21.42C23.5794 21.78 23.359 22.12 23.0686 22.44C22.5779 22.98 22.0371 23.37 21.4261 23.62C21.4161 23.62 21.4061 23.63 21.3961 23.63C20.8052 23.87 20.1642 24 19.4732 24C18.4517 24 17.36 23.76 16.2083 23.27C15.0566 22.78 13.9049 22.12 12.7631 21.29C12.3726 21 11.982 20.71 11.6114 20.4L14.8863 17.13C15.1667 17.34 15.4171 17.5 15.6274 17.61C15.6775 17.63 15.7376 17.66 15.8077 17.69C15.8878 17.72 15.968 17.73 16.0581 17.73C16.2283 17.73 16.3585 17.67 16.4687 17.56L17.2298 16.81C17.4802 16.56 17.7206 16.37 17.9509 16.25C18.1813 16.11 18.4116 16.04 18.662 16.04C18.8523 16.04 19.0526 16.08 19.2729 16.17C19.4932 16.26 19.7236 16.39 19.974 16.56L23.2889 18.91C23.5493 19.09 23.7296 19.3 23.8398 19.55C23.9399 19.8 24 20.05 24 20.33Z" fill="white"/>
</svg>
`;
const email = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#59A7D6"/>
<path d="M5.4056 19.0194C5.57684 20.3787 6.69106 21.4525 8.07336 21.595C9.98612 21.7919 11.9685 22 14 22C16.0315 22 18.0139 21.7919 19.9266 21.595C21.3089 21.4525 22.4231 20.3787 22.5944 19.0194C22.7988 17.3964 23 15.718 23 14C23 12.282 22.7988 10.6036 22.5944 8.9807C22.4231 7.62138 21.3089 6.54755 19.9266 6.40513C18.0139 6.20807 16.0315 6 14 6C11.9685 6 9.9861 6.20807 8.07336 6.40513C6.69106 6.54755 5.57684 7.62138 5.40559 8.9807C5.20115 10.6036 5 12.282 5 14C5 15.718 5.20115 17.3964 5.4056 19.0194Z" fill="white" stroke="#09090A" stroke-linejoin="round"/>
<path d="M5.44531 8.61316L12.2164 13.8748C13.2622 14.6875 14.7369 14.6875 15.7827 13.8748L22.5537 8.61316" stroke="#09090A" stroke-linejoin="round"/>
</svg>
`;
const location = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#EB4E3D"/>
<path d="M21.7747 10.5366C20.8282 6.02927 17.1955 4 14.0045 4H13.9955C10.8135 4 7.17181 6.01951 6.22533 10.5268C5.17068 15.561 8.01914 19.8244 10.5972 22.5073C11.511 23.4646 12.7328 23.9998 14.0045 24C15.2304 24 16.4563 23.5024 17.4028 22.5073C19.9809 19.8244 22.8293 15.5707 21.7747 10.5366ZM14.0045 15.4244C13.6316 15.4244 13.2624 15.3449 12.9179 15.1905C12.5734 15.036 12.2604 14.8096 11.9967 14.5243C11.7331 14.2389 11.5239 13.9001 11.3812 13.5273C11.2385 13.1544 11.1651 12.7548 11.1651 12.3512C11.1651 11.9476 11.2385 11.548 11.3812 11.1752C11.5239 10.8023 11.7331 10.4635 11.9967 10.1782C12.2604 9.89279 12.5734 9.66642 12.9179 9.51198C13.2624 9.35754 13.6316 9.27805 14.0045 9.27805C14.7576 9.27805 15.4798 9.60183 16.0123 10.1782C16.5448 10.7545 16.844 11.5362 16.844 12.3512C16.844 13.1663 16.5448 13.9479 16.0123 14.5243C15.4798 15.1006 14.7576 15.4244 14.0045 15.4244Z" fill="white"/>
</svg>
`;
const info = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#8E8E93"/>
<path d="M5.45703 4.08582C5.19141 4.27332 5.21094 3.46863 5.21094 13.6249V22.828H4.79297C4.44531 22.828 4.35156 22.8397 4.25781 22.9022C4.07812 23.0233 4 23.1718 4 23.4139C4 23.6561 4.07812 23.8046 4.25781 23.9257C4.36719 23.996 4.63281 23.9999 14 23.9999C23.3672 23.9999 23.6328 23.996 23.7422 23.9257C23.9219 23.8046 24 23.6561 24 23.4139C24 23.1718 23.9219 23.0233 23.7422 22.9022C23.6484 22.8397 23.5547 22.828 23.2109 22.828H22.7891V17.7303V12.6288L22.6211 12.4647C22.457 12.3007 22.4336 12.2928 19.1055 11.1874L15.7578 10.0741V8.96472V7.85535L15.5938 7.6991C15.4375 7.55457 15.0938 7.41785 10.6992 5.77332C5.57031 3.85144 5.72266 3.89832 5.45703 4.08582ZM14.5781 15.6757L14.5859 22.828H14H13.4141V21.2538C13.4141 19.7811 13.4102 19.6757 13.3398 19.5702C13.3008 19.5116 13.2148 19.4257 13.1562 19.3866C13.0469 19.3163 12.9258 19.3124 10.4844 19.3124C8.04297 19.3124 7.92188 19.3163 7.8125 19.3866C7.75391 19.4257 7.66797 19.5116 7.62891 19.5702C7.55859 19.6757 7.55469 19.7811 7.55469 21.2538V22.828H6.96875H6.38281V14.1405V5.453L10.4766 6.98816L14.5664 8.52332L14.5781 15.6757ZM18.7148 12.3475L21.6172 13.3163V18.0702V22.828H21.0312H20.4453V21.2538C20.4453 19.7811 20.4414 19.6757 20.3711 19.5702C20.332 19.5116 20.2461 19.4257 20.1875 19.3866C20.082 19.3163 19.9805 19.3124 18.6875 19.3124C17.3945 19.3124 17.293 19.3163 17.1875 19.3866C17.1289 19.4257 17.043 19.5116 17.0039 19.5702C16.9336 19.6757 16.9297 19.7811 16.9297 21.2538V22.828H16.3438H15.7578V17.1053C15.7578 13.9569 15.7695 11.3827 15.7852 11.3827C15.8047 11.3827 17.1211 11.8163 18.7148 12.3475ZM9.89844 21.6561V22.828H9.3125H8.72656V21.6561V20.4843H9.3125H9.89844V21.6561ZM12.2422 21.6561V22.828H11.6562H11.0703V21.6561V20.4843H11.6562H12.2422V21.6561ZM19.2734 21.6561V22.828H18.6875H18.1016V21.6561V20.4843H18.6875H19.2734V21.6561Z" fill="white"/>
<path d="M7.8125 10.0116C7.63281 10.1327 7.55469 10.2811 7.55469 10.5233C7.55469 10.7655 7.63281 10.9139 7.8125 11.035C7.91406 11.1014 8.00781 11.1093 8.72656 11.1093C9.44531 11.1093 9.53906 11.1014 9.64062 11.035C9.82031 10.9139 9.89844 10.7655 9.89844 10.5233C9.89844 10.2811 9.82031 10.1327 9.64062 10.0116C9.53906 9.94519 9.44531 9.93738 8.72656 9.93738C8.00781 9.93738 7.91406 9.94519 7.8125 10.0116Z" fill="white"/>
<path d="M11.3281 10.0116C11.1484 10.1327 11.0703 10.2811 11.0703 10.5233C11.0703 10.7655 11.1484 10.9139 11.3281 11.035C11.4297 11.1014 11.5234 11.1093 12.2422 11.1093C12.9609 11.1093 13.0547 11.1014 13.1562 11.035C13.3359 10.9139 13.4141 10.7655 13.4141 10.5233C13.4141 10.2811 13.3359 10.1327 13.1562 10.0116C13.0547 9.94519 12.9609 9.93738 12.2422 9.93738C11.5234 9.93738 11.4297 9.94519 11.3281 10.0116Z" fill="white"/>
<path d="M7.8125 12.3553C7.63281 12.4764 7.55469 12.6249 7.55469 12.8671C7.55469 13.1093 7.63281 13.2577 7.8125 13.3788C7.91406 13.4452 8.00781 13.453 8.72656 13.453C9.44531 13.453 9.53906 13.4452 9.64062 13.3788C9.82031 13.2577 9.89844 13.1093 9.89844 12.8671C9.89844 12.6249 9.82031 12.4764 9.64062 12.3553C9.53906 12.2889 9.44531 12.2811 8.72656 12.2811C8.00781 12.2811 7.91406 12.2889 7.8125 12.3553Z" fill="white"/>
<path d="M11.3281 12.3553C11.1484 12.4764 11.0703 12.6249 11.0703 12.8671C11.0703 13.1093 11.1484 13.2577 11.3281 13.3788C11.4297 13.4452 11.5234 13.453 12.2422 13.453C12.9609 13.453 13.0547 13.4452 13.1562 13.3788C13.3359 13.2577 13.4141 13.1093 13.4141 12.8671C13.4141 12.6249 13.3359 12.4764 13.1562 12.3553C13.0547 12.2889 12.9609 12.2811 12.2422 12.2811C11.5234 12.2811 11.4297 12.2889 11.3281 12.3553Z" fill="white"/>
<path d="M7.8125 14.6991C7.63281 14.8202 7.55469 14.9686 7.55469 15.2108C7.55469 15.453 7.63281 15.6014 7.8125 15.7225C7.91406 15.7889 8.00781 15.7968 8.72656 15.7968C9.44531 15.7968 9.53906 15.7889 9.64062 15.7225C9.82031 15.6014 9.89844 15.453 9.89844 15.2108C9.89844 14.9686 9.82031 14.8202 9.64062 14.6991C9.53906 14.6327 9.44531 14.6249 8.72656 14.6249C8.00781 14.6249 7.91406 14.6327 7.8125 14.6991Z" fill="white"/>
<path d="M11.3281 14.6991C11.1484 14.8202 11.0703 14.9686 11.0703 15.2108C11.0703 15.453 11.1484 15.6014 11.3281 15.7225C11.4297 15.7889 11.5234 15.7968 12.2422 15.7968C12.9609 15.7968 13.0547 15.7889 13.1562 15.7225C13.3359 15.6014 13.4141 15.453 13.4141 15.2108C13.4141 14.9686 13.3359 14.8202 13.1562 14.6991C13.0547 14.6327 12.9609 14.6249 12.2422 14.6249C11.5234 14.6249 11.4297 14.6327 11.3281 14.6991Z" fill="white"/>
<path d="M7.8125 17.0428C7.63281 17.1639 7.55469 17.3124 7.55469 17.5546C7.55469 17.7968 7.63281 17.9452 7.8125 18.0663C7.91406 18.1327 8.00781 18.1405 8.72656 18.1405C9.44531 18.1405 9.53906 18.1327 9.64062 18.0663C9.82031 17.9452 9.89844 17.7968 9.89844 17.5546C9.89844 17.3124 9.82031 17.1639 9.64062 17.0428C9.53906 16.9764 9.44531 16.9686 8.72656 16.9686C8.00781 16.9686 7.91406 16.9764 7.8125 17.0428Z" fill="white"/>
<path d="M11.3281 17.0428C11.1484 17.1639 11.0703 17.3124 11.0703 17.5546C11.0703 17.7968 11.1484 17.9452 11.3281 18.0663C11.4297 18.1327 11.5234 18.1405 12.2422 18.1405C12.9609 18.1405 13.0547 18.1327 13.1562 18.0663C13.3359 17.9452 13.4141 17.7968 13.4141 17.5546C13.4141 17.3124 13.3359 17.1639 13.1562 17.0428C13.0547 16.9764 12.9609 16.9686 12.2422 16.9686C11.5234 16.9686 11.4297 16.9764 11.3281 17.0428Z" fill="white"/>
<path d="M17.1875 14.6991C17.0078 14.8202 16.9297 14.9686 16.9297 15.2108C16.9297 15.453 17.0078 15.6014 17.1875 15.7225C17.293 15.7928 17.3945 15.7968 18.6875 15.7968C19.9805 15.7968 20.082 15.7928 20.1875 15.7225C20.3672 15.6014 20.4453 15.453 20.4453 15.2108C20.4453 14.9686 20.3672 14.8202 20.1875 14.6991C20.082 14.6288 19.9805 14.6249 18.6875 14.6249C17.3945 14.6249 17.293 14.6288 17.1875 14.6991Z" fill="white"/>
<path d="M17.1875 17.0428C17.0078 17.1639 16.9297 17.3124 16.9297 17.5546C16.9297 17.7968 17.0078 17.9452 17.1875 18.0663C17.293 18.1366 17.3945 18.1405 18.6875 18.1405C19.9805 18.1405 20.082 18.1366 20.1875 18.0663C20.3672 17.9452 20.4453 17.7968 20.4453 17.5546C20.4453 17.3124 20.3672 17.1639 20.1875 17.0428C20.082 16.9725 19.9805 16.9686 18.6875 16.9686C17.3945 16.9686 17.293 16.9725 17.1875 17.0428Z" fill="white"/>
</svg>
`;
const agreement = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#59A7D6"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.07802 5.31438C5.95948 6.00646 6.00019 5.6781 6.00019 14.0006C6.00019 22.323 5.95948 21.9947 7.07802 22.6867C7.55785 22.9836 7.91967 23 14 23C20.0803 23 20.4421 22.9836 20.922 22.6867C22.0405 21.9947 21.9998 22.323 21.9998 14.0006C21.9998 7.05406 21.9792 6.48075 21.714 6.0701C21.2961 5.42303 20.5187 5.00129 19.7424 5.00064L19.0692 5V7.63234C19.0692 9.57855 19.0163 10.3092 18.8659 10.4357C18.7177 10.5606 18.423 10.4969 17.778 10.2009L16.8934 9.79473L16.0678 10.2192C14.8244 10.8586 14.7921 10.793 14.7921 7.63234V5L11.1882 5.00064C7.89543 5.00113 7.54059 5.02829 7.07802 5.31438ZM15.7425 7.16978C15.7425 8.36316 15.7758 9.33956 15.8164 9.33956C15.8569 9.33956 16.1306 9.22319 16.4247 9.08095C16.9156 8.8434 16.9989 8.8434 17.4518 9.08095C17.7228 9.22319 18.0194 9.33956 18.1108 9.33956C18.2187 9.33956 18.2771 8.57756 18.2771 7.16978V5H17.0098H15.7425V7.16978ZM13.4962 9.29938C13.5466 9.65956 13.5384 9.66101 11.3274 9.66101C9.10522 9.66101 8.80345 9.58675 8.99275 9.08626C9.06736 8.88889 9.45563 8.85594 11.2641 8.89306C13.3904 8.93662 13.4468 8.94691 13.4962 9.29938ZM13.2742 11.0444C13.5983 11.1705 13.5983 11.6874 13.2742 11.8136C12.9481 11.9406 9.50743 11.9406 9.18142 11.8136C8.88345 11.6975 8.84685 11.1686 9.12883 11.0532C9.41476 10.9362 12.9768 10.9286 13.2742 11.0444ZM18.99 13.5988C18.99 13.9123 18.8704 13.9212 14.0895 13.9628C11.1544 13.9882 9.12867 13.9441 9.03885 13.853C8.95632 13.7693 8.93208 13.5864 8.98483 13.4465C9.07021 13.2211 9.63939 13.1971 14.0355 13.2349C18.8704 13.2763 18.99 13.285 18.99 13.5988ZM18.99 15.6882C18.99 16.0017 18.8704 16.0106 14.0895 16.0522C11.1544 16.0776 9.12867 16.0336 9.03885 15.9424C8.95632 15.8587 8.93208 15.6758 8.98483 15.536C9.07021 15.3105 9.63939 15.2865 14.0355 15.3243C18.8704 15.3658 18.99 15.3744 18.99 15.6882ZM11.3673 18.5288L11.8841 19.6818L12.1488 19.011C12.4913 18.1424 12.8731 18.1341 13.4267 18.983L13.846 19.6259H14.9638C16.0321 19.6259 16.0792 19.6418 16.0308 19.9875C15.9836 20.3246 15.8916 20.3524 14.6785 20.3958C13.5124 20.4376 13.3559 20.4082 13.1751 20.1145C12.8854 19.6438 12.7923 19.6982 12.4837 20.5178C12.0726 21.6097 11.6935 21.4651 11.0594 19.9742L10.5582 18.7958L10.0628 19.6126C9.56953 20.426 9.16098 20.6457 8.98879 20.1904C8.84749 19.8167 10.3234 17.3758 10.6908 17.3758C10.7787 17.3758 11.083 17.8946 11.3673 18.5288Z" fill="white"/>
</svg>
`;
const terms = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#65C466"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0953 4.09682C9.36111 4.17887 8.39548 4.3518 7.94949 4.4811C6.4625 4.91201 4.97473 6.40379 4.51963 7.92031C4.14965 9.15301 3.9221 12.3505 4.02465 14.8735C4.19315 19.017 4.53031 20.1093 6.07902 21.5289C7.58218 22.9067 9.16136 23.202 14.7585 23.152L15.8882 23.142L15.4652 22.2364C14.8956 21.0169 14.8711 19.2114 15.4079 18.0089C15.8556 17.0061 16.998 15.8654 18.0257 15.3951C19.2019 14.8568 21.0073 14.8828 22.2264 15.4555L23.1294 15.8798L23.1395 14.7467C23.1892 9.13333 22.8948 7.54956 21.521 6.04203C20.5794 5.00887 19.6097 4.47654 18.2396 4.24077C16.8702 4.00531 11.7259 3.91428 10.0953 4.09682ZM19.0767 8.92811C19.2066 9.07962 19.3583 9.33224 19.414 9.48926C19.5554 9.88788 19.1309 10.6405 18.6994 10.7565C18.5017 10.8097 16.1282 10.8541 13.4252 10.8552L8.51059 10.8574L8.12522 10.4708C7.65835 10.0025 7.62929 9.39319 8.05377 8.96749C8.35528 8.6651 8.57717 8.6525 13.6043 8.6525C18.3968 8.6525 18.8606 8.67581 19.0767 8.92811ZM14.7734 13.3208C15.205 13.4367 15.6294 14.1894 15.4881 14.588C15.1952 15.4137 15.1445 15.4247 11.6413 15.4247C8.57717 15.4247 8.34774 15.4046 8.05377 15.1098C7.60181 14.6565 7.6472 13.9456 8.15349 13.5463C8.5387 13.2424 8.76907 13.22 11.4905 13.222C13.0983 13.2231 14.5757 13.2676 14.7734 13.3208ZM19.0455 16.1925C17.9322 16.5586 16.9888 17.3637 16.4377 18.4171C16.019 19.218 16.0426 20.9684 16.4834 21.8053C17.2578 23.2754 18.4382 23.9983 20.0672 24C21.7318 24.0016 22.8555 23.3176 23.6412 21.8244C24.1156 20.9229 24.1203 19.2274 23.6509 18.3363C23.2257 17.5289 22.5912 16.8946 21.8079 16.494C21.1311 16.1476 19.6675 15.9879 19.0455 16.1925ZM20.5254 17.4103C20.692 17.4744 20.7738 17.7043 20.7738 18.1085C20.7738 18.7756 20.4491 19.0002 19.7418 18.8221C19.4214 18.7414 19.3605 18.6301 19.3605 18.1255C19.3605 17.795 19.4076 17.4774 19.4652 17.4197C19.5959 17.2885 20.1953 17.2832 20.5254 17.4103ZM20.5854 19.5511C20.7033 19.6694 20.7738 20.2568 20.7738 21.1205C20.7738 22.3671 20.7415 22.5183 20.44 22.6802C20.1975 22.8103 20.0037 22.8126 19.7333 22.689C19.382 22.5285 19.3605 22.4388 19.3605 21.1293C19.3605 19.6665 19.4822 19.3621 20.0672 19.3621C20.2485 19.3621 20.4817 19.4472 20.5854 19.5511Z" fill="white"/>
</svg>
`;
const refund = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.00559616" width="27.9761" height="27.9888" rx="4" fill="#AF3F61"/>
<path d="M12.7105 4.06297C10.3198 4.37156 7.9839 5.61765 6.44093 7.41453C5.13234 8.93797 4.32765 10.7309 4.0503 12.7505C3.9839 13.2231 3.9839 14.7192 4.0464 15.2114C4.3003 17.1372 5.04249 18.8755 6.2339 20.3403L6.47999 20.6411H6.29249C5.9253 20.645 5.64796 20.8559 5.57374 21.1919C5.50734 21.4809 5.66749 21.813 5.93312 21.9497C6.09327 22.0317 8.30421 22.0356 8.46046 21.9536C8.58155 21.8911 8.74952 21.7153 8.81593 21.5903C8.87452 21.4731 8.87452 19.2231 8.81593 19.1059C8.62062 18.7309 8.14405 18.5942 7.80421 18.8208C7.60499 18.9497 7.52296 19.1137 7.49562 19.4302L7.47218 19.6841L7.25343 19.4106C5.62452 17.3833 5.01905 14.6802 5.61671 12.0981C5.87843 10.9692 6.50343 9.69187 7.25734 8.75047C8.41359 7.30125 10.0464 6.24265 11.8276 5.78953C12.6675 5.57859 12.9409 5.54734 13.9566 5.54734C14.7573 5.54734 14.9644 5.55906 15.3628 5.63328C17.4995 6.0239 19.3355 7.10594 20.6401 8.75047C23.1401 11.8911 23.1323 16.2895 20.6245 19.438C19.2339 21.1841 17.1753 22.3208 14.9136 22.5942C14.0191 22.7036 12.6987 22.6098 11.8355 22.3794C11.3784 22.2544 11.2026 22.27 10.9917 22.4458C10.7261 22.6606 10.6636 22.9731 10.8159 23.2895C10.8628 23.3833 10.9526 23.4927 11.0151 23.5317C11.1519 23.6137 11.9761 23.8208 12.5112 23.9067C13.0308 23.9887 14.5073 24.0239 15.0816 23.9653C16.9292 23.7739 18.7534 23.0356 20.2456 21.8716C21.8628 20.6098 23.1401 18.6958 23.687 16.6997C23.9526 15.7348 23.9761 15.5083 23.9761 14.0005C23.9761 12.8247 23.9644 12.5903 23.898 12.2192C23.2769 8.76609 20.8472 5.84422 17.5894 4.63328C16.7964 4.3364 15.9253 4.12547 15.1401 4.04344C14.6167 3.98484 13.2261 3.99656 12.7105 4.06297Z" fill="white"/>
<path d="M8.74171 9.97313C8.03077 10.2036 7.53468 10.7114 7.35499 11.4028C7.26905 11.7427 7.26514 16.2544 7.35499 16.5903C7.53077 17.2739 8.04639 17.8247 8.69093 18.0239C8.94093 18.102 9.0464 18.102 13.9761 18.102C18.9058 18.102 19.0112 18.102 19.2612 18.0239C19.9058 17.8247 20.4214 17.2739 20.5972 16.5903C20.687 16.2544 20.6831 11.7427 20.5972 11.4028C20.4175 10.7231 19.9487 10.2231 19.2769 9.99656L18.98 9.89891L13.9683 9.90281C9.27296 9.90281 8.94483 9.90672 8.74171 9.97313ZM19.0073 11.3755C19.0776 11.4263 19.1675 11.5356 19.2105 11.6216C19.2886 11.77 19.2886 11.8403 19.2808 14.0513L19.2691 16.3325L19.1558 16.477C18.9448 16.7544 19.3003 16.7388 13.9292 16.727L9.07374 16.7153L8.92921 16.6177C8.62843 16.4145 8.64405 16.563 8.64405 13.9966V11.7114L8.74171 11.5669C8.79249 11.4927 8.89796 11.3911 8.97608 11.3481C9.1128 11.2661 9.13233 11.2661 13.9956 11.2778L18.8784 11.2856L19.0073 11.3755Z" fill="white"/>
<path d="M13.4565 11.8755C12.4917 12.1059 11.7886 13.0044 11.7886 14.0005C11.7886 15.2036 12.7729 16.188 13.9761 16.188C14.3198 16.188 14.6753 16.0981 14.9956 15.9302C15.3472 15.7466 15.5737 15.5434 15.7886 15.2192C16.3745 14.3364 16.2573 13.1763 15.5034 12.438C14.9722 11.9184 14.1792 11.6997 13.4565 11.8755ZM14.3901 13.3169C14.9097 13.6216 14.9019 14.3833 14.3745 14.6919C13.6753 15.102 12.8706 14.3052 13.2847 13.602C13.519 13.2036 13.9878 13.0825 14.3901 13.3169Z" fill="white"/>
</svg>
`
const order=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#A356D7"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7551 4L18.9632 4.10156C19.0759 4.15625 19.2146 4.23828 19.2666 4.28516C19.3229 4.33203 19.4226 4.44922 19.6003 4.72266L19.622 12.4766L22.7646 12.4961L23.0247 12.6055C23.1678 12.6641 23.3671 12.7891 23.4712 12.8789C23.5752 12.9688 23.7009 13.1055 23.7529 13.1797C23.8006 13.2539 23.8786 13.4219 23.922 13.5508C23.9913 13.7656 24 13.9844 24 16.0898C24 18.2773 23.9957 18.4102 23.909 18.707C23.8613 18.8789 23.7616 19.125 23.6836 19.2539C23.6055 19.3789 23.4582 19.5703 23.3498 19.6719C23.2414 19.7734 22.5999 20.2539 21.9194 20.7383C21.2388 21.2227 20.5756 21.6641 20.4456 21.7227C20.3156 21.7812 20.0772 21.8477 19.6264 21.9102L19.6134 22.5938C19.6003 23.2539 19.596 23.2852 19.4833 23.4531C19.4226 23.5508 19.3229 23.668 19.2666 23.7148C19.2146 23.7617 19.0759 23.8438 18.7551 24H4.88427L4.6762 23.9062C4.5635 23.8555 4.41179 23.7539 4.33377 23.6797C4.25574 23.6094 4.15171 23.4648 4 23.1602L4.00867 7.76953L4.12137 7.68359C4.18205 7.63281 4.27742 7.59375 4.32943 7.59375C4.38578 7.58984 4.47681 7.625 4.64586 7.74219L4.66753 15.457C4.68487 22.2344 4.69788 23.1758 4.75423 23.2383C4.7889 23.2734 4.87126 23.332 4.94062 23.3594C5.04031 23.4062 6.15865 23.4141 11.8197 23.4141C17.7451 23.4141 18.599 23.4062 18.7117 23.3555C18.7811 23.3242 18.8721 23.2422 18.9068 23.1797C18.9588 23.0898 18.9718 22.9141 18.9675 21.7539L18.7204 21.6094C18.586 21.5273 18.3303 21.3555 18.1612 21.2266C17.8968 21.0312 17.8448 20.9727 17.8448 20.875C17.8448 20.8047 17.8838 20.7188 17.9532 20.6602C18.0095 20.6055 18.1092 20.5625 18.1699 20.5625C18.2393 20.5625 18.417 20.6641 18.6814 20.8516C18.8981 21.0078 19.1495 21.1719 19.2319 21.2109C19.3359 21.2617 19.4746 21.2852 19.687 21.2852C19.9341 21.2852 20.0295 21.2656 20.1855 21.1875C20.2939 21.1328 20.9484 20.6797 21.6376 20.1836C22.5566 19.5234 22.9293 19.2305 23.0334 19.0898C23.1071 18.9883 23.2024 18.8203 23.2371 18.7148C23.2978 18.5547 23.3065 18.2109 23.3065 16.1172C23.3065 13.875 23.2978 13.6953 23.2241 13.5508C23.1808 13.4648 23.0767 13.3359 22.99 13.2695C22.899 13.1992 22.756 13.125 22.6693 13.1016C22.5652 13.0781 21.3949 13.0664 19.505 13.0742C16.5834 13.082 16.5054 13.0859 16.3884 13.1602C16.3277 13.2031 16.2323 13.2891 16.1803 13.3477C16.0893 13.457 16.0893 13.4688 16.0893 18.6289L16.2107 18.8633C16.2757 18.9922 16.4057 19.1641 16.4924 19.2461C16.5791 19.3281 16.7785 19.4883 16.9302 19.5977C17.0819 19.7109 17.225 19.8438 17.2466 19.8984C17.2726 19.9648 17.2683 20.0352 17.2293 20.1094C17.199 20.1719 17.1296 20.2383 17.0776 20.2539C17.0212 20.2734 16.9519 20.2891 16.9259 20.2891C16.8955 20.2891 16.7395 20.2031 16.2844 19.8984H9.43563L9.34894 19.793C9.29692 19.7305 9.25791 19.6602 9.26225 19.6367C9.26225 19.6094 9.28392 19.5469 9.30559 19.5C9.3316 19.4492 9.39662 19.3867 9.4573 19.3633C9.53966 19.3242 10.2679 19.3125 15.7208 19.3125L15.6385 19.1484C15.5908 19.0547 15.5215 18.875 15.4868 18.7461C15.4348 18.5742 15.4174 18.3203 15.4174 17.0859H9.43563L9.34894 16.9805C9.29692 16.918 9.25791 16.8398 9.26225 16.8047C9.26225 16.7656 9.30993 16.6875 9.47031 16.5195L15.4174 16.5V14.3125L9.47031 14.293L9.36628 14.1875C9.30993 14.125 9.26225 14.0469 9.26225 14.0117C9.25791 13.9727 9.29692 13.8945 9.43563 13.7266H15.4174V13.6211C15.4174 13.5586 15.4434 13.4258 15.4781 13.3164C15.5215 13.1875 15.6125 13.0469 15.7512 12.9102C15.8639 12.7969 16.059 12.6562 16.3927 12.4961L18.9718 12.4766V8.70703C18.9718 5.43359 18.9632 4.92188 18.9068 4.82031C18.8721 4.75781 18.7811 4.67578 18.7117 4.64453C18.599 4.59375 17.7495 4.58594 4.91894 4.60547L4.66753 4.85938V6.53906L4.53749 6.65625C4.4378 6.74609 4.38145 6.76953 4.28609 6.75391C4.22107 6.74219 4.13437 6.69141 4.09103 6.64453C4.02167 6.56641 4.013 6.46875 4.01734 5.67969C4.01734 4.83984 4.02167 4.79297 4.12137 4.60547C4.17772 4.5 4.29042 4.35547 4.36844 4.28906C4.4508 4.21875 4.59384 4.12891 4.68921 4.08594C4.86259 4.00391 4.8756 4.00391 18.7551 4V4ZM21.5943 15.0703C21.7113 15.0781 21.8717 15.1094 21.941 15.1445C22.0104 15.1758 22.1274 15.2539 22.1968 15.3125C22.2618 15.375 22.3485 15.4805 22.3875 15.543C22.4265 15.6094 22.4569 15.7578 22.4569 15.8945C22.4612 16.043 22.4352 16.1797 22.3875 16.2656C22.3442 16.3398 21.8197 16.8438 21.2172 17.3828C20.2202 18.2773 20.0988 18.3711 19.8604 18.4531C19.6654 18.5234 19.5137 18.543 19.2536 18.543C18.9935 18.543 18.8418 18.5234 18.6467 18.4531C18.4213 18.375 18.2956 18.2812 17.7451 17.793C17.3897 17.4805 17.0603 17.1523 17.0082 17.0664C16.9519 16.9648 16.9215 16.8359 16.9215 16.6953C16.9215 16.5664 16.9519 16.4258 16.9996 16.3438C17.0386 16.2695 17.1166 16.1641 17.1686 16.1172C17.2163 16.0664 17.329 15.9922 17.4114 15.9531C17.4937 15.9141 17.6324 15.8711 17.7148 15.8555C17.8101 15.8398 17.9532 15.8516 18.1049 15.8906C18.313 15.9414 18.3953 16 18.7768 16.3438C19.0152 16.5586 19.2276 16.7344 19.2536 16.7344C19.2796 16.7344 19.687 16.3828 20.1638 15.9531C20.7967 15.3828 21.0785 15.1562 21.2042 15.1133C21.3082 15.0781 21.4686 15.0586 21.5943 15.0703Z" fill="#1A1A1A"/>
<path d="M22.1147 13.25C22.054 13.168 22.0064 13.0938 22.0064 13.082C22.0064 13.0703 22.1191 13.0625 22.2534 13.0625C22.3921 13.0625 22.5785 13.082 22.6652 13.1016C22.7563 13.125 22.8993 13.1992 22.9903 13.2656C23.077 13.3359 23.181 13.4648 23.2244 13.5508C23.2981 13.6953 23.3068 13.875 23.3068 16.1172C23.3068 18.2109 23.2981 18.5547 23.2374 18.7148C23.2027 18.8203 23.1074 18.9883 23.0337 19.0898C22.9296 19.2305 22.5569 19.5234 21.6379 20.1836C20.9487 20.6797 20.3029 21.1289 20.2075 21.1758C20.1121 21.2266 19.9257 21.2773 19.7957 21.2891C19.6657 21.3008 19.5183 21.2969 19.4663 21.2773C19.3882 21.25 19.527 21.1406 20.5022 20.4453C21.1178 20.0039 21.7116 19.5625 21.8156 19.457C21.9197 19.3555 22.0627 19.1641 22.1364 19.0312C22.2058 18.8945 22.2838 18.6875 22.3098 18.5703C22.3358 18.4531 22.3531 17.9062 22.3531 17.3594C22.3488 16.6836 22.3618 16.3242 22.3965 16.2461C22.4268 16.1836 22.4572 16.0664 22.4702 15.9922C22.4875 15.9141 22.4658 15.7656 22.4225 15.6484C22.3661 15.4883 22.3531 15.2773 22.3531 14.6172C22.3531 13.9844 22.3401 13.7383 22.2881 13.5898C22.2534 13.4844 22.1754 13.3281 22.1147 13.25Z" fill="#D1D1D1"/>
<path d="M17.1427 8.66016C17.1297 5.07031 17.1253 4.83203 17.0517 4.71484L16.9736 4.58594H17.7799C18.4041 4.58594 18.6121 4.59766 18.7118 4.64453C18.7812 4.67578 18.8722 4.75391 18.9069 4.82031C18.9632 4.92188 18.9719 5.43359 18.9719 12.4766H17.1514L17.1427 8.66016Z" fill="#C8EFFE"/>
<path d="M17.1427 21.7188C17.147 20.9219 17.1644 20.2461 17.1817 20.2188C17.199 20.1797 17.251 20.1992 17.3854 20.2969C17.4851 20.3711 17.6368 20.4844 17.7235 20.5469C17.8752 20.6523 17.8839 20.6719 17.8579 20.8203C17.8319 20.9727 17.8362 20.9766 18.1527 21.2188C18.3304 21.3555 18.5861 21.5312 18.9676 21.7578L18.9719 22.4102C18.9719 22.918 18.9589 23.0898 18.9069 23.1836C18.8722 23.2461 18.7855 23.3242 18.7118 23.3594C18.6121 23.4023 18.4084 23.418 16.978 23.418L17.056 23.2891C17.121 23.1758 17.1297 23.0078 17.1427 21.7188Z" fill="#C8EFFE"/>
<path d="M16.2104 13.293C16.2667 13.2227 16.3794 13.1445 16.4618 13.1172C16.5788 13.0781 17.1683 13.0664 21.9841 13.0625L22.1228 13.2656C22.1965 13.3789 22.2789 13.543 22.3049 13.6289C22.3309 13.7148 22.3525 14.1523 22.3525 15.4648L22.2138 15.332C22.1358 15.2617 22.0188 15.1758 21.9494 15.1484C21.8844 15.1172 21.75 15.082 21.646 15.0703C21.5463 15.0586 21.3772 15.0664 21.2689 15.0938C21.0998 15.1328 20.9611 15.2422 20.1852 15.9375C19.6954 16.375 19.2749 16.7344 19.2533 16.7344C19.2273 16.7344 19.0149 16.5586 18.7765 16.3438C18.395 16 18.3127 15.9414 18.1046 15.8906C17.9529 15.8516 17.8098 15.8398 17.7145 15.8555C17.6321 15.8711 17.4934 15.9141 17.4111 15.9531C17.3287 15.9922 17.216 16.0664 17.1683 16.1172C17.1163 16.1641 17.0383 16.2695 16.9993 16.3438C16.9516 16.4258 16.9212 16.5664 16.9212 16.6953C16.9212 16.8359 16.9516 16.9648 17.0079 17.0664C17.06 17.1523 17.3894 17.4805 17.7448 17.793C18.2953 18.2812 18.421 18.375 18.6464 18.4531C18.8415 18.5234 18.9932 18.543 19.2533 18.543C19.5134 18.543 19.6651 18.5234 19.8601 18.4531C20.0985 18.3711 20.2199 18.2773 22.3525 16.3633V17.3594C22.3525 17.9062 22.3352 18.4531 22.3092 18.5703C22.2875 18.6875 22.2008 18.9062 22.1185 19.0586C22.0318 19.2148 21.8801 19.4102 21.7587 19.5156C21.646 19.6133 21.0565 20.0508 19.3616 21.2656L19.2186 21.2031C19.1449 21.168 18.8978 21.0078 18.6768 20.8516C18.4514 20.6875 18.2346 20.5625 18.1783 20.5625C18.1263 20.5625 18.0439 20.5859 17.9962 20.6172C17.9182 20.6719 17.8835 20.6562 17.5498 20.4219C17.2377 20.2031 17.1987 20.1641 17.2377 20.0938C17.2593 20.0508 17.268 19.9688 17.2463 19.9102C17.229 19.8477 17.0903 19.7148 16.9126 19.582C16.7435 19.4609 16.5485 19.3008 16.4704 19.2305C16.3924 19.1562 16.2754 18.9922 16.089 18.6289L16.076 16.1484C16.0673 14.7852 16.0717 13.6094 16.089 13.5391C16.102 13.4727 16.1583 13.3594 16.2104 13.293Z" fill="white"/>
<path d="M4.75439 4.76953C4.8064 4.70703 4.88876 4.64062 4.94078 4.625C4.99279 4.60547 7.72361 4.58984 16.9781 4.58594L17.0517 4.71094C17.1254 4.83203 17.1298 5.10937 17.1558 12.457L16.7743 12.4805C16.4926 12.5 16.3365 12.5312 16.1761 12.6016C16.0548 12.6562 15.8641 12.7969 15.7514 12.9102C15.6126 13.0469 15.5216 13.1875 15.4783 13.3164C15.4436 13.4219 15.4176 13.5586 15.4176 13.7266H9.43579L9.3491 13.832C9.29708 13.8945 9.25807 13.9727 9.26241 14.0078C9.26241 14.0469 9.31009 14.125 9.47047 14.293L15.4176 14.3125V16.5L9.47047 16.5195L9.36644 16.625C9.31009 16.6875 9.26241 16.7656 9.26241 16.8008C9.25807 16.8398 9.29708 16.918 9.43579 17.0859H15.4176V17.7969C15.4176 18.3203 15.4349 18.5742 15.4869 18.7461C15.5216 18.875 15.591 19.0547 15.721 19.3125H12.6434C10.6755 19.3125 9.53115 19.3281 9.47047 19.3516C9.41412 19.375 9.34476 19.4336 9.31876 19.4883C9.28841 19.543 9.26241 19.6094 9.26241 19.6328C9.25807 19.6602 9.29708 19.7305 9.43579 19.8984H16.2845L16.5793 20.0977C16.8263 20.2656 16.8914 20.293 17.1514 20.25L17.1428 21.7031C17.1298 23.0039 17.1211 23.1719 16.9781 23.4141H11.0179C5.8077 23.4141 5.04047 23.4062 4.92777 23.3555C4.85842 23.3242 4.76739 23.2578 4.73271 23.207C4.67636 23.1328 4.66769 22.2266 4.66769 15.4961C4.66769 10.5 4.65469 7.83203 4.62435 7.76953C4.60267 7.71484 4.52032 7.64844 4.32092 7.57422V7.17188C4.32092 6.80469 4.32959 6.77344 4.40762 6.75391C4.4553 6.74219 4.53332 6.6875 4.581 6.62891C4.66336 6.52734 4.67203 6.46484 4.66769 5.69922C4.66336 4.92969 4.67203 4.87109 4.75439 4.76953Z" fill="#DFF6FD"/>
<path d="M8.89368 11.4414L8.88068 11.1406L8.86768 10.8359H14.7238V11.4609H14.2903C13.8959 11.4609 13.8482 11.4688 13.7701 11.5469C13.7225 11.5977 13.6835 11.6602 13.6835 11.6836C13.6835 11.7227 13.5708 11.7344 13.2717 11.7344C12.9726 11.7344 12.8599 11.7227 12.8599 11.6836C12.8599 11.6602 12.8339 11.6016 12.7992 11.5586C12.7385 11.4844 12.6735 11.4805 8.89368 11.4414Z" fill="#1876F2"/>
<path d="M9.9949 6.44922C10.7231 6.05469 11.3777 5.71094 11.4513 5.6875C11.525 5.66406 11.6897 5.64453 11.8198 5.64453C11.9715 5.64453 12.1275 5.67188 12.2532 5.72266C12.3616 5.76562 12.9945 6.09375 13.6577 6.45312C14.3252 6.8125 14.9407 7.16797 15.0231 7.24219C15.1054 7.31641 15.2181 7.46484 15.2745 7.57422C15.3438 7.71094 15.3742 7.84375 15.3742 8.00391C15.3742 8.17188 15.3482 8.27344 15.2875 8.36328C15.2398 8.43359 15.1358 8.52734 15.0621 8.57031C14.9537 8.62891 14.841 8.64844 14.3339 8.64844V10.25H14.607C14.776 10.25 14.9321 10.2734 15.0274 10.3203C15.1098 10.3555 15.2225 10.4492 15.2788 10.5234C15.3698 10.6484 15.3785 10.7031 15.3742 11.1484C15.3742 11.5664 15.3612 11.6562 15.2875 11.7617C15.2398 11.832 15.1358 11.9219 15.0621 11.957C14.9754 11.9961 14.776 12.0273 14.5506 12.0391C14.3469 12.0508 14.1085 12.0469 14.0218 12.0312C13.9308 12.0195 13.818 11.9727 13.7704 11.9297C13.7227 11.8867 13.6837 11.8047 13.6837 11.7422C13.6837 11.6836 13.7227 11.5977 13.7704 11.5469C13.8484 11.4688 13.8961 11.4609 14.724 11.4609V10.8359H8.87223L8.89391 11.4414L10.8141 11.4609C12.6737 11.4805 12.7387 11.4844 12.7994 11.5586C12.8341 11.6016 12.8601 11.6797 12.8644 11.7344C12.8644 11.7891 12.8254 11.875 12.6954 12.0273H10.7058C8.78988 12.0273 8.71619 12.0234 8.56881 11.9492C8.47778 11.9023 8.37375 11.7969 8.3174 11.6953C8.22637 11.5352 8.2177 11.4766 8.23071 11.082C8.24371 10.7109 8.25672 10.6289 8.33474 10.5352C8.38675 10.4766 8.48212 10.3906 8.5428 10.3477C8.63383 10.2891 8.74219 10.2656 9.3057 10.25V8.64844H9.01528C8.78121 8.65234 8.69018 8.63281 8.57314 8.5625C8.49079 8.51172 8.38242 8.41016 8.33474 8.33594C8.28706 8.26172 8.24805 8.12891 8.24805 8.04297C8.24805 7.95703 8.27405 7.80859 8.3044 7.71094C8.33474 7.61328 8.42577 7.45312 8.51246 7.35156C8.6425 7.20312 8.88957 7.05078 9.9949 6.44922Z" fill="#1A1A1A"/>
<path d="M6.21077 13.1133C6.28012 13.0664 6.38415 13.0117 6.44484 12.9883C6.50552 12.9688 6.77861 12.9492 7.05169 12.9492C7.32477 12.9453 7.61952 12.9609 7.70188 12.9844C7.78424 13.0039 7.92295 13.082 8.00531 13.1562C8.08766 13.2344 8.17869 13.3516 8.20903 13.4219C8.23504 13.4922 8.25672 13.7539 8.25672 14C8.25672 14.2461 8.23504 14.5078 8.20903 14.5781C8.17869 14.6484 8.08766 14.7656 8.00531 14.8438C7.91861 14.9219 7.77991 15 7.68021 15.0195C7.58485 15.043 7.27275 15.0547 6.98233 15.0469C6.49685 15.0352 6.44484 15.0273 6.28012 14.9258C6.16742 14.8594 6.06339 14.7578 6.01138 14.6523C5.94202 14.5156 5.92468 14.4062 5.92468 14C5.92468 13.6133 5.94202 13.4805 6.00271 13.3555C6.04605 13.2695 6.13708 13.1602 6.21077 13.1133Z" fill="#1A1A1A"/>
<path d="M6.13275 15.9766C6.17176 15.9375 6.28446 15.8711 6.37982 15.832C6.51853 15.7734 6.66157 15.7578 7.09503 15.7578C7.5415 15.7578 7.66721 15.7734 7.81025 15.8359C7.90561 15.875 8.02265 15.9609 8.07466 16.0195C8.12234 16.0781 8.18736 16.1914 8.21337 16.2656C8.24371 16.3398 8.26538 16.5898 8.26538 16.8203C8.26538 17.1094 8.24371 17.2891 8.19603 17.3867C8.16135 17.4688 8.07033 17.5938 7.9923 17.6602C7.91428 17.7305 7.77557 17.8086 7.68021 17.832C7.58051 17.8555 7.28142 17.8672 6.98233 17.8594C6.50986 17.8477 6.44484 17.8398 6.28879 17.7461C6.1891 17.6875 6.08073 17.5742 6.02438 17.4727C5.93769 17.3242 5.92468 17.2383 5.92468 16.8203C5.92468 16.4766 5.94202 16.3047 5.99404 16.1953C6.02871 16.1172 6.09373 16.0156 6.13275 15.9766Z" fill="#1A1A1A"/>
<path d="M6.13275 18.7891C6.17176 18.75 6.28446 18.6836 6.37982 18.6445C6.51853 18.5859 6.66157 18.5703 7.09503 18.5703C7.57184 18.5703 7.65854 18.582 7.82759 18.6602C7.94029 18.7109 8.06599 18.8086 8.13101 18.8984C8.23071 19.0391 8.24371 19.0977 8.26105 19.5039C8.26538 19.7578 8.25238 20.0312 8.22637 20.1211C8.20037 20.2148 8.11367 20.3516 8.03565 20.4297C7.96196 20.5039 7.81892 20.5938 7.72356 20.625C7.59352 20.6719 7.4158 20.6836 7.00401 20.6719C6.50552 20.6602 6.44484 20.6523 6.28879 20.5586C6.1891 20.5 6.08073 20.3867 6.02438 20.2852C5.93769 20.1367 5.92468 20.0508 5.92468 19.6328C5.92468 19.2891 5.94202 19.1172 5.99404 19.0078C6.02871 18.9297 6.09373 18.8281 6.13275 18.7891Z" fill="#1A1A1A"/>
<path d="M19.5007 17.3164C19.557 17.293 20.0122 16.9062 20.515 16.457C21.1435 15.8906 21.4556 15.6406 21.5206 15.6406C21.5726 15.6406 21.6637 15.6836 21.7244 15.7383C21.785 15.793 21.8327 15.875 21.8327 15.9258C21.8327 15.9844 21.5423 16.2734 20.8444 16.9023C20.3026 17.3945 19.7824 17.832 19.6871 17.8789C19.5657 17.9375 19.4357 17.9609 19.2536 17.9609C19.0716 17.9609 18.9415 17.9375 18.8202 17.8789C18.7248 17.832 18.404 17.5742 18.1049 17.3047C17.6585 16.8984 17.5631 16.793 17.5631 16.6953C17.5631 16.6328 17.5935 16.5547 17.6281 16.5234C17.6628 16.4922 17.7452 16.457 17.8102 16.4453C17.9186 16.4258 17.9879 16.4688 18.417 16.8477C18.6858 17.082 18.9502 17.293 19.0022 17.3164C19.0586 17.3398 19.1713 17.3594 19.2536 17.3594C19.336 17.3594 19.4487 17.3398 19.5007 17.3164Z" fill="#DFF6FD"/>
<path d="M8.9979 7.74219C9.04558 7.66797 9.49204 7.40234 10.3676 6.92969C11.3949 6.375 11.6984 6.22656 11.8197 6.22656C11.9368 6.22656 12.2402 6.37109 13.2285 6.90625C13.9177 7.27734 14.5376 7.63672 14.6069 7.70703C14.6763 7.78125 14.7239 7.875 14.7239 8.0625H8.87219L8.8982 7.95312C8.91554 7.89453 8.95889 7.80078 8.9979 7.74219Z" fill="#1876F2"/>
<path d="M6.56598 14C6.55731 13.7188 6.57465 13.6133 6.618 13.5781C6.65701 13.5508 6.83473 13.5312 7.09481 13.5312C7.36789 13.5312 7.52394 13.5469 7.56295 13.5781C7.59762 13.612 7.61496 13.7526 7.61496 14C7.61496 14.2383 7.59762 14.3867 7.56295 14.4219C7.52827 14.4531 7.37222 14.4688 7.09914 14.4688C6.82173 14.4688 6.66568 14.4531 6.62667 14.4219C6.59199 14.3906 6.57032 14.2383 6.56598 14Z" fill="white"/>
<path d="M6.56598 16.7852C6.55731 16.4688 6.57032 16.3867 6.618 16.3711C6.65267 16.3594 6.86941 16.3477 7.09481 16.3477C7.37222 16.3438 7.52394 16.3594 7.56295 16.3906C7.59762 16.4245 7.61496 16.5651 7.61496 16.8125C7.61496 17.0508 7.59762 17.1992 7.56295 17.2344C7.52827 17.2656 7.37222 17.2812 7.09914 17.2812C6.82173 17.2812 6.66568 17.2656 6.62667 17.2344C6.59199 17.1992 6.57032 17.0469 6.56598 16.7852Z" fill="white"/>
<path d="M6.56598 19.6016C6.56165 19.3867 6.57465 19.1953 6.59632 19.1836C6.618 19.168 6.83039 19.1562 7.0688 19.1562C7.36355 19.1562 7.52394 19.1719 7.56295 19.2031C7.59762 19.237 7.61496 19.3776 7.61496 19.625C7.61496 19.8633 7.59762 20.0117 7.56295 20.0469C7.52827 20.0781 7.37222 20.0938 7.09481 20.0938C6.82173 20.0938 6.66568 20.0781 6.62667 20.0469C6.59199 20.0117 6.57032 19.8594 6.56598 19.6016Z" fill="white"/>
<path d="M9.95569 10.25V9.44922L9.96002 8.64453L10.7576 8.66797L10.7793 10.25H9.95569Z" fill="#DFF6FD"/>
<path d="M11.4251 10.2539V9.45312V8.65234H12.2054V10.2539H11.4251Z" fill="#DFF6FD"/>
<path d="M12.8512 9.47656C12.8469 9.05078 12.8599 8.69141 12.8772 8.67578C12.8989 8.66406 13.0853 8.65234 13.6791 8.65234V10.2539H12.8556L12.8512 9.47656Z" fill="#DFF6FD"/>
</svg>
`
const support = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#F19A37"/>
<path d="M20.6667 4H7.33333C5.48889 4 4 5.33083 4 6.97186V17.8887C4 19.5297 5.48889 20.8605 7.33333 20.8605H8.17778C9.06667 20.8605 9.91111 21.1707 10.5333 21.7311L12.4333 23.4221C13.3 24.1926 14.7111 24.1926 15.5778 23.4221L17.4778 21.7311C18.1 21.1707 18.9556 20.8605 19.8333 20.8605H20.6667C22.5111 20.8605 24 19.5297 24 17.8887V6.97186C24 5.33083 22.5111 4 20.6667 4ZM12.2 15.0169C12.6556 15.0169 13.0333 15.3571 13.0333 15.7674C13.0333 16.1776 12.6556 16.5178 12.2 16.5178H9.22222C8.73333 16.5178 8.27778 16.3077 7.98889 15.9475C7.71111 15.6073 7.64444 15.187 7.77778 14.7867C8.16667 13.7161 9.12222 13.1357 9.96667 12.6154C10.8556 12.075 11.3556 11.7348 11.3556 11.1545C11.3556 10.6341 10.8889 10.2139 10.3111 10.2139C9.73333 10.2139 9.27778 10.6442 9.27778 11.1645C9.27778 11.5747 8.9 11.9149 8.44444 11.9149C7.98889 11.9149 7.61111 11.5747 7.61111 11.1645C7.61111 9.82364 8.82222 8.72295 10.3222 8.72295C11.8222 8.72295 13.0333 9.81363 13.0333 11.1645C13.0333 12.5754 11.8556 13.2958 10.9111 13.8762C10.3222 14.2364 9.76667 14.5766 9.48889 15.0269H12.2V15.0169ZM19.5556 15.0869H19.3222V15.7774C19.3222 16.1876 18.9444 16.5278 18.4889 16.5278C18.0333 16.5278 17.6556 16.1876 17.6556 15.7774V15.0869H15.4667C14.9222 15.0869 14.4222 14.8268 14.1444 14.4065C13.8667 13.9762 13.8667 13.4459 14.1444 13.0256C14.9 11.8549 15.7778 10.5241 16.5778 9.36335C16.9333 8.85303 17.6111 8.62289 18.2444 8.78299C18.8778 8.9531 19.3222 9.47342 19.3111 10.0738V13.596H19.5556C20.0111 13.596 20.3889 13.9362 20.3889 14.3465C20.3889 14.7567 20.0111 15.0869 19.5556 15.0869Z" fill="white"/>
</svg>
`;
const business = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#A473E9"/>
<path d="M23.0903 9.09257C22.2401 8.17376 20.8199 7.71435 18.7595 7.71435H18.5195V7.67525C18.5195 6.03312 18.5195 4 14.7589 4H13.2386C9.47802 4 9.47802 6.04289 9.47802 7.67525V7.72413H9.23798C7.16763 7.72413 5.7574 8.18353 4.90726 9.10235C3.91709 10.1776 3.9471 11.6242 4.04712 12.6114L4.05712 12.6798L4.13459 13.4748C4.14885 13.6212 4.22954 13.7535 4.35545 13.834C4.59529 13.9874 4.9967 14.2402 5.23731 14.3708C5.37734 14.4588 5.52736 14.537 5.67739 14.6152C7.38767 15.534 9.26798 16.1498 11.1783 16.4528C11.2683 17.3716 11.6784 18.4468 13.8687 18.4468C16.0591 18.4468 16.4892 17.3814 16.5592 16.4333C18.5995 16.1107 20.5698 15.4167 22.3501 14.4002C22.4102 14.3708 22.4502 14.3415 22.5002 14.3122C22.8969 14.093 23.3086 13.823 23.6839 13.5585C23.7969 13.4787 23.8692 13.3555 23.8846 13.2202L23.9004 13.0806L23.9504 12.6212C23.9604 12.5625 23.9604 12.5137 23.9704 12.4452C24.0504 11.458 24.0304 10.1091 23.0903 9.09257ZM15.0889 15.7882C15.0889 16.8243 15.0889 16.9807 13.8587 16.9807C12.6285 16.9807 12.6285 16.7949 12.6285 15.7979V14.5663H15.0889V15.7882ZM10.9083 7.71435V7.67525C10.9083 6.01357 10.9083 5.39777 13.2386 5.39777H14.7589C17.0893 5.39777 17.0893 6.02334 17.0893 7.67525V7.72413H10.9083V7.71435Z" fill="white"/>
<path d="M22.8725 15.6957C23.2261 15.5312 23.6335 15.8052 23.5981 16.1864L23.239 20.0511C23.029 22.006 22.2089 24 17.8081 24H10.1869C5.78618 24 4.96605 22.006 4.75601 20.0609L4.41525 16.3975C4.3802 16.0207 4.77823 15.747 5.13091 15.903C6.27052 16.4069 8.37401 17.3009 9.6734 17.6335C9.83773 17.6756 9.97065 17.7905 10.0426 17.9409C10.6497 19.2098 11.9663 19.8849 13.8675 19.8849C15.75 19.8849 17.0832 19.1838 17.6923 17.9118C17.7643 17.7613 17.8975 17.6463 18.0619 17.6041C19.4416 17.2493 21.6806 16.2499 22.8725 15.6957Z" fill="white"/>
</svg>
`;
const logouts = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#59A7D6"/>
<path d="M18.8064 4H16.2046C13.0024 4 11.001 6 11.001 9.2V13.25H17.2553C17.6656 13.25 18.0058 13.59 18.0058 14C18.0058 14.41 17.6656 14.75 17.2553 14.75H11.001V18.8C11.001 22 13.0024 24 16.2046 24H18.7964C21.9986 24 24 22 24 18.8V9.2C24.01 6 22.0086 4 18.8064 4Z" fill="white"/>
<path d="M6.55928 13.2498L8.63071 11.1798C8.78082 11.0298 8.85087 10.8398 8.85087 10.6498C8.85087 10.4598 8.78082 10.2598 8.63071 10.1198C8.34051 9.82984 7.86018 9.82984 7.56998 10.1198L4.21765 13.4698C3.92745 13.7598 3.92745 14.2398 4.21765 14.5298L7.56998 17.8798C7.86018 18.1698 8.34051 18.1698 8.63071 17.8798C8.92091 17.5898 8.92091 17.1098 8.63071 16.8198L6.55928 14.7498H11.0024V13.2498H6.55928Z" fill="white"/>
</svg>
`;
const logins = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="4" fill="#59A7D6"/>
<path d="M18.8074 4H16.2061C13.0045 4 11.0035 6 11.0035 9.2V13.25H15.4457L13.3747 11.18C13.3046 11.1107 13.2491 11.0281 13.2113 10.9371C13.1735 10.8461 13.1542 10.7485 13.1546 10.65C13.1546 10.46 13.2246 10.27 13.3747 10.12C13.6648 9.83 14.1451 9.83 14.4352 10.12L17.7869 13.47C18.077 13.76 18.077 14.24 17.7869 14.53L14.4352 17.88C14.1451 18.17 13.6648 18.17 13.3747 17.88C13.2351 17.7389 13.1569 17.5484 13.1569 17.35C13.1569 17.1516 13.2351 16.9611 13.3747 16.82L15.4457 14.75H11.0035V18.8C11.0035 22 13.0045 24 16.2061 24H18.7974C21.999 24 24 22 24 18.8V9.2C24.01 6 22.009 4 18.8074 4ZM4.75037 13.25C4.34017 13.25 4 13.59 4 14C4 14.41 4.34017 14.75 4.75037 14.75H11.0035V13.25H4.75037Z" fill="white"/>
</svg>
`;
const openbusiness = `<svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="32" rx="4" fill="#A473E9"/>
<path d="M23.0191 7.2667C22.6649 6.86648 22.2293 6.54647 21.7415 6.32804C21.2537 6.1096 20.725 5.99778 20.1905 6.00003C19.6901 5.99941 19.1944 6.09752 18.7319 6.28874C18.2695 6.47996 17.8492 6.76055 17.4954 7.11442C17.1415 7.46829 16.8609 7.8885 16.6697 8.35097C16.4785 8.81345 16.3804 9.3091 16.381 9.80955C16.381 10.5238 16.581 11.2 16.9334 11.7715C17.1238 12.0953 17.3715 12.3905 17.6572 12.6381C18.3238 13.2476 19.2096 13.6191 20.1905 13.6191C20.6096 13.6191 21.0096 13.5524 21.381 13.4191C22.2572 13.1429 22.9905 12.5429 23.4476 11.7715C23.6477 11.4476 23.8 11.0762 23.8857 10.6953C23.9619 10.4096 24 10.1143 24 9.80955C24 8.83813 23.6286 7.94289 23.0191 7.2667ZM21.6096 10.5048H20.9048V11.2476C20.9048 11.6381 20.581 11.9619 20.1905 11.9619C19.8 11.9619 19.4762 11.6381 19.4762 11.2476V10.5048H18.7715C18.381 10.5048 18.0572 10.181 18.0572 9.7905C18.0572 9.40003 18.381 9.07622 18.7715 9.07622H19.4762V8.40003C19.4762 8.00955 19.8 7.68575 20.1905 7.68575C20.581 7.68575 20.9048 8.00955 20.9048 8.40003V9.07622H21.6096C21.799 9.07622 21.9807 9.15147 22.1146 9.28543C22.2486 9.41938 22.3238 9.60106 22.3238 9.7905C22.3238 9.97994 22.2486 10.1616 22.1146 10.2956C21.9807 10.4295 21.799 10.5048 21.6096 10.5048Z" fill="white"/>
<path d="M23.0476 16.4762C23.0476 15.2286 22.8095 14.0286 22.3619 12.9333C22.0667 13.1429 21.7333 13.3048 21.3809 13.4191C21.2762 13.4572 21.1714 13.4857 21.0571 13.5143C21.6317 14.973 21.7692 16.5674 21.453 18.103C21.1367 19.6386 20.3804 21.0489 19.2762 22.1619C19 21.8095 18.6476 21.4857 18.2286 21.2095C15.6476 19.4762 11.419 19.4762 8.81905 21.2095C8.4 21.4857 8.05714 21.8095 7.77143 22.1619C6.27125 20.6498 5.42918 18.6062 5.42857 16.4762C5.42857 12.0095 9.05714 8.38097 13.5238 8.38097C14.5619 8.38097 15.5619 8.58097 16.4762 8.94288C16.5048 8.82859 16.5333 8.72383 16.5714 8.60954C16.6857 8.25716 16.8476 7.93335 17.0667 7.63812C15.9414 7.18172 14.7381 6.94881 13.5238 6.9524C8.27619 6.9524 4 11.2286 4 16.4762C4 19.2381 5.19048 21.7238 7.07619 23.4667C7.07619 23.4762 7.07619 23.4762 7.06667 23.4857C7.1619 23.581 7.27619 23.6571 7.37143 23.7429C7.42857 23.7905 7.47619 23.8381 7.53333 23.8762C7.70476 24.019 7.89524 24.1524 8.07619 24.2857L8.26667 24.419C8.44762 24.5429 8.63809 24.6571 8.83809 24.7619C8.90476 24.8 8.98095 24.8476 9.04762 24.8857C9.23809 24.9905 9.43809 25.0857 9.64762 25.1714C9.72381 25.2095 9.8 25.2476 9.87619 25.2762C10.0857 25.3619 10.2952 25.4381 10.5048 25.5048C10.581 25.5333 10.6571 25.5619 10.7333 25.5809C10.9619 25.6476 11.1905 25.7048 11.419 25.7619C11.4857 25.7809 11.5524 25.8 11.6286 25.8095C11.8952 25.8667 12.1619 25.9048 12.4381 25.9333C12.4762 25.9333 12.5143 25.9429 12.5524 25.9524C12.8762 25.9809 13.2 26 13.5238 26C13.8476 26 14.1714 25.9809 14.4857 25.9524C14.5238 25.9524 14.5619 25.9429 14.6 25.9333C14.8762 25.9048 15.1429 25.8667 15.4095 25.8095C15.4762 25.8 15.5429 25.7714 15.619 25.7619C15.8476 25.7048 16.0857 25.6571 16.3048 25.5809C16.3809 25.5524 16.4571 25.5238 16.5333 25.5048C16.7429 25.4286 16.9619 25.3619 17.1619 25.2762C17.2381 25.2476 17.3143 25.2095 17.3905 25.1714C17.5905 25.0857 17.7905 24.9905 17.9905 24.8857C18.0667 24.8476 18.1333 24.8 18.2 24.7619C18.3905 24.6476 18.5809 24.5429 18.7714 24.419C18.8381 24.381 18.8952 24.3333 18.9619 24.2857C19.1524 24.1524 19.3333 24.019 19.5048 23.8762C19.5619 23.8286 19.6095 23.781 19.6667 23.7429C19.7714 23.6571 19.8762 23.5714 19.9714 23.4857C19.9714 23.4762 19.9714 23.4762 19.9619 23.4667C21.8571 21.7238 23.0476 19.2381 23.0476 16.4762Z" fill="white"/>
<path d="M13.5238 11.6476C11.5524 11.6476 9.95239 13.2476 9.95239 15.2191C9.95239 17.1524 11.4667 18.7238 13.4762 18.781H13.6476C14.5721 18.7506 15.4486 18.362 16.0919 17.6974C16.7352 17.0327 17.095 16.144 17.0952 15.2191C17.0952 13.2476 15.4952 11.6476 13.5238 11.6476Z" fill="white"/>
</svg>
`;
const withdrawal=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.00152588" width="28.0003" height="27.997" rx="4" fill="#8C31FF"/>
<path d="M5.69938 4.07269C5.07438 4.25238 4.51579 4.71722 4.24235 5.29144C4.15641 5.47113 4.06657 5.71332 4.04313 5.8266C4.01188 5.97113 4.00016 7.66644 4.00016 11.3539C4.00016 17.2602 3.98454 16.8735 4.26188 17.436C4.4611 17.8344 4.85172 18.225 5.25016 18.4243C5.75016 18.6703 5.85954 18.686 7.25016 18.686H8.49235V17.8852V17.0883L7.28922 17.0766C6.09 17.0649 6.08219 17.0649 5.94547 16.9711C5.87125 16.9203 5.76579 16.8149 5.715 16.7407L5.62125 16.6L5.60954 13.1508L5.60172 9.7016H14.0002H22.3986L22.3908 13.1508L22.3791 16.6L22.2853 16.7407C22.2345 16.8149 22.1291 16.9203 22.0548 16.9711C21.9181 17.0649 21.9103 17.0649 20.7306 17.0766L19.547 17.0883V17.8852V18.686H20.7697C22.1369 18.686 22.2502 18.6703 22.7502 18.4243C23.1486 18.225 23.5392 17.8344 23.7384 17.436C24.0158 16.8735 24.0002 17.2602 24.0002 11.3539C24.0002 7.66644 23.9884 5.97113 23.9572 5.8266C23.7892 5.0141 23.0744 4.27191 22.258 4.06097C22.0392 4.00629 21.1955 3.99847 13.9767 4.00238C6.48063 4.00238 5.91813 4.01019 5.69938 4.07269ZM22.0158 5.68988C22.1291 5.75629 22.2384 5.86176 22.3009 5.96722C22.3947 6.12738 22.3986 6.16254 22.3986 6.72504V7.31879H14.0002H5.60172V6.72504C5.60172 6.16644 5.60563 6.12347 5.69938 5.96722C5.80094 5.79144 6.00016 5.64691 6.20329 5.59613C6.26969 5.58051 9.81266 5.57269 14.0783 5.57269L21.8322 5.58051L22.0158 5.68988Z" fill="white"/>
<path d="M6.65637 11.6352V12.436H11.8126H16.9689V11.6352V10.8344H11.8126H6.65637V11.6352Z" fill="white"/>
<path d="M13.2189 17.7953V20.9711L12.1642 19.9164L11.1095 18.8618L10.5431 19.4282L9.97668 19.9946L11.9767 21.9946C13.0782 23.0961 13.9962 23.9985 14.0197 23.9985C14.0704 23.9985 18.0236 20.0453 18.0236 19.9946C18.0236 19.9438 16.9611 18.8813 16.9103 18.8813C16.8907 18.8813 16.4025 19.35 15.8282 19.9243L14.7814 20.9711V17.7953V14.6235H14.0001H13.2189V17.7953Z" fill="white"/>
</svg>
`