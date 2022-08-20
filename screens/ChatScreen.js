
import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native'
import ChatBox from './../components/ChatBox';


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
