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
import { Camera } from 'expo-camera';

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
  }, [username + isFocused]);
  React.useEffect(() => {
    onPressTouch();
    setTimeout(() => {
      onPressTouch();
    }, 300);
  }, [Messages ? Messages.length : null + isFocused]);

  const send = async (message, image) => {
    const res = await sendMessage(user.token, message, image, Id);
    if (res.data) {
      setMessages((val) => [...val, res.data.message]);
    }
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
              <ChatBox data={item} key={item} message={null} send={null} />
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
  const [cameraPermission, setCameraPermission] = React.useState(null);
  const [galleryPermission, setGalleryPermission] = React.useState(null);

  const [camera, setCamera] = React.useState(null);
  const [imageUri, setImageUri] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync()
    setCameraPermission(cameraPermission.status === 'granted');
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission);
    setGalleryPermission(imagePermission.status === 'granted');
    if (imagePermission.status !== 'granted' && cameraPermission.status !== 'granted') {
      Alert.alert('Permission for media access needed.');
    }
  };
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      //setImage(data);
      return data
    }
  };
  React.useEffect(() => {
    permisionFunction();
  }, []);

  return (
    <View style={styles.view}>
      <TouchableOpacity
        onPress={() => {
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
          takePicture()
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
            props.onSend(null, image).then(() => {
              setMessage("");
            });
          }}
          onCancel={() => {
            setVisible(false);
          }}
          image={image}
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
          width:"100%",
          justifyContent:"space-between",
          paddingHorizontal:20,
          position:"absolute",
          bottom:0
        }}
      >
        <TouchableOpacity onPress={()=>{
          if(onCancel){
            onCancel()
          }
        }}>
          <Ionicons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          if(onConfirm){
            onConfirm()
          }
        }}>
          <Ionicons name="send-outline" size={25} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
