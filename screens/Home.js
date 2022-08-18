import React from 'react';
import { View, Text, ScrollView,Dimensions, TouchableOpacity } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import Cart from '../Cart/Cart';
import Cart1 from '../Cart/Cart1';
import Cart2 from '../Cart/Cart2';

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
            <Text>
                What is Your Best Interested Category
            </Text>
            <ScrollView horizontal={true}>
                <Cart1/>
                <Cart1/>
                <Cart1/>
                <Cart1/>
                <Cart1/>
            </ScrollView>
            <ScrollView horizontal={true}>
                <Cart1/>
                <Cart1/>
                <Cart1/>
                <Cart1/>
                <Cart1/>
            </ScrollView>
            <ScrollView horizontal={true}>
                <Cart1/>
                <Cart1/>
                <Cart1/>
                <Cart1/>
                <Cart1/>
            </ScrollView>
            <View style={{
                flexDirection:'row',
            }}>
                <Text style={{

                    flex:5
                }}>
                    Some Suggest
                </Text>
                <TouchableOpacity style={{
                    flex:1,
                }}>
                    <Text>
                        view all
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
                <Cart2 />
                <Cart2 />
                <Cart2 />
                <Cart2 />
            </ScrollView>
        </ScrollView> 
    );
};

export default Home;