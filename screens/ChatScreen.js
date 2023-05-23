import React, { useEffect, useState } from "react";
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
  Pressable,
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
import { createConversation, seenMessage, sendMessage } from "../Class/message";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import IconButton from "../components/IconButton";
import CameraScreen from "../components/CameraScreen";
import {
  dateDifference,
  fileFromURL,
  serverTimeToLocal,
  timeConverter,
} from "../action";
import { uploadFile } from "../Class/upload";
import { socket } from "../Class/socket";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { MotiView, SafeAreaView } from "moti";
import Animated, { FadeIn } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import uuid from "react-native-uuid";
import ChatSkeleton from "../components/ChatSkeleton";
//import { EvilIcons } from '@expo/vector-icons';

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
  const [Refresh, setRefresh] = React.useState(false);
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const ref = params?.ref;
  const serviceId = params?.serviceId;
  const vendor = useSelector((state) => state.vendor);
  const [readOnly, setReadOnly] = useState(false);
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    if (isFocused) {
      ref?.current?.close();
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        ref?.current?.close();
        dispatch(setHideBottomBar(true));
      }, 50);
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 150);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);

  React.useEffect(() => {
    
    //console.log(data?.serviceId);
    if (data) {
      data.users.map((doc) => {
        if (doc.user.id != user.user.id) {
          setUserInfo(doc.user);
        }
      });
      //console.log(username)

      //console.log(user.user)
      //setMessages(data.messages);
      //setLastMessage(data.messages[data.messages.length-1])
    }
   // console.log(user?.user?.id)
  }, [data]);
  React.useEffect(() => {
    if (username && UserInfo && user) {
      createConversation(user.token, username, serviceId)
        .then((res) => {
          let arr = [];
          setId(res?.data?.conversation?.id);
          res.data.conversation.messages.map((doc, i) => {
            arr.push(
              serverMessageToLocal(
                doc,
                UserInfo.id == doc.senderId ? UserInfo : user.user
              )
            );
          });
          setMessages(arr.reverse());
          setReadOnly(res.data.conversation.readOnly);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
    }
  }, [username, isFocused, UserInfo, user]);
  React.useEffect(() => {
    socket.on("getMessage", (e) => {
      //setMessages((val) => [...val, e.message]);
      //console.log(`tp: ${UserInfo?.id}`)
      //console.log(e)
      setMessage(e);
    });
    return () => {
      socket?.off("getMessage");
    };
  }, []);
  useEffect(() => {
    if (message && message?.message?.conversationId == Id) {
      //console.log(message?.senderId)
      setMessages((val) =>
        GiftedChat.append(
          val,
          serverMessageToLocal(
            message.message,
            data?.users?.filter((d) => d.user.id != user?.user?.id)[0]?.user
          )
        )
      );
      if (isFocused && user) {
        try {
          seenMessage(user?.token, message?.message?.id);
        } catch (err) {
          console.error(err.message);
        }
      }
      setMessage();
    }
  }, [message]);

  const send = async (message, image) => {
    if(!UserInfo){
      Alert.alert("Invalid")
      return
    }
    const id = uuid.v1();
    if (image) {
      let blobImages = [];
      blobImages.push(fileFromURL(image));
      //console.log(blobImages)
      const result = await uploadFile(blobImages, user.token);
      if (result) {
        const res = await sendMessage(user.token, message, result[0], Id);
        if (res.data) {
          setMessages((val) =>
            GiftedChat.append(
              val,
              serverMessageToLocal(res.data.message, user.user)
            )
          );
          //console.log(UserInfo?.id);
          socket.emit("sendMessage", {
            senderId: user?.user.id,
            receiverId: UserInfo.id,
            message: res.data.message,
          });
        }
      } else {
        //console.log(result)
        Alert.alert("Opps!", "Faild to send picture");
      }
      return;
    }

    let data = {
      clear: false,
      conversationId: Id,
      createdAt: new Date(),
      deleted: false,
      id: id,
      image: null,
      seen: false,
      senderId: user?.user?.id,
      text: message,
      updatedAt: new Date(),
      send: true,
    };
    setMessages((val) =>
      GiftedChat.append(val, serverMessageToLocal(data, user.user))
    );
    const res = await sendMessage(user.token, message, null, Id);
    if (res.data) {
      setMessages((prev) => {
        return prev.map((message) => {
          if (message._id === id) {
            return {
              ...message,
              send: false,
            };
          }
          return message;
        });
      });
      //console.warn(res.data.message)
      //console.log(user.user.id);
      //console.log(UserInfo.id);
      //console.log(UserInfo?.id);
      socket.emit("sendMessage", {
        senderId: user?.user.id,
        receiverId: UserInfo.id,
        message: res.data.message,
      });
    }
  };

  if (!Messages) {
    return (
      <View style={{ flex: 1, }}>
        <ChatSkeleton />
      </View>
    );
  }

  //return <VideoCallingScreen/>
  //return <CallingScreen user={UserInfo} audio={false}/>
  //return <AudioCallScreen user={UserInfo}/>
  const RenderBubble = (props) => {
    const currentMessage = props?.item;
    //console.log(currentMessage?.user?._id)
    if (!currentMessage) {
      return null;
    }
    if (currentMessage?.image && currentMessage?.text) {
      //console.log(currentMessage?.image)
      let arr = currentMessage?.image.split("/");
      let newArr = arr[arr.length - 1]?.split(".");
      let type = newArr[newArr.length - 1];
      let three = newArr[0].split("")?.slice(-3)?.join("");
      return (
        <Pressable
          onPress={() => {
            props.navigation.navigate("ChatImage", {
              uri: currentMessage?.image,
            });
          }}
          style={[
            newStyles.imageBox,
            {
              alignSelf:
                UserInfo?.id == currentMessage?.user?._id
                  ? "flex-start"
                  : "flex-end",
              height: "auto",
            },
          ]}>
          <Image
            style={newStyles.image}
            source={{ uri: currentMessage.image }}
          />
          <View style={{ flexDirection: "row", paddingHorizontal: 8, flex: 1 }}>
            <Text
              numberOfLines={1}
              style={[newStyles.dateText, { textAlign: "left", flex: 1 }]}>
              {arr[arr.length - 1]}
            </Text>
            <Text style={newStyles.dateText}>
              {three}.{type}{" "}
            </Text>
            <View style={{ width: 8 }} />
            <Text style={newStyles.dateText}>
              {dateDifference(new Date(), currentMessage.createdAt) == 0
                ? timeConverter(currentMessage.createdAt)
                : dateDifference(new Date(), currentMessage.createdAt) == 1
                ? "Yesterday"
                : serverTimeToLocal(currentMessage.createdAt)}
            </Text>
          </View>
          {currentMessage && (
            <Text
              style={[
                newStyles.text,
                { marginHorizontal: 8, marginBottom: 3 },
              ]}>
              {currentMessage?.text}
            </Text>
          )}
        </Pressable>
      );
    }

    if (currentMessage?.image) {
      //console.log(currentMessage?.image)
      let arr = currentMessage?.image.split("/");
      let newArr = arr[arr.length - 1]?.split(".");
      let type = newArr[newArr.length - 1];
      let three = newArr[0].split("")?.slice(-3)?.join("");
      return (
        <Pressable
          onPress={() => {
            props.navigation.navigate("ChatImage", {
              uri: currentMessage?.image,
            });
          }}
          style={[
            newStyles.imageBox,
            {
              alignSelf:
                UserInfo?.id == currentMessage?.user?._id
                  ? "flex-start"
                  : "flex-end",
            },
          ]}>
          <Image
            style={newStyles.image}
            source={{ uri: currentMessage.image }}
          />
          <View style={{ flexDirection: "row", paddingHorizontal: 8, flex: 1 }}>
            <Text
              numberOfLines={1}
              style={[newStyles.dateText, { textAlign: "left", flex: 1 }]}>
              {arr[arr.length - 1]}
            </Text>
            <Text style={newStyles.dateText}>
              {three}.{type}{" "}
            </Text>
            <View style={{ width: 8 }} />
            <Text style={newStyles.dateText}>
              {dateDifference(new Date(), currentMessage.createdAt) == 0
                ? timeConverter(currentMessage.createdAt)
                : dateDifference(new Date(), currentMessage.createdAt) == 1
                ? "Yesterday"
                : serverTimeToLocal(currentMessage.createdAt)}
            </Text>
          </View>
        </Pressable>
      );
    }
    if (UserInfo?.id == currentMessage?.user?._id) {
      return (
        <View style={newStyles.senderBox}>
          <Text style={newStyles.title}>
            {vendor
              ? currentMessage.user.name
              : data?.service?.serviceCenterName}
          </Text>
          <Text style={newStyles.text}>{currentMessage?.text}</Text>
          <Text style={newStyles.dateText}>
            {dateDifference(new Date(), currentMessage.createdAt) == 0
              ? timeConverter(currentMessage.createdAt)
              : dateDifference(new Date(), currentMessage.createdAt) == 1
              ? "Yesterday"
              : serverTimeToLocal(currentMessage.createdAt)}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 16,
          marginVertical: 8,
        }}>
        <View style={newStyles.receiverBox}>
          <Text style={[newStyles.text, { color: "white" }]}>
            {currentMessage?.text}
          </Text>
          <Text style={[newStyles.dateText, { color: "white" }]}>
            {dateDifference(new Date(), currentMessage.createdAt) == 0
              ? timeConverter(currentMessage.createdAt)
              : dateDifference(new Date(), currentMessage.createdAt) == 1
              ? "Yesterday"
              : serverTimeToLocal(currentMessage.createdAt)}
          </Text>
        </View>
        {currentMessage?.send ? (
          <View
            style={{
              borderRadius: 10,
              width: 14,
              height: 14,
              borderWidth: 1,
              borderColor: "#4ADE80",
              marginLeft: 5,
              marginHorizontal: 5,
            }}
          />
        ) : (
          <EvilIcons
            style={{
              marginLeft: 5,
            }}
            name="check"
            size={20}
            color="#4ADE80"
          />
        )}
      </View>
    );
  };
  const LeftBubble = (props) => {
    const currentMessage = props?.item;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <View
        style={{
          height: inset?.top,
        }}
      />
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <ChatHead
        user={UserInfo}
        name={UserInfo ? `${UserInfo.name}` : null}
        image={UserInfo ? UserInfo.profilePhoto : null}
        {...props}
        message={data}
        readOnly={readOnly}
      />
      <FlatList
        data={Messages}
        renderItem={(pr) => (
          <RenderBubble navigation={props.navigation} {...pr} />
        )}
        keyExtractor={(item, i) => i.toString()}
        inverted
      />
      {!readOnly && <BottomBar onSend={send} {...props} />}
      {readOnly && (
        <Text
          style={{
            fontSize: 16,

            fontWeight: "400",
            color: "#4D4E4F",
            marginHorizontal: 20,
            marginVertical: 30,
          }}>
          Can’t reply here. If you have other inquiry check our{" "}
          <Text
            onPress={() => {
              props.navigation.navigate("SupportForm");
            }}
            style={{
              color: "#4ADE80",
              fontWeight: "500",
            }}>
            support link.
          </Text>{" "}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
};

{
  /*
  <GiftedChat
        wrapInSafeArea={false}
        messagesContainerStyle={{
          backgroundColor: "#ffffff",
          paddingBottom:10
        }}
        isKeyboardInternallyHandled={true}
        
        renderComposer={() => <BottomBar onSend={send} />}
        messages={Messages}
        onSend={(messages) => {
          console.log(messages);
        }}
        user={{
          _id: user.user.id,
        }}
        renderBubble={(pr)=><RenderBubble navigation={props.navigation} {...pr}/>}
      />
  */
}

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
  const [image, setImage] = React.useState();
  const [Visible, setVisible] = React.useState(false);
  const [CameraVisible, setCameraVisible] = React.useState(false);
  const [ImageLoader, setImageLoader] = React.useState(false);
  const [focused, setFocused] = useState(false);
  const [line, setLine] = useState();
  const styles = StyleSheet.create({
    view: {
      flexDirection: "row",
      paddingHorizontal: 20,
      alignItems: focused ? "flex-end" : "center",
      backgroundColor: "#ffffff",
      marginVertical: 12,
      marginTop: 4,
    },
    icon: {
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    input: {
      fontSize: 14,
      fontWeight: "500",
      flex: 1,
      paddingBottom: 3,
    },
    inputOutBox: {
      flexDirection: "row",
      borderRadius: line && line > 62 ? 12 : 32,
      backgroundColor: "#F8F8F8",
      alignItems: line && line > 62 ? "flex-end" : "center",
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
  });

  return (
    <View style={styles.view}>
      {focused ? (
        <Pressable
          style={{
            paddingRight: 8,
            paddingBottom: 12,
          }}
          onPress={() => {
            setFocused(false);
          }}>
          <SvgXml xml={com} />
        </Pressable>
      ) : (
        <Animated.View style={{ flexDirection: "row" }} entering={FadeIn}>
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
            style={[styles.icon]}>
            <SvgXml xml={img} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCameraVisible(true);
            }}
            style={styles.icon}>
            <SvgXml xml={cam} />
          </TouchableOpacity>
        </Animated.View>
      )}
      <MotiView
        onLayout={(e) => {
          setLine(e.nativeEvent.layout.height);
        }}
        animate={{
          minHeight: 48,
          maxHeight: focused ? 130 : 48,
        }}
        transition={{
          type: "timing",
          duration: 200,
        }}
        style={[styles.inputOutBox]}>
        <TextInput
          onPressIn={() => {
            setFocused(true);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline={true}
          value={Message}
          onChangeText={(value) => {
            setFocused(true);
            if (value.split("").length > 1000) {
              return;
            }
            setMessage(value);
            //console.log(value)
          }}
          style={styles.input}
          placeholder="Write message here.."
          placeholderTextColor={assentColor}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          onPress={() => {
            if (!Message) {
              return;
            }
            props.onSend(Message).then(() => {
              //setMessage("");
            });
            setMessage("");
          }}>
          <SvgXml xml={send} />
        </TouchableOpacity>
      </MotiView>
      <Modal
        visible={Visible}
        onRequestClose={() => {
          setVisible(!Visible);
        }}>
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
            }}>
            <ActivityLoader />
          </View>
        )}
      </Modal>
      <Modal
        visible={CameraVisible}
        onRequestClose={() => {
          setCameraVisible(!CameraVisible);
        }}>
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
      }}>
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
        }}>
        <TouchableOpacity
          onPress={() => {
            if (onCancel) {
              onCancel();
            }
          }}>
          <Ionicons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (onConfirm) {
              onConfirm();
            }
          }}>
          <Ionicons name="send-outline" size={25} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const serverMessageToLocal = (message, user) => {
  if (message && user) {
    return {
      _id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      user: {
        _id: user.id,
        name: `${user.name}`,
        avatar: user.profilePhoto,
      },
      image: message.image,
      sent: message.seen,
      send: message?.send,
    };
  }
  return null;
};
const img = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.57999 19.0111L2.55999 19.0311C2.28999 18.4411 2.11999 17.7711 2.04999 17.0311C2.11999 17.7611 2.30999 18.4211 2.57999 19.0111ZM9.00099 10.3811C9.6322 10.3811 10.2376 10.1303 10.6839 9.68401C11.1302 9.23767 11.381 8.63231 11.381 8.00109C11.381 7.36988 11.1302 6.76452 10.6839 6.31818C10.2376 5.87184 9.6322 5.62109 9.00099 5.62109C8.36977 5.62109 7.76441 5.87184 7.31807 6.31818C6.87174 6.76452 6.62099 7.36988 6.62099 8.00109C6.62099 8.63231 6.87174 9.23767 7.31807 9.68401C7.76441 10.1303 8.36977 10.3811 9.00099 10.3811Z" fill="black" fill-opacity="0.87"/>
<path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z" fill="black" fill-opacity="0.87"/>
</svg>
`;
const cam = `<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.63015 22H15.3703C18.1989 22 19.3262 20.31 19.4594 18.25L19.9923 9.99C20.0255 9.47783 19.9507 8.96446 19.7726 8.48161C19.5944 7.99876 19.3167 7.5567 18.9565 7.18275C18.5963 6.80879 18.1613 6.51089 17.6785 6.30746C17.1956 6.10403 16.6752 5.99939 16.1492 6C15.5241 6 14.9502 5.65 14.6632 5.11L13.9253 3.66C13.4539 2.75 12.2241 2 11.1788 2H8.83195C7.77637 2 6.54658 2.75 6.07516 3.66L5.33728 5.11C5.05033 5.65 4.47643 6 3.85128 6C1.62741 6 -0.135298 7.83 0.00817817 9.99L0.541089 18.25C0.664068 20.31 1.80163 22 4.63015 22Z" fill="black" fill-opacity="0.87"/>
<path d="M11.5375 8.75H8.46299C8.04281 8.75 7.69437 8.41 7.69437 8C7.69437 7.59 8.04281 7.25 8.46299 7.25H11.5375C11.9577 7.25 12.3061 7.59 12.3061 8C12.3061 8.41 11.9577 8.75 11.5375 8.75ZM10.0013 18.131C10.9199 18.131 11.801 17.7749 12.4506 17.141C13.1002 16.5071 13.4652 15.6474 13.4652 14.751C13.4652 13.8546 13.1002 12.9949 12.4506 12.361C11.801 11.7271 10.9199 11.371 10.0013 11.371C9.08257 11.371 8.20151 11.7271 7.5519 12.361C6.90229 12.9949 6.53734 13.8546 6.53734 14.751C6.53734 15.6474 6.90229 16.5071 7.5519 17.141C8.20151 17.7749 9.08257 18.131 10.0013 18.131Z" fill="white"/>
</svg>
`;
const send = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.44 12.0001H10.84M9.51 4.23013L18.07 8.51013C21.91 10.4301 21.91 13.5701 18.07 15.4901L9.51 19.7701C3.75 22.6501 1.4 20.2901 4.28 14.5401L5.15 12.8101C5.37 12.3701 5.37 11.6401 5.15 11.2001L4.28 9.46013C1.4 3.71013 3.76 1.35013 9.51 4.23013Z" stroke="#00A53C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const com = `<svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.999973 17.0002L7.51997 10.4802C8.28997 9.71016 8.28997 8.45016 7.51997 7.68016L0.999973 1.16016" stroke="#00A53C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const newStyles = StyleSheet.create({
  dateText: {
    fontSize: 12,

    fontWeight: "400",
    marginTop: 4,
    textAlign: "right",
  },
  text: {
    fontSize: 16,

    fontWeight: "400",
  },
  title: {
    fontSize: 14,

    fontWeight: "500",
    color: "#21AD54",
  },
  senderBox: {
    backgroundColor: "#EFF8F4",
    padding: 8,
    maxWidth: "60%",
    borderRadius: 12,
    borderBottomLeftRadius: 4,
    marginLeft: 20,
    marginVertical: 8,
  },
  receiverBox: {
    padding: 8,
    maxWidth: "60%",
    borderRadius: 12,
    backgroundColor: "#4ADE80",
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
  },
  imageBox: {
    width: "60%",
    height: 140,
    overflow: "hidden",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginVertical: 8,
    marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 114,
  },
});
function getFileSize(url) {
  var fileSize = "";
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false); // false = Synchronous

  http.send(null); // it will stop here until this http request is complete

  // when we are here, we already have a response, b/c we used Synchronous XHR

  if (http.status === 200) {
    fileSize = http.getResponseHeader("content-length");
    console.log("fileSize = " + fileSize);
  }

  return fileSize;
}
