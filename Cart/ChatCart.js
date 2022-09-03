import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { primaryColor,textColor } from "./../assets/colors";
const { width, height } = Dimensions.get("window");

const ChatCart = (props) => {
  const [Active, setActive] = React.useState(props.active);
  const navigation = props.navigation;
  return (
    <TouchableOpacity
      onPress={() => navigation.push("ChatScreen")}
      style={styles.outBox}
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://hindidp.com/wp-content/uploads/2022/02/cute_beautiful_dp_fo_wHC8X.jpg",
        }}
      />
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.head}>Sefa Khandakar</Text>
          <Text style={styles.date}>Jul 21 2:30 Pm</Text>
        </View>
        <Text style={styles.text}>
          While you’re developing your project, of a you’re writing code on your
          computer
        </Text>
      </View>
      {props.active ? <View style={styles.active} /> : <></>}
    </TouchableOpacity>
  );
};

export default ChatCart;
const styles = StyleSheet.create({
  outBox: {
    marginHorizontal: 20,
    marginVertical: 0,
    width: width - 40,
    minHeight: 50,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    
  },
  box: {
    flex: 4,
    borderBottomWidth:1,
    borderBottomColor:'#e5e5e5',
    paddingVertical: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  head: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium'
  },
  text: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color:textColor
  },
  date: {
    fontSize: 10,
    textAlign: "right",
    color:textColor,
    fontFamily: 'Poppins-Light'
  },
  active: {
    backgroundColor: "green",
    height: 10,
    width: 10,
    borderRadius: 5,
    position: "absolute",
    top: 55,
    left: 48,
    borderWidth: 1,
    borderColor: "white",
  },
});
