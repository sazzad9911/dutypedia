import React from "react";
import { View, Dimensions, Text, Image, TouchableOpacity } from "react-native";
import {primaryColor,textColor,backgroundColor} from '../assets/colors'
const { width, height}= Dimensions.get("window");

const ServiceCart = () => {
  return (
    <TouchableOpacity>
      <View style={{ 
        backgroundColor:primaryColor,
        width:(width/2)-30,
        height:180,
        margin:10,
        overflow: "hidden",
        borderRadius:10,
        shadowColor: "#707070",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 4,
      }}>
        <Image style={{
            width:'100%',
            height:'50%'
        }}
          source={{
            uri: "https://t4.ftcdn.net/jpg/03/03/49/75/360_F_303497515_ZHOwfTtuo5sYpAeoqWRZnkXZNZDKZeMz.jpg",
          }}
        />
        <View style={{
            padding:10
        }}>
          <Text style={{
            fontSize:12,
            fontFamily:'Poppins-Medium',
            lineHeight:15
          }}>I Will Make Custom Graphics For Your Blog</Text>
          <View style={{
            marginTop:10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Text style={{
                fontSize:14,
                fontFamily:'Poppins-Medium'
            }}>500৳</Text>
            <Text style={{
                fontSize:10,
                fontFamily:'Poppins-Medium'
            }}>View 10k</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCart;
