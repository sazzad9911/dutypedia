import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Alert,
  Pressable,
  Animated as Animation,
  Platform,
  Modal,
  TouchableHighlight,
} from "react-native";
import rnTextSize, { TSFontSpecs } from "react-native-text-size";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  backgroundColor,
  assentColor,
  secondaryColor,
  textColor,
  Color,
} from "../../assets/colors";
import ProfileOption from "../../components/ProfileOption";
import { AntDesign } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import RatingView from "../../components/RatingView";
import { user, calenderIcon, noticeIcon, serviceIcon } from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "../../Cart/ReviewCart";
import RelatedService from "../../Cart/RelatedService";
import IconButton from "../../components/IconButton";
import { Menu } from "react-native-paper";
import Animated, {
  FadeIn,
  StretchInY,
  FlipInEasyX,
  Transition,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ServiceCart from "../../Cart/ServiceCart";
import {
  getService,
  getOtherServices,
  getRelatedServices,
  getUnRelatedServices,
  createService,
} from "../../Class/service";
import { useSelector, useDispatch } from "react-redux";
import {
  localTimeToServerTime,
  serverTimeToLocalTime,
  serverToLocal,
} from "../../Class/dataConverter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from "@react-navigation/native";
import Avatar from "../../components/Avatar";
const Tab = createMaterialTopTabNavigator();
import { Tooltip } from "react-native-paper";
import useHandleScroll from "../../components/constants/FabView";
import Carousel from "react-native-reanimated-carousel";
import { MotiView, MotiText } from "moti";
import AnimatedHeight from "../../Hooks/AnimatedHeight";
import {
  Canvas,
  Box,
  BoxShadow,
  Fill,
  rrect,
  rect,
  Image as Picture,
  useImage,
} from "@shopify/react-native-skia";
import Swiper from "react-native-swiper";
import { StatusBar } from "expo-status-bar";
import CustomAppStatusBar from "../../Hooks/AppBar";
import { TabbedHeaderPager } from "react-native-sticky-parallax-header";
import BottomBar from "../../components/BottomBar";
import NewBottomBar from "../../components/NewBottomBar";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import FixedBackHeader from "../Seller/components/FixedBackHeader";
import ServiceSettings from "../Vendor/ServiceSettings";
import ActivityLoader from "../../components/ActivityLoader";
import { AllData } from "../../Data/AllData";
import { fileFromURL, localTimeToServerDate, setListData } from "../../action";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "../../Class/upload";
import { updateData } from "../../Class/update";
import { CheckBox } from "../Seller/Pricing";
import { vendorLogin } from "../../Class/auth";
import customStyle from "../../assets/stylesheet";
import ViewMore from "../../Hooks/ViewMore";
import ServiceListViewer from "../../components/ServiceListViewer";

const { width, height } = Dimensions.get("window");
const FinalReview = (props) => {
  const newData = props?.route?.params?.data;
  const window = Dimensions.get("window");
  const newUser = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const navigation = props.navigation;
  const initialState = [
    {
      title: "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
    {
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
  ];
  const [Facilities, setFacilities] = React.useState([]);
  const [NewDataList, setNewDataList] = React.useState();
  const [ServiceList, setServiceList] = React.useState([]);
  const [ActiveService, setActiveService] = React.useState();
  const [SubServiceList, setSubServiceList] = React.useState([]);
  const listData = useSelector((state) => state.listData);
  // const user= useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(true);
  const [Data, setData] = React.useState();
  const [Images, setImages] = React.useState([]);
  const dispatch = useDispatch();
  const [Click, setClick] = React.useState(false);
  const [Title, setTitle] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Refresh, setRefresh] = React.useState(false);
  const [RelatedServices, setRelatedServices] = React.useState();
  const [UnRelatedServices, setUnRelatedServices] = React.useState();
  const [OpenDetails, setOpenDetails] = React.useState(false);
  const [NameDropDown, setNameDropDown] = React.useState(false);
  const [PositionDropDown, setPositionDropDown] = React.useState(false);
  const childRef = React.useRef();
  const [calenderHeight, setCalenderHeight] = React.useState(0);
  const [SeeMore, setSeeMore] = React.useState(false);
  const [More, setMore] = React.useState(false);
  const scrollRef = React.useRef();
  const [specialtyHeight, setSpecialtyHeight] = React.useState(75);
  const [specialtyAnimation, setSpecialtyAnimation] = React.useState(
    new Animation.Value(specialtyHeight)
  );
  const { handleScroll, showButton } = useHandleScroll();
  const [Specialty, setSpecialty] = React.useState();
  const [newNavigation, setNewNavigation] = React.useState(1100);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const [offset, setOffset] = React.useState();
  const isFocused = useIsFocused();
  const [ScreenName, setScreenName] = React.useState(false);
  const changeScreenName = React.useCallback((val) => {
    setScreenName(val);
  });
  const [wallPhoto, setWallPhoto] = useState(
    "https://i.ibb.co/BNCTDBs/2023-03-26-20-48-43.jpg"
  );
  const [modalVisible, setModalVisible] = useState(false);
  //console.log(SeeMore)
  const newImage = useImage(wallPhoto);
  const [imageUploader, setImageUploader] = useState(false);
  const [ButtonPress, setButtonPress] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isFocused) {
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
    //console.log(newData)
    setData(newData);
    setSpecialty(newData.skills.join(","));
    let img = [];
    newData?.images?.map((doc) => {
      img.push(doc.uri);
    });
    setImages(img);
    setPrice(newData?.price);
    setTitle(newData?.serviceTitle);
    setDescription(newData?.serviceDescription);
    setFacilities(newData?.facilities);
    setBackgroundImage("https://i.ibb.co/BNCTDBs/2023-03-26-20-48-43.jpg");
    //setLoader(true);
    setScrollEnabled(false);
    try {
      dispatch({
        type: "SET_NEW_LIST_DATA",
        playload: listData,
      });
      setNewDataList(listData);
    } catch (e) {
      setLoader(false);
      console.warn(e.message);
    }
  }, [newData, isFocused]);

  React.useEffect(() => {
    //console.log(NewDataList.length);
    if (Array.isArray(NewDataList)) {
      let array = [];
      NewDataList.map((item, i) => {
        if (item.title) {
          if (i == 0) {
            setActiveService(item.title);
          }
          array.push(item.title);
        } else {
          if (i == 0) {
            setServiceList([]);
            setActiveService(item.mainTitle);
          }
        }
      });
      if (array.length > 0) {
        setServiceList(uniq(array));
      }
    }
  }, [NewDataList + Click + Refresh]);
  React.useEffect(() => {
    //setSubServiceList([]);

    if (Array.isArray(NewDataList)) {
      let arr = [];
      NewDataList.map((item) => {
        if (item.title && item.title.match(ActiveService)) {
          arr.push(item.subTitle);
        } else {
          setSubServiceList([]);
        }
      });
      if (arr.length > 0) {
        setSubServiceList(uniq(arr));
      }
    }
  }, [ActiveService + Click + Refresh, isFocused]);

  React.useEffect(() => {
    if (Specialty && !Array.isArray(Specialty)) {
      let arr = Specialty.split(",");
      setSpecialty(arr);
    }
  }, [Specialty, isFocused]);

  React.useEffect(() => {
    Animation.timing(specialtyAnimation, {
      duration: 300,
      toValue: specialtyHeight,
      useNativeDriver: false,
    }).start();
  }, [specialtyHeight]);

  React.useEffect(() => {}, [newNavigation]);
  const changeScrollStatus = React.useCallback((val) => {
    //setScrollEnabled(val);
  });
  const scrollTo = React.useCallback((position) => {
    if (scrollRef) {
      //console.log(offset)
      if (position > 0) {
        scrollRef.current.scrollTo({ y: position, animated: true });
        //setOffset(val=>(val-position))
      } else {
        //console.log(position)
        scrollRef.current.scrollTo({ y: 1200, animated: true });
        //setOffset(val=>(val+position))
      }
    }
  });
  const uploadProfileImage = async (image, isProfile) => {
    setImageUploader(true);
    let arr = [];
    arr.push(fileFromURL(image));
    const res = await uploadFile(arr, newUser.token);
    setImageUploader(false);
    if (isProfile) {
      setImage(res[0]);
    } else {
      setWallPhoto(res[0]);
    }
  };
  const confirm = async () => {
    setLoading(true);
    let blobImages = [];
    Array.isArray(newData?.images) &&
      newData?.images.forEach((image, i) => {
        blobImages.push(fileFromURL(image));
      });
    const result = await uploadFile(blobImages, newUser.token);
    if (!result) {
      setLoading(false);
      //console.log(result)
      Alert.alert("Opps!", "Failed to upload images");
    }
    let businessForm = {
      workingTime: newData?.workingTime,
      startDate: {
        day: newData?.established?.getDate(),
        month: newData?.established?.getMonth(),
        year: newData?.established?.getFullYear(),
      },
      about: newData?.about,
      serviceTitle: newData?.serviceTitle,
      description: newData?.serviceDescription,
      serviceCenterName: newData?.serviceCenterName,
      title: "",
      name: newData?.providerName,
      gender: newData?.gender,
      position: newData?.position,
      teamNumber: parseInt(newData?.numberOfTeam),
      price: parseInt(newData?.price),
      facilities: newData?.facilities,
      division: newData?.address?.division,
      district: newData?.address?.district,
      area: newData?.address?.area,
      address: newData?.address?.address,
      t47: newData?.fullTime ? true : false,
      skills: newData?.skills,
      keywords: newData?.keywords,
      category: newData?.serviceCategory,
    };
    //setLoading(false)
    const res = await createService(
      businessForm,
      listData,
      result,
      newUser.token,
      image,
      wallPhoto
    ).catch((err) => {
      setLoading(false);
      console.warn(err.response.data.msg);
      Alert.alert(res.response.data.msg);
    });
    if (!res) {
      setLoading(false);
      //Alert.alert(res.response.data.msg)
      return;
    }
    const data = await vendorLogin(newUser.token, res.data.service.id);
    if (!data) {
      setLoading(false);
      Alert.alert("Opps!", "Failed Login");
      return;
    }
    setLoading(false);
    dispatch({ type: "SET_VENDOR", playload: data });
    try {
      navigation.navigate("MainProfile");
      navigation.navigate("VendorProfile");
    } catch (e) {
      navigation.navigate("Profile");
    }
    // try{
    //   props.navigation.navigate("VendorProfile");
    // }catch(err){
    //   Alert.alert("Ops!",err.message)
    // }
  };

  if (Images.length == 0) {
    return null;
  }
  if (loading) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: primaryColor }}>
      {/* {Platform.OS == "ios" && scrollEnabled && (
       <View style={{height:25}}/>
      )} */}
      <StatusBar
        hidden={true}
        backgroundColor={scrollEnabled ? primaryColor : "transparent"}
      />
      {/* {Platform.OS == "android" && (
        <StatusBar
          backgroundColor={scrollEnabled ? primaryColor : "transparent"}
        />
      )} */}
      <ScrollView
        scrollEventThrottle={16}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: primaryColor,
          flex: 1,
        }}
        onScroll={(e) => {
          handleScroll(e);
          const currentOffset = e.nativeEvent.contentOffset.y;
          const dif = currentOffset - (offset || 0);

          if (Math.abs(dif) < 3) {
            //setScrollEnabled(false);
          } else if (dif < 0) {
            //console.log("up")
            if (currentOffset < 380) {
              setScrollEnabled(false);
            }
          } else {
            if (currentOffset > 380) {
              setScrollEnabled(true);
            } else {
              setScrollEnabled(false);
            }
            //console.log("down")
          }
          // console.log(currentOffset)
          // if (currentOffset > 380) {
          //   setScrollEnabled(true);
          // } else {
          //   setScrollEnabled(false);
          // }
          // scrollY.setValue(e.nativeEvent.contentOffset.y);
          setOffset(currentOffset);
        }}>
        <Canvas style={{ width: width, height: height - (height * 30) / 100 }}>
          <Fill color={primaryColor} />
          <Box
            box={rrect(
              rect(0, 0, width - 3, height - ((height * 30) / 100 + 10)),
              5,
              5
            )}
            color={primaryColor}>
            <BoxShadow
              dx={30}
              dy={30}
              blur={20}
              color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
              inner
            />
            <BoxShadow
              dx={-10}
              dy={-10}
              blur={20}
              color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
              inner
            />
            <BoxShadow
              dx={5}
              dy={5}
              blur={20}
              color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
            />
            <BoxShadow
              dx={-20}
              dy={-20}
              blur={20}
              color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
            />
          </Box>
          {backgroundImage && newImage && (
            <Picture
              image={newImage}
              fit="cover"
              x={0}
              y={0}
              width={width}
              height={height - (height * 30) / 100}
            />
          )}
        </Canvas>

        <View
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            height: height - (height * 30) / 100,
            justifyContent: "center",
            elevation: 2,
            zIndex: 100,
          }}></View>
        <View
          style={{
            backgroundColor: primaryColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -30,
            overflow: "hidden",
          }}>
          <View
            style={{
              alignItems: "flex-end",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            {/* <TouchableOpacity>
              <SvgXml xml={editIcon} height="50" width={"50"} />
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: primaryColor,
            }}>
            <Text
              numberOfLines={2}
              style={[
                {
                  fontFamily: "Poppins-SemiBold",
                  flex: 3,
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                },
              ]}>
              {newData
                ? newData.serviceTitle
                : "Easin Arafat It Consulting Center"}
            </Text>
            <View style={{ flex: 0.5 }} />
          </View>
          <Animation.View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 15,
              flex: 1,
            }}>
            <Avatar
              onPress={() => {
                setModalVisible((val) => !val);
              }}
              style={{
                width: 40,
                height: 40,
                borderWidth: image ? 0 : 0.5,
              }}
              source={{ uri: image }}
            />
            <View
              style={{
                flex: 3,
              }}>
              <Tooltip
                enterTouchDelay={10}
                title={
                  newData
                    ? `${
                        newData?.providerName
                      } (${newData?.gender.toUpperCase()})`
                    : "No"
                }>
                <View
                  onPress={() => {
                    setNameDropDown((val) => !val);
                  }}
                  ref={childRef}
                  style={{
                    borderRadius: 10,
                    marginHorizontal: 10,
                    backgroundColor: "#E7EFFF",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    flex: 1,
                  }}>
                  <Text
                    numberOfLines={NameDropDown ? 2 : 1}
                    style={{
                      color: "#6366F1",
                      fontSize: Platform.OS == "ios" ? 16.5 : 15,
                      fontFamily: "Poppins-SemiBold",
                    }}>
                    {newData
                      ? `${
                          newData?.providerName
                        } (${newData?.gender.toUpperCase()})`
                      : "No"}
                  </Text>
                </View>
              </Tooltip>
            </View>
            <View
              style={{
                flex: 2,
              }}>
              <Tooltip enterTouchDelay={10} title={newData?.position}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#F0EFEF",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    justifyContent: "center",
                    justifySelf: "flex-end",
                  }}>
                  <Text
                    numberOfLines={PositionDropDown ? 4 : 1}
                    style={{
                      color: "#DA1E37",
                      textAlign: "center",
                      fontSize: Platform.OS == "ios" ? 14 : 13,
                      fontFamily: "Poppins-SemiBold",
                    }}>
                    {newData?.position}
                  </Text>
                </View>
              </Tooltip>
            </View>
          </Animation.View>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  marginVertical: 15,
                  marginTop: 2,
                }}>
                Specialty In
              </Text>
            </View>
            <Animation.View style={{ height: specialtyAnimation }}>
              <View
                onLayout={(e) => {
                  //console.log(e.nativeEvent.layout.height)
                  setSpecialtyHeight(e.nativeEvent.layout.height);
                }}
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}>
                {Array.isArray(Specialty) &&
                  Specialty.map((doc, i) => (
                    <SpecialtyComponent
                      more={More}
                      seeMore={(val) => {
                        setSeeMore(val);
                      }}
                      doc={doc}
                      i={i}
                      arr={Specialty}
                      key={i}
                    />
                  ))}

                {SeeMore && (
                  <Pressable
                    onPress={() => {
                      setMore((val) => !val);
                    }}
                    style={{
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: "Poppins-SemiBold",
                        fontSize: Platform.OS == "ios" ? 16.5 : 15,
                        color: "#86939B",
                      }}>
                      {!More ? "...Show All" : "...Show Less"}
                    </Text>
                  </Pressable>
                )}
              </View>
            </Animation.View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: primaryColor,
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  marginTop: 15,
                  marginBottom: 10,
                }}>
                About
              </Text>
              {/* <TouchableOpacity style={{}}>
                <SvgXml xml={editIcon} height="50" width={"50"} />
              </TouchableOpacity> */}
            </View>
            {newData && (
              <AnimatedHeight
                //id={newData?.service.id == "W8kHHhBuKG4jkXPNJ32Mw" ? true : false}
                text={newData?.about}
              />
            )}
          </View>
          <Pressable
            onPress={() => {
              if (calenderHeight == 0) {
                setCalenderHeight(120);
              } else {
                setCalenderHeight(0);
              }
              setOpenDetails((val) => !val);
            }}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              paddingTop: 5,
            }}>
            <Text
              style={{
                color: "#4ADE80",
                fontSize: Platform.OS == "ios" ? 16.5 : 15,
                fontFamily: "Poppins-SemiBold",
                marginBottom: 15,
              }}>
              ...Company Calender, Location & Team
            </Text>
          </Pressable>
        </View>

        <MotiView
          transition={{ type: "timing" }}
          animate={{ height: calenderHeight }}
          style={{ overflow: "hidden" }}>
          <View
            style={{
              backgroundColor: primaryColor,
              marginTop: -10,
            }}
            onLayout={(e) => {
              if (OpenDetails) {
                //setCalenderHeight(e.nativeEvent.layout.height);
              }
            }}>
            <ProfileOption
              onPress={() => {
                //console.log(newData?.workingTime)
                let arr = [];
                newData?.workingTime?.map((doc, i) => {
                  arr.push(localTimeToServerTime(doc));
                });

                navigation.navigate("Company Calender", {
                  workingTime: arr,
                  t47: arr?.length == 0 ? true : false,
                });
              }}
              Icon={() => <SvgXml xml={calenderIcon} height="22" width="22" />}
              title="Company Calender"
            />
            <ProfileOption
              onPress={() => {
                navigation.navigate("Vendor Address", {
                  serviceId: null,
                  address: {
                    address: newData?.address?.address,
                    area: newData?.address?.area,
                    city: newData?.address?.district,
                    region: newData?.address?.division,
                  },
                  noEdit: true,
                });
              }}
              style={{
                marginBottom: 0,
                marginTop: 5,
              }}
              Icon={() => (
                <Ionicons name="location-sharp" size={24} color={"#4ADE80"} />
              )}
              title="Work Location"
            />

            <BarOption
              icon={user}
              title={`Worker and Team (${newData?.numberOfTeam} member)`}
            />
          </View>
        </MotiView>

        <View style={{ height: 2, backgroundColor: "#FAFAFA" }} />

        <View
          transition={{ type: "timing" }}
          animate={{ height: newNavigation }}
          style={
            [
              // {
              //   overflow: "hidden",
              //   height: newNavigation,
              // },
            ]
          }>
          {/* <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                paddingLeft: 0,
                elevation: 0,
                borderBottomColor: "#FAFAFA",
                borderBottomWidth: 2,
                backgroundColor: primaryColor,
              },
              tabBarLabelStyle: {
                fontSize: Platform.OS == "ios" ? 12 : 10.5,
              },
              tabBarItemStyle: {
                margin: 0,
                padding: 0,
                width: 150,
                borderTopWidth: 0,
                borderTopColor: "#F0F0F0",
              },
              tabBarIndicatorStyle: {
                backgroundColor: "#4ADE80",
                marginLeft: 0,
              },
              tabBarScrollEnabled: true,
              tabBarPressColor: primaryColor,
              swipeEnabled: false,
            }}>
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused, color, size }) => (
                  <Text
                    style={{
                      color: focused ? "#4ADE80" : "black",
                      fontFamily: "Poppins-SemiBold",
                      fontSize: Platform.OS == "ios" ? 16.5 : 15,
                    }}>
                    {initialState[0].title}
                  </Text>
                ),
              }}
              name={initialState[0].title}
              initialParams={{
                Images: Images,
                primaryColor: primaryColor,
                textColor: textColor,
                Title: Title,
                Description: Description,
                ServiceList: ServiceList,
                SubServiceList: SubServiceList,
                NewDataList: NewDataList,
                Facilities: Facilities,
                Data: Data,
                Price: Price,
                setNewNavigation: setNewNavigation,
                RelatedServices: RelatedServices,
                UnRelatedServices: UnRelatedServices,
                changeScrollStatus: changeScrollStatus,
                scrollTo: scrollTo,
                changeScreenName: changeScreenName,
              }}
              component={}
            />
            
          </Tab.Navigator> */}
          <BargainingScreen
            navigation={navigation}
            initialParams={{
              Images: Images,
              primaryColor: primaryColor,
              textColor: textColor,
              Title: Title,
              Description: Description,
              ServiceList: ServiceList,
              SubServiceList: SubServiceList,
              NewDataList: NewDataList,
              Facilities: Facilities,
              Data: Data,
              Price: Price,
              setNewNavigation: setNewNavigation,
              RelatedServices: RelatedServices,
              UnRelatedServices: UnRelatedServices,
              changeScrollStatus: changeScrollStatus,
              scrollTo: scrollTo,
              changeScreenName: changeScreenName,
            }}
          />
        </View>
      </ScrollView>
      <View style={{ backgroundColor: primaryColor }}>
        <Pressable
          onPress={() => {
            setButtonPress(!ButtonPress);
          }}
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginHorizontal: 20,
            justifyContent: "center",
          }}>
          <CheckBox
            value={ButtonPress}
            onChange={() => {
              setButtonPress(!ButtonPress);
            }}
            style={{
              marginRight: 10,
              width: 30,
            }}
          />
          <Text style={{ fontSize: 16 }}>
            I agree with all the{" "}
            <Text
              onPress={() => {
                navigation.navigate("WebViewsGlobal", {
                  url: "https://duty.com.bd/legal/app/terms-and-conditions",
                  title: "Terms & Conditions",
                });
              }}
              style={{ color: "blue" }}>
              terms and conditions
            </Text>
          </Text>
        </Pressable>
        <IconButton
          onPress={confirm}
          disabled={ButtonPress ? false : true}
          style={{
            height: 45,
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: ButtonPress ? "#4ADE80" : "#e6e6e6",
            borderWidth: 0,
            color: ButtonPress ? "white" : "black",
          }}
          title="Confirm"
        />
      </View>

      <FixedBackHeader navigation={navigation} Yoffset={offset ? offset : 0} />
      {offset < 100 && offset > -1 && (
        <Animated.View
          style={{
            backgroundColor: "#F0F0F0",
            position: "absolute",
            top: 30,
            right: 20,
            padding: 5,
            borderRadius: 5,
            zIndex: 150,
          }}
          layout={FadeIn}>
          <Pressable
            onPress={async () => {
              //console.log("ok");
              const res = await pickImage();
              setWallPhoto(res.uri);
              uploadProfileImage(res, false);
            }}>
            <SvgXml xml={cameraIcon} height="20" width={"20"} />
          </Pressable>
        </Animated.View>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible((val) => !val)}>
        <ImageScreen
          uri={image}
          onClose={setModalVisible}
          onChange={(image) => {
            setModalVisible(false);
            setImage(image.uri);
            uploadProfileImage(image, true);
          }}
        />
      </Modal>
      <Modal transparent={true} visible={imageUploader}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}>
          <ActivityLoader />
        </View>
      </Modal>
    </View>
  );
};

export default FinalReview;
const styles = StyleSheet.create({
  activeContent: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  inactiveContent: {},
  backgroundContainer: {
    minHeight: 300,
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
    width: 110,
    height: 110,
    marginTop: -55,
    alignSelf: "center",
    backgroundColor: primaryColor,
    borderColor: backgroundColor,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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
    fontSize: Platform.OS == "ios" ? 22 : 20.5,
    fontFamily: "Poppins-SemiBold",
  },
  text: {
    textAlign: "center",
    fontSize: Platform.OS == "ios" ? 14 : 13,
    fontFamily: "Poppins-Medium",
  },
  image: {
    width: 110,
    height: 110,
  },
  starIcon: {
    marginRight: 3,
  },
  activeButton: {
    color: "#666666",
    backgroundColor: "#4ADE80",
    borderRadius: 15,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: Platform.OS == "ios" ? 13.5 : 12,
    fontFamily: "Poppins-SemiBold",
  },
  inactiveButton: {
    color: textColor,
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: Platform.OS == "ios" ? 13.5 : 12,
    fontFamily: "Poppins-SemiBold",
  },
});

const BarOption = ({ icon, title }) => {
  const [lines, setLines] = React.useState(1);
  return (
    <View
      onPress={() => {
        setLines((d) => {
          if (d === 1) {
            return 10;
          }
          return 1;
        });
      }}
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        backgroundColor: primaryColor,
        paddingVertical: 5,
      }}>
      <SvgXml xml={icon} height="22" width="22" />
      <View
        style={{
          flex: 6,
          marginLeft: 10,
        }}>
        <Text
          numberOfLines={lines}
          style={{
            fontFamily: "Poppins-SemiBold",
            marginBottom: 5,
            fontSize: Platform.OS == "ios" ? 16.5 : 15,
            color: "#333333",
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
const BargainingScreen = (props) => {
  const params = props.initialParams;
  const navigation = props.navigation;
  const Images = params.Images;
  //console.log(Images)
  const primaryColor = params.primaryColor;
  const textColor = params.textColor;
  const Title = params.Title;
  const [NewLines, setNewLines] = React.useState(3);
  const Description = params.Description;
  const ServiceList = params.ServiceList;
  const sub = params.SubServiceList;
  const [SubServiceList, setSubServiceList] = React.useState(sub);
  const NewDataList = params.NewDataList;

  const Facilities = params.Facilities;
  const Data = params.Data;
  const [ActiveService, setActiveService] = React.useState(
    Data?.serviceCategory?.name
  );
  const Price = params.Price;
  const startingHeight = 120;
  const fullHeight = calculateHeight(Description, 25);
  const setNewNavigation = params?.setNewNavigation;
  const isFocused = useIsFocused();
  const animatedHeight = React.useRef(
    new Animation.Value(startingHeight)
  ).current;
  const [newHeight, setHeight] = React.useState(3);
  const [text, setText] = React.useState("");
  const [navHeight, setNavHeight] = React.useState(0);
  const [textHeight, setTextHeight] = React.useState(0);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [ServiceTableHeight, setServiceTableHeight] = React.useState(0);
  const scrollTo = params.scrollTo;
  const changeScreenName = params.changeScreenName;
  const dispatch = useDispatch();
  //console.log(Data);

  React.useEffect(() => {
    setSubServiceList([]);

    if (Array.isArray(NewDataList)) {
      let arr = [];
      NewDataList.map((item) => {
        if (item.title && item.title.match(ActiveService)) {
          arr.push(item.subTitle);
        } else {
          setSubServiceList([]);
        }
      });
      if (arr.length > 0) {
        setSubServiceList(uniq(arr));
      }
    }
  }, [ActiveService]);
  function handleInfinityScroll(event) {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }
  React.useEffect(() => {
    Animation.spring(animatedHeight, {
      speed: 1100,
      toValue: NewLines != 3 ? fullHeight : startingHeight,
      useNativeDriver: false,
    }).start();
  }, [NewLines]);
  React.useEffect(() => {
    if (Description) {
      setText(null);
      let totalText = "";
      Description.split("").map((doc, i) => {
        if (NewLines != 3) {
          totalText = totalText + doc;
          //setText((val) => val + doc);
        }
        if (i < 121 && NewLines == 3) {
          totalText = totalText + doc;
          //setNewHeight(calculateHeight(text))
          //setText((val) => val + doc);
        }
      });
      setText(totalText);
    }
  }, [NewLines]);
  //console.log(newHeight);
  React.useEffect(() => {
    if (navHeight && isFocused) {
      //console.log(textHeight)
      // changeScreenName("BARGAINING");
      setTimeout(() => {
        //  setNewNavigation(navHeight + textHeight);
      }, 0);
    }
  }, [navHeight + isFocused + textHeight]);

  return (
    <View
      onLayout={(e) => {
        if (navHeight === 0) {
          setNavHeight(e.nativeEvent.layout.height);
        }
      }}
      scrollEventThrottle={16}
      onScroll={(e) => {
        //console.log(e.nativeEvent.contentOffset.y)
        const currentOffset = e.nativeEvent.contentOffset.y;
        //console.log(navHeight)
        if (currentOffset < -80) {
          //console.log("ok")
          scrollTo(1);
        }

        if (currentOffset > offset && currentOffset > 0) {
          scrollTo(-10);
        }

        setOffset(currentOffset);
      }}
      nestedScrollEnabled={true}>
      <View style={{ backgroundColor: primaryColor, marginBottom: -1 }}>
        <Text
          style={{
            fontSize: Platform.OS == "ios" ? 22 : 20.5,
            fontFamily: "Poppins-SemiBold",
            color: textColor,
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          {Title}
        </Text>

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          {Description && (
            <AnimatedHeight
              onChange={(height) => {
                //setNewNavigation(newHeight + 55 + height);
                //console.log(height)
                setTextHeight(height - 50);
              }}
              button={true}
              text={Description}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            justifyContent: "flex-end",
            marginVertical: 0,
            marginTop: 10,
          }}></View>
        <Carousel
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          width={width}
          height={width + 30}
          autoPlay={false}
          data={Images}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => {}}
          renderItem={({ index }) => (
            <Image
              style={{
                width: width,
                height: width + 30,
              }}
              source={{ uri: Images[index] }}
            />
          )}
        />
      </View>
      <ServiceListViewer
        serviceCategory={Data?.serviceCategory}
        facilities={Facilities}
        skills={Data?.skills}
      />
      <View
        style={{
          backgroundColor: primaryColor,

          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 15,
        }}>
        <Text
          style={{
            fontSize: Platform.OS == "ios" ? 17 : 15.5,
            color: textColor,

            fontFamily: "Poppins-SemiBold",
          }}>
          From {Price} ৳
        </Text>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("Service List_1", {
              NewDataList: NewDataList,
              facilites: Facilities,
            });
          }}
          style={{
            flexDirection: "row",
            minWidth: 10,
            alignItems: "center",
          }}>
          <Text
            style={{
              fontSize: Platform.OS == "ios" ? 16.5 : 15,
              fontFamily: "Poppins-SemiBold",
              color: "#707070",
              marginRight: 0,
            }}>
            Show All
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#707070"
          />
        </TouchableOpacity> */}
      </View>
      {/* <View style={{ backgroundColor: primaryColor }}>
        <IconButton
          onPress={() => {
            navigation.navigate("OfferNow", {
              data: Data,
              type: "STARTING",
            });
          }}
          style={{
            borderRadius: 5,
            marginHorizontal: 20,
            backgroundColor: "#FEA31E",
            borderWidth: 0,
            marginVertical: 0,
            color: textColor,
            marginTop: 0,
            height: 40,
          }}
          title="Offer Now"
        />
      </View> */}
      <View style={{ height: 70 }} />
    </View>
  );
};
const threeDot = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28.227" height="16.127" viewBox="0 0 28.227 16.127">
<defs>
  <filter id="Path_6118" x="12.097" y="0" width="16.13" height="16.127" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="2" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
  <filter id="Path_6119" x="6.05" y="0" width="16.127" height="16.127" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="2" result="blur-2"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur-2"/>
    <feComposite in="SourceGraphic"/>
  </filter>
  <filter id="Path_6120" x="0" y="0" width="16.13" height="16.127" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="2" result="blur-3"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur-3"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Group_10261" data-name="Group 10261" transform="translate(-387.386 -69.709)">
  <g transform="matrix(1, 0, 0, 1, 387.39, 69.71)" filter="url(#Path_6118)">
    <path id="Path_6118-2" data-name="Path 6118" d="M201.177,0h.1A2.08,2.08,0,0,1,202.6.52a2.063,2.063,0,1,1-2.734,0A2.081,2.081,0,0,1,201.177,0Z" transform="translate(22.23 -196.17) rotate(90)" fill="#fff"/>
  </g>
  <g transform="matrix(1, 0, 0, 1, 387.39, 69.71)" filter="url(#Path_6119)">
    <path id="Path_6119-2" data-name="Path 6119" d="M200.991,199.166a2.063,2.063,0,1,1-1.563,1.044A2.066,2.066,0,0,1,200.991,199.166Z" transform="translate(215.33 -196.17) rotate(90)" fill="#fff"/>
  </g>
  <g transform="matrix(1, 0, 0, 1, 387.39, 69.71)" filter="url(#Path_6120)">
    <path id="Path_6120-2" data-name="Path 6120" d="M199.8,398.823a2.064,2.064,0,1,1,2.788,3.043,2.082,2.082,0,0,1-1.314.52h-.1a2.067,2.067,0,0,1-2.013-2.107A2.058,2.058,0,0,1,199.8,398.823Z" transform="translate(408.39 -196.16) rotate(90)" fill="#fff"/>
  </g>
</g>
</svg>
`;
const loveIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="51" height="46.538" viewBox="0 0 51 46.538">
<defs>
  <filter id="Path_20917" x="0" y="0" width="51" height="46.538" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_20917)">
  <path id="Path_20917-2" data-name="Path 20917" d="M7.415,34.748a8.3,8.3,0,0,1,5.093.652A9.284,9.284,0,0,1,16.5,39.069a9.168,9.168,0,0,1,4.918-4.039,8.31,8.31,0,0,1,5.629.135,9.127,9.127,0,0,1,4.465,3.784A10.419,10.419,0,0,1,33,43.881v.589a12.3,12.3,0,0,1-2.083,6.116,29.866,29.866,0,0,1-5.127,5.9,54.693,54.693,0,0,1-5.227,4.18c-1.157.813-2.332,1.6-3.547,2.324a.974.974,0,0,1-.992.021c-.915-.535-1.8-1.115-2.681-1.7A50.38,50.38,0,0,1,5.009,54.37a24.929,24.929,0,0,1-3.1-3.992A11.989,11.989,0,0,1,0,44.6v-.414a10.247,10.247,0,0,1,2.572-6.657A8.685,8.685,0,0,1,7.415,34.748Z" transform="translate(9 -28.6)" fill="#fff"/>
</g>
</svg>
`;
const shareIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="51" height="50.994" viewBox="0 0 51 50.994">
<defs>
  <filter id="Path_20916" x="0" y="0" width="51" height="50.994" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="_000000ff" data-name="#000000ff" transform="translate(9 6)">
  <g transform="matrix(1, 0, 0, 1, -9, -6)" filter="url(#Path_20916)">
    <path id="Path_20916-2" data-name="Path 20916" d="M17.484,0h.03c.586.516,1.2,1,1.807,1.5Q25.769,6.75,32.216,12a5.009,5.009,0,0,0,.784.589v.083a4.266,4.266,0,0,0-.712.532q-7.406,6.05-14.809,12.1,0-3.91,0-7.819A17.99,17.99,0,0,0,9.6,19.785a17.761,17.761,0,0,0-6.867,6.988c-.351.624-.6,1.3-.888,1.95C1.229,30.145.639,31.58,0,32.994v-7.32a24.044,24.044,0,0,1,.275-2.606,18.216,18.216,0,0,1,2.633-6.759A18.506,18.506,0,0,1,17.48,7.821C17.48,5.214,17.471,2.607,17.484,0Z" transform="translate(9 6)" fill="#fff"/>
  </g>
</g>
</svg>
`;
const newCalender = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50.633" height="49" viewBox="0 0 50.633 49">
<defs>
  <filter id="Path_19748" x="0" y="0" width="46.367" height="46.222" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
  <filter id="add-circle" x="22.65" y="21.017" width="27.982" height="27.982" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur-2"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur-2"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Group_10262" data-name="Group 10262" transform="translate(-373.367 -208.547)">
  <g transform="matrix(1, 0, 0, 1, 373.37, 208.55)" filter="url(#Path_19748)">
    <path id="Path_19748-2" data-name="Path 19748" d="M14.416,7.285a1,1,0,0,1,1.849.086,13.242,13.242,0,0,1,.052,1.9q4.266,0,8.534,0A13.388,13.388,0,0,1,24.9,7.386a1,1,0,0,1,1.859-.071,11.81,11.81,0,0,1,.062,1.957c1.182.027,2.364-.054,3.543.044a4.979,4.979,0,0,1,4.294,4.107A36.147,36.147,0,0,1,34.7,18.35c-.007,3.935.017,7.869-.01,11.806a4.946,4.946,0,0,1-5,4.777q-9.111.007-18.225,0a4.981,4.981,0,0,1-5-5.235c.01-3.7,0-7.4.007-11.1,0-1.655-.158-3.314,0-4.966a4.948,4.948,0,0,1,3.125-4c1.514-.591,3.166-.268,4.747-.352a10.928,10.928,0,0,1,.069-1.987M9.3,12.236c-1.007.948-.817,2.41-.81,3.659H32.673c.01-1.251.19-2.713-.815-3.661-1.3-1.369-3.366-.734-5.035-.881a7.378,7.378,0,0,1-.116,2.034.99.99,0,0,1-1.783-.071,10.017,10.017,0,0,1-.074-1.96q-4.266,0-8.534,0a9.855,9.855,0,0,1-.076,1.962,1,1,0,0,1-1.785.076,7.743,7.743,0,0,1-.111-2.041c-1.669.15-3.735-.49-5.04.884m2.972,8.66a1.31,1.31,0,1,0,1.679,1.628A1.319,1.319,0,0,0,12.276,20.9m5.176.03a1.311,1.311,0,1,0,1.81,1.367,1.32,1.32,0,0,0-1.81-1.367m5.2.022a1.31,1.31,0,1,0,1.866,1.1,1.324,1.324,0,0,0-1.866-1.1m5.382-.049a1.309,1.309,0,1,0,1.682,1.632A1.317,1.317,0,0,0,28.029,20.9m-15.7,5.232a1.309,1.309,0,1,0,1.642,1.591,1.318,1.318,0,0,0-1.642-1.591m15.756,0a1.309,1.309,0,1,0,1.647,1.583,1.316,1.316,0,0,0-1.647-1.583M17.235,26.3a1.308,1.308,0,1,0,2.019.923,1.319,1.319,0,0,0-2.019-.923m5.358-.064a1.309,1.309,0,1,0,1.916,1A1.318,1.318,0,0,0,22.592,26.231Z" transform="translate(2.6 -0.71)" fill="#fff"/>
  </g>
  <circle id="Ellipse_2151" data-name="Ellipse 2151" cx="3.927" cy="3.927" r="3.927" transform="translate(405.999 236.546)" fill="#efefef"/>
  <g transform="matrix(1, 0, 0, 1, 373.37, 208.55)" filter="url(#add-circle)">
    <path id="add-circle-2" data-name="add-circle" d="M7.991,3a4.991,4.991,0,1,0,4.991,4.991A4.993,4.993,0,0,0,7.991,3Zm2.5,5.49h-2v2h-1v-2h-2v-1h2v-2h1v2h2Z" transform="translate(28.65 24.02)" fill="#fff"/>
  </g>
</g>
</svg>
`;
const messageIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="58.546" height="58.546" viewBox="0 0 58.546 58.546">
<defs>
  <filter id="Path_20915" x="0" y="0" width="58.546" height="58.546" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_20915)">
  <path id="Path_20915-2" data-name="Path 20915" d="M11.075,2.3a4.556,4.556,0,0,1,7.911,0L29.358,20.448c1.736,3.037-.663,7.827-3.956,6.816L15.17,23.4,4.657,27.264C.511,27.6-1.034,23.485.7,20.448Z" transform="translate(28.38 6) rotate(45)" fill="#fff"/>
</g>
</svg>
`;
const newStar = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18">
<path id="Polygon_1" data-name="Polygon 1" d="M9.6,1.879a1,1,0,0,1,1.8,0l1.844,3.843a1,1,0,0,0,.817.564l4.428.376a1,1,0,0,1,.537,1.78l-3.181,2.526a1,1,0,0,0-.349,1.024l.951,3.827a1,1,0,0,1-1.441,1.123L10.971,14.79a1,1,0,0,0-.941,0L5.994,16.942a1,1,0,0,1-1.441-1.123L5.5,11.992a1,1,0,0,0-.349-1.024L1.973,8.442a1,1,0,0,1,.537-1.78l4.428-.376a1,1,0,0,0,.817-.564Z" fill="#ffc107"/>
</svg>
`;

const calculateHeight = (text, plus, minus) => {
  let textLength = text?.split("").length;
  if (!textLength) {
    return;
  }
  textLength = parseInt(textLength);
  let lineHeight = Platform.OS == "ios" ? 26 : 26;
  let letterWidth = Platform.OS == "ios" ? 8 : 8;
  let height = ((textLength * letterWidth) / (width - 40)) * lineHeight;
  if (plus) {
    return height + plus;
  }
  if (minus) {
    return height - minus;
  }
  return height;
};
const SpecialtyComponent = ({ doc, i, arr, seeMore, more }) => {
  const [Length, setLength] = React.useState(0);
  React.useEffect(() => {
    let length = 0;
    arr.forEach((doc, j) => {
      if (j <= i) {
        length =
          length + doc.split("").length + (Platform.OS == "ios" ? 70 : 60);
      }
    });
    setLength(width < 400 ? length - 40 : length);
    //console.log(width)
  }, []);

  React.useEffect(() => {
    if (Length > width) {
      seeMore(true);
    } else {
      seeMore(false);
    }
  }, [Length]);
  if (Length > width && !more) {
    //seeMore();
    return null;
  }

  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: "#4ADE80",
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginRight: 5,
        marginVertical: 5,
      }}>
      <Text
        style={{
          color: "white",
          fontFamily: "Poppins-Medium",
          fontSize: Platform.OS == "ios" ? 14.5 : 12,
        }}>
        {doc}
      </Text>
    </View>
  );
};
const SettingsScreen = () => {
  return <View></View>;
};
const refreshIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14.646" height="12.902" viewBox="0 0 14.646 12.902">
<g id="_000000ff" data-name="#000000ff" transform="translate(-6.437 -13.36)">
  <path id="Path_20932" data-name="Path 20932" d="M7.3,16.648A6.652,6.652,0,0,1,12,13.435a6.386,6.386,0,0,1,4.863,1.255A6.488,6.488,0,0,1,19.4,19.44a6.819,6.819,0,0,1-.251,2.145,5.047,5.047,0,0,1,1.385-.372.691.691,0,0,1,.219,1.262c-.91.363-1.858.638-2.789.947a.672.672,0,0,1-.862-.43c-.329-.936-.676-1.868-.974-2.814a.688.688,0,0,1,1.185-.581,11.864,11.864,0,0,1,.537,1.431,5.132,5.132,0,0,0-3.427-6.068,5.005,5.005,0,0,0-3.255.068,5.167,5.167,0,0,0-3.194,3.459,5.033,5.033,0,0,0,.641,4.083,5.243,5.243,0,0,0,4.394,2.364c.7.033.752,1.186.08,1.318a6.477,6.477,0,0,1-6.378-4.575A6.315,6.315,0,0,1,7.3,16.648Z" transform="translate(0)" fill="#4ade80"/>
</g>
</svg>
`;
const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="41.275" height="19" viewBox="0 0 41.275 19">
<g id="Group_10263" data-name="Group 10263" transform="translate(-118.725 -664)">
  <text id="edit" transform="translate(135 679)" fill="#86939b" font-size="14" font-weight="500"><tspan x="0" y="0">Edit</tspan></text>
  <g id="_1159633" data-name="1159633" transform="translate(118.825 667.001)">
    <g id="_000000ff" data-name="#000000ff" transform="translate(0 1.999)">
      <path id="Path_20919" data-name="Path 20919" d="M144.311,2.057a1.269,1.269,0,0,1,1,.1,3.066,3.066,0,0,1,.586.518,1.284,1.284,0,0,1,.39.871v.095a1.294,1.294,0,0,1-.2.625,2.273,2.273,0,0,1-.342.387l-4.733,4.733a.574.574,0,0,1-.239.18q-1.172.327-2.345.651a.293.293,0,0,1-.286-.056.283.283,0,0,1-.081-.292c.213-.776.43-1.551.643-2.327a.371.371,0,0,1,.1-.185l4.965-4.966a1.293,1.293,0,0,1,.54-.336m.165.538c-.246.076-.394.3-.578.465.435.444.88.878,1.316,1.322.113-.1.215-.207.319-.315a.7.7,0,0,0,.134-.745,2.041,2.041,0,0,0-.447-.525.715.715,0,0,0-.745-.2M139.4,7.557c.436.445.882.88,1.319,1.324.4-.393.795-.794,1.193-1.19l2.91-2.91L143.5,3.46q-2.052,2.048-4.1,4.1m-.265.533q-.2.73-.4,1.461c.486-.134.972-.27,1.458-.4C139.842,8.792,139.487,8.443,139.136,8.091Z" transform="translate(-135.009 -1.999)" fill="#86939b" stroke="#86939b" stroke-width="0.2"/>
      <path id="Path_20920" data-name="Path 20920" d="M.276,52.1a1.4,1.4,0,0,1,.909-.553,2.832,2.832,0,0,1,.445-.019H3.742a1.209,1.209,0,0,1,.222.009.281.281,0,0,1-.088.552H1.629a1.654,1.654,0,0,0-.452.034.836.836,0,0,0-.488.368.883.883,0,0,0-.128.477q0,3.611,0,7.222A1.023,1.023,0,0,0,.6,60.5a.84.84,0,0,0,.532.546,1.844,1.844,0,0,0,.582.048H9.25a.854.854,0,0,0,.784-.468,1.472,1.472,0,0,0,.091-.695q0-1.08,0-2.16a.281.281,0,1,1,.561,0q0,1.233,0,2.466a1.412,1.412,0,0,1-.39.983,1.379,1.379,0,0,1-1,.431c-1.131-.008-2.262,0-3.393,0-1.514,0-3.027,0-4.541,0a1.37,1.37,0,0,1-.981-.442A1.421,1.421,0,0,1,0,60.294v-7.4A1.422,1.422,0,0,1,.276,52.1Z" transform="translate(0 -50.438)" fill="#86939b" stroke="#86939b" stroke-width="0.2"/>
    </g>
    <g id="_0000008c" data-name="#0000008c" transform="translate(1.359 13.207)">
      <path id="Path_20921" data-name="Path 20921" d="M61.72,510.974c1.514,0,3.027,0,4.541,0,1.131,0,2.262,0,3.393,0l.027.018H61.72Z" transform="translate(-61.72 -510.971)" fill="#86939b" stroke="#86939b" stroke-width="0.2" opacity="0.55"/>
    </g>
  </g>
</g>
</svg>
`;

const ServiceTable = ({ item, i, name, NewDataList, onLayout, height }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const [Data, setData] = React.useState([]);
  const [TableName, setTableName] = React.useState();
  const [contentHeight, setContentHeight] = React.useState(
    height ? height : 60
  );
  //console.log(`total ${contentHeight}`)
  React.useEffect(() => {
    if (NewDataList) {
      setData([]);
      let arr = [];
      if (item) {
        NewDataList.forEach((data) => {
          if (data.subTitle && data.subTitle == item) {
            arr.push(data.tableName);
          }
        });
      } else {
        NewDataList.forEach((item) => {
          if (item.title && item.title == name) {
            arr.push(item.tableName);
          }
        });
      }
      if (arr.length > 0) {
        setData(uniq(arr));
      }
    }
  }, [name]);

  React.useLayoutEffect(() => {
    if (height) {
      setContentHeight(height);
    }
  }, [height]);
  return (
    <View
      onLayout={(e) => {
        //console.log(e.nativeEvent.layout.height)
        //setContentHeight(e.nativeEvent.layout.height);
      }}
      style={{
        paddingBottom: 5,
        borderColor: "#e5e5e5",
        minHeight: 10,
      }}
      key={i}>
      {item && contentHeight > 30 && (
        <Text
          numberOfLines={1}
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: Platform.OS == "ios" ? 16.5 : 15,
            margin: 0,
            color: "#535353",
          }}>
          {item}
        </Text>
      )}
      {Data.length > 0 ? (
        Data.map(
          (doc, i) =>
            i == 0 && (
              <View key={i}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: Platform.OS == "ios" ? 16.5 : 15,
                    color: "#95979D",
                  }}>
                  {doc}
                </Text>
                <Rows
                  index={i}
                  height={item ? contentHeight - 60 : contentHeight - 30}
                  item={doc}
                  name={name}
                  NewDataList={NewDataList}
                />
              </View>
            )
        )
      ) : (
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: Platform.OS == "ios" ? 16.5 : 15,
              color: "#95979D",
            }}>
            {name}
          </Text>
          <Rows
            index={0}
            height={item ? contentHeight - 60 : contentHeight - 30}
            NewDataList={NewDataList}
            name={name}
          />
        </View>
      )}
    </View>
  );
};

const Rows = ({ title, item, name, NewDataList, height, index }) => {
  const [text, setText] = React.useState();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();

  React.useEffect(() => {
    //console.log(item);
    if (!NewDataList) {
      return;
    }
    let count = 0;
    let word = "";
    NewDataList.map((doc, j) => {
      if (doc.title && doc.tableName.match(item) && doc.title.match(name)) {
        word = word + `${count != 0 ? ", " : ""}${doc.data.title}`;
        count++;
      } else if (doc.title && doc.title.match(name)) {
        word = word + `${count != 0 ? "," : ""} ${doc.data.title}`;
        count++;
      } else if (doc.mainTitle && doc.mainTitle.match(name)) {
        word = word + `${count != 0 ? "," : ""} ${doc.data.title}`;
        count++;
      }
    });
    setText(word);
  }, [item + title + NewDataList]);
  //console.log(`index ${index+1} ${height}`)

  if (height < 15) {
    return null;
  }

  return (
    <Text
      numberOfLines={1}
      style={{
        fontSize: Platform.OS == "ios" ? 16.5 : 15,
        fontFamily: "Poppins-Medium",
        color: textColor,

        maxHeight: 160,
      }}>
      {text}
    </Text>
  );
};

const ServiceCarts = () => {
  return <TouchableOpacity></TouchableOpacity>;
};

const TabBar = ({
  state,
  descriptors,
  navigation,
  position,
  onClick,
  onPress,
  data,
  onChange,
}) => {
  const ref = React.useRef();
  const packages = data;

  const dispatch = useDispatch();

  React.useEffect(() => {
    //console.log(packages[state.index-1])
    //console.log(state.index);
    if (onChange) {
      onChange(packages[state.index]);
    }
    if (ref) {
      ref.current.scrollTo({ x: state.index * 80, animated: true });
    }
  }, [state.index]);

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#E9E6E6",
        borderBottomWidth: 0.5,
      }}>
      <ScrollView
        ref={ref}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        {packages.map((doc, index) => {
          const isFocused = state.index === index;

          const [Visible, setVisible] = React.useState(false);
          const [Title, setTitle] = React.useState();
          const [id, setId] = React.useState();
          React.useEffect(() => {
            //console.log(packages[state.index-1])
            if (packages.length > index) {
              setTitle(`${packages[index].name} ${packages[index].price}৳`);
              setId(packages[index].id);
            }
          }, [index]);
          return (
            <View key={index}>
              <Pressable
                onPress={() => {
                  navigation.navigate(doc.id);
                }}
                style={{
                  borderBottomColor: "#707070",
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 5,
                  height: 40,
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-SemiBold",
                  }}>
                  {Title}

                  {/* {packages[state.index].name+" "+packages[state.index].price+"৳"} */}
                </Text>

                {/* <Menu
                  contentStyle={{
                    backgroundColor: "white",
                  }}
                  visible={Visible}
                  onDismiss={() => setVisible(!Visible)}
                  anchor={
                    <Entypo
                      onPress={() => {
                        setVisible(true);
                      }}
                      style={{
                        marginLeft: 10,
                      }}
                      name="dots-three-vertical"
                      size={18}
                      color="black"
                    />
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      onClick(packages[index]);
                      setVisible(false);
                    }}
                    title="Edit"
                  />
                  <Menu.Item
                    onPress={() => {
                      onPress(id);
                      setVisible(false);
                    }}
                    title="Delete"
                  />
                </Menu> */}
              </Pressable>
              {isFocused && (
                <View
                  style={{
                    height: 2,
                    backgroundColor: "#707070",
                    width: "80%",
                    alignSelf: "center",
                  }}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const TabScreen = ({ navigation, route }) => {
  const data = route.params.data;

  return (
    <View
      style={{
        flex: 1,
      }}>
      {data.features.map((doc, i) => (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            justifyContent: "space-between",
            marginVertical: 5,
            borderBottomColor: "#F1F1F1",
            borderBottomWidth: data.features.length - 1 == i ? 0 : 1,
          }}
          key={i}>
          {doc.isAvailable ? (
            <SvgXml xml={right} height="30" width={"30"} />
          ) : (
            <Entypo
              style={{
                marginBottom: 8,
              }}
              name="cross"
              size={20}
              color="red"
            />
          )}
          <Text
            style={{
              fontSize: 14,
              color: "#666666",
            }}>
            {doc.title}
          </Text>
        </View>
      ))}
    </View>
  );
};
const right = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30.605" height="27.993" viewBox="0 0 30.605 27.993">
<defs>
  <filter id="Path_20808" x="0" y="0" width="30.605" height="27.993" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.059"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_20808)">
  <path id="Path_20808-2" data-name="Path 20808" d="M-1914.146,1248.438a2.381,2.381,0,0,1,1.1-.082,3.952,3.952,0,0,1,3.039,1.914l.306.491a13.771,13.771,0,0,1,8.1-6.767l.053.046c-.041.048-.078.1-.122.144-.976.977-1.964,1.943-2.926,2.931a22.819,22.819,0,0,0-2.99,3.7c-.429.681-.823,1.382-1.237,2.071-.17.283-.351.559-.53.837a1.017,1.017,0,0,1-.122.149c-.156.163-.245.161-.361-.031q-.482-.794-.945-1.6a13.755,13.755,0,0,0-1.538-2.3,7.365,7.365,0,0,0-1.763-1.467Z" transform="translate(1923.15 -1237.99)" fill="#0d9e21"/>
</g>
</svg>
`;
const settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="11.861" height="11.864" viewBox="0 0 11.861 11.864">
<path id="ios-settings" d="M15.382,10.431a1.526,1.526,0,0,1,.979-1.424,6.065,6.065,0,0,0-.732-1.764,1.545,1.545,0,0,1-.621.133,1.523,1.523,0,0,1-1.393-2.143A6.024,6.024,0,0,0,11.855,4.5a1.525,1.525,0,0,1-2.848,0,6.065,6.065,0,0,0-1.764.732A1.523,1.523,0,0,1,5.85,7.375a1.5,1.5,0,0,1-.621-.133A6.184,6.184,0,0,0,4.5,9.01a1.526,1.526,0,0,1,0,2.848,6.065,6.065,0,0,0,.732,1.764,1.523,1.523,0,0,1,2.011,2.011,6.078,6.078,0,0,0,1.764.732,1.522,1.522,0,0,1,2.841,0,6.065,6.065,0,0,0,1.764-.732,1.525,1.525,0,0,1,2.011-2.011,6.078,6.078,0,0,0,.732-1.764,1.533,1.533,0,0,1-.976-1.427ZM10.458,12.9a2.471,2.471,0,1,1,2.471-2.471A2.47,2.47,0,0,1,10.458,12.9Z" transform="translate(-4.5 -4.5)" fill="#666"/>
</svg>
`;
const settingsActiveIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="11.861" height="11.864" viewBox="0 0 11.861 11.864">
<path id="ios-settings" d="M15.382,10.431a1.526,1.526,0,0,1,.979-1.424,6.065,6.065,0,0,0-.732-1.764,1.545,1.545,0,0,1-.621.133,1.523,1.523,0,0,1-1.393-2.143A6.024,6.024,0,0,0,11.855,4.5a1.525,1.525,0,0,1-2.848,0,6.065,6.065,0,0,0-1.764.732A1.523,1.523,0,0,1,5.85,7.375a1.5,1.5,0,0,1-.621-.133A6.184,6.184,0,0,0,4.5,9.01a1.526,1.526,0,0,1,0,2.848,6.065,6.065,0,0,0,.732,1.764,1.523,1.523,0,0,1,2.011,2.011,6.078,6.078,0,0,0,1.764.732,1.522,1.522,0,0,1,2.841,0,6.065,6.065,0,0,0,1.764-.732,1.525,1.525,0,0,1,2.011-2.011,6.078,6.078,0,0,0,.732-1.764,1.533,1.533,0,0,1-.976-1.427ZM10.458,12.9a2.471,2.471,0,1,1,2.471-2.471A2.47,2.47,0,0,1,10.458,12.9Z" transform="translate(-4.5 -4.5)" fill="#4ade80"/>
</svg>
`;
const Subscriptions = ({ navigation, route }) => {
  const params = route.params;
  //const PackageService = params.PackageService;
  const PackageService = [];
  const onPress = route.params.onPress;
  const RelatedServices = params.RelatedServices;
  const UnRelatedServices = params.UnRelatedServices;
  const [content, setContent] = React.useState(2);
  const [layoutHeight, setLayoutHeight] = React.useState();
  const isFocused = useIsFocused();
  const setNewNavigation = params.setNewNavigation;
  const scrollTo = params.scrollTo;
  const [offset, setOffset] = React.useState(0);
  const changeScreenName = params.changeScreenName;
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const [SubsCription, setSubscription] = React.useState();

  React.useEffect(() => {
    if (layoutHeight && isFocused) {
      //console.log(layoutHeight);
      changeScreenName("SUBS");
      setNewNavigation(layoutHeight + 50);
    }
  }, [layoutHeight + isFocused]);
  React.useEffect(() => {
    if (user && vendor) {
      getOtherServices(user.token, vendor.service.id, "SUBS")
        .then((res) => {
          setSubscription(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          setSubscription([]);
          console.warn(err.response.data);
        });
    }
  }, [isFocused, user, vendor]);
  //console.log(FixedService)
  if (!SubsCription) {
    return <ActivityLoader />;
  }
  return (
    <View
      scrollEventThrottle={16}
      onScroll={(e) => {
        //console.log(e.nativeEvent.contentOffset.y)
        const currentOffset = e.nativeEvent.contentOffset.y;
        //console.log(navHeight)
        if (currentOffset < -80) {
          //console.log("ok")
          scrollTo(1);
        }
        if (currentOffset > offset && currentOffset > 0) {
          scrollTo(-10);
        }
        setOffset(currentOffset);
      }}
      onLayout={(e) => {
        setLayoutHeight(e.nativeEvent.layout.height);
      }}
      nestedScrollEnabled={true}>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          marginVertical: 20,
        }}>
        {SubsCription &&
          SubsCription.map((doc, i) => (
            <ServiceCart
              onPress={() => {
                if (onPress) {
                  onPress(doc);
                }
              }}
              key={i}
              data={doc}
            />
          ))}
        {/* {PackageService.length > content && (
          <View
            style={{
              justifyContent: "center",
              marginVertical: 15,
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              onPress={() => {
                setContent((val) => val + 2);
              }}
              style={{
                borderWidth: 0,
              }}
              Icon={() => <SvgXml xml={refreshIcon} height="20" width={"20"} />}
              title="Load More"
            />
          </View>
        )}
            */}
        {SubsCription && SubsCription.length == 0 && (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              backgroundColor: primaryColor,
              justifyContent: "center",
              width: "100%",
            }}
            entering={FadeIn}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <SvgXml
                xml={serviceIcon}
                style={{ marginVertical: 100 }}
                height="200"
                width="200"
              />
            </View>
          </Animated.View>
        )}
        {/* <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}
        >
          {RelatedServices.length > 2 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                Related Service
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {RelatedServices.map((doc, i) =>
                  i < 6 ? (
                    <RelatedService
                      squire={true}
                      data={doc}
                      key={i}
                      navigation={navigation}
                    />
                  ) : null
                )}
              </View>
            </View>
          )}

          {UnRelatedServices.length > 0 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                You Might Also Like
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {UnRelatedServices.map((doc, i) =>
                  i < 50 ? (
                    <RelatedService
                      squire={true}
                      data={doc}
                      key={i}
                      navigation={navigation}
                    />
                  ) : null
                )}
              </View>
            </View>
          )}
        </View> */}
      </View>
      <View style={{ height: 70 }} />
    </View>
  );
};

const ImageScreen = ({ onClose, onChange, uri }) => {
  const [click, setClick] = useState(true);
  const [image, setImage] = useState(uri);
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      onChange(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}>
      {click && (
        <Animated.View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 50,
            right: 20,
          }}
          layout={FadeIn}>
          <Pressable onPress={pickImage}>
            <SvgXml xml={cameraIcon} height="20" width={"20"} />
          </Pressable>
          <View style={{ width: 30 }} />
          <Pressable onPress={() => onClose((val) => !val)}>
            <SvgXml xml={close} height="20" width={"20"} />
          </Pressable>
        </Animated.View>
      )}
      <TouchableHighlight
        style={{
          width: width,
          height: (height * 70) / 100,
        }}
        onPress={() => {
          setClick((val) => !val);
        }}>
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={{ uri: image }}
        />
      </TouchableHighlight>
    </SafeAreaView>
  );
};
const cameraIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18">
<g id="Group_17885" data-name="Group 17885" transform="translate(-1.5 -3)">
  <path id="Path_28064" data-name="Path 28064" d="M6.827,6.175A2.31,2.31,0,0,1,5.186,7.23c-.38.054-.757.112-1.134.175a2.179,2.179,0,0,0-1.8,2.169V18A2.25,2.25,0,0,0,4.5,20.25h15A2.25,2.25,0,0,0,21.75,18V9.574a2.18,2.18,0,0,0-1.8-2.169q-.566-.094-1.134-.175a2.31,2.31,0,0,1-1.64-1.055l-.822-1.316A2.192,2.192,0,0,0,14.616,3.82a48.774,48.774,0,0,0-5.232,0A2.192,2.192,0,0,0,7.648,4.859L6.827,6.175Z" fill="none" stroke="#4a4a4a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  <path id="Path_28065" data-name="Path 28065" d="M16.5,12.75A4.5,4.5,0,1,1,12,8.25a4.5,4.5,0,0,1,4.5,4.5Zm2.25-2.25h.008v.008H18.75Z" fill="none" stroke="#4a4a4a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
</g>
</svg>
`;
const close = `<svg xmlns="http://www.w3.org/2000/svg" width="14.121" height="14.121" viewBox="0 0 14.121 14.121">
<path id="Path_28066" data-name="Path 28066" d="M6,18,18,6M6,6,18,18" transform="translate(-4.939 -4.939)" fill="none" stroke="#4a4a4a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
</svg>
`;
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  // console.log(result);

  if (!result.canceled) {
    return result.assets[0];
    //setImage(result.assets[0].uri);
  }
  return null;
};
