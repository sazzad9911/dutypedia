import React from "react";
import { Animated, ScrollView,View } from "react-native";

export default function HidableHeaderLayout({ header, component, bottom }) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  });
  return (
    <View style={{flex:1}}>
      <ScrollView
        style={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}>
        <Animated.View
          style={[
            {
              transform: [{ translateY: translateY }],
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              zIndex: 500,
              overflow: "hidden",
            },
          ]}>
          {header}
        </Animated.View>
        {component}
      </ScrollView>
      {bottom}
    </View>
  );
}
