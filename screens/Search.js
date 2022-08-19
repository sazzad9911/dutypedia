import React from 'react';
import {View,Text} from 'react-native'
import Options from '../Cart/Options'

const Search = () => {
    return (
        <View style={{
            flexDirection: 'row',
            flexWrap:'wrap',
            paddingHorizontal:15
        }}>
            <Options name='Lower'/>
            <Options name='Electric Service'/>
            <Options name='Cleaning Service'/>
        </View>
    );
};

export default Search;