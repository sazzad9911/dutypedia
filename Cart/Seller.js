import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import { Foundation } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window')
function Seller(props) {
    return (
        <TouchableOpacity style={{
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


                margin: 5,
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                }}
                    source={{ uri: 'https://img.freepik.com/free-photo/stylish-little-smiling-girl-posing-dress-isolated-white-studio-background-caucasian-blonde-female-model-human-emotions-facial-expression-childhood-standing-with-hands-crossed_155003-23028.jpg?w=2000' }}
                />

            </View>
            <View style={{
                marginTop: 5,
                flex: 6
            }}>
                <Text style={{
                    fontSize: 15

                }}>
                    Easin Arafat
                </Text>
                <Text style={{
                    fontSize: 8

                }}>
                    Peciality : It
                </Text>
            </View>

        </TouchableOpacity>
    );
}

export default Seller;