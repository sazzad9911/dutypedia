import React, { useEffect, useState, useRef } from 'react';
import { 
    Animated,
    StyleSheet,
    Text, 
    TouchableWithoutFeedback,
    View, 
} from 'react-native';
import LinearGradient from 'expo-linear-gradient';

const LargeText = (props) => {
    // const [text, setText] = useState('');
    const startingHeight = 160;
    const [expander, setExpander] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [fullHeight, setFullHeight] = useState(startingHeight);
    const animatedHeight = useRef(new Animated.Value(startingHeight)).current;

useEffect(() => {
    // expanded?setText(props.text): setText(props.text.substring(0, 40));
    Animated.spring(animatedHeight, {
        friction: 100,
        toValue: expanded?fullHeight:startingHeight,
        useNativeDriver: false
    }).start();
}, [expanded]);

const onTextLayout = (e) => {
    let {x, y, width, height} = e.nativeEvent.layout;
    height = Math.floor(height) + 40;
    if(height > startingHeight ){
        setFullHeight(height);
        setExpander(true);
    }
};

  return (
    <View style={styles.container}>
        <Animated.View style={[styles.viewPort, { height: animatedHeight }]}>
            <View style={styles.textBox} onLayout={(e) => {onTextLayout(e)}}>
                <Text style={styles.text}>srzsdzxdxzdxdxdxdxdxdxdxdxdxd</Text>
            </View>
        </Animated.View>

        {expander &&
        <React.Fragment>
            <LinearGradient
                colors={[
                    'rgba(22, 22, 22,0.0)', // Change this gradient to match BG  
                    'rgba(22, 22, 22,0.7)',               
                    'rgba(22, 22, 22,0.9)',      
                ]}
            style={styles.gradient}/>
            <TouchableWithoutFeedback onPress={() => {setExpanded(!expanded)}}>
                <Text style={styles.readBtn}>{expanded?'Read Less':'Read More'}</Text>
            </TouchableWithoutFeedback>
            </React.Fragment>
        }
    </View>
 
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    height: 60,
    left: 0,
    bottom: 20,
    right: 0
  },
  container: {
    flex: 1,
  },
  viewPort: {
    flex: 1,
    overflow: 'hidden',
    top: 12,
    marginBottom: 20,
  },
  textBox: {
    flex: 1,
    position: 'absolute',
  },
  text: {
    color: '#fff',
    alignSelf: 'flex-start',
    textAlign: 'justify',
    fontSize: 14,
    fontFamily: 'Avenir',
  },
  gradient:{
    backgroundColor:'transparent', // required for gradient
    height: 40,  
    width: '100%', 
    position:'absolute', 
    bottom: 20
  },
  readBtn: {
    flex: 1,
    color: 'blue',
    alignSelf: 'flex-end',
  },
});

export default LargeText;