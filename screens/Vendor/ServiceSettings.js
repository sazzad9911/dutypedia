import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Platform,
  Switch,
  Dimensions,
} from "react-native";
import { textColor, backgroundColor, primaryColor } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { storeJson } from "../../Class/storage";
import { changeActiveService, getService } from "../../Class/service";
import { vendorLogin } from "../../Class/auth";
import { useIsFocused } from "@react-navigation/native";
import ActivityLoader from "../../components/ActivityLoader";
const { width, height } = Dimensions.get("window");
const ServiceSettings = ({ navigation, route }) => {
  const serviceSettings = useSelector((state) => state.serviceSettings);
  const initialState = [
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    // {
    //   title: "Installment",
    //   value: false,
    //   type: "INSTALLMENT",
    // },
    // {
    //   title: "Subscription",
    //   value: false,
    //   type: "SUBS",
    // },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
  ];
  const [Data, setData] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const params = route.params;
  const setNewNavigation = params.setNewNavigation;
  const [layoutHeight, setLayoutHeight] = React.useState();
  const isFocused = useIsFocused();
  const changeScreenName = params.changeScreenName;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  React.useEffect(() => {
    // console.log(serviceSettings);
    if (vendor) {
      updateVendorInfo(vendor?.service?.id);
    }
  }, [isFocused]);
  const updateVendorInfo = async (id) => {
    const res = await getService(user.token, id);
    if (res) {
      dispatch({ type: "SET_VENDOR", playload: res.data });
    }
    let arr = initialState;
    if (Array.isArray(res.data.service.activeServiceTypes)) {
      res.data.service.activeServiceTypes.forEach((doc) => {
        arr = arr.map((d) => {
          if (d.type == doc) {
            return {
              title: d.title,
              value: true,
              type: d.type,
            };
          } else {
            return d;
          }
        });
      });
    }
    setData(arr);
  };
  React.useEffect(() => {
    if (layoutHeight && isFocused) {
      changeScreenName("Settings");
      if (width < 350 && Platform.OS == "android") {
        setNewNavigation(400);
      } else {
        setNewNavigation(350);
      }
    }
  }, [layoutHeight + isFocused]);

  return (
    <View
      onLayout={(e) => {
        if (!layoutHeight) {
          setLayoutHeight(e.nativeEvent.layout.height);
        }
      }}
      style={{ flex: 1 }}>
      <View style={{ backgroundColor: primaryColor }}>
        {/* <Text
          style={{
            marginTop: 40,
            marginBottom: 5,
            fontFamily: "Poppins-Medium",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Service Settings
        </Text> */}
      </View>
      <View>
        <View style={{ height: 20 }} />
        {Array.isArray(Data)&&
          Data.map((doc, i) => (
            <Cart
              i={i}
              key={i}
              data={doc}
              title={doc.title}
              value={doc.value}
              setLoader={setLoader}
            />
          ))}
        {!Data||loader && (
          <View
            style={{
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              position:"absolute",
              zIndex:100,
              width:"100%",
              backgroundColor:"#ffffff"
            }}>
            <ActivityLoader />
          </View>
        )}
      </View>
    </View>
  );
};

export default ServiceSettings;
const Cart = ({ title, value, i, data,setLoader }) => {
  const [isEnabled, setIsEnabled] = React.useState(value);
  const dispatch = useDispatch();
  const serviceSettings = useSelector((state) => state.serviceSettings);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  //const [loader, setLoader] = useState(false);

  const toggleSwitch = () => {
    if (user && vendor) {
      //console.log(user.token);
      setLoader(true);
      changeActiveService(user.token, vendor.service.id, data.type)
        .then((res) => {
          setLoader(false);
          //console.log(res.data.updatedService.activeServiceTypes)
          setIsEnabled((val) => !val);
          vendorLogin(user.token, vendor.service.id)
            .then((res) => {
              if (res) {
                dispatch({ type: "SET_VENDOR", playload: res });
              }
            })
            .catch((err) => {
              console.warn(err.response.data);
            });
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data);
          //setIsEnabled((val) => !val);
        });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
          borderBottomWidth: i != 4 ? 1 : 0,
          borderBottomColor: "#e5e5e5",
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Medium",
            marginLeft: 5,
          }}>
          {title}
        </Text>
        <View>
          
            <Switch
              style={{
                transform: [
                  { scaleX: Platform.OS == "ios" ? 0.8 : 1 },
                  { scaleY: Platform.OS == "ios" ? 0.8 : 1 },
                ],
              }}
              trackColor={{ false: "#B0BEC5", true: "#06BD06" }}
              thumbColor={isEnabled ? "#ECEFF1" : "#ECEFF1"}
              ios_backgroundColor="#B0BEC5"
              value={isEnabled}
              onValueChange={(val) => {
                //setMute(val);
                toggleSwitch();
              }}
            />
       
        </View>
      </View>
      <View style={{ width: 0 }} />
    </View>
  );
};
