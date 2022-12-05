import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  Platform,
  Dimensions
} from "react-native";
import {
  Color
} from "./../assets/colors";
import { SvgXml } from "react-native-svg";
import { star } from "../assets/icon";
import { AntDesign } from "@expo/vector-icons";
import {useDispatch,useSelector} from 'react-redux'
const { width, height } = Dimensions.get("window");

const RelatedService = (props) => {
  const navigation = props.navigation;
  const [Like, seLike] = React.useState(false);
  const data = props.data;
  const isDark=useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const assentColor=colors.getAssentColor();
  const backgroundColor=colors.getBackgroundColor();
  
  return (
    <TouchableOpacity
      onPress={() => {
        if(navigation){
          navigation.navigate("OtherProfile",{serviceId:data?data.service.id:null,data:data});
        }
      }}
      style={{
        width: width/3+20,
        height: 280,
        borderRadius: 10,
        shadowColor: assentColor,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 6,
        elevation: 5,
        margin: 10,
        backgroundColor:primaryColor
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: primaryColor,
          borderRadius: 10
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "50%",
            borderRadius: 10,
          }}
          source={{
            uri:data?data.images[0]: "https://www.ouc.com/images/business/3-4.jpg?sfvrsn=3294c0f0_2",
          }}
        />
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <SvgXml xml={star} height="15" width="15" />
            <Text
              style={{
                marginLeft: 5,
                color: textColor,
                fontFamily: 'Poppins-Medium',
                marginTop:-2
              }}
            >
              5.0
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              //setLike(!Like)
            }}
          >
            {Like ? (
              <AntDesign name="heart" size={24} color="#DA1e37" />
            ) : (
              <AntDesign name="hearto" size={24} color={backgroundColor} />
            )}
          </TouchableOpacity>
        </View>
        <Text
          numberOfLines={3}
          style={{
            marginHorizontal: 10,
            color: textColor,
            fontFamily: 'Poppins-Medium',
            fontSize:13
          }}
        >
          {data?data.title:"I will make custom graphic for your blog I will"}
        </Text>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginVertical: 10,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: textColor,
                fontFamily: 'Poppins-Light'
              }}
            >
              From
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: textColor,
                marginLeft: 5,
                fontFamily: 'Poppins-Medium'
              }}
            >
              {data?data.price:"0"}৳
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RelatedService;
