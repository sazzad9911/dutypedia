import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";

const OrderDetails = ({ navigation, route }) => {
  const data = route.params && route.params.data ? route.params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
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

  return (
    <ScrollView>
      <View style={{ height: 33 }} />
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: 70,
            width: 70,
            borderWidth: 1,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#e5e5e5",
            overflow: "hidden",
          }}
        >
          {data && data.service.providerInfo.profilePhoto ? (
            <Image
              style={{
                width: 60,
                height: 60,
              }}
              source={{ uri: data.service.providerInfo.profilePhoto }}
            />
          ) : (
            <FontAwesome name="user" size={50} color={assentColor} />
          )}
        </View>
        <View
          style={{
            marginLeft: 15,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            {data
              ? data.service.serviceCenterName
              : "Unknown Service Center Name"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            {data ? data.service.providerInfo.title : "--"}{" "}
            {data ? data.service.providerInfo.name : "--"}{" "}
            {data ? `(${data.service.providerInfo.gender})` : "(-)"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            {data ? data.service.providerInfo.position : "-"}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
        <View style={styles.view}></View>
        <View
          style={[styles.view, { borderBottomColor: backgroundColor, flex: 2 }]}
        >
          {data && (
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              {
                initialState.filter((d) =>
                  d.type.match(data.service.gigs[0].type)
                )[0].title
              }{" "}
              Service
            </Text>
          )}
        </View>
        <View style={styles.view}></View>
      </View>
    </ScrollView>
  );
};
export default OrderDetails;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    justifyContent: "center",
  },
});
