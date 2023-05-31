import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  StatusBar,
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
} from "./../assets/colors";
import ProfileOption from "./../components/ProfileOption";
import { AntDesign } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Button from "./../components/Button";
import RatingView from "./../components/RatingView";
import { user, calenderIcon, noticeIcon, serviceIcon } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "./../Cart/ReviewCart";
import RelatedService from "./../Cart/RelatedService";
import IconButton from "./../components/IconButton";
import { Menu } from "react-native-paper";
import { Rows, ServiceTable, TabBar, TabScreen } from "./VendorProfile";
import Animated, {
  FadeIn,
  StretchInY,
  FlipInEasyX,
  Transition,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ServiceCart from "./../Cart/ServiceCart";
import {
  getService,
  getOtherServices,
  getRelatedServices,
  getUnRelatedServices,
  getDashboardReviews,
  setLikeGigs,
  getLikeGigs,
  getFullRating,
} from "../Class/service";
import { useSelector, useDispatch } from "react-redux";
import { convertServerFacilities, serverToLocal } from "../Class/dataConverter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from "@react-navigation/native";
import Avatar from "../components/Avatar";
const Tab = createMaterialTopTabNavigator();
import { Tooltip } from "react-native-paper";
import useHandleScroll from "../components/constants/FabView";
import Carousel from "react-native-reanimated-carousel";
import { MotiView, MotiText } from "moti";
import AnimatedHeight from "../Hooks/AnimatedHeight";
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

import CustomAppStatusBar from "../Hooks/AppBar";
import { TabbedHeaderPager } from "react-native-sticky-parallax-header";
import BottomBar from "../components/BottomBar";
import NewBottomBar from "../components/NewBottomBar";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import FixedBackHeader from "./Seller/components/FixedBackHeader";
import ActivityLoader from "../components/ActivityLoader";
import { TopSellerCard } from "../components/LandingPage/TopSeller";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import OfferNow from "./Seller/OfferNow";
import { CheckBox } from "./Seller/Pricing";
import { setSaveList } from "../Reducers/saveList";
import ProfileSkeleton from "../components/ProfileSkeleton";
import ServiceListViewer from "../components/ServiceListViewer";

const { width, height } = Dimensions.get("window");
const OtherProfile = (props) => {
  const window = Dimensions.get("window");
  const newUser = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [Lines, setLines] = React.useState(3);
  const navigation = props.navigation;
  const [Visible, setVisible] = React.useState(false);
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
    // {
    //   title: "Installment",
    //   value: false,
    //   type: "INSTALLMENT",
    // },
    // {
    //   title: "Subscription",
    //   value: false,
    //   type: "SUBS",
    // },
  ];
  const [Active, setActive] = React.useState("Bargaining");
  const [NewLines, setNewLines] = React.useState(3);
  const [Facilities, setFacilities] = React.useState([]);
  const [NewDataList, setNewDataList] = React.useState(null);
  const [ServiceList, setServiceList] = React.useState([]);
  const [ActiveService, setActiveService] = React.useState();
  const [SubServiceList, setSubServiceList] = React.useState([]);
  const serviceId =
    props.route && props.route.params.serviceId
      ? props.route.params.serviceId
      : null;
  // const user= useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(true);
  const [Data, setData] = React.useState();
  const [Images, setImages] = React.useState([]);
  const dispatch = useDispatch();
  const [ActiveServiceData, setActiveServiceData] = React.useState(null);
  const [FixedService, setFixedService] = React.useState(null);
  const vendor = useSelector((state) => state.vendor);
  const [Click, setClick] = React.useState(false);
  const [Title, setTitle] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Category, setCategory] = React.useState();
  const [Bargaining, setBargaining] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const [RelatedServices, setRelatedServices] = React.useState();
  const [UnRelatedServices, setUnRelatedServices] = React.useState();
  const [Gigs, setGigs] = React.useState();
  const [PackageService, setPackageService] = React.useState();
  const [packageData, setPackageData] = React.useState();
  const [selectedPackage, setSelectedPackage] = React.useState();
  const [PackageServiceList, setPackageServiceList] = React.useState();
  const [OpenDetails, setOpenDetails] = React.useState(false);
  const [NameDropDown, setNameDropDown] = React.useState(false);
  const [PositionDropDown, setPositionDropDown] = React.useState(false);
  const childRef = React.useRef();
  const [heightt, setHeight] = React.useState(0);
  const [calenderHeight, setCalenderHeight] = React.useState(0);
  const [opacity, setOpacity] = React.useState(new Animation.Value(0));
  const [SeeMore, setSeeMore] = React.useState(false);
  const [More, setMore] = React.useState(false);
  const scrollRef = React.useRef();
  const [isActionButtonVisible, setIsActionButtonVisible] =
    React.useState(false);
  const scrollY = new Animation.Value(0);
  const diffClamp = Animation.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 500],
    outputRange: [0, 500],
  });
  const [specialtyHeight, setSpecialtyHeight] = React.useState(75);
  const [specialtyAnimation, setSpecialtyAnimation] = React.useState(
    new Animation.Value(specialtyHeight)
  );
  const [aboutHeight, setAboutHeight] = React.useState(120);
  const [aboutAnimation, setAboutAnimation] = React.useState(
    new Animation.Value(aboutHeight)
  );
  const { handleScroll, showButton } = useHandleScroll();
  const [Specialty, setSpecialty] = React.useState(
    "Mobile,Tv,Application,Name,Mobile Number,++++,*****"
  );
  const params = props.route.params;
  const data = params.data;
  const [newNavigation, setNewNavigation] = React.useState(1100);
  const [scrollLayout, setScrollLayout] = React.useState();
  const scroll = React.useRef();
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const [offset, setOffset] = React.useState();
  const [statusBarHeight, setStatusBarHeight] = React.useState(0);
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState();
  const [individualRating, setIndividualRating] = useState();
  const [reviews, setReviews] = useState();
  const [bargaining, setActiveBargaining] = useState(true);
  const [condition, setCondition] = useState(false);
  const [rating, setRating] = useState(0);
  //console.log(SeeMore)
  const newImage = useImage(data.service.wallPhoto);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const snapPoints = useMemo(() => ["90%"], []);
  const [index, setIndex] = useState(-1);
  const sheetRef = useRef(null);
  const handleSheetChange = useCallback((index) => {
    setIndex(index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapTo(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const [like, setLike] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(2000).then(() => setRefreshing(false));
  }, []);
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
    //setLoader(true);
    setScrollEnabled(false);

    if (serviceId && newUser) {
      setActiveServiceData(null);
      setRelatedServices(null);
      setUnRelatedServices(null);
      setFixedService(null);
      setPackageService(null);
      getService(newUser.token, serviceId)
        .then((response) => {
          if (response.data) {
            setLoader(false);
            const gigs = response.data.service.gigs.filter(
              (d) => d.type == "STARTING"
            );
            setData(response.data);
            setSpecialty(response.data.service.keywords);

            setBackgroundImage(response.data.service.wallPhoto);
            setImage(response.data.service.profilePhoto);
            setImages(gigs[0].images);
            setPrice(gigs[0].price);
            setTitle(gigs[0].title);
            setDescription(gigs[0].description);
            //setNewDataList(response.data.service.gigs[0].services.options)
            setFacilities(convertServerFacilities(gigs[0].facilites));
            //console.log(convertServerFacilities(gigs[0].facilites))
            let arr = initialState;
            response.data.service.activeServiceTypes.forEach((doc) => {
              arr = arr.map((d) => {
                if (d.type == doc) {
                  //console.log(doc);
                  return {
                    title: d.title,
                    value: true,
                    type: d.type,
                  };
                } else {
                  return d;
                }
              });
            });
            setCategory(data?.services?.category);
            setActiveServiceData(arr);
            setUserInfo(response.data.service.user);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.warn(error.response.data);
        });
    }
  }, [serviceId + data, Refresh]);
  React.useEffect(() => {
    setActive("Bargaining");
    //setLoader(true);
    if (Data) {
      const gigs = Data.service.gigs.filter((d) => d.type == "STARTING");
      setBackgroundImage(Data.service.wallPhoto);
      setImage(Data.service.profilePhoto);
      setImages(gigs[0].images);
      setPrice(gigs[0].price);
      setTitle(gigs[0].title);
      setDescription(gigs[0].description);
      //setNewDataList(response.data.service.gigs[0].services.options)
      setFacilities(convertServerFacilities(gigs[0].facilites));
      let arr = initialState;
      Data.service.activeServiceTypes.forEach((doc) => {
        arr = arr.map((d) => {
          if (d.type == doc) {
            //console.log(doc);
            return {
              title: d.title,
              value: true,
              type: d.type,
            };
          } else {
            return d;
          }
        });
      });
      setCategory(data?.services?.category);
      setActiveServiceData(arr);
    }
  }, [Bargaining + Data, Refresh]);

  React.useEffect(() => {
    if (newUser && Data) {
      getOtherServices(newUser.token, data.service.id, "ONETIME")
        .then((res) => {
          setFixedService(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          setFixedService([]);
          console.warn(err.response.data);
        });
    }
  }, [Active + data + newUser + serviceId + Data]);
  React.useEffect(() => {
    if (newUser && data) {
      getOtherServices(newUser.token, data.service.id, "PACKAGE")
        .then((res) => {
          setPackageService(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          setPackageService([]);
          console.warn(err.response.data);
        });
    }
  }, [data + newUser + serviceId + Data, Refresh]);
  React.useEffect(() => {
    if (newUser && data) {
      //setLoader(true);
      getRelatedServices(newUser.token, data.service.id, data.service.dashboard)
        .then((response) => {
          if (response.data) {
            setLoader(false);
            setRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response);
          setLoader(false);
        });
      setLoader(true);
      getUnRelatedServices(
        newUser.token,
        data.service.id,
        data.service.dashboard
      )
        .then((response) => {
          if (response.data) {
            setLoader(false);
            //console.log(response.data.gigs[0])
            setUnRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response);
        });
    }
  }, [data + serviceId + Data, Refresh]);
  React.useEffect(() => {
    if (data) {
      getDashboardReviews(newUser.token, data?.service?.id)
        .then((res) => {
          //console.log(res.data)
          setIndividualRating(res.data.aggregate.individualRating);
          setReviews(res.data.reviews);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
    }
  }, [data, Refresh]);

  React.useState(() => {
    if (newUser && data) {
      getFullRating(newUser?.token, data?.service?.id).then((res) => {
        setRating(res?.data?.rating);
      });
    }
  }, [data, newUser]);

  const clickFixed = (doc) => {
    navigation.navigate("FixedService", { data: doc });
  };
  const clickPackage = (doc) => {
    //console.log("ok");
    navigation.navigate("PackageService", { data: doc });
  };

  React.useEffect(() => {
    Animation.timing(specialtyAnimation, {
      duration: 300,
      toValue: specialtyHeight,
      useNativeDriver: false,
    }).start();
  }, [specialtyHeight]);

  const saveList = useSelector((state) => state.saveList);

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
  useEffect(() => {
    //console.log(data)
    let arr = saveList?.filter((d) => d.gig.id == data?.id);
    if (arr?.length > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [saveList?.length, isFocused]);
  useEffect(() => {
    if (!newUser.token) {
      setLike(false);
    }
  }, [newUser, isFocused]);

  const addToSaveList = async () => {
    if (!data) {
      return;
    }

    const res = await setLikeGigs(newUser.token, data.id);
    //console.log(res.data)
    const response = await getLikeGigs(newUser.token);
    //console.log(response.data.gigs)
    dispatch(setSaveList(response.data.gigs));
  };

  if (
    Loader ||
    !Data ||
    !Array.isArray(FixedService) ||
    !Array.isArray(PackageService) ||
    !RelatedServices ||
    !UnRelatedServices
  ) {
    return <ProfileSkeleton />;
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
        refreshControl={
          <RefreshControl
            style={{}}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
        {newUser?.user?.id != Data?.service?.user?.id && (
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 10,
              height: height - (height * 30) / 100,
              justifyContent: "center",
              elevation: 2,
              zIndex: 100,
            }}>
            <Menu
              contentStyle={{
                backgroundColor: primaryColor,
              }}
              visible={Visible}
              onDismiss={() => {
                setVisible(!Visible);
              }}
              anchor={
                <SvgXml
                  onPress={() => {
                    if (!newUser.token) {
                      navigation.navigate("LogIn");
                      return;
                    }
                    setVisible(!Visible);
                    //console.log("sadfa");
                  }}
                  style={{
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowColor: "#DDDDDD",
                    shadowRadius: Platform.OS == "ios" ? 4 : 20,
                    elevation: 0,
                    shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
                    marginLeft: 0,
                  }}
                  xml={threeDot}
                  height={Platform.OS == "ios" ? "50" : "45"}
                  width={Platform.OS == "ios" ? "50" : "45"}
                />
              }>
              <Menu.Item
                onPress={() => {
                  navigation.navigate("Support_1", {
                    serviceId: Data?.service?.id,
                  });
                  setVisible(!Visible);
                }}
                title="Report"
              />
              {/* <Menu.Item onPress={() => {}} title="Copy URL" /> */}
            </Menu>

            <SvgXml
              onPress={() => {
                if (!newUser.token) {
                  navigation.navigate("LogIn");
                  return;
                }
                addToSaveList();
                setLike((v) => !v);
              }}
              style={{
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowColor: "#DDDDDD",
                shadowRadius: Platform.OS == "ios" ? 4 : 20,
                elevation: 5,
                shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
              }}
              xml={like ? loveIconAc : loveIcon}
              height={Platform.OS == "ios" ? "50" : "45"}
              width={Platform.OS == "ios" ? "50" : "45"}
            />
            {/* <SvgXml
              style={{
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowColor: "#DDDDDD",
                shadowRadius: Platform.OS == "ios" ? 4 : 20,
                elevation: 0,
                shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
              }}
              xml={shareIcon}
              height={Platform.OS == "ios" ? "50" : "45"}
              width={Platform.OS == "ios" ? "50" : "45"}
            /> */}

            <SvgXml
              onPress={() => {
                if (newUser && !newUser.token) {
                  navigation.navigate("LogIn");
                  return;
                }
                navigation.navigate("CreateAppointment", { data: Data });
                //navigation.navigate("AppointmentList", { data: Data });
              }}
              style={{
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowColor: "#DDDDDD",
                shadowRadius: Platform.OS == "ios" ? 4 : 20,
                elevation: 0,
                shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
              }}
              xml={newCalender}
              height={Platform.OS == "ios" ? "50" : "45"}
              width={Platform.OS == "ios" ? "50" : "45"}
            />
            <SvgXml
              onPress={() => {
                if (newUser && !newUser.token) {
                  navigation.navigate("LogIn");
                  return;
                }
                if (!userInfo) {
                  Alert.alert("Invalid user!");
                  return;
                }
                if (newUser.user.id == userInfo.id) {
                  Alert.alert("Ops!", "Self messaging is not allowed.");
                  return;
                }
                let user = {
                  userId: userInfo.id,
                  user: userInfo,
                };
                navigation.navigate("ChatScreen", {
                  data: {
                    users: [user],
                    service: Data?.service,
                    serviceId: Data?.service?.id,
                  },
                  username: userInfo.username,
                  serviceId: data?.service?.id,
                });
              }}
              style={{
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowColor: Platform.OS == "ios" ? "#DDDDDD" : "#000000",
                shadowRadius: Platform.OS == "ios" ? 4 : 30,
                elevation: 0,
                shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
              }}
              xml={messageIcon}
              height={Platform.OS == "ios" ? "50" : "45"}
              width={Platform.OS == "ios" ? "50" : "45"}
            />
          </View>
        )}

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
                  marginTop: 15,
                  flex: 3,
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                },
              ]}>
              {data
                ? data.service.serviceCenterName
                : "Easin Arafat It Consulting Center"}
            </Text>
            <View style={{ flex: 0.5 }} />
            <View
              style={{
                paddingTop: 20,
                alignItems: "center",
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <SvgXml
                  xml={newStar}
                  height={Platform.OS == "ios" ? "21" : "19"}
                  width={Platform.OS == "ios" ? "21" : "19"}
                />
                <Text
                  style={{
                    fontSize: Platform.OS == "ios" ? 20 : 18,
                    fontFamily: "Poppins-Bold",
                    color: "#FFC107",
                    marginLeft: 5,
                  }}>
                  {rating.toFixed(1)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 12 : 11,
                  fontFamily: "Poppins-Medium",
                  marginTop: Platform.OS == "ios" ? 5 : 0,
                }}>
                Profile Views {Data ? Data.service.views : "00"}
              </Text>
            </View>
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
              style={{
                width: 40,
                height: 40,
                borderWidth: Data && Data.service.profilePhoto ? 0 : 0.5,
              }}
              source={{ uri: Data ? Data.service.profilePhoto : null }}
            />
            <View
              style={{
                flex: 3,
              }}>
              <Tooltip
                enterTouchDelay={10}
                title={
                  Data
                    ? `${Data.service.providerInfo.title} ${
                        Data.service.providerInfo.name
                      } (${Data.service.providerInfo.gender.toUpperCase()})`
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
                    {Data
                      ? `${
                          Data.service.providerInfo.name
                        } (${Data.service.providerInfo.gender.toUpperCase()})`
                      : null}
                  </Text>
                </View>
              </Tooltip>
            </View>
            <View
              style={{
                flex: 2,
              }}>
              <Tooltip
                enterTouchDelay={10}
                title={Data ? Data.service.providerInfo.position : ""}>
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
                    {Data ? Data.service.providerInfo.position : ""}
                  </Text>
                </View>
              </Tooltip>
            </View>
          </Animation.View>
          <View
            style={{
              paddingHorizontal: 20,
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
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 22 : 20.5,
                fontFamily: "Poppins-SemiBold",
                marginTop: 15,
                marginBottom: 10,
              }}>
              About
            </Text>

            <AnimatedHeight
              id={Data.service.id == "W8kHHhBuKG4jkXPNJ32Mw" ? true : false}
              text={Data.service.about}
            />
          </View>
          <Pressable
            onPress={() => {
              if (calenderHeight == 0) {
                setCalenderHeight(125);
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
              ...Company Calender, Notice & Team
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
                navigation.navigate("Company Calender", {
                  workingTime: Data?.service?.workingTime,
                  t47: Data?.service?.t47,
                });
              }}
              Icon={() => <SvgXml xml={calenderIcon} height="22" width="22" />}
              title="Company Calender"
            />
            <ProfileOption
              onPress={() => {
                navigation.navigate("UserNotice", {
                  serviceId: Data.service.id,
                });
              }}
              style={{
                marginBottom: 0,
              }}
              Icon={() => <SvgXml xml={noticeIcon} height="22" width="22" />}
              title="Notice"
            />
            <BarOption
              icon={user}
              title={`Worker and Team (${Data?.service.worker} member)`}
            />
          </View>
        </MotiView>

        <View style={{ height: 2, backgroundColor: "#FAFAFA" }} />

        <View
          transition={{ type: "timing" }}
          animate={{
            height:
              newUser?.user?.id == Data?.service?.user?.id
                ? newNavigation - 40
                : newNavigation,
          }}
          style={[
            {
              overflow: "hidden",
              height:
                newUser?.user?.id == Data?.service?.user?.id
                  ? newNavigation - 40
                  : newNavigation,
            },
          ]}>
          <Tab.Navigator
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
                width: 120,
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
                tabBarLabel: ({ focused, color, size }) => {
                  //setActiveBargaining(focused);
                  //console.log(focused)
                  return (
                    <Text
                      style={{
                        color: focused ? "#4ADE80" : "black",
                        fontFamily: "Poppins-SemiBold",
                        fontSize: Platform.OS == "ios" ? 16.5 : 15,
                      }}>
                      {initialState[0].title}
                    </Text>
                  );
                },
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
                setActiveBargaining: setActiveBargaining,
                onOpen: () => {
                  if (newUser && newUser.token) {
                    setIndex(0);
                  } else {
                    navigation.navigate("LogIn");
                  }
                },
              }}
              component={BargainingScreen}
            />
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused, color, size }) => (
                  <Text
                    style={{
                      color: focused ? "#4ADE80" : "black",
                      fontFamily: "Poppins-SemiBold",
                      fontSize: Platform.OS == "ios" ? 18 : 17,
                    }}>
                    {initialState[1].title}
                  </Text>
                ),
              }}
              name={initialState[1].title}
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
                onPress: clickFixed,
                FixedService: FixedService,
                setNewNavigation: setNewNavigation,
                RelatedServices: RelatedServices,
                UnRelatedServices: UnRelatedServices,
                scrollTo: scrollTo,
              }}
              component={FixedScreen}
            />
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused, color, size }) => (
                  <Text
                    style={{
                      color: focused ? "#4ADE80" : "black",
                      fontFamily: "Poppins-SemiBold",
                      fontSize: Platform.OS == "ios" ? 18 : 17,
                    }}>
                    {initialState[2].title}
                  </Text>
                ),
              }}
              name={initialState[2].title}
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
                onPress: clickPackage,
                PackageService: PackageService,
                setNewNavigation: setNewNavigation,
                RelatedServices: RelatedServices,
                UnRelatedServices: UnRelatedServices,
                scrollTo: scrollTo,
              }}
              component={PackageScreen}
            />
          </Tab.Navigator>
        </View>
        {bargaining && (
          <>
            <View
              style={{
                backgroundColor: primaryColor,
                marginTop: 0,
                paddingVertical: 25,
                paddingTop: 25,
              }}>
              <RatingView
                style={{
                  marginHorizontal: 20,
                }}
                title="Seller Communication"
                rate={individualRating?.communicationRating}
              />
              <RatingView
                style={{
                  marginHorizontal: 20,
                  marginTop: 5,
                }}
                title="Service As Describe"
                rate={individualRating?.describeRating}
              />
              <RatingView
                style={{
                  marginHorizontal: 20,
                  marginTop: 5,
                }}
                title="Service Quality"
                rate={individualRating?.qualityRating}
              />
            </View>
            <ReviewCart
              individualRating={individualRating}
              data={reviews}
              navigation={navigation}
              service={data}
            />
            <View
              style={{
                backgroundColor: primaryColor,
                marginTop: 0,
              }}>
              {RelatedServices.length > 0 && (
                <View>
                  <Text
                    style={{
                      fontSize: Platform.OS == "ios" ? 22 : 20.5,
                      fontFamily: "Poppins-SemiBold",
                      color: textColor,
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                    }}>
                    Related Service
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ width: 10 }} />
                    {RelatedServices.map((doc, i) => (
                      <TopSellerCard
                        style={{}}
                        onPress={() => {
                          navigation.navigate("OtherProfile", {
                            serviceId: doc ? doc.service.id : null,
                            data: doc,
                          });
                        }}
                        key={i}
                        data={doc}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {UnRelatedServices.length > 0 && (
                <View>
                  <Text
                    style={{
                      fontSize: Platform.OS == "ios" ? 22 : 20.5,
                      fontFamily: "Poppins-SemiBold",
                      color: textColor,
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                    }}>
                    You Might Also Like
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ width: 10 }} />
                    {UnRelatedServices.map((doc, i) => (
                      // <RelatedService
                      //   data={doc}
                      //   key={i}
                      //   navigation={navigation}
                      // />
                      <TopSellerCard
                        style={{}}
                        onPress={() => {
                          navigation.navigate("OtherProfile", {
                            serviceId: doc ? doc.service.id : null,
                            data: doc,
                          });
                        }}
                        key={i}
                        data={doc}
                      />
                    ))}
                    <View style={{ width: 10 }} />
                  </ScrollView>
                </View>
              )}
            </View>
            <View style={{ height: 90 }} />
          </>
        )}
      </ScrollView>
      {showButton && (
        <Animated.View
          entering={FadeIn}
          style={{
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowColor: "#707070",
            shadowRadius: 3,
            elevation: 0,
            shadowOpacity: 0.3,
            position: "absolute",
            right: 20,
            bottom: 20,
            backgroundColor: "#4ADE80",
            borderRadius: 25,
          }}>
          <Pressable
            onPress={() => {
              if (!newUser.token || !userInfo) {
                navigation.navigate("LogIn");
                return;
              }
              if (newUser.user.id == userInfo.id) {
                Alert.alert("Ops!", "Self messaging is not allowed.");
                return;
              }

              let user = {
                userId: userInfo.id,
                user: userInfo,
              };
              navigation.navigate("ChatScreen", {
                data: {
                  users: [user],
                  service: Data?.service,
                  serviceId: Data?.service?.id,
                },
                username: userInfo.username,
                serviceId: data?.service?.id,
              });
            }}>
            <SvgXml xml={messageIcon} height="50" width={"50"} />
          </Pressable>
        </Animated.View>
      )}

      <FixedBackHeader
        style={{
          marginTop: -15,
        }}
        navigation={navigation}
        Yoffset={offset ? offset : 0}
      />
    </View>
  );
};

export default OtherProfile;
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
  contentContainer: {
    backgroundColor: "white",
  },
});

const BarOption = ({ icon, title }) => {
  const [lines, setLines] = React.useState(1);
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  );
};
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
const BargainingScreen = ({ navigation, route }) => {
  const params = route.params;
  const Images = params.Images;
  const primaryColor = params.primaryColor;
  const textColor = params.textColor;
  const Title = params.Title;
  const [NewLines, setNewLines] = React.useState(3);
  const Description = params.Description;
  const ServiceList = params.ServiceList;
  const sub = params.SubServiceList;
  const [SubServiceList, setSubServiceList] = React.useState(sub);
  const NewDataList = params.NewDataList;
  const [ActiveService, setActiveService] = React.useState(
    ServiceList ? ServiceList[0] : NewDataList[0].mainTitle
  );

  const Facilities = params.Facilities;
  const Data = params.Data;
  const Price = params.Price;
  const startingHeight = 120;
  const fullHeight = calculateHeight(Description, 25);
  const setNewNavigation = params.setNewNavigation;
  const setActiveBargaining = params.setActiveBargaining;
  const isFocused = useIsFocused();
  const animatedHeight = React.useRef(
    new Animation.Value(startingHeight)
  ).current;
  const [newHeight, setHeight] = React.useState(3);
  const [text, setText] = React.useState("");
  const [navHeight, setNavHeight] = React.useState(0);
  const RelatedServices = params.RelatedServices;
  const UnRelatedServices = params.UnRelatedServices;
  const [textHeight, setTextHeight] = React.useState(0);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [ServiceTableHeight, setServiceTableHeight] = React.useState(0);
  const scrollTo = params.scrollTo;
  const newUser = useSelector((state) => state.user);
  const gigs = Data.service.gigs.filter((d) => d.type == "STARTING");
  //console.log(Data);

  React.useEffect(() => {
    if (ServiceList && ServiceList.length > 0) {
      setActiveService(ServiceList[0]);
      return;
    }
    if (Array.isArray(NewDataList)) {
      setActiveService(NewDataList[0].mainTitle);
      return;
    }
  }, [NewDataList + ServiceList]);
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
  React.useEffect(() => {
    if (isFocused) {
      setActiveBargaining(true);
    } else {
      setActiveBargaining(false);
    }
  }, [isFocused]);
  //console.log(newHeight);
  React.useEffect(() => {
    if (navHeight && isFocused) {
      //console.log(textHeight)
      setTimeout(() => {
        setNewNavigation(navHeight + textHeight + 20);
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
            marginVertical: 15,
          }}>
          <AnimatedHeight
            onChange={(height) => {
              //setNewNavigation(newHeight + 55 + height);
              //console.log(height)
              setTextHeight(height - 50);
            }}
            button={true}
            text={Description}
          />
        </View>
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
        skills={gigs[0].skills}
        serviceCategory={{ name: Data?.service?.category }}
        facilities={Facilities}
      />
      <View
        style={{
          backgroundColor: primaryColor,

          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 25,
        }}>
        <Text
          style={{
            fontSize: Platform.OS == "ios" ? 17 : 15.5,
            color: textColor,

            fontFamily: "Poppins-SemiBold",
          }}>
          From {Price} ৳
        </Text>
      </View>
      <View style={{ backgroundColor: primaryColor }}>
        {newUser?.user?.id != Data?.service?.user?.id && (
          <IconButton
            onPress={() => {
              //params?.onOpen();
              navigation.navigate("ServiceOrder", {
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
        )}
      </View>
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
const loveIconAc = `<svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_6086_40919)">
<path d="M13.415 3.1481C15.1389 2.82166 16.9219 3.04992 18.508 3.8001C20.1741 4.59864 21.5641 5.87613 22.5 7.4691C23.6045 5.57873 25.349 4.14602 27.418 3.4301C29.2529 2.81868 31.2435 2.86643 33.047 3.5651C34.9104 4.30209 36.4794 5.63182 37.512 7.3491C38.413 8.84263 38.9247 10.5385 39 12.2811V12.8701C38.8631 15.058 38.1439 17.1695 36.917 18.9861C35.4738 21.1689 33.7501 23.1525 31.79 24.8861C30.1346 26.3848 28.389 27.7808 26.563 29.0661C25.406 29.8791 24.231 30.6661 23.016 31.3901C22.8677 31.4822 22.6974 31.5327 22.5229 31.5364C22.3484 31.5401 22.1761 31.4968 22.024 31.4111C21.109 30.8761 20.224 30.2961 19.343 29.7111C16.3233 27.7041 13.5291 25.3769 11.009 22.7701C9.84309 21.5479 8.80442 20.2104 7.909 18.7781C6.78634 17.0483 6.12882 15.0582 6 13.0001V12.5861C6.03195 10.1306 6.94468 7.76822 8.572 5.9291C9.83614 4.49419 11.5385 3.51664 13.415 3.1481Z" fill="#DA1E37"/>
</g>
<defs>
<filter id="filter0_d_6086_40919" x="0" y="0.00317383" width="45" height="40.5334" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="3"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6086_40919"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6086_40919" result="shape"/>
</filter>
</defs>
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
const FixedScreen = ({ navigation, route }) => {
  const params = route.params;
  const FixedService = params.FixedService;
  const onPress = params.onPress;
  const setNewNavigation = params.setNewNavigation;
  const isFocused = useIsFocused();
  const [viewHeight, setViewHeight] = React.useState();
  const RelatedServices = params.RelatedServices;
  const UnRelatedServices = params.UnRelatedServices;
  const [content, setContent] = React.useState(2);
  const [layoutHeight, setLayoutHeight] = React.useState();
  const [offset, setOffset] = React.useState(0);
  const scrollTo = params.scrollTo;
  const data = params.Data;
  const snapPoints = useMemo(() => ["90%"], []);
  const [index, setIndex] = useState(-1);
  const [Active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (layoutHeight && isFocused) {
      //console.log(layoutHeight);
      setNewNavigation(layoutHeight + 50);
      //setNewNavigation(layoutHeight + 70);
      setTimeout(() => {
        //setNewNavigation(layoutHeight + 140);
      }, 50);
    }
  }, [isFocused + layoutHeight]);
  React.useEffect(() => {
    if (data) {
      data.service.activeServiceTypes.map((doc, i) => {
        if (doc === "ONETIME") {
          setActive(true);
        } else {
          //setActive(false)
        }
      });
    }
  }, [data + isFocused]);
  const handleSheetChange = useCallback((index) => {
    setIndex(index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapTo(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  //console.log(FixedService?.length);
  return (
    <View
      onLayout={(e) => {
        setLayoutHeight(e.nativeEvent.layout.height);
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
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginHorizontal: 10,
          marginVertical: 20,
        }}>
        {Active &&
          FixedService.map(
            (doc, i) =>
              i < content && (
                <ServiceCart onPress={() => onPress(doc)} key={i} data={doc} />
              )
          )}
        {Active && FixedService.length > content && (
          <View
            style={{
              justifyContent: "center",
              marginVertical: 15,
              alignItems: "center",
              width: "100%",
            }}>
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
        {!Active && FixedService.length > 0 && (
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
        {FixedService.length == 0 && (
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
        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}>
          {RelatedServices.length > 2 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}>
                Related Service
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                {RelatedServices.map((doc, i) =>
                  i < 6 ? (
                    <TopSellerCard
                      style={{
                        width: width / 2 - 22,
                        height: 260,
                      }}
                      onPress={() => {
                        navigation.navigate("OtherProfile", {
                          serviceId: doc ? doc.service.id : null,
                          data: doc,
                        });
                      }}
                      key={i}
                      data={doc}
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
                }}>
                You Might Also Like
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                {UnRelatedServices.map((doc, i) =>
                  i < 50 ? (
                    <TopSellerCard
                      style={{
                        width: width / 2 - 22,
                        height: 260,
                      }}
                      onPress={() => {
                        navigation.navigate("OtherProfile", {
                          serviceId: doc ? doc.service.id : null,
                          data: doc,
                        });
                      }}
                      key={i}
                      data={doc}
                    />
                  ) : null
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 70 }} />
    </View>
  );
};
const PackageScreen = ({ navigation, route }) => {
  const params = route.params;
  const PackageService = params.PackageService;
  const onPress = route.params.onPress;
  const RelatedServices = params.RelatedServices;
  const UnRelatedServices = params.UnRelatedServices;
  const [content, setContent] = React.useState(2);
  const [layoutHeight, setLayoutHeight] = React.useState();
  const isFocused = useIsFocused();
  const setNewNavigation = params.setNewNavigation;
  const scrollTo = params.scrollTo;
  const [offset, setOffset] = React.useState(0);
  const data = params.Data;
  const snapPoints = useMemo(() => ["90%"], []);
  const [index, setIndex] = useState(-1);
  const [Active, setActive] = React.useState(false);
  const handleSheetChange = useCallback((index) => {
    setIndex(index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapTo(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  React.useEffect(() => {
    if (layoutHeight && isFocused) {
      //console.log(layoutHeight);
      setNewNavigation(layoutHeight + 50);
    }
  }, [layoutHeight + isFocused]);
  //console.log(FixedService)
  React.useEffect(() => {
    if (data) {
      data.service.activeServiceTypes.map((doc, i) => {
        if (doc === "PACKAGE") {
          setActive(true);
        } else {
          //setActive(false)
        }
      });
    }
  }, [data + isFocused]);
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
        {Active &&
          PackageService.map(
            (doc, i) =>
              i < content && (
                <ServiceCart
                  onPress={() => {
                    if (onPress) {
                      onPress(doc);
                    }
                  }}
                  key={i}
                  data={doc}
                />
              )
          )}
        {Active && PackageService.length > content && (
          <View
            style={{
              justifyContent: "center",
              marginVertical: 15,
              alignItems: "center",
              width: "100%",
            }}>
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
        {PackageService.length == 0 && (
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
        {PackageService.length > 0 && !Active && (
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
        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}>
          {RelatedServices.length > 2 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}>
                Related Service
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                {RelatedServices.map((doc, i) =>
                  i < 6 ? (
                    <TopSellerCard
                      style={{
                        width: width / 2 - 22,
                        height: 260,
                      }}
                      onPress={() => {
                        navigation.navigate("OtherProfile", {
                          serviceId: doc ? doc.service.id : null,
                          data: doc,
                        });
                      }}
                      key={i}
                      data={doc}
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
                }}>
                You Might Also Like
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                {UnRelatedServices.map((doc, i) =>
                  i < 50 ? (
                    <TopSellerCard
                      style={{
                        width: width / 2 - 22,
                        height: 260,
                      }}
                      onPress={() => {
                        navigation.navigate("OtherProfile", {
                          serviceId: doc ? doc.service.id : null,
                          data: doc,
                        });
                      }}
                      key={i}
                      data={doc}
                    />
                  ) : null
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 70 }} />
    </View>
  );
};
const calculateHeight = (text, plus, minus) => {
  let textLength = text.split("").length;
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

const refreshIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14.646" height="12.902" viewBox="0 0 14.646 12.902">
<g id="_000000ff" data-name="#000000ff" transform="translate(-6.437 -13.36)">
  <path id="Path_20932" data-name="Path 20932" d="M7.3,16.648A6.652,6.652,0,0,1,12,13.435a6.386,6.386,0,0,1,4.863,1.255A6.488,6.488,0,0,1,19.4,19.44a6.819,6.819,0,0,1-.251,2.145,5.047,5.047,0,0,1,1.385-.372.691.691,0,0,1,.219,1.262c-.91.363-1.858.638-2.789.947a.672.672,0,0,1-.862-.43c-.329-.936-.676-1.868-.974-2.814a.688.688,0,0,1,1.185-.581,11.864,11.864,0,0,1,.537,1.431,5.132,5.132,0,0,0-3.427-6.068,5.005,5.005,0,0,0-3.255.068,5.167,5.167,0,0,0-3.194,3.459,5.033,5.033,0,0,0,.641,4.083,5.243,5.243,0,0,0,4.394,2.364c.7.033.752,1.186.08,1.318a6.477,6.477,0,0,1-6.378-4.575A6.315,6.315,0,0,1,7.3,16.648Z" transform="translate(0)" fill="#4ade80"/>
</g>
</svg>
`;
