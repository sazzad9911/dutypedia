import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  Alert,
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
import { useSelector, useDispatch } from "react-redux";
import { CheckBox } from "./Pricing";
import {
  createOtherService,
  createOtherServiceIndividual,
} from "../../Class/service";
import { fileFromURL } from "../../action";
import { uploadFile } from "../../Class/upload";
import IconButton from "../../components/IconButton";
import editt from "../../assets/editt.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityLoader from "../../components/ActivityLoader";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import { convertServerFacilities } from "../../Class/dataConverter";

const Service = ({ navigation, route }) => {
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
  const businessForm = useSelector((state) => state.businessForm);
  const [Price, setPrice] = React.useState();
  const [PriceError, setPriceError] = React.useState();
  const facilities=route?.params?.facilities
  const [Facilities, setFacilities] = React.useState([]);
  const [FacilitiesError, setFacilitiesError] = React.useState();
  const [FacilitiesCounter, setFacilitiesCounter] = React.useState(0);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const listData = useSelector((state) => state.listData);
  //referencial permissions
  const nameRef = React.useRef();
  const specialityRef = React.useRef();
  const descriptionRef = React.useRef();
  const aboutRef = React.useRef();
  const dispatch = useDispatch();
  const priceRef = React.useRef();
  //route params are
  const direct =
    route.params && route.params.direct ? route.params.direct : false;
  const [change, setChange] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const [ModalVisible, setModalVisible] = React.useState(false);
  const params = route.params;
  const type = params?.type;
  const subsData = params?.subsData;
  const installmentData=params?.installmentData;
  const isFocused=useIsFocused()
  

  React.useEffect(() => {
    if (isFocused) {
      
      try{
        const gigs = vendor.service.gigs.filter(
          (d) => d.type == "STARTING"
        );
        setFacilities(convertServerFacilities(gigs[0].facilites))
      }catch(err){
        console.error(err.message)
      }
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);
  

  React.useEffect(() => {
    setFacilitiesCounter(0);
    Facilities.forEach((doc, i) => {
      if (doc.checked) {
        setFacilitiesCounter((d) => d + 1);
      }
    });
  }, [Facilities.length + change]);
  React.useEffect(() => {
    if (businessForm && businessForm.serviceTitle) {
      setCenterName(businessForm.serviceTitle);
    }
    if (businessForm && businessForm.speciality) {
      setSpeciality(businessForm.speciality);
    }
    if (businessForm && businessForm.description) {
      setDescription(businessForm.description);
    }
    if (businessForm && businessForm.about) {
      setAbout(businessForm.about);
    }
    if (businessForm && businessForm.firstImage) {
      setFirstImage(businessForm.firstImage);
    }
    if (businessForm && businessForm.secondImage) {
      setSecondImage(businessForm.secondImage);
    }
    if (businessForm && businessForm.thirdImage) {
      setThirdImage(businessForm.thirdImage);
    }
    if (businessForm && businessForm.forthImage) {
      setForthImage(businessForm.forthImage);
    }
  }, [businessForm]);

  const checkValidity = async () => {
    setCenterNameError(null);
    setSpecialityError(null);
    setDescriptionError(null);
    setAboutError(null);
    setImageError(null);

    if (!CenterName) {
      setCenterNameError("This field is required");
      return;
    }
    if (!Speciality && !direct) {
      setSpecialityError("This field is required");
      return;
    }
    if (!Description) {
      setDescriptionError("This field is required");
      return;
    }
    if (!About && !direct) {
      setAboutError("This field is required");
      return;
    }
    if (!FirstImage || !SecondImage || !ThirdImage || !ForthImage) {
      setImageError("*All picture must be upload");
      return;
    }
    if (!Price && direct && type != "SUBS" && type!="INSTALLMENT") {
      setPriceError("Price field is required");
      return;
    }
    if (FacilitiesCounter == 0 && direct && type != "SUBS") {
      setFacilitiesError("Please select any facilities");
      return;
    }
    dispatch({ type: "SERVICE_TITLE", playload: CenterName });
    dispatch({ type: "SPECIALITY", playload: Speciality });
    dispatch({ type: "DESCRIPTION", playload: Description });
    dispatch({ type: "ABOUT", playload: About });
    dispatch({ type: "FIRST_IMAGE", playload: FirstImage });
    dispatch({ type: "SECOND_IMAGE", playload: SecondImage });
    dispatch({ type: "THIRD_IMAGE", playload: ThirdImage });
    dispatch({ type: "FOURTH_IMAGE", playload: ForthImage });
    if (direct) {
      dispatch({ type: "PRICE", playload: Price });
      dispatch({ type: "FACILITIES", playload: Facilities });
    }
    
    
    if (direct) {
      //ongoing function-------------
      setLoader(true);
      let blobImages = [];
      blobImages.push(fileFromURL(FirstImage));
      blobImages.push(fileFromURL(SecondImage));
      blobImages.push(fileFromURL(ThirdImage));
      blobImages.push(fileFromURL(ForthImage));
      const result = await uploadFile(blobImages, user.token);
      if (Array.isArray(result)) {
        if (type=="SUBS") {
          if (!subsData) {
            Alert.alert("Invalid Data format");
            return;
          }
          //console.log("ok")
          createOtherServiceIndividual(
            user.token,
            businessForm,
            route.params.data ? route.params.data : listData,
            result,
            vendor.service.id,
            type,
            undefined,
            subsData
          )
            .then((res) => {
              navigation.navigate("VendorProfile", { direct: businessForm });
              setLoader(false);
            })
            .catch((err) => {
              console.warn(err.response);
              setLoader(false);
            });
          return;
        }else if(type=="INSTALLMENT"){
          if (!installmentData) {
            Alert.alert("Invalid Data format");
            return;
          }
          //console.log("ok")
          createOtherServiceIndividual(
            user.token,
            businessForm,
            route.params.data ? route.params.data : listData,
            result,
            vendor.service.id,
            type,
            undefined,
            undefined,
            installmentData,
            0
          )
            .then((res) => {
              navigation.navigate("VendorProfile", { direct: businessForm });
              setLoader(false);
            })
            .catch((err) => {
              console.warn(err.response);
              setLoader(false);
            });
          return
        }
        //console.log("df")
        //console.log(params.data)
        // setLoader(false)
        // return
        createOtherService(
          user.token,
          {
            serviceTitle: CenterName,
            price: parseInt(Price),
            description: Description,
            packageData: undefined,
            facilities:Facilities
          },
          params.data,
          result,
          vendor.service.id,
          "ONETIME"
        )
          .then((res) => {
            //console.log(res.data)
            setLoader(false);
            // if(type=="ONETIME"){
            //   navigation.navigate("VendorFixedService", { data: res.data.gig });
            // }else{
            //   navigation.navigate("VendorPackageService", { data: res.data.gig });
            // }
            navigation.navigate("VendorProfile", { direct: res.data.gig });
            
          })
          .catch((err) => {
            Alert.alert("Ops!","Something went wrong try again")
            console.warn(err.response);
            setLoader(false);
          });

        return
      }
      setLoader(false);
     Alert.alert("Image save failed")
      return;  
    }
    navigation.navigate("Address");
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader/>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: primaryColor,
              paddingHorizontal: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Poppins-Bold",
                    color: "black",
                    
                  }}>
                  Upload{"\n"}Your
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Poppins-Bold",
                    color: "#DA1E37",
                    
                  }}>
                  High <Text style={{color:"black"}}>Quality</Text>
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Poppins-Bold",
                    color: "#6366F1",
                    
                  }}>
                  Photo
                </Text>
              </View>
              <View
                style={{
                  flex: 1.5,
                  alignItems:"flex-end"
                }}>
                {/* <SvgXml xml={vectorImage} height="200" width={"190"}/> */}
                <Image
                  style={{
                    width: width / 2,
                    height: 120,
                  }}
                  source={editt}
                />
              </View>
            </View>
            <View style={{ height: 10 }} />
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
              }}
            >
              <ImageButton
                value={FirstImage}
                onChange={(value) => {
                  setFirstImage(value);
                }}
                style={{ marginLeft: 5 }}
              />
              <ImageButton
                value={SecondImage}
                onChange={(value) => {
                  setSecondImage(value);
                }}
                style={{ marginLeft: 10 }}
              />
              <ImageButton
                value={ThirdImage}
                onChange={(value) => {
                  setThirdImage(value);
                }}
                style={{ marginLeft: 10 }}
              />
              <ImageButton
                value={ForthImage}
                onChange={(value) => {
                  setForthImage(value);
                }}
                style={{ marginLeft: 10 }}
              />
            </View>
            {ImageError && (
              <Text
                style={{
                  marginLeft: 2,
                  fontSize: 12,
                  fontFamily: "Poppins-Light",
                  color: "red",
                  paddingHorizontal: 20,
                }}
              >
                {ImageError}
              </Text>
            )}
            <View style={{ height: 10 }} />

            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                marginVertical: 20,
                color: "black",
                paddingHorizontal: 20,
              }}
            >
              Service Describe
            </Text>
            <View style={{}}>
              <Input
                value={CenterName}
                returnKeyType="next"
                error={CenterNameError}
                onChange={(val) => {
                  setCenterNameError(null);
                  if (val.length <= 50) {
                    setCenterName(val);
                  } else {
                    setCenterNameError("*Max is 50 character.");
                  }
                }}
                onSubmitEditing={() => {
                  if (specialityRef.current && !direct) {
                    specialityRef.current.focus();
                  } else if (descriptionRef.current && direct) {
                    descriptionRef.current.focus();
                  }
                }}
                style={{
                  borderWidth: 1,
                  marginTop: 0,
                  marginLeft: 20,
                }}
                placeholder="Service title"
              />
            </View>
            {!direct && <View style={{ height: 10 }} />}
            {!direct && (
              <Input
                value={Speciality}
                innerRef={specialityRef}
                returnKeyType="next"
                error={SpecialityError}
                onChange={(val) => {
                  setSpecialityError(null);
                  if (val.length <= 100) {
                    setSpeciality(val);
                  } else {
                    setSpecialityError("*Character must be between 100");
                  }
                }}
                onSubmitEditing={() => {
                  if (descriptionRef.current) {
                    descriptionRef.current.focus();
                  }
                }}
                style={{
                  borderWidth: 1,
                }}
                placeholder="Speciality"
              />
            )}
            <View style={{ height: 10 }} />
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <TextArea
                style={{}}
                value={Description}
                innerRef={descriptionRef}
                returnKeyType="next"
                error={DescriptionError}
                onChange={(val) => {
                  setDescriptionError(null);
                  if (val.length <= 2000) {
                    setDescription(val);
                  } else {
                    setDescriptionError("*Character must be between 2000");
                  }
                }}
                onSubmitEditing={() => {
                  if (aboutRef.current && !direct) {
                    aboutRef.current.focus();
                  } else if (priceRef && priceRef.current && direct) {
                    priceRef.current.focus();
                  }
                }}
                placeholder="Description"
              />
            </View>
            <View style={{ height: 10 }} />
            {!direct && (
              <TextArea
                style={{
                  marginHorizontal: 20,
                }}
                value={About}
                innerRef={aboutRef}
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                error={AboutError}
                onChange={(val) => {
                  setAboutError(null);
                  if (val.length <= 2000) {
                    setAbout(val);
                  } else {
                    setAboutError("Character should be between 2000");
                  }
                }}
                placeholder="About Company"
              />
            )}
            {direct && type != "SUBS"&&type!="INSTALLMENT" ? (
              <Input
                innerRef={priceRef}
                value={Price}
                error={PriceError}
                onChange={(val) => {
                  setPrice(val);
                }}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  marginLeft: 0,
                  width: width - 40,
                  marginLeft: 20,
                }}
                placeholder="Price"
              />
            ) : null}

            {direct && (
              <Text
                style={[
                  {
                    marginTop: 10,
                    fontFamily: "Poppins-Medium",
                    fontSize: 16,
                    marginHorizontal: 20,
                  },
                ]}
              >
                Choose your facilities (Optional)
              </Text>
            )}
            {Array.isArray(Facilities) &&
              direct &&
              Facilities.map((doc, i) => (
                <CheckBox
                  key={i}
                  style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                  }}
                  value={doc.checked}
                  title={doc.title}
                  onChange={() => {
                    let arr = Facilities;
                    setFacilities(null);
                    arr[i] = {
                      title: doc.title,
                      checked: !doc.checked,
                      id: i + 1,
                    };
                    setFacilities(arr);
                    setChange(!change);
                    //console.log(arr);
                  }}
                />
              ))}
            {direct && (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <IconButton
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  LeftIcon={() => (
                    <AntDesign name="pluscircleo" size={20} color="black" />
                  )}
                  style={{
                    borderWidth: 0,
                    marginHorizontal: 10,
                    marginVertical: 5,
                  }}
                  title={"Add More"}
                />
              </View>
            )}
            {FacilitiesError && (
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 20,
                  fontFamily: "Poppins-Light",
                  color: "red",
                  marginTop: 3,
                }}
              >
                {FacilitiesError}
              </Text>
            )}
            <IconButton
              onPress={() => {
                checkValidity();
              }}
              style={{
                marginTop: 30,
                backgroundColor: "#4ADE80",
                color: "black",
                borderWidth: 0,
                borderRadius: 5,
                height: 35,
                marginBottom: 0,
                marginHorizontal: 20,
              }}
              title={direct ? "Confirm" : "Continue"}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                alignSelf: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <AddFacilities
          onConfirm={(e) => {
            setFacilities((val) => [
              ...val,
              {
                id: val.length + 1,
                title: e,
                checked: true,
              },
            ]);
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Service;

export const ImageButton = ({ style, onChange, value }) => {
  const [image, setImage] = React.useState(null);
  React.useEffect(() => {
    if (value) {
      setImage(value.uri);
    }
  }, [value]);
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
      setImage(result.assets[0].uri);
      if (onChange) {
        onChange(result.assets[0]);
      }
    }
  };
  const styles = StyleSheet.create({
    view: {
      width: width / 4 - 20,
      height: 56,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
      borderColor: "#e6e6e6",

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
            if(onChange){
              onChange(null)
            }
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
      <AntDesign name="plus" size={20} color="#000000" />
    </TouchableOpacity>
  );
};

const vectorImage = `
<svg xmlns="http://www.w3.org/2000/svg" width="217.067" height="111.133" viewBox="0 0 217.067 111.133">
  <g id="edit" transform="translate(-166.187 -155.568)">
    <path id="Path_27808" data-name="Path 27808" d="M791.9,308.92a2.371,2.371,0,0,1,1.244,1.035,2.8,2.8,0,0,1,.273.659,3.52,3.52,0,0,1,.257-.765,2.287,2.287,0,0,1,1.006-1.07,2.389,2.389,0,0,1-1.032-1.167,3.983,3.983,0,0,1-.251-.817,4.348,4.348,0,0,1-.354.894,3.19,3.19,0,0,1-1.144,1.231Zm1.553,2.964a.169.169,0,0,1-.167-.145,4.409,4.409,0,0,0-.431-1.617,2.12,2.12,0,0,0-1.453-1,.167.167,0,0,1-.135-.151.165.165,0,0,1,.106-.17,2.718,2.718,0,0,0,1.376-1.276,4.755,4.755,0,0,0,.5-1.884.168.168,0,0,1,.167-.154h0a.168.168,0,0,1,.167.154,5.9,5.9,0,0,0,.367,1.836,1.85,1.85,0,0,0,1.266,1.141.169.169,0,0,1,0,.331A1.8,1.8,0,0,0,793.975,310a4.655,4.655,0,0,0-.36,1.733.168.168,0,0,1-.161.158s0,0,0,0Z" transform="translate(-434.164 -109.629)"/>
    <path id="Path_27810" data-name="Path 27810" d="M841.034,286.125a1.881,1.881,0,0,1,.9.685,1.824,1.824,0,0,1,.2.376,2.21,2.21,0,0,1,.186-.444,1.785,1.785,0,0,1,.723-.7,1.83,1.83,0,0,1-.746-.768,2.408,2.408,0,0,1-.18-.473,2.7,2.7,0,0,1-.257.53,2.41,2.41,0,0,1-.826.794Zm1.128,2.1a.17.17,0,0,1-.167-.141,2.533,2.533,0,0,0-.337-1.08,1.689,1.689,0,0,0-1.151-.665.164.164,0,0,1-.138-.154.17.17,0,0,1,.116-.174,2.05,2.05,0,0,0,1.09-.858,2.792,2.792,0,0,0,.4-1.263.17.17,0,0,1,.167-.154h0a.168.168,0,0,1,.167.151,3.463,3.463,0,0,0,.289,1.234,1.394,1.394,0,0,0,1,.759.169.169,0,0,1,.142.167.164.164,0,0,1-.145.164,1.384,1.384,0,0,0-.981.694,2.719,2.719,0,0,0-.283,1.157.167.167,0,0,1-.161.158c0,.006,0,.006,0,.006Z" transform="translate(-467.48 -94.864)"/>
    <path id="Path_27812" data-name="Path 27812" d="M806.378,270.563a2.906,2.906,0,0,1,1.826,1.1,3.644,3.644,0,0,1,.518,1.337,4.177,4.177,0,0,1,.383-1.173,3.108,3.108,0,0,1,1.511-1.447,3.185,3.185,0,0,1-1.652-1.456,4.878,4.878,0,0,1-.476-1.3,5.591,5.591,0,0,1-.569,1.768,2.65,2.65,0,0,1-1.54,1.17Zm2.4,3.838a.166.166,0,0,1-.164-.138c-.026-.135-.051-.283-.077-.437a5.094,5.094,0,0,0-.6-1.974,2.986,2.986,0,0,0-2.208-1.067.168.168,0,0,1-.035-.325c.08-.029.154-.058.231-.087a2.73,2.73,0,0,0,1.71-1.157,7.089,7.089,0,0,0,.656-2.81.167.167,0,0,1,.161-.158.166.166,0,0,1,.174.145,6.712,6.712,0,0,0,.64,2.356,2.752,2.752,0,0,0,2,1.437.169.169,0,0,1,.148.164.166.166,0,0,1-.138.17,2.692,2.692,0,0,0-1.865,1.453,5.268,5.268,0,0,0-.456,2.266.17.17,0,0,1-.154.164.056.056,0,0,0-.019,0Z" transform="translate(-443.873 -83.003)"/>
    <path id="Path_27814" data-name="Path 27814" d="M837.033,318.618a.583.583,0,0,0,.83-.029l.62-.659a.565.565,0,0,0,.18-.434.59.59,0,0,0-.206-.389l-13.55-12.759-1.424,1.511,13.55,12.759Zm.383.492a.9.9,0,0,1-.614-.247h0l-13.672-12.875a.168.168,0,0,1-.006-.238l1.656-1.758a.167.167,0,0,1,.116-.051.174.174,0,0,1,.122.045l13.672,12.875a.934.934,0,0,1,.312.611.911.911,0,0,1-.27.688l-.624.662-.01.01a1.019,1.019,0,0,1-.682.28Z" transform="translate(-455.747 -108.576)"/>
    <path id="Path_27815" data-name="Path 27815" d="M824.32,306.892l-4.105-3.867a.664.664,0,0,1-.029-.913l.768-.817a.626.626,0,0,1,.913-.026l4.105,3.867-1.652,1.755Z" transform="translate(-453.672 -106.64)" fill="#fff"/>
    <path id="Path_27816" data-name="Path 27816" d="M821.069,300.9a.471.471,0,0,0-.347.158l-.768.817a.492.492,0,0,0,.019.675l3.983,3.752,1.424-1.511-3.983-3.752a.469.469,0,0,0-.328-.138Zm2.9,5.806a.175.175,0,0,1-.116-.045l-4.105-3.867a.833.833,0,0,1-.039-1.148l.772-.82a.8.8,0,0,1,1.154-.035l4.105,3.867a.168.168,0,0,1,.007.238l-1.656,1.755a.156.156,0,0,1-.122.055Z" transform="translate(-453.318 -106.283)"/>
    <path id="Path_27817" data-name="Path 27817" d="M832.152,313.732a.058.058,0,0,1-.038-.016.059.059,0,0,1,0-.08l.977-1.042a.057.057,0,1,1,.084.077l-.977,1.042a.057.057,0,0,1-.042.019Z" transform="translate(-461.868 -114.437)"/>
    <path id="Path_27818" data-name="Path 27818" d="M757.143,239.054h-19.2a.167.167,0,1,1,0-.334h19.2a.166.166,0,0,1,.167.167.17.17,0,0,1-.167.167Z" transform="translate(-397.871 -64.324)"/>
    <path id="Path_27820" data-name="Path 27820" d="M780.788,232.571c-.441,0-.9,0-.9,1.916s.54,1.916.9,1.916h.039c.257,0,.418-.006.54-.129.215-.215.318-.8.318-1.787,0-1.916-.456-1.916-.9-1.916Zm.074,4.17h-.077c-.878,0-1.234-.653-1.234-2.25,0-1.893.434-2.25,1.234-2.25.781,0,1.234.37,1.234,2.25,0,1.128-.125,1.733-.418,2.025a.949.949,0,0,1-.739.225Z" transform="translate(-426.214 -59.927)"/>
    <path id="Path_27821" data-name="Path 27821" d="M753.7,234.165a.054.054,0,0,1-.055-.055v-1.466a.055.055,0,1,1,.109,0v1.466a.056.056,0,0,1-.055.055Z" transform="translate(-408.64 -60.164)"/>
    <path id="Path_27822" data-name="Path 27822" d="M768.485,234.165a.054.054,0,0,1-.055-.055v-1.466a.054.054,0,0,1,.055-.055.057.057,0,0,1,.058.055v1.466a.057.057,0,0,1-.058.055Z" transform="translate(-418.668 -60.164)"/>
    <path id="Path_27831" data-name="Path 27831" d="M545.06,426.074h-.923a.168.168,0,0,1-.167-.167.166.166,0,0,1,.167-.167h.923a.167.167,0,1,1,0,.334Zm2.694,0h-1.347a.168.168,0,0,1-.167-.167.166.166,0,0,1,.167-.167h1.347a.167.167,0,1,1,0,.334Zm2.694,0H549.1a.168.168,0,0,1-.167-.167.166.166,0,0,1,.167-.167h1.347a.167.167,0,0,1,0,.334Zm2.7,0H551.8a.168.168,0,0,1-.167-.167.166.166,0,0,1,.167-.167h1.347a.166.166,0,0,1,.167.167.17.17,0,0,1-.167.167Zm2.694,0h-1.347a.168.168,0,0,1-.167-.167.166.166,0,0,1,.167-.167h1.347a.166.166,0,0,1,.167.167.17.17,0,0,1-.167.167Zm2.694,0h-1.347a.168.168,0,0,1-.167-.167.166.166,0,0,1,.167-.167h1.347a.166.166,0,0,1,.167.167.17.17,0,0,1-.167.167Zm2.694,0H559.88a.168.168,0,0,1-.167-.167.166.166,0,0,1,.167-.167h1.347a.166.166,0,0,1,.167.167.168.168,0,0,1-.167.167Zm2.694,0h-1.347a.168.168,0,0,1-.167-.167.166.166,0,0,1,.167-.167h1.347a.166.166,0,0,1,.167.167.168.168,0,0,1-.167.167Z" transform="translate(-266.366 -191.222)"/>
    <path id="Path_27832" data-name="Path 27832" d="M542.938,465.424h-1.061a.167.167,0,0,1,0-.334h1.061a.167.167,0,1,1,0,.334Zm2.694,0h-1.347a.166.166,0,0,1-.167-.167.168.168,0,0,1,.167-.167h1.347a.167.167,0,1,1,0,.334Zm2.694,0h-1.347a.167.167,0,1,1,0-.334h1.347a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,0,1,0-.334h1.347a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,1,1,0-.334h1.347a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,1,1,0-.334h1.347a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,1,1,0-.334H559.1a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,1,1,0-.334H561.8a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Z" transform="translate(-264.833 -217.922)"/>
    <path id="Path_27834" data-name="Path 27834" d="M505.585,450.547l2.864,1.852a1.782,1.782,0,0,0,.669-.235c-.267-1.054-.884-2.861-1.029-3.279a1.9,1.9,0,0,1-1.222-.906c-1.019-2.041-2.684-6.41-3.469-8.641a8.1,8.1,0,0,0-.187,3.629c.241,1.553,2.16,6.979,2.372,7.58Zm2.832,2.2a.173.173,0,0,1-.09-.026l-2.967-1.919a.158.158,0,0,1-.067-.084c-.087-.244-2.151-6.028-2.408-7.7a8.532,8.532,0,0,1,.354-4.272.167.167,0,0,1,.161-.112h0a.165.165,0,0,1,.158.116c.682,2.006,2.527,6.9,3.62,9.082a1.647,1.647,0,0,0,1.08.749.161.161,0,0,1,.129.109c.006.023.771,2.218,1.074,3.421a.278.278,0,0,1-.042.228c-.164.251-.781.376-.968.408Z" transform="translate(-238.406 -199.968)"/>
    <path id="Path_27835" data-name="Path 27835" d="M524.306,488.629c-.682.447-1.691.055-2.192-1.25-.3-.765-.376-1.662.161-1.951a1.377,1.377,0,0,1,1.881.537c.392.518,1.148,2.016.151,2.665Zm-1.688-4.748c-.907-.363-1.823-2.961-1.823-2.961l-1.575.492s1.279,4.137,1.906,6.1c.691,2.173,1.906,3.038,3.729,2.26,1.138-.485,1.337-1.916.9-3.308a3.6,3.6,0,0,0-3.141-2.581Z" transform="translate(-249.573 -228.663)" fill="#ffd42e"/>
    <path id="Path_27836" data-name="Path 27836" d="M522.592,485.058a1.242,1.242,0,0,0-.6.167c-.431.232-.354,1.042-.084,1.742a2.007,2.007,0,0,0,1.128,1.267.926.926,0,0,0,.813-.1h0a.856.856,0,0,0,.4-.607,2.745,2.745,0,0,0-.595-1.813,1.37,1.37,0,0,0-1.064-.656Zm.762,3.568a1.349,1.349,0,0,1-.418-.068,2.347,2.347,0,0,1-1.341-1.466c-.312-.813-.415-1.81.238-2.16a1.519,1.519,0,0,1,2.093.585,3.085,3.085,0,0,1,.656,2.073,1.2,1.2,0,0,1-.547.833,1.26,1.26,0,0,1-.681.2Zm-4.282-7.452c.241.781,1.308,4.218,1.855,5.934a3.475,3.475,0,0,0,1.585,2.263,2.328,2.328,0,0,0,1.916-.106c1.157-.5,1.157-1.98.807-3.1a3.237,3.237,0,0,0-2.739-2.4,2.587,2.587,0,0,1-.3-.074h0c-.849-.341-1.636-2.3-1.865-2.909l-1.257.4Zm4.2,8.7a2.14,2.14,0,0,1-.9-.193,3.789,3.789,0,0,1-1.768-2.466c-.617-1.939-1.893-6.057-1.906-6.1a.167.167,0,0,1,.109-.209l1.575-.492a.166.166,0,0,1,.209.106c.247.7,1.045,2.588,1.726,2.861h0a2.187,2.187,0,0,0,.245.058,3.575,3.575,0,0,1,2.993,2.63c.518,1.656.125,3.035-1,3.514a3.355,3.355,0,0,1-1.283.289Z" transform="translate(-249.212 -228.313)"/>
    <path id="Path_27838" data-name="Path 27838" d="M509.42,452.2a1.778,1.778,0,0,0,.685.19l2.732-2.041a79.46,79.46,0,0,0,1.852-7.728,8.127,8.127,0,0,0-.434-3.61c-.63,2.279-2,6.751-2.874,8.857a1.888,1.888,0,0,1-1.157.987c-.116.431-.608,2.276-.8,3.347Zm.733.534h-.016c-.186-.019-.813-.1-.993-.341a.273.273,0,0,1-.055-.225c.222-1.218.833-3.462.839-3.485a.175.175,0,0,1,.122-.119,1.633,1.633,0,0,0,1.026-.82c.942-2.257,2.45-7.259,2.993-9.307a.171.171,0,0,1,.151-.126.165.165,0,0,1,.167.1,8.549,8.549,0,0,1,.643,4.237,80.534,80.534,0,0,1-1.877,7.844.175.175,0,0,1-.061.09l-2.832,2.115a.225.225,0,0,1-.106.032Z" transform="translate(-242.694 -199.749)"/>
    <path id="Path_27839" data-name="Path 27839" d="M495.649,489.748c.71.4,1.691-.061,2.1-1.4.241-.784.264-1.685-.293-1.935a1.374,1.374,0,0,0-1.839.665c-.357.537-1.009,2.083.029,2.665Zm1.36-4.851c.878-.424,1.617-3.077,1.617-3.077l1.6.386s-1,4.215-1.485,6.214c-.543,2.215-1.7,3.16-3.568,2.508-1.167-.408-1.466-1.823-1.125-3.24a3.6,3.6,0,0,1,2.958-2.79Z" transform="translate(-232.405 -229.274)" fill="#ffd42e"/>
    <path id="Path_27840" data-name="Path 27840" d="M496.482,486.085a1.334,1.334,0,0,0-1.09.733,2.747,2.747,0,0,0-.469,1.848.859.859,0,0,0,.44.579h0a.938.938,0,0,0,.82.042,2.012,2.012,0,0,0,1.042-1.34c.222-.717.244-1.534-.2-1.733a1.286,1.286,0,0,0-.54-.129Zm-.672,3.613a1.257,1.257,0,0,1-.611-.161,1.211,1.211,0,0,1-.6-.794,3.1,3.1,0,0,1,.514-2.115,1.518,1.518,0,0,1,2.048-.723c.675.305.643,1.305.386,2.141a2.349,2.349,0,0,1-1.238,1.556,1.342,1.342,0,0,1-.5.1Zm.833-5.157Zm1.736-2.877c-.183.62-.839,2.63-1.662,3.028h0a2.273,2.273,0,0,1-.3.1,3.236,3.236,0,0,0-2.572,2.582c-.273,1.144-.174,2.626,1.016,3.041a2.332,2.332,0,0,0,1.919-.026,3.465,3.465,0,0,0,1.427-2.366c.431-1.752,1.26-5.253,1.447-6.047l-1.279-.309Zm-2.491,9.274a3.462,3.462,0,0,1-1.135-.212c-1.154-.4-1.636-1.752-1.231-3.437a3.577,3.577,0,0,1,2.81-2.826,2.025,2.025,0,0,0,.238-.074c.662-.318,1.328-2.253,1.53-2.97a.171.171,0,0,1,.2-.119l1.6.386a.171.171,0,0,1,.125.2c-.01.042-1,4.24-1.488,6.214a3.786,3.786,0,0,1-1.595,2.581,2.249,2.249,0,0,1-1.061.254Z" transform="translate(-232.04 -228.919)"/>
    <path id="Path_27841" data-name="Path 27841" d="M515.7,473.03a.341.341,0,1,1,.251.411.345.345,0,0,1-.251-.411Z" transform="translate(-247.179 -223.132)"/>
    <path id="Path_27842" data-name="Path 27842" d="M236.59,312.81l.026,6.172,6.709-3.157Z" transform="translate(-57.801 -114.596)" fill="#ffd42e"/>
    <path id="Path_27843" data-name="Path 27843" d="M236.408,312.721l.026,5.645,6.137-2.89-6.163-2.755Zm-.145,6.079a.182.182,0,0,1-.09-.026.169.169,0,0,1-.077-.141l-.026-6.169a.169.169,0,0,1,.238-.154l6.735,3.012a.165.165,0,0,1,.1.151.175.175,0,0,1-.1.154l-6.709,3.157a.147.147,0,0,1-.074.016Z" transform="translate(-57.448 -114.246)"/>
    <path id="Path_27844" data-name="Path 27844" d="M203.877,291.458h0a.169.169,0,0,1-.167-.17l.023-6.941a.168.168,0,0,1,.167-.167h0a.169.169,0,0,1,.167.17l-.022,6.941a.168.168,0,0,1-.167.167Z" transform="translate(-35.491 -95.17)"/>
    <path id="Path_27845" data-name="Path 27845" d="M204.337,290.77h0l-6.78-.023a.169.169,0,0,1,0-.338h0l6.78.023a.169.169,0,0,1,0,.338Z" transform="translate(-31.203 -99.397)"/>
    <path id="Path_27846" data-name="Path 27846" d="M204.337,353.427h0l-6.78-.022a.167.167,0,0,1,0-.334h0l6.78.022a.167.167,0,1,1,0,.334Z" transform="translate(-31.203 -141.913)"/>
    <path id="Path_27847" data-name="Path 27847" d="M203.647,345.3h0a.168.168,0,0,1-.167-.167l.023-6.941a.168.168,0,0,1,.167-.167h0a.168.168,0,0,1,.167.167l-.023,6.941a.166.166,0,0,1-.167.167Z" transform="translate(-35.335 -131.701)"/>
    <path id="Path_27848" data-name="Path 27848" d="M284.187,345.3h0a.168.168,0,0,1-.167-.167l.022-6.941a.168.168,0,0,1,.167-.167h0a.168.168,0,0,1,.167.167l-.023,6.941a.166.166,0,0,1-.167.167Z" transform="translate(-89.983 -131.701)"/>
    <path id="Path_27849" data-name="Path 27849" d="M276.267,353.65h0l-6.78-.023a.169.169,0,0,1,0-.338h0l6.78.022a.169.169,0,0,1,.167.17.166.166,0,0,1-.167.167Z" transform="translate(-80.009 -142.062)"/>
    <path id="Path_27850" data-name="Path 27850" d="M276.267,291.007h0l-6.78-.023a.167.167,0,1,1,0-.334h0l6.78.022a.167.167,0,1,1,0,.334Z" transform="translate(-80.009 -99.56)"/>
    <path id="Path_27851" data-name="Path 27851" d="M284.417,291.458h0a.167.167,0,0,1-.167-.17l.023-6.941a.166.166,0,0,1,.167-.167h0a.169.169,0,0,1,.167.17l-.023,6.941a.166.166,0,0,1-.167.167Z" transform="translate(-90.139 -95.17)"/>
    <path id="Path_27852" data-name="Path 27852" d="M211.013,312.878h21.33V296.119h-21.33v16.758Zm21.384.113H210.955a.054.054,0,0,1-.055-.055V296.065a.054.054,0,0,1,.055-.055H232.4a.057.057,0,0,1,.058.055v16.871a.057.057,0,0,1-.058.055Z" transform="translate(-40.369 -103.196)"/>
    <path id="Path_27853" data-name="Path 27853" d="M236.59,312.81l.026,6.172,6.709-3.157Z" transform="translate(-57.801 -114.596)" fill="#ffd42e"/>
    <path id="Path_27854" data-name="Path 27854" d="M236.408,312.721l.026,5.645,6.137-2.89-6.163-2.755Zm-.145,6.079a.182.182,0,0,1-.09-.026.169.169,0,0,1-.077-.141l-.026-6.169a.169.169,0,0,1,.238-.154l6.735,3.012a.165.165,0,0,1,.1.151.175.175,0,0,1-.1.154l-6.709,3.157a.147.147,0,0,1-.074.016Z" transform="translate(-57.448 -114.246)"/>
    <path id="Path_27855" data-name="Path 27855" d="M203.877,291.458h0a.169.169,0,0,1-.167-.17l.023-6.941a.168.168,0,0,1,.167-.167h0a.169.169,0,0,1,.167.17l-.022,6.941a.168.168,0,0,1-.167.167Z" transform="translate(-35.491 -95.17)"/>
    <path id="Path_27856" data-name="Path 27856" d="M204.337,290.77h0l-6.78-.023a.169.169,0,0,1,0-.338h0l6.78.023a.169.169,0,0,1,0,.338Z" transform="translate(-31.203 -99.397)"/>
    <path id="Path_27857" data-name="Path 27857" d="M204.337,353.427h0l-6.78-.022a.167.167,0,0,1,0-.334h0l6.78.022a.167.167,0,1,1,0,.334Z" transform="translate(-31.203 -141.913)"/>
    <path id="Path_27858" data-name="Path 27858" d="M203.647,345.3h0a.168.168,0,0,1-.167-.167l.023-6.941a.168.168,0,0,1,.167-.167h0a.168.168,0,0,1,.167.167l-.023,6.941a.166.166,0,0,1-.167.167Z" transform="translate(-35.335 -131.701)"/>
    <path id="Path_27859" data-name="Path 27859" d="M284.187,345.3h0a.168.168,0,0,1-.167-.167l.022-6.941a.168.168,0,0,1,.167-.167h0a.168.168,0,0,1,.167.167l-.023,6.941a.166.166,0,0,1-.167.167Z" transform="translate(-89.983 -131.701)"/>
    <path id="Path_27860" data-name="Path 27860" d="M276.267,353.65h0l-6.78-.023a.169.169,0,0,1,0-.338h0l6.78.022a.169.169,0,0,1,.167.17.166.166,0,0,1-.167.167Z" transform="translate(-80.009 -142.062)"/>
    <path id="Path_27866" data-name="Path 27866" d="M276.855,250.578c-.44,0-.9,0-.9,1.916s.54,1.916.9,1.916h.039c.254,0,.418-.006.54-.129.215-.215.318-.8.318-1.787,0-1.916-.453-1.916-.9-1.916Zm.077,4.17h-.077c-.878,0-1.234-.653-1.234-2.254,0-1.893.434-2.254,1.234-2.254.781,0,1.234.37,1.234,2.254,0,1.128-.125,1.733-.418,2.025a.94.94,0,0,1-.739.228Z" transform="translate(-84.284 -72.14)"/>
    <path id="Path_27867" data-name="Path 27867" d="M263.625,252.172a.055.055,0,0,1-.055-.058v-1.466a.057.057,0,0,1,.055-.058.058.058,0,0,1,.058.058v1.466a.058.058,0,0,1-.058.058Z" transform="translate(-76.108 -72.378)"/>
    <path id="Path_27868" data-name="Path 27868" d="M278.415,252.172a.055.055,0,0,1-.055-.058v-1.466a.057.057,0,0,1,.055-.058.055.055,0,0,1,.055.058v1.466a.055.055,0,0,1-.055.058Z" transform="translate(-86.143 -72.378)"/>
    <path id="Path_27869" data-name="Path 27869" d="M293.2,252.172a.055.055,0,0,1-.055-.058v-1.466a.057.057,0,0,1,.055-.058.058.058,0,0,1,.058.058v1.466a.06.06,0,0,1-.058.058Z" transform="translate(-96.178 -72.378)"/>
    <path id="Path_27870" data-name="Path 27870" d="M307.995,252.172a.055.055,0,0,1-.055-.058v-1.466a.057.057,0,0,1,.055-.058.055.055,0,0,1,.055.058v1.466a.057.057,0,0,1-.055.058Z" transform="translate(-106.214 -72.378)"/>
    <path id="Path_27871" data-name="Path 27871" d="M592.037,506.9a.168.168,0,0,1-.167-.167v-8.644a.166.166,0,0,1,.167-.167.168.168,0,0,1,.167.167v8.644a.164.164,0,0,1-.167.167Z" transform="translate(-298.868 -240.198)"/>
    <path id="Path_27872" data-name="Path 27872" d="M585.627,508.645a.166.166,0,0,1-.167-.167v-5.5a.167.167,0,0,1,.334,0v5.5a.166.166,0,0,1-.167.167Z" transform="translate(-294.518 -243.516)"/>
    <path id="Path_27873" data-name="Path 27873" d="M579.4,510.359a.166.166,0,0,1-.167-.167v-2.414a.166.166,0,0,1,.167-.167.168.168,0,0,1,.167.167v2.414a.166.166,0,0,1-.167.167Z" transform="translate(-290.291 -246.773)"/>
    <path id="Path_27874" data-name="Path 27874" d="M598.247,508.645a.166.166,0,0,1-.167-.167v-5.5a.167.167,0,0,1,.334,0v5.5a.164.164,0,0,1-.167.167Z" transform="translate(-303.081 -243.516)"/>
    <path id="Path_27875" data-name="Path 27875" d="M604.487,510.359a.166.166,0,0,1-.167-.167v-2.414a.166.166,0,0,1,.167-.167.168.168,0,0,1,.167.167v2.414a.166.166,0,0,1-.167.167Z" transform="translate(-307.315 -246.773)"/>
    <path id="Path_27876" data-name="Path 27876" d="M661.417,506.9a.168.168,0,0,1-.167-.167v-8.644a.166.166,0,0,1,.167-.167.168.168,0,0,1,.167.167v8.644a.166.166,0,0,1-.167.167Z" transform="translate(-345.944 -240.198)"/>
    <path id="Path_27877" data-name="Path 27877" d="M655.007,508.645a.166.166,0,0,1-.167-.167v-5.5a.167.167,0,0,1,.334,0v5.5a.166.166,0,0,1-.167.167Z" transform="translate(-341.594 -243.516)"/>
    <path id="Path_27878" data-name="Path 27878" d="M648.777,510.359a.166.166,0,0,1-.167-.167v-2.414a.168.168,0,0,1,.167-.167.17.17,0,0,1,.167.167v2.414a.168.168,0,0,1-.167.167Z" transform="translate(-337.367 -246.773)"/>
    <path id="Path_27879" data-name="Path 27879" d="M667.627,508.645a.166.166,0,0,1-.167-.167v-5.5a.167.167,0,0,1,.334,0v5.5a.164.164,0,0,1-.167.167Z" transform="translate(-350.157 -243.516)"/>
    <path id="Path_27880" data-name="Path 27880" d="M673.857,510.359a.166.166,0,0,1-.167-.167v-2.414a.167.167,0,1,1,.334,0v2.414a.164.164,0,0,1-.167.167Z" transform="translate(-354.385 -246.773)"/>
    <path id="Path_27881" data-name="Path 27881" d="M629.407,506.9a.168.168,0,0,1-.167-.167v-8.644a.166.166,0,0,1,.167-.167.168.168,0,0,1,.167.167v8.644a.166.166,0,0,1-.167.167Z" transform="translate(-324.224 -240.198)"/>
    <path id="Path_27882" data-name="Path 27882" d="M616.847,508.645a.166.166,0,0,1-.167-.167v-5.5a.167.167,0,0,1,.334,0v5.5a.164.164,0,0,1-.167.167Z" transform="translate(-315.702 -243.516)"/>
    <path id="Path_27883" data-name="Path 27883" d="M610.617,511.158a.166.166,0,0,1-.167-.167v-.984a.167.167,0,0,1,.334,0v.984a.166.166,0,0,1-.167.167Z" transform="translate(-311.475 -248.286)"/>
    <path id="Path_27884" data-name="Path 27884" d="M679.757,511.158a.166.166,0,0,1-.167-.167v-.984a.167.167,0,1,1,.334,0v.984a.166.166,0,0,1-.167.167Z" transform="translate(-358.388 -248.286)"/>
    <path id="Path_27885" data-name="Path 27885" d="M623.077,510.359a.166.166,0,0,1-.167-.167v-2.414a.166.166,0,0,1,.167-.167.168.168,0,0,1,.167.167v2.414a.164.164,0,0,1-.167.167Z" transform="translate(-319.929 -246.773)"/>
    <path id="Path_27886" data-name="Path 27886" d="M635.617,508.645a.166.166,0,0,1-.167-.167v-5.5a.167.167,0,0,1,.334,0v5.5a.166.166,0,0,1-.167.167Z" transform="translate(-328.438 -243.516)"/>
    <path id="Path_27887" data-name="Path 27887" d="M642.2,509.5a.166.166,0,0,1-.167-.167v-3.957a.166.166,0,0,1,.167-.167.168.168,0,0,1,.167.167v3.957a.166.166,0,0,1-.167.167Z" transform="translate(-332.903 -245.144)"/>
    <path id="Path_27892" data-name="Path 27892" d="M473.847,193.949a.166.166,0,0,1-.167-.167v-2.414a.167.167,0,1,1,.334,0v2.414a.164.164,0,0,1-.167.167Z" transform="translate(-218.673 -32.08)"/>
    <path id="Path_27894" data-name="Path 27894" d="M486.217,192.235a.166.166,0,0,1-.167-.167v-5.5a.168.168,0,0,1,.167-.167.166.166,0,0,1,.167.167v5.5a.164.164,0,0,1-.167.167Z" transform="translate(-227.066 -28.823)"/>
    <path id="Path_27899" data-name="Path 27899" d="M822.379,358.288a1.942,1.942,0,1,0,1.942,1.942,1.944,1.944,0,0,0-1.942-1.942Zm0,4.221a2.279,2.279,0,1,1,2.279-2.279,2.282,2.282,0,0,1-2.279,2.279Z" transform="translate(-453.728 -145.224)"/>
    <path id="Path_27900" data-name="Path 27900" d="M647.035,442.141a.887.887,0,1,0,.887.887.889.889,0,0,0-.887-.887Zm0,2.109a1.225,1.225,0,1,1,1.225-1.225,1.226,1.226,0,0,1-1.225,1.225Z" transform="translate(-335.467 -202.119)"/>
    <path id="Path_27901" data-name="Path 27901" d="M417.3,501.331a.887.887,0,1,0,.887.887.889.889,0,0,0-.887-.887Zm0,2.109a1.225,1.225,0,1,1,1.225-1.225,1.226,1.226,0,0,1-1.225,1.225Z" transform="translate(-179.59 -242.281)"/>
    <path id="Path_27904" data-name="Path 27904" d="M254.989,380.9a1.942,1.942,0,1,0,1.942,1.942,1.944,1.944,0,0,0-1.942-1.942Zm0,4.221a2.279,2.279,0,1,1,2.279-2.279,2.282,2.282,0,0,1-2.279,2.279Z" transform="translate(-68.739 -160.566)"/>
    <path id="Path_27906" data-name="Path 27906" d="M813.314,405.244a.656.656,0,1,0,.656.656.657.657,0,0,0-.656-.656Zm0,1.652a.993.993,0,1,1,.993-.993,1,1,0,0,1-.993.993Z" transform="translate(-448.449 -177.088)"/>
    <path id="Path_27907" data-name="Path 27907" d="M318.35,462.286a.825.825,0,1,1,.826.826.826.826,0,0,1-.826-.826Z" transform="translate(-113.277 -215.459)"/>
    <path id="Path_27909" data-name="Path 27909" d="M250.14,221.546a.826.826,0,1,1,.826.826.826.826,0,0,1-.826-.826Z" transform="translate(-66.995 -52.11)"/>
    <path id="Path_27910" data-name="Path 27910" d="M250.613,220.538a.656.656,0,1,0,.656.656.657.657,0,0,0-.656-.656Zm0,1.649a.993.993,0,1,1,.993-.993,1,1,0,0,1-.993.993Z" transform="translate(-66.642 -51.757)"/>
    <path id="Path_27912" data-name="Path 27912" d="M548.476,379.494a1.3,1.3,0,1,0,1.3,1.3,1.3,1.3,0,0,0-1.3-1.3Zm0,2.938a1.636,1.636,0,1,1,1.636-1.636,1.637,1.637,0,0,1-1.636,1.636Z" transform="translate(-268.314 -159.616)"/>
    <path id="Path_27914" data-name="Path 27914" d="M731.383,323.408a6.291,6.291,0,0,0-5.491,4.006c-.894,2.176-.936,4.79-.132,8.217a19.972,19.972,0,0,0,2.736,6.706,10.919,10.919,0,0,0,5.578,4.391,2.013,2.013,0,0,1,1.563,1.485c.151.466.231.723,1.373.54,5.176-.836,7.522-3.572,7.96-5.658a2.4,2.4,0,0,0-.813-2.6,3.87,3.87,0,0,1-1.861-4.7c.035-.157.064-.3.08-.415.212-1.427-1.08-2.681-2.369-3.244a14.969,14.969,0,0,0-1.89-.627,11.706,11.706,0,0,1-2.4-.871,6.956,6.956,0,0,1-3.318-7.133,5.5,5.5,0,0,0-1.009-.1Zm5.031,25.74a.97.97,0,0,1-1.1-.829,1.681,1.681,0,0,0-1.344-1.267,11.265,11.265,0,0,1-5.755-4.526,20.258,20.258,0,0,1-2.787-6.818c-.82-3.5-.775-6.176.148-8.423,1.042-2.536,3.861-4.825,7.04-4.067a.173.173,0,0,1,.129.193,6.624,6.624,0,0,0,3.118,6.937,11.484,11.484,0,0,0,2.341.842,15.1,15.1,0,0,1,1.932.64c1.4.611,2.81,2,2.569,3.6-.019.129-.051.28-.087.437a3.541,3.541,0,0,0,1.714,4.343,2.725,2.725,0,0,1,.961,2.954c-.46,2.192-2.89,5.057-8.236,5.922a4.027,4.027,0,0,1-.646.061Z" transform="translate(-389.099 -121.558)"/>
    <path id="Path_27915" data-name="Path 27915" d="M703.331,303.44c.81,3.951-3.62,9.551-5.24,13.245-.527,1.2-1.289,2.3-1.723,3.533a10.99,10.99,0,0,0-.389,4.623,13.038,13.038,0,0,0,3.208,8.046c2.064,2.1,5.513,3.019,8.059,1.537,2.234-1.3,3.253-4.1,3.112-6.68a18.878,18.878,0,0,0-2.4-7.31c-2.79-5.549-.829-12.21-4.623-16.993Z" transform="translate(-369.457 -108.238)"/>
    <path id="Path_27916" data-name="Path 27916" d="M703.232,303.709c.19,2.771-1.739,6.143-3.456,9.146-.733,1.283-1.424,2.491-1.884,3.543-.225.511-.492,1.006-.752,1.485a14.2,14.2,0,0,0-.968,2.035,10.685,10.685,0,0,0-.379,4.552c.312,3.449,1.376,6.124,3.163,7.944,2.167,2.209,5.542,2.855,7.854,1.508a7.01,7.01,0,0,0,3.028-6.526,18.742,18.742,0,0,0-2.385-7.246A22.6,22.6,0,0,1,705.6,312.2c-.331-3.086-.649-6.008-2.366-8.493Zm.855,31.244a7.658,7.658,0,0,1-5.369-2.308c-1.842-1.877-2.938-4.62-3.257-8.149a11.02,11.02,0,0,1,.4-4.693,14.412,14.412,0,0,1,.987-2.083c.257-.473.521-.964.739-1.46.466-1.067,1.164-2.286,1.9-3.575,1.826-3.192,3.893-6.812,3.327-9.57a.167.167,0,0,1,.093-.186.169.169,0,0,1,.2.048c2.118,2.668,2.459,5.835,2.822,9.188a22.36,22.36,0,0,0,1.823,7.831,18.963,18.963,0,0,1,2.421,7.378,7.359,7.359,0,0,1-3.2,6.835,5.693,5.693,0,0,1-2.893.746Z" transform="translate(-369.106 -107.88)"/>
    <path id="Path_27917" data-name="Path 27917" d="M713.59,352.071c-.074-2.106-.039-4.182.048-5.758a9.533,9.533,0,0,0-2.707-.875,1.589,1.589,0,0,0-1.222.161c-.2.161-1.167-.691-1.267-.456-.685,1.607-1.382,5.481-2.07,7.088-.051.125-3.276.566-3.327.691-.225.524,1.424,2.639,1.588,2.749,8.792,5.844,13.537-2.909,13.537-2.909s-2.109-.219-4.581-.691Z" transform="translate(-374.289 -136.507)" fill="#fff"/>
    <path id="Path_27918" data-name="Path 27918" d="M702.788,352.7Zm.048-.016a7.524,7.524,0,0,0,1.543,2.495c2.636,1.752,5.163,2.347,7.51,1.765a10.059,10.059,0,0,0,5.648-4.4c-.64-.074-2.382-.289-4.333-.662a.165.165,0,0,1-.135-.161c-.064-1.855-.048-3.912.042-5.661a9.279,9.279,0,0,0-2.559-.81,1.452,1.452,0,0,0-1.09.125c-.19.148-.482-.023-.852-.238a4.139,4.139,0,0,0-.4-.212,30.817,30.817,0,0,0-1,3.443,28.98,28.98,0,0,1-1.042,3.568c-.055.122-.064.145-1.787.444-.572.1-1.334.235-1.553.3Zm7.275,4.812a10.743,10.743,0,0,1-5.922-2.041c-.113-.077-1.935-2.286-1.652-2.954.051-.125.061-.148,1.794-.447.579-.1,1.357-.235,1.556-.3a30.207,30.207,0,0,0,1-3.466,29.114,29.114,0,0,1,1.042-3.568.224.224,0,0,1,.141-.129c.161-.052.363.058.7.257a2.344,2.344,0,0,0,.5.247,1.76,1.76,0,0,1,1.331-.177,9.47,9.47,0,0,1,2.755.891.168.168,0,0,1,.093.161c-.093,1.723-.112,3.758-.051,5.61,2.382.45,4.414.659,4.433.662a.169.169,0,0,1,.132.09.17.17,0,0,1,0,.158c-.019.039-2.106,3.816-5.992,4.78a7.883,7.883,0,0,1-1.861.225Z" transform="translate(-373.938 -136.153)"/>
    <path id="Path_27919" data-name="Path 27919" d="M703.944,299c-.479,1.91-.865,3.957-2.048,5.578-.646.884-2.6,5.9.849,8.914a8.375,8.375,0,0,0,7,1.932,7.773,7.773,0,0,0,5.465-5.288,2.007,2.007,0,0,0,3.073-.617,1.627,1.627,0,0,0-.878-1.958,1.449,1.449,0,0,0-1.219-.058,18.009,18.009,0,0,1,1.173-4.285,10.558,10.558,0,0,0-4.8-4.96,8.893,8.893,0,0,0-2.205-.971c-2.247-.585-5.925-.248-6.417,1.713Z" transform="translate(-372.75 -103.884)" fill="#fff"/>
    <path id="Path_27920" data-name="Path 27920" d="M703.585,298.659Zm4.243-1.807a6.368,6.368,0,0,0-3.131.691,1.9,1.9,0,0,0-.948,1.157h0c-.058.232-.116.466-.17.7a13.551,13.551,0,0,1-1.9,4.935c-.444.608-2.684,5.623.823,8.689a8.159,8.159,0,0,0,6.863,1.893,7.638,7.638,0,0,0,5.33-5.163.172.172,0,0,1,.106-.119.164.164,0,0,1,.157.026,2.04,2.04,0,0,0,1.752.354,1.558,1.558,0,0,0,1.064-.9,1.371,1.371,0,0,0-.08-1.038,1.259,1.259,0,0,0-.7-.694,1.31,1.31,0,0,0-1.119-.058.167.167,0,0,1-.212-.186,18.286,18.286,0,0,1,1.157-4.263c-.865-2.225-3.028-3.842-4.7-4.812a8.832,8.832,0,0,0-2.164-.955,8.639,8.639,0,0,0-2.128-.254Zm.045,18.53a8.413,8.413,0,0,1-5.6-2.1c-3.459-3.022-1.665-8.059-.875-9.14a13.311,13.311,0,0,0,1.849-4.816c.058-.235.112-.469.17-.7a2.228,2.228,0,0,1,1.1-1.363,8.21,8.21,0,0,1,5.513-.476,9.157,9.157,0,0,1,2.25.99c1.733,1.006,3.986,2.7,4.87,5.047a.168.168,0,0,1,0,.125,17.6,17.6,0,0,0-1.122,3.993,1.573,1.573,0,0,1,1.067.128,1.6,1.6,0,0,1,.894.874,1.723,1.723,0,0,1,.087,1.308,1.9,1.9,0,0,1-1.289,1.1,2.372,2.372,0,0,1-1.842-.273,7.912,7.912,0,0,1-5.536,5.182,10.036,10.036,0,0,1-1.54.125Z" transform="translate(-372.391 -103.547)"/>
    <path id="Path_27921" data-name="Path 27921" d="M728.859,321.939Zm-2.437-3.395a2.4,2.4,0,0,0-1.334.418,2.908,2.908,0,0,0-1.189,1.717,2.627,2.627,0,0,0,1.72,3.282,2.342,2.342,0,0,0,1.887-.347,2.989,2.989,0,0,0,.964-3.793,2.328,2.328,0,0,0-1.492-1.206,2.179,2.179,0,0,0-.556-.071Zm-.251,5.825a2.521,2.521,0,0,1-.637-.08,2.972,2.972,0,0,1-1.964-3.694,3.248,3.248,0,0,1,1.331-1.916,2.631,2.631,0,0,1,3.864.98,3.247,3.247,0,0,1,.254,2.318h0a3.231,3.231,0,0,1-1.331,1.913,2.706,2.706,0,0,1-1.517.479Z" transform="translate(-388.16 -118.256)"/>
    <path id="Path_27922" data-name="Path 27922" d="M703.435,310.634a2.4,2.4,0,0,0-1.334.418,2.989,2.989,0,0,0-.964,3.793,2.3,2.3,0,0,0,3.379.858,2.908,2.908,0,0,0,1.189-1.717h0a2.627,2.627,0,0,0-1.72-3.282,2.132,2.132,0,0,0-.55-.071Zm-.251,5.825a2.52,2.52,0,0,1-.636-.08A2.675,2.675,0,0,1,700.841,315a3.331,3.331,0,0,1,1.074-4.234,2.677,2.677,0,0,1,2.157-.4,2.968,2.968,0,0,1,1.961,3.694h0a3.257,3.257,0,0,1-1.328,1.916,2.72,2.72,0,0,1-1.521.476Z" transform="translate(-372.563 -112.889)"/>
    <path id="Path_27924" data-name="Path 27924" d="M745.208,270.451a4.805,4.805,0,1,0,4.79,5.2h0a4.8,4.8,0,0,0-4.391-5.179c-.132-.013-.267-.019-.4-.019Zm.016,9.94c-.141,0-.286-.006-.431-.016a5.179,5.179,0,1,1,.431.016Z" transform="translate(-399.429 -85.626)"/>
    <path id="Path_27926" data-name="Path 27926" d="M719.346,300.189a1.659,1.659,0,0,1,.325.032,1.606,1.606,0,0,1,.919.627,5.794,5.794,0,0,0,1.971-3.247,8.587,8.587,0,0,0-.592-4.938,9.57,9.57,0,0,0-3.761-4.353,12.583,12.583,0,0,0-6.33-1.328,7.63,7.63,0,0,0-5.658,2.5,8.232,8.232,0,0,0-1.431,2.578,23.144,23.144,0,0,0,13.463,2.106.169.169,0,0,1,.19.2,13.633,13.633,0,0,0,.122,5.983,2.292,2.292,0,0,1,.781-.161Zm1.234,1.074h-.01a.177.177,0,0,1-.122-.058l-.032-.039a1.474,1.474,0,0,0-.807-.614,1.928,1.928,0,0,0-1.116.18.18.18,0,0,1-.141-.01.173.173,0,0,1-.084-.116,14.318,14.318,0,0,1-.206-6.073,23.6,23.6,0,0,1-13.547-2.228.168.168,0,0,1-.1-.2,8.475,8.475,0,0,1,1.559-2.871,7.942,7.942,0,0,1,5.88-2.594,12.917,12.917,0,0,1,6.51,1.37,9.923,9.923,0,0,1,3.9,4.5,8.837,8.837,0,0,1,.621,5.147,6.424,6.424,0,0,1-2.192,3.552.158.158,0,0,1-.116.048Z" transform="translate(-375.232 -96.834)"/>
    <path id="Path_27927" data-name="Path 27927" d="M719.082,342.022a1.543,1.543,0,0,1-1.4-.739.169.169,0,0,1,.068-.228.167.167,0,0,1,.228.068,1.227,1.227,0,0,0,1.144.566,2.4,2.4,0,0,0,1.6-.675.168.168,0,1,1,.231.244,2.736,2.736,0,0,1-1.82.765Z" transform="translate(-384.217 -133.7)"/>
    <path id="Path_27928" data-name="Path 27928" d="M729.785,326.844a.472.472,0,1,0-.566.315.455.455,0,0,0,.566-.315Z" transform="translate(-391.818 -123.737)"/>
    <path id="Path_27929" data-name="Path 27929" d="M709.262,319.934a.47.47,0,1,0-.562.315.457.457,0,0,0,.563-.315Z" transform="translate(-377.895 -119.048)"/>
    <path id="Path_27930" data-name="Path 27930" d="M714.021,325.573a.153.153,0,0,1-.112-.045l-.5-.456a.368.368,0,0,1,.08-.665A2.579,2.579,0,0,0,714.7,322.5a.168.168,0,1,1,.334.035,2.924,2.924,0,0,1-1.37,2.16.557.557,0,0,0-.093.067.662.662,0,0,0,.061.064l.5.457a.168.168,0,0,1,.01.238.176.176,0,0,1-.122.051Z" transform="translate(-381.214 -121.068)"/>
    <path id="Path_27931" data-name="Path 27931" d="M719.748,319.67a.172.172,0,0,1-.151-.09,1.916,1.916,0,0,0-1.427-.98c-.3-.039-.653.039-.736.264a.168.168,0,0,1-.315-.116.988.988,0,0,1,1.093-.482,2.267,2.267,0,0,1,1.685,1.161.168.168,0,0,1-.071.225.171.171,0,0,1-.077.019Z" transform="translate(-383.845 -118.289)"/>
    <path id="Path_27932" data-name="Path 27932" d="M742.706,327.357a.139.139,0,0,1-.061-.013L740.5,326.5a.169.169,0,0,1,.122-.315l2.141.842a.17.17,0,0,1-.061.328Z" transform="translate(-399.647 -123.665)"/>
    <path id="Path_27933" data-name="Path 27933" d="M746.6,330.608a.154.154,0,0,1-.064-.013.167.167,0,0,1-.093-.219,4.1,4.1,0,0,0,.3-1.652.169.169,0,0,1,.164-.174.173.173,0,0,1,.173.164,4.508,4.508,0,0,1-.328,1.784.161.161,0,0,1-.154.109Z" transform="translate(-403.741 -125.276)"/>
    <path id="Path_27935" data-name="Path 27935" d="M625.51,387.642a42.7,42.7,0,0,0,7.532,1.746,41.052,41.052,0,0,0,17.147-1s.093-.051.045-.608c-.038-.456-.157-1.1-.308-1.922a38.541,38.541,0,0,1-.257-15.167.17.17,0,0,1,.08-.112c2.1-1.222,5.407-5.484,4.51-8.786-.035-.132-.074-.289-.116-.463-.575-2.376-1.916-7.915-10.682-8.545-.312,3.263-3.575,4.513-5.282,4.716a5.191,5.191,0,0,1-3.8-1.09,4.6,4.6,0,0,1-1.4-3.491,32.784,32.784,0,0,0-10.808,2.559,62.111,62.111,0,0,1-10.49,2.565.158.158,0,0,1-.158-.064c-.068-.087-6.693-8.567-9.059-12.026-.157-.228-.286-.228-.331-.228h0c-.437,0-1.083.929-1.656,1.746-.768,1.1-1.492,2.138-2.241,2.067a.8.8,0,0,1-.087-.013c.132.26.283.559.45.894.6,1.2,1.418,2.816,2.26,4.5,1.8,3.584,3.842,7.648,4.134,8.191,2.331,4.337,11.547,3,16.5,2.286a26.6,26.6,0,0,1,2.839-.331.166.166,0,0,1,.122.055.168.168,0,0,1,.045.125,8.436,8.436,0,0,0,2.687,7.217.169.169,0,0,1,.058.119,45.1,45.1,0,0,1-1.733,15.064Zm14.01,2.553a46.051,46.051,0,0,1-6.536-.473,42.171,42.171,0,0,1-7.747-1.816.168.168,0,0,1-.1-.215,43.876,43.876,0,0,0,1.768-15.022,8.734,8.734,0,0,1-2.758-7.259c-.559.026-1.479.158-2.61.322-5.031.73-14.4,2.086-16.842-2.459-.3-.55-2.25-4.436-4.141-8.2-1.26-2.508-2.556-5.086-3.051-6.053a2.932,2.932,0,0,1-.212-.405.174.174,0,0,1,.077-.235c.148-.071.209.048.3.212.032.064.077.151.132.257a.691.691,0,0,0,.469.363c.55.055,1.283-1,1.929-1.922.707-1.013,1.318-1.89,1.932-1.89h0a.743.743,0,0,1,.608.376c2.241,3.273,8.31,11.065,8.985,11.93a60.654,60.654,0,0,0,10.319-2.533,33.185,33.185,0,0,1,11.091-2.594.168.168,0,0,1,.125.045.176.176,0,0,1,.051.122,4.347,4.347,0,0,0,1.292,3.417,4.827,4.827,0,0,0,3.533,1.006c1.643-.2,4.8-1.4,5-4.575a.162.162,0,0,1,.058-.116.167.167,0,0,1,.122-.042c9.162.588,10.609,6.564,11.155,8.815.042.174.077.325.112.457.971,3.568-2.495,7.86-4.6,9.13a38.333,38.333,0,0,0,.276,14.965c.347,1.9.5,2.771.029,2.913a38.15,38.15,0,0,1-10.766,1.479Z" transform="translate(-302.534 -136.709)"/>
    <path id="Path_27937" data-name="Path 27937" d="M588.647,308.421l28.412.521,3.726-27.386-28.267-1.315-3.871,28.18Zm28.557.862h0l-28.749-.527a.171.171,0,0,1-.125-.058.163.163,0,0,1-.039-.132l3.916-28.521a.168.168,0,0,1,.174-.145l28.6,1.331a.168.168,0,0,1,.122.061.174.174,0,0,1,.038.132l-3.771,27.717a.172.172,0,0,1-.167.141Z" transform="translate(-296.435 -92.265)"/>
    <path id="Path_27938" data-name="Path 27938" d="M673.354,361.281a10.574,10.574,0,0,1-2.832-3.883c-.595-1.382-2.594-4.424-3.33-4.8a9.8,9.8,0,0,0-3.141-1.347c-.971-.132-2.877.119-2.932.456-.17,1.055,2.36.386,2.575.46a4.222,4.222,0,0,1,2.154,1.411,10.963,10.963,0,0,0-3.308.559,11.3,11.3,0,0,0-1.89,2.144c-.251.482.01.958.611.453a11.841,11.841,0,0,0,1.694-1.431,6.127,6.127,0,0,1,2.832-.225,4.259,4.259,0,0,0-2.842.231c-.087.077-1.431,1.546-1.517,1.694-.354.62.248.852.727.5.54-.405,1.109-1.064,1.25-1.135a3.6,3.6,0,0,1,2.212-.09,3.792,3.792,0,0,0-2.176.048c-.141.055-1.578,1.2-1.247,1.771.18.305.862.141,1.7-.794a10.676,10.676,0,0,1,1.193.286c.289.067,1.27,2.247,2.382,2.88.225.129.981,2.016,2.344,4.571.292.553,1.649,1.414,3.134-.649.534-.743,1.251-2.27.408-3.112Z" transform="translate(-345.472 -140.657)" fill="#fff"/>
    <path id="Path_27939" data-name="Path 27939" d="M664.674,357.422Zm-1.135-.611a.055.055,0,0,1,.022,0,5.789,5.789,0,0,1,.823.186c.122.035.248.071.386.1.167.039.318.27.678.833A6.7,6.7,0,0,0,667.194,360c.154.087.331.447.868,1.562.376.784.894,1.861,1.54,3.077a1.214,1.214,0,0,0,.955.566c.437.029,1.122-.161,1.893-1.234.482-.669,1.19-2.135.431-2.893h0c-.1-.1-.2-.2-.305-.3a10.115,10.115,0,0,1-2.565-3.636c-.611-1.421-2.594-4.379-3.253-4.71-.309-.154-.579-.305-.843-.45a6.251,6.251,0,0,0-2.244-.881,5.8,5.8,0,0,0-2.745.331.248.248,0,0,0,.058.222c.276.283,1.331.141,1.839.074a1.464,1.464,0,0,1,.569-.032,4.389,4.389,0,0,1,2.228,1.466.167.167,0,0,1-.128.27,10.808,10.808,0,0,0-3.224.534,11.27,11.27,0,0,0-1.829,2.077c-.1.2-.087.367-.032.408.039.032.177.016.389-.161l.061-.045a13.885,13.885,0,0,0,1.305-1.045c.167-.18.289-.309.312-.331a4.371,4.371,0,0,1,3.009-.267.168.168,0,0,1-.087.325,6.617,6.617,0,0,0-2.675.174,3.885,3.885,0,0,1-.325.341c-.418.453-1.112,1.225-1.18,1.328-.093.164-.109.3-.038.363a.461.461,0,0,0,.518-.087c.074-.058.151-.119.225-.183a4.438,4.438,0,0,1,1.1-1.019,2.915,2.915,0,0,1,.373-.116,2.5,2.5,0,0,1,.646-.08,5.836,5.836,0,0,1,1.247.138.168.168,0,0,1,.135.19.17.17,0,0,1-.187.142c-.112-.013-.228-.032-.347-.048a5.72,5.72,0,0,0-.877-.087,2.774,2.774,0,0,0-.508.064,1.834,1.834,0,0,0-.379.145c-.042.026-.19.174-.325.305-.177.177-.4.4-.636.6a1.262,1.262,0,0,0-.19.36.288.288,0,0,0,.007.228.123.123,0,0,0,.106.055c.228.026.71-.193,1.321-.878a.207.207,0,0,1,.135-.055Zm7.1,8.731c-.035,0-.071,0-.106,0a1.558,1.558,0,0,1-1.231-.743c-.652-1.222-1.17-2.3-1.546-3.089a10.6,10.6,0,0,0-.739-1.421,6.8,6.8,0,0,1-1.855-2.17,4.4,4.4,0,0,0-.489-.688c-.138-.032-.264-.071-.386-.1a5.964,5.964,0,0,0-.691-.164,2.257,2.257,0,0,1-1.543.919.458.458,0,0,1-.363-.219.574.574,0,0,1-.064-.4.67.67,0,0,1-.672-.077c-.074-.064-.289-.309-.042-.762-.392.283-.63.161-.717.09a.67.67,0,0,1-.055-.826,11.373,11.373,0,0,1,1.948-2.208,9.938,9.938,0,0,1,3.047-.566,4.234,4.234,0,0,0-1.849-1.1,3.465,3.465,0,0,0-.421.045c-.878.119-1.765.2-2.128-.17a.588.588,0,0,1-.148-.524c.09-.556,2.286-.711,3.122-.595a6.54,6.54,0,0,1,2.36.919c.26.141.53.289.833.444.788.4,2.806,3.475,3.411,4.88a9.692,9.692,0,0,0,2.491,3.53c.1.1.206.2.306.3h0c.919.919.183,2.524-.4,3.331a2.659,2.659,0,0,1-2.077,1.363Z" transform="translate(-345.118 -140.331)"/>
    <path id="Path_27940" data-name="Path 27940" d="M585.7,302.3c-.283-1.479.434-4.208,1.045-4.764a9.726,9.726,0,0,1,2.671-2.128c.9-.383,2.807-.646,2.948-.338.444.971-2.173,1-2.36,1.125a4.237,4.237,0,0,0-1.7,1.929,10.912,10.912,0,0,1,3.337-.338,11.465,11.465,0,0,1,2.389,1.566c.37.4.241.926-.469.6a11.949,11.949,0,0,1-2.013-.929,6.124,6.124,0,0,0-2.79.534,4.255,4.255,0,0,1,2.8-.53c.1.051,1.791,1.109,1.91,1.231.5.5-.013.887-.569.669-.627-.248-1.35-.733-1.5-.765a3.58,3.58,0,0,0-2.154.5,3.835,3.835,0,0,1,2.112-.53c.148.016,1.842.743,1.672,1.379-.09.341-.794.366-1.848-.315a10.53,10.53,0,0,0-1.074.591c-.26.141-.627,2.5-1.534,3.408a16.825,16.825,0,0,0-.511,3.392c-.2,1.755-2.051-4.71-2.356-6.285Z" transform="translate(-294.635 -102.469)" fill="#fff"/>
    <path id="Path_27942" data-name="Path 27942" d="M633.63,312.65l.026,6.172,6.709-3.157Z" transform="translate(-327.203 -114.487)" fill="#da1e37"/>
    <path id="Path_27943" data-name="Path 27943" d="M633.438,312.561l.026,5.645,6.137-2.89-6.163-2.755Zm-.141,6.079a.173.173,0,0,1-.09-.026.168.168,0,0,1-.077-.141L633.1,312.3a.169.169,0,0,1,.238-.154l6.735,3.012a.165.165,0,0,1,.1.151.17.17,0,0,1-.1.154l-6.709,3.157a.176.176,0,0,1-.071.016Z" transform="translate(-326.843 -114.138)"/>
    <path id="Path_27944" data-name="Path 27944" d="M604.944,285.915h-.006l-1.347-.058a.169.169,0,0,1,.013-.338l1.347.058a.169.169,0,0,1,.161.177.167.167,0,0,1-.167.161Zm2.691.113h-.006l-1.347-.058a.167.167,0,1,1,.016-.334l1.347.058a.168.168,0,0,1,.161.174.172.172,0,0,1-.17.161Zm2.691.116h-.006l-1.347-.058a.169.169,0,0,1-.161-.177.166.166,0,0,1,.174-.161l1.347.058a.169.169,0,0,1,.161.177.167.167,0,0,1-.167.161Zm2.694.113h-.006l-1.347-.058a.169.169,0,0,1,.013-.338l1.347.058a.169.169,0,0,1,.161.177.167.167,0,0,1-.167.161Zm2.691.113H615.7l-1.347-.058a.169.169,0,0,1,.013-.338l1.347.058a.169.169,0,0,1,.161.177.167.167,0,0,1-.167.161Zm2.691.116h-.007l-1.347-.058a.167.167,0,1,1,.013-.334l1.347.058a.169.169,0,0,1,.161.177.166.166,0,0,1-.167.157Zm2.694.113h-.006l-1.347-.058a.169.169,0,0,1-.161-.177.167.167,0,0,1,.177-.161l1.347.058a.168.168,0,0,1,.161.174.175.175,0,0,1-.17.164Zm2.691.113h-.006l-1.347-.058a.169.169,0,0,1,.016-.338l1.347.058a.169.169,0,0,1,.161.177.172.172,0,0,1-.17.161Zm2.691.116h-.006l-1.347-.058a.168.168,0,0,1-.161-.174.171.171,0,0,1,.174-.161l1.347.058a.167.167,0,0,1-.006.334Zm2.691.113h-.006l-1.347-.058a.168.168,0,0,1-.161-.174.17.17,0,0,1,.174-.161l1.347.058a.169.169,0,0,1,.161.177.164.164,0,0,1-.167.158Z" transform="translate(-306.711 -96.079)"/>
    <path id="Path_27945" data-name="Path 27945" d="M595.057,363.467h0l-1.35-.019a.169.169,0,0,1,0-.338h0l1.347.019a.169.169,0,0,1,.167.17.166.166,0,0,1-.167.167Zm2.694.035h0l-1.35-.019a.169.169,0,1,1,0-.338l1.347.019a.169.169,0,0,1,.167.17.166.166,0,0,1-.167.167Zm2.694.039h0l-1.35-.019a.169.169,0,0,1,0-.338h0l1.347.019a.169.169,0,0,1,.167.17.166.166,0,0,1-.167.167Zm2.694.039h0l-1.35-.019a.169.169,0,0,1-.167-.17.173.173,0,0,1,.17-.167l1.347.019a.169.169,0,0,1,.167.17.166.166,0,0,1-.167.167Zm2.694.035h0l-1.35-.019a.171.171,0,0,1-.167-.17.168.168,0,0,1,.167-.167h0l1.347.019a.169.169,0,0,1,.167.17.166.166,0,0,1-.167.167Zm2.694.039h0l-1.35-.019a.169.169,0,0,1,0-.338h0l1.347.019a.171.171,0,0,1,.167.17.166.166,0,0,1-.167.167Zm2.694.035h0l-1.35-.019a.169.169,0,1,1,0-.338l1.347.019a.171.171,0,0,1,.167.17.166.166,0,0,1-.167.167Zm2.694.039h0l-1.35-.019a.169.169,0,0,1-.167-.17.167.167,0,0,1,.17-.167l1.347.019a.169.169,0,0,1,0,.338Z" transform="translate(-300.001 -148.726)"/>
    <path id="Path_27946" data-name="Path 27946" d="M709.527,390.61H709.5c-.463-.055-7.577-6.359-9.6-8.32a.168.168,0,0,1,.235-.241c2.4,2.327,8.84,7.95,9.416,8.227.688-.055,6.735-4.684,9.017-6.433a.168.168,0,1,1,.2.267c-6.166,4.719-8.7,6.5-9.245,6.5Z" transform="translate(-372.136 -161.544)"/>
    <path id="Path_27947" data-name="Path 27947" d="M699.779,407.516a3.037,3.037,0,0,1-.971-.145c-2.077-.694-8.542-9.657-10.667-12.6l-.244-.341a3.716,3.716,0,0,1-.63-3.118.168.168,0,0,1,.3.148,3.452,3.452,0,0,0,.6,2.771l.248.341c5.658,7.844,9.191,12.042,10.5,12.48,2.054.685,6.426-1.414,13-6.246a.168.168,0,1,1,.2.27c-5.88,4.324-9.937,6.442-12.338,6.442Z" transform="translate(-363.493 -167.796)"/>
    <path id="Path_27948" data-name="Path 27948" d="M693.014,395.734a.053.053,0,0,1-.055-.048.058.058,0,0,1,.048-.064,5.272,5.272,0,0,0,2.987-2.112.057.057,0,0,1,.087.074,5.36,5.36,0,0,1-3.054,2.151Z" transform="translate(-367.459 -169.34)"/>
    <path id="Path_27949" data-name="Path 27949" d="M695.112,401.548a.057.057,0,0,1-.013-.112,2.764,2.764,0,0,0,1.324-.71.054.054,0,0,1,.081,0,.056.056,0,0,1,0,.08,2.877,2.877,0,0,1-1.379.739Z" transform="translate(-368.882 -174.237)"/>
    <path id="Path_27950" data-name="Path 27950" d="M701.393,474.918a60.031,60.031,0,0,1-13.283-1.591.058.058,0,0,1-.042-.067.056.056,0,0,1,.068-.042c2.993.717,13.463,2.877,22.526.511a.055.055,0,1,1,.029.106,37.145,37.145,0,0,1-9.3,1.083Z" transform="translate(-364.139 -223.436)"/>
    <path id="Path_27951" data-name="Path 27951" d="M628.566,292.131h0l-27.046-1.3a.052.052,0,0,1-.051-.058.053.053,0,0,1,.058-.055l27.043,1.3a.059.059,0,0,1,.055.058.057.057,0,0,1-.058.055Z" transform="translate(-305.381 -99.607)"/>
    <path id="Path_27952" data-name="Path 27952" d="M616.371,358.94h0l-22.416-.437a.055.055,0,0,1-.055-.058.053.053,0,0,1,.058-.055l22.413.437a.055.055,0,0,1,.055.058.054.054,0,0,1-.055.055Z" transform="translate(-300.245 -145.523)"/>
    <path id="Path_27953" data-name="Path 27953" d="M680.835,400.7a.14.14,0,0,1-.061-.013.171.171,0,0,1-.1-.219l1.238-3.186a.169.169,0,1,1,.315.122l-1.238,3.186a.165.165,0,0,1-.157.109Z" transform="translate(-359.118 -171.841)"/>
    <path id="Path_27955" data-name="Path 27955" d="M549.454,225.391h16.09v-2.806h-16.09v2.806Zm16.26.338H549.287a.166.166,0,0,1-.167-.167v-3.144a.166.166,0,0,1,.167-.167h16.427a.166.166,0,0,1,.167.167v3.144a.168.168,0,0,1-.167.167Z" transform="translate(-269.861 -53.148)"/>
    <path id="Path_27956" data-name="Path 27956" d="M600.1,245.044V241.9h13.82v3.144Z" transform="translate(-304.452 -66.481)" fill="#ffd42e"/>
    <path id="Path_27958" data-name="Path 27958" d="M578.39,207.624V204.48h27.779v3.144Z" transform="translate(-289.721 -41.091)" fill="#fff"/>
    <path id="Path_27960" data-name="Path 27960" d="M235.19,443.084V439.94h16.427v3.144Z" transform="translate(-56.851 -200.857)" fill="#da1e37"/>
    <path id="Path_27961" data-name="Path 27961" d="M235,442.564h16.09v-2.806H235v2.806Zm16.26.334H234.837a.168.168,0,0,1-.167-.167v-3.144a.166.166,0,0,1,.167-.167h16.427a.166.166,0,0,1,.167.167v3.144a.166.166,0,0,1-.167.167Z" transform="translate(-56.498 -200.504)"/>
    <path id="Path_27964" data-name="Path 27964" d="M374.55,255.9a24.849,24.849,0,0,0-.469,5.51l2.234.868s1.369,5.632-7.262,3.906c-1.678-.334-6.532-4.022-6.532-4.022l3.838-1.1s.366-5.581.514-8.352a72.572,72.572,0,0,0,7.677,3.186Z" transform="translate(-143.248 -73.816)" fill="#fff"/>
    <path id="Path_27965" data-name="Path 27965" d="M362.535,261.862c1.042.775,4.8,3.51,6.192,3.79,3.112.621,5.246.36,6.346-.781a3.367,3.367,0,0,0,.736-2.835l-2.147-.836a.167.167,0,0,1-.106-.151,25.633,25.633,0,0,1,.44-5.4,72.2,72.2,0,0,1-7.323-3.044c-.154,2.816-.5,8.053-.5,8.108a.168.168,0,0,1-.122.151l-3.514,1Zm9.1,4.449a15.35,15.35,0,0,1-2.977-.331c-1.694-.338-6.4-3.9-6.6-4.054a.168.168,0,0,1,.055-.3l3.726-1.064c.055-.823.373-5.716.508-8.233a.168.168,0,0,1,.08-.135.171.171,0,0,1,.158-.01,72.093,72.093,0,0,0,7.654,3.179.166.166,0,0,1,.113.2,24.462,24.462,0,0,0-.466,5.356l2.128.826a.169.169,0,0,1,.1.116,3.7,3.7,0,0,1-.8,3.228,4.886,4.886,0,0,1-3.678,1.218Z" transform="translate(-142.89 -73.453)"/>
    <path id="Path_27967" data-name="Path 27967" d="M359.937,198.189a1.753,1.753,0,0,0-.672.135,1.821,1.821,0,0,0-1.019,1.144,3.626,3.626,0,0,0,.669,3.051,1.73,1.73,0,0,0,.444.334.17.17,0,0,1,.084.116c.276,1.521.614,3.031,1.064,4.755a16.7,16.7,0,0,0,1.662,4.034,2.232,2.232,0,0,0,1.006,1.009,1.942,1.942,0,0,1,.36-.611,1.435,1.435,0,0,0,.341-.627,2.37,2.37,0,0,0-.042-.768,1.608,1.608,0,0,1,.158-1.283,10.3,10.3,0,0,0,1.62-3.835,4.854,4.854,0,0,0-.289-3.218,3.4,3.4,0,0,0-.746-.961.172.172,0,0,1-.039-.2,5.8,5.8,0,0,0,.341-.852.166.166,0,0,1,.141-.116.17.17,0,0,1,.164.084,3.078,3.078,0,0,0,1.961,1.73,1.6,1.6,0,0,0,2.025-.8.171.171,0,0,1,.17-.113.167.167,0,0,1,.154.132,3.369,3.369,0,0,0,2.2,2.009c.736.074.987-.231,1.308-1a.163.163,0,0,1,.119-.1.165.165,0,0,1,.148.039c.186.164.36.331.527.489a4.669,4.669,0,0,0,1.469,1.09,2.043,2.043,0,0,0,1.6-.106,2.167,2.167,0,0,0,1.141-1.286,2.374,2.374,0,0,0-1.418-2.848.169.169,0,0,1,.09-.325.98.98,0,0,0,.826-.209,1.444,1.444,0,0,0,.556-1.083,2.133,2.133,0,0,0-1.212-1.826,5.55,5.55,0,0,0-1.871-.453c-.154-.019-.305-.039-.457-.061a.171.171,0,0,1-.122-.08.164.164,0,0,1-.013-.145,1.959,1.959,0,0,0-.707-2.135,3.1,3.1,0,0,0-2.292-.511,2.762,2.762,0,0,0-1.45.553,1.771,1.771,0,0,0-.643,1.411.167.167,0,0,1-.3.109,2.929,2.929,0,0,0-2.855-1.215,2.985,2.985,0,0,0-1.91,2.414.165.165,0,0,1-.119.145.167.167,0,0,1-.18-.055,2.415,2.415,0,0,0-1.945-1.1,1.485,1.485,0,0,0-1.263.624,2.777,2.777,0,0,0,.125,2.45.169.169,0,0,1-.042.186.171.171,0,0,1-.19.029,1.6,1.6,0,0,0-.682-.148Zm3.359,15a.175.175,0,0,1-.071-.016,2.6,2.6,0,0,1-1.35-1.244,17.078,17.078,0,0,1-1.694-4.118c-.444-1.7-.781-3.2-1.054-4.7a1.908,1.908,0,0,1-.46-.363,3.968,3.968,0,0,1-.736-3.379,2.155,2.155,0,0,1,1.209-1.35,2.058,2.058,0,0,1,1.276-.106,2.825,2.825,0,0,1,.032-2.411,1.823,1.823,0,0,1,1.53-.781,2.538,2.538,0,0,1,1.987.955,3.259,3.259,0,0,1,2.106-2.347,3.149,3.149,0,0,1,2.922,1.022,2.087,2.087,0,0,1,.739-1.263,3.08,3.08,0,0,1,1.623-.627,3.436,3.436,0,0,1,2.536.579,2.346,2.346,0,0,1,.878,2.321c.087.01.17.022.257.032a5.913,5.913,0,0,1,1.983.489,2.452,2.452,0,0,1,1.4,2.131,1.788,1.788,0,0,1-.688,1.344,1.517,1.517,0,0,1-.434.238,2.75,2.75,0,0,1,1.051,2.98,2.52,2.52,0,0,1-1.318,1.488,2.362,2.362,0,0,1-1.868.116,5.029,5.029,0,0,1-1.582-1.16c-.113-.106-.228-.215-.347-.325a1.377,1.377,0,0,1-1.559.987,3.781,3.781,0,0,1-2.356-1.89,2,2,0,0,1-2.263.649,3.158,3.158,0,0,1-1.961-1.566c-.058.154-.119.3-.186.44a3.724,3.724,0,0,1,.727.971,5.18,5.18,0,0,1,.318,3.433,10.653,10.653,0,0,1-1.672,3.961,1.3,1.3,0,0,0-.1,1.038,2.636,2.636,0,0,1,.042.878,1.706,1.706,0,0,1-.408.778,1.252,1.252,0,0,0-.334.665.172.172,0,0,1-.084.135.188.188,0,0,1-.084.019Z" transform="translate(-140.05 -32.91)"/>
    <path id="Path_27969" data-name="Path 27969" d="M365.645,225.975a.17.17,0,0,1,.1.029.164.164,0,0,1,.071.112c.022.154.048.325.074.5.225,1.521.6,4.07,1.5,5.221a6.488,6.488,0,0,0,4.941,2.273,6.9,6.9,0,0,0,5.15-2.112,7.129,7.129,0,0,0,1.546-5.407c-.051-.833-.174-1.675-.3-2.491a22.978,22.978,0,0,1-.321-3.269h0v-.01l-.045-.016a5.029,5.029,0,0,1-1.582-1.161c-.113-.106-.228-.215-.347-.325a1.377,1.377,0,0,1-1.559.987,3.78,3.78,0,0,1-2.356-1.89,2,2,0,0,1-2.263.649,3.165,3.165,0,0,1-1.961-1.562,4.4,4.4,0,0,1-1.55,2.109,3.454,3.454,0,0,1-1.006.5c-.013.138-.022.254-.035.363l0,.039a13.733,13.733,0,0,0-.074,2.938.17.17,0,0,1-.087.167.165.165,0,0,1-.186-.019c-.788-.653-1.488-.675-2.086-.071a1.334,1.334,0,0,0,.035,1.881,2.6,2.6,0,0,0,2.315.572c.006-.006.016-.006.029-.006Zm6.8,8.477h-.122a6.849,6.849,0,0,1-5.2-2.4c-.958-1.222-1.325-3.723-1.569-5.378-.016-.116-.032-.228-.048-.331a2.9,2.9,0,0,1-2.45-.7,1.665,1.665,0,0,1-.035-2.353,1.633,1.633,0,0,1,2.234-.18,14.956,14.956,0,0,1,.106-2.636l0-.039c.016-.135.029-.283.045-.469a.168.168,0,0,1,.122-.148,3.13,3.13,0,0,0,1.013-.479,4.28,4.28,0,0,0,1.543-2.286.166.166,0,0,1,.141-.116.171.171,0,0,1,.164.084,3.078,3.078,0,0,0,1.961,1.73,1.6,1.6,0,0,0,2.025-.8.171.171,0,0,1,.17-.112.167.167,0,0,1,.154.132,3.369,3.369,0,0,0,2.2,2.009c.736.074.987-.231,1.308-1a.163.163,0,0,1,.119-.1.165.165,0,0,1,.148.039c.186.164.36.331.527.489a4.67,4.67,0,0,0,1.469,1.09c.045.016.093.032.138.045a.166.166,0,0,1,.122.161v.135h0a22.918,22.918,0,0,0,.318,3.221c.122.823.247,1.675.3,2.52a7.472,7.472,0,0,1-1.633,5.655,7.212,7.212,0,0,1-5.272,2.218Z" transform="translate(-143.268 -49.544)"/>
    <path id="Path_27974" data-name="Path 27974" d="M371.25,237.324a.169.169,0,0,1-.167-.148c-.071-.53-.1-.813-.145-1.324a.167.167,0,0,1,.151-.183.169.169,0,0,1,.183.151c.048.508.074.788.141,1.312a.167.167,0,0,1-.145.19.041.041,0,0,1-.019,0Z" transform="translate(-148.959 -62.252)"/>
    <path id="Path_27975" data-name="Path 27975" d="M417.363,221.322a.059.059,0,0,1-.039-.016.056.056,0,0,1,0-.08,1.613,1.613,0,0,0,.366-1.611.056.056,0,1,1,.106-.035,1.733,1.733,0,0,1-.4,1.723.046.046,0,0,1-.039.019Z" transform="translate(-180.422 -51.31)"/>
    <path id="Path_27976" data-name="Path 27976" d="M363.231,217.3a.062.062,0,0,1-.039-.013,2.609,2.609,0,0,1-.72-2.758.056.056,0,0,1,.106.035,2.5,2.5,0,0,0,.691,2.639.059.059,0,0,1,.006.08.077.077,0,0,1-.045.016Z" transform="translate(-143.123 -47.884)"/>
    <path id="Path_27977" data-name="Path 27977" d="M477.222,258.173c1.906-4.388,4.144-12.46,6.407-16.749a12.334,12.334,0,0,0,3.973-4.192c.347-.662.4-.948.035-1.524a1.149,1.149,0,0,0-1.331-.28c.27-.405.778-.717.325-1.286a.777.777,0,0,0-.839-.321c.334-.865-.556-1.6-1.3-.862.662-1.016,1.263-1.922,1.922-2.851.408-.575.833-1.276.492-1.617-.437-.437-1.1.158-1.893,1.1a42.947,42.947,0,0,1-3.212,3.565c-1.331,1.331-2.749,4-2.2,5.208-.444,1.842-7.175,12.531-9.384,14.736-.807.807-.148,1.582.042,2.707.228,1.357,1.222,6.137,4.668,4.581a7.01,7.01,0,0,0,2.289-2.218Z" transform="translate(-216.061 -57.284)" fill="#fff"/>
    <path id="Path_27979" data-name="Path 27979" d="M516.129,252.576a.64.64,0,0,1-.408-.138.7.7,0,0,1-.2-.72,1.567,1.567,0,0,1,.331-.572,4.424,4.424,0,0,1,.881-.887c.112-.09.254-.2.447-.363a.168.168,0,1,1,.215.257c-.2.164-.341.28-.457.37a4.09,4.09,0,0,0-.829.836,1.209,1.209,0,0,0-.267.447.316.316,0,0,0,.45.4,1.462,1.462,0,0,0,.411-.286l.665-.582a.169.169,0,0,1,.222.254l-.666.582a1.743,1.743,0,0,1-.514.347.709.709,0,0,1-.286.055Z" transform="translate(-247.047 -71.879)"/>
    <path id="Path_27980" data-name="Path 27980" d="M512.472,248.606a.535.535,0,0,1-.26-.061.752.752,0,0,1-.3-.852c.109-.5.845-1.4,2.257-2.745l.048-.045a.168.168,0,0,1,.232.244l-.048.045c-1.668,1.595-2.1,2.276-2.157,2.572-.039.186-.01.411.125.479a.567.567,0,0,0,.421-.058c.161-.064.321-.135.479-.209a.169.169,0,0,1,.145.305c-.161.077-.328.148-.5.215a1.169,1.169,0,0,1-.444.109Z" transform="translate(-244.596 -68.487)"/>
    <path id="Path_27981" data-name="Path 27981" d="M505.243,250a.162.162,0,0,1-.077-.019.17.17,0,0,1-.071-.228,2.072,2.072,0,0,0-.193-1.816c-.177-.408-.318-.73-.116-.945a2.831,2.831,0,0,1,1.566-.4,2.847,2.847,0,0,0,.3-.032.719.719,0,0,0,.479-.354.268.268,0,0,0,.023-.158,1.142,1.142,0,0,0-.36-.4,9.29,9.29,0,0,0-2.09-.048c-.112.006-.209.01-.286.013a2,2,0,0,0-1.08.5.168.168,0,0,1-.321-.1c.112-.383,1.067-.733,1.392-.743.074,0,.17-.006.283-.013a8.715,8.715,0,0,1,2.212.064,1.346,1.346,0,0,1,.563.585.536.536,0,0,1-.022.431,1.036,1.036,0,0,1-.685.537,1.93,1.93,0,0,1-.373.045,3.193,3.193,0,0,0-1.347.289c-.051.055.093.383.18.582a2.371,2.371,0,0,1,.183,2.109.186.186,0,0,1-.158.093Z" transform="translate(-238.573 -68.74)"/>
    <path id="Path_27982" data-name="Path 27982" d="M512.4,243.331a.155.155,0,0,1-.084-.023.169.169,0,0,1-.061-.231,5.693,5.693,0,0,1,.637-.755c.116-.125.225-.241.3-.328a.169.169,0,0,1,.257.219c-.077.09-.19.212-.309.341a5.839,5.839,0,0,0-.591.694.175.175,0,0,1-.148.084Z" transform="translate(-244.828 -66.505)"/>
    <path id="Path_27983" data-name="Path 27983" d="M510.386,251.672a.681.681,0,0,1-.53-.283.973.973,0,0,1,.074-1.138.168.168,0,0,1,.286.177.692.692,0,0,0-.087.762.313.313,0,0,0,.3.141.167.167,0,0,1,.08.325.5.5,0,0,1-.119.016Z" transform="translate(-243.121 -72.094)"/>
    <path id="Path_27985" data-name="Path 27985" d="M363.179,287.313Zm-43.907,29.836a56.2,56.2,0,0,0,9.6,2.344c4.915.736,11.718.948,16.276-2.189.145-.788.328-1.739.54-2.835,1.1-5.684,2.935-15.2,2.665-18.932a.171.171,0,0,1,.061-.141.162.162,0,0,1,.151-.032,41.346,41.346,0,0,0,12.29.945c4.163-.254,6.455-.91,6.606-1.218a.407.407,0,0,0-.129-.084c-3.79-1.755-3.944-4.98-4.028-6.716a2.856,2.856,0,0,0-.129-.987,5.981,5.981,0,0,0-1.083-.122c-2.337-.167-7.815-.563-12.206-4.485-2.315-2.067-5.571-2.652-7.323-2.967-.37-.068-.665-.119-.865-.174-.874,2.556-1.6,3.237-5.005,3.456a6.812,6.812,0,0,1-3.517-.7,3.932,3.932,0,0,1-2.115-3.212c-3.883.267-9.12,1.225-11.345,3.083-4.076,3.4-4.835,8.371-5.639,13.627-.18,1.18-.366,2.4-.592,3.588l-.164-.032.164.032c-1.144,6.021-.383,10.731.141,11.956a.963.963,0,0,0,.688.277,11.657,11.657,0,0,0,1.392-.62c2.17-1.048,4.018-1.884,4.677-1.472a.527.527,0,0,1,.244.479,27.365,27.365,0,0,1-1.353,7.137Zm15.4,3.141a39.753,39.753,0,0,1-5.86-.463A55.806,55.806,0,0,1,319,317.413a.169.169,0,0,1-.1-.212,27.9,27.9,0,0,0,1.392-7.185c0-.125-.045-.17-.087-.2-.553-.347-3.025.849-4.353,1.488a9.573,9.573,0,0,1-1.479.649,1.2,1.2,0,0,1-1.058-.476c-.691-1.614-1.218-6.593-.161-12.152.225-1.18.411-2.4.591-3.575.778-5.089,1.582-10.351,5.754-13.836,2.318-1.935,7.754-2.916,11.7-3.17a.168.168,0,0,1,.122.042.176.176,0,0,1,.058.116,3.587,3.587,0,0,0,1.955,3.105,6.447,6.447,0,0,0,3.334.665c3.366-.215,3.906-.833,4.761-3.382a.154.154,0,0,1,.09-.1.158.158,0,0,1,.132,0,7.3,7.3,0,0,0,.968.209c1.784.321,5.1.919,7.487,3.048,4.3,3.845,9.7,4.234,12,4.4.881.064,1.164.09,1.292.215.183.183.2.572.231,1.215.08,1.662.228,4.755,3.832,6.423.36.167.347.379.309.492-.251.691-3.671,1.254-6.921,1.453a42.016,42.016,0,0,1-12.158-.9c.186,3.912-1.537,12.84-2.687,18.787-.219,1.128-.405,2.1-.553,2.9a.155.155,0,0,1-.071.106c-2.993,2.1-6.947,2.749-10.715,2.749Z" transform="translate(-109.345 -91.484)"/>
    <path id="Path_27993" data-name="Path 27993" d="M321.8,353.015c-4.655,1.112-5.15,2.607-5.687,5.369-.2,1.013.016,1.222.511,1.437,2.636,1.132,5.741.264,14.965-2.315,1.385-.389,2.954-.826,4.661-1.3a11.976,11.976,0,0,1,2.536-.518,7.319,7.319,0,0,0,3.536-.926,1.159,1.159,0,0,1,1.058.035,15.316,15.316,0,0,1,2.752,1.45l.01,0c.231.135.318.174.469.013.029-.032.074-.138-.106-.463a1.319,1.319,0,0,0-.254-.325A7.477,7.477,0,0,0,343.81,354a.165.165,0,0,1-.106-.135.169.169,0,0,1,.071-.157,1.864,1.864,0,0,1,1.755,0,11.231,11.231,0,0,1,1.945,1.135c.3.2.611.415.926.6a1.167,1.167,0,0,0,.4.177.268.268,0,0,0,.354-.289,18.1,18.1,0,0,0-3.674-2.829.167.167,0,0,1-.109-.177.171.171,0,0,1,.148-.148c.158-.019.643-.074,4.214,2.774.055.042.093.074.112.09a.335.335,0,0,0,.2.083c-.006,0,0-.016-.013-.077a3.825,3.825,0,0,0-1.318-2.093,10.6,10.6,0,0,0-2.051-1.508.168.168,0,0,1,.151-.3,7.854,7.854,0,0,1,3.774,3.719.314.314,0,0,0,.357-.071,3.9,3.9,0,0,0-.913-2.176,8.408,8.408,0,0,0-4.083-3.019.168.168,0,0,1-.035-.016c-.44-.248-2.485.4-5.086,1.594a4.961,4.961,0,0,1-1.344.437c-.141.019-.4.058-.7.1-.839.122-2.109.305-2.427.357-.006,0-.01,0-.016,0-4.748.315-9.657.653-14.54.926Zm-2.642,7.629a6.546,6.546,0,0,1-2.665-.514c-.739-.318-.913-.759-.707-1.81.546-2.823,1.093-4.475,5.954-5.635a.089.089,0,0,1,.029,0c4.883-.273,9.8-.608,14.543-.935.334-.055,1.591-.238,2.427-.357.305-.045.559-.08.7-.1a4.642,4.642,0,0,0,1.251-.411c1.344-.62,4.546-2.009,5.375-1.595a8.617,8.617,0,0,1,4.237,3.131c.537.694,1.3,2.26.871,2.636a.63.63,0,0,1-.8.08.373.373,0,0,1-.051.18.32.32,0,0,1-.222.151.64.64,0,0,1-.466-.151c-.019-.016-.058-.048-.113-.09-.039-.032-.077-.061-.116-.093a.346.346,0,0,1,.08.167.6.6,0,0,1-.743.659,1.473,1.473,0,0,1-.514-.219c-.318-.2-.633-.408-.939-.614a10.879,10.879,0,0,0-1.887-1.1,2.007,2.007,0,0,0-1.09-.18,7.776,7.776,0,0,1,2.167,1.392,1.588,1.588,0,0,1,.318.408c.08.141.321.579.058.858a.623.623,0,0,1-.884.045l-.016-.01a14.756,14.756,0,0,0-2.7-1.424.9.9,0,0,0-.752-.064,7.654,7.654,0,0,1-3.7.981,11.6,11.6,0,0,0-2.466.5c-1.707.469-3.276.91-4.661,1.3-6.574,1.845-10.069,2.823-12.521,2.823Z" transform="translate(-111.479 -139.29)"/>
    <path id="Path_27994" data-name="Path 27994" d="M343.2,325.012a.145.145,0,0,1-.051-.01.169.169,0,0,1-.106-.212c1.81-5.478,2.832-8.94,2.832-16.443a.167.167,0,0,1,.334,0c0,7.555-1.029,11.039-2.848,16.549a.169.169,0,0,1-.161.116Z" transform="translate(-130.026 -111.454)"/>
    <path id="Path_27995" data-name="Path 27995" d="M423.956,318.886Zm.109.3a.165.165,0,0,1-.125-.058.169.169,0,0,1-.019-.2c.019-.1.026-.5.035-1.087.013-.829.032-2.215.109-4.317a.167.167,0,0,1,.334.013c-.077,2.1-.1,3.485-.109,4.311-.016,1.115-.016,1.206-.112,1.292a.166.166,0,0,1-.113.045Z" transform="translate(-184.894 -114.969)"/>
    <path id="Path_27996" data-name="Path 27996" d="M371.859,319.236a82.364,82.364,0,0,1-10.7-.765.057.057,0,0,1,.016-.113c5.706.8,15.424,1.363,18.809-.36a.057.057,0,0,1,.051.1c-1.643.833-4.755,1.135-8.175,1.135Z" transform="translate(-142.29 -118.112)" fill="#fff"/>
    <path id="Path_27997" data-name="Path 27997" d="M367.129,333.442a37.846,37.846,0,0,1-7.564-.733.061.061,0,0,1-.045-.067.058.058,0,0,1,.068-.045,45.281,45.281,0,0,0,19.327-.749.055.055,0,0,1,.068.042.058.058,0,0,1-.042.067,50.393,50.393,0,0,1-11.811,1.485Z" transform="translate(-141.211 -127.512)" fill="#fff"/>
    <path id="Path_27998" data-name="Path 27998" d="M313.585,357.678a.048.048,0,0,1-.035-.013.059.059,0,0,1-.006-.08,10.067,10.067,0,0,1,9.2-3.347.057.057,0,0,1,.045.064.053.053,0,0,1-.064.045,9.949,9.949,0,0,0-9.094,3.308.066.066,0,0,1-.045.023Z" transform="translate(-110.007 -142.615)" fill="#fff"/>
    <path id="Path_27999" data-name="Path 27999" d="M314.822,353.624a.055.055,0,0,1-.051-.035.057.057,0,0,1,.032-.074,3.163,3.163,0,0,0,.89-.63c.1-.087.2-.18.3-.264a4.582,4.582,0,0,1,2.218-.984.055.055,0,0,1,.064.048.057.057,0,0,1-.048.064,4.46,4.46,0,0,0-2.164.958c-.1.084-.2.173-.3.26a3.241,3.241,0,0,1-.923.649.035.035,0,0,1-.022.006Z" transform="translate(-110.845 -140.941)" fill="#fff"/>
    <path id="Path_28000" data-name="Path 28000" d="M466.141,310.494a.055.055,0,0,1-.051-.035,10.986,10.986,0,0,1-.807-4.414.056.056,0,1,1,.112,0,10.886,10.886,0,0,0,.8,4.369.058.058,0,0,1-.029.074.062.062,0,0,1-.022,0Z" transform="translate(-212.972 -109.968)" fill="#fff"/>
    <path id="Path_28001" data-name="Path 28001" d="M461.195,307.729a.058.058,0,0,1-.055-.045,5.133,5.133,0,0,1-.1-1.643.055.055,0,0,1,.061-.051.057.057,0,0,1,.051.061,5,5,0,0,0,.1,1.607.058.058,0,0,1-.042.068s-.006,0-.013,0Z" transform="translate(-210.077 -109.968)" fill="#fff"/>
    <path id="Path_28002" data-name="Path 28002" d="M341.793,331.7a.22.22,0,0,1-.045-.006.17.17,0,0,1-.119-.206,80.56,80.56,0,0,0,2.488-13.778.168.168,0,1,1,.334.032,81.235,81.235,0,0,1-2.5,13.836.165.165,0,0,1-.161.122Z" transform="translate(-129.069 -117.817)" fill="#fff"/>
    <path id="Path_28003" data-name="Path 28003" d="M425.054,322.531a.166.166,0,0,1-.167-.167l-.077-5.144a.169.169,0,0,1,.167-.17.171.171,0,0,1,.17.167l.077,5.144a.176.176,0,0,1-.17.17Z" transform="translate(-185.513 -117.473)" fill="#fff"/>
    <g id="Group_17860" data-name="Group 17860">
      <path id="Path_27807" data-name="Path 27807" d="M791.79,309.315a2.916,2.916,0,0,0,1.466-1.353,4.956,4.956,0,0,0,.527-1.951,6.065,6.065,0,0,0,.379,1.89,2.039,2.039,0,0,0,1.389,1.238,1.975,1.975,0,0,0-1.366,1.138,4.746,4.746,0,0,0-.376,1.8,4.472,4.472,0,0,0-.453-1.678,2.27,2.27,0,0,0-1.566-1.08Z" transform="translate(-434.519 -109.98)" fill="#ffd42e"/>
      <path id="Path_27809" data-name="Path 27809" d="M840.89,286.526a2.23,2.23,0,0,0,1.18-.929,3,3,0,0,0,.424-1.337,3.526,3.526,0,0,0,.309,1.292,1.58,1.58,0,0,0,1.119.849,1.558,1.558,0,0,0-1.1.778,2.841,2.841,0,0,0-.3,1.231,2.729,2.729,0,0,0-.363-1.151,1.892,1.892,0,0,0-1.263-.733Z" transform="translate(-467.834 -95.223)" fill="#ffd42e"/>
      <path id="Path_27811" data-name="Path 27811" d="M806.09,270.982c.932-.35,1.575-.53,2.029-1.318a7.077,7.077,0,0,0,.678-2.884,6.864,6.864,0,0,0,.659,2.414,2.944,2.944,0,0,0,2.131,1.524,2.874,2.874,0,0,0-1.983,1.54,5.438,5.438,0,0,0-.476,2.337,6.67,6.67,0,0,0-.71-2.479,3.185,3.185,0,0,0-2.327-1.135Z" transform="translate(-444.222 -83.363)" fill="#ffd42e"/>
      <path id="Path_27813" data-name="Path 27813" d="M837.282,319.1,823.61,306.225l1.655-1.755,13.672,12.875a.7.7,0,0,1,.032,1.061l-.624.662a.756.756,0,0,1-1.064.032Z" transform="translate(-456.109 -108.936)"/>
      <path id="Path_27819" data-name="Path 27819" d="M780.08,234.833c0-1.961.476-2.083,1.067-2.083s1.067.151,1.067,2.083c0,2.131-.476,2.083-1.067,2.083s-1.067-.257-1.067-2.083Z" transform="translate(-426.573 -60.271)"/>
      <path id="Path_27902" data-name="Path 27902" d="M728.345,193.988a.887.887,0,1,0,.887.887.889.889,0,0,0-.887-.887Zm0,2.112a1.225,1.225,0,1,1,1.225-1.225,1.227,1.227,0,0,1-1.225,1.225Z" transform="translate(-390.639 -33.742)"/>
      <path id="Path_27905" data-name="Path 27905" d="M812.84,406.256a.826.826,0,1,1,.826.826.826.826,0,0,1-.826-.826Z" transform="translate(-448.802 -177.439)"/>
      <path id="Path_27913" data-name="Path 27913" d="M732.943,323.74a6.817,6.817,0,0,0,3.205,7.114c1.337.714,2.9.884,4.285,1.488s2.694,1.926,2.469,3.424c-.148.993-1.064,3.16,1.7,4.947,2.286,1.472.778,7.275-7.211,8.567-2.45.4-.649-1.279-3.012-2.032a11.111,11.111,0,0,1-5.664-4.459,20.214,20.214,0,0,1-2.761-6.761c-.643-2.745-.932-5.713.138-8.32s3.845-4.684,6.847-3.97Z" transform="translate(-389.459 -121.914)"/>
      <path id="Path_27923" data-name="Path 27923" d="M750.529,276.013a4.969,4.969,0,1,0-5.359,4.546,4.968,4.968,0,0,0,5.359-4.546Z" transform="translate(-399.79 -85.98)"/>
      <path id="Path_27925" data-name="Path 27925" d="M718.793,300.927a13.95,13.95,0,0,1-.161-6.243c-5.343.849-9.612-.379-13.692-2.18a8.263,8.263,0,0,1,1.514-2.794,7.785,7.785,0,0,1,5.77-2.546,12.738,12.738,0,0,1,6.42,1.347,9.843,9.843,0,0,1,3.832,4.427,8.72,8.72,0,0,1,.608,5.044,6.157,6.157,0,0,1-2.147,3.462,1.676,1.676,0,0,0-.939-.71,2.1,2.1,0,0,0-1.205.193Z" transform="translate(-375.589 -97.186)"/>
      <path id="Path_27934" data-name="Path 27934" d="M650.193,371.066c2.08-1.209,5.533-5.5,4.587-8.976-.5-1.852-1.392-8.522-11.117-9.146-.2,3.1-3.218,4.5-5.15,4.729-1.051.125-5.012.006-5.012-4.594a32.686,32.686,0,0,0-11.036,2.581,61.4,61.4,0,0,1-10.454,2.556s-6.661-8.522-9.053-12.017c-1.315-1.919-3.684,6.034-5.15,2.675-.222-.508,6.825,13.582,7.4,14.65,2.993,5.571,16.807,2.045,19.481,2.045a8.572,8.572,0,0,0,2.745,7.355,43.7,43.7,0,0,1-1.774,15.158s12.255,4.552,24.94.8c.974-.283-2.43-8.127-.405-17.819Z" transform="translate(-302.894 -137.045)" fill="#6366f1"/>
      <path id="Path_28004" data-name="Path 28004" d="M684.372,228.936a.175.175,0,0,1-.109-.039.171.171,0,0,1-.023-.238,14.9,14.9,0,0,0,3.414-10.3.166.166,0,0,1,.157-.177.165.165,0,0,1,.177.158,15.231,15.231,0,0,1-3.494,10.538.14.14,0,0,1-.122.061Z" transform="translate(-361.518 -50.387)"/>
      <path id="Path_28005" data-name="Path 28005" d="M694.987,247.124a.165.165,0,0,1-.125-.058.171.171,0,0,1,.013-.238,30.65,30.65,0,0,0,3.829-4.105.169.169,0,0,1,.238-.029.166.166,0,0,1,.029.235,31.112,31.112,0,0,1-3.871,4.15.153.153,0,0,1-.113.045Z" transform="translate(-368.722 -66.994)"/>
      <path id="Path_28006" data-name="Path 28006" d="M704.047,258.807a.16.16,0,0,1-.125-.058.168.168,0,0,1,.016-.238,13.384,13.384,0,0,1,5.664-2.932.168.168,0,1,1,.077.328,12.983,12.983,0,0,0-5.52,2.858.18.18,0,0,1-.113.042Z" transform="translate(-374.87 -75.76)"/>
      <path id="Path_28007" data-name="Path 28007" d="M763.991,436.5a2.509,2.509,0,0,0-.148,2.9,6.191,6.191,0,0,0,2.443,2.048,15.055,15.055,0,0,0,1.5.739c.026-.241.048-.482.054-.723a4.964,4.964,0,0,0-3.845-4.967Zm-11.21,21.892a.176.176,0,0,1-.1-.032.165.165,0,0,1-.032-.235c.977-1.3,2.148-2.691,3.707-2.733a5.422,5.422,0,0,1,1.524.254,2.689,2.689,0,0,0,2.128.019,3.146,3.146,0,0,0,1.006-1.318,4.934,4.934,0,0,1,.794-1.2,4.017,4.017,0,0,1,2.569-.906,7.393,7.393,0,0,0,1.469-.264,4.027,4.027,0,0,0,2.569-3.771,8.747,8.747,0,0,0-.379-2.167,9.335,9.335,0,0,1-.389-2.18,8.985,8.985,0,0,1,.1-1.324v0a14.812,14.812,0,0,1-1.617-.794,6.434,6.434,0,0,1-2.569-2.17,2.787,2.787,0,0,1,.273-3.379.163.163,0,0,1,.132-.039,5.3,5.3,0,0,1,4.215,5.317c-.007.283-.035.569-.068.846,1.813.7,3.784.935,5.131-.412a6.854,6.854,0,0,0,1.045-1.517c.174-.3.35-.617.55-.91a2.608,2.608,0,0,1,2.5-1.418.167.167,0,1,1-.064.328c-1.054-.209-1.916.926-2.154,1.276-.19.283-.367.588-.534.887a7.221,7.221,0,0,1-1.1,1.588c-1.45,1.45-3.517,1.238-5.41.518a8.693,8.693,0,0,0-.087,1.193,9.039,9.039,0,0,0,.379,2.1,9.118,9.118,0,0,1,.392,2.254,4.372,4.372,0,0,1-2.8,4.092,7.783,7.783,0,0,1-1.537.276,3.724,3.724,0,0,0-2.369.81,4.532,4.532,0,0,0-.733,1.116,3.416,3.416,0,0,1-1.132,1.447,2.987,2.987,0,0,1-2.392.019,5.361,5.361,0,0,0-1.427-.244c-1.408.035-2.517,1.36-3.446,2.6a.168.168,0,0,1-.138.074Z" transform="translate(-407.935 -198.287)"/>
      <g id="Group_17859" data-name="Group 17859">
        <path id="Path_27823" data-name="Path 27823" d="M459.48,436.045h0l-15.431-.08a.169.169,0,0,1,0-.338h0l15.193.08a15.475,15.475,0,0,1,.074-7.725,19.656,19.656,0,0,0,.029-7.519l-15.437-.125a.169.169,0,0,1,0-.338h0l15.572.129a.172.172,0,0,1,.164.129,19.916,19.916,0,0,1,0,7.8c-1.09,4.98-.019,7.731-.01,7.76a.181.181,0,0,1-.016.158.16.16,0,0,1-.138.074Z" transform="translate(-198.358 -187.326)"/>
        <path id="Path_27824" data-name="Path 27824" d="M459.341,459.857h0l-13.666-.055a.055.055,0,0,1-.055-.058.054.054,0,0,1,.055-.055h0l13.666.055a.055.055,0,0,1,.055.058.056.056,0,0,1-.055.055Z" transform="translate(-199.633 -214.258)"/>
        <path id="Path_27825" data-name="Path 27825" d="M462.013,429.553H447.885a.055.055,0,0,1-.055-.058.054.054,0,0,1,.055-.055h14.129a.054.054,0,0,1,.055.055.053.053,0,0,1-.055.058Z" transform="translate(-201.133 -193.732)"/>
        <path id="Path_27826" data-name="Path 27826" d="M447.164,464.454h-1.347a.167.167,0,1,1,0-.334h1.347a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,1,1,0-.334h1.347a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,1,1,0-.334h1.347a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.694,0H453.9a.167.167,0,0,1,0-.334h1.347a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Zm2.7,0H456.6a.167.167,0,0,1,0-.334h1.347a.166.166,0,0,1,.167.167.168.168,0,0,1-.167.167Zm1.852,0h-.508a.166.166,0,0,1-.167-.167.168.168,0,0,1,.167-.167h.508a.166.166,0,0,1,.167.167.164.164,0,0,1-.167.167Z" transform="translate(-199.653 -217.264)"/>
        <path id="Path_27827" data-name="Path 27827" d="M449,425.094h-1.347a.166.166,0,0,1-.167-.167.168.168,0,0,1,.167-.167H449a.166.166,0,0,1,.167.167.168.168,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,0,1,0-.334H451.7a.166.166,0,0,1,.167.167.168.168,0,0,1-.167.167Zm2.694,0h-1.347a.167.167,0,0,1,0-.334h1.347a.167.167,0,0,1,0,.334Zm2.694,0h-1.347a.167.167,0,1,1,0-.334h1.347a.167.167,0,0,1,0,.334Zm2.694,0h-1.347a.166.166,0,0,1-.167-.167.168.168,0,0,1,.167-.167h1.347a.167.167,0,0,1,0,.334Zm1.765,0h-.418a.167.167,0,1,1,0-.334h.418a.167.167,0,1,1,0,.334Z" transform="translate(-200.902 -190.557)"/>
        <path id="Path_27828" data-name="Path 27828" d="M561.65,437.025h0l-21.378-.129a.172.172,0,0,1-.164-.129,19.914,19.914,0,0,1,0-7.8c1.09-4.98.019-7.732.01-7.76a.168.168,0,0,1,.154-.232h0l21.237.08a.169.169,0,0,1,.167.17.166.166,0,0,1-.167.167h0l-21-.08a15.455,15.455,0,0,1-.071,7.725,19.64,19.64,0,0,0-.029,7.516l21.243.125a.169.169,0,0,1,.167.17.174.174,0,0,1-.17.17Z" transform="translate(-263.482 -187.992)"/>
        <path id="Path_27829" data-name="Path 27829" d="M565.088,429.607h0l-19.343-.055a.056.056,0,0,1,0-.112h0l19.343.055a.054.054,0,0,1,.055.055.062.062,0,0,1-.058.058Z" transform="translate(-267.534 -193.732)"/>
        <path id="Path_27830" data-name="Path 27830" d="M562.977,461.219H543.508a.057.057,0,0,1-.058-.055.055.055,0,0,1,.058-.055h19.469a.055.055,0,1,1,0,.109Z" transform="translate(-266.014 -215.221)"/>
        <path id="Path_27833" data-name="Path 27833" d="M503.745,439.15a8.337,8.337,0,0,0-.347,4.192c.257,1.675,2.4,7.667,2.4,7.667l2.967,1.919s.942-.164.874-.431c-.305-1.209-1.067-3.408-1.067-3.408a1.794,1.794,0,0,1-1.2-.839c-1.067-2.138-2.9-6.953-3.626-9.1Z" transform="translate(-238.756 -200.32)" fill="#fff"/>
        <path id="Path_27837" data-name="Path 27837" d="M514.572,438.82a8.337,8.337,0,0,1,.63,4.16c-.141,1.688-1.874,7.815-1.874,7.815L510.5,452.91s-.952-.1-.9-.37c.222-1.225.836-3.472.836-3.472a1.8,1.8,0,0,0,1.141-.916c.919-2.212,2.418-7.14,3-9.332Z" transform="translate(-243.041 -200.096)" fill="#fff"/>
        <path id="Path_27861" data-name="Path 27861" d="M276.267,291.007h0l-6.78-.023a.167.167,0,1,1,0-.334h0l6.78.022a.167.167,0,1,1,0,.334Z" transform="translate(-80.009 -99.559)"/>
        <path id="Path_27862" data-name="Path 27862" d="M284.417,291.458h0a.167.167,0,0,1-.167-.17l.023-6.941a.166.166,0,0,1,.167-.167h0a.169.169,0,0,1,.167.17l-.023,6.941a.166.166,0,0,1-.167.167Z" transform="translate(-90.139 -95.17)"/>
        <path id="Path_27863" data-name="Path 27863" d="M211.013,312.878h21.33V296.119h-21.33v16.758Zm21.384.113H210.955a.054.054,0,0,1-.055-.055V296.065a.054.054,0,0,1,.055-.055H232.4a.057.057,0,0,1,.058.055v16.871a.057.057,0,0,1-.058.055Z" transform="translate(-40.37 -103.195)"/>
        <path id="Path_27864" data-name="Path 27864" d="M272.434,257.074H248.777a.167.167,0,1,1,0-.334h23.657a.167.167,0,1,1,0,.334Z" transform="translate(-65.957 -76.551)"/>
        <path id="Path_27865" data-name="Path 27865" d="M276.15,252.853c0-1.961.476-2.083,1.067-2.083s1.067.151,1.067,2.083c0,2.131-.476,2.083-1.067,2.083s-1.067-.257-1.067-2.083Z" transform="translate(-84.644 -72.5)"/>
        <path id="Path_27888" data-name="Path 27888" d="M461.407,190.489a.166.166,0,0,1-.167-.167v-8.644a.167.167,0,1,1,.334,0v8.644a.164.164,0,0,1-.167.167Z" transform="translate(-210.232 -25.504)"/>
        <path id="Path_27889" data-name="Path 27889" d="M455,192.235a.166.166,0,0,1-.167-.167v-5.5a.167.167,0,0,1,.334,0v5.5a.166.166,0,0,1-.167.167Z" transform="translate(-205.882 -28.822)"/>
        <path id="Path_27890" data-name="Path 27890" d="M448.757,193.949a.166.166,0,0,1-.167-.167v-2.414a.167.167,0,0,1,.334,0v2.414a.164.164,0,0,1-.167.167Z" transform="translate(-201.648 -32.08)"/>
        <path id="Path_27891" data-name="Path 27891" d="M467.617,192.235a.166.166,0,0,1-.167-.167v-5.5a.167.167,0,0,1,.334,0v5.5a.166.166,0,0,1-.167.167Z" transform="translate(-214.445 -28.822)"/>
        <path id="Path_27893" data-name="Path 27893" d="M498.767,190.489a.166.166,0,0,1-.167-.167v-8.644a.167.167,0,1,1,.334,0v8.644a.164.164,0,0,1-.167.167Z" transform="translate(-235.582 -25.504)"/>
        <path id="Path_27895" data-name="Path 27895" d="M479.987,194.738a.166.166,0,0,1-.167-.167v-.984a.167.167,0,1,1,.334,0v.984a.166.166,0,0,1-.167.167Z" transform="translate(-222.839 -33.586)"/>
        <path id="Path_27896" data-name="Path 27896" d="M492.447,193.949a.166.166,0,0,1-.167-.167v-2.414a.167.167,0,1,1,.334,0v2.414a.164.164,0,0,1-.167.167Z" transform="translate(-231.293 -32.08)"/>
        <path id="Path_27897" data-name="Path 27897" d="M504.977,192.235a.166.166,0,0,1-.167-.167v-5.5a.168.168,0,0,1,.167-.167.166.166,0,0,1,.167.167v5.5a.164.164,0,0,1-.167.167Z" transform="translate(-239.795 -28.822)"/>
        <path id="Path_27898" data-name="Path 27898" d="M511.557,193.092a.166.166,0,0,1-.167-.167v-3.957a.167.167,0,0,1,.334,0v3.957a.164.164,0,0,1-.167.167Z" transform="translate(-244.26 -30.451)"/>
        <path id="Path_27903" data-name="Path 27903" d="M446,243.318a.887.887,0,1,0,.887.887.889.889,0,0,0-.887-.887Zm0,2.112a1.225,1.225,0,1,1,1.225-1.225A1.227,1.227,0,0,1,446,245.43Z" transform="translate(-199.063 -67.213)"/>
        <path id="Path_27908" data-name="Path 27908" d="M318.823,461.268a.656.656,0,1,0,.656.656.656.656,0,0,0-.656-.656Zm0,1.649a.993.993,0,1,1,.993-.993.994.994,0,0,1-.993.993Z" transform="translate(-112.924 -215.098)"/>
        <path id="Path_27911" data-name="Path 27911" d="M547.36,381.139a1.469,1.469,0,1,1,1.469,1.469,1.469,1.469,0,0,1-1.469-1.469Z" transform="translate(-268.667 -159.961)"/>
        <path id="Path_27936" data-name="Path 27936" d="M592.726,280.41l28.6,1.331-3.771,27.718-28.749-.527Z" transform="translate(-296.792 -92.611)" fill="#fff"/>
        <path id="Path_27941" data-name="Path 27941" d="M591.865,294.808Zm-2.032,6.767Zm1.652-6.825a7.3,7.3,0,0,0-2.36.46,6.182,6.182,0,0,0-1.929,1.443c-.215.209-.44.424-.694.656a7.435,7.435,0,0,0-.993,4.607h0a34.554,34.554,0,0,0,2.009,6.372q0-.029.01-.067c.022-.2.045-.411.068-.614.209-1.9.312-2.7.492-2.877a6.714,6.714,0,0,0,1.138-2.456c.2-.636.286-.9.434-.984.122-.067.235-.135.344-.2a5.926,5.926,0,0,1,.746-.4.17.17,0,0,1,.157.013c.768.5,1.292.579,1.508.5.068-.026.083-.058.09-.08a.283.283,0,0,0-.055-.222,1.255,1.255,0,0,0-.28-.3c-.28-.132-.556-.289-.775-.412a4.088,4.088,0,0,0-.392-.209,1.894,1.894,0,0,0-.418-.039,2.607,2.607,0,0,0-.479.071,5.3,5.3,0,0,0-.839.318c-.109.048-.219.1-.321.138a.169.169,0,0,1-.219-.087.163.163,0,0,1,.08-.219,5.774,5.774,0,0,1,1.164-.463,2.381,2.381,0,0,1,.649-.093,2.278,2.278,0,0,1,.389.013,4.332,4.332,0,0,1,1.328.691c.09.042.18.08.267.116a.462.462,0,0,0,.524-.055c.051-.077,0-.206-.135-.341-.09-.084-.968-.643-1.488-.971a3.5,3.5,0,0,1-.408-.244l-.032-.01a7.111,7.111,0,0,0-2.591.556.171.171,0,0,1-.222-.068.169.169,0,0,1,.051-.225,4.363,4.363,0,0,1,2.97-.54c.029.013.18.106.389.235a14.112,14.112,0,0,0,1.537.662l.074.029c.251.116.386.1.415.055s.013-.219-.141-.386a11.423,11.423,0,0,0-2.311-1.521,10.866,10.866,0,0,0-3.25.338.166.166,0,0,1-.167-.055.163.163,0,0,1-.026-.174,4.4,4.4,0,0,1,1.762-2,1.538,1.538,0,0,1,.556-.119c.508-.068,1.566-.212,1.755-.556a.239.239,0,0,0,0-.228.793.793,0,0,0-.376-.058ZM587.6,308.378Zm-.055.331c-.17,0-.466-.125-1.328-2.884-.482-1.543-.907-3.167-1.038-3.842h0c-.293-1.517.424-4.311,1.1-4.919.251-.228.473-.44.688-.649a6.579,6.579,0,0,1,2.032-1.511c.775-.328,2.932-.762,3.167-.251a.571.571,0,0,1,0,.543c-.251.457-1.128.611-2.006.73a3.609,3.609,0,0,0-.418.067,4.172,4.172,0,0,0-1.492,1.55,9.911,9.911,0,0,1,3.086-.26,11.3,11.3,0,0,1,2.466,1.614.667.667,0,0,1,.167.81c-.068.09-.264.27-.717.1.36.373.215.665.164.746a.67.67,0,0,1-.627.254.564.564,0,0,1,.045.4.459.459,0,0,1-.293.309,2.247,2.247,0,0,1-1.733-.479,5.482,5.482,0,0,0-.624.341c-.106.064-.219.132-.344.2a4.44,4.44,0,0,0-.286.794,6.743,6.743,0,0,1-1.221,2.594,16.6,16.6,0,0,0-.4,2.678l-.068.617c-.013.119-.048.44-.289.45a.036.036,0,0,0-.029-.006Z" transform="translate(-294.282 -102.117)"/>
        <path id="Path_27954" data-name="Path 27954" d="M549.64,225.911V222.77h16.427v3.141Z" transform="translate(-270.214 -53.5)" fill="#da1e37"/>
        <path id="Path_27957" data-name="Path 27957" d="M599.918,244.524H613.4v-2.806H599.918v2.806Zm13.65.334h-13.82a.166.166,0,0,1-.167-.167v-3.144a.166.166,0,0,1,.167-.167h13.82a.166.166,0,0,1,.167.167v3.144a.166.166,0,0,1-.167.167Z" transform="translate(-304.099 -66.129)"/>
        <path id="Path_27959" data-name="Path 27959" d="M578.214,207.1h27.438v-2.806H578.214V207.1Zm27.608.338H578.047a.166.166,0,0,1-.167-.167v-3.144a.166.166,0,0,1,.167-.167h27.775a.166.166,0,0,1,.167.167v3.144a.166.166,0,0,1-.167.167Z" transform="translate(-289.375 -40.738)"/>
        <path id="Path_27962" data-name="Path 27962" d="M263.95,424.794V421.65h27.775v3.144Z" transform="translate(-76.365 -188.445)" fill="#fff"/>
        <path id="Path_27963" data-name="Path 27963" d="M263.764,424.281H291.2v-2.807H263.764v2.807Zm27.608.337H263.6a.166.166,0,0,1-.167-.167v-3.144a.166.166,0,0,1,.167-.167h27.775a.166.166,0,0,1,.167.167v3.144a.168.168,0,0,1-.167.167Z" transform="translate(-76.013 -188.1)"/>
        <path id="Path_27966" data-name="Path 27966" d="M376.989,199.815a1.446,1.446,0,0,0,1.591-1.453,2.281,2.281,0,0,0-1.305-1.977,7.56,7.56,0,0,0-2.382-.53,2.129,2.129,0,0,0-.762-2.327,3.282,3.282,0,0,0-2.414-.547,2.959,2.959,0,0,0-1.537.592,1.933,1.933,0,0,0-.7,1.55,3.117,3.117,0,0,0-3.025-1.273,3.149,3.149,0,0,0-2.035,2.562,2.632,2.632,0,0,0-2.083-1.167c-1.656.09-2.029,1.495-1.283,3.3a1.91,1.91,0,0,0-2.614,1.225,3.809,3.809,0,0,0,.7,3.215,1.977,1.977,0,0,0,.485.37c.257,1.414.579,2.9,1.067,4.767a16.934,16.934,0,0,0,1.678,4.076,2.455,2.455,0,0,0,1.276,1.177c.039-.585.649-.878.743-1.46.116-.717-.344-1.347.087-1.983a10.492,10.492,0,0,0,1.646-3.9,5.108,5.108,0,0,0-.3-3.324,3.634,3.634,0,0,0-.781-1.009,6.238,6.238,0,0,0,.35-.878,3.221,3.221,0,0,0,2.054,1.8,1.764,1.764,0,0,0,2.237-.907,3.548,3.548,0,0,0,2.347,2.141c.833.084,1.144-.3,1.482-1.1a7.557,7.557,0,0,0,2.048,1.611,2.354,2.354,0,0,0,2.961-1.5,2.539,2.539,0,0,0-1.527-3.064Z" transform="translate(-140.399 -33.266)" fill="#ffd42e"/>
        <path id="Path_27968" data-name="Path 27968" d="M378.942,221.189v-.132l-.151-.048a7.554,7.554,0,0,1-2.048-1.611c-.334.8-.649,1.183-1.482,1.1a3.548,3.548,0,0,1-2.347-2.141,1.761,1.761,0,0,1-2.237.907,3.221,3.221,0,0,1-2.054-1.8,4.411,4.411,0,0,1-1.607,2.373,3.381,3.381,0,0,1-1.067.5c-.013.164-.029.321-.045.473a14.012,14.012,0,0,0-.08,3.012,1.547,1.547,0,0,0-2.315-.058,1.5,1.5,0,0,0,.035,2.115,2.762,2.762,0,0,0,2.469.617c.232,1.492.572,4.481,1.611,5.8a6.676,6.676,0,0,0,5.07,2.337,7.1,7.1,0,0,0,5.275-2.167,7.378,7.378,0,0,0,1.591-5.529c-.116-1.926-.611-3.822-.617-5.751Z" transform="translate(-143.634 -49.898)" fill="#fff"/>
        <path id="Path_27970" data-name="Path 27970" d="M404.921,236.726a.457.457,0,1,0-.5.379.452.452,0,0,0,.5-.379Z" transform="translate(-171.401 -62.641)"/>
        <path id="Path_27971" data-name="Path 27971" d="M385.131,237.786a.457.457,0,1,0-.5.379.447.447,0,0,0,.5-.379Z" transform="translate(-157.973 -63.359)"/>
        <path id="Path_27972" data-name="Path 27972" d="M388.977,259.722a2.429,2.429,0,0,1-1.832-.829.169.169,0,1,1,.257-.219,2.083,2.083,0,0,0,2.08.646.166.166,0,0,1,.206.119.168.168,0,0,1-.119.206,2.317,2.317,0,0,1-.592.077Z" transform="translate(-159.929 -77.822)"/>
        <path id="Path_27973" data-name="Path 27973" d="M393.152,242.094a2.171,2.171,0,0,1-.325-.023,1.656,1.656,0,0,1-1.138-.682.169.169,0,0,1,.28-.19,1.333,1.333,0,0,0,.91.537A2.317,2.317,0,0,0,394,241.6a.926.926,0,0,0,.389-.225.691.691,0,0,0,.109-.591,2.478,2.478,0,0,0-.235-.585l-.048-.1a8.557,8.557,0,0,1-.862-3.771.167.167,0,0,1,.17-.167.169.169,0,0,1,.167.17,8.2,8.2,0,0,0,.826,3.62l.045.093a2.865,2.865,0,0,1,.26.665,1,1,0,0,1-.183.881,1.213,1.213,0,0,1-.53.322,2.772,2.772,0,0,1-.958.183Z" transform="translate(-163.021 -62.586)"/>
        <path id="Path_27978" data-name="Path 27978" d="M476.869,257.836Zm9.348-29.656H486.2c-.389.016-.993.688-1.414,1.189l-.029.035a42.15,42.15,0,0,1-3.192,3.539c-1.386,1.386-2.659,3.932-2.164,5.018a.162.162,0,0,1,.01.109c-.479,1.99-7.262,12.653-9.426,14.817-.508.508-.354.99-.145,1.662a7.109,7.109,0,0,1,.235.9c.228,1.357.826,3.745,2.263,4.51a2.377,2.377,0,0,0,2.17-.055,6.975,6.975,0,0,0,2.208-2.135c.788-1.813,1.627-4.243,2.517-6.815a79.81,79.81,0,0,1,3.893-9.943.159.159,0,0,1,.058-.064,12.216,12.216,0,0,0,3.916-4.128c.328-.624.366-.845.042-1.353a.993.993,0,0,0-1.132-.212.166.166,0,0,1-.19-.055.164.164,0,0,1-.006-.2c.061-.093.135-.18.2-.264.27-.328.389-.5.129-.823a.623.623,0,0,0-.649-.27.177.177,0,0,1-.18-.039.17.17,0,0,1-.039-.18.7.7,0,0,0-.212-.855.633.633,0,0,0-.81.17.168.168,0,0,1-.225.013.166.166,0,0,1-.035-.222c.588-.9,1.228-1.874,1.926-2.855.2-.276.794-1.116.508-1.4a.277.277,0,0,0-.212-.1Zm-12.926,32.353a2.338,2.338,0,0,1-1.112-.276c-1.562-.833-2.2-3.337-2.434-4.751a6.325,6.325,0,0,0-.222-.852c-.219-.694-.421-1.35.228-2,2.244-2.247,8.8-12.737,9.323-14.6-.54-1.347.958-4.044,2.254-5.34a42.177,42.177,0,0,0,3.173-3.517l.029-.035c.765-.913,1.244-1.292,1.659-1.308a.622.622,0,0,1,.482.2c.428.428,0,1.167-.472,1.832-.553.781-1.071,1.553-1.556,2.289a.847.847,0,0,1,.608.129.985.985,0,0,1,.411.993,1.057,1.057,0,0,1,.746.418.8.8,0,0,1-.042,1.135,1.127,1.127,0,0,1,1.058.444c.408.633.35.977-.029,1.694a12.6,12.6,0,0,1-4,4.231,80.067,80.067,0,0,0-3.854,9.856c-.891,2.578-1.733,5.015-2.527,6.841h0a7.112,7.112,0,0,1-2.379,2.308,3.273,3.273,0,0,1-1.347.318Z" transform="translate(-215.709 -56.947)"/>
        <path id="Path_27984" data-name="Path 27984" d="M313.679,299.726c1.2-6.3,1.209-13.074,6.288-17.315,2.44-2.035,8.217-2.913,11.605-3.131.209,3.279,3.414,4.06,5.468,3.928,3.427-.219,4.038-.894,4.909-3.5.768.305,5.4.54,8.407,3.224,5.581,4.986,12.891,4.211,13.29,4.61.553.553-.807,5.391,4.112,7.67,2.07.958-10.339,2.932-18.883.669.321,4.472-2.3,16.858-3.224,21.88-8.914,6.217-26.235-.151-26.235-.151a27.786,27.786,0,0,0,1.4-7.24c0-1.543-5.4,1.649-6.114,1.778a1.069,1.069,0,0,1-.874-.376c-.6-1.4-1.25-6.249-.148-12.049Z" transform="translate(-109.702 -91.844)" fill="#4ade80"/>
        <path id="Path_27986" data-name="Path 27986" d="M402.286,383.115q-6.013.13-12.03.257l-.016-2.045L403.626,381l-1.341,2.115Z" transform="translate(-162.057 -160.863)" fill="#fff"/>
        <path id="Path_27987" data-name="Path 27987" d="M401.933,382.762Zm-11.875-1.62.013,1.707,11.769-.254,1.125-1.768-12.907.315Zm-.154,2.045a.153.153,0,0,1-.116-.048.168.168,0,0,1-.051-.119l-.016-2.041a.17.17,0,0,1,.164-.17l13.389-.328a.176.176,0,0,1,.151.087.168.168,0,0,1,0,.174l-1.344,2.112a.163.163,0,0,1-.138.077l-12.026.257Z" transform="translate(-161.704 -160.512)"/>
        <path id="Path_27988" data-name="Path 27988" d="M459.82,329.55l-26.149.145-9.011,18.51,25.9-.068Z" transform="translate(-185.411 -125.953)" fill="#fff"/>
        <path id="Path_27989" data-name="Path 27989" d="M433.422,329.509l-8.847,18.173,25.528-.064,9.088-18.25-25.769.141ZM424.3,348.02a.168.168,0,0,1-.151-.241l9.011-18.51a.168.168,0,0,1,.151-.093l26.149-.145h0a.16.16,0,0,1,.141.08.166.166,0,0,1,.007.164l-9.258,18.588a.168.168,0,0,1-.151.093l-25.9.064Z" transform="translate(-185.056 -125.602)"/>
        <path id="Path_27990" data-name="Path 27990" d="M478.461,352.979a1.731,1.731,0,0,1,1.855.807,1.842,1.842,0,0,1-.479,2.038,2.372,2.372,0,0,1-2.093.5,1.634,1.634,0,0,1-1.009-.611,1.41,1.41,0,0,1-.225-.794c-.006-.919.411-1.791,1.951-1.942Z" transform="translate(-220.593 -141.842)" fill="#fff"/>
        <path id="Path_27991" data-name="Path 27991" d="M478.1,352.63Zm.28.158c-.109,0-.2.006-.264.013h0c-1.218.119-1.807.7-1.8,1.771a1.255,1.255,0,0,0,.2.7,1.464,1.464,0,0,0,.907.543,2.192,2.192,0,0,0,1.942-.46,1.669,1.669,0,0,0,.44-1.845,1.461,1.461,0,0,0-1.421-.723Zm-.44,3.42a2.9,2.9,0,0,1-.595-.064,1.788,1.788,0,0,1-1.112-.682,1.6,1.6,0,0,1-.254-.887c-.006-.868.354-1.939,2.1-2.109h0a1.857,1.857,0,0,1,2.025.907,2.01,2.01,0,0,1-.521,2.231,2.438,2.438,0,0,1-1.646.6Z" transform="translate(-220.233 -141.492)"/>
        <path id="Path_27992" data-name="Path 27992" d="M322.119,353.194c4.832-.27,9.692-.6,14.553-.935.434-.071,2.6-.379,3.131-.46a4.774,4.774,0,0,0,1.3-.424c1.447-.669,4.549-1.977,5.24-1.591a8.551,8.551,0,0,1,4.169,3.077c.633.817,1.154,2.173.891,2.4a.462.462,0,0,1-.6.055,7.641,7.641,0,0,0-3.71-3.678,10.812,10.812,0,0,1,2.083,1.533,4.052,4.052,0,0,1,1.366,2.186.3.3,0,0,1-.016.2c-.087.145-.309.061-.44-.045-.257-.2-3.581-2.9-4.2-2.829a16.683,16.683,0,0,1,3.781,2.954.5.5,0,0,1-.093.344.49.49,0,0,1-.453.145,1.27,1.27,0,0,1-.453-.2,22.28,22.28,0,0,0-2.848-1.73,1.7,1.7,0,0,0-1.595-.019,7.717,7.717,0,0,1,2.491,1.511,1.377,1.377,0,0,1,.286.366c.113.2.241.5.084.662-.257.273-.473.135-.691.006a14.839,14.839,0,0,0-2.723-1.434,1.019,1.019,0,0,0-.907-.048,7.27,7.27,0,0,1-3.617.955,11.97,11.97,0,0,0-2.5.511c-12.808,3.53-16.636,4.938-19.739,3.6-.608-.26-.813-.579-.611-1.623.543-2.781,1.07-4.362,5.828-5.5Z" transform="translate(-111.829 -139.635)" fill="#fff"/>
        <path id="Path_28008" data-name="Path 28008" d="M552.806,283.09a.168.168,0,0,1-.135-.071,21.292,21.292,0,0,0-5.436-5.23.169.169,0,1,1,.19-.28,21.685,21.685,0,0,1,5.523,5.311.166.166,0,0,1-.039.235.173.173,0,0,1-.1.035Z" transform="translate(-268.531 -90.623)"/>
        <path id="Path_28009" data-name="Path 28009" d="M547.869,297.038a.205.205,0,0,1-.074-.016,27.908,27.908,0,0,0-4.057-1.585.168.168,0,1,1,.1-.322,28.854,28.854,0,0,1,4.108,1.6.168.168,0,0,1,.077.225.171.171,0,0,1-.151.093Z" transform="translate(-266.128 -102.584)"/>
        <path id="Path_28010" data-name="Path 28010" d="M336.112,188.312a.174.174,0,0,1-.132-.064c-1.1-1.366-2.154-2.8-3.131-4.253a.169.169,0,1,1,.28-.19c.971,1.45,2.019,2.871,3.115,4.231a.169.169,0,0,1-.026.238.15.15,0,0,1-.106.039Z" transform="translate(-123.096 -27.012)"/>
        <path id="Path_28011" data-name="Path 28011" d="M350.559,184.16a.172.172,0,0,1-.167-.141l-.617-3.671a.168.168,0,0,1,.331-.055l.617,3.671a.164.164,0,0,1-.138.193c-.01,0-.019,0-.026,0Z" transform="translate(-134.598 -24.584)"/>
        <path id="Path_28012" data-name="Path 28012" d="M323.173,201.281a.161.161,0,0,1-.109-.042,10.662,10.662,0,0,0-5.23-2.424.168.168,0,1,1,.055-.331,11,11,0,0,1,5.4,2.5.171.171,0,0,1,.019.238.178.178,0,0,1-.132.058Z" transform="translate(-112.831 -37.021)"/>
        <path id="Path_28013" data-name="Path 28013" d="M367.079,438.551a4.61,4.61,0,0,0,2.012,1.852,1.172,1.172,0,0,0,1.1.061.807.807,0,0,0,.083-1.058,1.911,1.911,0,0,0-1.1-.675,5.3,5.3,0,0,0-2.093-.18ZM354.522,448.69a7.021,7.021,0,0,1-1.98-.28.169.169,0,0,1-.116-.209.167.167,0,0,1,.209-.113,7.442,7.442,0,0,0,8.616-3.951c.18-.4.325-.813.466-1.218a11.838,11.838,0,0,1,.646-1.594,6.058,6.058,0,0,1,4.2-3.032,4.58,4.58,0,0,1-.305-.894,6.44,6.44,0,0,1,.945-4.713,18.879,18.879,0,0,1,3.147-3.658.168.168,0,0,1,.235.241,18.645,18.645,0,0,0-3.1,3.591,6.106,6.106,0,0,0-.907,4.462,4.41,4.41,0,0,0,.325.913,5.673,5.673,0,0,1,2.356.17,2.26,2.26,0,0,1,1.286.807,1.128,1.128,0,0,1-.164,1.521,1.447,1.447,0,0,1-1.44-.026,4.936,4.936,0,0,1-2.228-2.106,5.712,5.712,0,0,0-4.06,2.877,11.143,11.143,0,0,0-.627,1.55c-.145.411-.293.839-.479,1.247a7.824,7.824,0,0,1-7.031,4.414Z" transform="translate(-136.394 -193.42)"/>
        <path id="Path_28014" data-name="Path 28014" d="M386.793,431.286a.167.167,0,0,1-.167-.161,7.589,7.589,0,0,1,1.916-5.343.168.168,0,0,1,.238-.013.171.171,0,0,1,.013.238,7.267,7.267,0,0,0-1.832,5.105.166.166,0,0,1-.161.174Z" transform="translate(-159.6 -191.211)"/>
      </g>
    </g>
  </g>
</svg>
`;
const addIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12.261" height="12.261" viewBox="0 0 12.261 12.261">
<g id="ios-add-circle-outline" transform="translate(-3.375 -3.375)">
  <path id="Path_20806" data-name="Path 20806" d="M16.318,13.179h-2.2v-2.2a.472.472,0,0,0-.943,0v2.2h-2.2a.452.452,0,0,0-.472.472.456.456,0,0,0,.472.472h2.2v2.2a.457.457,0,0,0,.472.472.469.469,0,0,0,.472-.472v-2.2h2.2a.472.472,0,0,0,0-.943Z" transform="translate(-4.145 -4.145)"/>
  <path id="Path_20807" data-name="Path 20807" d="M9.506,4.2A5.3,5.3,0,1,1,5.753,5.753,5.272,5.272,0,0,1,9.506,4.2m0-.825a6.131,6.131,0,1,0,6.131,6.131A6.13,6.13,0,0,0,9.506,3.375Z"/>
</g>
</svg>
`;
const AddFacilities = ({ onCancel, onConfirm }) => {
  const [Name, setName] = React.useState();
  const [NameError, setNameError] = React.useState();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.427)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: width - 40,

          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Add Facilities
        </Text>
        <Input
          error={NameError}
          value={Name}
          onChange={setName}
          style={{
            borderWidth: 1,
            width: "80%",
            marginLeft: "10%",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <IconButton
            onPress={() => {
              setNameError();
              if (!Name) {
                setNameError("*This field is required");
                return;
              }
              if (onConfirm) {
                onConfirm(Name);
              }
            }}
            style={{
              width: "38%",
              marginLeft: "10%",
              backgroundColor: "#4ADE80",
              color: "white",
            }}
            title={"Confirm"}
          />
          <IconButton
            onPress={() => {
              if (onCancel) {
                onCancel();
              }
            }}
            style={{
              width: "38%",
              marginLeft: "4%",
              backgroundColor: "#FF0000",
              color: "white",
            }}
            title={"Cancel"}
          />
        </View>
      </View>
    </View>
  );
};
