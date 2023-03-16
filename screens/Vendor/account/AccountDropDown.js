import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import customStyle from "../../../assets/stylesheet";
const SERVICE = [
  {
    title: "All",
    key: "ALL",
  },
  {
    title: "Bargaining",
    key: "BARGAINING",
  },
  {
    title: "Fixed",
    key: "FIXED",
  },
  {
    title: "Package",
    key: "PACKAGE",
  },
  {
    title: "Subscription",
    key: "SUBSCRIPTION",
  },
  {
    title: "Installment",
    key: "INSTALLMENT",
  },
];
const { width, height } = Dimensions.get("window");

export default function AccountDropDown() {
  return (
    <View
      style={[{
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#ffffff",
      },customStyle.shadow]}>
      {SERVICE.map((doc, i) => (
        <Cart key={i} title={doc.title} />
      ))}
    </View>
  );
}
const Cart = ({ title }) => {
  return (
    <TouchableOpacity
      style={{
        width: width - 20,
        marginLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        paddingVertical: 10,
        marginVertical: 4,
      }}>
      <Text style={customStyle.mediumText}>{title}</Text>
    </TouchableOpacity>
  );
};
