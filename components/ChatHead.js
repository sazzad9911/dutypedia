import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Color } from "./../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import OutsideView from "react-native-detect-press-outside";
import { Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
//import CallingScreen from "../screens/CallingScreen";
//import AudioCallScreen from "../screens/AudioCallScreen";
import { setCallingScreen } from "../Reducers/callingScreen";
import { socket } from "../Class/socket";

const ChatHead = ({ navigation, name, image, user }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  const [visible, setVisible] = React.useState(false);
  const styles = StyleSheet.create({
    box: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 0,
      borderBottomWidth:1,
      paddingBottom:5,
      borderBottomColor:"#e5e5e5",
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    text: {
      fontSize: 14,
      fontFamily: "Poppins-Medium",
      color: textColor,
    },
    icon: {
      marginLeft: 20,
    },
    menuContainer: {
      minWidth: 150,
      minHeight: 100,
      backgroundColor: primaryColor,
      position: "absolute",
      top: 20,
      right: 30,
      padding: 10,
      borderRadius: 5,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: "black",
    },
    menuSubContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 5,
      alignItems: "center",
      marginVertical: 5,
    },
  });
  const [CallingScreenVisible, setCallingScreenVisible] = React.useState(false);
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.user);
  const callingScreen = useSelector((state) => state.callingScreen);
  //const [AudioOnly,setAudioOnly]=React.useState(false)
  //console.log(newUser.user)

  const makeVideoCall = () => {
    dispatch(
      setCallingScreen({
        callerId: user.id,
        roomId: user.id,
        callerName: name,
        audioOnly: false,
      })
    );
    setCallingScreenVisible(true);
    socket?.emit("callUser", {
      receiverId: user.id,
      data: {
        roomId: newUser.user.id,
        from: newUser.user.id,
        name: `${newUser.user.firstName} ${newUser.user.lastName}`,
        audioOnly: false,
      },
    });
  };
  const makeAudioCall = () => {
    dispatch(
      setCallingScreen({
        callerId: user.id,
        roomId: user.id,
        callerName: name,
        audioOnly: true,
      })
    );
    setCallingScreenVisible(true);
    socket?.emit("callUser", {
      receiverId: user.id,
      data: {
        roomId: newUser.user.id,
        from: newUser.user.id,
        name: `${newUser.user.firstName} ${newUser.user.lastName}`,
        audioOnly: true,
      },
    });
  };

  //console.log(data)
  return (
    <View
      style={{
        minHeight: 50,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: primaryColor,
      }}
    >
      <View style={styles.box}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="chevron-back"
          size={24}
          color={textColor}
        />
        <Avatar style={styles.image} source={{ uri: image ? image : null }} />
        {/* <Image
          style={styles.image}
          source={{
            uri: data
              ? data.service.profilePhoto
              : "https://hindidp.com/wp-content/uploads/2022/02/cute_beautiful_dp_fo_wHC8X.jpg",
          }}
        /> */}
        <Text style={styles.text}>{name ? `${name}` : "Sefa Khandakar"}</Text>
      </View>
      {/* <View
        style={[
          styles.box,
          {
            justifyContent: "flex-end",
          },
        ]}
      >
        <TouchableOpacity onPress={makeAudioCall}>
          <Zocial style={styles.icon} name="call" size={24} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={makeVideoCall}>
          <MaterialIcons
            style={styles.icon}
            name="videocam"
            size={24}
            color={textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Entypo
            style={styles.icon}
            name="dots-three-vertical"
            size={24}
            color={textColor}
          />
        </TouchableOpacity>
      </View> */}
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <MenuBar setVisible={setVisible} />
      </Modal>
      <Modal visible={CallingScreenVisible}>
        {/* {callingScreen && (
          <CallingScreen setVisible={()=>{
            dispatch(setCallingScreen(null))
            setCallingScreenVisible(false)
          }} user={user.id} audio={callingScreen.audioOnly} />
        )} */}
      </Modal>
    </View>
  );
};

export default ChatHead;

const MenuBar = (props) => {
  const [Call, setCall] = React.useState(false);
  const [Mute, setMute] = React.useState(false);
  const childRef = React.useRef();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  const styles = StyleSheet.create({
    box: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    text: {
      fontSize: 14,
      fontFamily: "Poppins-Medium",
    },
    icon: {
      marginLeft: 20,
    },
    menuContainer: {
      minWidth: 150,
      minHeight: 100,
      backgroundColor: primaryColor,
      position: "absolute",
      top: 20,
      right: 30,
      padding: 10,
      borderRadius: 5,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: "black",
    },
    menuSubContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 5,
      alignItems: "center",
      marginVertical: 5,
    },
  });
  return (
    <OutsideView
      childRef={childRef}
      onPressOutside={() => {
        // handle press outside of childRef event
        props.setVisible(false);
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View ref={childRef} style={styles.menuContainer}>
          <View style={styles.menuSubContainer}>
            <Ionicons name="ios-call" size={20} color={textColor} />
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 13,
                color: textColor,
              }}
            >
              Call
            </Text>
            <Switch
              style={{
                height: 35,
                transform: [
                  { scaleX: Platform.OS == "ios" ? 0.8 : 1 },
                  { scaleY: Platform.OS == "ios" ? 0.8 : 1 },
                ],
              }}
              color="#A8AF63"
              value={Call}
              onValueChange={(val) => {
                setCall(val);
              }}
            />
          </View>
          <View style={styles.menuSubContainer}>
            <Ionicons name="volume-mute" size={20} color={textColor} />
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 13,
                color: textColor,
              }}
            >
              Mute
            </Text>
            <Switch
              style={{
                height: 35,
                transform: [
                  { scaleX: Platform.OS == "ios" ? 0.8 : 1 },
                  { scaleY: Platform.OS == "ios" ? 0.8 : 1 },
                ],
              }}
              color="#A8AF63"
              value={Mute}
              onValueChange={(val) => {
                setMute(val);
              }}
            />
          </View>
          <TouchableOpacity style={styles.menuSubContainer}>
            <FontAwesome name="user-circle-o" size={20} color={textColor} />
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 13,
                color: textColor,
              }}
            >
              View Profile
            </Text>
            <View style={{ width: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    </OutsideView>
  );
};
