import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import { Foundation } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window')
function Cart1(props) {
    return (
        <View style={{
            width: 250,
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
            borderRadius: 5,
            flexDirection: 'row',


        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Foundation style={{
                    margin: 10
                }} name="music" size={24} color="black" />
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{

                    margin: 10,
                }}>
                    Builder Service
                </Text>
            </View>
            <View style={{
                margin: 10,
                borderColor: 'black',
                borderRadius: 15,
                height: 30,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
                <Text style={{
                    color: 'red',
                }}>

                    +add
                </Text>

            </View>
        </View>
    );
}

export default Cart1;