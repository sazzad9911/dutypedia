import React from 'react';
import { View, Text, ScrollView, Dimensions,
     TouchableOpacity, Image } from 'react-native';
import { textColor, primaryColor } from './../assets/colors';
import Cart from '../Cart/Cart';
import Cart1 from '../Cart/Cart1';
import Cart2 from '../Cart/Cart2';
import Options from '../Cart/Options';
import Seller from '../Cart/Seller';

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
            <Text>
                Popular Categpry
            </Text>
            <View style={{
                flexDirection: 'row',
                height: 140,
                
                borderRadius: 10,
            }}>
                <View style={{
flex:3
                }}>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 10,
                        marginTop: 20,
                    }}>
                        Become A Seller
                    </Text>
                    <TouchableOpacity style={{
                        marginLeft: 10,
                        marginTop:20,
                        height: 40,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                    <Text>
                        Create An Account
                    </Text>

                    </TouchableOpacity>
                    
                </View>
                <View style={{
                    flex :2,
                }}>
                    <Image style={{
                        height:120,
                        margin:10,
                
            }} source={{ uri: 'https://www.incimages.com/uploaded_files/image/1920x1080/getty_486140535_970936970450058_85865.jpg' }} />

                    </View>
            </View>

        </ScrollView>
    );
};

export default Home;