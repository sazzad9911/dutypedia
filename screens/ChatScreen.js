
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,   
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ChatBox from "./../components/ChatBox";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { backgroundColor, assentColor, primaryColor,secondaryColor } from "./../assets/colors";
const { width, height } = Dimensions.get("window");


const ChatScreen = () => {
    
    return (
        <ScrollView>
            <ChatBox />
            <ChatBox />
            <ChatBox />
            <ChatBox />
            <ChatBox />
        </ScrollView>
    );
};

export default ChatScreen;
