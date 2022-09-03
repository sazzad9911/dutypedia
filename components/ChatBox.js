import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ChatBox = (props) => {
  const window = Dimensions.get("window");
  if(props.send){
    return(
        <View
        style={{
          margin: 10,
        }}
      >
        <View
          style={{
            width: 240,
            backgroundColor: "#C4FFC4",
            borderRadius: 10,
            padding: 10,
            alignSelf:'flex-end'
          }}
        >
          <Text style={{
            fontSize:13,
            fontFamily: 'Poppins-Light'
          }}>
            {props.message}
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 155,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                flex: 3,
                fontColor: "#808080",
              }}
            >
              {" "}
              2.30 pm
            </Text>
            <AntDesign
              style={{
                flex: 1,
                marginTop: 3,
              }}
              name="checkcircle"
              size={10}
              color="#808080"
            />
          </View>
        </View>
      </View>
    )
  }
  return (
    <View>
      <View
        style={{
          margin: 10,
        }}
      >
        <View
          style={{
            width: 240,
            backgroundColor: "#d1d1d1",
            borderRadius: 10,
            padding: 10,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text Style={{
            fontSize:14,
            fontFamily: 'Poppins-Light'
          }}>
          {props.message}
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 155,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                flex: 3,
                fontColor: "#808080",
                fontFamily: "Poppins-Light"
              }}
            >
              {" "}
              2.30 pm
            </Text>
            <AntDesign
              style={{
                flex: 1,
                marginTop: 3,
              }}
              name="checkcircle"
              size={10}
              color="#808080"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatBox;
