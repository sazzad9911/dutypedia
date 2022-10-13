import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor, secondaryColor, textColor } from "./../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { setBottomSheet } from "./../action";
import { EvilIcons } from "@expo/vector-icons";

const SearchHeader = (props) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  return (
    <View style={styles.box}>
      <TouchableOpacity
        onPress={() => {
          if (props.onPress) {
            return props.onPress();
          }
          navigation.goBack();
        }}
        style={styles.icon}
      >
        <Ionicons name="ios-chevron-back" size={24} color={textColor} />
      </TouchableOpacity>
      <TextInput
          value={props.search}
          onChangeText={(val) => {
            if (props.onChange) {
              props.onChange(val);
            }
          }}
          onFocus={() => {
            if (props.onFocus) {
              props.onFocus();
            }
          }}
          returnKeyType="search"
          onSubmitEditing={() => {
            if (props.onEndEditing) {
              props.onEndEditing();
            }
          }}
          autoFocus={props.autoFocus}
          style={styles.input}
          placeholder="Search here..."
        />

      {!props.autoFocus ? (
        <></>
      ) : (
        <TouchableOpacity
          onPress={() => {
            dispatch(setBottomSheet(1));
          }}
          style={[
            styles.icon,
            {
              alignItems: "flex-end",
            },
          ]}
        >
          <Ionicons name="md-filter-outline" size={24} color={textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchHeader;
const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 33,

    alignItems: "center",
    backgroundColor: primaryColor,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  input: {
    flex: 8,
    backgroundColor: secondaryColor,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  boxx: {
    backgroundColor: secondaryColor,
    marginLeft: -10,
    flex: 10,
    borderRadius: 5,
  },
  textx: {
    color: textColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputx: {
    margin: 20,
    backgroundColor: primaryColor,
    height: 40,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingLeft: 10,
  },
});
