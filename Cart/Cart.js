import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity,Platform } from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch} from 'react-redux';

const { width, height } = Dimensions.get("window");
function Cart(props) {
  const data=props.data;
  const dispatch = useDispatch();
  const navigation = props.navigation;
  
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity onPress={()=>{
        if(navigation){
          navigation.navigate('CategoryList',{title:data?data.title:null })
        }
      }}
        style={{
          width: width / 3-30,
          height: 150,
          shadowColor: Platform.OS == "ios" ? "#ebebeb" : "#DDDDDD",
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 5,
          backgroundColor: primaryColor,
          margin: 10,
          marginLeft: 5,
          borderRadius: 5,
        }}
      >
        <Image
          style={{
            height: 90,
            width: "100%",
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            backgroundColor:'black',
            opacity: .9
          }}
          source={data?data.picture:{
            uri: "https://www.ouc.com/images/business/3-4.jpg?sfvrsn=3294c0f0_2",
          }}
        />

        <Text
          numberOfLines={2}
          style={{
            color: textColor,
            margin: 10,
            marginTop: 17,
            fontFamily: "Poppins-SemiBold",
            fontSize: 13,
          }}
        >
          {data?data.title:"Builder Service"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default Cart;
