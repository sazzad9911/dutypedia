import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const SuggestionBox = ({ style, value, onChange, placeholder, DATA }) => {
  const [Value, setValue] = React.useState();
  const [Data, setData] = React.useState();
  const [Focus, setFocus] = React.useState(false);
  React.useEffect(() => {
    setValue(value);
  }, [value]);

  const styles = StyleSheet.create({
    viewBox: {
      minWidth: 100,
    },
    input: {
      borderRadius: 5,
      borderColor: Focus ? "#DA1E37" : "#e5e5e5",
      borderWidth: 1,
      padding: 5,
      paddingHorizontal: 10,
      height: 45,
    },
    container: {
      top: 45,
      left: 0,
      backgroundColor: "#f5f5f5",
      width: "100%",
      paddingHorizontal: 10,
      borderRadius: 5,
      zIndex: 100,
      position: "absolute",
    },
    text: {
      fontSize: 15,
      fontFamily: "Poppins-Medium",
      marginBottom: 5,
    },
  });

  return (
    <View style={[styles.viewBox, style]}>
      <TextInput
        onEndEditing={() => {
          setFocus(false);
        }}
        onFocus={() => {
          setFocus(true);
        }}
        value={Value}
        onChangeText={(val) => {
          setValue(val);
          if (onChange && val) {
            let arr = DATA.filter((d) => d.title.match(val));
            setData(arr);
            onChange(arr);
          } else {
            onChange(null);
          }
        }}
        style={[styles.input]}
        placeholder={placeholder ? placeholder : "Type here"}
      />
    </View>
  );
};

export default SuggestionBox;
export const MainOptions = ({ Data, style, setData, setValue }) => {
  return (
    <Animated.View entering={FadeIn} style={[styless.container, style]}>
      <ScrollView>
        {Array.isArray(Data) &&
          Data.map((doc, i) => (
            <TouchableOpacity style={{
              paddingVertical:5
            }}
              onPress={() => {
                if (setValue && setData) {
                  setValue(doc.value);
                  setData(null);
                }
              }}
              key={i}
            >
              <Text style={styless.text}>{doc.title}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </Animated.View>
  );
};
const styless = StyleSheet.create({
  viewBox: {
    minWidth: 100,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    height: 45,
  },
  container: {
    top: 45,
    left: 0,
    backgroundColor: "#f5f5f5",
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 100,
    position: "absolute",
    minHeight:0
  },
  text: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    marginBottom: 5,
  },
});
