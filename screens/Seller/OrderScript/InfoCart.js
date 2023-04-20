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
  username,
  paid,
  onAgreement
}) {
  if (vendor) {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 32,
            marginBottom: 36,
          },
          style,
        ]}>
        <Avatar onPress={onClick} source={{ uri: uri }} style={styles.image} />
        <View
          style={{
            marginLeft: 16,
            flex: 1,
          }}>
          <Text
            numberOfLines={1}
            style={[styles.text, { marginRight: 60, marginTop: 0 }]}>
            {name}
          </Text>
          <Text numberOfLines={1} style={[styles.text, { marginRight: 60 }]}>
            @{username}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}>
          <Pressable
            style={{
              alignSelf: "flex-end",
            }}
            onPress={onMessage}>
            <SvgXml xml={icon} />
          </Pressable>
          {paid && (
            <Pressable
              style={{
                alignSelf: "flex-end",
                marginLeft: 12,
              }}
              onPress={onAgreement}>
              <SvgXml xml={scr} />
            </Pressable>
          )}
        </View>
      </View>
    );
  }
  return (
    <View
      style={[
        {
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          marginTop: 32,
          marginBottom: 36,
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
const scr = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 2.25011C13.5 3.49018 12.3637 4.50023 10.9688 4.50023H7.03125C6.33375 4.50023 5.70375 4.25022 5.2425 3.8402C4.78125 3.43017 4.5 2.87015 4.5 2.25011C4.5 1.01005 5.63625 0 7.03125 0H10.9688C11.6663 0 12.2963 0.250013 12.7575 0.660034C13.2188 1.07005 13.5 1.63008 13.5 2.25011Z" fill="#4ADE80"/>
<path d="M16.6838 3.02913C16.4236 2.83937 16.1312 2.68748 15.8175 2.57911C15.4912 2.4691 15.165 2.69912 15.0975 2.99913C14.715 4.70922 13.0162 5.99928 10.9688 5.99928H7.03125C5.90625 5.99928 4.84875 5.60926 4.05 4.89923C3.46569 4.3839 3.06637 3.72616 2.9025 3.00913C2.835 2.70912 2.4975 2.4691 2.17125 2.58911C0.86625 3.05913 0 4.11919 0 6.2493V15.9998C0 18.9999 2.01375 20 4.5 20H13.5C15.9862 20 18 18.9999 18 15.9998V6.2493C18 4.61921 17.4937 3.61916 16.6838 3.02913ZM4.5 10.2495H9C9.46125 10.2495 9.84375 10.5895 9.84375 10.9995C9.84375 11.4096 9.46125 11.7496 9 11.7496H4.5C4.03875 11.7496 3.65625 11.4096 3.65625 10.9995C3.65625 10.5895 4.03875 10.2495 4.5 10.2495ZM13.5 15.7498H4.5C4.03875 15.7498 3.65625 15.4098 3.65625 14.9997C3.65625 14.5897 4.03875 14.2497 4.5 14.2497H13.5C13.9613 14.2497 14.3438 14.5897 14.3438 14.9997C14.3438 15.4098 13.9613 15.7498 13.5 15.7498Z" fill="#4ADE80"/>
</svg>
`;
