import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor,textColor } from "./../assets/colors";

const AllReviewHeader = ({ navigation }) => {
  return (
    <View
      style={{
        marginTop: 31,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: primaryColor,
      }}
    >
      <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="md-chevron-back-sharp" size={25} color="black" />
      </TouchableOpacity>
      <Text style={{
        textAlign: 'center',
        flex:1,
        marginLeft:-24,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize:15,
        color:textColor
      }}>23 Review</Text>
    </View>
  );
};

export default AllReviewHeader;
