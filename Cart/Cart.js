import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity,Platform } from "react-native";
import { Color } from "./../assets/colors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch,useSelector} from 'react-redux';

const { width, height } = Dimensions.get("window");
function Cart(props) {
  const data=props.data;
  const onPress=props.onPress;
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const isDark=useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const assentColor=colors.getAssentColor();
  
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity onPress={()=>{
        if(onPress){
          //console.log(data.title)
          onPress(data.title)
        }
        return
        if(navigation){
          navigation.navigate('CategoryList',{title:data?data.title:null })
        }
      }}
        style={{
          width: width / 3,
          height: 153,
          shadowColor: assentColor,
          backgroundColor: primaryColor,
          margin: 6,
          borderRadius: 5,
          borderWidth:1,
          borderColor:"#F1EFEF"
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
