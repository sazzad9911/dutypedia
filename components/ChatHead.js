import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ChatHead = (props) => {
    const navigation = props.navigation
    return (
        <View style={{
            marginTop:33,
            minHeight:50,
            paddingVertical:5,
            paddingHorizontal:10,
            alignItems: 'center',
            flexDirection: 'row',
        }}>
        <View style={styles.box}>
        <Ionicons onPress={()=>navigation.goBack()} name="chevron-back" size={24} color="black" />
        <Image style={styles.image} source={{ uri:'https://hindidp.com/wp-content/uploads/2022/02/cute_beautiful_dp_fo_wHC8X.jpg'}}/>
        <Text style={styles.text}>Sefa Khandakar</Text>
        </View>
        <View style={[styles.box,{
            justifyContent:'flex-end',
        }]}>
        <TouchableOpacity>
        <Zocial style={styles.icon} name="call" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
        <MaterialIcons style={styles.icon} name="videocam" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
        <Entypo style={styles.icon} name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
        </View>
        </View>
    );
};

export default ChatHead;
const styles= StyleSheet.create({
    box:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width:40,
        height:40,
        borderRadius:20
    },
    text: {
        fontSize:15,
        fontWeight: 'bold'
    },
    icon:{
        marginLeft:20
    }
})