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
  const user=useSelector(state=>state.user)
  const [Loader,setLoader]=React.useState(false)

  React.useEffect(()=>{
    if(user){
      setLoader(true)
     getConversation(user.token).then(res=>{
      setLoader(false)
      setConversations(res.data.conversations)
      //console.log(res.data.conversations)
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
        <SearchBar />
      </Animated.View>

      {Conversations && Conversations.map((doc, i) => <ChatCart data={doc} key={i} {...props} />)}
    </ScrollView>
  );
}
