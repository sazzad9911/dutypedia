import React from "react";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect,useRef } from "react";
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen({onTakePhoto}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);
  const cameraRef=useRef()

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status);
    })();
  }, []);

  if (permission == null) {
    return <View />;
  }
  if (permission == false) {
    return <Text>Need permission to access camera</Text>;
  }
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const takePhoto=async()=>{
    if(cameraRef){
      try{
        const photo= await cameraRef.current.takePictureAsync({
          accept:[4,3],
          quality:.1
        })
        if(onTakePhoto){
          onTakePhoto(photo)
        }
        //console.log(photo)
        return photo
      }catch(err){
        console.warn(err.message)
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <MaterialIcons name="camera" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    bottom: 0,
    position: "absolute",
    width: width,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent:"space-between",
    backgroundColor:"rgba(0, 0, 0, 0.427)",
    paddingVertical:20
  },
  button: {},
  text: {
    color: "white",
  },
});
