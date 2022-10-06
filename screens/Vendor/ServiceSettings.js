import React from "react";
import { View, ScrollView, Text, Platform } from "react-native";
import { textColor, backgroundColor, primaryColor } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { storeJson } from "../../Class/storage";
import { Switch } from "react-native-paper";

const ServiceSettings = () => {
  const serviceSettings = useSelector((state) => state.serviceSettings);

  React.useEffect(() => {
    // console.log(serviceSettings);
  }, [serviceSettings]);

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
        {Array.isArray(serviceSettings) &&
          serviceSettings.map((doc, i) => (
            <Cart i={i} key={i} title={doc.title} value={doc.value} />
          ))}
      </ScrollView>
    </View>
  );
};

export default ServiceSettings;
const Cart = ({ title, value, i }) => {
  const [isEnabled, setIsEnabled] = React.useState(value);
  const dispatch = useDispatch();
  const serviceSettings = useSelector((state) => state.serviceSettings);
  const toggleSwitch = () => {
    dispatch({
      type: "CHECKED",
      playload: title,
    });
    setIsEnabled((previousState) => !previousState);
    storeJson("serviceSettings", serviceSettings);
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
              width:90,
              transform: [
                { scaleX: Platform.OS == "ios" ? 0.8 : 1 },
                { scaleY: Platform.OS == "ios" ? 0.8 : 1 },
              ],
            }}
            color="#06BD06"
            value={isEnabled}
            onValueChange={(val) => {
              //setMute(val);
              setIsEnabled(val);
            }}
          />
        </View>
      </View>
      <View style={{ width: 10 }} />
    </View>
  );
};
