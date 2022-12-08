import React from 'react';
import {TouchableOpacity,Text,Dimensions} from 'react-native'

const {width,height}=Dimensions.get("window")
const Button = ({ style, title, onPress,disabled,Icon }) => {
  const [text,setText]=React.useState()
  const [contentWidth,setContentWidth]=React.useState()
  React.useEffect(()=>{
    setText("")
    if(contentWidth){
      let line=''
      title.split("").map((doc,i)=>{
        if((12*i)<contentWidth){
          line=line+doc;
        }
      })
      setText(`${line} ${(title.split("").length*12)<contentWidth?"":"..."}`)
    }
  },[contentWidth])
    return (
      <TouchableOpacity onLayout={e=>{
        setContentWidth(e.nativeEvent.layout.width)
      }} disabled={disabled?true:false}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}
        style={[
          {
            borderWidth: 100,
            height: 35,
            borderRadius: 23,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#b5b5b5",
            opacity:disabled?.8:1,
            
          },
          style,
        ]}
      >
     {
      Icon?( <Icon/>):(<></>)
     }
        <Text 
          style={{
            fontSize:style&&style.fontSize?style.fontSize: 13,
            color:style&&style.color?style.color:'white',
            fontFamily:style&&style.fontFamily?style.fontFamily:'Poppins-Medium',
            textAlign:"justify"
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };
export default Button  