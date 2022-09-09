import React from 'react';
import {TouchableOpacity,Text,View,TextInput,Dimensions} from 'react-native'
import {primaryColor,backgroundColor} from '../assets/colors'

const TextArea = ({placeholder,style,rows}) => {
    const [Focus, setFocus]= React.useState(false)
    const ref = React.useRef();
    const { width, height}= Dimensions.get("window");
    return (
        <TouchableOpacity style={[{
            width: width-40,
            borderWidth:1,
            borderColor:Focus?backgroundColor:'#e5e5e5',
            borderRadius:5,
            minHeight:100,
            marginVertical:5,
            paddingHorizontal:10,
            paddingVertical:5
        },style]} onPress={() =>{
            ref.current.focus()
        }}>
            <TextInput style={{
                fontFamily:'Poppins-Light',
                fontSize:14
            }} onFocus={() =>{
                setFocus(true)
            }} onEndEditing={() =>{
                setFocus(false)
            }} ref={ref} rows={rows?rows:4} placeholder={placeholder} />
        </TouchableOpacity>
    );
};

export default TextArea;
