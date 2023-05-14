import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Menu } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import Avatar from "../../../components/Avatar";
import IconButton from "../../../components/IconButton";
import { useIsFocused } from "@react-navigation/native";
import { getOfflineMembers, getOnlineUser } from "../../../Class/member";
import { Color } from "../../../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../../components/Input";

export default function CreateVendorAppointment({ navigation, route }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabBar title={"Select Member"} navigation={navigation} />
      <Screen navigation={navigation} />
    </SafeAreaView>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Select Member" component={Screen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const Screen = ({ navigation, route }) => {
  const name = route?.name;
  const isFocused = useIsFocused();
  const [Data, setData] = React.useState();
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [Loader, setLoader] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const [AllData, setAllData] = useState([]);
  const backgroundColor = colors.getBackgroundColor();
  const [searchKey, setSearchKey] = useState();

  React.useEffect(() => {
    //console.log(name)
    if (user && vendor) {
      setLoader(true);
      getOnlineUser(user.token, vendor.service.id)
        .then((res) => {
          setData(res.members);
          setAllData(res.members);
          setLoader(false);
          //console.log(res.members)
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
    }
  }, [user, vendor]);
  useEffect(() => {
    if (searchKey) {
      let arr = AllData?.filter((d) =>
        d.user.name.toUpperCase().match(searchKey.toUpperCase())
      );
      setData(arr);
    } else {
      setData(AllData);
    }
  }, [searchKey]);
  const icon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74363 1.33398C4.20476 1.33398 1.33594 4.13945 1.33594 7.60016C1.33594 11.0609 4.20476 13.8663 7.74363 13.8663C9.25789 13.8663 10.6495 13.3527 11.7461 12.4938L13.8309 14.5273L13.8863 14.5739C14.0797 14.7139 14.3538 14.6979 14.5288 14.5264C14.7212 14.3377 14.7208 14.0321 14.5279 13.8439L12.4673 11.8341C13.5131 10.719 14.1513 9.23247 14.1513 7.60016C14.1513 4.13945 11.2825 1.33398 7.74363 1.33398ZM7.74105 2.29883C10.7348 2.29883 13.1618 4.67217 13.1618 7.59984C13.1618 10.5275 10.7348 12.9009 7.74105 12.9009C4.74726 12.9009 2.32031 10.5275 2.32031 7.59984C2.32031 4.67217 4.74726 2.29883 7.74105 2.29883Z" fill="#767676"/>
  </svg>
  `;

  if (Loader) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ActivityIndicator size={"small"} color={backgroundColor} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Input
        onChange={setSearchKey}
        value={searchKey}
        containerStyle={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
          backgroundColor: "#E6E6E6",
          borderRadius: 4,
          height: 40,
          paddingRight: 20,
          marginTop: 24,
          marginBottom: 8,
        }}
        style={{
          flex: 1,
          borderBottomWidth: 0,
          backgroundColor: "#E6E6E6",
          paddingLeft: 0,
          height: 40,
        }}
        rightIcon={<SvgXml xml={icon} />}
        placeholder={"Type name"}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {Data &&
          Data.map((doc, i) => (
            <Cart
              key={i}
              onPress={() => {
                navigation.navigate("AppointmentForm", { data: doc });
              }}
              name={doc.user ? `${doc.user.name}` : `${doc.name}`}
              gender={doc.user ? doc.user.gender : doc.gender}
              image={doc.user ? doc.user.profilePhoto : doc.profilePhoto}
              username={
                doc.name
                  ? `@${doc.name.replace(" ", "").toLowerCase()}`
                  : doc.user
                  ? `@${doc.user.name.toLowerCase()}`
                  : `@invalid`
              }
            />
          ))}
      </ScrollView>
    </View>
  );
};
const TabBar = ({
  state,
  descriptors,
  navigation,
  position,
  onClick,
  onPress,
  title,
}) => {
  const ref = React.useRef();
  const packages = useSelector((state) => state.packages);

  const dispatch = useDispatch();

  const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#E9E6E6",
        borderBottomWidth: 0,
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 18,
      }}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <SvgXml xml={icon} />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flex: 1,
          paddingRight: 40,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <Pressable
          onPress={() => {
            //navigation.navigate(doc.name);
          }}
          style={{
            borderBottomColor: "#707070",
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 5,
            height: 40,
            justifyContent: "center",
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
            }}>
            {title}

            {/* {packages[state.index].name+" "+packages[state.index].price+"৳"} */}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const Cart = ({ image, name, gender, username, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        marginTop: 24,
      }}>
      <Avatar
        source={{ uri: image }}
        style={{
          width: 40,
          height: 40,
          marginBottom: 12,
        }}
      />
      <View
        style={{
          flex: 1,
          marginLeft: 16,
          borderBottomColor: "#E6E6E6",
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: "400",
            marginBottom: 12,
          }}>
          {name ? `${name}` : "Easin Arafat (Male)"}
        </Text>
      </View>
    </Pressable>
  );
};
