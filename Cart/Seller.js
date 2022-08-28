import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
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
        shadowColor: "#d5d5d5",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 3,
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
          }}
        >
          Easin Arafat
        </Text>
        <Text
          style={{
            fontSize: 10,
          }}
        >
          Peciality : It
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Seller;
