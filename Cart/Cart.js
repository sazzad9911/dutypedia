import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';


const { width, height } = Dimensions.get('window')
function Cart(props) {
    return (
        <TouchableOpacity style={{
            width: width / 3,
            height: 140,
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


        }}>

            <Image style={{
                height: 80,
                width: '100%',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
            }} source={{ uri: 'https://www.ouc.com/images/business/3-4.jpg?sfvrsn=3294c0f0_2' }} />

            <Text style={{

                margin: 10,
            }}>
                Builder Service
            </Text>
        </TouchableOpacity>
    );
}

export default Cart;