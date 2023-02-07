import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { Color } from "./../assets/colors";
import { SvgXml } from "react-native-svg";
import { star } from "../assets/icon";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");
import { Canvas, useImage } from "@shopify/react-native-skia";
import { setSaveList } from "../Reducers/saveList";
import { storeJson } from "../Class/storage";

const RelatedService = (props) => {
  const onPress=props.onPress;
  const navigation = props.navigation;
  const [Like, setLike] = React.useState(false);
  const data = props.data;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  //console.log(data.images[0])
  const image = useImage(data.images[0]);
  const saveList=useSelector(state=>state.saveList)
  const dispatch=useDispatch()
  //const [Love,setLove]=useState(false)

  const listSave=(doc)=>{
    if(saveList){
      let arr=saveList.filter(d=>d.id==doc.id);
      if(arr.length>0){
        let newArr=saveList.filter(d=>d.id!=doc.id)
        dispatch(setSaveList(newArr))
        storeJson("saveList",newArr)
      }else{
        newArr=saveList;
        newArr.push(doc)
        dispatch(setSaveList(newArr))
        storeJson("saveList",newArr)
      }
    }else{
      let arr=[]
      arr.push(doc)
      dispatch(setSaveList(arr))
      storeJson("saveList",arr)
    }
  }
  useEffect(()=>{
    //console.log(saveList)
    if(saveList){
      let arr=saveList.filter(d=>d.id==data.id)
      if(arr.length>0){
        setLike(true)
      }else{
        setLike(false)
      }
    }
  },[saveList])

  if (props.squire) {
    return (
      <TouchableOpacity
        onPress={() => {
          
          if (navigation) {
            navigation.navigate("OtherProfile", {
              serviceId: data ? data.service.id : null,
              data: data,
            });
          }
        }}
        style={{
          shadowColor: assentColor,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
          borderRadius: 10,
          backgroundColor: primaryColor,
          margin: 10,
        }}
      >
        <View
          style={{
            width: width / 2 - 30,
            overflow: "hidden",
            borderRadius: 10,
            backgroundColor: primaryColor,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: (width / 2 - 10)/2,
              opacity: 0.9,
            }}
            source={{
              uri: data?.images[0],
            }}
          />
          <View
            style={{
              padding: 10,
              paddingTop: 15,
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                fontSize:Platform.OS=="ios"? 14:13,
                fontFamily: "Poppins-Medium",
                lineHeight: 15,
                color: textColor,
              }}
            >
              {data?.title}
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize:Platform.OS=="ios"? 15:14,
                  fontFamily: "Poppins-Medium",
                  color: "#707070",
                }}
              >
                From {data?.price}৳
              </Text>
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
                    fontFamily: "Poppins-Medium",
                    fontSize:15,
                    color:"#707070"
                  }}
                >
                  5.0
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation) {
          navigation.navigate("OtherProfile", {
            serviceId: data ? data.service.id : null,
            data: data,
          });
        }
      }}
      style={{
        width: width / 3 + 20,
        height: 280,
        borderRadius: 10,
        shadowColor: assentColor,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        margin: 10,
        backgroundColor: primaryColor,
      }}
    >
      <View
        style={{
          width: width / 3 + 20,
          height: 280,
          backgroundColor: primaryColor,
          borderRadius: 10,
        }}
      >
        <Image
          style={{
            width: width / 3 + 20,
            height: 140,
            borderRadius: 10,
          }}
          source={{
            uri: data.images[0],
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
                fontFamily: "Poppins-Medium",
                marginTop: -2,
              }}
            >
              5.0
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setLike(!Like)
              listSave(data)
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
            fontFamily: "Poppins-Medium",
            fontSize: 13,
          }}
        >
          {data
            ? data.title
            : "I will make custom graphic for your blog I will"}
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
                fontFamily: "Poppins-Light",
              }}
            >
              From
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: textColor,
                marginLeft: 5,
                fontFamily: "Poppins-Medium",
              }}
            >
              {data ? data.price : "0"}৳
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RelatedService;
