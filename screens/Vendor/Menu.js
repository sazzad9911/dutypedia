import React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
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
  notice,
  notice2,
  wallet,
  review,
  support,
} from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import { logOut, logoutVendor } from "../../Class/auth";
import Button from "./../../components/Button";
import IconButton from "../../components/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
     <StatusBar barStyle="dark-content" backgroundColor={primaryColor}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: secondaryColor }}
      >
        <TouchableOpacity
          style={{ marginTop: 0 }}
          onPress={() => {
            navigation.navigate("VendorProfile");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              marginHorizontal: 20,
              alignItems: "center",
              marginTop: 35,
            }}
          >
            <View
              style={{
                height: 65,
                width: 65,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: textColor,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {vendor && vendor.service.profilePhoto && (
                <Image
                  source={{ uri: vendor.service.profilePhoto }}
                  style={{ width: 65, height: 65 }}
                />
              )}
              {vendor && !vendor.service.profilePhoto && (
                <FontAwesome name="user" size={55} color="#983C85" />
              )}
            </View>

            <View
              style={{
                flex: 5,
                marginLeft: 15,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 20,
                  margin: 0,
                  color: textColor,
                }}
              >
                {vendor && vendor.service && vendor.service.serviceCenterName
                  ? vendor.service.serviceCenterName
                  : "Easin Arafat It Service"}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 15,
                  color: textColor,
                }}
              >
                {vendor &&
                vendor.service &&
                vendor.service.providerInfo &&
                vendor.service.providerInfo.title
                  ? vendor.service.providerInfo.title + " "
                  : "Mr" + " "}
                {vendor &&
                vendor.service &&
                vendor.service.providerInfo &&
                vendor.service.providerInfo.name
                  ? vendor.service.providerInfo.name
                  : "Easin Arafat"}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins-Light",
                  color: "#707070",
                }}
              >
                See Your Profile
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {/* <Cart
            onPress={() => {}}
            title="Manage Order"
            Icon={() => <SvgXml xml={manageOrder} height="30" width="30" />}
          /> */}
          {/* <Cart
            onPress={() => {
              navigation.navigate("VendorAppointmentList");
            }}
            title="Appointment"
            Icon={() => <SvgXml xml={appointment} height="30" width="30" />}
          /> */}
          {/* <Cart
            onPress={() => {
              navigation.navigate("Expenses");
            }}
            title="Expenses"
            Icon={() => (
              <Image
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                }}
                source={require("../../assets/newIcon/expenses.png")}
              />
            )}
          /> */}
          <Cart
            onPress={() => {
              navigation.navigate("UserNotice");
            }}
            title="Notice"
            Icon={() => (
              <Image
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                }}
                source={require("../../assets/newIcon/notice.png")}
              />
            )}
          />
          <Cart
            onPress={() => {
              navigation.navigate("Member");
            }}
            title="Member"
            Icon={() => (
              <Image
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                }}
                source={require("../../assets/newIcon/member.png")}
              />
            )}
          />
          {/* <Cart
            title="Staff & Member"
            Icon={() => <SvgXml xml={notice2} height="30" width="30" />}
          /> */}
          <Cart
            title="Account Balance"
            Icon={() => (
              <Image
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                }}
                source={require("../../assets/newIcon/wallet.png")}
              />
            )}
          />
          <Cart
            title="Customer Review"
            Icon={() => <SvgXml xml={review} height="30" width="30" />}
          />
          <Cart onPress={()=>{
            navigation.navigate("Support")
          }}
            title="Support"
            Icon={() => (
              <Image
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                }}
                source={require("../../assets/newIcon/support.png")}
              />
            )}
          />
        </View>
        <IconButton
          style={{
            borderWidth: 0,
            marginHorizontal: 20,
            marginVertical: 10,
            height: 45,
            backgroundColor: primaryColor,
            color: textColor,
            borderRadius: 5,
          }}
          onPress={() => {
            logoutVendor();
            dispatch({ type: "SET_VENDOR", playload: false });
          }}
          title="Logout From Dashboard"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
const Cart = ({ title, Icon, onPress }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <View
        style={{
          width: width / 2 - 30,
          height: 95,
          backgroundColor: primaryColor,
          borderRadius: 5,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          shadowColor: "#1E2CDA",
          elevation: 1,
          padding: 10,
          margin: 10,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <View style={{ height: 10, flex: 1 }} />
        <Icon />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 14,
            fontFamily: "Poppins-Medium",
            marginTop: 5,
            flex: 1,
            color: textColor,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
