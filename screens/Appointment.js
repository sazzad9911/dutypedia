import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor } from "./../assets/colors";

const Appointment = ({ navigation }) => {
  const [Options, setOptions] = React.useState();
  return (
    <ScrollView>
      <Text
        style={{
          marginVertical: 15,
          marginHorizontal: 20,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Appointment
      </Text>
      <ListView
        onPress={() => {
          navigation.navigate("Upcoming");
        }}
        title="Upcoming"
        number={2}
      />
      <ListView
        onPress={() => {
          navigation.navigate("Previous");
        }}
        title="Previous"
        number={5}
      />
      <ListView2
        onPress={() => {
          navigation.navigate("Request");
        }}
        title="Request"
        number={0}
      />
    </ScrollView>
  );
};

export default Appointment;

export const ListView = ({ onPress, title, number }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 40,
        backgroundColor: primaryColor,
      }}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 10,
          paddingVertical: 15,
          borderBottomColor: "#e5e5e5",
        }}
      >
        <Text
          style={{
            fontSize: 17,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: 50,
            justifyContent: "space-between",
          }}
        >
          <Text>{number}</Text>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListView2 = ({ onPress, title, number }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 40,
        backgroundColor: primaryColor,
      }}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 10,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 17,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flex: 2,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: "50%",
              }}
            >
              Sent
            </Text>
            <Text style={{ marginLeft: 10 }}>{number}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 2,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: "22%",
              }}
            >
              Receive
            </Text>
            <Text style={{ marginLeft: 10 }}>{number}</Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
