import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')
function Cart2(props) {
    return (
        <TouchableOpacity style={{
            width: 240,
            height: 240,
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
                height: 130,
                width: '100%',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
            }} source={{ uri: 'https://media.istockphoto.com/photos/graphic-designer-at-work-picture-id1363772590?b=1&k=20&m=1363772590&s=170667a&w=0&h=u2GS9_Sd396ng762zsKCR9zonfsw83lssqpxdlh0F4g=' }} />

            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{
                    flexDirection: 'row',
                    margin: 5,
                    marginTop:5,
                    flex:4,
                }}>

                    <FontAwesome name="star" size={12} color="#FFCC00" />
                    <FontAwesome name="star" size={12} color="#FFCC00" />
                    <FontAwesome name="star" size={12} color="#FFCC00" />
                    <FontAwesome name="star" size={12} color="#FFCC00" />
                    <FontAwesome name="star" size={12} color="#FFCC00" />
                    <Text style={{
                        marginLeft:5
                        
                    }}>
                        5.0
                    </Text>
                </View>
                <View style={{
                    flex:2,
                    margin:5,
                }}>
                    <Text>
                        View 10k
                    </Text>
                </View>

            </View>
            <Text style={{

                margin: 10,
            }}>
                Builder Service
            </Text>
        </TouchableOpacity>
    );
}

export default Cart2;