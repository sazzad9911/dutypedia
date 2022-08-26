import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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
          <FontAwesome key={i} name="star" size={18} color="#F1C00F" />
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
