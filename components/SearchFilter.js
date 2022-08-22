import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { primaryColor, secondaryColor } from "../assets/colors";
import { AntDesign } from "@expo/vector-icons";

const SearchFilter = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        
        <View>
          <View style={styles.box}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Sort By
            </Text>
          </View>
          <View
            style={{
              height: 50,
              marginLeft: 10,
              backgroundColor: "#ffffff",
              justifyContent: "center",
            }}
          >
            <Text>Online Seller</Text>
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 7,
              }}
            >
              Verified Seller
            </Text>
            <View style={styles.container}>
              <Switch
                trackColor={{ false: "#767577", true: "#808000" }}
                thumbColor={isEnabled ? "#f4f3f4 " : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: secondaryColor,
              height: 2,
            }}
          ></View>
          <View style={styles.box}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Filter
            </Text>
          </View>
          <View
            style={{
              backgroundColor: secondaryColor,
              height: 2,
            }}
          ></View>
          <View style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 9,
              }}
            >
              Category
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 3,
              }}
            >
              <Text
                style={{
                  marginRight: 20,
                  flex: 2,
                }}
              >
                Select
              </Text>
              <AntDesign
                style={{
                  marginTop: 5,
                }}
                name="right"
                size={16}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Filter
            </Text>
          </View>
          <View style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 4,
              }}
            >
              Price Rang
            </Text>
            <TextInput style={styles.input}>
              <Text>$</Text>
            </TextInput>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                To
              </Text>
            </View>
            <TextInput style={styles.input}>
              <Text style={{}}>$</Text>
            </TextInput>
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 9,
              }}
            >
              Seller Level
            </Text>
            <TouchableOpacity style={styles.touch}>
              <AntDesign
                style={{
                  marginTop: 5,
                  marginLeft: 18,
                }}
                name="right"
                size={16}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 9,
              }}
            >
              Seller Location
            </Text>
            <TouchableOpacity style={styles.touch}>
              <AntDesign
                style={{
                  marginTop: 5,
                  marginLeft: 18,
                }}
                name="right"
                size={16}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  box: {
    height: 50,
    backgroundColor: "#fbfbfb",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box1: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 30,
    width: 120,
    borderWidth: 1,
    flex: 3,
    borderRadius: 5,
  },
  touch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  gap: {
    backgroundColor: secondaryColor,
    height: 2,
  },
});
