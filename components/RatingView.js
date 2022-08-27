import React from "react";
import { View, Text } from "react-native";
import {SvgXml} from 'react-native-svg';
import {star} from '../assets/icon'

const RatingView = ({ title, rate, style }) => {
  const [period, setPeriod] = React.useState([]);
  React.useEffect(() => {
    let arr = [];
    let i = 0;
    while (i <= parseInt(rate)) {
      arr.push(i);
      i++;
    }
    setPeriod(arr);
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
          fontWeight: "bold",
          color: "#808080",
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
          }} key={i} xml={star} height="18" width="18" />
        ))}
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#808080",
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
