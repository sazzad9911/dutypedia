import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
  Alert,
} from "react-native";
import ChatBox from "./../components/ChatBox";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { assentColor, Color } from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import ChatHead from "../components/ChatHead";
import ActivityLoader from "../components/ActivityLoader";
import { createConversation, sendMessage } from "../Class/message";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import IconButton from "../components/IconButton";
import CameraScreen from "../components/CameraScreen";
import { fileFromURL } from "../action";
import { uploadFile } from "../Class/upload";
import { socket } from "../Class/socket";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import CallingScreen from "./CallingScreen";
import AudioCallScreen from "./AudioCallScreen";

const ChatScreen = (props) => {
  const scrollRef = React.useRef();
  const onPressTouch = () => {
    // scrollRef.current?.scrollTo({
    //   y: height-60 ,
    //   animated: true,
    // });
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  const params = props.route.params;
  const data = params && params.data ? params.data : null;
  const styles = StyleSheet.create({
    view: {
      flexDirection: "row",
      paddingHorizontal: 10,
      alignItems: "center",
      backgroundColor: primaryColor,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: backgroundColor,
      shadowRadius: 3,
      elevation: 3,
      paddingVertical: 5,
    },
    icon: {
      margin: 5,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      backgroundColor: secondaryColor,
      flex: 7,
      height: 40,
      fontSize: 14,
      borderRadius: 20,
      paddingHorizontal: 10,
      fontFamily: "Poppins-Light",
    },
  });
  const [UserInfo, setUserInfo] = React.useState();
  const user = useSelector((state) => state.user);
  const [Messages, setMessages] = React.useState();
  const [Loader, setLoader] = React.useState(false);
  const [Id, setId] = React.useState();
  const username = params && params.username ? params.username : null;
  const isFocused = useIsFocused();
  const [Refresh,setRefresh]=React.useState(false)
  const dispatch=useDispatch()
  React.useEffect(()=>{
    if(isFocused){
      //console.log("hidden")
      dispatch(setHideBottomBar(true))
      setTimeout(()=>{
        dispatch(setHideBottomBar(true))
      },50)
    }else{
      //console.log("seen")
      dispatch(setHideBottomBar(false))
    }
  },[isFocused])
  React.useEffect(() => {
    if (data) {
      data.users.map((doc) => {
        if (doc.user.id != user.user.id) {
          setUserInfo(doc.user);
        }
      });
      //console.log(username)
      setId(data.id);
      //setMessages(data.messages);
      //setLastMessage(data.messages[data.messages.length-1])
    }
  }, [data]);
  React.useEffect(() => {
    if (username) {
      createConversation(user.token, username)
        .then((res) => {
          setMessages(res.data.conversation.messages);
          //console.log(res.data.conversation.messages)
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
    }
  }, [username + isFocused+Refresh]);
  React.useEffect(() => {
    socket.on("getMessage", (e) => {
      //setMessages((val) => [...val, e.message]);
      setRefresh(val=>(!val))
    });
  }, []);
  React.useEffect(() => {
    if(Messages){
      onPressTouch();
    }
  }, [Messages + isFocused]);

  const send = async (message, image) => {
    if (image) {
      let blobImages = [];
      blobImages.push(fileFromURL(image));
      //console.log(blobImages)
      const result = await uploadFile(blobImages, user.token);
      if (result) {
        const res = await sendMessage(user.token, message, result[0], Id);
        if (res.data) {
          setMessages((val) => [...val, res.data.message]);
          //console.log(user.user.id);
          //console.log(UserInfo.id);
          socket.emit("sendMessage", {
            senderId: user.user.id,
            receiverId: UserInfo.id,
            message: res.data.message,
          });
        }
      } else {
        //console.log(result)
        Alert.alert("Opps!", "Faild to send picture");
      }
      onPressTouch();

      return;
    }
    const res = await sendMessage(user.token, message, null, Id);
    if (res.data) {
      setMessages((val) => [...val, res.data.message]);
      //console.log(user.user.id);
      //console.log(UserInfo.id);
      socket.emit("sendMessage", {
        senderId: user.user.id,
        receiverId: UserInfo.id,
        message: res.data.message,
      });
    }
    onPressTouch();
  };

  if (!Messages) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityLoader />
      </View>
    );
  }
  return <CallingScreen user={UserInfo} audio={false}/>
  //return <AudioCallScreen user={UserInfo}/>
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ChatHead
        name={UserInfo ? `${UserInfo.firstName} ${UserInfo.lastName}` : null}
        image={UserInfo ? UserInfo.profilePhoto : null}
        {...props}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          data={Messages}
          renderItem={({ item }) => {
            return (
              <ChatBox onLayout={e=>{
                onPressTouch();
              }} data={item} key={item} message={null} send={null} />
            );
          }}
          keyExtractor={(item) => item.id}
        />

        <BottomBar onSend={send} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const BottomBar = (props) => {
  const [Message, setMessage] = React.useState();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  const styles = StyleSheet.create({
    view: {
      flexDirection: "row",
      paddingHorizontal: 10,
      alignItems: "center",
      backgroundColor: primaryColor,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: backgroundColor,
      shadowRadius: 3,
      elevation: 3,
      paddingVertical: 5,
    },
    icon: {
      margin: 5,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      backgroundColor: secondaryColor,
      flex: 7,
      height: 40,
      fontSize: 14,
      borderRadius: 20,
      paddingHorizontal: 10,
      fontFamily: "Poppins-Light",
    },
  });
  const [image, setImage] = React.useState();
  const [Visible, setVisible] = React.useState(false);
  const [CameraVisible, setCameraVisible] = React.useState(false);
  const [ImageLoader, setImageLoader] = React.useState(false);

  return (
    <View style={styles.view}>
      <TouchableOpacity
        onPress={() => {
          setImageLoader(false);
          pickImage()
            .then((res) => {
              if (res) {
                setImage(res);
                setVisible(true);
              }
            })
            .catch((err) => {
              Alert.alert("Opps!", "Could not load image");
            });
        }}
        style={styles.icon}
      >
        <EvilIcons name="image" size={26} color={textColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCameraVisible(true);
        }}
        style={styles.icon}
      >
        <Ionicons name="camera-outline" size={24} color={textColor} />
      </TouchableOpacity>
      <TextInput
        value={Message}
        onChangeText={(value) => {
          setMessage(value);
        }}
        style={styles.input}
        placeholder="Write message here.."
        placeholderTextColor={assentColor}
      />
      <TouchableOpacity
        onPress={() => {
          if (!Message) {
            return;
          }
          props.onSend(Message).then(() => {
            setMessage("");
          });
        }}
        style={styles.icon}
      >
        <Ionicons name="send-outline" size={20} color={assentColor} />
      </TouchableOpacity>
      <Modal
        visible={Visible}
        onRequestClose={() => {
          setVisible(!Visible);
        }}
      >
        <ImageScreen
          onConfirm={() => {
            setImageLoader(true);
            props
              .onSend(null, image)
              .then(() => {
                setMessage("");
                setImageLoader(false);
                setVisible(false);
              })
              .catch((err) => {
                setImageLoader(false);
                console.warn(err.message);
              });
          }}
          onCancel={() => {
            setImageLoader(false);
            setVisible(false);
          }}
          image={image}
        />
        {ImageLoader && (
          <View
            style={{
              position: "absolute",
              height: height,
              width: width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityLoader />
          </View>
        )}
      </Modal>
      <Modal
        visible={CameraVisible}
        onRequestClose={() => {
          setCameraVisible(!CameraVisible);
        }}
      >
        <CameraScreen
          onTakePhoto={(pic) => {
            setImage(pic);
            setCameraVisible(false);
            setVisible(true);
          }}
        />
      </Modal>
    </View>
  );
};
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.6,
  });

  //console.log(result);
  if (!result.canceled) {
    return result.assets[0];
    //setImage();
  }
  return null;
};
const openCamera = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.8,
  });

  //console.log(result);
  if (!result.canceled) {
    return result.assets[0];
    //setImage();
  }
  return null;
};
const ImageScreen = ({ image, onCancel, onConfirm }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.786)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: width,
          height: width - 50,
        }}
        source={{ uri: image.uri }}
      />
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          position: "absolute",
          bottom: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (onCancel) {
              onCancel();
            }
          }}
        >
          <Ionicons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (onConfirm) {
              onConfirm();
            }
          }}
        >
          <Ionicons name="send-outline" size={25} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
