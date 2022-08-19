import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const ChatBox = () => {
    const window = Dimensions.get('window')
    return (
        <View>
            <View style={{
                margin: 10,

            }}>
                <View style={{
                    width: 240,
                    backgroundColor: '#bfbfbf',
                    borderRadius: 10,
                    padding: 10,

                }}>
                    <Text Style={{

                    }}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</Text>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 155,
                    }}>
                        <Text style={{
                            fontSize: 10,
                            flex: 3,
                            fontColor: '#808080',
                        }}> 2.30 pm</Text>
                        <AntDesign style={{
                            flex: 1,
                            marginTop: 3,

                        }} name="checkcircle" size={10} color="#808080" />
                    </View>
                </View>
                
            </View>
        </View>
    );
};

export default ChatBox;
