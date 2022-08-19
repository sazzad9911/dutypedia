import React from 'react';
import {View,Text,Switch,Image,StyleSheet,TouchableOpacity,Modal} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { assentColor, primaryColor } from './../assets/colors';
import { FontAwesome } from '@expo/vector-icons';

const ChatHead = (props) => {
    const navigation = props.navigation
    const [visible,setVisible]=React.useState(false)
    return (
        <View style={{
            marginTop:33,
            minHeight:50,
            paddingVertical:5,
            paddingHorizontal:10,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor:primaryColor
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
        <TouchableOpacity onPress={() =>setVisible(!visible)}>
        <Entypo style={styles.icon} name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
        </View>
        <Modal transparent={true} visible={visible} onRequestClose={()=>{
            setVisible(!visible);
        }}>
        <MenuBar/>
        </Modal>
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
        borderRadius:20,
        marginLeft:10,
        marginRight:10,
    },
    text: {
        fontSize:15,
        fontWeight: 'bold'
    },
    icon:{
        marginLeft:20
    },
    menuContainer:{
        minWidth:150,
        minHeight:100,
        backgroundColor:assentColor,
        position:'absolute',
        top:22,
        right:30,
        padding:10,
        borderRadius:5,
        shadowOffset:{
            width:2,height:2
        },
        shadowColor:'black',
    },
    menuSubContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginHorizontal:5,
        alignItems: 'center',
    }
})
const MenuBar=()=>{
    const [Call, setCall] = React.useState(false);
    const [Mute,setMute] = React.useState(false);
    return (
        <View style={styles.menuContainer}>
        <View style={styles.menuSubContainer}>
        <Ionicons name="ios-call" size={20} color="black" />
        <Text>Call</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#D2FE51" }}
        thumbColor={Call ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value) =>{
            setCall(value);
        }}
        value={Call}
      />
        </View>
        <View style={styles.menuSubContainer}>
        <Ionicons name="volume-mute" size={20} color="black" />
        <Text>Mute</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#D2FE51" }}
        thumbColor={Call ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value) =>{
            setMute(value);
        }}
        value={Mute}
      />
        </View>
        <View style={styles.menuSubContainer}>
        <FontAwesome name="user-circle-o" size={20} color="black" />
        <Text>View Profile</Text>
        <View style={{width:5}}/>
        </View>
        </View>
    )
}