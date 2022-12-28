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
} from "react-native";
import ChatBox from "./../components/ChatBox";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { Color } from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import ChatHead from "../components/ChatHead";
import ActivityLoader from "../components/ActivityLoader";
import { createConversation, sendMessage } from "../Class/message";

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
  const username=params && params.username ? params.username : null;
  React.useEffect(() => {
    if (data) {
      data.users.map((doc) => {
        if (doc.user.id != user.user.id) {
          setUserInfo(doc.user);
        }
      });
      console.log(username)
      setId(data.id);
      setMessages(data.messages);
      //setLastMessage(data.messages[data.messages.length-1])
    }
  }, [data]);
  React.useEffect(()=>{
    if(username){
      createConversation(user.token,username).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.error(err.response)
      })
    }
  },[username])
  React.useEffect(() => {
    onPressTouch();
  }, [Messages ? Messages.length : null]);

  const send = async (message, image) => {
   const res=await sendMessage(user.token, message, image, Id);
   if(res.data){
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

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.icon}>
        <EvilIcons name="image" size={26} color={textColor} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
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
    </View>
  );
};
