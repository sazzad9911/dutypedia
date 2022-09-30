import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import {
  primaryColor,
  textColor,
  backgroundColor,
  assentColor,
} from "../../assets/colors";
import TopTabBar from "./../Seller/components/TopTabBar";
import BackHeader from "./../../components/BackHeader";
import Input from "./../../components/Input";
import { AntDesign, FontAwesome, EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "./../../components/DropDown";
import Animated, {StretchInY } from "react-native-reanimated";
import Button from "./../../components/Button";
import TextArea from "./../../components/TextArea";
import {DivisionList} from '../../Data/division';
import {DistrictList} from '../../Data/district';
import {AreaList} from '../../Data/area'

const Member = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 35, backgroundColor: primaryColor }} />
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      >
        <Tab.Screen name="Dutypedia User" component={DutyPediaUser} />
        <Tab.Screen name="Offline User" component={OfflineUser} />
      </Tab.Navigator>
    </View>
  );
};

export default Member;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    flex: 1,
    textAlign: "center",
    color: "white",
    marginVertical: 10,
  },
  container: {
    minHeight: 30,
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
    fontFamily: "Poppins-SemiBold",
  },
  image: {
    width: 89,
    height: 89,
    borderRadius: 5,
  },
  starIcon: {
    marginRight: 3,
  },
  cameraIcon: {
    position: "absolute",
    top: 0,
    right: -5,
    backgroundColor: "white",
    borderRadius: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#707070",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    color: "white",
    backgroundColor: backgroundColor,
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
  },
  inactiveButton: {
    color: textColor,
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
  },
  backgroundContainer: {
    minHeight: 200,
  },
});

const DutyPediaUser = (props) => {
  return (
    <View>
      <Input
        style={{
          borderWidth: 1,
          marginVertical: 10,
          marginTop: 20,
        }}
        placeholder="search"
      />
      <TouchableOpacity
        onPress={() => {
          //   navigation.navigate("AddNotice", {
          //     onChange: onChange,
          //     value: null,
          //   });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins-Medium",
            }}
          >
            Add Notice
          </Text>

          <AntDesign name="pluscircleo" size={24} color={backgroundColor} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          alignItems: "center",
          marginVertical: 10,
          backgroundColor: backgroundColor,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.text}>S/N</Text>
        <Text style={styles.text}>Member</Text>
      </View>
    </View>
  );
};
const OfflineUser = (props) => {
  const navigation = props.navigation;
  return (
    <View>
      <Input
        style={{
          borderWidth: 1,
          marginVertical: 10,
          marginTop: 20,
        }}
        placeholder="search"
      />
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("AddNotice", {
          //   onChange: onChange,
          //   value: null,
          // });
          navigation.navigate("AddOfflineUser");
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins-Medium",
            }}
          >
            Add Notice
          </Text>

          <AntDesign name="pluscircleo" size={24} color={backgroundColor} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          alignItems: "center",
          marginVertical: 10,
          backgroundColor: backgroundColor,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.text}>S/N</Text>
        <Text style={styles.text}>Member</Text>
      </View>
    </View>
  );
};
export const AddOfflineUser = () => {
  const [backgroundImage, setBackgroundImage] = React.useState();
  const [image, setImage] = React.useState();
  const [Visible, setVisible] = React.useState(false);
  const [Name, setName]=React.useState()
  const [Gender, setGender]= React.useState()
  const [Phone, setPhone] = React.useState();
  const [Division, setDivision]= React.useState();
  const [District, setDistrict]= React.useState();
  const [Area, setArea]= React.useState();
  const [Address, setAddress]= React.useState();
  const [NewDistrictList, setDistrictList] = React.useState([]);
  const [NewAreaList, setAreaList] = React.useState([]);

  const searchDistrict = (value) => {
    if (value) {
      let arr = DistrictList.filter((d) => d.title === value);
      setDistrictList(arr[0].data);
    } else {
      setDistrictList([]);
    }
  };
  const searchArea = (value) => {
    if (value) {
      let arr = AreaList.filter((d) => d.title === value);
      setAreaList(arr[0].data);
    } else {
      setAreaList([]);
    }
  };

  return (
    <ScrollView>
      <View>
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
          <View
            style={[
              styles.cameraIcon,
              {
                top: -5,
              },
            ]}
          >
            <EvilIcons
              onPress={() => {
                pickImage().then((result) => {
                  if (result) {
                    setImage(result.uri);
                  }
                });
              }}
              name="camera"
              size={24}
              color={backgroundColor}
            />
          </View>
        </View>
        <View
          style={[
            styles.cameraIcon,
            {
              top: 40,
              right: 10,
              height: 30,
              width: 30,
            },
          ]}
        >
          <EvilIcons
            onPress={() => {
              pickImage().then((result) => {
                if (result) {
                  setBackgroundImage(result.uri);
                }
              });
            }}
            name="camera"
            size={30}
            color={backgroundColor}
          />
        </View>
      </View>
      <Text style={{
        fontSize:16,
        fontFamily: "Poppins-Medium",
        color:textColor,
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
      }}>Member Information</Text>
      <Input value={Name} onChange={val=>{
        setName(val);
      }} style={offlineStyles.input} placeholder="Member Name" />
      <DropDown onChange={val=>{
        setGender(val)
      }} DATA={['Male','Female','Other']} style={offlineStyles.dropdown} placeholder="Gender" />
      <Input value={Phone} onChange={val=>{
        setPhone(val)
      }} style={offlineStyles.input} placeholder="Phone Number" />
      <Button onPress={() =>{
        setVisible(!Visible)
      }}
        style={{
          color: textColor,
          marginVertical: 10,
          marginHorizontal: 20,
          borderRadius: 5,
        }}
        title={Visible?"Less":"More"}
      />
      {Visible && (
        <Animated.View entering={StretchInY}>
          <DropDown DATA={DivisionList} onChange={val=>{
            searchDistrict(val)
          }} style={offlineStyles.dropdown} placeholder="Division" />
          <DropDown onChange={val=>{
            searchArea(val)
          }} DATA={NewDistrictList} style={offlineStyles.dropdown} placeholder="District" />
          <DropDown DATA={NewAreaList} style={offlineStyles.dropdown} placeholder="Area" />
          <TextArea style={offlineStyles.dropdown} placeholder="Your Address" />
        </Animated.View>
      )}
      <Button disabled={Name&&Gender&&Phone?false:true} style={{
        backgroundColor:Name&&Gender&&Phone?backgroundColor:'#707070',
        height:45,
        borderRadius:5,
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth:0
      }} title="Add Member" />
    </ScrollView>
  );
};
const offlineStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  dropdown: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  button: {},
});
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    return result;
  }
  return null;
};
