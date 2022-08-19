import React from 'react';
import {View,Text,ScrollView} from 'react-native'
import ChatBox from './../components/ChatBox';

const ChatScreen = () => {
    return (
        <View>
            <ScrollView>
            <Text>hello</Text>
            </ScrollView>
            <ChatBox/>
        </View>
    );
};

export default ChatScreen;