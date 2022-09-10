import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";
//import { services } from "../../assets/icon";
//import Services from '../../assets/Images/Services.svg'
import Screenshot from "../../assets/Images/Screenshot.png";
import { primaryColor,backgroundColor } from "./../../assets/colors";
import Input from "./../../components/Input";
import TextArea from "./../../components/TextArea";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";
import Button from './../../components/Button';

const Service = ({navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: primaryColor,
          paddingHorizontal: 20,
        }}
      >
        <Image
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
          }}
          source={Screenshot}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins-Medium",
            marginVertical: 20,
            color: "#707070",
          }}
        >
          Describe your services
        </Text>
        <Input
          style={{
            marginHorizontal: 0,
            borderWidth: 1,
          }}
          placeholder="Service center name"
        />
        <Input
          style={{
            marginHorizontal: 0,
            borderWidth: 1,
          }}
          placeholder="Speciality"
        />
        <TextArea placeholder="Service Description" />
        <TextArea placeholder="About Company" />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5
          }}
        >
          <ImageButton style={{ marginLeft: 5 }} />
          <ImageButton style={{ marginLeft: 10 }} />
          <ImageButton style={{ marginLeft: 10 }} />
          <ImageButton style={{ marginLeft: 10 }} />
        </View>
        <Button onPress={() =>{
            navigation.navigate('Address')
        }} style={{
            marginTop:10,
            backgroundColor:backgroundColor,
            color:'white',
            borderWidth:0,
            borderRadius:5,
            height:45,
            marginBottom:30
        }} title='Continue'/>
      </View>
    </ScrollView>
  );
};

export default Service;

const ImageButton = ({ style }) => {
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const styles = StyleSheet.create({
    view: {
      width: width / 4 - 20,
      height: width / 4 - 20,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
      borderColor: "#e5e5e5",
    },
  });
  if (image) {
    return (
      <View style={{
        marginLeft:7
      }}>
        <TouchableOpacity onPress={() =>{
            setImage(null);
        }} style={{
            position: "absolute",
            right: -5,
            top:-5,
            zIndex:1,
            backgroundColor:'white',
            borderRadius: 20,
            height:24,
            width:24,
            justifyContent: "center",
            alignItems: "center"
        }} >
        <EvilIcons name="close-o" size={24} color="red" />
        </TouchableOpacity>
        <Image style={styles.view} source={{ uri: image }} />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={() =>{
        pickImage()
    }} style={[styles.view, style]}>
      <AntDesign name="plus" size={24} color="#707070" />
    </TouchableOpacity>
  );
};
