import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Color } from "./../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const SubHeader = (props) => {
  const navigation = props.navigation;
  const params = props.route ? props.route.params : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: 0,
        }}
      >
        <View
          style={[
            {
              backgroundColor: primaryColor,
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10,
            },
            props.style,
          ]}
        >
          <AntDesign
            onPress={() => {
              if (props.onPress) {
                return props.onPress();
              }
              navigation.goBack();
            }}
            style={{
              marginLeft: 20,
            }}
            name="left"
            size={22}
            color={assentColor}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              flex: 1,
              textAlign: "center",
              marginLeft: -50,
              zIndex: -1,
              color: textColor,
            }}
          >
            {props.title ? props.title : params.title ? params.title : ""}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubHeader;
