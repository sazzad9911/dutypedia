import React from "react";
import { View, Text } from "react-native";
import {SvgXml} from 'react-native-svg';
import {star} from '../assets/icon'
import {textColor} from '../assets/colors'

const RatingView = ({ title, rate, style }) => {
  const [period, setPeriod] = React.useState([]);
  React.useEffect(() => {
    let arr = [];
    let i = 0;
    while (i <= parseInt(rate)) {
      arr.push(i);
      i++;
    }
    setPeriod(["2"]);
  }, [rate]);
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Poppins-Medium',
          color:textColor,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {period.map((doc, i) => (
          <SvgXml style={{
            marginRight:3
          }} key={i} xml={star} height="15" width="15" />
        ))}
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            color: textColor,
            marginLeft:10
          }}
        >
          {rate}
        </Text>
      </View>
    </View>
  );
};

export default RatingView;
