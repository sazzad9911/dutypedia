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
import { primaryColor, backgroundColor } from "./../../assets/colors";
import Input from "./../../components/Input";
import TextArea from "./../../components/TextArea";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";
import Button from "./../../components/Button";

const Service = ({ navigation }) => {
  const [CenterName, setCenterName] = React.useState();
  const [CenterNameError, setCenterNameError] = React.useState();
  const [Speciality, setSpeciality] = React.useState();
  const [SpecialityError, setSpecialityError] = React.useState();
  const [Description, setDescription] = React.useState();
  const [DescriptionError, setDescriptionError] = React.useState();
  const [About, setAbout] = React.useState();
  const [AboutError, setAboutError] = React.useState();
  const [FirstImage, setFirstImage] = React.useState();
  const [SecondImage, setSecondImage] = React.useState();
  const [ThirdImage, setThirdImage] = React.useState();
  const [ForthImage, setForthImage] = React.useState();
  const [ImageError, setImageError] = React.useState();

  const checkValidity = () => {
    setCenterNameError(null);
    setSpecialityError(null);
    setDescriptionError(null);
    setAboutError(null);
    setImageError(null)

    if (!CenterName) {
      setCenterNameError("This field is required");
      return;
    }
    if (!Speciality) {
      setSpecialityError("This field is required");
      return;
    }
    if (!Description) {
      setDescriptionError("This field is required");
      return;
    }
    if (!About) {
      setAboutError("This field is required");
      return;
    }
    if (!FirstImage && !SecondImage && !ThirdImage && !ForthImage) {
      setImageError("*Minimum one picture is required");
      return;
    }
    navigation.navigate("Address");
  };
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
          error={CenterNameError}
          onChange={(val) => {
            setCenterName(val);
          }}
          style={{
            marginHorizontal: 0,
            borderWidth: 1,
          }}
          placeholder="Service center name"
        />
        <Input
          error={SpecialityError}
          onChange={(val) => {
            setSpeciality(val);
          }}
          style={{
            marginHorizontal: 0,
            borderWidth: 1,
          }}
          placeholder="Speciality"
        />
        <TextArea
          error={DescriptionError}
          onChange={(val) => {
            setDescription(val);
          }}
          placeholder="Service Description"
        />
        <TextArea
          error={AboutError}
          onChange={(val) => {
            setAbout(val);
          }}
          placeholder="About Company"
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <ImageButton onChange={value =>{
            setFirstImage(value);
          }} style={{ marginLeft: 5 }} />
          <ImageButton onChange={value =>{
            setSecondImage(value);
          }} style={{ marginLeft: 10 }} />
          <ImageButton onChange={value =>{
            setThirdImage(value);
          }} style={{ marginLeft: 10 }} />
          <ImageButton onChange={value =>{
            setForthImage(value);
          }} style={{ marginLeft: 10 }} />
        </View>
        {ImageError && (
          <Text
            style={{
              marginLeft: 2,
              fontSize: 12,
              fontFamily: "Poppins-Light",
              color: "red",
            }}
          >
            {ImageError}
          </Text>
        )}
        <Button
          onPress={() => {
            checkValidity();
          }}
          style={{
            marginTop: 10,
            backgroundColor: backgroundColor,
            color: "white",
            borderWidth: 0,
            borderRadius: 5,
            height: 45,
            marginBottom: 30,
          }}
          title="Continue"
        />
      </View>
    </ScrollView>
  );
};

export default Service;

const ImageButton = ({ style,onChange }) => {
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
      if(onChange){
        onChange(result)
      }
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
      <View
        style={{
          marginLeft: 7,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setImage(null);
          }}
          style={{
            position: "absolute",
            right: -5,
            top: -5,
            zIndex: 1,
            backgroundColor: "white",
            borderRadius: 20,
            height: 24,
            width: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EvilIcons name="close-o" size={24} color="red" />
        </TouchableOpacity>
        <Image style={styles.view} source={{ uri: image }} />
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        pickImage();
      }}
      style={[styles.view, style]}
    >
      <AntDesign name="plus" size={24} color="#707070" />
    </TouchableOpacity>
  );
};
