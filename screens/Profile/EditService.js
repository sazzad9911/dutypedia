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
import { CheckBox } from "./../Seller/Pricing";
import {
  createOtherService,
  createOtherServiceIndividual,
  getService,
} from "../../Class/service";
import { fileFromURL } from "../../action";
import { uploadFile } from "../../Class/upload";
import IconButton from "../../components/IconButton";
import editt from "../../assets/editt.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import ActivityLoader from "../../components/ActivityLoader";
import { updateGigsData } from "../../Class/update";

const EditService = ({ navigation, route }) => {
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
  const [Facilities, setFacilities] = React.useState([
    {
      id: 1,
      title: "Home Delivery Available",
      checked: false,
    },
    {
      id: 2,
      title: "Home Service Available",
      checked: false,
    },
    {
      id: 3,
      title: "Online Support Available",
      checked: false,
    },
  ]);
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
  const type = params.type;
  const subsData = params.subsData;
  const installmentData = params.installmentData;
  const data = params.data;
  const isFocused = useIsFocused();
  const gigs = params.gigs;

  React.useEffect(() => {
    if (gigs) {
      setFirstImage({ uri: gigs.images[0] });
      setSecondImage({ uri: gigs.images[1] });
      setThirdImage({ uri: gigs.images[2] });
      setForthImage({ uri: gigs.images[3] });
      setCenterName(gigs.title);
      setDescription(gigs.description);
      setPrice(gigs.price.toString());
      //console.log(data.service.gigs[0].images)
      //console.log(gigs)
    }
  }, [isFocused]);

  const updateData = async () => {
    setLoader(true);
    if(FirstImage.type){
      let arr=[]
      arr.push(fileFromURL(FirstImage))
      const res=await uploadFile(arr,user.token);
      setFirstImage({uri:res[0]})
    }
    if(SecondImage.type){
      let arr=[]
      arr.push(fileFromURL(SecondImage))
      const res=await uploadFile(arr,user.token);
      setSecondImage({uri:res[0]})
    }
    if(ThirdImage.type){
      let arr=[]
      arr.push(fileFromURL(ThirdImage))
      const res=await uploadFile(arr,user.token);
      setThirdImage({uri:res[0]})
    }
    if(ForthImage.type){
      let arr=[]
      arr.push(fileFromURL(ForthImage))
      const res=await uploadFile(arr,user.token);
      setForthImage({uri:res[0]})
    }
    let images=[];
    images.push(FirstImage.uri)
    images.push(SecondImage.uri)
    images.push(ThirdImage.uri)
    images.push(ForthImage.uri)
    updateGigsData(user.token,{
      gigId:gigs.id,
      title:CenterName,
      description:Description,
      price:Price?parseInt(Price):undefined,
      images:images,
      facilites:{
        selectedOptions:Facilities.filter(d=>d.checked==true)
      },
      subsData:subsData?subsData:undefined,
      installmentData:installmentData?installmentData:undefined
    }).then(res=>{
      updateVendorInfo()
    }).catch(err=>{
      setLoader(false)
      console.error(err.response.data.msg)
    })
  };
  const updateVendorInfo=async()=>{
    const res=await getService(user.token,vendor.service.id);
    if(res){
      setLoader(false)
      dispatch({ type: "SET_VENDOR", playload: res.data });
      navigation.navigate("VendorProfile");
    }
  }
 
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: primaryColor,
              paddingHorizontal: 0,
            }}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                alignItems: "center",
                paddingHorizontal: 20,
              }}>
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
                    lineHeight: 30,
                  }}>
                  Upload{"\n"}Your
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Poppins-Bold",
                    color: "#DA1E37",
                    lineHeight: 30,
                  }}>
                  High <Text style={{color:"black"}}>Quality</Text>
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Poppins-Bold",
                    color: "#6366F1",
                    lineHeight: 30,
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
              }}>
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
                }}>
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
              }}>
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

            <View style={{ height: 10 }} />
            <View
              style={{
                marginHorizontal: 20,
              }}>
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

            {direct && type != "SUBS" && type != "INSTALLMENT" ? (
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
                ]}>
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
                }}>
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
                }}>
                {FacilitiesError}
              </Text>
            )}
            <IconButton
              onPress={() => {
                updateData();
                // checkValidity();
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
              title={"Update"}
            />
            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
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

export default EditService;

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
        }}>
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
          }}>
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
      style={[styles.view, style]}>
      <AntDesign name="plus" size={24} color="#707070" />
    </TouchableOpacity>
  );
};

const vectorImage = `
<svg id="edit" xmlns="http://www.w3.org/2000/svg" width="248.45" height="137.697" viewBox="0 0 248.45 137.697">
  <path id="Path_27807" data-name="Path 27807" d="M791.79,309.943a3.471,3.471,0,0,0,1.745-1.611,5.9,5.9,0,0,0,.628-2.322,7.221,7.221,0,0,0,.451,2.25,2.428,2.428,0,0,0,1.653,1.473,2.35,2.35,0,0,0-1.626,1.354,5.648,5.648,0,0,0-.448,2.139,5.322,5.322,0,0,0-.539-2,2.7,2.7,0,0,0-1.863-1.286Z" transform="translate(-574.265 -255.765)" fill="#ffd42e"/>
  <path id="Path_27808" data-name="Path 27808" d="M792.023,309.573A2.823,2.823,0,0,1,793.5,310.8a3.329,3.329,0,0,1,.325.784,4.2,4.2,0,0,1,.306-.911,2.722,2.722,0,0,1,1.2-1.274,2.844,2.844,0,0,1-1.228-1.389,4.743,4.743,0,0,1-.3-.972,5.177,5.177,0,0,1-.421,1.064,3.8,3.8,0,0,1-1.362,1.465Zm1.848,3.528a.2.2,0,0,1-.2-.172,5.247,5.247,0,0,0-.513-1.924,2.523,2.523,0,0,0-1.729-1.186.2.2,0,0,1-.161-.18.2.2,0,0,1,.126-.2,3.234,3.234,0,0,0,1.638-1.519,5.658,5.658,0,0,0,.6-2.242.2.2,0,0,1,.2-.184h0a.2.2,0,0,1,.2.184,7.017,7.017,0,0,0,.436,2.185,2.2,2.2,0,0,0,1.507,1.358.2.2,0,0,1,0,.394,2.139,2.139,0,0,0-1.481,1.244,5.538,5.538,0,0,0-.428,2.062.2.2,0,0,1-.192.187s0,0,0,0Z" transform="translate(-573.943 -255.447)"/>
  <path id="Path_27809" data-name="Path 27809" d="M840.89,286.957a2.654,2.654,0,0,0,1.4-1.106,3.569,3.569,0,0,0,.505-1.592,4.2,4.2,0,0,0,.367,1.538,1.88,1.88,0,0,0,1.332,1.01,1.853,1.853,0,0,0-1.312.926,3.379,3.379,0,0,0-.36,1.465,3.245,3.245,0,0,0-.432-1.37,2.252,2.252,0,0,0-1.5-.872Z" transform="translate(-604.579 -242.73)" fill="#ffd42e"/>
  <path id="Path_27810" data-name="Path 27810" d="M841.161,286.58a2.239,2.239,0,0,1,1.075.815,2.177,2.177,0,0,1,.234.448,2.626,2.626,0,0,1,.222-.528,2.124,2.124,0,0,1,.861-.834,2.179,2.179,0,0,1-.887-.914,2.865,2.865,0,0,1-.214-.562,3.214,3.214,0,0,1-.306.631,2.868,2.868,0,0,1-.983.945Zm1.343,2.495a.2.2,0,0,1-.2-.168,3.014,3.014,0,0,0-.4-1.286,2.01,2.01,0,0,0-1.37-.792.2.2,0,0,1-.165-.184.2.2,0,0,1,.138-.207,2.441,2.441,0,0,0,1.3-1.022,3.322,3.322,0,0,0,.474-1.5.2.2,0,0,1,.2-.184h0a.2.2,0,0,1,.2.18,4.123,4.123,0,0,0,.344,1.469,1.66,1.66,0,0,0,1.186.9.2.2,0,0,1,.168.2.2.2,0,0,1-.172.2,1.648,1.648,0,0,0-1.167.826,3.238,3.238,0,0,0-.337,1.377.2.2,0,0,1-.191.187c0,.008,0,.008,0,.008Z" transform="translate(-604.257 -242.406)"/>
  <path id="Path_27811" data-name="Path 27811" d="M806.09,271.781c1.11-.417,1.875-.631,2.414-1.569a8.424,8.424,0,0,0,.807-3.432,8.168,8.168,0,0,0,.784,2.873,3.5,3.5,0,0,0,2.537,1.814,3.421,3.421,0,0,0-2.361,1.833,6.475,6.475,0,0,0-.566,2.782,7.938,7.938,0,0,0-.846-2.95,3.79,3.79,0,0,0-2.77-1.351Z" transform="translate(-583.094 -232.172)" fill="#ffd42e"/>
  <path id="Path_27812" data-name="Path 27812" d="M806.53,271.384a3.459,3.459,0,0,1,2.173,1.3,4.339,4.339,0,0,1,.616,1.592,4.971,4.971,0,0,1,.455-1.4,3.7,3.7,0,0,1,1.8-1.722,3.791,3.791,0,0,1-1.967-1.733,5.805,5.805,0,0,1-.566-1.542,6.653,6.653,0,0,1-.677,2.1,3.154,3.154,0,0,1-1.833,1.393Zm2.854,4.568a.2.2,0,0,1-.2-.165c-.031-.161-.061-.337-.092-.52a6.061,6.061,0,0,0-.719-2.349,3.554,3.554,0,0,0-2.628-1.27.2.2,0,0,1-.042-.386c.1-.034.184-.069.275-.1a3.249,3.249,0,0,0,2.035-1.377,8.436,8.436,0,0,0,.781-3.344.2.2,0,0,1,.4-.015,7.988,7.988,0,0,0,.761,2.8,3.275,3.275,0,0,0,2.384,1.71.2.2,0,0,1,.176.2.2.2,0,0,1-.164.2,3.2,3.2,0,0,0-2.219,1.73,6.269,6.269,0,0,0-.543,2.7.2.2,0,0,1-.184.2.067.067,0,0,0-.023,0Z" transform="translate(-582.776 -231.849)"/>
  <path id="Path_27813" data-name="Path 27813" d="M839.883,321.883,823.61,306.559l1.97-2.089,16.273,15.324a.833.833,0,0,1,.038,1.263l-.742.788a.9.9,0,0,1-1.267.038Z" transform="translate(-593.91 -254.652)"/>
  <path id="Path_27814" data-name="Path 27814" d="M839.687,321.409a.7.7,0,0,0,.987-.034l.738-.784a.672.672,0,0,0,.214-.517.7.7,0,0,0-.245-.463l-16.127-15.186-1.695,1.8,16.127,15.186Zm.455.585a1.067,1.067,0,0,1-.731-.295h0l-16.273-15.324a.2.2,0,0,1-.008-.283L825.1,304a.2.2,0,0,1,.138-.061.207.207,0,0,1,.145.054l16.273,15.324a1.111,1.111,0,0,1,.371.727,1.083,1.083,0,0,1-.321.819l-.742.788-.011.012a1.212,1.212,0,0,1-.811.333Z" transform="translate(-593.581 -254.326)"/>
  <path id="Path_27815" data-name="Path 27815" d="M825.139,308l-4.886-4.6a.79.79,0,0,1-.034-1.087l.914-.972a.746.746,0,0,1,1.087-.031l4.886,4.6L825.139,308Z" transform="translate(-591.693 -252.81)" fill="#fff"/>
  <path id="Path_27816" data-name="Path 27816" d="M821.369,300.961a.56.56,0,0,0-.413.188l-.915.972a.586.586,0,0,0,.023.8l4.74,4.465,1.695-1.8-4.741-4.465a.558.558,0,0,0-.39-.165Zm3.447,6.91a.208.208,0,0,1-.138-.054l-4.886-4.6a.992.992,0,0,1-.046-1.366l.918-.976a.953.953,0,0,1,1.374-.042l4.886,4.6a.2.2,0,0,1,.008.283l-1.97,2.089a.185.185,0,0,1-.146.065Z" transform="translate(-591.37 -252.488)"/>
  <path id="Path_27817" data-name="Path 27817" d="M832.163,313.951a.069.069,0,0,1-.046-.019.07.07,0,0,1,0-.1l1.163-1.24a.068.068,0,1,1,.1.092l-1.163,1.24a.067.067,0,0,1-.05.023Z" transform="translate(-599.149 -259.808)"/>
  <path id="Path_27818" data-name="Path 27818" d="M760.825,239.118H737.979a.2.2,0,1,1,0-.4h22.846a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Z" transform="translate(-540.92 -216.312)"/>
  <path id="Path_27819" data-name="Path 27819" d="M780.08,235.229c0-2.334.566-2.479,1.27-2.479s1.27.18,1.27,2.479c0,2.537-.566,2.479-1.27,2.479s-1.27-.306-1.27-2.479Z" transform="translate(-567.036 -212.627)"/>
  <path id="Path_27820" data-name="Path 27820" d="M781.023,232.634c-.524,0-1.068,0-1.068,2.28s.643,2.28,1.068,2.28h.046c.306,0,.5-.008.643-.153.256-.256.379-.953.379-2.127,0-2.28-.543-2.28-1.067-2.28Zm.088,4.963h-.092c-1.045,0-1.469-.777-1.469-2.678,0-2.254.516-2.678,1.469-2.678.93,0,1.469.44,1.469,2.678,0,1.343-.149,2.062-.5,2.41a1.13,1.13,0,0,1-.88.268Z" transform="translate(-566.708 -212.31)"/>
  <path id="Path_27821" data-name="Path 27821" d="M753.715,234.465a.065.065,0,0,1-.065-.065v-1.745a.065.065,0,1,1,.13,0V234.4a.067.067,0,0,1-.065.065Z" transform="translate(-550.718 -212.527)"/>
  <path id="Path_27822" data-name="Path 27822" d="M768.5,234.465a.064.064,0,0,1-.065-.065v-1.745a.065.065,0,0,1,.065-.065.068.068,0,0,1,.069.065V234.4a.068.068,0,0,1-.069.065Z" transform="translate(-559.843 -212.527)"/>
  <path id="Path_27823" data-name="Path 27823" d="M462.473,439.1h0l-18.366-.1a.2.2,0,0,1,0-.4h0l18.082.1c-.287-.914-1.037-4.052.088-9.194a23.394,23.394,0,0,0,.035-8.949l-18.373-.149a.2.2,0,0,1,0-.4h0l18.534.153a.2.2,0,0,1,.2.153,23.7,23.7,0,0,1,0,9.278c-1.3,5.927-.023,9.2-.012,9.236a.216.216,0,0,1-.019.188.19.19,0,0,1-.164.088Z" transform="translate(-353.389 -323.83)"/>
  <path id="Path_27824" data-name="Path 27824" d="M461.95,459.889h0l-16.265-.065a.066.066,0,0,1-.065-.069.064.064,0,0,1,.065-.065h0l16.265.065a.065.065,0,0,1,.065.069.067.067,0,0,1-.065.065Z" transform="translate(-354.53 -347.306)"/>
  <path id="Path_27825" data-name="Path 27825" d="M464.711,429.574H447.9a.065.065,0,0,1-.065-.069.065.065,0,0,1,.065-.065h16.816a.064.064,0,0,1,.065.065.063.063,0,0,1-.065.069Z" transform="translate(-355.938 -330.14)"/>
  <path id="Path_27826" data-name="Path 27826" d="M447.452,464.518h-1.6a.2.2,0,1,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,1,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,1,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,0,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.21,0h-1.6a.2.2,0,0,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm2.2,0h-.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Z" transform="translate(-354.56 -350.043)"/>
  <path id="Path_27827" data-name="Path 27827" d="M449.292,425.158h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,0,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,0,1,0-.4h1.6a.2.2,0,0,1,0,.4Zm3.206,0h-1.6a.2.2,0,1,1,0-.4h1.6a.2.2,0,0,1,0,.4Zm3.206,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,0,1,0,.4Zm2.1,0h-.5a.2.2,0,1,1,0-.4h.5a.2.2,0,1,1,0,.4Z" transform="translate(-355.723 -327.318)"/>
  <path id="Path_27828" data-name="Path 27828" d="M565.821,440.076h0l-25.444-.153a.2.2,0,0,1-.2-.153,23.706,23.706,0,0,1,0-9.278c1.3-5.927.023-9.2.012-9.236a.2.2,0,0,1,.184-.276h0l25.276.1a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2h0l-24.992-.1c.287.914,1.041,4.052-.084,9.194a23.375,23.375,0,0,0-.034,8.946l25.283.149a.2.2,0,0,1,.2.2.206.206,0,0,1-.2.2Z" transform="translate(-414.328 -324.418)"/>
  <path id="Path_27829" data-name="Path 27829" d="M568.777,429.639h0l-23.022-.065a.067.067,0,0,1,0-.134h0l23.022.065a.064.064,0,0,1,.065.065.074.074,0,0,1-.069.069Z" transform="translate(-418.036 -330.138)"/>
  <path id="Path_27830" data-name="Path 27830" d="M566.69,461.24H543.519a.068.068,0,0,1-.069-.065.065.065,0,0,1,.069-.065H566.69a.065.065,0,1,1,0,.13Z" transform="translate(-416.62 -348.183)"/>
  <path id="Path_27831" data-name="Path 27831" d="M545.267,426.138h-1.1a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.1a.2.2,0,1,1,0,.4Zm3.206,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,1,1,0,.4Zm3.206,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,1,1,0,.4Zm3.21,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.207,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Z" transform="translate(-416.965 -327.908)"/>
  <path id="Path_27832" data-name="Path 27832" d="M543.172,465.488h-1.263a.2.2,0,0,1,0-.4h1.263a.2.2,0,1,1,0,.4Zm3.206,0h-1.6a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h1.6a.2.2,0,0,1,0,.4Zm3.206,0h-1.6a.2.2,0,0,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,0,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,1,1,0-.4H556a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,1,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,1,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206,0h-1.6a.2.2,0,0,1,0-.4h1.6a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Z" transform="translate(-415.537 -350.64)"/>
  <path id="Path_27833" data-name="Path 27833" d="M503.834,439.15a9.923,9.923,0,0,0-.413,4.989c.306,1.993,2.854,9.125,2.854,9.125l3.532,2.284s1.121-.2,1.041-.513c-.363-1.439-1.27-4.056-1.27-4.056a2.136,2.136,0,0,1-1.427-1c-1.27-2.544-3.447-8.276-4.316-10.832Z" transform="translate(-390.862 -334.627)" fill="#fff"/>
  <path id="Path_27834" data-name="Path 27834" d="M506.121,452.814l3.409,2.2a2.122,2.122,0,0,0,.8-.279c-.318-1.255-1.052-3.405-1.224-3.9a2.262,2.262,0,0,1-1.454-1.079c-1.213-2.43-3.195-7.629-4.128-10.285a9.637,9.637,0,0,0-.222,4.32c.287,1.848,2.571,8.307,2.824,9.022Zm3.371,2.613a.206.206,0,0,1-.107-.031l-3.532-2.284a.188.188,0,0,1-.08-.1c-.1-.291-2.56-7.174-2.866-9.164a10.154,10.154,0,0,1,.421-5.085.2.2,0,0,1,.191-.134h0a.2.2,0,0,1,.188.138c.811,2.387,3.008,8.207,4.308,10.809a1.96,1.96,0,0,0,1.286.891.192.192,0,0,1,.153.13c.008.027.918,2.64,1.278,4.071a.331.331,0,0,1-.05.271c-.2.3-.93.448-1.152.486Z" transform="translate(-390.543 -334.304)"/>
  <path id="Path_27835" data-name="Path 27835" d="M525.273,490.1c-.811.532-2.013.065-2.61-1.488-.352-.911-.448-1.978.191-2.323a1.639,1.639,0,0,1,2.238.639c.467.616,1.366,2.4.18,3.172Zm-2.009-5.651c-1.079-.432-2.169-3.524-2.169-3.524l-1.875.585s1.523,4.924,2.269,7.258c.823,2.587,2.269,3.616,4.438,2.69,1.354-.578,1.592-2.281,1.075-3.937a4.286,4.286,0,0,0-3.738-3.072Z" transform="translate(-400.954 -360.414)" fill="#ffd42e"/>
  <path id="Path_27836" data-name="Path 27836" d="M523.334,485.943a1.478,1.478,0,0,0-.711.2c-.513.276-.421,1.24-.1,2.074a2.388,2.388,0,0,0,1.343,1.508,1.1,1.1,0,0,0,.968-.119h0a1.019,1.019,0,0,0,.475-.723,3.267,3.267,0,0,0-.708-2.158,1.63,1.63,0,0,0-1.266-.781Zm.907,4.247a1.6,1.6,0,0,1-.5-.08,2.794,2.794,0,0,1-1.6-1.745c-.371-.968-.494-2.154.283-2.571a1.808,1.808,0,0,1,2.491.7,3.672,3.672,0,0,1,.78,2.468,1.422,1.422,0,0,1-.65.991,1.5,1.5,0,0,1-.811.241Zm-5.1-8.869c.287.93,1.557,5.02,2.208,7.063a4.136,4.136,0,0,0,1.886,2.694,2.771,2.771,0,0,0,2.28-.126c1.377-.589,1.377-2.357.96-3.692a3.853,3.853,0,0,0-3.26-2.858,3.081,3.081,0,0,1-.36-.088h0c-1.01-.406-1.947-2.743-2.219-3.463l-1.5.471Zm5,10.35a2.547,2.547,0,0,1-1.075-.23,4.51,4.51,0,0,1-2.1-2.935c-.735-2.307-2.254-7.208-2.269-7.258a.2.2,0,0,1,.13-.249l1.875-.585a.2.2,0,0,1,.249.126c.295.838,1.243,3.08,2.055,3.405h0a2.6,2.6,0,0,0,.291.069,4.255,4.255,0,0,1,3.562,3.13c.616,1.971.149,3.612-1.186,4.182a3.993,3.993,0,0,1-1.526.344Z" transform="translate(-400.625 -360.095)"/>
  <path id="Path_27837" data-name="Path 27837" d="M515.519,438.82a9.925,9.925,0,0,1,.75,4.951c-.168,2.009-2.231,9.3-2.231,9.3l-3.371,2.518s-1.133-.119-1.071-.44c.264-1.458.995-4.132.995-4.132a2.147,2.147,0,0,0,1.358-1.09c1.094-2.632,2.877-8.5,3.57-11.107Z" transform="translate(-394.84 -334.422)" fill="#fff"/>
  <path id="Path_27838" data-name="Path 27838" d="M509.484,454.838a2.115,2.115,0,0,0,.815.226l3.252-2.43a94.545,94.545,0,0,0,2.2-9.2,9.672,9.672,0,0,0-.516-4.3c-.75,2.713-2.376,8.035-3.421,10.541a2.247,2.247,0,0,1-1.377,1.175c-.138.513-.723,2.709-.957,3.983Zm.872.635h-.019c-.222-.023-.968-.122-1.182-.406a.326.326,0,0,1-.065-.268c.264-1.45.991-4.121,1-4.148a.208.208,0,0,1,.145-.142,1.944,1.944,0,0,0,1.221-.976c1.121-2.686,2.915-8.639,3.562-11.077a.2.2,0,0,1,.18-.149.2.2,0,0,1,.2.123,10.176,10.176,0,0,1,.765,5.043,95.88,95.88,0,0,1-2.235,9.336.209.209,0,0,1-.073.107l-3.371,2.517a.269.269,0,0,1-.126.038Z" transform="translate(-394.525 -334.105)"/>
  <path id="Path_27839" data-name="Path 27839" d="M495.978,491.256c.846.474,2.013-.073,2.5-1.661.287-.934.314-2-.348-2.3a1.636,1.636,0,0,0-2.189.792c-.425.639-1.2,2.479.034,3.172Zm1.619-5.774c1.044-.505,1.924-3.662,1.924-3.662l1.909.459s-1.186,5.016-1.768,7.4c-.647,2.636-2.02,3.761-4.247,2.984-1.389-.486-1.745-2.169-1.339-3.857a4.286,4.286,0,0,1,3.52-3.321Z" transform="translate(-384.941 -360.97)" fill="#ffd42e"/>
  <path id="Path_27840" data-name="Path 27840" d="M497.072,487a1.588,1.588,0,0,0-1.3.872,3.27,3.27,0,0,0-.559,2.2,1.022,1.022,0,0,0,.524.689h0a1.117,1.117,0,0,0,.976.05,2.4,2.4,0,0,0,1.24-1.6c.264-.853.291-1.825-.241-2.062a1.531,1.531,0,0,0-.643-.153Zm-.8,4.3a1.5,1.5,0,0,1-.727-.191,1.442,1.442,0,0,1-.719-.945,3.685,3.685,0,0,1,.612-2.518,1.806,1.806,0,0,1,2.437-.861c.8.363.765,1.553.459,2.548a2.8,2.8,0,0,1-1.473,1.852,1.6,1.6,0,0,1-.589.115Zm.991-6.137Zm2.066-3.424c-.218.738-1,3.13-1.978,3.6h0a2.723,2.723,0,0,1-.352.115,3.852,3.852,0,0,0-3.061,3.072c-.325,1.362-.207,3.126,1.209,3.619a2.775,2.775,0,0,0,2.284-.031,4.124,4.124,0,0,0,1.7-2.816c.513-2.085,1.5-6.252,1.722-7.2l-1.523-.367Zm-2.965,11.038a4.122,4.122,0,0,1-1.351-.253c-1.374-.478-1.948-2.085-1.465-4.09a4.258,4.258,0,0,1,3.344-3.363,2.408,2.408,0,0,0,.283-.088c.788-.379,1.58-2.682,1.821-3.535a.2.2,0,0,1,.241-.141l1.909.459a.2.2,0,0,1,.149.241c-.012.05-1.194,5.047-1.771,7.4a4.506,4.506,0,0,1-1.9,3.072,2.677,2.677,0,0,1-1.263.3Z" transform="translate(-384.608 -360.646)"/>
  <path id="Path_27841" data-name="Path 27841" d="M515.7,473.08a.405.405,0,1,1,.3.49.411.411,0,0,1-.3-.49Z" transform="translate(-398.588 -355.383)"/>
  <path id="Path_27842" data-name="Path 27842" d="M236.59,312.81l.031,7.346,7.985-3.757Z" transform="translate(-221.592 -259.847)" fill="#ffd42e"/>
  <path id="Path_27843" data-name="Path 27843" d="M236.472,312.8l.031,6.719,7.3-3.44-7.335-3.279Zm-.172,7.235a.216.216,0,0,1-.107-.03.2.2,0,0,1-.092-.168l-.031-7.342a.2.2,0,0,1,.283-.184l8.016,3.585a.2.2,0,0,1,.119.18.209.209,0,0,1-.115.184l-7.985,3.757a.175.175,0,0,1-.088.019Z" transform="translate(-221.27 -259.531)"/>
  <path id="Path_27844" data-name="Path 27844" d="M203.909,292.843h0a.2.2,0,0,1-.2-.2l.027-8.261a.2.2,0,0,1,.2-.2h0a.2.2,0,0,1,.2.2l-.027,8.261a.2.2,0,0,1-.2.2Z" transform="translate(-201.292 -242.631)"/>
  <path id="Path_27845" data-name="Path 27845" d="M205.658,290.839h0l-8.069-.027a.2.2,0,0,1,0-.4h0l8.069.027a.2.2,0,0,1,0,.4Z" transform="translate(-197.39 -246.488)"/>
  <path id="Path_27846" data-name="Path 27846" d="M205.658,353.495h0l-8.069-.027a.2.2,0,0,1,0-.4h0l8.069.027a.2.2,0,1,1,0,.4Z" transform="translate(-197.39 -284.185)"/>
  <path id="Path_27847" data-name="Path 27847" d="M203.679,346.679h0a.2.2,0,0,1-.2-.2l.027-8.261a.2.2,0,0,1,.2-.2h0a.2.2,0,0,1,.2.2l-.027,8.261a.2.2,0,0,1-.2.2Z" transform="translate(-201.15 -274.965)"/>
  <path id="Path_27848" data-name="Path 27848" d="M284.219,346.679h0a.2.2,0,0,1-.2-.2l.027-8.261a.2.2,0,0,1,.2-.2h0a.2.2,0,0,1,.2.2l-.027,8.261a.2.2,0,0,1-.2.2Z" transform="translate(-250.874 -274.965)"/>
  <path id="Path_27849" data-name="Path 27849" d="M277.588,353.719h0l-8.069-.027a.2.2,0,0,1,0-.4h0l8.069.027a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Z" transform="translate(-241.799 -284.318)"/>
  <path id="Path_27850" data-name="Path 27850" d="M277.588,291.075h0l-8.069-.027a.2.2,0,1,1,0-.4h0l8.069.027a.2.2,0,1,1,0,.4Z" transform="translate(-241.799 -246.633)"/>
  <path id="Path_27851" data-name="Path 27851" d="M284.449,292.843h0a.2.2,0,0,1-.2-.2l.027-8.261a.2.2,0,0,1,.2-.2h0a.2.2,0,0,1,.2.2l-.027,8.261a.2.2,0,0,1-.2.2Z" transform="translate(-251.016 -242.631)"/>
  <path id="Path_27852" data-name="Path 27852" d="M211.034,316.086H236.42V296.14H211.034v19.946Zm25.451.134h-25.52a.064.064,0,0,1-.065-.065v-20.08a.064.064,0,0,1,.065-.065h25.52a.068.068,0,0,1,.069.065v20.08a.068.068,0,0,1-.069.065Z" transform="translate(-205.731 -249.535)"/>
  <path id="Path_27853" data-name="Path 27853" d="M236.59,312.81l.031,7.346,7.985-3.757Z" transform="translate(-221.592 -259.847)" fill="#ffd42e"/>
  <path id="Path_27854" data-name="Path 27854" d="M236.472,312.8l.031,6.719,7.3-3.44-7.335-3.279Zm-.172,7.235a.216.216,0,0,1-.107-.03.2.2,0,0,1-.092-.168l-.031-7.342a.2.2,0,0,1,.283-.184l8.016,3.585a.2.2,0,0,1,.119.18.209.209,0,0,1-.115.184l-7.985,3.757a.175.175,0,0,1-.088.019Z" transform="translate(-221.27 -259.531)"/>
  <path id="Path_27855" data-name="Path 27855" d="M203.909,292.843h0a.2.2,0,0,1-.2-.2l.027-8.261a.2.2,0,0,1,.2-.2h0a.2.2,0,0,1,.2.2l-.027,8.261a.2.2,0,0,1-.2.2Z" transform="translate(-201.292 -242.631)"/>
  <path id="Path_27856" data-name="Path 27856" d="M205.658,290.839h0l-8.069-.027a.2.2,0,0,1,0-.4h0l8.069.027a.2.2,0,0,1,0,.4Z" transform="translate(-197.39 -246.488)"/>
  <path id="Path_27857" data-name="Path 27857" d="M205.658,353.495h0l-8.069-.027a.2.2,0,0,1,0-.4h0l8.069.027a.2.2,0,1,1,0,.4Z" transform="translate(-197.39 -284.185)"/>
  <path id="Path_27858" data-name="Path 27858" d="M203.679,346.679h0a.2.2,0,0,1-.2-.2l.027-8.261a.2.2,0,0,1,.2-.2h0a.2.2,0,0,1,.2.2l-.027,8.261a.2.2,0,0,1-.2.2Z" transform="translate(-201.15 -274.965)"/>
  <path id="Path_27859" data-name="Path 27859" d="M284.219,346.679h0a.2.2,0,0,1-.2-.2l.027-8.261a.2.2,0,0,1,.2-.2h0a.2.2,0,0,1,.2.2l-.027,8.261a.2.2,0,0,1-.2.2Z" transform="translate(-250.874 -274.965)"/>
  <path id="Path_27860" data-name="Path 27860" d="M277.588,353.719h0l-8.069-.027a.2.2,0,0,1,0-.4h0l8.069.027a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Z" transform="translate(-241.799 -284.318)"/>
  <path id="Path_27861" data-name="Path 27861" d="M277.588,291.075h0l-8.069-.027a.2.2,0,1,1,0-.4h0l8.069.027a.2.2,0,1,1,0,.4Z" transform="translate(-241.799 -246.633)"/>
  <path id="Path_27862" data-name="Path 27862" d="M284.449,292.843h0a.2.2,0,0,1-.2-.2l.027-8.261a.2.2,0,0,1,.2-.2h0a.2.2,0,0,1,.2.2l-.027,8.261a.2.2,0,0,1-.2.2Z" transform="translate(-251.016 -242.631)"/>
  <path id="Path_27863" data-name="Path 27863" d="M211.034,316.086H236.42V296.14H211.034v19.946Zm25.451.134h-25.52a.064.064,0,0,1-.065-.065v-20.08a.064.064,0,0,1,.065-.065h25.52a.068.068,0,0,1,.069.065v20.08a.068.068,0,0,1-.069.065Z" transform="translate(-205.731 -249.535)"/>
  <path id="Path_27864" data-name="Path 27864" d="M276.966,257.138H248.809a.2.2,0,1,1,0-.4h28.157a.2.2,0,1,1,0,.4Z" transform="translate(-229.013 -226.23)"/>
  <path id="Path_27865" data-name="Path 27865" d="M276.15,253.249c0-2.334.566-2.479,1.27-2.479s1.27.18,1.27,2.479c0,2.537-.566,2.479-1.27,2.479s-1.27-.306-1.27-2.479Z" transform="translate(-246.016 -222.599)"/>
  <path id="Path_27866" data-name="Path 27866" d="M277.089,250.642c-.524,0-1.067,0-1.067,2.28s.643,2.28,1.067,2.28h.046c.3,0,.5-.008.643-.153.256-.256.379-.953.379-2.127,0-2.28-.54-2.28-1.068-2.28Zm.092,4.963h-.092c-1.044,0-1.469-.777-1.469-2.682,0-2.254.517-2.682,1.469-2.682.93,0,1.469.44,1.469,2.682,0,1.343-.149,2.062-.5,2.41a1.118,1.118,0,0,1-.88.272Z" transform="translate(-245.688 -222.277)"/>
  <path id="Path_27867" data-name="Path 27867" d="M263.635,252.473a.065.065,0,0,1-.065-.069v-1.745a.068.068,0,0,1,.065-.069.069.069,0,0,1,.069.069V252.4a.069.069,0,0,1-.069.069Z" transform="translate(-238.249 -222.517)"/>
  <path id="Path_27868" data-name="Path 27868" d="M278.425,252.473a.065.065,0,0,1-.065-.069v-1.745a.068.068,0,0,1,.065-.069.065.065,0,0,1,.065.069V252.4a.065.065,0,0,1-.065.069Z" transform="translate(-247.38 -222.517)"/>
  <path id="Path_27869" data-name="Path 27869" d="M293.215,252.473a.065.065,0,0,1-.065-.069v-1.745a.068.068,0,0,1,.065-.069.069.069,0,0,1,.069.069V252.4a.071.071,0,0,1-.069.069Z" transform="translate(-256.511 -222.517)"/>
  <path id="Path_27870" data-name="Path 27870" d="M308.005,252.473a.065.065,0,0,1-.065-.069v-1.745a.068.068,0,0,1,.065-.069.065.065,0,0,1,.065.069V252.4a.068.068,0,0,1-.065.069Z" transform="translate(-265.642 -222.517)"/>
  <path id="Path_27871" data-name="Path 27871" d="M592.069,508.607a.2.2,0,0,1-.2-.2V498.119a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v10.288a.2.2,0,0,1-.2.2Z" transform="translate(-446.729 -370.91)"/>
  <path id="Path_27872" data-name="Path 27872" d="M585.659,509.755a.2.2,0,0,1-.2-.2v-6.547a.2.2,0,0,1,.4,0v6.547a.2.2,0,0,1-.2.2Z" transform="translate(-442.678 -373.929)"/>
  <path id="Path_27873" data-name="Path 27873" d="M579.429,510.881a.2.2,0,0,1-.2-.2v-2.873a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v2.873a.2.2,0,0,1-.2.2Z" transform="translate(-438.74 -376.892)"/>
  <path id="Path_27874" data-name="Path 27874" d="M598.279,509.755a.2.2,0,0,1-.2-.2v-6.547a.2.2,0,0,1,.4,0v6.547a.2.2,0,0,1-.2.2Z" transform="translate(-450.655 -373.929)"/>
  <path id="Path_27875" data-name="Path 27875" d="M604.519,510.881a.2.2,0,0,1-.2-.2v-2.873a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v2.873a.2.2,0,0,1-.2.2Z" transform="translate(-454.599 -376.892)"/>
  <path id="Path_27876" data-name="Path 27876" d="M661.449,508.607a.2.2,0,0,1-.2-.2V498.119a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v10.288a.2.2,0,0,1-.2.2Z" transform="translate(-490.582 -370.91)"/>
  <path id="Path_27877" data-name="Path 27877" d="M655.039,509.755a.2.2,0,0,1-.2-.2v-6.547a.2.2,0,0,1,.4,0v6.547a.2.2,0,0,1-.2.2Z" transform="translate(-486.531 -373.929)"/>
  <path id="Path_27878" data-name="Path 27878" d="M648.809,510.881a.2.2,0,0,1-.2-.2v-2.873a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v2.873a.2.2,0,0,1-.2.2Z" transform="translate(-482.593 -376.892)"/>
  <path id="Path_27879" data-name="Path 27879" d="M667.659,509.755a.2.2,0,0,1-.2-.2v-6.547a.2.2,0,0,1,.4,0v6.547a.2.2,0,0,1-.2.2Z" transform="translate(-494.508 -373.929)"/>
  <path id="Path_27880" data-name="Path 27880" d="M673.889,510.881a.2.2,0,0,1-.2-.2v-2.873a.2.2,0,1,1,.4,0v2.873a.2.2,0,0,1-.2.2Z" transform="translate(-498.446 -376.892)"/>
  <path id="Path_27881" data-name="Path 27881" d="M629.439,508.607a.2.2,0,0,1-.2-.2V498.119a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v10.288a.2.2,0,0,1-.2.2Z" transform="translate(-470.35 -370.91)"/>
  <path id="Path_27882" data-name="Path 27882" d="M616.879,509.755a.2.2,0,0,1-.2-.2v-6.547a.2.2,0,0,1,.4,0v6.547a.2.2,0,0,1-.2.2Z" transform="translate(-462.412 -373.929)"/>
  <path id="Path_27883" data-name="Path 27883" d="M610.649,511.409a.2.2,0,0,1-.2-.2v-1.171a.2.2,0,0,1,.4,0v1.171a.2.2,0,0,1-.2.2Z" transform="translate(-458.474 -378.269)"/>
  <path id="Path_27884" data-name="Path 27884" d="M679.789,511.409a.2.2,0,0,1-.2-.2v-1.171a.2.2,0,1,1,.4,0v1.171a.2.2,0,0,1-.2.2Z" transform="translate(-502.175 -378.269)"/>
  <path id="Path_27885" data-name="Path 27885" d="M623.109,510.881a.2.2,0,0,1-.2-.2v-2.873a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v2.873a.2.2,0,0,1-.2.2Z" transform="translate(-466.349 -376.892)"/>
  <path id="Path_27886" data-name="Path 27886" d="M635.649,509.755a.2.2,0,0,1-.2-.2v-6.547a.2.2,0,0,1,.4,0v6.547a.2.2,0,0,1-.2.2Z" transform="translate(-474.275 -373.929)"/>
  <path id="Path_27887" data-name="Path 27887" d="M642.229,510.318a.2.2,0,0,1-.2-.2v-4.71a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v4.71a.2.2,0,0,1-.2.2Z" transform="translate(-478.435 -375.41)"/>
  <path id="Path_27888" data-name="Path 27888" d="M461.439,192.2a.2.2,0,0,1-.2-.2V181.709a.2.2,0,1,1,.4,0V192a.2.2,0,0,1-.2.2Z" transform="translate(-364.162 -180.992)"/>
  <path id="Path_27889" data-name="Path 27889" d="M455.029,193.344a.2.2,0,0,1-.2-.2V186.6a.2.2,0,0,1,.4,0v6.546a.2.2,0,0,1-.2.2Z" transform="translate(-360.111 -184.01)"/>
  <path id="Path_27890" data-name="Path 27890" d="M448.789,194.471a.2.2,0,0,1-.2-.2V191.4a.2.2,0,1,1,.4,0v2.873a.2.2,0,0,1-.2.2Z" transform="translate(-356.166 -186.974)"/>
  <path id="Path_27891" data-name="Path 27891" d="M467.649,193.344a.2.2,0,0,1-.2-.2V186.6a.2.2,0,0,1,.4,0v6.546a.2.2,0,0,1-.2.2Z" transform="translate(-368.087 -184.01)"/>
  <path id="Path_27892" data-name="Path 27892" d="M473.879,194.471a.2.2,0,0,1-.2-.2V191.4a.2.2,0,0,1,.4,0v2.873a.2.2,0,0,1-.2.2Z" transform="translate(-372.025 -186.974)"/>
  <path id="Path_27893" data-name="Path 27893" d="M498.8,192.2a.2.2,0,0,1-.2-.2V181.709a.2.2,0,1,1,.4,0V192a.2.2,0,0,1-.2.2Z" transform="translate(-387.776 -180.992)"/>
  <path id="Path_27894" data-name="Path 27894" d="M486.249,193.344a.2.2,0,0,1-.2-.2V186.6a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v6.546a.2.2,0,0,1-.2.2Z" transform="translate(-379.844 -184.01)"/>
  <path id="Path_27895" data-name="Path 27895" d="M480.019,194.989a.2.2,0,0,1-.2-.2v-1.171a.2.2,0,1,1,.4,0v1.171a.2.2,0,0,1-.2.2Z" transform="translate(-375.906 -188.343)"/>
  <path id="Path_27896" data-name="Path 27896" d="M492.479,194.471a.2.2,0,0,1-.2-.2V191.4a.2.2,0,0,1,.4,0v2.873a.2.2,0,0,1-.2.2Z" transform="translate(-383.782 -186.974)"/>
  <path id="Path_27897" data-name="Path 27897" d="M505.009,193.344a.2.2,0,0,1-.2-.2V186.6a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2v6.546a.2.2,0,0,1-.2.2Z" transform="translate(-391.702 -184.01)"/>
  <path id="Path_27898" data-name="Path 27898" d="M511.589,193.908a.2.2,0,0,1-.2-.2V189a.2.2,0,1,1,.4,0v4.71a.2.2,0,0,1-.2.2Z" transform="translate(-395.861 -185.492)"/>
  <path id="Path_27899" data-name="Path 27899" d="M822.813,358.352a2.311,2.311,0,1,0,2.311,2.311,2.314,2.314,0,0,0-2.311-2.311Zm0,5.024a2.713,2.713,0,1,1,2.713-2.713,2.716,2.716,0,0,1-2.713,2.713Z" transform="translate(-591.743 -287.011)"/>
  <path id="Path_27900" data-name="Path 27900" d="M647.268,442.206a1.056,1.056,0,1,0,1.056,1.056,1.058,1.058,0,0,0-1.056-1.056Zm0,2.51a1.458,1.458,0,1,1,1.458-1.458,1.46,1.46,0,0,1-1.458,1.458Z" transform="translate(-480.889 -337.49)"/>
  <path id="Path_27901" data-name="Path 27901" d="M417.538,501.4a1.056,1.056,0,1,0,1.056,1.056,1.058,1.058,0,0,0-1.056-1.056Zm0,2.51A1.458,1.458,0,1,1,419,502.448a1.46,1.46,0,0,1-1.458,1.458Z" transform="translate(-335.649 -372.804)"/>
  <path id="Path_27902" data-name="Path 27902" d="M728.578,194.052a1.056,1.056,0,1,0,1.056,1.056,1.058,1.058,0,0,0-1.056-1.056Zm0,2.514a1.458,1.458,0,1,1,1.458-1.458,1.46,1.46,0,0,1-1.458,1.458Z" transform="translate(-532.294 -188.486)"/>
  <path id="Path_27903" data-name="Path 27903" d="M446.238,243.382a1.056,1.056,0,1,0,1.056,1.056,1.058,1.058,0,0,0-1.056-1.056Zm0,2.514a1.458,1.458,0,1,1,1.458-1.458,1.46,1.46,0,0,1-1.458,1.458Z" transform="translate(-353.794 -217.933)"/>
  <path id="Path_27904" data-name="Path 27904" d="M255.423,380.962a2.311,2.311,0,1,0,2.311,2.311,2.314,2.314,0,0,0-2.311-2.311Zm0,5.024a2.713,2.713,0,1,1,2.713-2.713,2.716,2.716,0,0,1-2.713,2.713Z" transform="translate(-231.544 -300.599)"/>
  <path id="Path_27905" data-name="Path 27905" d="M812.84,406.413a.983.983,0,1,1,.983.983.983.983,0,0,1-.983-.983Z" transform="translate(-587.261 -315.646)"/>
  <path id="Path_27906" data-name="Path 27906" d="M813.5,405.308a.781.781,0,1,0,.78.781.781.781,0,0,0-.78-.781Zm0,1.967a1.182,1.182,0,1,1,1.182-1.182,1.186,1.186,0,0,1-1.182,1.182Z" transform="translate(-586.94 -315.322)"/>
  <path id="Path_27907" data-name="Path 27907" d="M318.35,462.443a.981.981,0,1,1,.983.983.983.983,0,0,1-.983-.983Z" transform="translate(-272.069 -348.4)"/>
  <path id="Path_27908" data-name="Path 27908" d="M319.012,461.332a.781.781,0,1,0,.781.781.781.781,0,0,0-.781-.781Zm0,1.963a1.182,1.182,0,1,1,1.182-1.182,1.183,1.183,0,0,1-1.182,1.182Z" transform="translate(-271.748 -348.072)"/>
  <path id="Path_27909" data-name="Path 27909" d="M250.14,221.7a.983.983,0,1,1,.983.983.983.983,0,0,1-.983-.983Z" transform="translate(-229.957 -205.199)"/>
  <path id="Path_27910" data-name="Path 27910" d="M250.8,220.6a.781.781,0,1,0,.781.781.781.781,0,0,0-.781-.781Zm0,1.963a1.182,1.182,0,1,1,1.182-1.182,1.185,1.185,0,0,1-1.182,1.182Z" transform="translate(-229.636 -204.879)"/>
  <path id="Path_27911" data-name="Path 27911" d="M547.36,381.419a1.749,1.749,0,1,1,1.749,1.749,1.748,1.748,0,0,1-1.749-1.749Z" transform="translate(-418.659 -300.115)"/>
  <path id="Path_27912" data-name="Path 27912" d="M548.788,379.558a1.546,1.546,0,1,0,1.546,1.546,1.546,1.546,0,0,0-1.546-1.546Zm0,3.5a1.948,1.948,0,1,1,1.948-1.948,1.948,1.948,0,0,1-1.948,1.948Z" transform="translate(-418.338 -299.799)"/>
  <path id="Path_27913" data-name="Path 27913" d="M734.381,323.767a8.114,8.114,0,0,0,3.815,8.467c1.592.849,3.447,1.052,5.1,1.772s3.206,2.292,2.938,4.075c-.176,1.182-1.266,3.761,2.028,5.888,2.721,1.752.926,8.659-8.582,10.2-2.915.471-.773-1.523-3.585-2.418a13.224,13.224,0,0,1-6.742-5.307,24.06,24.06,0,0,1-3.286-8.046c-.765-3.267-1.11-6.8.165-9.9s4.576-5.575,8.15-4.725Z" transform="translate(-533.266 -265.783)"/>
  <path id="Path_27914" data-name="Path 27914" d="M732.626,323.472a7.488,7.488,0,0,0-6.535,4.767c-1.063,2.59-1.113,5.7-.157,9.78A23.771,23.771,0,0,0,729.19,346a13,13,0,0,0,6.638,5.227,2.4,2.4,0,0,1,1.86,1.768c.18.555.275.861,1.634.643,6.16-.995,8.953-4.251,9.474-6.734a2.853,2.853,0,0,0-.968-3.1,4.605,4.605,0,0,1-2.215-5.59c.042-.187.076-.352.1-.493.252-1.7-1.286-3.191-2.82-3.861a17.809,17.809,0,0,0-2.25-.746,13.935,13.935,0,0,1-2.862-1.037,8.279,8.279,0,0,1-3.949-8.49,6.544,6.544,0,0,0-1.2-.119Zm5.988,30.636a1.155,1.155,0,0,1-1.3-.987,2,2,0,0,0-1.6-1.508,13.407,13.407,0,0,1-6.849-5.387,24.113,24.113,0,0,1-3.317-8.115c-.976-4.167-.922-7.35.176-10.025,1.24-3.019,4.6-5.743,8.379-4.84a.206.206,0,0,1,.153.23,7.884,7.884,0,0,0,3.711,8.257,13.662,13.662,0,0,0,2.786,1,17.972,17.972,0,0,1,2.3.761c1.672.727,3.344,2.38,3.057,4.285-.023.153-.061.333-.1.52a4.214,4.214,0,0,0,2.039,5.169,3.243,3.243,0,0,1,1.144,3.516c-.547,2.609-3.439,6.019-9.8,7.048a4.8,4.8,0,0,1-.769.073Z" transform="translate(-532.938 -265.457)"/>
  <path id="Path_27915" data-name="Path 27915" d="M704.744,303.44c.964,4.7-4.308,11.367-6.237,15.764-.627,1.427-1.534,2.732-2.051,4.205a13.08,13.08,0,0,0-.463,5.5c.318,3.493,1.366,7.074,3.818,9.577s6.562,3.593,9.592,1.829c2.659-1.55,3.872-4.878,3.7-7.951s-1.477-5.953-2.862-8.7c-3.321-6.6-.987-14.532-5.5-20.225Z" transform="translate(-512.997 -253.56)"/>
  <path id="Path_27916" data-name="Path 27916" d="M704.724,303.86c.226,3.3-2.07,7.312-4.113,10.885-.872,1.527-1.7,2.965-2.242,4.216-.268.608-.586,1.2-.9,1.768a16.891,16.891,0,0,0-1.152,2.422,12.718,12.718,0,0,0-.451,5.418c.371,4.105,1.638,7.289,3.765,9.454,2.579,2.629,6.6,3.4,9.347,1.795,2.372-1.381,3.788-4.431,3.6-7.767-.168-3.084-1.5-5.953-2.839-8.624-1.511-3-1.867-6.286-2.208-9.458-.394-3.673-.773-7.151-2.816-10.109Zm1.018,37.186a9.115,9.115,0,0,1-6.39-2.747c-2.193-2.234-3.5-5.5-3.876-9.7a13.115,13.115,0,0,1,.474-5.586,17.148,17.148,0,0,1,1.175-2.479c.306-.562.62-1.148.88-1.737.555-1.27,1.385-2.72,2.261-4.255,2.173-3.8,4.634-8.107,3.96-11.39a.2.2,0,0,1,.111-.222.2.2,0,0,1,.241.057c2.521,3.176,2.927,6.944,3.359,10.935.341,3.137.689,6.386,2.169,9.32,1.366,2.709,2.709,5.621,2.881,8.781.187,3.486-1.3,6.677-3.8,8.134a6.775,6.775,0,0,1-3.444.888Z" transform="translate(-512.683 -253.234)"/>
  <path id="Path_27917" data-name="Path 27917" d="M715.6,353.4c-.088-2.506-.046-4.978.057-6.853a11.346,11.346,0,0,0-3.222-1.041,1.891,1.891,0,0,0-1.454.191c-.241.191-1.389-.823-1.507-.543-.815,1.913-1.645,6.524-2.464,8.437-.061.149-3.9.673-3.96.823-.268.624,1.695,3.141,1.89,3.271,10.465,6.956,16.112-3.463,16.112-3.463s-2.51-.26-5.452-.823Z" transform="translate(-517.532 -279.07)" fill="#fff"/>
  <path id="Path_27918" data-name="Path 27918" d="M702.841,354.245Zm.057-.019c-.046.57,1.557,2.743,1.837,2.969,3.138,2.085,6.145,2.793,8.938,2.1,3.815-.945,6.126-4.274,6.722-5.234-.761-.088-2.835-.344-5.157-.788a.2.2,0,0,1-.161-.191c-.077-2.208-.057-4.656.05-6.738a11.044,11.044,0,0,0-3.046-.964,1.728,1.728,0,0,0-1.3.149c-.226.176-.574-.027-1.014-.283a4.941,4.941,0,0,0-.471-.252,36.683,36.683,0,0,0-1.186,4.1,34.487,34.487,0,0,1-1.24,4.247c-.065.145-.077.172-2.127.528-.681.122-1.588.279-1.848.36Zm8.659,5.728a12.786,12.786,0,0,1-7.048-2.43c-.134-.092-2.3-2.72-1.967-3.516.061-.149.073-.176,2.135-.532.689-.119,1.615-.279,1.852-.356A35.958,35.958,0,0,0,707.723,349a34.643,34.643,0,0,1,1.24-4.247.267.267,0,0,1,.168-.153c.191-.061.432.069.838.306a2.79,2.79,0,0,0,.589.295,2.1,2.1,0,0,1,1.584-.21,11.271,11.271,0,0,1,3.279,1.06.2.2,0,0,1,.111.191c-.111,2.051-.134,4.473-.061,6.676,2.835.536,5.253.784,5.276.788a.2.2,0,0,1,.157.107.2.2,0,0,1,0,.188c-.023.046-2.506,4.542-7.132,5.689a9.383,9.383,0,0,1-2.215.268Z" transform="translate(-517.217 -278.748)"/>
  <path id="Path_27919" data-name="Path 27919" d="M704.55,299.372c-.57,2.273-1.029,4.71-2.437,6.638-.769,1.052-3.1,7.021,1.01,10.61a9.968,9.968,0,0,0,8.333,2.3,9.252,9.252,0,0,0,6.5-6.294,2.388,2.388,0,0,0,3.658-.735,1.936,1.936,0,0,0-1.044-2.33,1.725,1.725,0,0,0-1.45-.069,21.433,21.433,0,0,1,1.4-5.1c-.933-2.475-3.214-4.457-5.708-5.9a10.583,10.583,0,0,0-2.625-1.155c-2.674-.7-7.052-.295-7.637,2.039Z" transform="translate(-516.194 -250.105)" fill="#fff"/>
  <path id="Path_27920" data-name="Path 27920" d="M704.223,299.064Zm5.05-2.15a7.579,7.579,0,0,0-3.727.823,2.257,2.257,0,0,0-1.129,1.377h0c-.069.275-.138.555-.2.83a16.129,16.129,0,0,1-2.265,5.873c-.528.723-3.2,6.692.979,10.342a9.711,9.711,0,0,0,8.169,2.254,9.09,9.09,0,0,0,6.344-6.145.2.2,0,0,1,.126-.142.2.2,0,0,1,.187.031,2.428,2.428,0,0,0,2.085.421,1.855,1.855,0,0,0,1.266-1.071,1.631,1.631,0,0,0-.1-1.236,1.5,1.5,0,0,0-.83-.826,1.56,1.56,0,0,0-1.332-.069.2.2,0,0,1-.252-.222,21.768,21.768,0,0,1,1.377-5.073c-1.029-2.648-3.6-4.572-5.594-5.728a10.512,10.512,0,0,0-2.575-1.136,10.282,10.282,0,0,0-2.533-.3Zm.053,22.054a10.013,10.013,0,0,1-6.661-2.5c-4.117-3.6-1.982-9.592-1.041-10.878a15.841,15.841,0,0,0,2.2-5.731c.069-.279.134-.559.2-.834a2.652,2.652,0,0,1,1.312-1.622c1.722-1.025,4.668-1.056,6.562-.566a10.9,10.9,0,0,1,2.678,1.179c2.062,1.2,4.744,3.21,5.8,6.007a.2.2,0,0,1,0,.149,20.957,20.957,0,0,0-1.335,4.752,1.872,1.872,0,0,1,1.27.153,1.9,1.9,0,0,1,1.064,1.041,2.051,2.051,0,0,1,.1,1.557,2.262,2.262,0,0,1-1.534,1.3,2.822,2.822,0,0,1-2.193-.325,9.417,9.417,0,0,1-6.589,6.168,11.947,11.947,0,0,1-1.833.149Z" transform="translate(-515.872 -249.801)"/>
  <path id="Path_27921" data-name="Path 27921" d="M729.885,322.649Zm-2.9-4.041a2.858,2.858,0,0,0-1.588.5,3.461,3.461,0,0,0-1.416,2.043,3.126,3.126,0,0,0,2.047,3.906,2.787,2.787,0,0,0,2.246-.413,3.557,3.557,0,0,0,1.148-4.515,2.771,2.771,0,0,0-1.776-1.435,2.592,2.592,0,0,0-.662-.084Zm-.3,6.933a3,3,0,0,1-.758-.1,3.537,3.537,0,0,1-2.338-4.4,3.866,3.866,0,0,1,1.584-2.28,3.131,3.131,0,0,1,4.6,1.167,3.865,3.865,0,0,1,.3,2.759h0a3.845,3.845,0,0,1-1.584,2.277,3.22,3.22,0,0,1-1.806.57Z" transform="translate(-530.103 -263.09)"/>
  <path id="Path_27922" data-name="Path 27922" d="M704,310.7a2.858,2.858,0,0,0-1.588.5,3.557,3.557,0,0,0-1.148,4.515,2.733,2.733,0,0,0,4.021,1.021,3.46,3.46,0,0,0,1.416-2.043h0a3.126,3.126,0,0,0-2.047-3.906A2.54,2.54,0,0,0,704,310.7Zm-.3,6.933a3,3,0,0,1-.758-.1,3.183,3.183,0,0,1-2.032-1.638,3.964,3.964,0,0,1,1.278-5.039,3.186,3.186,0,0,1,2.567-.471,3.532,3.532,0,0,1,2.334,4.4h0a3.877,3.877,0,0,1-1.58,2.28,3.237,3.237,0,0,1-1.81.566Z" transform="translate(-515.565 -258.338)"/>
  <path id="Path_27923" data-name="Path 27923" d="M752.416,277.036a5.914,5.914,0,1,0-6.378,5.41,5.913,5.913,0,0,0,6.378-5.41Z" transform="translate(-542.665 -234.457)"/>
  <path id="Path_27924" data-name="Path 27924" d="M746.184,270.515a5.719,5.719,0,1,0,5.7,6.187h0a5.715,5.715,0,0,0-5.227-6.164c-.157-.015-.318-.023-.475-.023Zm.019,11.83c-.168,0-.34-.008-.513-.019a6.165,6.165,0,1,1,.513.019Z" transform="translate(-542.337 -234.138)"/>
  <path id="Path_27925" data-name="Path 27925" d="M721.427,303.547a16.6,16.6,0,0,1-.191-7.43c-6.359,1.01-11.44-.452-16.3-2.594a9.836,9.836,0,0,1,1.8-3.325,9.266,9.266,0,0,1,6.868-3.03,15.159,15.159,0,0,1,7.641,1.6,11.714,11.714,0,0,1,4.561,5.269,10.378,10.378,0,0,1,.723,6,7.328,7.328,0,0,1-2.556,4.121,1.994,1.994,0,0,0-1.117-.846,2.505,2.505,0,0,0-1.435.229Z" transform="translate(-518.871 -244.285)"/>
  <path id="Path_27926" data-name="Path 27926" d="M722.185,302.767a1.975,1.975,0,0,1,.386.038,1.911,1.911,0,0,1,1.094.746,6.9,6.9,0,0,0,2.346-3.864,10.221,10.221,0,0,0-.7-5.877,11.392,11.392,0,0,0-4.476-5.181,14.976,14.976,0,0,0-7.534-1.58,9.082,9.082,0,0,0-6.734,2.973,9.8,9.8,0,0,0-1.7,3.069c4.22,1.844,9.416,3.558,16.024,2.506a.2.2,0,0,1,.226.241,16.224,16.224,0,0,0,.145,7.12,2.727,2.727,0,0,1,.93-.191Zm1.469,1.278h-.011a.21.21,0,0,1-.146-.069l-.038-.046a1.754,1.754,0,0,0-.96-.731,2.3,2.3,0,0,0-1.328.214A.215.215,0,0,1,721,303.4a.207.207,0,0,1-.1-.138,17.042,17.042,0,0,1-.245-7.228c-6.661.987-11.884-.781-16.123-2.652a.2.2,0,0,1-.115-.233,10.09,10.09,0,0,1,1.855-3.417,9.453,9.453,0,0,1,7-3.088,15.373,15.373,0,0,1,7.748,1.63,11.811,11.811,0,0,1,4.641,5.356,10.518,10.518,0,0,1,.739,6.126,7.646,7.646,0,0,1-2.609,4.228.188.188,0,0,1-.138.057Z" transform="translate(-518.552 -243.967)"/>
  <path id="Path_27927" data-name="Path 27927" d="M719.353,342.223a1.836,1.836,0,0,1-1.672-.88.2.2,0,0,1,.08-.272.2.2,0,0,1,.272.08,1.461,1.461,0,0,0,1.362.673,2.859,2.859,0,0,0,1.9-.8.2.2,0,1,1,.276.291,3.257,3.257,0,0,1-2.166.911Z" transform="translate(-526.343 -276.888)"/>
  <path id="Path_27928" data-name="Path 27928" d="M729.961,326.951a.561.561,0,1,0-.673.375.542.542,0,0,0,.673-.375Z" transform="translate(-533.338 -268.058)"/>
  <path id="Path_27929" data-name="Path 27929" d="M709.437,320.041a.559.559,0,1,0-.669.375.544.544,0,0,0,.669-.375Z" transform="translate(-520.367 -263.902)"/>
  <path id="Path_27930" data-name="Path 27930" d="M714.171,326.187a.181.181,0,0,1-.134-.054l-.6-.543a.438.438,0,0,1,.1-.792,3.07,3.07,0,0,0,1.443-2.269.2.2,0,1,1,.4.042,3.481,3.481,0,0,1-1.63,2.571.663.663,0,0,0-.111.08.8.8,0,0,0,.073.076l.6.543a.2.2,0,0,1,.012.283.21.21,0,0,1-.146.061Z" transform="translate(-523.49 -265.642)"/>
  <path id="Path_27931" data-name="Path 27931" d="M720.25,319.939a.2.2,0,0,1-.18-.107,2.28,2.28,0,0,0-1.7-1.167c-.359-.046-.777.046-.876.314a.2.2,0,0,1-.375-.138,1.176,1.176,0,0,1,1.3-.574,2.7,2.7,0,0,1,2,1.381.2.2,0,0,1-.084.268.2.2,0,0,1-.092.023Z" transform="translate(-525.977 -263.219)"/>
  <path id="Path_27932" data-name="Path 27932" d="M743.145,327.582a.166.166,0,0,1-.073-.015l-2.548-1a.2.2,0,0,1,.146-.375l2.548,1a.2.2,0,0,1-.073.39Z" transform="translate(-542.536 -267.988)"/>
  <path id="Path_27933" data-name="Path 27933" d="M746.634,331a.183.183,0,0,1-.077-.015.2.2,0,0,1-.111-.26,4.874,4.874,0,0,0,.36-1.966.2.2,0,0,1,.2-.207.206.206,0,0,1,.206.2,5.365,5.365,0,0,1-.39,2.123.192.192,0,0,1-.184.13Z" transform="translate(-546.261 -269.398)"/>
  <path id="Path_27934" data-name="Path 27934" d="M660.157,375.853c2.475-1.439,6.585-6.546,5.46-10.683-.6-2.2-1.657-10.143-13.231-10.885-.233,3.688-3.83,5.353-6.129,5.628-1.251.149-5.965.008-5.965-5.468a38.9,38.9,0,0,0-13.135,3.072c-4.6,1.833-12.443,3.042-12.443,3.042s-7.928-10.143-10.774-14.3c-1.565-2.284-4.385,7.182-6.13,3.183-.264-.6,8.123,16.165,8.8,17.436,3.562,6.631,20,2.433,23.186,2.433a10.2,10.2,0,0,0,3.268,8.754,52.012,52.012,0,0,1-2.112,18.04s14.585,5.418,29.683.957c1.159-.337-2.893-9.672-.482-21.208Z" transform="translate(-454.5 -277.052)" fill="#6366f1"/>
  <path id="Path_27935" data-name="Path 27935" d="M630.881,395.676a50.827,50.827,0,0,0,8.965,2.078,48.86,48.86,0,0,0,20.409-1.19s.111-.061.053-.723c-.046-.543-.187-1.312-.367-2.288-.666-3.642-1.9-10.426-.306-18.052a.2.2,0,0,1,.1-.134c2.5-1.454,6.436-6.527,5.368-10.457-.042-.157-.088-.344-.138-.551-.685-2.827-2.28-9.42-12.714-10.17-.371,3.884-4.255,5.372-6.286,5.613a6.178,6.178,0,0,1-4.519-1.3,5.469,5.469,0,0,1-1.672-4.155,39.022,39.022,0,0,0-12.864,3.046c-4.568,1.818-12.4,3.042-12.485,3.053a.188.188,0,0,1-.187-.076c-.08-.1-7.966-10.2-10.782-14.314-.187-.272-.34-.272-.394-.272h0c-.52,0-1.289,1.106-1.97,2.078-.914,1.309-1.775,2.544-2.667,2.46a.933.933,0,0,1-.1-.015c.157.31.337.666.536,1.064.719,1.423,1.687,3.352,2.69,5.353,2.143,4.266,4.572,9.1,4.92,9.749,2.774,5.161,13.744,3.574,19.636,2.72a31.664,31.664,0,0,1,3.378-.394.2.2,0,0,1,.2.214,10.041,10.041,0,0,0,3.2,8.59.2.2,0,0,1,.069.142,53.683,53.683,0,0,1-2.062,17.929Zm16.674,3.038a54.807,54.807,0,0,1-7.779-.562,50.194,50.194,0,0,1-9.221-2.162.2.2,0,0,1-.119-.256,52.224,52.224,0,0,0,2.1-17.88,10.4,10.4,0,0,1-3.283-8.64c-.666.031-1.76.188-3.107.383-5.988.868-17.137,2.483-20.045-2.927-.352-.654-2.678-5.28-4.928-9.757-1.5-2.984-3.042-6.053-3.631-7.2a3.472,3.472,0,0,1-.253-.482.207.207,0,0,1,.092-.279c.176-.084.249.057.352.252.038.077.092.18.157.306a.823.823,0,0,0,.559.432c.654.065,1.527-1.186,2.3-2.288.842-1.205,1.569-2.25,2.3-2.25h0a.884.884,0,0,1,.723.448c2.667,3.895,9.891,13.17,10.694,14.2.991-.161,8.058-1.332,12.282-3.015a39.5,39.5,0,0,1,13.2-3.088.2.2,0,0,1,.149.054.21.21,0,0,1,.061.145,5.173,5.173,0,0,0,1.538,4.067,5.745,5.745,0,0,0,4.205,1.2c1.955-.233,5.712-1.672,5.95-5.445a.192.192,0,0,1,.069-.138.2.2,0,0,1,.145-.05c10.9.7,12.626,7.813,13.277,10.491.05.207.092.386.134.543,1.156,4.247-2.969,9.355-5.475,10.866-1.55,7.515-.329,14.207.329,17.811.413,2.265.6,3.3.034,3.466a45.4,45.4,0,0,1-12.814,1.76Z" transform="translate(-454.173 -276.746)"/>
  <path id="Path_27936" data-name="Path 27936" d="M593.471,280.41l34.045,1.584-4.488,32.989-34.217-.628Z" transform="translate(-445.798 -239.92)" fill="#fff"/>
  <path id="Path_27937" data-name="Path 27937" d="M588.716,313.845l33.816.62,4.434-32.595-33.643-1.565-4.607,33.54Zm33.988,1.025h0l-34.217-.628a.2.2,0,0,1-.149-.069.194.194,0,0,1-.046-.157l4.66-33.946a.2.2,0,0,1,.207-.172l34.045,1.584a.2.2,0,0,1,.145.073.206.206,0,0,1,.046.157L622.9,314.7a.205.205,0,0,1-.2.168Z" transform="translate(-445.477 -239.607)"/>
  <path id="Path_27938" data-name="Path 27938" d="M675.789,363.2a12.586,12.586,0,0,1-3.371-4.622c-.708-1.645-3.088-5.265-3.964-5.709-1.469-.742-2.357-1.416-3.738-1.6-1.155-.157-3.424.142-3.49.543-.2,1.255,2.809.459,3.065.547a5.025,5.025,0,0,1,2.563,1.68,13.048,13.048,0,0,0-3.937.666,13.456,13.456,0,0,0-2.25,2.552c-.3.574.011,1.14.727.54a14.092,14.092,0,0,0,2.017-1.7,7.292,7.292,0,0,1,3.371-.268,5.069,5.069,0,0,0-3.382.275c-.1.092-1.7,1.84-1.806,2.016-.421.738.295,1.014.865.589.643-.482,1.32-1.266,1.488-1.351a4.281,4.281,0,0,1,2.633-.107,4.514,4.514,0,0,0-2.59.057c-.168.065-1.879,1.431-1.485,2.108.214.363,1.025.168,2.024-.945a12.7,12.7,0,0,1,1.419.341c.344.08,1.511,2.674,2.835,3.428.268.153,1.167,2.4,2.789,5.441.348.658,1.963,1.684,3.73-.773.635-.884,1.488-2.7.486-3.7Z" transform="translate(-490.572 -282.677)" fill="#fff"/>
  <path id="Path_27939" data-name="Path 27939" d="M665.557,358.693Zm-1.35-.727a.065.065,0,0,1,.027,0,6.889,6.889,0,0,1,.979.222c.145.042.295.084.459.122.2.046.379.321.807.991a7.971,7.971,0,0,0,2.078,2.46c.183.1.394.532,1.033,1.859.448.934,1.064,2.215,1.833,3.662a1.445,1.445,0,0,0,1.136.673c.52.034,1.335-.191,2.253-1.469.574-.8,1.416-2.541.513-3.444h0c-.118-.119-.237-.237-.363-.356a12.038,12.038,0,0,1-3.053-4.327c-.727-1.691-3.088-5.211-3.872-5.605-.367-.184-.689-.363-1-.536a7.439,7.439,0,0,0-2.67-1.048,6.907,6.907,0,0,0-3.268.394.3.3,0,0,0,.069.264c.329.337,1.584.168,2.188.088a1.741,1.741,0,0,1,.677-.038,5.224,5.224,0,0,1,2.652,1.745.2.2,0,0,1-.153.321,12.864,12.864,0,0,0-3.838.635,13.413,13.413,0,0,0-2.177,2.472c-.122.241-.1.436-.038.486.046.038.211.019.463-.191,0,0,.031-.023.073-.054a16.523,16.523,0,0,0,1.554-1.243c.2-.214.344-.367.371-.394a5.2,5.2,0,0,1,3.581-.318.2.2,0,0,1-.1.386,7.875,7.875,0,0,0-3.183.207,4.641,4.641,0,0,1-.386.406c-.5.539-1.324,1.458-1.4,1.58-.111.2-.13.36-.046.432a.549.549,0,0,0,.616-.1c.088-.069.18-.142.268-.218a5.282,5.282,0,0,1,1.309-1.213,3.491,3.491,0,0,1,.444-.138,2.981,2.981,0,0,1,.769-.1,6.947,6.947,0,0,1,1.485.165.2.2,0,0,1,.161.226.2.2,0,0,1-.222.168c-.134-.015-.272-.038-.413-.057a6.809,6.809,0,0,0-1.044-.1,3.305,3.305,0,0,0-.6.076,2.188,2.188,0,0,0-.452.172c-.05.031-.226.207-.386.363-.21.21-.478.474-.758.716a1.5,1.5,0,0,0-.226.429.342.342,0,0,0,.008.272.146.146,0,0,0,.126.065c.271.031.846-.23,1.572-1.045a.247.247,0,0,1,.161-.065Zm8.456,10.392c-.042,0-.084,0-.126,0a1.855,1.855,0,0,1-1.465-.884c-.777-1.454-1.393-2.74-1.84-3.677a12.6,12.6,0,0,0-.88-1.691,8.088,8.088,0,0,1-2.208-2.582,5.242,5.242,0,0,0-.582-.819c-.165-.038-.314-.084-.459-.123a7.094,7.094,0,0,0-.823-.2,2.687,2.687,0,0,1-1.837,1.094.545.545,0,0,1-.432-.26.682.682,0,0,1-.077-.474.8.8,0,0,1-.8-.092c-.088-.076-.344-.367-.05-.907-.467.337-.75.191-.853.107a.8.8,0,0,1-.065-.983,13.536,13.536,0,0,1,2.319-2.629,11.829,11.829,0,0,1,3.627-.673,5.039,5.039,0,0,0-2.2-1.3,4.134,4.134,0,0,0-.5.054c-1.045.142-2.1.241-2.533-.2a.7.7,0,0,1-.176-.624c.107-.662,2.72-.846,3.715-.708a7.785,7.785,0,0,1,2.808,1.094c.31.168.631.344.991.528.937.474,3.34,4.136,4.059,5.808a11.535,11.535,0,0,0,2.965,4.2c.122.119.245.241.364.36h0c1.094,1.094.218,3-.471,3.964a3.165,3.165,0,0,1-2.472,1.622Z" transform="translate(-490.253 -282.381)"/>
  <path id="Path_27940" data-name="Path 27940" d="M585.708,303.7c-.337-1.76.517-5.008,1.244-5.67,1.221-1.106,1.9-1.99,3.179-2.533,1.072-.455,3.341-.769,3.509-.4.528,1.155-2.587,1.186-2.808,1.339a5.044,5.044,0,0,0-2.028,2.3,12.987,12.987,0,0,1,3.972-.4,13.645,13.645,0,0,1,2.843,1.863c.44.474.287,1.1-.558.715a14.221,14.221,0,0,1-2.4-1.106,7.289,7.289,0,0,0-3.321.635,5.064,5.064,0,0,1,3.336-.631c.123.061,2.131,1.32,2.273,1.465.6.6-.015,1.056-.677.8-.746-.295-1.607-.872-1.791-.911a4.262,4.262,0,0,0-2.564.593,4.565,4.565,0,0,1,2.514-.631c.176.019,2.192.884,1.99,1.641-.107.406-.945.436-2.2-.375a12.525,12.525,0,0,0-1.278.7c-.31.168-.746,2.977-1.825,4.056a20.018,20.018,0,0,0-.608,4.037c-.241,2.089-2.441-5.605-2.8-7.48Z" transform="translate(-443.013 -248.959)" fill="#fff"/>
  <path id="Path_27941" data-name="Path 27941" d="M593.149,294.882Zm-2.418,8.054Zm1.967-8.123a8.694,8.694,0,0,0-2.808.547,7.357,7.357,0,0,0-2.3,1.718c-.256.249-.524.505-.827.781-.647.585-1.515,3.753-1.182,5.483h0c.341,1.756,1.806,6.749,2.391,7.583,0-.023.008-.05.012-.08.026-.241.053-.49.08-.731.249-2.265.371-3.21.585-3.424a7.991,7.991,0,0,0,1.354-2.923c.237-.757.341-1.071.517-1.171.145-.08.279-.161.409-.237a7.051,7.051,0,0,1,.888-.475.2.2,0,0,1,.188.015c.914.593,1.538.689,1.795.589.08-.031.1-.069.107-.1a.337.337,0,0,0-.065-.264,1.5,1.5,0,0,0-.333-.352c-.333-.157-.662-.344-.922-.49a4.885,4.885,0,0,0-.467-.249,2.257,2.257,0,0,0-.5-.046,3.1,3.1,0,0,0-.57.084,6.3,6.3,0,0,0-1,.379c-.13.057-.26.115-.383.165a.2.2,0,0,1-.26-.1.194.194,0,0,1,.1-.26,6.868,6.868,0,0,1,1.385-.551,2.834,2.834,0,0,1,.773-.111,2.709,2.709,0,0,1,.463.015,5.155,5.155,0,0,1,1.58.823c.107.05.214.1.318.138a.55.55,0,0,0,.624-.065c.061-.092,0-.245-.161-.406-.107-.1-1.152-.765-1.772-1.156a4.154,4.154,0,0,1-.486-.291l-.038-.011a8.464,8.464,0,0,0-3.084.662.2.2,0,0,1-.264-.08.2.2,0,0,1,.061-.268,5.193,5.193,0,0,1,3.535-.643c.034.015.214.126.463.279a16.782,16.782,0,0,0,1.829.788l.088.034c.3.138.459.115.494.065.046-.065.015-.26-.168-.459a13.6,13.6,0,0,0-2.751-1.81,12.932,12.932,0,0,0-3.868.4.2.2,0,0,1-.2-.065.194.194,0,0,1-.031-.207,5.235,5.235,0,0,1,2.1-2.384,1.83,1.83,0,0,1,.662-.142c.6-.08,1.863-.253,2.089-.662a.284.284,0,0,0,0-.272.944.944,0,0,0-.448-.069Zm-4.626,16.219Zm-.065.394c-.2,0-.555-.149-1.58-3.432-.574-1.837-1.079-3.769-1.236-4.572h0c-.348-1.806.5-5.131,1.3-5.854.3-.272.563-.524.819-.773a7.831,7.831,0,0,1,2.418-1.8c.922-.39,3.489-.907,3.769-.3a.68.68,0,0,1,0,.647c-.3.543-1.343.727-2.387.869a4.282,4.282,0,0,0-.5.08,4.965,4.965,0,0,0-1.775,1.844,11.8,11.8,0,0,1,3.673-.31,13.439,13.439,0,0,1,2.935,1.921.794.794,0,0,1,.2.964c-.08.107-.314.321-.853.122.428.444.256.792.2.888a.8.8,0,0,1-.746.3.672.672,0,0,1,.054.474.546.546,0,0,1-.348.367,2.674,2.674,0,0,1-2.062-.57,6.535,6.535,0,0,0-.742.406c-.126.077-.26.157-.409.241a5.281,5.281,0,0,0-.341.945,8.025,8.025,0,0,1-1.454,3.088,19.744,19.744,0,0,0-.471,3.187q-.04.367-.08.735c-.015.142-.057.524-.344.536a.043.043,0,0,0-.034-.008Z" transform="translate(-442.692 -248.64)"/>
  <path id="Path_27942" data-name="Path 27942" d="M633.63,312.65l.03,7.346,7.985-3.757Z" transform="translate(-473.32 -259.752)" fill="#da1e37"/>
  <path id="Path_27943" data-name="Path 27943" d="M633.5,312.642l.031,6.719,7.3-3.44-7.335-3.279Zm-.168,7.235a.207.207,0,0,1-.107-.031.2.2,0,0,1-.092-.168l-.034-7.342a.2.2,0,0,1,.283-.184l8.016,3.585a.2.2,0,0,1,.119.18.2.2,0,0,1-.115.184l-7.985,3.757a.21.21,0,0,1-.084.019Z" transform="translate(-472.995 -259.435)"/>
  <path id="Path_27944" data-name="Path 27944" d="M605.232,285.991h-.008l-1.6-.069a.2.2,0,0,1,.015-.4l1.6.069a.2.2,0,0,1,.191.21.2.2,0,0,1-.2.191Zm3.2.134h-.008l-1.6-.069a.2.2,0,1,1,.019-.4l1.6.069a.2.2,0,0,1,.191.207.2.2,0,0,1-.2.191Zm3.2.138h-.008l-1.6-.069a.2.2,0,0,1-.192-.21.2.2,0,0,1,.207-.191l1.6.069a.2.2,0,0,1,.191.211.2.2,0,0,1-.2.191Zm3.206.134h-.008l-1.6-.069a.2.2,0,0,1,.015-.4l1.6.069a.2.2,0,0,1,.191.21.2.2,0,0,1-.2.191Zm3.2.134h-.008l-1.6-.069a.2.2,0,0,1,.015-.4l1.6.069a.2.2,0,0,1,.191.21.2.2,0,0,1-.2.191Zm3.2.138h-.008l-1.6-.069a.2.2,0,1,1,.015-.4l1.6.069a.2.2,0,0,1,.191.21.2.2,0,0,1-.2.187Zm3.206.134h-.008l-1.6-.069a.2.2,0,0,1-.191-.211.2.2,0,0,1,.21-.191l1.6.069a.2.2,0,0,1,.191.207.208.208,0,0,1-.2.2Zm3.2.134h-.008l-1.6-.069a.2.2,0,0,1,.019-.4l1.6.069a.2.2,0,0,1,.191.21.2.2,0,0,1-.2.191Zm3.2.138h-.008l-1.6-.069a.2.2,0,0,1-.192-.207.2.2,0,0,1,.207-.191l1.6.069a.2.2,0,0,1-.007.4Zm3.2.134h-.008l-1.6-.069a.2.2,0,0,1-.191-.207.2.2,0,0,1,.207-.191l1.6.069a.2.2,0,0,1,.191.211.2.2,0,0,1-.2.187Z" transform="translate(-454.833 -243.529)"/>
  <path id="Path_27945" data-name="Path 27945" d="M595.346,363.535h0l-1.607-.023a.2.2,0,0,1,0-.4h0l1.6.023a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206.042h0l-1.607-.023a.2.2,0,1,1,0-.4l1.6.023a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206.046h0l-1.607-.023a.2.2,0,0,1,0-.4h0l1.6.023a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206.046h0l-1.607-.023a.2.2,0,0,1-.2-.2.206.206,0,0,1,.2-.2l1.6.023a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206.042h0l-1.607-.023a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2h0l1.6.023a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206.046h0l-1.607-.023a.2.2,0,0,1,0-.4h0l1.6.023a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206.042h0l-1.607-.023a.2.2,0,0,1,0-.4l1.6.023a.2.2,0,0,1,.2.2.2.2,0,0,1-.2.2Zm3.206.046h0l-1.607-.023a.2.2,0,0,1-.2-.2.2.2,0,0,1,.2-.2l1.6.023a.2.2,0,0,1,0,.4Z" transform="translate(-448.383 -290.219)"/>
  <path id="Path_27946" data-name="Path 27946" d="M711.368,392.247h-.031c-.551-.065-9.018-7.568-11.425-9.9a.2.2,0,0,1,.28-.287c2.862,2.77,10.521,9.462,11.207,9.791.819-.065,8.016-5.575,10.732-7.656a.2.2,0,0,1,.241.318c-7.339,5.617-10.35,7.737-11,7.737Z" transform="translate(-515.676 -301.336)"/>
  <path id="Path_27947" data-name="Path 27947" d="M702.188,410.616a3.613,3.613,0,0,1-1.155-.172c-2.472-.827-10.166-11.494-12.7-15l-.291-.406c-.624-.865-1.251-2.682-.75-3.711a.2.2,0,1,1,.36.176c-.409.842.149,2.514.716,3.3l.295.406c6.734,9.336,10.939,14.333,12.5,14.853,2.445.815,7.648-1.683,15.473-7.434a.2.2,0,1,1,.237.321c-7,5.146-11.826,7.668-14.685,7.668Z" transform="translate(-507.857 -306.576)"/>
  <path id="Path_27948" data-name="Path 27948" d="M693.024,396.161a.063.063,0,0,1-.065-.057.069.069,0,0,1,.057-.077c1.42-.2,2.491-1.3,3.555-2.514a.068.068,0,0,1,.1.088c-1.079,1.232-2.169,2.357-3.635,2.56Z" transform="translate(-510.72 -308.445)"/>
  <path id="Path_27949" data-name="Path 27949" d="M695.123,401.708a.068.068,0,0,1-.015-.134,3.29,3.29,0,0,0,1.576-.846.064.064,0,0,1,.1,0,.067.067,0,0,1,0,.1,3.424,3.424,0,0,1-1.641.88Z" transform="translate(-511.989 -312.832)"/>
  <path id="Path_27950" data-name="Path 27950" d="M703.927,475.242a71.448,71.448,0,0,1-15.81-1.894.069.069,0,0,1-.05-.08.067.067,0,0,1,.08-.05c3.562.853,16.024,3.424,26.81.608a.065.065,0,1,1,.034.126,44.209,44.209,0,0,1-11.065,1.289Z" transform="translate(-508.36 -355.658)"/>
  <path id="Path_27951" data-name="Path 27951" d="M633.72,292.4h0l-32.189-1.546a.062.062,0,0,1-.061-.069.063.063,0,0,1,.069-.065l32.186,1.546a.07.07,0,0,1,.065.069.068.068,0,0,1-.069.065Z" transform="translate(-453.635 -246.658)"/>
  <path id="Path_27952" data-name="Path 27952" d="M620.645,359.044h0l-26.68-.52a.065.065,0,0,1-.065-.069.063.063,0,0,1,.069-.065l26.676.52a.065.065,0,0,1,.065.069.065.065,0,0,1-.065.065Z" transform="translate(-448.677 -287.381)"/>
  <path id="Path_27953" data-name="Path 27953" d="M680.867,401.371a.167.167,0,0,1-.073-.015.2.2,0,0,1-.115-.26l1.473-3.792a.2.2,0,1,1,.375.145l-1.473,3.792a.2.2,0,0,1-.187.13Z" transform="translate(-502.896 -310.621)"/>
  <path id="Path_27954" data-name="Path 27954" d="M549.64,226.508V222.77h19.552v3.738Z" transform="translate(-420.452 -206.465)" fill="#da1e37"/>
  <path id="Path_27955" data-name="Path 27955" d="M549.518,225.988h19.15v-3.34h-19.15v3.34Zm19.353.4H549.319a.2.2,0,0,1-.2-.2v-3.742a.2.2,0,0,1,.2-.2h19.552a.2.2,0,0,1,.2.2v3.742a.2.2,0,0,1-.2.2Z" transform="translate(-420.132 -206.144)"/>
  <path id="Path_27956" data-name="Path 27956" d="M600.1,245.642V241.9h16.449v3.742Z" transform="translate(-452.324 -217.277)" fill="#ffd42e"/>
  <path id="Path_27957" data-name="Path 27957" d="M599.982,245.122h16.047v-3.34H599.982v3.34Zm16.246.4H599.779a.2.2,0,0,1-.2-.2v-3.742a.2.2,0,0,1,.2-.2h16.448a.2.2,0,0,1,.2.2v3.742a.2.2,0,0,1-.2.2Z" transform="translate(-452.005 -216.961)"/>
  <path id="Path_27958" data-name="Path 27958" d="M578.39,208.222V204.48h33.062v3.742Z" transform="translate(-439.02 -195.172)" fill="#fff"/>
  <path id="Path_27959" data-name="Path 27959" d="M578.278,207.7h32.656v-3.34H578.278v3.34Zm32.859.4H578.079a.2.2,0,0,1-.2-.2v-3.742a.2.2,0,0,1,.2-.2h33.058a.2.2,0,0,1,.2.2V207.9a.2.2,0,0,1-.2.2Z" transform="translate(-438.708 -194.851)"/>
  <path id="Path_27960" data-name="Path 27960" d="M235.19,443.682V439.94h19.552v3.742Z" transform="translate(-220.727 -336.344)" fill="#da1e37"/>
  <path id="Path_27961" data-name="Path 27961" d="M235.068,443.162h19.15v-3.34h-19.15v3.34Zm19.353.4H234.869a.2.2,0,0,1-.2-.2v-3.742a.2.2,0,0,1,.2-.2h19.552a.2.2,0,0,1,.2.2v3.742a.2.2,0,0,1-.2.2Z" transform="translate(-220.406 -336.019)"/>
  <path id="Path_27962" data-name="Path 27962" d="M263.95,425.392V421.65h33.058v3.742Z" transform="translate(-238.483 -325.347)" fill="#fff"/>
  <path id="Path_27963" data-name="Path 27963" d="M263.828,424.878h32.656v-3.34H263.828v3.34Zm32.859.4H263.629a.2.2,0,0,1-.2-.2v-3.742a.2.2,0,0,1,.2-.2h33.058a.2.2,0,0,1,.2.2v3.742a.2.2,0,0,1-.2.2Z" transform="translate(-238.163 -325.029)"/>
  <path id="Path_27964" data-name="Path 27964" d="M376.838,256.5a29.575,29.575,0,0,0-.559,6.558l2.659,1.033s1.63,6.7-8.643,4.649c-2-.4-7.775-4.787-7.775-4.787l4.568-1.3s.436-6.642.612-9.94a86.368,86.368,0,0,0,9.137,3.792Z" transform="translate(-301.926 -223.648)" fill="#fff"/>
  <path id="Path_27965" data-name="Path 27965" d="M362.639,263.7c1.24.922,5.709,4.178,7.369,4.511,3.7.739,6.244.429,7.553-.93a4.007,4.007,0,0,0,.876-3.375l-2.556-.995a.2.2,0,0,1-.126-.18,30.509,30.509,0,0,1,.524-6.432,85.927,85.927,0,0,1-8.716-3.623c-.184,3.352-.593,9.585-.6,9.65a.2.2,0,0,1-.145.18l-4.182,1.194ZM373.47,269a18.267,18.267,0,0,1-3.543-.394c-2.016-.4-7.618-4.645-7.855-4.825a.2.2,0,0,1,.065-.352l4.434-1.266c.065-.98.444-6.8.6-9.8a.2.2,0,0,1,.1-.161.2.2,0,0,1,.188-.011,85.814,85.814,0,0,0,9.11,3.784.2.2,0,0,1,.134.237,29.115,29.115,0,0,0-.555,6.374l2.533.983a.2.2,0,0,1,.122.138,4.4,4.4,0,0,1-.956,3.841A5.815,5.815,0,0,1,373.47,269Z" transform="translate(-301.597 -223.322)"/>
  <path id="Path_27966" data-name="Path 27966" d="M380.54,201.121a1.721,1.721,0,0,0,1.894-1.729,2.714,2.714,0,0,0-1.553-2.353,9,9,0,0,0-2.835-.631,2.534,2.534,0,0,0-.907-2.77,3.906,3.906,0,0,0-2.873-.65,3.522,3.522,0,0,0-1.829.7,2.3,2.3,0,0,0-.838,1.844,3.709,3.709,0,0,0-3.6-1.515,3.748,3.748,0,0,0-2.422,3.049,3.133,3.133,0,0,0-2.479-1.389c-1.97.107-2.414,1.779-1.527,3.933a2.273,2.273,0,0,0-3.111,1.458,4.534,4.534,0,0,0,.834,3.826,2.352,2.352,0,0,0,.578.44c.306,1.684.689,3.447,1.27,5.674a20.154,20.154,0,0,0,2,4.852,2.922,2.922,0,0,0,1.519,1.4c.046-.7.773-1.045.884-1.737.138-.853-.409-1.6.1-2.361a12.488,12.488,0,0,0,1.959-4.637,6.079,6.079,0,0,0-.36-3.956,4.324,4.324,0,0,0-.93-1.2,7.42,7.42,0,0,0,.417-1.044,3.834,3.834,0,0,0,2.445,2.146,2.1,2.1,0,0,0,2.663-1.079,4.223,4.223,0,0,0,2.793,2.548c.991.1,1.362-.356,1.764-1.309a8.994,8.994,0,0,0,2.437,1.917,2.8,2.8,0,0,0,3.524-1.783,3.021,3.021,0,0,0-1.817-3.646Z" transform="translate(-299.35 -188.052)" fill="#ffd42e"/>
  <path id="Path_27967" data-name="Path 27967" d="M360.342,199.286a2.086,2.086,0,0,0-.8.161,2.167,2.167,0,0,0-1.213,1.362,4.315,4.315,0,0,0,.8,3.631,2.057,2.057,0,0,0,.528.4.2.2,0,0,1,.1.138c.329,1.81.731,3.608,1.266,5.659a19.882,19.882,0,0,0,1.978,4.8,2.656,2.656,0,0,0,1.2,1.2,2.311,2.311,0,0,1,.429-.727,1.708,1.708,0,0,0,.406-.746,2.82,2.82,0,0,0-.05-.914,1.913,1.913,0,0,1,.188-1.527,12.256,12.256,0,0,0,1.928-4.565,5.778,5.778,0,0,0-.344-3.83,4.051,4.051,0,0,0-.888-1.144.205.205,0,0,1-.046-.237,6.9,6.9,0,0,0,.406-1.014.2.2,0,0,1,.168-.138.2.2,0,0,1,.2.1,3.663,3.663,0,0,0,2.334,2.058,1.908,1.908,0,0,0,2.41-.957.2.2,0,0,1,.2-.134.2.2,0,0,1,.184.157,4.01,4.01,0,0,0,2.617,2.391c.876.088,1.175-.275,1.557-1.186a.194.194,0,0,1,.142-.119.2.2,0,0,1,.176.046c.222.2.429.394.628.582a5.556,5.556,0,0,0,1.748,1.3,2.431,2.431,0,0,0,1.906-.126,2.58,2.58,0,0,0,1.358-1.53,2.825,2.825,0,0,0-1.687-3.39.2.2,0,0,1,.107-.386,1.166,1.166,0,0,0,.983-.249,1.718,1.718,0,0,0,.662-1.289,2.538,2.538,0,0,0-1.443-2.173,6.606,6.606,0,0,0-2.227-.54c-.184-.023-.364-.046-.543-.073a.2.2,0,0,1-.145-.1.2.2,0,0,1-.015-.172,2.332,2.332,0,0,0-.842-2.541,3.694,3.694,0,0,0-2.728-.608,3.288,3.288,0,0,0-1.726.658,2.108,2.108,0,0,0-.765,1.68.2.2,0,0,1-.356.13,3.486,3.486,0,0,0-3.4-1.446,3.552,3.552,0,0,0-2.273,2.873.2.2,0,0,1-.142.172.2.2,0,0,1-.214-.065,2.875,2.875,0,0,0-2.315-1.312,1.767,1.767,0,0,0-1.5.742,3.305,3.305,0,0,0,.149,2.916.2.2,0,0,1-.05.222.2.2,0,0,1-.226.034,1.907,1.907,0,0,0-.811-.176Zm4,17.853a.208.208,0,0,1-.084-.019,3.1,3.1,0,0,1-1.607-1.481,20.327,20.327,0,0,1-2.017-4.9c-.528-2.024-.93-3.807-1.255-5.6a2.272,2.272,0,0,1-.547-.432,4.722,4.722,0,0,1-.876-4.021,2.564,2.564,0,0,1,1.439-1.607,2.449,2.449,0,0,1,1.519-.126,3.363,3.363,0,0,1,.038-2.87,2.17,2.17,0,0,1,1.821-.93,3.02,3.02,0,0,1,2.365,1.136,3.879,3.879,0,0,1,2.506-2.793,3.748,3.748,0,0,1,3.478,1.217,2.483,2.483,0,0,1,.88-1.5,3.667,3.667,0,0,1,1.932-.746,4.09,4.09,0,0,1,3.019.689A2.793,2.793,0,0,1,378,195.915c.1.012.2.027.306.038a7.038,7.038,0,0,1,2.361.582,2.919,2.919,0,0,1,1.661,2.537,2.129,2.129,0,0,1-.819,1.6,1.807,1.807,0,0,1-.517.283,3.273,3.273,0,0,1,1.251,3.547,3,3,0,0,1-1.569,1.771,2.811,2.811,0,0,1-2.223.138,5.986,5.986,0,0,1-1.882-1.381c-.134-.126-.272-.256-.413-.386a1.639,1.639,0,0,1-1.856,1.175,4.5,4.5,0,0,1-2.8-2.25,2.376,2.376,0,0,1-2.694.773,3.758,3.758,0,0,1-2.334-1.863c-.069.184-.142.356-.222.524a4.431,4.431,0,0,1,.865,1.156,6.166,6.166,0,0,1,.379,4.086,12.678,12.678,0,0,1-1.99,4.714,1.552,1.552,0,0,0-.122,1.236,3.139,3.139,0,0,1,.05,1.045,2.031,2.031,0,0,1-.486.926,1.49,1.49,0,0,0-.4.792.2.2,0,0,1-.1.161.223.223,0,0,1-.1.023Z" transform="translate(-299.029 -187.728)"/>
  <path id="Path_27968" data-name="Path 27968" d="M381.956,221.9v-.157l-.18-.057a8.993,8.993,0,0,1-2.437-1.917c-.4.953-.773,1.408-1.764,1.309a4.223,4.223,0,0,1-2.793-2.548,2.1,2.1,0,0,1-2.663,1.079,3.834,3.834,0,0,1-2.445-2.147,5.25,5.25,0,0,1-1.913,2.824,4.023,4.023,0,0,1-1.27.6c-.015.2-.034.383-.054.562a16.678,16.678,0,0,0-.1,3.585c-1.125-.934-2.055-.777-2.755-.069a1.789,1.789,0,0,0,.042,2.518,3.287,3.287,0,0,0,2.939.735c.276,1.775.681,5.334,1.917,6.906a7.946,7.946,0,0,0,6.034,2.782,8.452,8.452,0,0,0,6.279-2.579,8.781,8.781,0,0,0,1.894-6.581c-.138-2.292-.727-4.549-.735-6.845Z" transform="translate(-302.32 -203.185)" fill="#fff"/>
  <path id="Path_27969" data-name="Path 27969" d="M366.234,227.694a.2.2,0,0,1,.115.035.2.2,0,0,1,.084.134c.027.184.057.386.088.6.268,1.81.712,4.844,1.787,6.214a7.722,7.722,0,0,0,5.881,2.705,8.209,8.209,0,0,0,6.13-2.514,8.485,8.485,0,0,0,1.84-6.436c-.061-.991-.207-1.993-.352-2.965a27.344,27.344,0,0,1-.383-3.891h0v-.011l-.053-.019a5.986,5.986,0,0,1-1.883-1.381c-.134-.126-.272-.256-.413-.386a1.639,1.639,0,0,1-1.856,1.175,4.5,4.5,0,0,1-2.8-2.25,2.376,2.376,0,0,1-2.694.773,3.766,3.766,0,0,1-2.334-1.859,5.232,5.232,0,0,1-1.844,2.51,4.112,4.112,0,0,1-1.2.589c-.015.165-.027.3-.042.432l0,.046a16.346,16.346,0,0,0-.088,3.5.2.2,0,0,1-.1.2.2.2,0,0,1-.222-.023c-.937-.777-1.772-.8-2.483-.084a1.587,1.587,0,0,0,.042,2.238,3.091,3.091,0,0,0,2.755.681c.008-.008.019-.008.034-.008Zm8.092,10.09h-.145a8.152,8.152,0,0,1-6.191-2.858c-1.14-1.454-1.576-4.431-1.867-6.4-.019-.138-.038-.272-.057-.394a3.453,3.453,0,0,1-2.916-.83,1.982,1.982,0,0,1-.042-2.8,1.944,1.944,0,0,1,2.659-.214,17.8,17.8,0,0,1,.126-3.137l0-.046c.019-.161.034-.337.053-.559a.2.2,0,0,1,.145-.176,3.725,3.725,0,0,0,1.205-.57,5.094,5.094,0,0,0,1.837-2.72.2.2,0,0,1,.168-.138.2.2,0,0,1,.2.1,3.663,3.663,0,0,0,2.334,2.058,1.908,1.908,0,0,0,2.411-.957.2.2,0,0,1,.2-.134.2.2,0,0,1,.184.157,4.009,4.009,0,0,0,2.617,2.391c.876.088,1.174-.275,1.557-1.186a.194.194,0,0,1,.142-.119.2.2,0,0,1,.176.046c.222.2.429.394.627.582a5.558,5.558,0,0,0,1.749,1.3c.053.019.111.038.164.054a.2.2,0,0,1,.145.191v.161h0a27.285,27.285,0,0,0,.379,3.834c.145.979.295,1.993.356,3a8.893,8.893,0,0,1-1.944,6.73,8.584,8.584,0,0,1-6.275,2.64Z" transform="translate(-301.982 -202.863)"/>
  <path id="Path_27970" data-name="Path 27970" d="M405.094,236.818a.544.544,0,1,0-.6.452.538.538,0,0,0,.6-.452Z" transform="translate(-327.998 -214.781)"/>
  <path id="Path_27971" data-name="Path 27971" d="M385.3,237.878a.544.544,0,1,0-.6.451.532.532,0,0,0,.6-.451Z" transform="translate(-315.489 -215.435)"/>
  <path id="Path_27972" data-name="Path 27972" d="M389.333,259.933a2.891,2.891,0,0,1-2.181-.987.2.2,0,0,1,.306-.26,2.479,2.479,0,0,0,2.475.769.2.2,0,0,1,.245.142.2.2,0,0,1-.142.245,2.759,2.759,0,0,1-.7.092Z" transform="translate(-317.332 -227.349)"/>
  <path id="Path_27973" data-name="Path 27973" d="M393.436,243.223a2.584,2.584,0,0,1-.386-.027,1.971,1.971,0,0,1-1.354-.811.2.2,0,0,1,.333-.226,1.586,1.586,0,0,0,1.083.639,2.758,2.758,0,0,0,1.335-.168,1.1,1.1,0,0,0,.463-.268.822.822,0,0,0,.13-.7,2.948,2.948,0,0,0-.279-.7l-.057-.115a10.185,10.185,0,0,1-1.025-4.488.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2,9.761,9.761,0,0,0,.983,4.308l.053.111a3.407,3.407,0,0,1,.31.792,1.189,1.189,0,0,1-.218,1.048,1.444,1.444,0,0,1-.631.383,3.3,3.3,0,0,1-1.14.218Z" transform="translate(-320.221 -213.802)"/>
  <path id="Path_27974" data-name="Path 27974" d="M371.309,237.639a.2.2,0,0,1-.2-.176c-.084-.631-.115-.968-.172-1.576a.2.2,0,0,1,.18-.218.2.2,0,0,1,.218.18c.057.6.088.937.168,1.561a.2.2,0,0,1-.172.226.049.049,0,0,1-.023,0Z" transform="translate(-307.086 -214.427)"/>
  <path id="Path_27975" data-name="Path 27975" d="M417.374,221.661a.07.07,0,0,1-.046-.019.067.067,0,0,1,0-.1,1.92,1.92,0,0,0,.436-1.917.067.067,0,1,1,.126-.042,2.063,2.063,0,0,1-.471,2.051.055.055,0,0,1-.046.023Z" transform="translate(-336.397 -204.47)"/>
  <path id="Path_27976" data-name="Path 27976" d="M363.4,217.835a.073.073,0,0,1-.046-.015,3.106,3.106,0,0,1-.857-3.283.067.067,0,0,1,.126.042,2.975,2.975,0,0,0,.823,3.141.071.071,0,0,1,.008.1.091.091,0,0,1-.054.019Z" transform="translate(-301.655 -201.353)"/>
  <path id="Path_27977" data-name="Path 27977" d="M478.627,263.846c2.269-5.223,4.932-14.83,7.626-19.934a14.681,14.681,0,0,0,4.729-4.989c.413-.788.478-1.129.042-1.814a1.368,1.368,0,0,0-1.584-.333c.321-.482.926-.853.387-1.531a.925.925,0,0,0-1-.383c.4-1.029-.662-1.909-1.546-1.025.788-1.209,1.5-2.288,2.288-3.394.486-.685.991-1.519.585-1.925-.52-.52-1.312.188-2.253,1.312a51.125,51.125,0,0,1-3.822,4.243c-1.584,1.584-3.271,4.756-2.613,6.2-.528,2.192-8.54,14.914-11.169,17.539-.96.96-.176,1.882.05,3.222.272,1.615,1.454,7.3,5.555,5.452a8.343,8.343,0,0,0,2.724-2.64Z" transform="translate(-369.949 -209.906)" fill="#fff"/>
  <path id="Path_27978" data-name="Path 27978" d="M478.307,263.539Zm11.126-35.3h-.019c-.463.019-1.182.819-1.684,1.416l-.034.042a50.132,50.132,0,0,1-3.8,4.213c-1.649,1.649-3.164,4.679-2.575,5.973a.192.192,0,0,1,.012.13c-.57,2.368-8.643,15.06-11.218,17.635-.6.6-.421,1.178-.172,1.978a8.458,8.458,0,0,1,.279,1.068c.272,1.615.983,4.457,2.694,5.368A2.83,2.83,0,0,0,475.5,266a8.3,8.3,0,0,0,2.629-2.541c.937-2.158,1.936-5.05,3-8.111a94.991,94.991,0,0,1,4.633-11.834.19.19,0,0,1,.069-.077,14.539,14.539,0,0,0,4.66-4.913c.39-.742.436-1.006.05-1.611a1.182,1.182,0,0,0-1.347-.253.2.2,0,0,1-.226-.065.2.2,0,0,1-.008-.233c.073-.111.161-.214.241-.314.321-.39.463-.593.153-.979a.741.741,0,0,0-.773-.321.211.211,0,0,1-.214-.046.2.2,0,0,1-.046-.214.831.831,0,0,0-.252-1.018.753.753,0,0,0-.964.2.2.2,0,0,1-.268.015.2.2,0,0,1-.042-.264c.7-1.075,1.462-2.231,2.292-3.4.233-.329.945-1.328.6-1.664a.33.33,0,0,0-.253-.119ZM474.048,266.75a2.784,2.784,0,0,1-1.324-.329c-1.859-.991-2.613-3.972-2.9-5.655a7.525,7.525,0,0,0-.264-1.014c-.26-.826-.5-1.607.272-2.38,2.671-2.674,10.468-15.159,11.1-17.382-.643-1.6,1.14-4.813,2.682-6.355a50.2,50.2,0,0,0,3.776-4.186l.034-.042c.911-1.087,1.481-1.538,1.974-1.557a.74.74,0,0,1,.574.233c.509.509,0,1.389-.562,2.181-.658.93-1.274,1.848-1.852,2.724a1.008,1.008,0,0,1,.723.153,1.172,1.172,0,0,1,.49,1.182,1.258,1.258,0,0,1,.888.5.957.957,0,0,1-.05,1.351,1.341,1.341,0,0,1,1.259.528c.486.754.417,1.163-.034,2.016a14.992,14.992,0,0,1-4.756,5.035,95.29,95.29,0,0,0-4.588,11.731c-1.06,3.069-2.062,5.969-3.007,8.142h0a8.465,8.465,0,0,1-2.831,2.747,3.9,3.9,0,0,1-1.6.379Z" transform="translate(-369.627 -209.599)"/>
  <path id="Path_27979" data-name="Path 27979" d="M516.249,253.094a.762.762,0,0,1-.486-.165.834.834,0,0,1-.233-.857,1.867,1.867,0,0,1,.394-.681,5.264,5.264,0,0,1,1.048-1.056c.134-.107.3-.241.532-.432a.2.2,0,1,1,.256.306c-.233.2-.406.333-.543.44a4.868,4.868,0,0,0-.987.995,1.439,1.439,0,0,0-.318.532.376.376,0,0,0,.536.478,1.741,1.741,0,0,0,.49-.341l.792-.693a.2.2,0,0,1,.264.3l-.792.693a2.075,2.075,0,0,1-.612.413.843.843,0,0,1-.341.065Z" transform="translate(-398.497 -222.064)"/>
  <path id="Path_27980" data-name="Path 27980" d="M512.584,249.319a.637.637,0,0,1-.31-.073.9.9,0,0,1-.36-1.014c.13-.6,1.006-1.664,2.686-3.268l.057-.054a.2.2,0,0,1,.276.291l-.058.054c-1.986,1.9-2.494,2.709-2.567,3.061-.046.222-.011.49.149.57a.674.674,0,0,0,.5-.069c.191-.076.383-.161.57-.249a.2.2,0,0,1,.172.363c-.191.092-.39.176-.589.256a1.391,1.391,0,0,1-.528.13Z" transform="translate(-396.223 -219.049)"/>
  <path id="Path_27981" data-name="Path 27981" d="M505.668,250.9a.193.193,0,0,1-.092-.023.2.2,0,0,1-.084-.272,2.466,2.466,0,0,0-.23-2.162c-.21-.486-.379-.868-.138-1.125a3.37,3.37,0,0,1,1.863-.471,3.384,3.384,0,0,0,.356-.038.856.856,0,0,0,.57-.421.319.319,0,0,0,.027-.187,1.36,1.36,0,0,0-.429-.478,11.058,11.058,0,0,0-2.487-.057c-.134.008-.249.011-.34.015a2.376,2.376,0,0,0-1.286.6.2.2,0,1,1-.382-.115c.134-.455,1.27-.872,1.657-.884.088,0,.2-.008.337-.015a10.372,10.372,0,0,1,2.632.077,1.6,1.6,0,0,1,.67.7.638.638,0,0,1-.027.513,1.233,1.233,0,0,1-.815.639,2.3,2.3,0,0,1-.444.054,3.8,3.8,0,0,0-1.6.344c-.061.065.111.455.214.693a2.822,2.822,0,0,1,.218,2.51.222.222,0,0,1-.187.111Z" transform="translate(-390.651 -219.263)"/>
  <path id="Path_27982" data-name="Path 27982" d="M512.427,243.6a.185.185,0,0,1-.1-.027.2.2,0,0,1-.073-.275,6.769,6.769,0,0,1,.758-.9c.138-.149.268-.287.356-.39a.2.2,0,0,1,.306.26c-.092.107-.226.253-.368.406a6.941,6.941,0,0,0-.7.826.208.208,0,0,1-.176.1Z" transform="translate(-396.41 -218.297)"/>
  <path id="Path_27983" data-name="Path 27983" d="M510.514,251.958a.811.811,0,0,1-.631-.337,1.159,1.159,0,0,1,.088-1.354.2.2,0,0,1,.341.21.823.823,0,0,0-.1.907.373.373,0,0,0,.352.168.2.2,0,0,1,.1.386.6.6,0,0,1-.142.019Z" transform="translate(-394.812 -222.267)"/>
  <path id="Path_27984" data-name="Path 27984" d="M313.793,303.614c1.427-7.5,1.439-15.561,7.484-20.608,2.9-2.422,9.78-3.467,13.812-3.727.249,3.9,4.063,4.832,6.508,4.676,4.079-.26,4.806-1.064,5.843-4.163.914.363,6.428.643,10.005,3.838,6.642,5.934,15.343,5.012,15.817,5.487.658.658-.96,6.417,4.894,9.129,2.464,1.14-12.3,3.489-22.475.8.382,5.322-2.732,20.064-3.838,26.041-10.61,7.4-31.225-.18-31.225-.18a33.071,33.071,0,0,0,1.668-8.617c0-1.837-6.424,1.963-7.277,2.116a1.272,1.272,0,0,1-1.041-.448c-.715-1.672-1.488-7.438-.176-14.34Z" transform="translate(-271.087 -238.879)" fill="#4ade80"/>
  <path id="Path_27985" data-name="Path 27985" d="M372.807,288.942Zm-52.257,35.51a66.882,66.882,0,0,0,11.421,2.789c5.85.876,13.946,1.129,19.372-2.606.172-.937.39-2.07.643-3.375,1.3-6.765,3.493-18.086,3.172-22.532a.2.2,0,0,1,.073-.168.192.192,0,0,1,.18-.038,49.207,49.207,0,0,0,14.627,1.125c4.955-.3,7.683-1.083,7.863-1.45a.484.484,0,0,0-.153-.1c-4.511-2.089-4.695-5.927-4.794-7.993a3.4,3.4,0,0,0-.153-1.175,7.128,7.128,0,0,0-1.289-.145c-2.782-.2-9.3-.67-14.528-5.338-2.755-2.46-6.631-3.157-8.716-3.532-.44-.08-.792-.142-1.029-.207-1.041,3.042-1.905,3.853-5.957,4.113a8.107,8.107,0,0,1-4.186-.838,4.68,4.68,0,0,1-2.518-3.822c-4.622.318-10.855,1.458-13.5,3.669-4.851,4.048-5.755,9.963-6.711,16.219-.214,1.4-.436,2.858-.7,4.27l-.2-.038.2.038c-1.362,7.166-.455,12.772.168,14.229a1.147,1.147,0,0,0,.819.329,13.876,13.876,0,0,0,1.657-.738c2.583-1.247,4.783-2.242,5.567-1.752a.628.628,0,0,1,.291.57,32.57,32.57,0,0,1-1.611,8.494Zm18.327,3.738a47.318,47.318,0,0,1-6.975-.551,66.424,66.424,0,0,1-11.674-2.873.2.2,0,0,1-.122-.253,33.207,33.207,0,0,0,1.657-8.551c0-.149-.054-.2-.1-.233-.658-.413-3.6,1.01-5.181,1.771a11.4,11.4,0,0,1-1.76.773,1.432,1.432,0,0,1-1.259-.566c-.823-1.921-1.45-7.847-.191-14.463.268-1.4.49-2.854.7-4.255.926-6.057,1.883-12.32,6.849-16.468,2.759-2.3,9.229-3.47,13.927-3.773a.2.2,0,0,1,.145.05.209.209,0,0,1,.069.138,4.269,4.269,0,0,0,2.326,3.7,7.674,7.674,0,0,0,3.968.792c4.006-.256,4.649-.991,5.666-4.025a.183.183,0,0,1,.107-.119.187.187,0,0,1,.157,0,8.673,8.673,0,0,0,1.152.249c2.124.383,6.072,1.094,8.911,3.627,5.123,4.576,11.547,5.039,14.287,5.238,1.048.077,1.385.107,1.538.256.218.218.241.681.275,1.446.1,1.978.272,5.659,4.561,7.645.429.2.413.451.367.585-.3.822-4.37,1.492-8.238,1.729a50,50,0,0,1-14.47-1.071c.222,4.656-1.829,15.282-3.2,22.36-.26,1.343-.482,2.5-.658,3.451a.184.184,0,0,1-.084.126c-3.562,2.495-8.268,3.271-12.753,3.271Z" transform="translate(-270.756 -238.552)"/>
  <path id="Path_27986" data-name="Path 27986" d="M404.577,383.518q-7.157.155-14.318.306l-.019-2.433,15.932-.39-1.6,2.518Z" transform="translate(-319.466 -300.931)" fill="#fff"/>
  <path id="Path_27987" data-name="Path 27987" d="M404.256,383.2Zm-14.134-1.928.015,2.032,14.007-.3,1.339-2.1-15.362.375Zm-.184,2.434a.182.182,0,0,1-.138-.057.2.2,0,0,1-.061-.142l-.019-2.43a.2.2,0,0,1,.2-.2l15.936-.39a.209.209,0,0,1,.18.1.2.2,0,0,1,0,.207l-1.6,2.514a.194.194,0,0,1-.164.092l-14.314.306Z" transform="translate(-319.143 -300.607)"/>
  <path id="Path_27988" data-name="Path 27988" d="M466.507,329.55l-31.122.172L424.66,351.753l30.827-.08Z" transform="translate(-341.68 -269.57)" fill="#fff"/>
  <path id="Path_27989" data-name="Path 27989" d="M435.188,329.6l-10.53,21.629,30.383-.077,10.816-21.721-30.67.168Zm-10.851,22.031a.2.2,0,0,1-.168-.092.2.2,0,0,1-.012-.2l10.725-22.031a.2.2,0,0,1,.18-.111l31.122-.172h0a.191.191,0,0,1,.168.1.2.2,0,0,1,.008.2L455.34,351.444a.2.2,0,0,1-.18.111l-30.823.076Z" transform="translate(-341.355 -269.248)"/>
  <path id="Path_27990" data-name="Path 27990" d="M478.832,352.982a2.061,2.061,0,0,1,2.208.96,2.192,2.192,0,0,1-.57,2.426,2.823,2.823,0,0,1-2.491.6,1.944,1.944,0,0,1-1.2-.727,1.677,1.677,0,0,1-.268-.945c-.008-1.094.49-2.131,2.323-2.311Z" transform="translate(-373.883 -284.045)" fill="#fff"/>
  <path id="Path_27991" data-name="Path 27991" d="M478.505,352.664Zm.333.187c-.13,0-.237.008-.314.015h0c-1.45.142-2.15.83-2.143,2.108a1.493,1.493,0,0,0,.233.834,1.743,1.743,0,0,0,1.079.647,2.609,2.609,0,0,0,2.311-.547,1.987,1.987,0,0,0,.524-2.2,1.739,1.739,0,0,0-1.691-.861Zm-.524,4.071a3.456,3.456,0,0,1-.708-.077,2.128,2.128,0,0,1-1.324-.811,1.9,1.9,0,0,1-.3-1.056c-.008-1.033.421-2.307,2.5-2.51h0a2.211,2.211,0,0,1,2.41,1.079,2.392,2.392,0,0,1-.62,2.655,2.9,2.9,0,0,1-1.959.719Z" transform="translate(-373.555 -283.726)"/>
  <path id="Path_27992" data-name="Path 27992" d="M323.242,353.856c5.751-.321,11.536-.715,17.321-1.113.516-.084,3.091-.452,3.727-.547a5.682,5.682,0,0,0,1.546-.505c1.722-.8,5.414-2.353,6.237-1.894a10.177,10.177,0,0,1,4.962,3.662c.754.972,1.374,2.587,1.06,2.862a.55.55,0,0,1-.719.065,9.094,9.094,0,0,0-4.415-4.377,12.87,12.87,0,0,1,2.479,1.825,4.822,4.822,0,0,1,1.626,2.6.358.358,0,0,1-.019.237c-.1.172-.367.073-.524-.054-.306-.241-4.262-3.451-5-3.367a19.856,19.856,0,0,1,4.5,3.516.6.6,0,0,1-.111.409.583.583,0,0,1-.54.172,1.511,1.511,0,0,1-.539-.237,26.526,26.526,0,0,0-3.39-2.059,2.021,2.021,0,0,0-1.9-.023,9.185,9.185,0,0,1,2.965,1.8,1.639,1.639,0,0,1,.341.436c.134.241.287.589.1.788-.306.325-.562.161-.823.008a17.665,17.665,0,0,0-3.241-1.706,1.213,1.213,0,0,0-1.079-.057,8.653,8.653,0,0,1-4.3,1.136,14.248,14.248,0,0,0-2.977.608c-15.243,4.2-19.8,5.877-23.493,4.289-.723-.31-.968-.689-.727-1.932.647-3.31,1.274-5.192,6.937-6.543Z" transform="translate(-272.831 -281.879)" fill="#fff"/>
  <path id="Path_27993" data-name="Path 27993" d="M322.954,353.74c-5.54,1.324-6.129,3.1-6.768,6.39-.233,1.205.019,1.454.608,1.71,3.137,1.347,6.833.314,17.811-2.755,1.649-.463,3.516-.983,5.548-1.542a14.254,14.254,0,0,1,3.019-.616,8.71,8.71,0,0,0,4.209-1.1,1.379,1.379,0,0,1,1.259.042,18.223,18.223,0,0,1,3.275,1.725l.011,0c.275.161.379.207.559.015.034-.038.088-.164-.126-.551a1.57,1.57,0,0,0-.3-.386,8.9,8.9,0,0,0-2.9-1.76.2.2,0,0,1-.126-.161.2.2,0,0,1,.084-.187,2.219,2.219,0,0,1,2.089,0,13.364,13.364,0,0,1,2.315,1.351c.356.241.727.493,1.1.719a1.389,1.389,0,0,0,.471.21.319.319,0,0,0,.421-.345,21.55,21.55,0,0,0-4.373-3.367.2.2,0,0,1-.13-.21.2.2,0,0,1,.176-.176c.187-.023.765-.088,5.016,3.3.065.05.111.088.134.107a.4.4,0,0,0,.237.1c-.008,0,0-.019-.015-.092a4.553,4.553,0,0,0-1.569-2.491,12.619,12.619,0,0,0-2.441-1.794.2.2,0,0,1,.18-.356,9.348,9.348,0,0,1,4.492,4.427.374.374,0,0,0,.425-.084,4.644,4.644,0,0,0-1.087-2.59,10.007,10.007,0,0,0-4.859-3.593.2.2,0,0,1-.042-.019c-.524-.295-2.958.471-6.053,1.9a5.9,5.9,0,0,1-1.6.52c-.168.023-.471.069-.834.122-1,.145-2.51.364-2.889.425-.008,0-.012,0-.019,0-5.651.375-11.494.777-17.306,1.1Zm-3.145,9.079a7.791,7.791,0,0,1-3.172-.612c-.88-.379-1.087-.9-.842-2.154.65-3.359,1.3-5.326,7.086-6.707a.1.1,0,0,1,.034,0c5.812-.325,11.658-.723,17.309-1.113.4-.065,1.894-.283,2.889-.425.363-.053.666-.1.834-.122a5.526,5.526,0,0,0,1.488-.49c1.6-.738,5.41-2.391,6.4-1.9a10.256,10.256,0,0,1,5.043,3.727c.639.826,1.542,2.69,1.037,3.137a.75.75,0,0,1-.949.1.444.444,0,0,1-.061.214.381.381,0,0,1-.264.18.761.761,0,0,1-.555-.18c-.023-.019-.069-.057-.134-.107-.046-.038-.092-.073-.138-.111a.411.411,0,0,1,.1.2.716.716,0,0,1-.884.784,1.751,1.751,0,0,1-.612-.26c-.379-.233-.754-.486-1.117-.731a12.951,12.951,0,0,0-2.246-1.312,2.387,2.387,0,0,0-1.3-.214,9.254,9.254,0,0,1,2.579,1.657,1.889,1.889,0,0,1,.379.486c.1.168.383.689.069,1.022a.742.742,0,0,1-1.052.054l-.019-.011a17.559,17.559,0,0,0-3.214-1.7,1.071,1.071,0,0,0-.9-.077,9.109,9.109,0,0,1-4.4,1.167,13.807,13.807,0,0,0-2.935.6c-2.032.559-3.9,1.083-5.548,1.542-7.824,2.2-11.983,3.359-14.9,3.359Z" transform="translate(-272.508 -281.564)"/>
  <path id="Path_27994" data-name="Path 27994" d="M343.231,328.214a.171.171,0,0,1-.061-.012.2.2,0,0,1-.126-.253c2.154-6.52,3.371-10.64,3.371-19.571a.2.2,0,0,1,.4,0c0,8.991-1.224,13.139-3.39,19.7a.2.2,0,0,1-.191.138Z" transform="translate(-289.476 -256.826)"/>
  <path id="Path_27995" data-name="Path 27995" d="M423.967,319.937Zm.13.352a.2.2,0,0,1-.149-.069.2.2,0,0,1-.023-.237c.023-.115.031-.589.042-1.293.015-.987.038-2.636.13-5.138a.2.2,0,0,1,.4.015c-.092,2.5-.115,4.148-.13,5.131-.019,1.328-.019,1.435-.134,1.538a.2.2,0,0,1-.134.053Z" transform="translate(-340.561 -260.185)"/>
  <path id="Path_27996" data-name="Path 27996" d="M373.9,319.472a98.021,98.021,0,0,1-12.737-.911.068.068,0,1,1,.019-.134c6.791.953,18.358,1.622,22.387-.428a.068.068,0,1,1,.061.122c-1.955.991-5.659,1.351-9.73,1.351Z" transform="translate(-301.098 -263.064)" fill="#fff"/>
  <path id="Path_27997" data-name="Path 27997" d="M368.576,333.745a45.046,45.046,0,0,1-9-.872.073.073,0,0,1-.054-.08.07.07,0,0,1,.08-.054c8.708,1.783,17.317.5,23-.891a.066.066,0,0,1,.08.05.069.069,0,0,1-.05.08,59.979,59.979,0,0,1-14.057,1.768Z" transform="translate(-300.098 -271.39)" fill="#fff"/>
  <path id="Path_27998" data-name="Path 27998" d="M313.6,358.358a.058.058,0,0,1-.042-.015.071.071,0,0,1-.008-.1,11.981,11.981,0,0,1,10.951-3.983.068.068,0,0,1,.053.076.063.063,0,0,1-.076.054,11.842,11.842,0,0,0-10.824,3.937.079.079,0,0,1-.054.027Z" transform="translate(-270.872 -284.726)" fill="#fff"/>
  <path id="Path_27999" data-name="Path 27999" d="M314.833,354a.066.066,0,0,1-.061-.042.068.068,0,0,1,.038-.088,3.766,3.766,0,0,0,1.06-.75c.115-.1.237-.214.36-.314a5.453,5.453,0,0,1,2.64-1.171.066.066,0,0,1,.076.057.068.068,0,0,1-.057.077,5.309,5.309,0,0,0-2.575,1.14c-.122.1-.241.206-.356.31a3.857,3.857,0,0,1-1.1.773.042.042,0,0,1-.027.008Z" transform="translate(-269.856 -283.283)" fill="#fff"/>
  <path id="Path_28000" data-name="Path 28000" d="M466.3,311.35a.065.065,0,0,1-.061-.042,13.076,13.076,0,0,1-.96-5.253.067.067,0,1,1,.134,0,12.956,12.956,0,0,0,.949,5.2.069.069,0,0,1-.034.088.074.074,0,0,1-.027,0Z" transform="translate(-366.726 -255.783)" fill="#fff"/>
  <path id="Path_28001" data-name="Path 28001" d="M461.23,308.059a.069.069,0,0,1-.065-.054,6.107,6.107,0,0,1-.123-1.955.066.066,0,0,1,.073-.061.068.068,0,0,1,.061.073,5.952,5.952,0,0,0,.119,1.913.069.069,0,0,1-.05.08s-.008,0-.015,0Z" transform="translate(-364.017 -255.836)" fill="#fff"/>
  <path id="Path_28002" data-name="Path 28002" d="M341.825,334.389a.26.26,0,0,1-.054-.008.2.2,0,0,1-.142-.245,95.885,95.885,0,0,0,2.961-16.4.2.2,0,1,1,.4.038,96.681,96.681,0,0,1-2.973,16.468.2.2,0,0,1-.191.145Z" transform="translate(-288.581 -262.511)" fill="#fff"/>
  <path id="Path_28003" data-name="Path 28003" d="M425.1,323.574a.2.2,0,0,1-.2-.2l-.092-6.122a.2.2,0,0,1,.2-.2.2.2,0,0,1,.2.2l.092,6.122a.209.209,0,0,1-.2.2Z" transform="translate(-341.137 -262.41)" fill="#fff"/>
  <path id="Path_28004" data-name="Path 28004" d="M684.4,230.982a.208.208,0,0,1-.13-.046.2.2,0,0,1-.027-.283,17.733,17.733,0,0,0,4.063-12.263.2.2,0,1,1,.4-.023,18.128,18.128,0,0,1-4.159,12.542.166.166,0,0,1-.145.073Z" transform="translate(-505.207 -203.631)"/>
  <path id="Path_28005" data-name="Path 28005" d="M695.019,247.973a.2.2,0,0,1-.149-.069.2.2,0,0,1,.015-.283,36.485,36.485,0,0,0,4.557-4.886.2.2,0,0,1,.283-.034.2.2,0,0,1,.035.279,37.037,37.037,0,0,1-4.607,4.94.182.182,0,0,1-.134.054Z" transform="translate(-511.933 -217.72)"/>
  <path id="Path_28006" data-name="Path 28006" d="M704.079,259.422a.191.191,0,0,1-.149-.069.2.2,0,0,1,.019-.283,15.928,15.928,0,0,1,6.742-3.489.2.2,0,0,1,.092.39,15.453,15.453,0,0,0-6.569,3.4.215.215,0,0,1-.134.05Z" transform="translate(-517.725 -225.498)"/>
  <path id="Path_28007" data-name="Path 28007" d="M766.155,436.566a2.986,2.986,0,0,0-.176,3.455,7.367,7.367,0,0,0,2.908,2.437,17.928,17.928,0,0,0,1.78.88c.03-.287.057-.574.065-.861a5.907,5.907,0,0,0-4.576-5.911Zm-13.342,26.056a.209.209,0,0,1-.122-.038.2.2,0,0,1-.038-.279c1.163-1.546,2.556-3.2,4.412-3.252a6.453,6.453,0,0,1,1.814.3,3.2,3.2,0,0,0,2.533.023,3.743,3.743,0,0,0,1.2-1.569,5.873,5.873,0,0,1,.945-1.423,4.78,4.78,0,0,1,3.057-1.079,8.8,8.8,0,0,0,1.748-.314,4.793,4.793,0,0,0,3.057-4.488,10.407,10.407,0,0,0-.451-2.579,11.117,11.117,0,0,1-.463-2.594,10.686,10.686,0,0,1,.119-1.576v0a17.618,17.618,0,0,1-1.925-.945,7.659,7.659,0,0,1-3.057-2.583c-.7-1.19-.78-3.068.325-4.021a.194.194,0,0,1,.157-.046,6.308,6.308,0,0,1,5.016,6.328c-.008.337-.042.677-.08,1.006,2.158.838,4.5,1.113,6.107-.49a8.16,8.16,0,0,0,1.243-1.806c.207-.36.417-.735.654-1.083.849-1.259,1.963-1.886,2.973-1.687a.2.2,0,1,1-.076.39c-1.255-.249-2.281,1.1-2.564,1.519-.226.337-.436.7-.635,1.056a8.591,8.591,0,0,1-1.309,1.89c-1.726,1.726-4.186,1.473-6.439.616a10.354,10.354,0,0,0-.1,1.419,10.756,10.756,0,0,0,.451,2.5,10.85,10.85,0,0,1,.467,2.682,5.2,5.2,0,0,1-3.333,4.871,9.263,9.263,0,0,1-1.829.329,4.433,4.433,0,0,0-2.82.964,5.4,5.4,0,0,0-.873,1.328,4.065,4.065,0,0,1-1.347,1.722,3.555,3.555,0,0,1-2.847.023,6.385,6.385,0,0,0-1.7-.291c-1.676.042-3,1.618-4.1,3.091a.2.2,0,0,1-.165.088Z" transform="translate(-550.077 -332.777)"/>
  <path id="Path_28008" data-name="Path 28008" d="M553.879,284.157a.2.2,0,0,1-.161-.084,25.343,25.343,0,0,0-6.47-6.225.2.2,0,1,1,.226-.333,25.808,25.808,0,0,1,6.573,6.321.2.2,0,0,1-.046.279.205.205,0,0,1-.122.042Z" transform="translate(-418.603 -238.633)"/>
  <path id="Path_28009" data-name="Path 28009" d="M548.677,297.4a.243.243,0,0,1-.088-.019,33.226,33.226,0,0,0-4.829-1.886.2.2,0,1,1,.115-.383,34.345,34.345,0,0,1,4.89,1.909.2.2,0,0,1,.092.268.2.2,0,0,1-.18.111Z" transform="translate(-416.329 -249.289)"/>
  <path id="Path_28010" data-name="Path 28010" d="M336.738,189.183a.207.207,0,0,1-.157-.077c-1.309-1.626-2.563-3.329-3.727-5.062a.2.2,0,1,1,.333-.226c1.156,1.726,2.4,3.417,3.708,5.035a.2.2,0,0,1-.031.283.179.179,0,0,1-.126.046Z" transform="translate(-283.021 -182.363)"/>
  <path id="Path_28011" data-name="Path 28011" d="M350.709,184.923a.2.2,0,0,1-.2-.168l-.735-4.369a.2.2,0,0,1,.394-.065l.735,4.369a.2.2,0,0,1-.164.23c-.012,0-.023,0-.031,0Z" transform="translate(-293.713 -180.152)"/>
  <path id="Path_28012" data-name="Path 28012" d="M324.215,201.814a.192.192,0,0,1-.13-.05,12.69,12.69,0,0,0-6.225-2.885.2.2,0,1,1,.065-.394,13.086,13.086,0,0,1,6.424,2.977.2.2,0,0,1,.023.283.212.212,0,0,1-.157.069Z" transform="translate(-273.474 -191.468)"/>
  <path id="Path_28013" data-name="Path 28013" d="M369.867,440.371a5.487,5.487,0,0,0,2.4,2.2,1.4,1.4,0,0,0,1.309.073.961.961,0,0,0,.1-1.259,2.274,2.274,0,0,0-1.312-.8,6.3,6.3,0,0,0-2.491-.214Zm-14.945,12.068a8.356,8.356,0,0,1-2.357-.333.2.2,0,0,1-.138-.249.2.2,0,0,1,.249-.134,8.857,8.857,0,0,0,10.254-4.7c.214-.471.386-.968.555-1.45a14.091,14.091,0,0,1,.769-1.9,7.21,7.21,0,0,1,5-3.608,5.452,5.452,0,0,1-.364-1.064,7.665,7.665,0,0,1,1.125-5.609,22.468,22.468,0,0,1,3.746-4.354.2.2,0,1,1,.279.287,22.193,22.193,0,0,0-3.685,4.274,7.268,7.268,0,0,0-1.079,5.311,5.25,5.25,0,0,0,.386,1.087,6.753,6.753,0,0,1,2.8.2,2.69,2.69,0,0,1,1.53.96,1.342,1.342,0,0,1-.2,1.81,1.722,1.722,0,0,1-1.714-.031,5.875,5.875,0,0,1-2.652-2.506,6.8,6.8,0,0,0-4.832,3.424,13.265,13.265,0,0,0-.746,1.844c-.172.49-.348,1-.57,1.484a9.312,9.312,0,0,1-8.368,5.253Z" transform="translate(-295.586 -328.347)"/>
  <path id="Path_28014" data-name="Path 28014" d="M386.826,432.343a.2.2,0,0,1-.2-.191,9.032,9.032,0,0,1,2.28-6.359.2.2,0,0,1,.283-.015.2.2,0,0,1,.015.283,8.648,8.648,0,0,0-2.181,6.076.2.2,0,0,1-.191.207Z" transform="translate(-317.021 -327.707)"/>
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
      }}>
      <View
        style={{
          width: width - 40,

          backgroundColor: "white",
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            textAlign: "center",
            marginVertical: 20,
          }}>
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
          }}>
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
