import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import Button from "./../../components/Button";
import Barcode from "react-native-barcode-expo";
const { width, height } = Dimensions.get("window");

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
  const styles = StyleSheet.create({
    view: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#F1EFEF",
      justifyContent: "center",
    },
    text: {
      fontSize: 16,
      fontFamily: "Poppins-Medium",
      color: textColor,
    },
    smallText: {
      fontSize: 14,
      fontFamily: "Poppins-Medium",
      color: textColor,
    },
  });
  React.useEffect(() => {
    //console.log(data);
  }, []);

  const stringDate = (d) => {
    const Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date(d);
    return `${date.getDay() < 10 ? date.getDay() + 1 : date.getDay()}th ${
      Months[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              color: textColor,
              marginBottom: 5,
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
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                marginTop: 0,
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
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: textColor,
          }}
        >
          Order Id: {data ? data.id : "Unknown Id"}
        </Text>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Barcode height="50" value="Hello World" format="CODE128" />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            4567443224255
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              color: textColor,
              textAlign: "center",
            }}
          >
            Date:{" "}
            {data && data.createdAt
              ? stringDate(data.createdAt)
              : "Unavailable Date"}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Text style={styles.text}>Price</Text>
        <Text style={styles.text}>
          Basic Price : {data ? data.amount + "৳" : "Pice is empty"}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.text}>Delivery Date</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={[styles.smallText, { flex: 0 }]}>
            {data ? stringDate(data.deliveryDateFrom) : "Unavailable Date"}{" "}
          </Text>
          <Text style={[styles.smallText, { flex: 0, marginHorizontal: 10 }]}>
            To
          </Text>
          <Text style={[styles.smallText, { flex: 0 }]}>
            {data ? stringDate(data.deliveryDateTo) : "Unavailable Date"}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.text}>Payment Status</Text>
        <View
          style={{
            backgroundColor: data && data.paid ? "green" : "red",
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 50,
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            {data && data.paid ? "Paid" : "Due"}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={[styles.text, { fontSize: 18 }]}>Service Status</Text>
        <Text style={[styles.smallText, { marginTop: 5 }]}>
          Wait for accept
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={[styles.text, { fontSize: 22 }]}>Introduction</Text>
        <Text style={[styles.smallText, { marginTop: 5, marginBottom: 5 }]}>
          {data && data.description ? data.description : "No details found!"}
        </Text>
      </View>
      <Button
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 5,
          alignSelf: "flex-end",
          marginVertical: 20,
          borderWidth: 0,
          marginRight: 20,
        }}
        title="Cancel Order"
      />
    </ScrollView>
  );
};
export default OrderDetails;
