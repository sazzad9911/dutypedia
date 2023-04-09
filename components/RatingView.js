import React from "react";
import { View, Text } from "react-native";
import {SvgXml} from 'react-native-svg';
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
          fontSize: 16,
          fontWeight:"500"
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
        {rate?(
          <Text
          style={{
            fontSize: 16,
            marginLeft:10,
            fontWeight:"500"
          }}
        >
          {rate>parseInt(rate)?rate:`${rate}.0`}
        </Text>
        ):(
          <Text
          style={{
            fontSize: 16,
            marginLeft:10,
            fontWeight:"500"
          }}
        >
          0.0
        </Text>
        )}
      </View>
    </View>
  );
};

export default RatingView;
const star=`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.86337 1.75669L7.74337 3.51669C7.86337 3.76169 8.18337 3.99669 8.45337 4.04169L10.0484 4.30669C11.0684 4.47669 11.3084 5.21669 10.5734 5.94669L9.33337 7.18669C9.12337 7.39669 9.00837 7.80169 9.07337 8.09169L9.42837 9.62669C9.70837 10.8417 9.06337 11.3117 7.98837 10.6767L6.49337 9.79169C6.22337 9.63169 5.77837 9.63169 5.50337 9.79169L4.00837 10.6767C2.93837 11.3117 2.28837 10.8367 2.56837 9.62669L2.92337 8.09169C2.98837 7.80169 2.87337 7.39669 2.66337 7.18669L1.42337 5.94669C0.693368 5.21669 0.928368 4.47669 1.94837 4.30669L3.54337 4.04169C3.80837 3.99669 4.12837 3.76169 4.24837 3.51669L5.12837 1.75669C5.60837 0.801686 6.38837 0.801686 6.86337 1.75669Z" fill="#F9BF00" stroke="#F9BF00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
