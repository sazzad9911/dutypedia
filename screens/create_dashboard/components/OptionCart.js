import React from "react";
import { Pressable, View, Text, Dimensions, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");

export default function OptionCart({ style ,data,Child}) {
    if(Array.isArray(data)&&data.length>0){
        return (
            <View
              style={[
                {
                  borderColor: "#E6E6E6",
                  borderWidth: 1,
                  borderRadius: 8,
                  maxHeight: height - 350,
                  width:"100%",
                  paddingVertical:10
                },
                style,
              ]}>
              <ScrollView
                style={{
                  paddingHorizontal:10
                  
                }}>
                {Array.isArray(data)&&Child&&data.map((doc, i) => (
                  <Child doc={doc} key={i} index={i} />
                ))}
              </ScrollView>
            </View>
          );
    }
    return <></>
 
}

export const Cart = ({ title, index,onPress }) => {
  return (
    <Pressable onPress={onPress}
      style={{
        paddingHorizontal: 8,
        paddingBottom: 12,
        paddingTop: 4,
        borderBottomColor: "#E6E6E6",
        borderBottomWidth: 1,
        marginTop: index != 0 ? 12 : 0,
      }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "400",
        }}>
        {title}
      </Text>
    </Pressable>
  );
};
