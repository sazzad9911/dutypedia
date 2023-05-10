import React from "react";
import { View, ScrollView, Pressable, Text, Image, ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Menu } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import Avatar from "../../../components/Avatar";
import IconButton from "../../../components/IconButton";
import { useIsFocused } from "@react-navigation/native";
import { getOfflineMembers, getOnlineUser } from "../../../Class/member";
import { Color } from "../../../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateVendorAppointment({ navigation, route }) {
  return (
    <SafeAreaView style={{flex:1}}>
      <Tab.Navigator tabBar={(props)=><TabBar {...props}/>}>
      <Tab.Screen name="Online User" component={Screen} />
     
    </Tab.Navigator>
    </SafeAreaView>
  );
}
const Screen = ({navigation,route}) => {
  const name=route.name;
  const isFocused=useIsFocused()
  const [Data,setData]=React.useState([])
  const user=useSelector(state=>state.user)
  const vendor=useSelector(state=>state.vendor)
  const [Loader,setLoader]=React.useState(false)
  const isDark=useSelector(state=>state.isDark)
  const colors=new Color(isDark)
  const backgroundColor=colors.getBackgroundColor()

  React.useEffect(()=>{
    //console.log(name)
    if(user&&vendor&&name&&name=="Online User"){
      setLoader(true)
      getOnlineUser(user.token,vendor.service.id).then(res=>{
        setData(res.members)
        setLoader(false)
        //console.log(res.members)
      }).catch(err=>{
        setLoader(false)
        console.warn(err.response.data.msg)
      })
    }else{
      setLoader(true)
      getOfflineMembers(user.token,vendor.service.id).then(res=>{
        setData(res.members)
        setLoader(false)
        //console.log(res.members)
      }).catch(err=>{
        setLoader(false)
        console.warn(err.response.data.msg)
      })
    }

  },[isFocused+user+vendor+name])

  if(Loader){
    return(
      <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <ActivityIndicator  size={"small"} color={backgroundColor}/>
      </View>
    )
  }
  return (
    <ScrollView>
      <View style={{height:20}}/>
      {
        Data.map((doc,i)=>(
          <Cart key={i} onPress={()=>{
            navigation.navigate("AppointmentForm",{data:doc})
          }} name={doc.user?
          `${doc.user.name}`:`${doc.name}`}
           gender={doc.user?doc.user.gender:doc.gender} 
           image={doc.user?doc.user.profilePhoto:doc.profilePhoto}
           username={doc.name?`@${doc.name.replace(" ","").toLowerCase()}`:doc.user?
           `@${doc.user.name.toLowerCase()}`
           :`@invalid`} />
        ))
      }
      <View style={{height:20}}/>
    </ScrollView>
  );
};
const TabBar = ({
  state,
  descriptors,
  navigation,
  position,
  onClick,
  onPress,
}) => {
  const ref = React.useRef();
  const packages = useSelector((state) => state.packages);

  const dispatch = useDispatch();

  React.useEffect(() => {
    //console.log(packages[state.index-1])
    //console.log(state);
    
  }, [state.index]);
  

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#E9E6E6",
        borderBottomWidth: 0.5,
        alignItems:"center",
        paddingHorizontal:20
      }}
    >
      <AntDesign onPress={()=>{
        navigation.goBack()
      }} name="left" size={24} color="black" />
      <View  style={{
        flexDirection:"row",
        justifyContent:"center",
        flex:1,
        paddingRight:40
      }}
       
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {state.routes.map((doc, index) => {
          const isFocused = state.index === index;

          const [Visible, setVisible] = React.useState(false);
          const [Title, setTitle] = React.useState();
          const [id, setId] = React.useState();
          React.useEffect(() => {
            //console.log(packages[state.index-1])
            
          }, [index]);
          return (
            <View key={index}>
              <Pressable
                onPress={() => {
                  navigation.navigate(doc.name);
                }}
                style={{
                  borderBottomColor: "#707070",
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 5,
                  height: 40,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight:"500"
                  }}
                >
                  {doc.name}

                  {/* {packages[state.index].name+" "+packages[state.index].price+"৳"} */}
                </Text>

                
              </Pressable>
              
            </View>
          );
        })}
       
      </View>
    </View>
  );
};
const Cart = ({image,name,gender,username,onPress}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:20,
        paddingVertical:10
      }}
    >
      <Avatar source={{uri:image}}
        style={{
          width: 60,
          height: 60,
        }}
      />
      <View style={{
        flex:1,
        marginHorizontal:20
      }}>
        <Text numberOfLines={1} style={{
          fontSize:16,
          fontFamily:"Poppins-Medium"
        }}>{name&&gender?`${name} (${gender})`:"Easin Arafat (Male)"}</Text>
        <Text style={{
          fontSize:14,
          fontFamily:"Poppins-Medium"
        }}>{username?username:"@easinarafat"}</Text>
      </View>
      <IconButton onPress={onPress} style={{
        width:90,
        borderColor:"#DA1E37",
        borderWidth:1,
        height:40,
        color:"#DA1E37"
      }} title={"Select"}/>
    </View>
  );
};
