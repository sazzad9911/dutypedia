import React from "react";
import { View, ScrollView, TouchableOpacity, Dimensions,FlatList } from "react-native";
import { Text } from "react-native";
import { bigIcon } from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import { FontAwesome } from "@expo/vector-icons";
import { primaryColor, backgroundColor, textColor } from "../../assets/colors";
import Button from './../../components/Button';
const { height, width } = Dimensions.get("window");
import {useSelector,useDispatch} from 'react-redux';
import {getGigs} from '../../Class/service'

const DashboardList = ({navigation}) => {
    const vendorInfo =useSelector(state=>state.vendorInfo)
    const user= useSelector((state) => state.user);
    const [Data,setData]=React.useState()
    const dispatch=useDispatch()

    React.useEffect(() => {
        if(user&&vendorInfo){
            getGigs(user.token,vendorInfo.service.id).then((res)=>{
                if(res){
                 return   setData(res.gigs)
                }
                return setData([])
            })
        }
    },[user+vendorInfo])

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SvgXml
        style={{
          marginTop: height / 10,
          alignSelf:'center'
        }}
        xml={bigIcon}
        height="120"
        width="120"
      />
      <View style={{ height: 90,marginTop:30}}>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ width: 10 }} />
          {Data?(
            Data.map((doc,i)=>(
                <Cart onChange={data=>{
                    dispatch({type: 'SET_VENDOR',playload:data})
                    navigation.navigate("Profile")
                }} key={i} data={doc} />
            ))
          ):(
            <Text>Loading...</Text>
          )}
          <View style={{ width: 10 }} />
        </ScrollView>
      </View>
      <Button onPress={()=>{
        navigation.navigate('MainCategory')
      }} style={{
        position: "absolute",
        bottom: 20,
        borderWidth:0,
        color:textColor,
        alignSelf: "center"
      }} title={'Create an another business account'}/>
    </View>
  );
};

export default DashboardList;
const Cart = ({ data, onChange }) => {
   const service=data.service;
   const image=data.service.profilePhoto;
   const title=data.service.serviceCenterName;
   const id=data.id
  return (
    <TouchableOpacity onPress={()=>{
        if(onChange){
            onChange(data)
        }
    }}>
    <View
      style={{
        flexDirection: "row",
        width: 250,
        backgroundColor: primaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        margin: 10,
        borderRadius: 5,
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowRadius: 1,
        elevation: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#e5e5e5",
          borderRadius: 20,
          height: 40,
          width: 40,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
          overflow: "hidden",
        }}
      >
        {image ? (
          <Image
            style={{
              height: 35,
              width: 35,
              borderRadius: 20,
            }}
            source={image}
          />
        ) : (
          <FontAwesome name="user" size={35} color={backgroundColor} />
        )}
      </View>
      <View>
        <Text numberOfLines={1} style={{
            fontSize:15,
            fontFamily:'Poppins-Medium',
        }}>{title?title:'Sazzad It Center'}</Text>
        <Text style={{
            fontSize:13,
            fontFamily:'Poppins-Light',
            color:'#707070'
        }}>Tap To Login</Text>
      </View>
    </View>
  </TouchableOpacity>
  );
};
