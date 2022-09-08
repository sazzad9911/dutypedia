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

const SuggestionBox = ({ style, value, onChange,placeholder }) => {
  const [Value, setValue] = React.useState();
  const [Data, setData] = React.useState();
  const [Focus, setFocus] = React.useState(false);
  React.useEffect(() => {
    setValue(value);
  }, [value]);
  const DATA = [
    {
      title: "Mr",
      value: "Mr.",
    },
    {
      title: "Mrs",
      value: "Mrs.",
    },
    {
      title: "Miss",
      value: "Miss.",
    },
    {
      title: "Dr. (Doctor)",
      value: "Dr.",
    },
    {
      title: "Esq. (Esquire)",
      value: "Dr.",
    },
    {
      title: "Hon. (Honorable)",
      value: "Hon.",
    },
    {
        title: "Jr. (Junior)",
        value: "Jr.",
      },
  ];
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
      position: "absolute",
      top: 45,
      left: 0,
      backgroundColor: "#f5f5f5",
      width: "100%",
      paddingHorizontal: 10,
      borderRadius:5,
      zIndex: 100
    },
    text: {
      fontSize: 15,
      fontFamily: "Poppins-Medium",
      marginBottom:5
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
          if (onChange) {
            onChange(val);
          }
          if (val) {
            let arr = DATA.filter((d) => d.title.match(val));
            setData(arr);
          } else {
            setData(null);
          }
        }}
        style={[styles.input]}
        placeholder={placeholder?placeholder:'Type here'}
      />
      <Animated.View entering={FadeIn} style={styles.container}>
        <ScrollView>
          {Array.isArray(Data) &&
            Data.map((doc, i) => (
              <TouchableOpacity
                onPress={() => {
                  setValue(doc.value);
                  setData(null);
                }}
                key={i}
              >
                <Text style={styles.text}>{doc.title}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default SuggestionBox;
