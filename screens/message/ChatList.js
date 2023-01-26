import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { View, Animated, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import ChatCart from "../../Cart/ChatCart";
import { getConversation } from "../../Class/message";
import ActivityLoader from "../../components/ActivityLoader";
import SearchBar from "../../components/SearchBar";

export default function ChatList(props) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [Conversations,setConversations]=React.useState()
  const [AllConversation,setAllConversations]=React.useState()
  const user=useSelector(state=>state.user)
  const [Loader,setLoader]=React.useState(true)
  const isFocused=useIsFocused()

  React.useEffect(()=>{
    if(user){
     getConversation(user.token).then(res=>{
      setLoader(false)
      setConversations(res.data.conversations)
      setAllConversations(res.data.conversations)
      //console.warn(res.data.conversations)
     }).catch(err=>{
      setLoader(false)
      console.warn(err.response.data.msg)
     })
    }
  },[user,isFocused])

  const search=(val,data)=>{
    if(!Array.isArray(data)){
      return []
    }
    if(!val){
      return data
    }
    return data.filter(d=>d.users.filter(s=>s.userId!=user.user.id)[0].user.username.toUpperCase().match(val.toUpperCase()))
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
    <ScrollView
      style={{ flex: 1 }}
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
          setConversations(search(e,AllConversation))
        }} />
      </Animated.View>

      {Conversations && Conversations.map((doc, i) => <ChatCart data={doc} key={i} {...props} />)}
    </ScrollView>
  );
}
