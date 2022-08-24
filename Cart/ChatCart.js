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
    marginVertical: 3,
    width: width - 40,
    minHeight: 50,
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 20,
  },
  box: {
    flex: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  head: {
    fontSize: 17,
    fontWeight: "700",
  },
  text: {
    fontSize: 15,
    fontWeight: "100",
    color:textColor
  },
  date: {
    fontSize: 10,
    textAlign: "right",
    color:textColor
  },
  active: {
    backgroundColor: "green",
    height: 10,
    width: 10,
    borderRadius: 5,
    position: "absolute",
    top: 55,
    left: 50,
    borderWidth: 1,
    borderColor: "white",
  },
});
