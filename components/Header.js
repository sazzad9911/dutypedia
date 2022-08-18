import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={styles.box}>
           <Text style={styles.text}>Dutypedia</Text>
           <TouchableOpacity style={styles.input}>
           <EvilIcons style={{
            marginRight:10
           }} name="search" size={24} color="black" />
           <Text>Search On Dutypedia</Text>
           </TouchableOpacity>
        </View>
    );
};

export default Header;
const styles = StyleSheet.create({
    box:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:33
    },
    text:{
        color: '#000000',
        fontSize:20,
        fontWeight:'bold'
    },
    input:{
        margin:20,
        backgroundColor:'#ffff',
        height:40,
        width:'90%',
        borderRadius:5,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15
    }
})