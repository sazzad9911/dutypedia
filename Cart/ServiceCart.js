import React from "react";
import { View, Dimensions, Text, Image, TouchableOpacity ,Platform} from "react-native";
import { primaryColor, textColor, backgroundColor } from "../assets/colors";
const { width, height } = Dimensions.get("window");

const ServiceCart = () => {
  return (
    <TouchableOpacity
      style={{
        shadowColor: Platform.OS =="ios"?"#ebebeb":"#DDDDDD",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
        borderRadius: 10,
        backgroundColor:primaryColor,
        margin: 10,
      }}
    >
      <View
        style={{
          width: width / 2 - 30,
          height: 180,
          overflow: "hidden",
          borderRadius: 10,
          backgroundColor: primaryColor,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "50%",
          }}
          source={{
            uri: "https://t4.ftcdn.net/jpg/03/03/49/75/360_F_303497515_ZHOwfTtuo5sYpAeoqWRZnkXZNZDKZeMz.jpg",
          }}
        />
        <View
          style={{
            padding: 10,
            paddingTop:15
          }}
        >
          <Text numberOfLines={2}
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              lineHeight: 15,
            }}
          >
            I Will Make Custom Graphics For Your Blog
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
              }}
            >
              500৳
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Poppins-Medium",
              }}
            >
              View 100000k
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCart;
