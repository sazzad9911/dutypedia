import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { primaryColor, textColor } from './../assets/colors';
import {useDispatch} from 'react-redux';
import Animated,{FadeIn} from "react-native-reanimated";


export default function SellerCart({navigation,onPress,title,buttonTitle,style}) {
  const dispatch= useDispatch()
  return (
    <Animated.View entering={FadeIn}
      style={[{
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: "#EBE4CD",
        borderRadius: 5,
        margin: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
      },style]}
    >
      <View
        style={{
          flex: 3,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            marginLeft: 20,
            marginTop: 20,
            fontFamily: 'Poppins-Medium'
          }}
        >
          {title? title:"Become A Seller"}
        </Text>
        <TouchableOpacity onPress={()=>{
          dispatch({type: 'SET_INTEREST_CATEGORY',playload:"Sellercart"})
          if(onPress){
            onPress()
            return
          }
          navigation.navigate('Category')
        }}
          style={{
            marginLeft: 20,
            marginTop: 20,
            height: 40,
            backgroundColor: primaryColor,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            width: 160,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Poppins-SemiBold',
              color:textColor
            }}
          >
            {buttonTitle? buttonTitle:"Create An Account"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
        }}
      >
        <Image
          style={{
            height: 120,
            margin: 10,
          }}
          source={{
            uri: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_486140535_970936970450058_85865.jpg",
          }}
        />
      </View>
    </Animated.View>
  );
}
