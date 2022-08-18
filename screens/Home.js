import React from 'react';
import { View, Text, ScrollView,Dimensions } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import Cart from '../Cart/Cart';

const {width,height} =Dimensions.get('window')

const Home = () => {
    return (
        <ScrollView style={{
            marginLeft: 20,
            marginRight: 20,
        }}>
            <View>
                <Text style={{
                    fontSize: 20,
                    color: textColor
                }}>Category</Text>
            </View>
            <ScrollView horizontal={true}>
                <Cart />
                <Cart />
                <Cart />
                <Cart />
            </ScrollView>
        </ScrollView>
    );
};

export default Home;