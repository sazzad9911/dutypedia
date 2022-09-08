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
import { AntDesign } from "@expo/vector-icons";
import OutsideView from "react-native-detect-press-outside";

const DropDown = ({ style, value, onChange, placeholder, DATA }) => {
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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    container: {
      position: "absolute",
      top: 45,
      left: 0,
      backgroundColor: "#f5f5f5",
      width: "100%",
      paddingHorizontal: 10,
      borderRadius: 5,
      zIndex: 95,
    },
    text: {
      fontSize: 15,
      fontFamily: "Poppins-Medium",
      marginRight: 10,
    },
  });
  const childRef=React.useRef()
  return (
    <OutsideView
      childRef={childRef}
      onPressOutside={() => {
        setFocus(false)
      }}
    >
      <View style={[styles.viewBox, style]}>
        <TouchableOpacity
          onPress={() => {
            setFocus(!Focus);
          }}
          style={styles.input}
        >
          <Text style={[styles.text, { color: "#707070" }]}>
            {Value ? Value : placeholder}
          </Text>
          <AntDesign
            style={{
              justifySelf: "flex-end",
            }}
            name="down"
            size={20}
            color="#707070"
          />
        </TouchableOpacity>
        {Focus ? (
          <Animated.View entering={FadeIn} style={styles.container}>
            {Array.isArray(DATA) &&
              DATA.map((doc, i) => (
                <TouchableOpacity
                  onPress={() => {
                    setValue(doc.title);
                  }}
                  key={i}
                >
                  <Text style={styles.text}>{doc.title}</Text>
                </TouchableOpacity>
              ))}
          </Animated.View>
        ) : (
          <></>
        )}
      </View>
    </OutsideView>
  );
};

export default DropDown;
