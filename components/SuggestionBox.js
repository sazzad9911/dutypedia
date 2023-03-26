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
import OutsideView from "react-native-detect-press-outside";

const SuggestionBox = ({
  style,
  value,
  onChange,
  placeholder,
  DATA,
  innerRef,
  error,
  returnKeyType,
  onSubmitEditing,
  onSelect,
  onFocusOut
}) => {
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
      borderColor: Focus ? "#4ADE80" : "#767676",
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
      
        returnKeyType={returnKeyType}
        onSubmitEditing={() => {
          if (onSubmitEditing) {
            onSubmitEditing();
          }
        }}
        ref={innerRef}
        
        onEndEditing={() => {
          setFocus(false);
        }} 
        onFocus={() => {
          setFocus(true);
          setData(DATA);
          onChange(DATA);
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
          if(onSelect) {
            onSelect(val);
          }
        }}
        style={[styles.input,{
          fontFamily: "Poppins-Light",
        }]}
        placeholderTextColor={"#767676"}
        placeholder={placeholder ? placeholder : "Type here"}
      />
      {error && (
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins-Light",
            color: "red",
            marginLeft: 2,
          }}
        >
          {error}
        </Text>
      )}
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
            <TouchableOpacity
              style={{
                paddingVertical: 5,
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
    minHeight: 0,
  },
  text: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    marginBottom: 5,
  },
});
