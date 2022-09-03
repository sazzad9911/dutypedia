import React from 'react';
import {TouchableOpacity,Text} from 'react-native'

const Button = ({ style, title, onPress }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}
        style={[
          {
            borderWidth: 1,
            minWidth: 100,
            height: 35,
            borderRadius: 23,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#b5b5b5",
          },
          style,
        ]}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "bold",
            color: style && style.color ? style.color : "#808080",
            fontFamily:'Poppins-SemiBold'
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
export default Button  