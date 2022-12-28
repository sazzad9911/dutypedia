import React from "react";
import { View, Text, ScrollView, Dimensions, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const ChatBox = (props) => {
  const [send, setSend] = React.useState();
  const [message, setMessage] = React.useState();
  const window = Dimensions.get("window");
  const user = useSelector((state) => state.user);
  const [layoutWidth, setLayoutWidth] = React.useState(100);

  React.useEffect(() => {
    if (props.data) {
      let data = props.data;
      setMessage(data.text);
      if (data.senderId == user.user.id) {
        setSend(true);
      } else {
        setSend(false);
      }
    }
  }, [props.data]);
  if (send) {
    return (
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
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Poppins-Light",
            }}
          >
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
    );
  }
  return (
    <View>
      <View
        style={{
          margin: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#d1d1d1",
            borderRadius: 10,
            padding: 10,
            alignContent: "center",
            width: width / 2,
          }}
        >
          <Text
            onLayout={(e) => {
              if (layoutWidth == 0) {
                setLayoutWidth(e.nativeEvent.layout.width);
              }
            }}
            Style={{
              fontSize: 14,
              fontFamily: "Poppins-Light",
            }}
          >
            {message}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <AntDesign
              style={{
                marginTop: 0,
              }}
              name="checkcircle"
              size={10}
              color="#808080"
            />
            <Text
              style={{
                fontSize: 10,
                fontColor: "#808080",
                fontFamily: "Poppins-Light",
              }}
            >
              {" "}
              2.30 pm
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatBox;
