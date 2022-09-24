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
import { useSelector,useDispatch } from "react-redux";
import { primaryColor, textColor, backgroundColor } from "../../assets/colors";
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
import {logOut} from '../../Class/auth'

const Menu = ({ navigation }) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor={primaryColor} />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 20,
          marginHorizontal: 20,
          alignItems: "center",
          marginTop:35
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("VendorProfile");
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
            }}
          >
            <FontAwesome name="user" size={55} color="#983C85" />
          </View>
        </TouchableOpacity>
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
            {vendorInfo &&
            vendorInfo.service &&
            vendorInfo.service.serviceCenterName
              ? vendorInfo.service.serviceCenterName
              : "Easin Arafat It Service"}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 15,
              color: textColor,
              marginTop: -5,
            }}
          >
            {vendorInfo &&
            vendorInfo.service &&
            vendorInfo.service.providerInfo &&
            vendorInfo.service.providerInfo.title
              ? vendorInfo.service.providerInfo.title
              : "Mr" + " "}
            {vendorInfo &&
            vendorInfo.service &&
            vendorInfo.service.providerInfo &&
            vendorInfo.service.providerInfo.name
              ? vendorInfo.service.providerInfo.name
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
      <View style={{ height: 20 }} />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Cart onPress={()=>{
            logOut()
            dispatch({ type: "SET_USER", playload: [] });
            //dispatch({type:'SET_VENDOR_INFO',playload:null})
        }}
          title="Manage Order"
          Icon={() => <SvgXml xml={manageOrder} height="30" width="30" />}
        />
        <Cart
          title="Appointment"
          Icon={() => <SvgXml xml={appointment} height="30" width="30" />}
        />
        <Cart
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
        />
        <Cart
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
        <Cart
          title="Staff & Member"
          Icon={() => <SvgXml xml={notice2} height="30" width="30" />}
        />
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
        <Cart
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
    </ScrollView>
  );
};

export default Menu;
const Cart = ({ title, Icon,onPress }) => {
  return (
    <TouchableOpacity onPress={() =>{
        if(onPress){
            onPress();
        }
    }}>
      <View
        style={{
          width: width / 2 - 30,
          height: 90,
          backgroundColor: primaryColor,
          borderRadius: 5,
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          shadowColor: "blue",
          elevation: 3,
          padding: 10,
          margin: 10,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <View style={{ height: 10 }} />
        <Icon />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Poppins-Medium",
            marginTop: 5,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
