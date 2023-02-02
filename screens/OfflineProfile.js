import React from "react";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { Color, primaryColor } from "../assets/colors";
const { width, height } = Dimensions.get("window");
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { OrderCart } from "./Vendor/Order";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import NewTab from "./Vendor/components/NewTab";
import { FontAwesome } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { TabBar } from "./UserProfile";
import { SafeAreaView } from "react-native-safe-area-context";


const Tab = createMaterialTopTabNavigator();

export default function OfflineProfile({ navigation, route }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const assentColor = colors.getAssentColor();
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
  const vendorOrders = useSelector((state) => state.vendorOrders);
  const [Active, setActive] = React.useState(0);
  const user = route.params.user;
  const [Orders, setOrders] = React.useState();
  const [AllOrders, setAllOrders] = React.useState();
  const [SliderRef,setSliderRef]=React.useState()
  const ref=React.useRef()

  const dispatch = useDispatch();

  const ViewBox = ({ Icon, title,onPress }) => {
    return (
      <TouchableOpacity onPress={onPress?onPress:null}
        style={{
          width: width / 4 - 20,
          height: width / 4 - 30,
          backgroundColor: primaryColor,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        <SvgXml xml={Icon} height="22" width="22" />
        {title && (
          <Text numberOfLines={1}
            style={{
              fontSize:width<350?8:10,
              color: textColor,
              fontFamily: "Poppins-Medium",
              marginTop: 9,
              
            }}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  React.useEffect(() => {
    if (vendorOrders) {
      const arr = vendorOrders.filter((d) => d.user.id == user.id);
      setAllOrders(arr);
      //setOrders(arr)
    }
  }, [vendorOrders]);
  React.useEffect(() => {
    if (AllOrders) {
      const arr = AllOrders.filter((d) => d.type == initialState[Active].type);
      setOrders(arr);
    }
  }, [Active, AllOrders]);
    

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F2F2F6",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            }}
          >
            {user && user.profilePhoto ? (
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                }}
                source={{ uri: user.profilePhoto }}
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
            }}
          >
            {user ? `${user.name}` : `Invalid user`}
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}
            >
              {" "}
              {user ? `(${user.gender.toUpperCase()})` : `Invalid`}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}
          >
            Last seen today 12:00 pm
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginVertical: 20,
            justifyContent: "center",
          }}
        >
          {/* <ViewBox Icon={callIcon} title="Call" />
        <ViewBox Icon={chatIcon} title="Chat" /> */}
          <ViewBox onPress={()=>{
           
            navigation.navigate("MemberAppointment",{user:user,offline:true})
          }} Icon={calenderIcon} title="Appointment" />
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
          }}
        >
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: "#E2E2E2",
              paddingBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginTop: 10,
              }}
            >
              Mobile
            </Text>
            <Text
              style={{
                color: "#6366F1",
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                marginTop: 3,
              }}
            >
              {user && user.phone ? user.phone : "N/A"}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 0,
              borderBottomColor: "#E2E2E2",
              paddingBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginTop: 10,
              }}
            >
              Email
            </Text>
            <Text
              style={{
                color: "#6366F1",
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                marginTop: 3,
              }}
            >
              {user && user.email ? `${user.email}` : "N/A"}
            </Text>
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
          }}
        >
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Note",{user:user,offline:true})
          }}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#03D303",
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <SvgXml xml={noteIcon} height="24" width={"24"} />
            </View>
            <View
              style={{
                marginLeft: 10,
                borderColor: "#E2E2E2",
                borderBottomWidth: 0.5,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                  marginBottom: 6,
                }}
              >
                Note
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#333333",
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <SvgXml xml={addressIcon} height="24" width={"24"} />
            </View>
            <View
              style={{
                marginLeft: 10,
                borderColor: "#E2E2E2",
                borderBottomWidth: 0,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                  marginBottom: 6,
                }}
              >
                Address
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height:20}}/>
        <View style={{ minHeight: 500 }}>
          <TabBar offline={true} userId={user.id} />
        </View>
      </ScrollView>
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
        onPress={()=>{
          navigation.navigate("VendorServiceList",{userId:user.id})
        }}
      />
    </SafeAreaView>
  );
}
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
const noteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="13.874" height="17.342" viewBox="0 0 13.874 17.342">
<g id="Group_10113" data-name="Group 10113" transform="translate(-32 -360.17)">
  <g id="_332525ff" data-name="#332525ff" transform="translate(32 360.17)">
    <path id="Path_20026" data-name="Path 20026" d="M88.347,42.817a.872.872,0,0,1,.98.059.9.9,0,0,1,.339.684c.576,0,1.152,0,1.729,0a.868.868,0,0,1,1.736,0c.576.007,1.153,0,1.729,0a.9.9,0,0,1,.313-.663.87.87,0,0,1,1.057-.046.9.9,0,0,1,.374.709,2.6,2.6,0,0,1,2.6,2.6q0,5.608,0,11.217a2.683,2.683,0,0,1-.126.855,2.617,2.617,0,0,1-1.814,1.717,4.566,4.566,0,0,1-1.214.086H88.6a5.955,5.955,0,0,1-1.251-.064,2.627,2.627,0,0,1-1.766-1.4,2.6,2.6,0,0,1-.261-1.151q0-5.486,0-10.971a4.467,4.467,0,0,1,.026-.652,2.581,2.581,0,0,1,.834-1.563,2.641,2.641,0,0,1,1.742-.679.868.868,0,0,1,.419-.736M87.06,46.16q0,5.63,0,11.261a.866.866,0,0,0,.452.771.965.965,0,0,0,.526.107q4.287,0,8.573,0a.869.869,0,0,0,.852-.876q0-5.632,0-11.263a.877.877,0,0,0-.866-.868c0,.3,0,.61,0,.915a.866.866,0,0,1-1.731-.045c0-.289,0-.578,0-.867-.576,0-1.152,0-1.728,0-.017.3,0,.606-.009.908a.865.865,0,0,1-1.729,0c-.009-.3.007-.605-.007-.908-.577.006-1.153,0-1.73,0,0,.289,0,.579,0,.869a.866.866,0,0,1-1.731.037c0-.3,0-.605,0-.908A.876.876,0,0,0,87.06,46.16Z" transform="translate(-85.326 -42.693)" fill="#666"/>
    <path id="Path_20027" data-name="Path 20027" d="M171.439,255.974c1.76-.02,3.521,0,5.281-.009a.868.868,0,1,1,.039,1.734q-2.6,0-5.2,0a.866.866,0,0,1-.117-1.725Z" transform="translate(-167.219 -247.296)" fill="#666"/>
    <path id="Path_20028" data-name="Path 20028" d="M171.415,341.3c1.065-.017,2.131,0,3.2-.007a1.8,1.8,0,0,1,.73.074.867.867,0,0,1-.322,1.659c-1.139.006-2.277,0-3.416,0a.938.938,0,0,1-.527-.124.867.867,0,0,1,.337-1.6Z" transform="translate(-167.187 -329.152)" fill="#666"/>
  </g>
  <g id="_fff7c2ff" data-name="#fff7c2ff" transform="translate(33.732 362.767)">
    <path id="Path_20029" data-name="Path 20029" d="M127.993,107.451a.876.876,0,0,1,.867-.87c0,.3,0,.606,0,.908a.866.866,0,0,0,1.731-.037c0-.29,0-.579,0-.869.576,0,1.153,0,1.73,0,.013.3,0,.606.007.908a.865.865,0,0,0,1.729,0c.01-.3-.008-.606.009-.908.576.008,1.152,0,1.728,0,0,.289,0,.578,0,.867a.866.866,0,0,0,1.731.045c.007-.3,0-.61,0-.915a.877.877,0,0,1,.866.868q0,5.632,0,11.263a.869.869,0,0,1-.851.876q-4.287,0-8.573,0a.965.965,0,0,1-.526-.107.866.866,0,0,1-.452-.771q0-5.631,0-11.261m2.485,5.211a.866.866,0,0,0,.117,1.725q2.6,0,5.2,0a.868.868,0,1,0-.039-1.734c-1.76.006-3.521-.011-5.281.009m.009,3.467a.867.867,0,0,0-.337,1.6.938.938,0,0,0,.527.124c1.138,0,2.277,0,3.416,0a.867.867,0,0,0,.321-1.659,1.8,1.8,0,0,0-.73-.074C132.617,116.126,131.551,116.112,130.486,116.129Z" transform="translate(-127.992 -106.58)" fill="#fff7c2"/>
  </g>
</g>
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


