import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity,Platform } from "react-native";
import { textColor, primaryColor, assentColor } from "./../assets/colors";
import { Foundation } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
function Seller(props) {
  const navigation = props.navigation;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("OtherProfile")}
      style={{
        width: 250,
        height: 50,
        shadowColor: assentColor,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor: primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 5,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          margin: 5,
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
          source={{
            uri: "https://img.freepik.com/free-photo/stylish-little-smiling-girl-posing-dress-isolated-white-studio-background-caucasian-blonde-female-model-human-emotions-facial-expression-childhood-standing-with-hands-crossed_155003-23028.jpg?w=2000",
          }}
        />
      </View>
      <View
        style={{
          marginTop: 5,
          flex: 4,
          marginLeft: 5,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Poppins-Medium'
          }}
        >
          Easin Arafat
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: 'Poppins-Light',
            marginTop: 0
          }}
        >
          Peciality : It
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Seller;
