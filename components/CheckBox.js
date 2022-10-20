import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Animated as Animation,
} from "react-native";
import {
  primaryColor,
  textColor,
  backgroundColor,
} from "./../assets/colors.js";
const { width, height } = Dimensions.get("window");
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useSelector, useDispatch } from "react-redux";

const CheckBox = ({ onChange, value, title, style }) => {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(value);
  }, [value]);
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      <View
        style={{
          borderWidth: Platform.OS == "ios" ? 1 : 0,
          borderColor: "#e5e5e5",
          height: 33,
          width: 33,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginRight: Platform.OS == "ios" ? 10 : 0,
        }}
      >
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            if (onChange) {
              onChange(title);
            }
            setChecked(!checked);
          }}
        />
      </View>
      <Text
        style={[
          styles.text,
          {
            flex: 1,
            color: style && style.color ? style.color : "black",
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default CheckBox;
