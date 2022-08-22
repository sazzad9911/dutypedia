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
import {
  backgroundColor,
  assentColor,
  primaryColor,
  secondaryColor,
} from "./../assets/colors";
const { width, height } = Dimensions.get("window");
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();


const ChatScreen = () => {
  const scrollRef = React.useRef();
  const [Messages, setMessages] = React.useState([
    {
      message:
        "In publishing and graphic design, Lorem ipsum is a placeholder text",
      send: true,
      id: 1,
    },
    {
      message: `In publishing and graphic design, Lorem ipsum is a placeholder text
    commonly used to demonstrate the visual form of a document or a
    typeface without relying on meaningful content. Lorem ipsum may be
    used as a placeholder before final copy is available.`,
      send: false,
      id: 2,
    },
    {
      message:
        "In publishing and graphic design, Lorem ipsum is a placeholder text",
      send: true,
      id: 3,
    },
    {
      message:
        "In publishing and graphic design, Lorem ipsum is a placeholder text",
      send: false,
      id: 4,
    },
  ]);
  const onPressTouch = () => {
    // scrollRef.current?.scrollTo({
    //   y: height-60 ,
    //   animated: true,
    // });
    scrollRef.current?.scrollToEnd({ animated: true });
  };
  React.useEffect(() => {
    onPressTouch();
  }, [Messages.length]);

  const sendMessage = async (message) => {
    await setMessages((val) => [
      ...val,
      { message: message, send: true, id: val.length + 1 },
    ]);
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : null}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={scrollRef}
          data={Messages}
          renderItem={({ item }) => {
            return (
              <ChatBox key={item.id} message={item.message} send={item.send} />
            );
          }}
          keyExtractor={(item) => item.id}
        />

        <BottomBar onSend={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const BottomBar = (props) => {
  const [Message, setMessage] = React.useState();
  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.icon}>
        <EvilIcons name="image" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="camera-outline" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        value={Message}
        onChangeText={(value) => {
          setMessage(value);
        }}
        style={styles.input}
        placeholder="Write message here.."
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
        <Ionicons name="send-outline" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};
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
  },
});
