import React from 'react';
import {View,Text,ScrollView,Image} from 'react-native'


const ImageViewer = ({route, navigation}) => {
    const uri=route.params.uri
    if(!uri){
        return(
            <Text>Not found uri</Text>
        )
    }
    return (
        <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image style={{
                width: '100%',
                height: '50%',
            }} source={{uri:uri}}/>
        </View>
    );
};

export default ImageViewer;