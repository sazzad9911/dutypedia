import React from "react";
import { View, Text } from "react-native";

const CombineCart = ({ num, Component }) => {
  return (
    <View>
      {Array.isArray(num) && num.length > 0 ? (
        num.map((num, i) => <Component key={i} />)
      ) : (
        <View
          style={{
            height: 100,
          }}
        />
      )}
    </View>
  );
};

export default CombineCart;
