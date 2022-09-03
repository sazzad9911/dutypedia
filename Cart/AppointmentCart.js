import React from "react";
import { View, TouchableOpacity, Image, Text,StyleSheet } from "react-native";
import { primaryColor,textColor } from "./../assets/colors";
import { AntDesign } from "@expo/vector-icons";

const AppointmentCart = ({onPress,status,request}) => {
  return (
    <TouchableOpacity onPress={()=>{
      if(onPress) {
        onPress()
      }
    }}
      style={{
        width: "100%",
        flexDirection: "row",
        backgroundColor:primaryColor,
        alignItems: "center",
        paddingHorizontal:20
      }}
    >
      <Image style={{
        width:50,
        height:50,
        borderRadius:5,
      }}
        source={{
          uri: "https://www.ouc.com/images/business/3-4.jpg?sfvrsn=3294c0f0_2",
        }}
      />
      <View style={{
        flexDirection: "row",
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5',
      }}>
        <View style={{
          flex:2,
          paddingHorizontal:5
        }}>
          <Text style={styles.text} numberOfLines={1}>EASIN ARAFAT</Text>
          <Text style={styles.text} numberOfLines={1}>@easinarafat</Text>
        </View>
        <View style={{ 
          flex:6,
          paddingHorizontal:5
        }}>
          <View style={{
            flexDirection:'row'
          }}>
          <Text style={styles.text} numberOfLines={1}>01/012/2022 8:00 Pm</Text>
          {status&&status=='ok'?(
            <Text style={[{
            marginLeft:5,
            color:'green',
          },styles.text]}>{request?'(Accepted)':'(Completed)'}</Text>
          ):status?(
            <Text style={[{
            marginLeft:10,
            color:'red',
          },styles.text]}>(Canceled)</Text>
          ):(
            <></>
          )}
          </View>
          <Text style={styles.text} numberOfLines={1}>Business Deal And Contract Sign</Text>
        </View>
        <View style={{ 
          flex:1.5,
          paddingHorizontal:10
        }}>
          <AntDesign name="right" size={24} color={textColor} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentCart;
const styles = StyleSheet.create({
  text:{
    fontSize:12,
    fontFamily: 'Poppins-Medium'
  }
})
