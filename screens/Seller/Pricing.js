import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { primaryColor } from "./../../assets/colors";
import { TextInput } from "react-native-paper";

const Pricing = ({ navigation, route }) => {
  const [CenterName, setCenterName] = React.useState();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.viewBox}>
        <Text style={styles.text}>Informations</Text>
        <TextInput
          mode="outlined"
          label="Service center name"
          value={CenterName}
          onChangeText={(text) => setCenterName(text)}
        />
      </View>
    </ScrollView>
  );
};

export default Pricing;
const styles = StyleSheet.create({
  viewBox: {
    backgroundColor: primaryColor,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minHeight: 200,
    borderRadius: 5,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
});
