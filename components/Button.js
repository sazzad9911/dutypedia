import React from 'react';
import {TouchableOpacity,Text,Dimensions} from 'react-native'

const {width,height}=Dimensions.get("window")
const Button = ({ style, title, onPress,disabled,Icon }) => {
  const [text,setText]=React.useState()
  const [contentWidth,setContentWidth]=React.useState()
  const [textWidth,setTextWidth]=React.useState(0)
  // React.useEffect(()=>{
  //   setText("")
  //   if(contentWidth){
  //     console.log(contentWidth)
  //     let line=''
  //     let arr=title.split("")
  //     let j=0;
  //     let len=0
  //     arr.map((doc,i)=>{
  //       if((12*i)<contentWidth){
  //         line=line+doc;
  //         len=len+1
  //       }
  //       if(doc=="i"||doc=="l"){
  //         j=j+1
  //       }
  //     })
  //     // for(var k=len;k<(len+j);k++){
  //     //   console.log("fd")
  //     //   if(arr.length>=(len+j)){
  //     //     line=line+arr[k]
  //     //   }
  //     // }
  //     setText(`${line} ${(title.split("").length*12)<contentWidth?"":"..."}`)
  //   }
  // },[contentWidth])
  
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
            overflow:"hidden"
          },
          style,
        ]}
      >
     {
      Icon?( <Icon/>):(<></>)
     }
        <Text numberOfLines={1} onLayout={e=>{
          setTextWidth(e.nativeEvent.layout.width)
        }}
          style={{
            fontSize:style&&style.fontSize?style.fontSize: 13,
            color:style&&style.color?style.color:'white',
            fontFamily:style&&style.fontFamily?style.fontFamily:'Poppins-Medium',
            width:"100%",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
export default Button  