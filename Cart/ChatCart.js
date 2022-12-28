import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Color } from "./../assets/colors";
const { width, height } = Dimensions.get("window");
import {useSelector,useDispatch} from 'react-redux';
import Avatar from "../components/Avatar";
import { serverTimeToLocal } from "../action";

const ChatCart = (props) => {
  const [Active, setActive] = React.useState(props.active);
  const navigation = props.navigation;
  const isDark=useSelector((state) => state.isDark);
  const colors= new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const secondaryColor=colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const data=props.data;
  const user=useSelector(state=>state.user);
  const [UserInfo,setUserInfo]=React.useState()
  const [LastMessage,setLastMessage]=React.useState()

  const styles = StyleSheet.create({
    outBox: {
      marginHorizontal: 20,
      marginVertical: 0,
      width: width - 40,
      minHeight: 50,
      padding: 10,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      
    },
    box: {
      flex: 4,
      borderBottomWidth:1,
      borderBottomColor:'#e5e5e5',
      paddingVertical: 10,
    },
    image: {
      width: 45,
      height: 45,
      borderRadius: 25,
      marginRight: 10,
    },
    head: {
      fontSize: 14,
      fontFamily: 'Poppins-Medium',
      color:textColor
    },
    text: {
      fontSize: 13,
      fontFamily: 'Poppins-Light',
      color:textColor
    },
    date: {
      fontSize: 10,
      textAlign: "right",
      color:textColor,
      fontFamily: 'Poppins-Light'
    },
    active: {
      backgroundColor: "green",
      height: 10,
      width: 10,
      borderRadius: 5,
      position: "absolute",
      top: 55,
      left: 48,
      borderWidth: 1,
      borderColor: "white",
    },
  });
  React.useEffect(()=>{
    if(data){
      data.users.map((doc)=>{
        if(doc.user.id!=user.user.id){
          setUserInfo(doc.user)
        }
      })
      setLastMessage(data.messages[data.messages.length-1])
    }
  },[data])
  if(!UserInfo){
    return null
  }
  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatScreen",{data:data,username:UserInfo.username})}
      style={styles.outBox}
    >
      <Avatar style={styles.image} source={{
        uri:UserInfo.profilePhoto?UserInfo.profilePhoto:null
      }}/>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
        <Text style={styles.head}>{UserInfo?`${UserInfo.firstName} ${UserInfo.lastName}`:"Sefa Khandakar"}</Text>
          <Text style={styles.date}>{LastMessage?`${serverTimeToLocal(LastMessage.updatedAt)}`:"Jul 21 2:30 Pm"}</Text>
        </View>
        <Text style={styles.text}>
          {LastMessage?LastMessage.text:null}
        </Text>
      </View>
      {props.active ? <View style={styles.active} /> : <></>}
    </TouchableOpacity>
  );
};

export default ChatCart;
