import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function SellerCart() {
  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: "#FFF2DA",
        borderRadius: 5,
        margin: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          flex: 3,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          Become A Seller
        </Text>
        <TouchableOpacity
          style={{
            marginLeft: 20,
            marginTop: 20,
            height: 40,
            backgroundColor: "white",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            width: 140,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            Create An Account
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
        }}
      >
        <Image
          style={{
            height: 120,
            margin: 10,
          }}
          source={{
            uri: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_486140535_970936970450058_85865.jpg",
          }}
        />
      </View>
    </View>
  );
}
