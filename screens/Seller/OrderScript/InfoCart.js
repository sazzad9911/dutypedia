import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import Avatar from "../../../components/Avatar";

export default function InfoCart({
  uri,
  title,
  name,
  position,
  onMessage,
  onClick,
  style,
  vendor,
  username
}) {
  if(vendor){
    return(
      <View
      style={[
        {
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          marginTop: 32,
          marginBottom:36,
        },
        style,
      ]}>
      <Avatar onPress={onClick} source={{ uri: uri }} style={styles.image} />
      <View
        style={{
          marginLeft: 16,
          flex: 1,
        }}>
        
        <Text numberOfLines={1} style={[styles.text, { marginRight: 60,marginTop:0}]}>
          {name}
        </Text>
        <Text numberOfLines={1} style={[styles.text, { marginRight: 60 }]}>
          @{username}
        </Text>
      </View>
      <Pressable
        style={{
          alignSelf: "flex-end",
        }}
        onPress={onMessage}>
        <SvgXml xml={icon} />
      </Pressable>
    </View>
    )
  }
  return (
    <View
      style={[
        {
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          marginTop: 32,
          marginBottom:36
        },
        style,
      ]}>
      <Avatar onPress={onClick} source={{ uri: uri }} style={styles.image} />
      <View
        style={{
          marginLeft: 16,
          flex: 1,
        }}>
        <Text numberOfLines={1} style={styles.headline}>
          {title}
        </Text>
        <Text numberOfLines={1} style={[styles.text, { marginRight: 60 }]}>
          {name}
        </Text>
        <Text numberOfLines={1} style={[styles.text, { marginRight: 60 }]}>
          {position}
        </Text>
      </View>
      <Pressable
        style={{
          alignSelf: "flex-end",
        }}
        onPress={onMessage}>
        <SvgXml xml={icon} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
  },
  headline: {
    fontSize: 14,
    fontWeight: "500",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
  },
});
const icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.875 8.4375H13.125C13.4703 8.4375 13.75 8.15781 13.75 7.8125V7.1875C13.75 6.84219 13.4703 6.5625 13.125 6.5625H6.875C6.52969 6.5625 6.25 6.84219 6.25 7.1875V7.8125C6.25 8.15781 6.52969 8.4375 6.875 8.4375ZM6.25 11.5625C6.25 11.9078 6.52969 12.1875 6.875 12.1875H13.125C13.4703 12.1875 13.75 11.9078 13.75 11.5625V10.9375C13.75 10.5922 13.4703 10.3125 13.125 10.3125H6.875C6.52969 10.3125 6.25 10.5922 6.25 10.9375V11.5625ZM10 16.2941C9.35859 16.2941 8.71719 16.0965 8.16953 15.7008L0 9.79922V18.125C0 19.1605 0.839453 20 1.875 20H18.125C19.1605 20 20 19.1605 20 18.125V9.79922L11.8305 15.7008C11.2828 16.0961 10.6414 16.2941 10 16.2941ZM19.2816 6.36523C18.9359 6.09414 18.6082 5.83906 18.125 5.47422V3.75C18.125 2.71445 17.2855 1.875 16.25 1.875H13.2207C13.102 1.78906 12.9914 1.70859 12.8676 1.61875C12.2109 1.13945 10.9062 -0.0136734 10 -1.54802e-06C9.09375 -0.0136734 7.78945 1.13945 7.13242 1.61875C7.00859 1.70859 6.89805 1.78906 6.7793 1.875H3.75C2.71445 1.875 1.875 2.71445 1.875 3.75V5.47422C1.3918 5.83867 1.06406 6.09414 0.718359 6.36523C0.494593 6.5406 0.313639 6.76455 0.189185 7.02016C0.0647315 7.27577 3.85081e-05 7.55633 0 7.84062L0 8.25664L3.75 10.9656V3.75H16.25V10.9656L20 8.25664V7.84062C20 7.26484 19.7352 6.7207 19.2816 6.36523Z" fill="#4ADE80"/>
</svg>
`;
