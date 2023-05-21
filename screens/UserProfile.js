import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { Color, primaryColor } from "../assets/colors";
const { width, height } = Dimensions.get("window");
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { OrderCart, OrderCartOffline } from "./Vendor/Order";
import {
  NavigationContainer,
  DefaultTheme,
  useIsFocused,
} from "@react-navigation/native";
import NewTab from "./Vendor/components/NewTab";
import { FontAwesome } from "@expo/vector-icons";
import { DataTable, FAB } from "react-native-paper";
import NewTabe from "./Vendor/components/NewTabe";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { user } from "../assets/icon";
import { getOrders } from "../Class/service";
import ActivityLoader from "../components/ActivityLoader";
import Avatar from "../components/Profile/Avatar";
import SquireCart from "../components/Profile/SquireCart";
import FlatCart from "../components/Profile/FlatCart";
import { allTimeConverter, dateDifference, serverTimeToLocalDate, timeConverter } from "../action";

const Tab = createMaterialTopTabNavigator();

export default function UserProfile({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const assentColor = colors.getAssentColor();
  const user = route.params.user;
  const ref = React.useRef();
  const vendor = useSelector((state) => state.vendor);
  const inset = useSafeAreaInsets();
  //console.log(user)
  const ViewBox = ({ Icon, title, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress ? onPress : null}
        style={{
          width: width / 4 - 20,
          height: width / 4 - 30,
          backgroundColor: primaryColor,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}>
        <SvgXml xml={Icon} height="22" width="22" />
        {title && (
          <Text
            style={{
              fontSize: width > 350 ? 10 : 8,
              color: textColor,
              fontFamily: "Poppins-Medium",
              marginTop: 8,
            }}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset?.top,
        alignItems: "center",
        backgroundColor: "#F2F2F6",
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
          }}>
          <Avatar
            containerStyle={{ marginTop: 12 }}
            edit={false}
            source={
              user.user?.profilePhoto ? { uri: user.user.profilePhoto } : null
            }
          />
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 40,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 32,
              fontWeight: "500",
              flex: 1,
            }}>
            {user
              ? `${user.user.name}`
              : `Invalid user`}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
            }}>
            {" "}
            {user ? `${user.user.gender.toUpperCase()}` : `Invalid`}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 4,
              fontWeight: "400",
              
            }}>
            Last seen{" "}
            {dateDifference(user?.user?.lastSeen,new Date())==0?"today":serverTimeToLocalDate(user?.user?.lastSeen)}
            {" "}
            {timeConverter(user?.user?.lastSeen)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
          }}>
          <SquireCart
            onPress={() => {
              navigation.navigate("MemberOrderList", {
                userId: user?.user?.id,
              });
            }}
            title={"Your Order"}
            icon={cart}
          />
          <SquireCart
            onPress={() => {
              navigation.navigate("MemberAppointment", {
                user: user.user,
                offline: false,
              });
            }}
            style={{
              marginHorizontal: 24,
            }}
            title={"Appointment"}
            icon={calender}
          />
          <SquireCart
            onPress={() => {
              let newUser = {
                userId: user.user.id,
                user: user.user,
              };
              navigation.navigate("ChatScreen", {
                data: {
                  users: [newUser],
                },
                username: user.user.username,
              });
            }}
            title={"Message"}
            icon={love}
          />
        </View>
        <View style={styles.subContainer}>
          <FlatCart
            onPress={() => {
              //navigation.navigate("Mobile");
            }}
            style={{ paddingTop: 0 }}
            icon={call}
            title={"Phone"}
            value={user?.user?.hidePhone?"Private":user?.user?.phone}
            type={"Private"}
            disableGo={true}
            Private={user?.user?.hidePhone}
          />
          <FlatCart
            onPress={() => {
              //navigation.navigate("Email");
            }}
            icon={email}
            title={"Email"}
            value={user?.user?.hideEmail?"Private":(user?.user?.email?user?.user?.email:"No email added")}
            type={"Private"}
            disableGo={true}
            Private={user?.user?.hideEmail}
          />
          <FlatCart
            onPress={() => {
              //console.log(user?.user)
              //navigation.navigate("UserLocation");
            }}
            icon={location}
            title={"Address"}
            value={user?.user?.hideAddress?"Private":user?.user?.address?`${user?.user?.address.division}, ${user?.user?.address.district}, ${user?.user?.address?.thana}${user?.user?.address.address?", ":""}${user?.user?.address.address?user?.user?.address.address:""}`:"No address added!"}
            type={"Private"}
            disableGo={true}
            style={{ borderBottomWidth: 0, paddingBottom: 0 }}
            Private={user?.user?.hideAddress}
          />
        </View>
        <View style={[styles.subContainer, { marginBottom: 20 }]}>
          <FlatCart
            onPress={() => {
              navigation.navigate("Note", { user: user });
            }}
            icon={noteIcon}
            title={"Note"}
            value={"Your remember lists"}
            type={""}
            style={{ borderBottomWidth: 0, paddingTop: 0, paddingBottom: 0 }}
          />
        </View>
      </ScrollView>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F2F2F6",
        }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              width: 90,
              height: 90,
              borderColor: textColor,
              borderWidth: 1,
              borderRadius: 45,
              marginVertical: 10,
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}>
            {user && user.user.profilePhoto ? (
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                }}
                source={{ uri: user.user.profilePhoto }}
              />
            ) : (
              <FontAwesome name="user" size={70} color={assentColor} />
            )}
          </View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-SemiBold",
              color: textColor,
            }}>
            {user
              ? `${user.user.name}`
              : `Invalid user`}
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}>
              {" "}
              {user ? `(${user.user.gender.toUpperCase()})` : `Invalid`}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}>
            Last seen today 12:00 pm
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginVertical: 20,
            justifyContent: "center",
          }}>
          {/* <ViewBox Icon={callIcon} title="Call" /> */}
          <ViewBox
            onPress={() => {
              let newUser = {
                userId: user.user.id,
                user: user.user,
              };
              navigation.navigate("ChatScreen", {
                data: {
                  users: [newUser],
                },
                username: user.user.username,
              });
            }}
            Icon={chatIcon}
            title="Chat"
          />
          <ViewBox
            onPress={() => {
              navigation.navigate("MemberAppointment", {
                user: user.user,
                offline: false,
              });
            }}
            Icon={calenderIcon}
            title="Appointment"
          />
          <ViewBox Icon={threeDot} title="" />
        </View>
        <View
          style={{
            backgroundColor: primaryColor,
            borderRadius: 10,
            marginHorizontal: 20,
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: "#E2E2E2",
              paddingBottom: 8,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}>
              User Name
            </Text>
            <Text
              style={{
                color: "#6366F1",
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                marginTop: 3,
              }}>
              @{user ? `${user.user.username}` : "invalid"}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: "#E2E2E2",
              paddingBottom: 8,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginTop: 10,
              }}>
              Mobile
            </Text>
            <Text
              style={{
                color: "#6366F1",
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                marginTop: 3,
              }}>
              N/A
            </Text>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                top: -30,
                zIndex: 100,
              }}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 0,
              borderBottomColor: "#E2E2E2",
              paddingBottom: 5,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginTop: 10,
              }}>
              Email
            </Text>
            <Text
              style={{
                color: "#6366F1",
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                marginTop: 3,
              }}>
              {user ? `${user.user.email}` : "invalid"}
            </Text>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                top: -25,
                zIndex: 100,
              }}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: primaryColor,
            borderRadius: 10,
            marginHorizontal: 20,
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Note", { user: user });
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <View
              style={{
                backgroundColor: "#03D303",
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}>
              <SvgXml xml={noteIcon} height="24" width={"24"} />
            </View>
            <View
              style={{
                marginLeft: 10,
                borderColor: "#E2E2E2",
                borderBottomWidth: 0.5,
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                  marginBottom: 6,
                }}>
                Note
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: "#333333",
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}>
              <SvgXml xml={addressIcon} height="24" width={"24"} />
            </View>
            <View
              style={{
                marginLeft: 10,
                borderColor: "#E2E2E2",
                borderBottomWidth: 0.5,
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                  marginBottom: 6,
                }}>
                Address
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WebViews", {
                url: "https://duty.com.bd/about",
                title: "About Us",
              });
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: "#333333",
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}>
              <SvgXml xml={addressIcon} height="24" width={"24"} />
            </View>
            <View
              style={{
                marginLeft: 10,
                borderColor: "#E2E2E2",
                borderBottomWidth: 0,
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                  marginBottom: 6,
                }}>
                About Us
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            height: 30,
            backgroundColor: primaryColor,
            marginVertical: 20,
          }}
        >
          <ScrollView ref={ref} showsHorizontalScrollIndicator={false} horizontal={true}>
            {initialState.map((doc, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  if(SliderRef){
                    setActive(i);
                    SliderRef.snapToItem(i,true)
                  }
                }}
                style={{
                  height: "100%",
                  width: 90,
                  paddingVertical:5,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginBottom: 5,
                  }}
                >
                  {doc.title}
                </Text>
                {i == Active && (
                  <View
                    style={{
                      backgroundColor: "#AC5DCB",
                      height: 2,
                      width: "50%",
                    }}
                  ></View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */}
        <View style={{ height: 20 }} />
        <View style={{ minHeight: 500 }}>
          <TabBar userId={user.user.id} />
        </View>
      </ScrollView>
      {vendor && (
        <FAB
          color="#FFFFFF"
          icon="plus"
          style={{
            position: "absolute",
            borderRadius: 30,
            backgroundColor: "#43B05C",
            bottom: 20,
            right: 20,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("VendorServiceList", { userId: user.user.id });
          }}
        />
      )}
    </SafeAreaView>
  );
}
export const MemberOrderList = ({ navigation, route }) => {
  const userId = route?.params?.userId;
  const inset=useSafeAreaInsets()
  const vendor=useSelector(state=>state.vendor)
  return (
    <View style={{
      paddingTop:inset?.top,
      flex:1
    }}>
      <TabBar userId={userId} />
      {vendor && (
        <FAB
          color="#FFFFFF"
          icon="plus"
          style={{
            position: "absolute",
            borderRadius: 30,
            backgroundColor: "#43B05C",
            bottom: 20,
            right: 20,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("VendorServiceList", { userId: userId });
          }}
        />
      )}
    </View>
  );
};
const emptyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="143.873" height="144" viewBox="0 0 143.873 144">
<g id="_8022669" data-name="8022669" transform="translate(-0.143)">
  <g id="_379df1ff" data-name="#379df1ff">
    <path id="Path_20035" data-name="Path 20035" d="M63.7,0h16.88A133.612,133.612,0,0,1,99.9,1.924a75.4,75.4,0,0,1,15.352,4.323,46.545,46.545,0,0,1,12.984,8.41,36.391,36.391,0,0,1,6.512,7.555,47.927,47.927,0,0,1,5.263,11.634,58.661,58.661,0,0,1,2.745,11.395c.757,5.372,1.021,10.793,1.257,16.207V82.314a147.789,147.789,0,0,1-1.615,18.514,74.322,74.322,0,0,1-3.032,11.026,40.293,40.293,0,0,1-9.057,15.378,48.332,48.332,0,0,1-13.2,9.6,62.111,62.111,0,0,1-14.455,4.624,117.854,117.854,0,0,1-20.522,2.408c-4.4.225-8.815.062-13.223.132a143.215,143.215,0,0,1-22.19-1.561c-8.157-1.429-16.461-3.328-23.56-7.792-5.794-3.69-11.1-8.43-14.542-14.444-2.686-4.593-4.292-9.7-5.755-14.787A65.146,65.146,0,0,1,1.122,95.352C.34,87.7.166,79.988.143,72.3c.008-6.773.138-13.552.672-20.306a70.732,70.732,0,0,1,2.4-14.556,68.933,68.933,0,0,1,4.14-11.265,36.508,36.508,0,0,1,7.415-10.247A48.076,48.076,0,0,1,27.678,6.877,64.255,64.255,0,0,1,42.437,2.346,123.27,123.27,0,0,1,63.7,0m4.621,30.418A20.948,20.948,0,0,0,51.362,48.352,46.756,46.756,0,0,0,51.193,54c-4.132.02-8.267-.028-12.4.025a5.986,5.986,0,0,0-5.569,5.879q-.008,20.4.008,40.806a13.708,13.708,0,0,0,13.158,13.158q25.754.025,51.511,0a13.531,13.531,0,0,0,12.433-8.919c.956-2.534.714-5.277.743-7.927q-.008-18.573-.008-37.149a6.055,6.055,0,0,0-5.862-5.868c-4.034-.017-8.067,0-12.1-.008a36.724,36.724,0,0,0-.338-6.717A20.942,20.942,0,0,0,68.323,30.418Z" fill="#379df1"/>
    <path id="Path_20036" data-name="Path 20036" d="M65.291,37.731a14.95,14.95,0,0,1,21.33,9.527A25.455,25.455,0,0,1,87.113,54q-14.966.008-29.928,0a27.032,27.032,0,0,1,.411-6.43A14.981,14.981,0,0,1,65.291,37.731Z" fill="#379df1"/>
    <path id="Path_20037" data-name="Path 20037" d="M53.278,63.182A2.982,2.982,0,0,1,57.1,65.528c.138,1.5-.02,3.013.1,4.515a14.954,14.954,0,0,0,29.442,2.512c.588-2.2.388-4.484.458-6.731a2.973,2.973,0,0,1,5.938.267,45.369,45.369,0,0,1-.107,5.533,20.959,20.959,0,0,1-40.8,3.6,27.418,27.418,0,0,1-.92-9.437A2.956,2.956,0,0,1,53.278,63.182Z" fill="#379df1"/>
  </g>
  <g id="_ffffffff" data-name="#ffffffff">
    <path id="Path_20038" data-name="Path 20038" d="M68.323,30.418A20.942,20.942,0,0,1,92.77,47.286,36.724,36.724,0,0,1,93.107,54c4.034.011,8.067-.008,12.1.008a6.055,6.055,0,0,1,5.862,5.868q.03,18.573.008,37.149c-.028,2.65.214,5.392-.743,7.927A13.531,13.531,0,0,1,97.9,113.874q-25.754.017-51.511,0a13.708,13.708,0,0,1-13.158-13.158q-.042-20.4-.008-40.806a5.986,5.986,0,0,1,5.569-5.879c4.132-.053,8.267-.006,12.4-.025a46.756,46.756,0,0,1,.169-5.651A20.948,20.948,0,0,1,68.323,30.418m-3.032,7.313a14.981,14.981,0,0,0-7.7,9.842A27.032,27.032,0,0,0,57.185,54q14.966.008,29.928,0a25.455,25.455,0,0,0-.492-6.745,14.95,14.95,0,0,0-21.33-9.527M53.278,63.182a2.956,2.956,0,0,0-2.062,2.6,27.418,27.418,0,0,0,.92,9.437,20.954,20.954,0,0,0,40.8-3.6,45.369,45.369,0,0,0,.107-5.533,2.973,2.973,0,0,0-5.938-.267c-.07,2.247.129,4.534-.458,6.731A14.954,14.954,0,0,1,57.2,70.042c-.121-1.5.037-3.013-.1-4.515A2.982,2.982,0,0,0,53.278,63.182Z" fill="#fff"/>
  </g>
</g>
</svg>
`;
const addressIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12.37" height="15.451" viewBox="0 0 12.37 15.451">
<g id="_faa636ff" data-name="#faa636ff" transform="translate(-15.986 -3.991)">
  <path id="Path_20030" data-name="Path 20030" d="M21.072,4.1a6.116,6.116,0,0,1,4.913,1.232,6.214,6.214,0,0,1,2.352,5.307A10.291,10.291,0,0,1,26.7,14.973a15.194,15.194,0,0,1-3.492,3.98c-.394.259-.871.65-1.367.419a7.031,7.031,0,0,1-1.879-1.445,16.314,16.314,0,0,1-3.184-4.55,7.075,7.075,0,0,1-.706-4.212,6.263,6.263,0,0,1,5-5.07m.387,2.561a3.092,3.092,0,1,0,2.777.7A3.1,3.1,0,0,0,21.458,6.656Z" fill="#faa636"/>
</g>
</svg>
`;
const noteIcon = `<svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="32" rx="4" fill="#65C466"/>
<path d="M9.36084 5.15848C9.57747 5.04475 9.82797 4.99106 10.0797 5.00441C10.3315 5.01775 10.5729 5.0975 10.7725 5.23328C10.9211 5.3375 11.0419 5.4692 11.1263 5.61906C11.2106 5.76893 11.2566 5.93329 11.2608 6.1005C12.0904 6.1005 12.9201 6.1005 13.7513 6.1005C13.7513 5.80863 13.883 5.52871 14.1175 5.32233C14.3519 5.11594 14.6699 5 15.0015 5C15.3331 5 15.6512 5.11594 15.8856 5.32233C16.1201 5.52871 16.2518 5.80863 16.2518 6.1005C17.0815 6.10938 17.9126 6.1005 18.7423 6.1005C18.7463 5.94039 18.7884 5.78279 18.8661 5.63796C18.9438 5.49314 19.0552 5.36433 19.1932 5.25991C19.4044 5.10424 19.668 5.01417 19.9432 5.00363C20.2184 4.99308 20.4899 5.06266 20.7157 5.20159C20.8783 5.3046 21.0116 5.43937 21.105 5.59534C21.1985 5.75131 21.2496 5.92422 21.2544 6.1005C22.2477 6.1005 23.2003 6.4478 23.9026 7.06601C24.605 7.68421 24.9995 8.52267 24.9995 9.39694C24.9995 14.1371 24.9995 18.8776 24.9995 23.6186C25.006 23.9862 24.9447 24.3522 24.818 24.7026C24.6231 25.2284 24.282 25.7029 23.8257 26.0831C23.3693 26.4633 22.8123 26.7371 22.2051 26.8795C21.6304 26.9844 21.0422 27.021 20.4564 26.9885H9.72527C9.12304 27.0173 8.51904 26.9901 7.9233 26.9074C7.37624 26.7962 6.86416 26.5792 6.42418 26.2722C5.9842 25.9652 5.62735 25.5758 5.37951 25.1324C5.12876 24.6777 5.00013 24.1784 5.00356 23.6731C5.00356 19.0361 5.00356 14.3995 5.00356 9.76336C4.99313 9.48737 5.00565 9.21109 5.04101 8.93671C5.16328 8.17209 5.5888 7.47016 6.24232 6.95504C6.93149 6.40837 7.82386 6.10221 8.75155 6.09416C8.75324 5.9062 8.80959 5.72176 8.91524 5.5584C9.02089 5.39505 9.17232 5.25824 9.35508 5.16102M7.50701 9.39694C7.50701 14.1557 7.50701 18.9148 7.50701 23.6743C7.50431 23.874 7.5635 24.0705 7.67822 24.2427C7.79294 24.415 7.95885 24.5564 8.15809 24.6519C8.39099 24.7592 8.65371 24.8063 8.91575 24.7875C13.0325 24.7875 17.1487 24.7875 21.2645 24.7875C21.594 24.7819 21.9076 24.6621 22.1374 24.4541C22.3671 24.2462 22.4945 23.9669 22.4918 23.6769C22.4918 18.9165 22.4918 14.1565 22.4918 9.39694C22.4884 9.10643 22.356 8.82861 22.1229 8.62293C21.8897 8.41726 21.5744 8.30007 21.2443 8.29644C21.2443 8.6768 21.2443 9.06984 21.2443 9.45654C21.2287 9.74324 21.0862 10.0132 20.8472 10.2085C20.6083 10.4038 20.2919 10.509 19.966 10.5016C19.64 10.4941 19.3302 10.3746 19.1032 10.1686C18.8761 9.9626 18.7496 9.68651 18.751 9.39948C18.751 9.03307 18.751 8.66665 18.751 8.30024C17.9213 8.30024 17.0916 8.30024 16.2619 8.30024C16.2374 8.6806 16.2619 9.06857 16.249 9.45146C16.238 9.7357 16.102 10.0051 15.8696 10.2027C15.6373 10.4004 15.3268 10.5109 15.0037 10.5109C14.6806 10.5109 14.3701 10.4004 14.1378 10.2027C13.9054 10.0051 13.7694 9.7357 13.7585 9.45146C13.7455 9.0711 13.7685 8.6844 13.7484 8.30024C12.9172 8.30785 12.0876 8.30024 11.2564 8.30024C11.2564 8.66665 11.2564 9.03434 11.2564 9.40202C11.2548 9.68819 11.1263 9.96249 10.8983 10.1665C10.6703 10.3705 10.3608 10.4881 10.0357 10.4942C9.71066 10.5003 9.39574 10.3945 9.15803 10.1992C8.92032 10.004 8.7786 9.73478 8.76307 9.44893C8.76307 9.06857 8.76307 8.68187 8.76307 8.29771C8.43164 8.29902 8.11412 8.41506 7.8791 8.62074C7.64407 8.82643 7.51041 9.10524 7.50701 9.39694Z" fill="#666666"/>
<path d="M11.0881 16.0038C13.6232 15.9784 16.1598 16.0038 18.695 15.9924C18.8633 15.9827 19.032 16.0032 19.1911 16.0525C19.3502 16.1017 19.4963 16.1789 19.6207 16.2792C19.7451 16.3794 19.8451 16.5008 19.9147 16.636C19.9844 16.7712 20.0222 16.9174 20.026 17.0658C20.0298 17.2142 19.9995 17.3618 19.9368 17.4996C19.8741 17.6374 19.7804 17.7626 19.6613 17.8677C19.5422 17.9728 19.4001 18.0557 19.2437 18.1112C19.0873 18.1667 18.9198 18.1938 18.7512 18.1909C16.2544 18.1909 13.7577 18.1909 11.261 18.1909C10.9429 18.1932 10.6358 18.0886 10.4025 17.8983C10.1692 17.708 10.0273 17.4465 10.0058 17.1672C9.98427 16.8879 10.0848 16.6119 10.2868 16.3957C10.4887 16.1794 10.7769 16.0392 11.0924 16.0038H11.0881Z" fill="#666666"/>
<path d="M11.0995 20.4033C12.6335 20.3817 14.169 20.4033 15.7088 20.3944C16.0629 20.3618 16.4209 20.3937 16.7603 20.4882C17.0187 20.5891 17.2305 20.7641 17.3612 20.9847C17.4918 21.2052 17.5337 21.4583 17.4798 21.7025C17.426 21.9467 17.2796 22.1675 17.0647 22.329C16.8498 22.4906 16.579 22.5831 16.2965 22.5916C14.6559 22.5992 13.0167 22.5916 11.376 22.5916C11.1109 22.606 10.8469 22.5513 10.6169 22.4344C10.3963 22.3161 10.2227 22.1405 10.1202 21.9318C10.0176 21.7231 9.99114 21.4915 10.0444 21.269C10.0976 21.0464 10.228 20.8439 10.4175 20.6894C10.6069 20.5348 10.8462 20.4357 11.1024 20.4058L11.0995 20.4033Z" fill="#666666"/>
<path d="M7.50536 9.39819C7.50761 9.10691 7.63978 8.82807 7.87338 8.62175C8.10697 8.41543 8.4233 8.29814 8.75421 8.29515C8.75421 8.67551 8.75421 9.06347 8.75421 9.44637C8.76975 9.73222 8.91147 10.0014 9.14918 10.1967C9.38689 10.3919 9.7018 10.4977 10.0268 10.4916C10.3519 10.4855 10.6614 10.3679 10.8894 10.1639C11.1174 9.95993 11.246 9.68563 11.2476 9.39946C11.2476 9.03178 11.2476 8.66537 11.2476 8.29769C12.0773 8.29769 12.9084 8.29769 13.7395 8.29769C13.7582 8.67804 13.7395 9.06601 13.7496 9.4489C13.7606 9.73314 13.8966 10.0025 14.1289 10.2002C14.3613 10.3978 14.6717 10.5083 14.9949 10.5083C15.318 10.5083 15.6284 10.3978 15.8608 10.2002C16.0931 10.0025 16.2291 9.73314 16.2401 9.4489C16.2545 9.06854 16.2286 8.68058 16.2531 8.29769C17.0827 8.30783 17.9124 8.29769 18.7421 8.29769C18.7421 8.6641 18.7421 9.03051 18.7421 9.39692C18.7408 9.68395 18.8672 9.96003 19.0943 10.166C19.3214 10.372 19.6311 10.4916 19.9571 10.499C20.2831 10.5065 20.5994 10.4013 20.8384 10.2059C21.0773 10.0106 21.2199 9.74069 21.2355 9.45398C21.2456 9.07362 21.2355 8.68058 21.2355 8.29388C21.5655 8.29751 21.8809 8.4147 22.114 8.62038C22.3471 8.82605 22.4795 9.10387 22.4829 9.39438C22.4829 14.1548 22.4829 18.9148 22.4829 23.6743C22.4856 23.9641 22.3585 24.2432 22.129 24.4511C21.8996 24.659 21.5863 24.779 21.2571 24.785C17.1404 24.785 13.0241 24.785 8.90833 24.785C8.64628 24.8037 8.38356 24.7567 8.15067 24.6493C7.95142 24.5539 7.78552 24.4124 7.6708 24.2402C7.55608 24.0679 7.49689 23.8714 7.4996 23.6718C7.4996 18.9122 7.4996 14.1531 7.4996 9.39438M11.0791 16.0012C10.7636 16.0367 10.4754 16.1768 10.2734 16.3931C10.0714 16.6094 9.97091 16.8853 9.99243 17.1647C10.014 17.444 10.1559 17.7055 10.3892 17.8958C10.6225 18.086 10.9296 18.1907 11.2476 18.1883C13.7443 18.1883 16.2411 18.1883 18.7378 18.1883C18.9064 18.1912 19.074 18.1641 19.2304 18.1086C19.3868 18.0531 19.5288 17.9703 19.6479 17.8652C19.767 17.7601 19.8608 17.6348 19.9234 17.497C19.9861 17.3592 20.0165 17.2117 20.0127 17.0633C20.0089 16.9148 19.971 16.7686 19.9014 16.6334C19.8317 16.4982 19.7317 16.3769 19.6073 16.2766C19.483 16.1763 19.3369 16.0992 19.1778 16.0499C19.0187 16.0006 18.8499 15.9802 18.6816 15.9898C16.1465 15.9974 13.6099 15.9759 11.0747 16.0012M11.0877 20.3969C10.8316 20.4268 10.5923 20.5258 10.4028 20.6804C10.2133 20.835 10.083 21.0375 10.0298 21.26C9.9765 21.4826 10.003 21.7142 10.1055 21.9229C10.2081 22.1316 10.3816 22.3072 10.6023 22.4255C10.8323 22.5424 11.0963 22.5971 11.3614 22.5827C13.0006 22.5827 14.6412 22.5827 16.2819 22.5827C16.5642 22.5739 16.8348 22.4812 17.0495 22.3196C17.2642 22.158 17.4103 21.9371 17.464 21.693C17.5177 21.4488 17.4757 21.1959 17.345 20.9755C17.2143 20.755 17.0025 20.5801 16.7442 20.4793C16.4048 20.3848 16.0468 20.3529 15.6927 20.3855C14.1659 20.3969 12.6304 20.3791 11.0963 20.4007L11.0877 20.3969Z" fill="#FFF7C2"/>
</svg>
`;
const callIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25.982" height="25.982" viewBox="0 0 25.982 25.982">
<path id="Path_19767" data-name="Path 19767" d="M2.107,0H6.883A2.12,2.12,0,0,1,8.842,1.567a38.289,38.289,0,0,0,.532,3.916c.215.954.7,2.052.085,2.958C8.682,9.551,7.823,10.6,7.023,11.7a19.288,19.288,0,0,0,3.043,4.21,19.324,19.324,0,0,0,4.216,3.043C15.3,18.2,16.29,17.43,17.3,16.679a2.044,2.044,0,0,1,1.593-.422,28.04,28.04,0,0,0,3.629.692c.915.114,1.987-.02,2.73.637a2.3,2.3,0,0,1,.731,1.569V23.92a2.183,2.183,0,0,1-2.02,2.062h-.309A24.065,24.065,0,0,1,9.739,21.3,23.906,23.906,0,0,1,.8,8.15a25.911,25.911,0,0,1-.8-5.5V2.107A2.172,2.172,0,0,1,2.107,0Z" fill="#ac5dcb"/>
</svg>
`;
const chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="27.354" height="25.983" viewBox="0 0 27.354 25.983">
<path id="Path_19954" data-name="Path 19954" d="M8.075,13.934a14.959,14.959,0,0,1,13.367,1.1,13.2,13.2,0,0,1,3.439,3.078,11.494,11.494,0,0,1,2.473,6.895v.333a11.4,11.4,0,0,1-1.78,5.882,13.043,13.043,0,0,1-4.455,4.258A14.962,14.962,0,0,1,8.108,36.4a19.481,19.481,0,0,1-3.575,1.5,28.017,28.017,0,0,1-4,.929A.475.475,0,0,1,0,38.457v-.1a.751.751,0,0,1,.206-.387,6.394,6.394,0,0,0,1.246-2.335,18.7,18.7,0,0,0,.722-3.815A11.829,11.829,0,0,1,.439,28.235,11.563,11.563,0,0,1,0,25.333v-.325A11.5,11.5,0,0,1,2.5,18.08a13.512,13.512,0,0,1,5.577-4.146M6.922,23.379a1.818,1.818,0,1,0,2,.971,1.829,1.829,0,0,0-2-.971m6.409,0a1.819,1.819,0,1,0,1.945.923,1.829,1.829,0,0,0-1.945-.923m6.358,0a1.82,1.82,0,1,0,1.961.9A1.828,1.828,0,0,0,19.69,23.379Z" transform="translate(0 -12.853)" fill="#ac5dcb"/>
</svg>
`;
const calenderIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="26.117" height="25.983" viewBox="0 0 26.117 25.983">
<path id="Path_19748" data-name="Path 19748" d="M13.78,7.24a.925.925,0,0,1,1.7.079,12.192,12.192,0,0,1,.048,1.75q3.927,0,7.857,0a12.326,12.326,0,0,1,.045-1.736.92.92,0,0,1,1.712-.066,10.873,10.873,0,0,1,.057,1.8c1.088.025,2.176-.05,3.262.041a4.584,4.584,0,0,1,3.953,3.781,33.28,33.28,0,0,1,.039,4.536c-.007,3.623.016,7.245-.009,10.87a4.554,4.554,0,0,1-4.6,4.4q-8.389.007-16.78,0a4.586,4.586,0,0,1-4.606-4.819c.009-3.407,0-6.814.007-10.224,0-1.523-.145-3.051,0-4.572A4.555,4.555,0,0,1,9.346,9.393c1.394-.544,2.915-.247,4.371-.324A10.061,10.061,0,0,1,13.78,7.24M9.074,11.8c-.927.873-.753,2.219-.746,3.369H30.589c.009-1.152.175-2.5-.75-3.371-1.2-1.26-3.1-.676-4.636-.812a6.793,6.793,0,0,1-.107,1.872.911.911,0,0,1-1.641-.066,9.222,9.222,0,0,1-.068-1.8q-3.927,0-7.857,0a9.073,9.073,0,0,1-.07,1.807.917.917,0,0,1-1.644.07,7.129,7.129,0,0,1-.1-1.879c-1.537.138-3.439-.451-4.64.814m2.736,7.973a1.206,1.206,0,1,0,1.546,1.5,1.214,1.214,0,0,0-1.546-1.5m4.765.027a1.207,1.207,0,1,0,1.666,1.258A1.215,1.215,0,0,0,16.575,19.8m4.783.02a1.206,1.206,0,1,0,1.718,1.016,1.219,1.219,0,0,0-1.718-1.016m4.955-.045a1.205,1.205,0,1,0,1.548,1.5,1.213,1.213,0,0,0-1.548-1.5M11.858,24.59a1.205,1.205,0,1,0,1.512,1.464,1.214,1.214,0,0,0-1.512-1.464m14.506,0A1.205,1.205,0,1,0,27.88,26.05a1.212,1.212,0,0,0-1.517-1.458m-9.988.15a1.2,1.2,0,1,0,1.859.85,1.214,1.214,0,0,0-1.859-.85m4.933-.059a1.2,1.2,0,1,0,1.764.923A1.214,1.214,0,0,0,21.308,24.683Z" transform="translate(-6.401 -6.715)" fill="#ac5dcb"/>
</svg>
`;
const threeDot = `<svg xmlns="http://www.w3.org/2000/svg" width="18.448" height="4.691" viewBox="0 0 18.448 4.691">
<g id="Group_10118" data-name="Group 10118" transform="translate(-334.253 -276.76)">
  <path id="Path_6118" data-name="Path 6118" d="M2.285,0H2.4A2.365,2.365,0,0,1,3.9.591a2.346,2.346,0,1,1-3.109,0A2.366,2.366,0,0,1,2.285,0Z" transform="translate(352.701 276.76) rotate(90)" fill="#6366f1"/>
  <path id="Path_6119" data-name="Path 6119" d="M2.073.016A2.346,2.346,0,1,1,.3,1.2,2.348,2.348,0,0,1,2.073.016Z" transform="translate(345.824 276.76) rotate(90)" fill="#6366f1"/>
  <path id="Path_6120" data-name="Path 6120" d="M.731.644A2.346,2.346,0,1,1,3.9,4.1a2.366,2.366,0,0,1-1.494.591H2.289A2.35,2.35,0,0,1,0,2.3,2.34,2.34,0,0,1,.731.644Z" transform="translate(338.947 276.76) rotate(90)" fill="#6366f1"/>
</g>
</svg>
`;

export const TabBar = ({ userId, offline }) => {
  const [initialState, setInitialState] = React.useState([
    {
      title: "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
    // {
    //   title: "Subscription",
    //   value: false,
    //   type: "SUBS",
    // },
    // {
    //   title: "Installment",
    //   value: false,
    //   type: "INSTALLMENT",
    // },
  ]);
  const [initialStateOffline, setInitialStateOffline] = React.useState([
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
    // {
    //   title: "Subscription",
    //   value: false,
    //   type: "SUBS",
    // },
    // {
    //   title: "Installment",
    //   value: false,
    //   type: "INSTALLMENT",
    // },
  ]);
  if (offline) {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: {
            margin: 0,
            padding: 0,
            width: 120,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#AC5DCB",
          },
          tabBarScrollEnabled: true,
        }}>
        {initialStateOffline.map((doc, i) => (
          <Tab.Screen
            key={i}
            name={doc.title}
            initialParams={{ userId: userId, key: doc.type }}
            component={OfflineScreens}
          />
        ))}
      </Tab.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: {
          margin: 0,
          padding: 0,
          
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#767676",
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          
        },
      }}>
      {initialState.map((doc, i) => (
        <Tab.Screen
          key={i}
          name={doc.title}
          initialParams={{ userId: userId, key: doc.type }}
          component={Screens}
        />
      ))}
    </Tab.Navigator>
  );
};
const Screens = ({ navigation, route }) => {
  const vendorOrders = useSelector((state) => state.vendorOrders);
  const [Orders, setOrders] = React.useState();
  const [AllOrders, setAllOrders] = React.useState();
  const userId = route.params.userId;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const assentColor = colors.getAssentColor();
  const dispatch = useDispatch();
  const [initialState, setInitialState] = React.useState([
    {
      title: "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
  ]);
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const key = route.params.key;

  React.useEffect(() => {
    if (vendor && user && key) {
      getOrders(user.token, "vendor", vendor.service.id, key,0)
        .then((res) => {
          let arr = res.data.orders.filter((d) => d.user.id == userId);
          setAllOrders(arr);
          setTotal(arr.length);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
      //setOrders(arr)
    }
  }, [isFocused, page]);
  React.useEffect(() => {
    if (AllOrders) {
      const type = initialState.filter((d) => d.title == route.name)[0].type;
      const arr = AllOrders.filter((d) => d.type == type);
      setOrders(arr);
    }
  }, [AllOrders + route.name]);
  if (!AllOrders) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        {Orders &&
          Orders.map((doc, i) => (
            <OrderCart
              onSelect={(e) => {
                //console.log(e)
                dispatch({ type: "ORDER_STATE", playload: e });
                //dispatch({ type: "ORDER_STATE", playload: e });
              }}
              onPress={() => {
                navigation.navigate("VendorOrderDetails", {
                  data: doc,
                  orderId:doc?.id,
                  type:doc?.type
                });
              }}
              data={doc}
              key={i}
            />
          ))}
    
        <View style={{ height: 80 }} />
      </ScrollView>
      {Orders && Orders.length == 0 && (
        <View
          style={{
            height: 400,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <SvgXml xml={emptyIcon} width="100" height="100" />
          <Text
            style={{
              marginTop: 30,
              color: textColor,
            }}>
            No Order Found
          </Text>
        </View>
      )}
    </View>
  );
};
const OfflineScreens = ({ navigation, route }) => {
  const vendorOrders = useSelector((state) => state.offlineOrders);
  const [Orders, setOrders] = React.useState();
  const [AllOrders, setAllOrders] = React.useState();
  const userId = route.params.userId;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const assentColor = colors.getAssentColor();
  const dispatch = useDispatch();
  const [initialState, setInitialState] = React.useState([
    {
      title: "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
  ]);
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const key = route.params.key;

  React.useEffect(() => {
    if (vendor && user && key) {
      getOrders(user.token, "vendor", vendor.service.id, key, 20 * page)
        .then((res) => {
          let arr = res.data.orders.filter((d) => d.offlineMemberId == userId);
          setAllOrders(arr);
          setTotal(arr.length);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
      //setOrders(arr)
    }
  }, [isFocused, page]);
  React.useEffect(() => {
    if (AllOrders) {
      const type = initialState.filter((d) => d.title == route.name)[0].type;
      const arr = AllOrders.filter((d) => d.type == type);
      setOrders(arr);
    }
  }, [AllOrders, route.name, isFocused]);
  if (!AllOrders) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <View>
      <ScrollView nestedScrollEnabled={true}>
        {Orders &&
          Orders.map((doc, i) => (
            <OrderCartOffline
              onSelect={(e) => {
                //console.log(e)
                dispatch({ type: "ORDER_STATE", playload: e });
                //dispatch({ type: "ORDER_STATE", playload: e });
              }}
              onPress={(userInfo) => {
                if (doc.type == "SUBS" && doc.status != "WAITING_FOR_ACCEPT") {
                  navigation.navigate("SubscriptionScript", { data: doc });
                  return;
                }
                if (
                  doc.type == "INSTALLMENT" &&
                  doc.status != "WAITING_FOR_ACCEPT"
                ) {
                  navigation.navigate("InstallmentScript", { data: doc });
                  return;
                }
                navigation.navigate("VendorOfflineOrderDetails", {
                  data: doc,
                  userInfo: userInfo,
                });
              }}
              data={doc}
              key={i}
            />
          ))}
        {Orders && Orders.length != 0 && (
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(total / 20)}
            onPageChange={(page) => setPage(page)}
            label={`${parseInt(total / 20) + 1} of ${page + 1}`}
            // showFastPaginationControls
            // numberOfItemsPerPageList={numberOfItemsPerPageList}
            // numberOfItemsPerPage={numberOfItemsPerPage}
            // onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={"Rows per page"}
          />
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
      {Orders && Orders.length == 0 && (
        <View
          style={{
            height: 400,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <SvgXml xml={emptyIcon} width="100" height="100" />
          <Text
            style={{
              marginTop: 30,
              color: textColor,
            }}>
            No Order Found
          </Text>
        </View>
      )}
    </View>
  );
};
const circle = `<svg width="104" height="100" viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.41494 43.6695C1.5936 43.5613 1.01316 42.8071 1.14587 41.9894C2.97659 30.7087 8.62108 20.3782 17.1604 12.7378C25.6997 5.09741 36.5919 0.632032 48.006 0.0622012C48.8333 0.0208946 49.5186 0.681313 49.5351 1.50958C49.5516 2.33784 48.893 3.02016 48.0657 3.06305C37.3692 3.61759 27.1653 7.81163 19.1608 14.9736C11.1562 22.1355 5.85766 31.812 4.12162 42.3812C3.98735 43.1987 3.23628 43.7776 2.41494 43.6695Z" fill="url(#paint0_linear_5025_37885)"/>
<path d="M53.7645 1.48468C53.8154 0.727005 54.4714 0.152168 55.2274 0.223955C66.3809 1.28306 76.871 6.06037 84.9996 13.8091C93.1282 21.5579 98.4017 31.8075 99.993 42.8975C100.101 43.6492 99.558 44.332 98.8037 44.4191C98.0493 44.5063 97.3691 43.9648 97.2601 43.2133C95.7434 32.7619 90.7654 23.1048 83.1021 15.7996C75.4389 8.4945 65.5547 3.98401 55.0427 2.96885C54.2869 2.89585 53.7135 2.24236 53.7645 1.48468Z" fill="url(#paint1_linear_5025_37885)"/>
<path d="M98.9081 47.0151C99.7349 46.9642 100.449 47.5932 100.475 48.4212C100.666 54.4756 99.756 60.5187 97.784 66.255C95.6494 72.4644 92.3127 78.1926 87.9643 83.1124C83.6159 88.0323 78.3411 92.0475 72.4409 94.9288C66.9904 97.5906 61.1048 99.2365 55.0728 99.7905C54.2478 99.8662 53.5358 99.2349 53.4849 98.4081C53.4339 97.5812 54.0632 96.8721 54.888 96.7947C60.5268 96.266 66.0279 94.722 71.1244 92.2331C76.6705 89.5247 81.6289 85.7504 85.7164 81.1257C89.8038 76.501 92.9404 71.1165 94.947 65.2797C96.7908 59.916 97.6474 54.2669 97.4794 48.6059C97.4549 47.7778 98.0812 47.0661 98.9081 47.0151Z" fill="url(#paint2_linear_5025_37885)"/>
<path d="M48.3268 98.4513C48.2897 99.2789 47.5884 99.922 46.7623 99.8601C40.7218 99.4073 34.8095 97.8602 29.3152 95.2902C23.3676 92.5082 18.0262 88.5819 13.596 83.7356C9.16574 78.8893 5.73345 73.2179 3.49506 67.0451C1.42724 61.3427 0.415705 55.3157 0.505493 49.2589C0.517773 48.4306 1.22112 47.7897 2.04871 47.8268C2.87631 47.8639 3.51461 48.565 3.50391 49.3934C3.43081 55.0564 4.38185 60.6904 6.31535 66.0224C8.41944 71.8248 11.6458 77.156 15.8102 81.7115C19.9746 86.267 24.9955 89.9577 30.5863 92.5728C35.7238 94.9759 41.25 96.4275 46.8968 96.8617C47.7228 96.9252 48.3639 97.6237 48.3268 98.4513Z" fill="url(#paint3_linear_5025_37885)"/>
<defs>
<linearGradient id="paint0_linear_5025_37885" x1="0.500024" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#72C6EF"/>
<stop offset="1" stop-color="#004E8F"/>
</linearGradient>
<linearGradient id="paint1_linear_5025_37885" x1="0.500012" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#16A085"/>
<stop offset="1" stop-color="#F4D03F"/>
</linearGradient>
<linearGradient id="paint2_linear_5025_37885" x1="0.500049" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#00416A"/>
<stop offset="1" stop-color="#E4E5E6"/>
</linearGradient>
<linearGradient id="paint3_linear_5025_37885" x1="0.500002" y1="50" x2="100.5" y2="50" gradientUnits="userSpaceOnUse">
<stop stop-color="#799F0C"/>
<stop offset="1" stop-color="#ACBB78"/>
</linearGradient>
</defs>
</svg>
`;
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
<path d="M34.4 12H21.6C15.2 12 12 14.8 12 20.4V38.6C12 39.37 12.72 40 13.6 40H34.4C40.8 40 44 37.2 44 31.6V20.4C44 14.8 40.8 12 34.4 12ZM31.2 30.55H20C19.344 30.55 18.8 30.074 18.8 29.5C18.8 28.926 19.344 28.45 20 28.45H31.2C31.856 28.45 32.4 28.926 32.4 29.5C32.4 30.074 31.856 30.55 31.2 30.55ZM36 23.55H20C19.344 23.55 18.8 23.074 18.8 22.5C18.8 21.926 19.344 21.45 20 21.45H36C36.656 21.45 37.2 21.926 37.2 22.5C37.2 23.074 36.656 23.55 36 23.55Z" fill="white"/>
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
const styles = StyleSheet.create({
  subContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 20,
    paddingRight: 0,
  },
});
