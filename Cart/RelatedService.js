import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import {
  primaryColor,
  textColor,
  secondaryColor,
  backgroundColor,
} from "./../assets/colors";
import { SvgXml } from "react-native-svg";
import { star } from "../assets/icon";
import { AntDesign } from "@expo/vector-icons";

const RelatedService = (props) => {
  const navigation = props.navigation;
  const [Like, seLike] = React.useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("OtherProfile");
      }}
      style={{
        width: 200,
        height: 280,
        borderRadius: 10,
        shadowColor: "#d5d5d5",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        margin: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: 10
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "50%",
            borderRadius: 10,
          }}
          source={{
            uri: "https://www.ouc.com/images/business/3-4.jpg?sfvrsn=3294c0f0_2",
          }}
        />
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <SvgXml xml={star} height="18" width="18" />
            <Text
              style={{
                marginLeft: 5,
                color: textColor,
              }}
            >
              5.0
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              //setLike(!Like)
            }}
          >
            {Like ? (
              <AntDesign name="heart" size={24} color="#DA1e37" />
            ) : (
              <AntDesign name="hearto" size={24} color={textColor} />
            )}
          </TouchableOpacity>
        </View>
        <Text
          numberOfLines={3}
          style={{
            marginHorizontal: 10,
            color: textColor,
            fontWeight: "700"
          }}
        >
          I will make custom graphic for your blog I will
        </Text>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginVertical: 10,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: textColor,
              }}
            >
              From
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: textColor,
                marginLeft: 5,
              }}
            >
              500৳
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RelatedService;