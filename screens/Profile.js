import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')
const Profile = () => {
    return (
        <View style={{
            height: 160,
            backgroundColor: 'red',
            marginLeft: 10,
            marginRight: 10,
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
    );
};

export default Profile;