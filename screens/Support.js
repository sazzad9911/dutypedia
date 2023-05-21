import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { primaryColor, textColor } from "./../assets/colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import IconButton from "../components/IconButton";
import { createReport } from "../Class/service";
import { useSelector } from "react-redux";
import customStyle from "../assets/stylesheet";
import ActivityLoader from "../components/ActivityLoader";

const Support = ({ navigation,route}) => {
  const ref = React.useRef();
  const [Images, setImages] = React.useState([]);
  const [Visible, setVisible] = React.useState(false);
  const [subject,setSubject]=useState()
  const [description,setDescription]=useState()
  const [loader,setLoader]=useState(false)
  const [subjectError,setSubjectError]=useState()
  const [descriptionError,setDescriptionError]=useState()
  const user=useSelector(state=>state.user)
  const serviceId=route?.params?.serviceId;

  const send=()=>{
    setSubjectError()
    if(!subject){
      setSubjectError("Subject is required")
      return
    }
    if(!user){
      navigation.navigate("LogIn")
      return
    }
    if(!serviceId){
      Alert.alert("Ops!","Invalid seller profile")
      return
    }
    setLoader(true)
    createReport(user.token,subject,description,serviceId)
    .then(res=>{
      setLoader(false)
      setVisible(true);
      setSubject()
      setDescription()
    }).catch(err=>{
      setLoader(false)
      Alert.alert(err.response.data.msg)
    })
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setImages((val) => [...val, result]);
    }
  };
  const pickFromCamera = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync(
      Permissions.CAMERA
    );
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        setImages((val) => [...val, data]);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };
  const removeFromArray = (data) => {
    let arr = Images.filter((img) => img.uri != data.uri);
    setImages(arr);
  };
  React.useEffect(() => {
    
  },[])
  if(loader){
    return(
      <View style={customStyle.fullBox}>
        <ActivityLoader/>
      </View>
    )
  }
  return (
    <ScrollView>
      <View
        style={{
          marginHorizontal: 30,
          marginVertical: 10,
          padding: 10,
          backgroundColor: "#F1F3FF",
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#061365",
            fontFamily:'Poppins-Medium'
          }}
        >
          Do not share sensitive information (attachments or text). ex. Your
          credit card details or personal ID number
        </Text>
      </View>
      <Text style={{ fontSize: 16, 
      marginLeft: 30,
       marginTop: 10,
       fontFamily: 'Poppins-Medium'}}>
        Subject
      </Text>
      <TextInput value={subject} onChangeText={setSubject}
        style={{
          borderWidth: 1,
          borderColor: "#e5e5e0",
          borderRadius: 5,
          height: 45,
          marginHorizontal: 30,
          marginVertical: 10,
          backgroundColor: primaryColor,
          padding: 10,
          fontFamily:'Poppins-Medium'
        }}
      />
      {subjectError&&(
        <Text style={{
          color:"red",
          marginVertical:2,
          marginHorizontal: 30,
        }}>{subjectError}</Text>
      )}
      <Text style={{ fontSize: 16,
       marginLeft: 30,
        marginTop: 10,
        fontFamily: 'Poppins-Medium'}}>
        Description
      </Text>
      <TouchableOpacity
        onPress={() => {
          ref.current.focus();
        }}
        style={{
          borderWidth: 1,
          borderColor: "#e5e5e5",
          borderRadius: 5,
          marginHorizontal: 30,
          marginVertical: 10,
          backgroundColor: primaryColor,
          padding: 10,
          height: 160,
        }}
      >
        <TextInput value={description} onChangeText={setDescription}
          ref={ref}
          style={{ width: "100%", fontSize: 14,fontFamily:'Poppins-Medium' }}
          multiline={true}
          placeholder="By Describing the most important
      facts, we can quickly resolve your request."
        />
      </TouchableOpacity>
      {/* <View
        style={{
          marginHorizontal: 30,
        }}
      >
        {Images ? (
          Images.map((doc, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                marginVertical: 10,
                flex: 1,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: 'Poppins-Medium'
                }}
              >
                {i + 1} .{" "}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  flex: 10,
                  marginLeft: 3,
                  fontFamily: 'Poppins-Medium'
                }}
              >
                {doc.uri.split(/[\\\/]/).pop()}
              </Text>
              <TouchableOpacity onPress={()=>{
                navigation.navigate('ImageViewer',{
                  uri:doc.uri
                })
              }}>
                <Text
                  style={{
                    flex: 2,
                    textDecorationLine: "underline",
                    marginLeft: 10,
                    marginRight:10,
                    fontFamily: 'Poppins-Medium'
                  }}
                >
                  View
                </Text>
              </TouchableOpacity>
              <MaterialIcons
                onPress={() => removeFromArray(doc)}
                style={{
                  flex: 1,
                }}
                name="delete"
                size={24}
                color="black"
              />
            </View>
          ))
        ) : (
          <></>
        )}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
          }}
        >
          <Ionicons
            onPress={() => {
              pickImage();
            }}
            name="ios-image-sharp"
            size={24}
            color={textColor}
          />
          <Ionicons
            onPress={() => {
              pickFromCamera();
            }}
            name="ios-camera"
            size={24}
            color={textColor}
          />
        </View>
        <Text
          style={{
            marginTop: -10,
            color: textColor,
          }}
        >
          ......................................
        </Text>
      </View> */}
      <IconButton
        onPress={() => {
          send()
        }}
        style={{
          marginHorizontal: 30,
          borderRadius: 5,
          height: 45,
          backgroundColor: "#03D303",
          color: "white",
          marginTop:30
        }}
        title={route.name=='Support_1'?"Send Report":"Send Request"}
      />
      <IconButton onPress={() =>{
        navigation.goBack()
      }}
        style={{
          marginHorizontal: 30,
          marginVertical: 10,
          borderWidth: 0,
        }}
        title="Back"
      />
      <Modal
        transparent={true}
        animationType="fade"
        visible={Visible}
        onRequestClose={() => setVisible(!Visible)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.141)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AlertDesign visible={setVisible} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Support;
const AlertDesign = ({ visible }) => {
  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: primaryColor,
        marginHorizontal: 30,
      }}
    >
      <Text
        style={{
          color: "red",
          fontSize: 16,
          margin: 30,
          
          fontFamily: 'Poppins-Medium'
          
        }}
      >
        Your request has been successfully sent our team will contact with you
        in 3 business day.
      </Text>
      <IconButton
        onPress={() => visible(false)}
        style={{
          width: 100,
          height: 40,
          borderRadius: 5,
          backgroundColor: "#03D303",
          alignSelf: "flex-end",
          borderWidth: 0,
          marginRight: 30,
          marginBottom: 20,
          color: "white",
        }}
        title="Done"
      />
    </View>
  );
};
