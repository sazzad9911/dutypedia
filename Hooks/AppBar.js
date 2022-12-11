import React from 'react';
import {View, Dimensions, Platform} from 'react-native';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
}

function getStatusBarHeight(skipAndroid) {
    if (Platform.OS === 'ios') {
        return isIPhoneX ? 44 : 20;
    }
    if (skipAndroid) {
        return 0;
    }
    return StatusBar.currentHeight;
}

const CustomAppStatusBar = ({backgroundColor,barStyle,height, ...props}) => (
    <View style={{backgroundColor, height:height?height: getStatusBarHeight()}}>
        <StatusBar animated={true} hidden={false} translucent barStyle={barStyle} backgroundColor={backgroundColor} {...props} />
    </View>
);

CustomAppStatusBar.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
};

export default CustomAppStatusBar;
export const statusBarHeight = getStatusBarHeight();