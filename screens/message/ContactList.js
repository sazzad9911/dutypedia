import React from "react";
import { View, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ChatMemberCart from "../../Cart/ChatMemberCart";
import { getConversation } from "../../Class/message";
import { getOnlineUsers } from "../../Class/socket";
import ActivityLoader from "../../components/ActivityLoader";
import ChatHeader from "../../components/ChatHeader";
import SearchBar from "../../components/SearchBar";

export default function ContactList(props) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [Members,setMembers]=React.useState()
  const user=useSelector(state=>state.user)
  const [Loader,setLoader]=React.useState(false)

  React.useEffect(()=>{
    if(user){
      setLoader(true)
     getConversation(user.token).then(res=>{
      setLoader(false)
      setMembers(res.data.conversations)
     }).catch(err=>{
      setLoader(false)
      console.warn(err.response.data.msg)
     })
    }
  },[user])

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
        <SearchBar />
    </Animated.View>
      
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        
        <ChatMemberCart active={true} name="Easin Arafat" username={"@easinarafat"} />
        <ChatMemberCart  active={true} name="Easin Arafat" username={"@easinarafat"} />
        <ChatMemberCart  active={true} name="Easin Arafat" username={"@easinarafat"} />
      </View>
    </ScrollView>
  );
}
