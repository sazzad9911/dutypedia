import React, { useEffect } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity,Platform } from "react-native";
import { Color } from "./../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {useDispatch,useSelector} from 'react-redux'
import { getUserInfo } from "../Class/member";
import { setSaveList } from "../Reducers/saveList";
import { storeJson } from "../Class/storage";

const { width, height } = Dimensions.get("window");
function Cart2(props) {
  const [Love, setLove] = React.useState(false);
  const navigation = props.navigation;
  const data= props.data?props.data:null;
  const dispatch=useDispatch();
  const isDark=useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const assentColor=colors.getAssentColor();
  const user=useSelector(state=>state.user);
  const [User,setUser]=React.useState()
  const onPress=props.onPress;
  const saveList=useSelector(state=>state.saveList)

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
    if(saveList&&data){
      let arr=saveList.filter(d=>d.id==data.id)
      if(arr.length>0){
        setLove(true)
      }else{
        setLove(false)
      }
    }
  },[saveList])
  
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch({type: 'SET_INTEREST_CATEGORY',playload:"cart2"})
        if(onPress){
          onPress(data)
          return
        }
        navigation.navigate("OtherProfile",{serviceId:data?data.service.id:null,data:data})
      }}
      style={{
        width: 260,
        shadowColor: assentColor,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor: primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 5,
        paddingBottom: 15,
      }}
    >
      <Image
        style={{
          height: 130,
          width: "100%",
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}
        source={{
          uri: data?data.images[0]:"https://media.istockphoto.com/photos/graphic-designer-at-work-picture-id1363772590?b=1&k=20&m=1363772590&s=170667a&w=0&h=u2GS9_Sd396ng762zsKCR9zonfsw83lssqpxdlh0F4g=",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <View>
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 20,
              flex: 1,
              backgroundColor:'#e5e5e5'
            }}
            source={{
              uri:data?data.service.profilePhoto: "https://img.freepik.com/free-photo/stylish-little-smiling-girl-posing-dress-isolated-white-studio-background-caucasian-blonde-female-model-human-emotions-facial-expression-childhood-standing-with-hands-crossed_155003-23028.jpg?w=2000",
            }}
          />
          <View style={{
            width:10,
            height:10,
            backgroundColor:primaryColor,
            borderColor:assentColor,
            borderWidth: 1,
            borderRadius:5,
            position: "absolute",
            right:0,
            bottom:3,
          }}/>
        </View>
        <View
          style={{
            marginLeft: 10,
            flex: 5,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 13,
              color:textColor
            }}
          >
            {data?data.service.serviceCenterName:"Stock And Forex Market Training Center"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontFamily: 'Poppins-Light',
              color:textColor
            }}
          >
            {`Specialty: ${data?.service.speciality}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            marginTop: 5,
            flex: 6,
            marginBottom: 5,
            alignItems: "center",
          }}
        >
          <FontAwesome name="star" size={15} color="#FFCC00" />
          <FontAwesome style={{marginLeft:1.5}} name="star" size={14} color="#FFCC00" />
          <FontAwesome style={{marginLeft:1.5}} name="star" size={14} color="#FFCC00" />
          <FontAwesome style={{marginLeft:1.5}} name="star" size={14} color="#FFCC00" />
          <FontAwesome style={{marginLeft:1.5}} name="star" size={14} color="#FFCC00" />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 12,
              color: '#898585',
              fontFamily: 'Poppins-Medium'
            }}
          >
            5.0
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            marginTop: 5,
         
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#898585',
              fontFamily: 'Poppins-Medium'
            }}
          >
            View {data?data.service.views:"0"}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={2}
        style={{
          marginLeft: 10,
          marginRight: 10,
          color: textColor,
          fontSize:13,
          textAlign: 'justify',
          fontFamily: 'Poppins-Medium'
        }}
      >
        {data?data.title:"I Will Make a Custom Graphics For Your Blog"}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            flex: 6,
            marginLeft: 10,
            fontSize: 20,
            color: textColor,
            fontFamily: 'Poppins-Medium'
          }}
        >
          {data?data.price:'0'}৳
        </Text>
        <TouchableOpacity
          onPress={() => {
            setLove(!Love)
            //console.log(data)
            listSave(data)
          }}
          style={{
            flex: 1,
          }}
        >
          {Love ? (
            <AntDesign name="heart" size={24} color="#DA1e37" />
          ) : (
            <AntDesign name="hearto" size={24} color="#DA1e37" />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default Cart2;
