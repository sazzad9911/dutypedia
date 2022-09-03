import React from 'react';
import {SvgXml} from 'react-native-svg'
import {View,TouchableOpacity} from 'react-native'
import {add} from '../assets/icon'

const AddButton = ({title,onPress,style}) => {
    return (
        <TouchableOpacity style={{

        }}>
            <SvgXml xml={add} height="25" width="25"/>
        </TouchableOpacity>
    );
};

export default AddButton;