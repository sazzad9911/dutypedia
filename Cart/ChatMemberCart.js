import React, { useEffect ,useState} from "react";
import { View, Text, Pressable } from "react-native";
import { getSocket } from "../Class/socket";
import Avatar from "../components/Avatar";

export default function ChatMemberCart({ name, username, active, image,userId,onPress,data }) {
  const [Active,setActive]=useState(false)

  useEffect(()=>{
    const socket=getSocket(userId)
    socket.on("getUsers",users=>{
      if(Array.isArray(users)){
        let arr=users.filter(d=>d.userId==userId)
        if(arr.length>0){
          setActive(true)
        }
      }
    })
  },[])
  return (
    <Pressable onPress={()=>{
      if(onPress){
        onPress()
      }
    }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop:12,
          //backgroundColor:"#4ADE80"
        }}
      >
        <View>
          <Avatar
            style={{
              height: 40,
              width: 40,
              borderWidth:1,
              borderColor:"#e5e5e5"
            }}
            source={image}
          />
          {/* <View
            style={{
              backgroundColor: Active ? "#4ADE80" : "#F0EFEF",
              width: 10,
              height: 10,
              borderRadius: 5,
              position: "absolute",
              top: 5,
              right: 0,
              borderWidth: 1,
              borderColor: "#e5e5e5",
            }}
          /> */}
        </View>
        <View
          style={{
            marginLeft: 10,
            borderBottomWidth:1,
            height:"100%",
            flex:1,
            borderBottomColor:"#E6E6E6",
            flexDirection:"row",
            alignItems:"center",
            paddingVertical:12
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
            }}
          >
            {name}
          </Text>
          {/* <Text
            style={{
              fontSize: 14,
            }}
          >
            {username}
          </Text> */}
        </View>
      </View>
    </Pressable>
  );
}
