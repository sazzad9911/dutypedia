
import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { primaryColor, backgroundColor } from "./../assets/colors";


const { width, height } = Dimensions.get("window");
const Profile = () => {
  const window = Dimensions.get("window");
  return (
    <ScrollView>
      <View style={styles.container}>
        <LinearGradient
          style={styles.backgroundContainer}
          colors={["#983C85", "#983C85", "#983C53"]}
        ></LinearGradient>
        <View style={styles.profile}>

        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  backgroundContainer: {
    minHeight: 200,
    
  },
  container: {
    minHeight: 330,
    backgroundColor: primaryColor,
  },
  profile: {
    borderWidth: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: backgroundColor,
    width: 80,
    height: 80,
    marginTop:-40,
    alignSelf:'center',
    backgroundColor:primaryColor
  },
});
