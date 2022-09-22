import React from 'react';
import { View,ImageBackground } from 'react-native';
import { Text } from 'react-native';
import {map} from '../../assets/icon'
import { SvgXml } from 'react-native-svg';

const VendorAddress = () => {
    return (
        <SvgXml xml={map} style={{flex:1,paddingHorizontal:20}}>
        <Text>Your Physical</Text>
        <Text>Address</Text>
        </SvgXml>
    );
};

export default VendorAddress;