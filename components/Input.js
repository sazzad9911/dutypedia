import React from "react";
import { View, TextInput, Text } from "react-native";
import { primaryColor } from "./../assets/colors";
import Animated,{StretchInY} from "react-native-reanimated";

const Input = ({onChange,value,style,placeholder,keyboardType,error,returnKeyType,onKeyPress}) => {
  const [Focus,setFocus]= React.useState(false)
  const [Error,setError]=React.useState()
  React.useEffect(() => {
    setError(error)
  },[error])
  return (
    <Animated.View entering={StretchInY}>
      <TextInput returnKeyType={returnKeyType} 
      onKeyPress={(e) => {
        if(onKeyPress){
          onKeyPress(e)
        }
      }}  keyboardType={keyboardType} value={value} onChangeText={(val)=>{
        if(onChange){
            onChange(val);
        }
      }}
      onFocus={()=>{
        setFocus(!Focus);
      }}
      onEndEditing={()=>{
        setFocus(!Focus);
      }}
        placeholder={placeholder?placeholder:"Type here"}
        style={[{
          borderBottomWidth: 1,
          marginHorizontal: 20,
          borderBottomColor: !Focus?'#e5e5e5':'#DA1E37',
          marginVertical: 5,
          backgroundColor: primaryColor,
          borderRadius: 5,
          height: 45,
          paddingHorizontal: 10,
          fontFamily: "Poppins-Light",
          fontSize:15
        },style,{borderColor:!Focus?'#e5e5e5':'#DA1E37'}]}
      />
      {Error&&(<Text style={[{
        fontSize:12,
        color:'red',
        fontFamily: 'Poppins-Light',
        borderWidth:0,
        marginTop:0,
        marginBottom:0,
        marginLeft:style.marginLeft,
      }]}>{Error}</Text>)}
    </Animated.View>
  );
};

export default Input;
