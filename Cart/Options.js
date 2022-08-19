import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import { Foundation } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window')
function Options(props) {
    return (
        <TouchableOpacity style={{
            width: width/3,
            height: 50,
            shadowOffset: {
                height: 1,
                width: 1,
            },
            shadowColor: "black",
            shadowRadius: 5,
            elevation: 5,
            shadowOpacity: .5,
            backgroundColor: primaryColor,
            margin: 10,
            marginLeft: 0,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent:'center',
                alignItems:'center',


        }}>
            <Text style={{
                justifyContent:'center',
                alignItems:'center',
            }}>
                Lawyer
            </Text>
            
        </TouchableOpacity>
    );
}

export default Options;