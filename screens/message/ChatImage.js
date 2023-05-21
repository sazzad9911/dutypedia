import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useDispatch } from "react-redux";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
const { width, height } = Dimensions.get("window");
import * as FileSystem from "expo-file-system";
import ActivityLoader from "../../components/ActivityLoader";
const { StorageAccessFramework } = FileSystem;
const downloadPath =
  FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");

export default function ChatImage({ navigation, route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [downloadProgress, setDownloadProgress] = React.useState();
  const inset = useSafeAreaInsets();
  const uri = route?.params?.uri;
  let arr = uri.split("/");
  let newArr = arr[arr.length - 1]?.split(".");
  let type = newArr[newArr.length - 1];
  let three = newArr[0].split("")?.slice(-3)?.join("");
  const [downloaded, setDownloaded] = useState();
  const [loading, setLoading] = useState(false);
  //const ref=route?.params?.ref;
  // React.useEffect(() => {
  //   if (isFocused) {
  //     //console.log("hidden")
  //     ref?.current?.close()
  //     dispatch(setHideBottomBar(true));
  //     setTimeout(() => {
  //       ref?.current?.close()
  //       dispatch(setHideBottomBar(true));
  //     }, 50);
  //   } else {
  //     ref?.current?.close()
  //     //console.log("seen")
  //     dispatch(setHideBottomBar(false));
  //   }
  // }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        paddingTop: inset.top,
      }}>
      <StatusBar style="light" backgroundColor="black" />
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 12,
          marginVertical: 24,
          alignItems: "center",
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgXml xml={back} />
        </Pressable>
        <View
          style={{
            marginLeft: 8,
            alignItems: "center",
            flexDirection: "row",
            flex:1,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: "#ffffff",
              fontSize: 16,

              fontWeight: "400",
              flex:1
            }}>
            {arr[arr.length - 1]}
            
          </Text>
          {/* <Text style={{
              color: "#ffffff",
              fontSize:16,
              lineHeight:18,
              fontWeight:"400"
            }}>
            {three}.{type}
          </Text> */}
        </View>
      </View>
      <Image
        style={{
          width: "100%",
          height: height - 180,
        }}
        source={{ uri: uri }}
      />
      {downloaded ? (
        <Text
          style={{
            fontSize: 16,
            marginVertical: 12,
            color: "white",
            marginHorizontal: 10,
          }}>
          Photo Saved
        </Text>
      ) : (
        <Pressable onPress={()=>{
          setLoading(true)
          downloadFile(uri,arr[arr.length-1]).then(res=>{
            setDownloaded(res)
            setLoading(false)
          }).catch(err=>{
            setLoading(false)
            console.log(err.message)
          })
        }} disabled={loading}
          style={{
            marginTop: 24,
          }}>
          {loading?(<ActivityLoader/>):(<SvgXml xml={download} />)}
        </Pressable>
      )}
    </View>
  );
}
const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const download = `<svg width="57" height="33" viewBox="0 0 57 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.5 11.6875V19.9375M28.5 30.25C36.0941 30.25 42.25 24.0941 42.25 16.5C42.25 8.90588 36.0941 2.75 28.5 2.75C20.9059 2.75 14.75 8.90588 14.75 16.5C14.75 24.0941 20.9059 30.25 28.5 30.25Z" stroke="#D1D1D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.375 17.1875L28.5 21.3125L32.625 17.1875" stroke="#D1D1D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const downloadFile = async (fileUrl, name) => {
  const downloadResumable = FileSystem.createDownloadResumable(
    fileUrl,
    FileSystem.documentDirectory + name,
    {},
  );
  const { uri } = await downloadResumable.downloadAsync();
  console.log(uri)
  return uri;
  try {
    console.log("Finished downloading to ", uri);
  } catch (e) {
    console.error(e);
  }
};
