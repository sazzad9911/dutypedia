import React from "react";
import { View, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ChatMemberCart from "../../Cart/ChatMemberCart";
import ChatHeader from "../../components/ChatHeader";
import SearchBar from "../../components/SearchBar";

export default function ContactList(props) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
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
        <ChatMemberCart name="Easin Arafat" username={"@easinarafat"}/>
        <ChatMemberCart name="Easin Arafat" username={"@easinarafat"}/>
      </View>
    </ScrollView>
  );
}
