import { useIsFocused } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Alert,
  SafeAreaView,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../components/IconButton";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { fileFromURL, localTimeToServerDate } from "../../../action";
import { uploadFile } from "../../../Class/upload";
import {
  submitVerificationCompany,
  submitVerificationIndividual,
} from "../../../Class/service";
import customStyle from "../../../assets/stylesheet";
import ActivityLoader from "../../../components/ActivityLoader";

export default function ThirdStepVerification({ navigation, route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const data = route?.params?.data;
  const [identity, setIdentity] = useState([""]);
  const [address, setAddress] = useState([""]);
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const vendor = useSelector((state) => state.vendor);
  //console.log(data)
  React.useEffect(() => {
    if (isFocused) {
      // dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      // dispatch(setHideBottomBar(true));
    }, 50);
  }, [isFocused]);
  //console.log(vendor.service.id)
  const scrollRef = useRef();
  const confirm = async () => {
    if (!identity[0]) {
      scrollRef?.current.scrollTo({ y: 0 });
      return;
    }
    if (!address[0]) {
      return;
    }
    setLoader(true);
    const identityFiles = [];
    const addressFiles = [];
    identity.map((doc) => {
      identityFiles.push(fileFromURL(doc));
    });
    address.map((doc) => {
      addressFiles.push(fileFromURL(doc));
    });

    const identityUrls = await uploadFile(identityFiles, user.token);

    if (!identityUrls) {
      setLoader(false);
      Alert.alert("Ops!", "Failed to upload files");
      return;
    }
    const addressUrls = await uploadFile(addressFiles, user.token);
    if (!addressUrls) {
      setLoader(false);
      Alert.alert("Ops!", "Failed to upload files");
      return;
    }
    if (data?.type == "Company") {
      submitVerificationCompany(user.token, {
        serviceId: vendor.service.id,
        companyName: data.name,
        establishedDate: localTimeToServerDate(data.date),
        companyDivision: data.permanentAddress.division,
        companyDistrict: data.permanentAddress.district,
        companyThana: data.permanentAddress.upazila,
        companyPostalCode: data.permanentAddress.postalCode,
        companyAddress: data.permanentAddress.fullAddress,
        identityFiles: identityUrls,
        addressFiles: addressUrls,
      })
        .then((res) => {
          setLoader(false);
          navigation.navigate("ConfirmationScreen");
        })
        .catch((err) => {
          setLoader(false);
          console.log(err.response.data.msg);
          Alert.alert("Ops!", err.response.data.msg);
        });
    } else {
      submitVerificationIndividual(user.token, {
        serviceId: vendor.service.id,
        firstName: data.name.split(" ")[0],
        lastName: data.name.split(" ")[1]?data.name.split(" ")[1]:data.name.split(" ")[0],
        name:data.name,
        dob: localTimeToServerDate(data.date),
        gender: data.gender,
        presentDivision: data.presentAddress.division,
        presentDistrict: data.presentAddress.district,
        presentThana: data.presentAddress.upazila,
        presentPostalCode: data.presentAddress.postalCode,
        presentAddress: data.presentAddress.fullAddress,

        permanentDivision: data.permanentAddress.division,
        permanentDistrict: data.permanentAddress.district,
        permanentThana: data.permanentAddress.upazila,
        permanentPostalCode: data.permanentAddress.postalCode,
        permanentAddress: data.permanentAddress.fullAddress,
        identityFiles: identityUrls,
        addressFiles: addressUrls,
      })
        .then((res) => {
          setLoader(false);
          navigation.navigate("ConfirmationScreen");
        })
        .catch((err) => {
          setLoader(false);
          Alert.alert("Ops!", err.response.data.msg);
        });
    }
  };
  if (loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
     
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 28,
            marginVertical: 32,
          }}>
          <Text style={styles.headLine}>Identity Verification*</Text>
          <Text style={[styles.text, { marginTop: 28 }]}>
            Upload{" "}
            <Text style={{ color: "#7566FF" }}>
              {data?.type == "Company"
                ? "Trade license/ company Tax certificate"
                : "Birth certificate/ Passport/NID/Driving License"}
            </Text>
          </Text>
          <Text style={[styles.text, { color: "#EC2700", marginTop: 20 }]}>
            At least one document is required
          </Text>
          {identity.map((doc, i) => (
            <ExtButton
              file={doc}
              onChange={(e) => {
                let arr = identity;
                arr[i] = e;
                setIdentity(arr);
              }}
              onClose={() => {
                setIdentity((d) => d.filter((d, j) => j != i));
              }}
              key={i}
              index={i}
            />
          ))}

          <Text style={[styles.exSmall, { marginTop: 12 }]}>
            Per file size limit (Maximum 2 MB)
          </Text>
          {identity.length < 3 && (
            <Pressable
              onPress={() => {
                setIdentity((d) => [...d, ""]);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}>
              <SvgXml xml={plus} />
              <Text style={[styles.small, { marginLeft: 8 }]}>
                Add more file
              </Text>
            </Pressable>
          )}
          <View style={styles.step} />
          <Text style={[styles.headLine]}>Address verification</Text>
          {data?.type == "Company" ? (
            <Text style={[styles.text, { marginTop: 28 }]}>
              Please upload{" "}
              <Text style={{ fontWeight: "500" }}>
                your company's bank statement or any utility bill, such as a gas
                bill, water bill, or current bill, for address verification.
              </Text>
            </Text>
          ) : (
            <Text style={[styles.text, { marginTop: 28 }]}>
              Upload{" "}
              <Text style={{ color: "#7566FF" }}>
                Bank statement or any utility bill like Gas bill/Water bill/
                Current bill
              </Text>
            </Text>
          )}

          <Text style={[styles.text, { color: "#EC2700" }]}>
            *note{" "}
            <Text style={{ color: "#000000" }}>
              (Document address and input address must be match)
            </Text>
          </Text>
          <Text style={[styles.text, { color: "#EC2700", marginTop: 20 }]}>
            At least one document is required
          </Text>
          {address.map((doc, i) => (
            <ExtButton
              file={doc}
              onChange={(e) => {
                let arr = address;
                arr[i] = e;
                setAddress(arr);
              }}
              onClose={() => {
                setAddress((d) => d.filter((d, j) => j != i));
              }}
              key={i}
              index={i}
            />
          ))}
          <Text style={[styles.exSmall, { marginTop: 12 }]}>
            Per file size limit (Maximum 2 MB)
          </Text>
          {address.length < 3 && (
            <Pressable
              onPress={() => {
                setAddress((d) => [...d, ""]);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}>
              <SvgXml xml={plus} />
              <Text style={[styles.small, { marginLeft: 8 }]}>
                Add more file
              </Text>
            </Pressable>
          )}
          <IconButton
            onPress={() => {
              confirm();
            }}
            style={styles.button}
            title={"confirm"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const plus = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" rx="10" fill="#4CD964"/>
<path d="M10 4V16M16 10H4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const styles = StyleSheet.create({
  step: {
    backgroundColor: "#E6E6E6",
    marginVertical: 32,
    height: 1,
  },
  headLine: {
    fontSize: 20,
    fontWeight: "400",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    
  },
  small: {
    fontSize: 14,
    fontWeight: "400",
  },
  exSmall: {
    fontSize: 12,
    fontWeight: "400",
  },
  smButton: {
    borderColor: "#484848",
    height: 32,
    width: 112,
  },
  button: {
    height: 44,
    backgroundColor: "#4ADE80",
    marginTop: 32,
    color: "white",
  },
});
const ExtButton = ({ onClose, file, onChange, index }) => {
  const [image, setImage] = useState();
  //const uri=file?.uri?.split("/")
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri.split("/"));
      onChange(result.assets[0]);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        justifyContent: "space-between",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}>
        <IconButton
          onPress={pickImage}
          style={[styles.smButton]}
          title={"Choose file"}
        />
        <Text
          numberOfLines={1}
          style={[styles.small, { marginLeft: 12, flex: 1 }]}>
          {image ? image[image.length - 1] : "No file chosen"}
        </Text>
      </View>
      {index != 0 && (
        <Entypo onPress={onClose} name="cross" size={24} color="black" />
      )}
    </View>
  );
};
