import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch,TouchableOpacity,TextInput } from 'react-native';
import { primaryColor,secondaryColor } from '../assets/colors';
import { AntDesign } from '@expo/vector-icons';




const SearchFilter = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={{
            marginLeft: 10,
            marginRight: 10,
        }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
            }}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold'
                }}>
                    Filter
                </Text>

            </View>
            <View style={styles.box}>
                <Text style={{
                    fontWeight:'bold'
                }}>
                    Sort By
                </Text>
            </View>
            <View style={styles.box1}>
                <Text>
                    Online Seller
                </Text>
            </View>
            <View style={{
                backgroundColor: secondaryColor,
                height:2
            }}>

            </View>
            <View style={[styles.box1,{ flexDirection:'row',}]}>
                <Text style={{
                    flex:7
        
                }}>
                    Verified Seller
                </Text>
                <View style={styles.container}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#808000" }}
                        thumbColor={isEnabled ? "#f4f3f4 " : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View style={{
                backgroundColor: secondaryColor,
                height:2
            }}>

            </View>
            <View style={styles.box}>
                <Text style={{
                    fontWeight:'bold'
                }}>
                    Filter
                </Text>
            </View>
            <View style={{
                backgroundColor: secondaryColor,
                height:2
            }}>

            </View>
            <View style={[styles.box1,{ flexDirection:'row'}]}>
                <Text style={{
                    flex:9
                }}>
                    Category
                </Text>
                <TouchableOpacity style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                    flex:3
                }}>
                    <Text style={{
                        marginRight:20,
                        flex:2
                    }}>
                        Select
                    </Text>
                    <AntDesign style={{
                    marginTop:5,
                }} name="right" size={16} color="black" />
                </TouchableOpacity>
                
            </View>
            <View style={styles.box}>
                <Text style={{
                    fontWeight:'bold'
                }}>
                    Filter
                </Text>
            </View>
            <View style={[styles.box1,{ flexDirection:'row'}]}>
                <Text style={{
                    flex:9
                }}>
                    Price Rang
                </Text>
                <TextInput style={{
                    height:30,
                    width:140,
                    borderWidth:1
                }}>

                </TextInput>
                
                
            </View>
            
            
        </View>
    );
};

export default SearchFilter;

const styles = StyleSheet.create({
    box: {
        height: 30,
        backgroundColor: '#fbfbfb',
        justifyContent: "center"

    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    box1:{
        height: 30,
                marginLeft: 10,
                marginRight: 10,
                backgroundColor: '#ffffff',
                justifyContent:'center',
            
    }


})