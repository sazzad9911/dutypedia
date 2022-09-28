import React from "react";
import { View, Dimensions, Text } from "react-native";
import {
  primaryColor,
  backgroundColor,
  textColor,
} from "../../../assets/colors";
const { width, height } = Dimensions.get("window");
import Button from "./../../../components/Button";

const AlertModal = ({ title, subTitle, onChange }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center",
     alignItems: "center",backgroundColor:'rgba(0, 0, 0, 0.084)' }}>
      <View
        style={{
          width: width - 80,
          backgroundColor: primaryColor,
          justifyContent: "center",
          alignItems: "center",
          shadowOffset: {
            height: 2,
            width: 2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 5,
          shadowColor: "#707070",
          paddingVertical: 30,
          borderRadius:5
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins-Medium",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Light",
          }}
        >
          {subTitle}
        </Text>
        <View style={{ flexDirection: "row",
         justifyContent: "space-between",
         marginTop: 10
          }}>
          <Button onPress={() => {
            if(onChange){
                onChange('ok')
            }
          }}
            style={{
              backgroundColor: backgroundColor,
              color: "white",
              marginRight:30,
              borderWidth:0
            }}
            title="Ok"
          />
          <Button onPress={()=>{
            if(onChange){
                onChange('cancel')
            }
          }} style={{
            color:textColor,
          }} title="Cancel" />
        </View>
      </View>
    </View>
  );
};

export default AlertModal;
