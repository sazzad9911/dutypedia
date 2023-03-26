import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import OutsideView from "react-native-detect-press-outside";
import { primaryColor, textColor } from "./../assets/colors";

const DropDown = ({ style, value, onChange, placeholder, DATA, error,visible,message,label,noIcon }) => {
  const [Value, setValue] = React.useState();
  const [Data, setData] = React.useState();
  const [Focus, setFocus] = React.useState(false);
  const [Visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setValue(value);
  }, [value]);
  React.useEffect(()=>{
    if(visible){
      setFocus(true)
    }else{
      setFocus(false);
    }
  },[visible])

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
      backgroundColor: "#f5f5f5",
      width: "100%",
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    text: {
      fontSize: 15,
      fontFamily: "Poppins-Light",
      marginRight: 10,
      color: textColor,
      flex:1
    },
  });
  const childRef = React.useRef();
  return (
    <View>
      <View style={[styles.viewBox, style]}>
        {label&&(
          <Text numberOfLines={1} style={{
            position:"absolute",
            top:-8,
            fontSize:12,
            left:10,
            backgroundColor:"white",
            zIndex:300
          }}>{label}</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            setFocus(!Focus);
          }}
          style={styles.input}
        >
          <Text numberOfLines={1} style={[styles.text, { color: "#707070" }]}>
            {Value ? Value : placeholder}
          </Text>
          {!noIcon&&(
            <AntDesign
            style={{
              justifySelf: "flex-end",
            }}
            name="down"
            size={20}
            color="#707070"
          />
          )}
        </TouchableOpacity>
        {error && (
          <Text
            style={{
              marginLeft: 2,
              fontSize: 12,
              fontFamily: "Poppins-Light",
              color: "red",
            }}
          >
            {error}
          </Text>
        )}
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={Focus}
        onRequestClose={() => {
          setFocus(!Focus);
        }}
      >
        <OutsideView
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.21)" }}
          childRef={childRef}
          onPressOutside={() => {
            setFocus(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              ref={childRef}
              entering={FadeIn}
              style={{
                maxHeight: 320,
                width: "90%",
                backgroundColor: primaryColor,
                borderRadius: 5,
              }}
            >
              <ScrollView>
              <View style={{height:10}}/>
                {Array.isArray(DATA) &&
                  DATA.map((doc, i) => (
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        height: 50,
                        marginTop: 2,
                        paddingHorizontal: 10,
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: "#e5e5e5",
                      }}
                      onPress={() => {
                        setValue(doc);
                        setFocus(false);
                        if (onChange) {
                          onChange(doc);
                        }
                      }}
                      key={i}
                    >
                      <Text style={styles.text}>{doc}</Text>
                    </TouchableOpacity>
                  ))}
                  {Array.isArray(DATA) &&DATA.length==0 &&(
                    <Text style={{
                      margin:10,
                      fontSize:15,
                      fontFamily: "Poppins-Light",
                    }}>{message?message:'Something went wrong'}</Text>
                  )}
              </ScrollView>
            </Animated.View>
          </View>
        </OutsideView>
      </Modal>
    </View>
  );
};

export default DropDown;