import React from "react";
import { View, ScrollView, Image, Text } from "react-native";

const OfferNow = ({ navigation, route }) => {
  const params = route.params ? route.params : null;
  const data = params ? params.data : null;

  React.useEffect(() => {
    console.log(data.service);
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          borderWidth: 1,
          borderColor: "#e5e5e5",
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <View style={{}}>
          <Image />
          <View>
            <Text>{data ? data.title : "---"}</Text>
            <View>
              <Text>Sazzad Hossain</Text>
              <Text>(Male)</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OfferNow;
