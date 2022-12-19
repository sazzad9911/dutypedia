import React from "react";
import { View, Text, TextInput, Dimensions } from "react-native";
import Button from "./../../components/Button";
import { primaryColor, backgroundColor, textColor } from "../../assets/colors";
import IconButton from "../../components/IconButton";
const { width, height } = Dimensions.get("window");

const InputModal = ({ Close, onChange }) => {
  const [text, setText] = React.useState();
  return (
    <View
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.21)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: primaryColor,
          width: width - 100,
          minHeight: 100,
          borderRadius: 5,
          padding: 10,
          shadowOffset: {
            height: 1,
            width: 1,
          },
          shadowRadius: 2,
          elevation: 2,
          shadowOpacity: 0.2,
          shadowColor: "#e5e5e5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            marginTop: 10,
          }}
        >
          Add New Category
        </Text>
        <TextInput
          onChangeText={(val) => {
            setText(val);
          }}
          style={{
            borderWidth: 1,
            borderColor: "#e5e5e5",
            height: 45,
            marginTop: 15,
            marginBottom: 15,
            borderRadius: 5,
            paddingLeft: 5,
            fontSize: 14,
            fontFamily: "Poppins-Light",
            justifyContent: "center",
            width: width - 140,
          }}
          placeholder="Title"
        />
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <IconButton disabled={text?false:true}
            onPress={() => {
              if (onChange) {
                onChange(text);
                setText('')
                Close(false);
              }
            }}
            style={{
              flex: 1,
              marginRight: 10,
              borderWidth: 0,
              backgroundColor: text?backgroundColor:'#707070',
              height: 40,
              borderRadius: 5,
              marginLeft: 10,
            }}
            title="ADD"
          />
          <IconButton
            onPress={() => {
              if (Close) {
                Close(false);
              }
            }}
            style={{
              flex: 1,
              borderColor: "#e5e5e5",
              color: "#707070",
              height: 40,
              borderRadius: 5,
              marginRight: 10,
            }}
            title="CLOSE"
          />
        </View>
      </View>
    </View>
  );
};

export default InputModal;
