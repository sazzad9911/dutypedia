import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { secondaryColor, primaryColor, textColor } from "../assets/colors";

const BackHeader = (props) => {
  const navigation = props.navigation;
  return (
    <View style={styles.box}>
      <View style={{
        flexDirection: "row",
      }}>
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flex: 1,
            marginLeft: 20,
          }}
          name="left"
          size={25}
          color="black"
        />
        <Text style={styles.text}>Dutypedia</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SearchScreen");
        }}
        style={styles.input}
      >
        <EvilIcons
          style={{
            marginRight: 10,
          }}
          name="search"
          size={24}
          color={textColor}
        />
        <Text
          style={{
            color: textColor,
            fontFamily: "Poppins-Medium",
          }}
        >
          {props.placeholder ? props.placeholder : "Search On Dutypedia"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
export const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: secondaryColor,
    paddingTop: Platform.OS == "ios" ? 28 : 35,
  },
  text: {
    color: textColor,
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    flex:2
  },
  input: {
    margin: 20,
    backgroundColor: primaryColor,
    height: 40,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
