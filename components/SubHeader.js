import React from "react";
import { View, Text, TouchableOpacity, Platform,Pressable } from "react-native";
import { Color } from "./../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const SubHeader = (props) => {
  const navigation = props.navigation;
  const params = props.route ? props.route.params : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const inset=useSafeAreaInsets()

  return (
    <View style={[{
        paddingHorizontal:20,
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:12,
        justifyContent:"center",
        marginTop:inset?.top
        //marginTop:!no?StatusBar.currentHeight:0
    },props?.style]}>
        <Pressable onPress={()=>{
            if(props.onPress){
                props.onPress()
                return
            }
            navigation.goBack()
        }} style={{
            position:"absolute",
            left:20,
            zIndex:2
        }}>
            <SvgXml xml={backIcon}/>
        </Pressable>
        <Text style={[{
            color:"#1A1A1A",
            fontSize:20,
            fontWeight:"500",
           
        },props?.fontStyle]}>{props?.title}</Text>
    </View>
  )
};

export default SubHeader;
const backIcon=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`