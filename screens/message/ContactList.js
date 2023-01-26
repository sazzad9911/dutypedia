import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Animated,Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ChatMemberCart from "../../Cart/ChatMemberCart";
import { getOnlineUser } from "../../Class/member";
import { getConversation } from "../../Class/message";
import { getOnlineUsers, getSocket } from "../../Class/socket";
import ActivityLoader from "../../components/ActivityLoader";
import ChatHeader from "../../components/ChatHeader";
import SearchBar from "../../components/SearchBar";

export default function ContactList({navigation}) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [Members,setMembers]=React.useState()
  const [AllMembers,setAllMembers]=useState()
  const user=useSelector(state=>state.user)
  const [Loader,setLoader]=React.useState(true)
  const vendor=useSelector(state=>state.vendor)
  const isFocused=useIsFocused()


  React.useEffect(()=>{
    if(user&&vendor){
      getOnlineUser(user.token,vendor.service.id).then(res=>{
        setLoader(false)
        setMembers(res.members)
        setAllMembers(res.members)
        //console.log(res.members)
      }).catch(err=>{
        setLoader(false)
        console.warn(err.response.data.msg)
      })
      
    }else{
      setLoader(false)
    }
    
    
  },[user,vendor,isFocused])
  const search=(val,data)=>{
    if(!Array.isArray(data)){
      return []
    }
    if(!val){
      return data
    }
    return data.filter(d=>d.user.username.toUpperCase().match(val.toUpperCase()))
  }

  if(Loader){
    return (
      <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <ActivityLoader/>
      </View>
    )
  }
  return (
    <ScrollView style={{flex:1}}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      stickyHeaderHiddenOnScroll={true}
      stickyHeaderIndices={[0]}
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y);
      }}
    >
    <Animated.View
      style={[
        {
          transform: [{ translateY: translateY }],
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 500,
        },
      ]}
    >
        <SearchBar onChange={e=>{
          setMembers(search(e,AllMembers))
        }} />
    </Animated.View>
      
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        {Members&&Members.map((doc,i)=>(
        <ChatMemberCart
        onPress={()=>{
          navigation.navigate("ChatScreen",{data:{
            users:[
              doc,
            ]
          },username:doc.user.username})
        }} userId={doc.user.id} key={i}  
        name={`${doc.user.firstName} ${doc.user.lastName}`} 
        username={`@${doc.user.username}`} image={{uri:doc.user.profilePhoto}} />
        ))}
        {Members&&Members.length==0&&(
          <Text style={{
            marginVertical:20,
            textAlign:"center",
            fontSize:16
          }}>No Member Added</Text>
        )}
        {!Members&&(
          <Text style={{
            marginVertical:20,
            textAlign:"center",
            fontSize:16
          }}>Ops! Please logged in as ''Vendor''</Text>
        )}
      </View>
    </ScrollView>
  );
}
