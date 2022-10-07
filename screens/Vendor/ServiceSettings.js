import React from "react";
import { View, ScrollView, Text, Platform } from "react-native";
import { textColor, backgroundColor, primaryColor } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { storeJson } from "../../Class/storage";
import { Switch } from "react-native-paper";
import { changeActiveService } from "../../Class/service";
import { vendorLogin } from "../../Class/auth";

const ServiceSettings = () => {
  const serviceSettings = useSelector((state) => state.serviceSettings);
  const initialState = [
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
  ];
  const [Data, setData] = React.useState();
  const vendor = useSelector((state) => state.vendor);

  React.useEffect(() => {
    // console.log(serviceSettings);
    let arr=initialState;
    if (Array.isArray(vendor.service.activeServiceTypes)) {
      vendor.service.activeServiceTypes.forEach((doc) => {
        arr=arr.map((d) => {
           if (d.type == doc) {
             return {
               title: d.title,
               value: true,
               type: d.type,
             };
           } else {
             return d;
           }
         })
      })
    }
   setData(arr)
  }, [vendor]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: primaryColor }}>
        <Text
          style={{
            marginTop: 40,
            marginBottom: 5,
            fontFamily: "Poppins-Medium",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Service Settings
        </Text>
      </View>
      <ScrollView>
        <View style={{ height: 20 }} />
        {Array.isArray(Data) &&
          Data.map((doc, i) => (
            <Cart
              i={i}
              key={i}
              data={doc}
              title={doc.title}
              value={doc.value}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default ServiceSettings;
const Cart = ({ title, value, i, data }) => {
  const [isEnabled, setIsEnabled] = React.useState(value);
  const dispatch = useDispatch();
  const serviceSettings = useSelector((state) => state.serviceSettings);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);

  const toggleSwitch = () => {
    if (user && vendor) {
      //console.log(user.token);
      setIsEnabled((val) => !val);
      changeActiveService(user.token, vendor.service.id, data.type)
        .then((res) => {
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
          console.warn(err.response.data);
          setIsEnabled((val) => !val);
        });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <View style={{ width: 20 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e5e5",
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Medium",
            marginLeft: 5,
          }}
        >
          {title}
        </Text>
        <View>
          <Switch
            style={{
              height: 35,
              width: 90,
              transform: [
                { scaleX: Platform.OS == "ios" ? 0.8 : 1 },
                { scaleY: Platform.OS == "ios" ? 0.8 : 1 },
              ],
            }}
            color="#06BD06"
            value={isEnabled}
            onValueChange={(val) => {
              //setMute(val);
              toggleSwitch();
            }}
          />
        </View>
      </View>
      <View style={{ width: 10 }} />
    </View>
  );
};
