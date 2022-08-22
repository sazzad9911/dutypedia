import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  backgroundColor,
  assentColor,
  secondaryColor,
} from "./../assets/colors";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProfileOption from "./../components/ProfileOption";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");
const OtherProfile = () => {
  const window = Dimensions.get("window");
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);

  return (
    <ScrollView>
      <View style={styles.container}>
        {backgroundImage ? (
          <Image
            source={{ uri: backgroundImage }}
            style={styles.backgroundContainer}
          />
        ) : (
          <LinearGradient
            style={styles.backgroundContainer}
            colors={["#983C85", "#983C85", "#983C53"]}
          ></LinearGradient>
        )}

        <View style={styles.profile}>
          {image ? (
            <Image style={styles.image} source={{ uri: image }} />
          ) : (
            <FontAwesome name="user" size={80} color="#983C85" />
          )}
        </View>
        <View style={{
            paddingHorizontal:50,
            paddingVertical:5
        }}>
          <Text style={styles.headLine}>Easin Arafat It Consulting Center</Text>
          <Text style={{
            marginTop:10,
            fontSize:17
          }}>Easin Arafat (Male)</Text>
          <Text style={{
            fontSize:14
          }}>Position of Ceo</Text>
        </View>
      </View>
      <ProfileOption
        Icon={() => (
          <AntDesign name="calendar" size={24} color={secondaryColor} />
        )}
        title="Company Calender"
      />
      <ProfileOption
        Icon={() => (
          <AntDesign
            name="exclamationcircleo"
            size={24}
            color={secondaryColor}
          />
        )}
        title="About"
      />
    </ScrollView>
  );
};

export default OtherProfile;
const styles = StyleSheet.create({
  backgroundContainer: {
    minHeight: 200,
  },
  container: {
    minHeight: 415,
    backgroundColor: primaryColor,
  },
  profile: {
    borderWidth: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: backgroundColor,
    width: 90,
    height: 90,
    marginTop: -45,
    alignSelf: "center",
    backgroundColor: primaryColor,
    borderColor: backgroundColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: assentColor,
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5,
    shadowColor: backgroundColor,
    elevation: 5,
    shadowOpacity: 0.1,
  },
  iconTop: {
    position: "absolute",
    right: 20,
    top: 50,
    zIndex: 4,
  },
  iconBottom: {
    position: "absolute",
    zIndex: 4,
    bottom: -10,
    right: -10,
  },
  headLine: {
    fontSize: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
  },
  image: {
    width: 80,
    height: 80,
  },
});
