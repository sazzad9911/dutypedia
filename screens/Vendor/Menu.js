import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Color } from "../../assets/colors";
const { width, height } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  manageOrder,
  appointment,
  expenses,
  notice2,
  wallet,
} from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import { logOut, logoutVendor } from "../../Class/auth";
import Button from "./../../components/Button";
import IconButton from "../../components/IconButton";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getDashboardInfo } from "../../Class/service";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import Avatar from "../../components/Profile/Avatar";
import { serverToLocalNew } from "../../Class/dataConverter";
import ProfileSkeleton from "../../components/ProfileSkeleton";

const Menu = ({ navigation }) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = useSelector((state) => state.vendor);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();
  const [service, setService] = useState(0);
  const [info, setInfo] = useState();
  const user = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const inset = useSafeAreaInsets();
  const [late,setLate]=useState(false)

  useEffect(() => {
   
    if (user) {
      getDashboardInfo(user.token, vendor.service.id)
        .then((res) => {
          //console.log(res.data)
          setInfo(res.data);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
    }
  }, []);
  React.useEffect(() => {
    if (isFocused) {
      setLate(false)
      //console.log("hidden")
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 100);
    } else {
      //console.log("seen")
      //dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);
  

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: inset?.top,
        }}
      />
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          height: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Avatar
            containerStyle={{ marginTop: 0 }}
            edit={false}
            source={
              vendor?.service?.profilePhoto
                ? { uri: vendor?.service?.profilePhoto }
                : null
            }
          />
          <Text
            style={{
              marginTop: 24,
              fontWeight: "800",
              fontSize: 20,
              
            }}>
            {vendor && vendor.service && vendor.service.serviceCenterName
              ? vendor.service.serviceCenterName
              : "Easin Arafat It Service"}
          </Text>
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              fontWeight: "500",
              
              color: "#767676",
            }}>
            
            {vendor &&
            vendor.service &&
            vendor.service.providerInfo &&
            vendor.service.providerInfo.name
              ? vendor.service.providerInfo.name
              : "Easin Arafat"}
          </Text>
        </View>
        <View
          style={{ paddingHorizontal: 28, paddingTop: 31, paddingBottom: 52 }}>
          <Cart
            onPress={() =>{
              //navigation.navigate("Member")
              navigation.navigate("VendorProfile")
            }}
            Icon={icon}
            title={"View Profile"}
            text={`${info?.services ? info?.services : "0"} Services`}
          />
          <Cart
            onPress={() => navigation.navigate("Member")}
            Icon={member}
            title={"Member List"}
            text={`${info?.members > 9 ? info?.members : `0${info?.members}`}`}
          />
          <Cart
            onPress={() => navigation.navigate("VendorAccountBalance")}
            Icon={account}
            title={"Account Balance"}
            text={`${info?.balance}৳`}
          />
          <Cart
            onPress={() => {
              navigation.navigate("CustomerReview");
            }}
            Icon={review}
            title={"Customer Review"}
            text={`${info?.reviews} review`}
          />
          <Cart
            onPress={() => navigation.navigate("UserNotice")}
            Icon={notice}
            title={"Manage Notice"}
            text={`${info?.notices > 9 ? info?.notices : `0${info?.notices}`}`}
          />
          <Cart
            onPress={() => navigation.navigate("Support")}
            Icon={support}
            title={"Support"}
          />
          <Cart
            onPress={() => {
              logoutVendor();
              dispatch({ type: "SET_VENDOR", playload: false });
              //navigation.navigate("Home");
            }}
            Icon={logout}
            title={"Logout"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Menu;
const styles = StyleSheet.create({
  pictureBox: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 28,
    paddingHorizontal: 28,
  },
  icon: {
    position: "absolute",
  },
});
const Cart = ({ title, Icon, onPress, text }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#E6E6E6",
        paddingVertical: 8,
        paddingBottom: 16,
      }}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <SvgXml height={"24"} width={"24"} xml={Icon} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 14,
            fontWeight: "500",
            
          }}>
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            marginRight: 8,
            color: "#A3A3A3",
            fontWeight: "400",
            fontSize: 14,
            
          }}>
          {text}
        </Text>
        <SvgXml xml={right} height={"10"} width={"6"} />
      </View>
    </TouchableOpacity>
  );
};
const squire = `<svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.41492 43.6695C1.59358 43.5613 1.01314 42.8071 1.14585 41.9894C2.97657 30.7087 8.62105 20.3782 17.1604 12.7378C25.6997 5.09743 36.5919 0.632055 48.0059 0.0622247C48.8333 0.0209181 49.5186 0.681336 49.5351 1.5096V1.5096C49.5516 2.33786 48.893 3.02018 48.0657 3.06307C37.3692 3.61761 27.1653 7.81165 19.1608 14.9736C11.1562 22.1355 5.85764 31.812 4.1216 42.3812C3.98733 43.1987 3.23626 43.7776 2.41492 43.6695V43.6695Z" fill="url(#paint0_linear_3492_21017)"/>
<path d="M53.7645 1.4847C53.8154 0.727026 54.4714 0.152188 55.2274 0.223975C66.3809 1.28308 76.871 6.06039 84.9996 13.8091C93.1282 21.5579 98.4017 31.8075 99.993 42.8975C100.101 43.6492 99.558 44.332 98.8037 44.4191V44.4191C98.0493 44.5063 97.3691 43.9648 97.2601 43.2133C95.7434 32.7619 90.7654 23.1048 83.1021 15.7996C75.4389 8.49452 65.5547 3.98403 55.0427 2.96887C54.2869 2.89587 53.7135 2.24238 53.7645 1.4847V1.4847Z" fill="url(#paint1_linear_3492_21017)"/>
<path d="M98.9081 47.0151C99.7349 46.9642 100.449 47.5932 100.475 48.4212C100.666 54.4756 99.756 60.5187 97.784 66.255C95.6494 72.4644 92.3126 78.1926 87.9642 83.1124C83.6158 88.0323 78.341 92.0475 72.4408 94.9288C66.9903 97.5906 61.1048 99.2365 55.0728 99.7905C54.2478 99.8662 53.5358 99.2349 53.4849 98.4081V98.4081C53.4339 97.5812 54.0632 96.8721 54.888 96.7947C60.5268 96.266 66.0279 94.722 71.1244 92.2331C76.6705 89.5247 81.6289 85.7504 85.7164 81.1257C89.8038 76.501 92.9404 71.1165 94.947 65.2797C96.7908 59.916 97.6473 54.2669 97.4793 48.6059C97.4547 47.7778 98.0812 47.0661 98.9081 47.0151V47.0151Z" fill="url(#paint2_linear_3492_21017)"/>
<path d="M48.3268 98.4513C48.2897 99.2789 47.5884 99.922 46.7623 99.8601C40.7218 99.4073 34.8095 97.8602 29.3152 95.2902C23.3676 92.5082 18.0262 88.5819 13.596 83.7356C9.16574 78.8893 5.73345 73.2179 3.49506 67.0451C1.42724 61.3427 0.415703 55.3157 0.505491 49.2589C0.517771 48.4306 1.22112 47.7897 2.04871 47.8268V47.8268C2.87631 47.8639 3.51461 48.565 3.50391 49.3934C3.43081 55.0564 4.38185 60.6904 6.31535 66.0224C8.41944 71.8248 11.6458 77.156 15.8102 81.7115C19.9746 86.267 24.9955 89.9577 30.5863 92.5728C35.7238 94.9759 41.25 96.4275 46.8968 96.8617C47.7228 96.9252 48.3639 97.6237 48.3268 98.4513V98.4513Z" fill="url(#paint3_linear_3492_21017)"/>
<defs>
<linearGradient id="paint0_linear_3492_21017" x1="0.5" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#72C6EF"/>
<stop offset="1" stop-color="#004E8F"/>
</linearGradient>
<linearGradient id="paint1_linear_3492_21017" x1="0.5" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#16A085"/>
<stop offset="1" stop-color="#F4D03F"/>
</linearGradient>
<linearGradient id="paint2_linear_3492_21017" x1="0.5" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#00416A"/>
<stop offset="1" stop-color="#E4E5E6"/>
</linearGradient>
<linearGradient id="paint3_linear_3492_21017" x1="0.5" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#799F0C"/>
<stop offset="1" stop-color="#ACBB78"/>
</linearGradient>
</defs>
</svg>
`;
const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0199 3.01C14.1522 2.34948 13.0904 1.99439 11.9999 2C9.23991 2 6.99991 4.24 6.99991 7C6.99991 9.76 9.23991 12 11.9999 12C14.7599 12 16.9999 9.76 16.9999 7M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#484848" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const right = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.991541 11.0649L0.992658 11.0658C1.14848 11.1946 1.33984 11.25 1.52179 11.25C1.71073 11.25 1.8968 11.1849 2.04436 11.0711L2.04444 11.0712L2.05093 11.0658L6.59914 7.30668C6.59945 7.30643 6.59976 7.30618 6.60007 7.30592C7.01573 6.96858 7.25 6.5018 7.25 5.99928C7.25 5.49427 7.00668 5.0287 6.60098 4.69338L2.05093 0.93275C1.75611 0.689083 1.28747 0.689083 0.992658 0.93275L0.992655 0.932746L0.991541 0.933678C0.844379 1.05675 0.75 1.23402 0.75 1.43115C0.75 1.62827 0.844379 1.80554 0.991541 1.92862L0.991538 1.92862L0.992658 1.92954L5.54271 5.69018C5.65725 5.78484 5.70321 5.89781 5.70321 5.99928C5.70321 6.10075 5.65725 6.21371 5.54271 6.30838L0.992658 10.069L0.992655 10.069L0.991541 10.0699C0.84438 10.193 0.75 10.3703 0.75 10.5674C0.75 10.7645 0.844379 10.9418 0.991541 11.0649Z" fill="#A3A3A3" stroke="#A3A3A3" stroke-width="0.5"/>
</svg>
`;
const member = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.679 3.96C13.159 4.67 13.439 5.52 13.439 6.44C13.429 8.84 11.539 10.79 9.15899 10.87C9.05899 10.86 8.93899 10.86 8.82899 10.87C7.6812 10.831 6.59364 10.3468 5.79662 9.51996C4.99961 8.69308 4.55573 7.58845 4.55899 6.44C4.55899 3.99 6.53899 2 8.99899 2M16.411 4C18.351 4 19.911 5.57 19.911 7.5C19.911 9.39 18.411 10.93 16.541 11C16.4546 10.99 16.3674 10.99 16.281 11M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14M4.15899 14.56C1.73899 16.18 1.73899 18.82 4.15899 20.43C6.90899 22.27 11.419 22.27 14.169 20.43C16.589 18.81 16.589 16.17 14.169 14.56C11.429 12.73 6.91899 12.73 4.15899 14.56Z" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const account = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0976 0.68945L12.1149 0.691163L12.1323 0.691968C12.1987 0.695036 12.3096 0.746252 12.3895 0.894075C12.4692 1.04148 12.4517 1.16214 12.4171 1.22064L12.3824 1.27931L12.3602 1.3438C12.3598 1.34503 12.3594 1.34634 12.359 1.34773C12.3533 1.36638 12.3435 1.39876 12.2099 1.43916C12.1318 1.4628 12.0341 1.48059 11.909 1.49611C11.8474 1.50376 11.7847 1.51023 11.7163 1.51721L11.7061 1.51825C11.6525 1.52371 11.5943 1.52965 11.5366 1.5364C8.15667 1.64796 4.90564 3.53859 3.13151 6.41854C0.652161 10.2312 1.07461 15.6433 4.1855 18.9888C5.02307 19.9839 6.11874 20.681 7.10653 21.3094C7.25239 21.4022 7.39589 21.4935 7.53586 21.5841L7.54801 21.5919L7.56049 21.5992C7.60558 21.6257 7.65465 21.6817 7.64303 21.8192C7.63025 21.9704 7.54673 22.0959 7.46279 22.1475L7.41548 22.1767L7.37364 22.2132C7.34607 22.2373 7.31077 22.2644 7.17027 22.2354C7.00495 22.2012 6.81472 22.1106 6.57672 21.9864C3.92296 20.5099 1.85362 17.9709 1.07915 15.0419L1.07922 15.0419L1.07647 15.0321C0.200432 11.9124 0.743994 8.41451 2.56186 5.73321L2.56193 5.73326L2.56786 5.7242C4.13364 3.33203 6.66225 1.59413 9.4531 0.947072C10.3951 0.76231 11.2555 0.606268 12.0976 0.68945Z" fill="#7566FF" stroke="#7566FF" stroke-width="1.33333"/>
<mask id="path-2-inside-1_3492_20928" fill="white">
<path d="M18.2963 4.53136C19.7476 3.17739 21.0393 1.64901 22.5556 0.371905C23.2177 -0.115878 24.1547 0.909943 23.599 1.51006C22.2925 2.98819 20.8028 4.29486 19.4491 5.72864C20.3683 5.72864 21.2964 5.66952 22.2098 5.79072C22.7861 6.08931 22.8393 7.05304 22.1802 7.28068C20.924 7.44918 19.6501 7.32502 18.385 7.36641C17.8234 7.31024 16.981 7.53787 16.7298 6.85498C16.5938 5.31181 16.6647 3.75386 16.6854 2.20478C16.5967 1.36225 17.8145 1.03706 18.1929 1.77021C18.3791 2.67778 18.2874 3.61196 18.2963 4.53136Z"/>
</mask>
<path d="M18.2963 4.53136C19.7476 3.17739 21.0393 1.64901 22.5556 0.371905C23.2177 -0.115878 24.1547 0.909943 23.599 1.51006C22.2925 2.98819 20.8028 4.29486 19.4491 5.72864C20.3683 5.72864 21.2964 5.66952 22.2098 5.79072C22.7861 6.08931 22.8393 7.05304 22.1802 7.28068C20.924 7.44918 19.6501 7.32502 18.385 7.36641C17.8234 7.31024 16.981 7.53787 16.7298 6.85498C16.5938 5.31181 16.6647 3.75386 16.6854 2.20478C16.5967 1.36225 17.8145 1.03706 18.1929 1.77021C18.3791 2.67778 18.2874 3.61196 18.2963 4.53136Z" fill="#7566FF"/>
<path d="M18.2963 4.53136L16.2964 4.55065L16.3402 9.09154L19.6606 5.99375L18.2963 4.53136ZM22.5556 0.371905L21.3693 -1.23829L21.3169 -1.19971L21.2672 -1.15781L22.5556 0.371905ZM23.599 1.51006L22.1315 0.151224L22.1157 0.16821L22.1004 0.185556L23.599 1.51006ZM19.4491 5.72864L17.9948 4.3556L14.8101 7.72864H19.4491V5.72864ZM22.2098 5.79072L23.1297 4.01486L22.8194 3.85409L22.4729 3.80811L22.2098 5.79072ZM22.1802 7.28068L22.4461 9.26292L22.6442 9.23635L22.8331 9.17112L22.1802 7.28068ZM18.385 7.36641L18.1859 9.35648L18.3179 9.36967L18.4504 9.36534L18.385 7.36641ZM16.7298 6.85498L14.7375 7.03051L14.7608 7.2957L14.8528 7.54553L16.7298 6.85498ZM16.6854 2.20478L18.6852 2.23149L18.6868 2.11315L18.6744 1.99545L16.6854 2.20478ZM18.1929 1.77021L20.1521 1.36823L20.0966 1.0981L19.9702 0.853047L18.1929 1.77021ZM19.6606 5.99375C20.4308 5.27527 21.1637 4.50535 21.8329 3.81969C22.5214 3.11423 23.1657 2.47286 23.844 1.90162L21.2672 -1.15781C20.4291 -0.451946 19.6695 0.309428 18.9702 1.02592C18.2516 1.76223 17.6131 2.43348 16.932 3.06896L19.6606 5.99375ZM23.7419 1.9821C23.4099 2.22669 22.9986 2.28844 22.6566 2.21508C22.361 2.15167 22.1696 2.00459 22.0585 1.88325C21.9482 1.76266 21.813 1.55334 21.7768 1.24071C21.7346 0.876537 21.8451 0.46045 22.1315 0.151224L25.0665 2.8689C26.3232 1.51165 25.652 -0.115022 25.0094 -0.817212C24.3642 -1.52216 22.831 -2.31519 21.3693 -1.23829L23.7419 1.9821ZM22.1004 0.185556C21.4987 0.866377 20.8444 1.51934 20.1421 2.20736C19.4544 2.88114 18.7059 3.60252 17.9948 4.3556L20.9033 7.10168C21.546 6.42098 22.2192 5.77213 22.9414 5.06461C23.649 4.37132 24.3928 3.63188 25.0975 2.83457L22.1004 0.185556ZM19.4491 7.72864C20.5402 7.72864 21.2079 7.67531 21.9466 7.77334L22.4729 3.80811C21.3849 3.66373 20.1964 3.72864 19.4491 3.72864V7.72864ZM21.2898 7.56658C20.8067 7.31633 20.6612 6.87739 20.6584 6.58158C20.655 6.23233 20.8665 5.61846 21.5273 5.39023L22.8331 9.17112C24.153 8.71527 24.6675 7.50571 24.6582 6.54303C24.6494 5.6338 24.1892 4.5637 23.1297 4.01486L21.2898 7.56658ZM21.9143 5.29843C21.4298 5.36342 20.9111 5.37589 20.3011 5.37127C19.7348 5.36698 19.0054 5.34504 18.3196 5.36748L18.4504 9.36534C19.0296 9.34639 19.5698 9.36584 20.2708 9.37115C20.928 9.37614 21.6744 9.36644 22.4461 9.26292L21.9143 5.29843ZM18.584 5.37634C18.4276 5.36069 18.2846 5.35704 18.1755 5.35635C18.069 5.35569 17.9603 5.35793 17.8905 5.35913C17.8096 5.36051 17.7586 5.36101 17.7154 5.36027C17.6737 5.35954 17.6611 5.35785 17.6668 5.3585C17.6724 5.35914 17.7143 5.36402 17.7793 5.3831C17.8458 5.40264 17.9468 5.44006 18.0619 5.5107C18.1806 5.5836 18.299 5.68267 18.4017 5.80886C18.5037 5.93433 18.5682 6.05973 18.6068 6.16442L14.8528 7.54553C15.0672 8.12831 15.4544 8.60354 15.9689 8.91947C16.4381 9.20751 16.9068 9.29789 17.2152 9.33293C17.5199 9.36755 17.8114 9.36107 17.959 9.35854C18.1645 9.35502 18.1882 9.35671 18.1859 9.35648L18.584 5.37634ZM18.722 6.67944C18.5977 5.26869 18.6634 3.86945 18.6852 2.23149L14.6856 2.17807C14.6661 3.63828 14.5898 5.35493 14.7375 7.03051L18.722 6.67944ZM18.6744 1.99545C18.7074 2.30873 18.6128 2.64589 18.4054 2.91089C18.2188 3.14938 17.9904 3.27038 17.8011 3.32315C17.4606 3.41807 16.7628 3.36033 16.4156 2.68738L19.9702 0.853047C19.2446 -0.55305 17.7487 -0.814776 16.7269 -0.529916C15.6799 -0.238025 14.5264 0.798732 14.6964 2.41412L18.6744 1.99545ZM16.2337 2.1722C16.3682 2.82783 16.2847 3.33856 16.2964 4.55065L20.2962 4.51207C20.2902 3.88537 20.39 2.52774 20.1521 1.36823L16.2337 2.1722Z" fill="#7566FF" mask="url(#path-2-inside-1_3492_20928)"/>
<path d="M22.2956 11.1267C22.8542 10.639 23.803 10.9996 23.9745 11.6943C24.4474 18.3045 18.2964 24.4447 11.6903 23.9746C10.7917 23.7381 10.6203 22.3369 11.5189 21.9732C12.6716 21.6954 13.8982 21.7988 15.0214 21.3643C18.79 20.2025 21.6542 16.5515 21.8049 12.599C21.8936 12.0994 21.7872 11.4372 22.2956 11.1267Z" fill="#7566FF"/>
<path d="M7.87711 6.61272C8.10411 5.46508 9.8717 5.29186 10.3927 6.30596C10.549 7.40307 10.4708 8.51823 10.4671 9.62255C12.8524 9.62255 15.2415 9.61895 17.6268 9.62977C17.6305 9.87518 17.6342 10.3696 17.6379 10.6186C15.2489 10.615 12.8599 10.6186 10.4745 10.615C10.5118 12.1596 10.3555 13.7151 10.549 15.2525C11.1072 16.9956 13.9874 17.0858 14.8544 15.5448C15.0591 15.0179 14.9772 14.4441 15.007 13.8955C14.0469 14.2023 12.7631 14.6462 12.0151 13.697C11.1444 12.7695 12.3798 11.5208 13.4367 11.6399C15.3903 11.8348 16.957 14.1517 16.0192 15.9273C14.6721 18.3417 10.3555 18.1793 9.33584 15.5809C8.98604 13.9533 9.22792 12.2715 9.17211 10.6222C8.33483 10.615 7.50127 10.615 6.66399 10.6114C6.65655 10.366 6.64538 9.87157 6.63794 9.62616C7.47894 9.62616 8.32366 9.62255 9.16839 9.61895C9.16466 9.02347 9.16466 8.42439 9.15722 7.82531C8.6809 7.50051 7.88083 7.30563 7.87711 6.61272Z" fill="#484848" stroke="#484848" stroke-width="0.5"/>
</svg>
`;
const review = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.27003 6.42C3.68003 4.52 4.74003 3.47 6.63003 4.09L9.58003 5.06C10.08 5.22 10.83 5.11 11.25 4.8L14.33 2.58C16 1.38 17.33 2.08 17.29 4.13L17.22 7.92C17.21 8.44 17.54 9.13 17.96 9.44L20.44 11.32C22.03 12.52 21.77 13.99 19.87 14.59L16.64 15.6C16.1 15.77 15.53 16.36 15.39 16.91L14.62 19.85C14.01 22.17 12.49 22.4 11.23 20.36L9.47003 17.51C9.15003 16.99 8.39003 16.6 7.79003 16.63L4.45003 16.8C2.06003 16.92 1.38003 15.54 2.94003 13.72L4.92003 11.42C5.11003 11.2 5.24003 10.9 5.31003 10.58M21.91 21.999L18.88 18.969" stroke="#F9BF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const notice = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M7 13H12M7 17H16M19 8C19.7956 8 20.5587 7.68393 21.1213 7.12132C21.6839 6.55871 22 5.79565 22 5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2C18.2044 2 17.4413 2.31607 16.8787 2.87868C16.3161 3.44129 16 4.20435 16 5C16 5.79565 16.3161 6.55871 16.8787 7.12132C17.4413 7.68393 18.2044 8 19 8Z" stroke="#484848" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10" stroke="#6CC644" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const support = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.46005 18.49V15.57C5.46005 14.6 6.22005 13.73 7.30005 13.73C8.27005 13.73 9.14005 14.49 9.14005 15.57V18.38C9.14005 20.33 7.52005 21.95 5.57005 21.95C3.62005 21.95 2.00005 20.32 2.00005 18.38V12.22C1.89005 6.6 6.33005 2.05 11.95 2.05C17.57 2.05 22 6.6 22 12.11V18.27C22 20.22 20.38 21.84 18.43 21.84C16.48 21.84 14.86 20.22 14.86 18.27V15.46C14.86 14.49 15.62 13.62 16.7 13.62C17.67 13.62 18.54 14.38 18.54 15.46V18.49" stroke="#CD30D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const logout = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.56 14.56L4 12L6.56 9.44M9.24 12H4.07M14.24 12H12.28M18.01 6.48C19.25 7.84 20 9.71 20 12C20 17 16.42 20 12 20M12 4C13.05 4 14.05 4.17 14.97 4.49" stroke="#0B3D91" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
