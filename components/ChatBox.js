import React from "react";
import { View, Text, ScrollView, Dimensions, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { serverTimeToLocal } from "../action";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");


const ChatBox = (props) => {
  const [send, setSend] = React.useState();
  const [message, setMessage] = React.useState();
  const window = Dimensions.get("window");
  const user = useSelector((state) => state.user);
  const [layoutWidth, setLayoutWidth] = React.useState(100);
  const isFocused=useIsFocused()
  const [image,setImage]=React.useState()

  React.useEffect(() => {
    if (props.data) {
      let data = props.data;
      //console.log(data)
      //console.log(data.text)
      setImage(data.image)
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
      <View onLayout={e=>{
        if(props.onLayout){
          props.onLayout(e)
        }
      }}
        style={{
          margin: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#C4FFC4",
            borderRadius: 10,
            padding: 10,
            alignContent: "center",
            width: width / 2,
            marginLeft:width/2-20
          }}
        >
         {message&&(
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
          )}
          {image&&(
            <Image style={{
              width:"100%",
              height:width/2-80
            }} source={{uri:image}}/>
          )}

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
              {props.data?serverTimeToLocal(props.data.updatedAt):"2:30 pm"}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }
  return (
    <View onLayout={e=>{
      if(props.onLayout){
        props.onLayout(e)
      }
    }}>
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
          {message&&(
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
          )}
          {image&&(
            <Image style={{
              width:"100%",
              height:width/2-80,
              
            }} source={{uri:image}}/>
          )}
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
              {props.data?serverTimeToLocal(props.data.updatedAt):"2:30 pm"}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatBox;
