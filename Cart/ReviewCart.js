import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { star } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import { primaryColor, secondaryColor } from "./../assets/colors";
import { numToArray } from "./../action";

const ReviewCart = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: primaryColor,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={styles.text1}>23 Review</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push("AllReview");
          }}
        >
          <Text style={styles.text1}>See All</Text>
        </TouchableOpacity>
      </View>
      <Cart />
      <View
        style={{ height: 1, width: "100%", backgroundColor: secondaryColor }}
      />
    </View>
  );
};

export default ReviewCart;
const styles = StyleSheet.create({
  text1: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#808080",
  },
  text2: {
    fontSize: 14,
    color: "#808080",
    fontFamily: "Poppins-Light",
  },
  text3: {
    fontSize: 11,
    color: "#808080",
    fontFamily: "Poppins-Light",
  },
});
export const Cart = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 20,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
          }}
          source={{
            uri: "https://hindidp.com/wp-content/uploads/2022/02/cute_beautiful_dp_fo_wHC8X.jpg",
          }}
        />
        <View>
          <Text
            style={[
              styles.text1,
              {
                marginTop: 4,
              },
            ]}
          >
            Sumaiya Alam
          </Text>
          <Text style={styles.text3}>Dhaka</Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: 10,
          flex: 1,
        }}
      >
        <Text
          style={[
            styles.text2,
            {
              textAlign: "justify",
              marginTop: 5,
            },
          ]}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries.
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {numToArray(5.2).map((doc, i) => (
              <SvgXml
                style={{
                  marginRight: 3,
                }}
                key={i}
                xml={star}
                height="18"
                width="18"
              />
            ))}
            <Text
              style={[
                styles.text2,
                {
                  marginLeft: 5,
                },
              ]}
            >
              5.2
            </Text>
          </View>
          <Text style={[styles.text2, {}]}>Bargaining</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text
            style={[
              styles.text3,
              {
                textDecorationLine: "underline",
              },
            ]}
          >
            Replay
          </Text>
          <Text
            style={[
              styles.text2,
              {
                marginLeft: 20,
                flex: 1,
                textAlign: "justify",
              },
            ]}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </Text>
        </View>
      </View>
    </View>
  );
};
