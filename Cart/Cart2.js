import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

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
                    marginLeft: 10,
                    marginTop:5,
                    flex:6,
                }}>

                    <FontAwesome style={{ marginTop:3}} name="star" size={10} color="#FFCC00" />
                    <FontAwesome style={{ marginTop:3}} name="star" size={10} color="#FFCC00" />
                    <FontAwesome style={{ marginTop:3}} name="star" size={10} color="#FFCC00" />
                    <FontAwesome style={{ marginTop:3}} name="star" size={10} color="#FFCC00" />
                    <FontAwesome style={{ marginTop:3}} name="star" size={10} color="#FFCC00" />
                    <Text style={{
                        marginLeft:5,
                        fontSize:10,
                    }}>
                        5.0
                    </Text>
                </View>
                <View style={{
                    flex:2,
                    marginTop:5,
                }}>
                    <Text style={{
                        fontSize:10
                    }}>
                        View 10k
                    </Text>
                </View>

            </View>
            <Text style={{

                marginLeft: 10,
                marginRight:10,
            }}>
                I Will Make a Custom Graphics For Your Blog
            </Text>
            <View style={{
                flexDirection:'row',
                marginTop:10,
            }}>
            <Text style={{
                flex:6,
                marginLeft:10,
                
            }} >
                500$
            </Text>
            <TouchableOpacity  style={{
                flex:1
            }} >
            <EvilIcons name="heart" size={24} color="black" />
            </TouchableOpacity>

            </View>
        </TouchableOpacity>
    );
}

export default Cart2;