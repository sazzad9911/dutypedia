import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')
const Profile = () => {
    const window = Dimensions.get('window')
    return (
        <ScrollView style={{
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'column',
            overflow: 'visible',
            backgroundColor: 'transparent',
        }}>
            <View style={{
                height: 160,
                backgroundColor: 'red',
                borderRadius: 5,
            }}>

                <TouchableOpacity style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: 'white',
                    margin: 10,
                    marginHorizontal: width - 80,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <Ionicons name="camera-outline" size={24} color="red" />

                </TouchableOpacity>

            </View>
            
        </ScrollView>
    );
};

export default Profile;