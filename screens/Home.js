import React from 'react';
import { View, Text, ScrollView, Dimensions,
     TouchableOpacity, Image } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import Cart from '../Cart/Cart';
import Cart1 from '../Cart/Cart1';
import Cart2 from '../Cart/Cart2';
import Options from '../Cart/Options';
import Seller from '../Cart/Seller';
import SellerCart from './../Cart/SellerCart';

const { width, height } = Dimensions.get('window')

const Home = () => {
    return (
        <ScrollView style={{
            paddingLeft: 15,
            paddingRight: 15,
        }}>
            <View>
                <Text style={{
                    fontSize: 20,
                    color: textColor,
                    fontWeight: 'bold',
                    marginLeft:5
                }}>Category</Text>
            </View>
            <ScrollView horizontal={true}>
                <Cart />
                <Cart />
                <Cart />
                <Cart />
            </ScrollView>
            <Text style={{
                fontWeight:'bold',
                marginVertical:10,
                marginLeft:5
            }}>
                What is Your Best Interested Category
            </Text>
            <ScrollView horizontal={true}>
                <Cart1 />
                <Cart1 />
                <Cart1 />
                <Cart1 />
                <Cart1 />
            </ScrollView>
            <ScrollView horizontal={true}>
                <Cart1 />
                <Cart1 />
                <Cart1 />
                <Cart1 />
                <Cart1 />
            </ScrollView>
            <ScrollView horizontal={true}>
                <Cart1 />
                <Cart1 />
                <Cart1 />
                <Cart1 />
                <Cart1 />
            </ScrollView>
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={{
                fontWeight:'bold',
                marginVertical:10,
                flex:5,
                marginLeft:5
            }}>
                    Some Suggest
                </Text>
                <TouchableOpacity style={{
                marginVertical:10,
                flex:1
                }}>
                    <Text style={{
                        fontWeight:'bold',
                        textDecorationLine: 'underline',
                        marginRight:5
                    }}>
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
                <Cart2 />
                <Cart2 />
                <Cart2 />
                <Cart2 />
            </ScrollView>

            <Text style={{
                fontWeight:'bold',
                marginVertical:10,
                marginLeft:5
            }}>
                Top Seller
            </Text>
            <ScrollView horizontal={true}>
                <Options />
                <Options />
                <Options />
                <Options />
            </ScrollView>
            <ScrollView horizontal={true}>
                <Seller />
                <Seller />
                <Seller />
                <Seller />
                <Seller />
            </ScrollView>
            <ScrollView horizontal={true}>
                <Seller />
                <Seller />
                <Seller />
                <Seller />
                <Seller />
            </ScrollView>
            <ScrollView horizontal={true}>
                <Seller />
                <Seller />
                <Seller />
                <Seller />
                <Seller />
            </ScrollView>
            <Text style={{
                fontWeight:'bold',
                marginVertical:10,
                marginLeft:5
            }}>
                Popular Category
            </Text>
            <ScrollView horizontal={true}>
                <Options name="Builder" />
                <Options />
                <Options />
                <Options />
            </ScrollView>
            <View style={{height:20}}/>
            <SellerCart/>
            <View style={{height:10}}/>
        </ScrollView>
    );
};

export default Home;