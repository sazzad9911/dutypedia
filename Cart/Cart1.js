import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity,Platform } from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
import { Foundation } from "@expo/vector-icons";
import {SvgXml} from 'react-native-svg'

const { width, height } = Dimensions.get("window");
function Cart1(props) {
  const [Select, setSelect] = React.useState(false);
  const data=props.data
  React.useEffect(() => {
    //console.log(props.data.icon);
  },[])
  return (
    <View
      style={{
        width: 250,
        height: 50,
        shadowColor: Platform.OS =="ios"?"#ebebeb":"#DDDDDD",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: .7,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor: primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data?(
          <SvgXml xml={data.icon} height="20" width="20" />
        ):(
          <Foundation
          style={{
            
          }}
          name="music"
          size={24}
          color={"#707070"}
        />
        )}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 2,
        }}
      >
        <Text numberOfLines={1}
          style={{
            color: textColor,
            fontSize:13,
            fontFamily: 'Poppins-SemiBold'
          }}
        >
          {data?data.title:"Builder Service"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setSelect(!Select)}
        style={{
          borderColor: textColor,
          borderRadius: 15,
          height: 32,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          width:60,
          marginLeft:10,
          marginRight:10
        }}
      >
        <Text
          style={{
            color: textColor,
            fontSize:12,
            fontFamily: 'Poppins-Medium',
            margin:5
          }}
        >
          {Select ? "done" : "+add"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Cart1;
