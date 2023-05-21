import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
  Alert,
  Pressable,
  Animated as Animation,
  Platform,
  Easing,
  StatusBar as Bar,
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
import { AntDesign } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Button from "./../components/Button";
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
} from "../Class/service";
import { useSelector, useDispatch } from "react-redux";
import { serverToLocal } from "../Class/dataConverter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import useHandleScroll from "../components/constants/FabView";
import Carousel from "react-native-reanimated-carousel";
import AnimatedHeight from "../Hooks/AnimatedHeight";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import FixedBackHeader from "./Seller/components/FixedBackHeader";

const { width, height } = Dimensions.get("window");
const InstallmentService = (props) => {
  const newUser = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
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
  const vendor = useSelector((state) => state.vendor);
  const [Click, setClick] = React.useState(false);
  const [Title, setTitle] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Category, setCategory] = React.useState();
  const [Refresh, setRefresh] = React.useState(false);
  const [RelatedServices, setRelatedServices] = React.useState();
  const [UnRelatedServices, setUnRelatedServices] = React.useState();
  const [Gigs, setGigs] = React.useState();
  const scrollRef = React.useRef();
  const [isActionButtonVisible, setIsActionButtonVisible] =
    React.useState(false);
  const scrollY = new Animation.Value(0);
  const diffClamp = Animation.diffClamp(scrollY, 0, 250);
  const translateY = diffClamp.interpolate({
    inputRange: [200, 250],
    outputRange: [0, 1],
  });

  const { handleScroll, showButton } = useHandleScroll();
  const [Specialty, setSpecialty] = React.useState(
    "Mobile,Tv,Application,Name,Mobile Number,++++,*****"
  );
  const params = props.route.params;
  const data = params.data;
  const [newNavigation, setNewNavigation] = React.useState(200);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [ServiceTableHeight, setServiceTableHeight] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState(false);
  const [subsData, setSubsData] = React.useState();
  const isFocused=useIsFocused()
  const [selectedPackage,setSelectedPackage]=React.useState()
  const [services,setServices]=React.useState()
  const [InstallmentData,setInstallmentData]=useState()

  React.useEffect(()=>{
    if(isFocused){
      dispatch(setHideBottomBar(true))
    }else{
      dispatch(setHideBottomBar(false))
    }
  },[isFocused])

  //console.log(SeeMore)
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    setScrollEnabled(false);
    setActiveServiceData(null);
    setSubsData(data.subsData);
    if (data) {
      setData(data);
      setSpecialty(data.service.speciality);
      setBackgroundImage(data.service.wallPhoto);
      setImage(data.service.profilePhoto);
      let img = [];
      // img.push(newImage1)
      // img.push(newImage2)
      // img.push(newImage3)
      // img.push(newImage4)
      //console.log(data.images)
      //console.log(data)
      setImages(data.images);
      //console.log(data.subsData)
      setPrice(data.installmentData.totalAmount);
      setInstallmentData(data.installmentData)
      //console.log(data.installmentData)
      //setSubsData(data.subsData)
      setTitle(data.title);
      //console.log(data.subsData)
      setDescription(data.description);
      //setNewDataList(response.data.service.gigs[0].services.options)
      setFacilities(data.facilites.selectedOptions);
      let arr = initialState;
      data.service.activeServiceTypes.forEach((doc) => {
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
      setCategory(data.service.category);
      setActiveServiceData(arr);
      try {
        if (data.services.category) {
          dispatch({
            type: "SET_NEW_LIST_DATA",
            playload: serverToLocal(
              data.services.options,
              data.services.category
            ),
          });
          setNewDataList(
            serverToLocal(data.services.options, data.services.category)
          );
        } else {
          dispatch({
            type: "SET_NEW_LIST_DATA",
            playload: serverToLocal(data.services, data.service.category),
          });
          setNewDataList(serverToLocal(data.services, data.service.category));
        }
      } catch (e) {
        console.warn(e.message);
      }
    }
  }, [data]);

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
  }, [ActiveService + Click + Refresh]);

  React.useEffect(() => {
    if (newUser && Data) {
      setLoader(true);
      getRelatedServices(newUser.token, Data.service.id, Data.service.dashboard)
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
        Data.service.id,
        Data.service.dashboard
      )
        .then((response) => {
          if (response.data) {
            setLoader(false);
            setUnRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response);
        });
    }
  }, [Data]);

  React.useEffect(() => {
    console.log(scrollEnabled);
  }, [scrollEnabled]);

  if (
    Loader ||
    !Data ||
    !RelatedServices ||
    !UnRelatedServices ||
    !NewDataList 
  ) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={{ flex: 1, backgroundColor: primaryColor }}>
      {/* {Platform.OS == "ios" && scrollEnabled && (
       <View style={{height:25}}/>
      )} */}
      <StatusBar
        hidden={false}
        backgroundColor={scrollEnabled ? primaryColor : "transparent"}
      />

      <ScrollView
        scrollEventThrottle={16}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "transparent",
          flex: 1,
        }}
        onScroll={(e) => {
          handleScroll(e);
          const currentOffset = e.nativeEvent.contentOffset.y;
          const dif = currentOffset - (offset || 0);

          if (Math.abs(dif) < 3) {
            //setScrollEnabled(false);
          } else if (dif < 0) {
            //setScrollDirection(true);
            //console.log("up")
            // if (currentOffset < 380) {
            //   setScrollEnabled(false);
            // }
          } else {
            //setScrollDirection(false);
            //console.log("down")
          }
          if (currentOffset > 200) {
            //console.log("white");
            setScrollEnabled(true);
          } else {
            //console.log("transparent");
            setScrollEnabled(false);
          }

          scrollY.setValue(e.nativeEvent.contentOffset.y);
          setOffset(currentOffset);
        }}
      >
        <Carousel
          style={{
            backgroundColor: "black",
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          width={width}
          height={height - (height * 30) / 100}
          autoPlay={false}
          data={Images}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => {
            setImageIndex(index);
          }}
          renderItem={({ index }) => (
            // <Canvas style={{ width: width, height: 400 }}>
            //   <Fill color={primaryColor} />
            //   <Box
            //     box={rrect(rect(0, 0, width - 3, 390), 5, 5)}
            //     color={primaryColor}
            //   >
            //     <BoxShadow
            //       dx={30}
            //       dy={30}
            //       blur={20}
            //       color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
            //       inner
            //     />
            //     <BoxShadow
            //       dx={-10}
            //       dy={-10}
            //       blur={20}
            //       color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
            //       inner
            //     />
            //     <BoxShadow
            //       dx={5}
            //       dy={5}
            //       blur={20}
            //       color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
            //     />
            //     <BoxShadow
            //       dx={-20}
            //       dy={-20}
            //       blur={20}
            //       color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
            //     />
            //   </Box>

            // </Canvas>
            <Image
              source={{ uri: Images[index] }}
              fit="cover"
              x={0}
              y={0}
              width={width}
              height={height - (height * 30) / 100}
              style={{
                width: width,
                height: height - (height * 30) / 100,
                opacity: 0.87,
                backgroundColor: "black",
              }}
            />
          )}
        />
       
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            right: 20,
            backgroundColor: "#707070",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 20,
            top: height - ((height * 30) / 100 + 70),
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 14,
              color: primaryColor,
            }}
          >
            {imageIndex + 1} Of 4
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            height: height - (height * 30) / 100,
            justifyContent: "center",
            elevation: 2,
            zIndex: 100,
          }}
        >
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
            }
          >
            <Menu.Item
              onPress={() => {
                navigation.navigate("Support_1");
                setVisible(!Visible);
              }}
              title="Report"
            />
            <Menu.Item onPress={() => {}} title="Copy URL" />
          </Menu>

          <SvgXml
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
            xml={loveIcon}
            height={Platform.OS == "ios" ? "50" : "45"}
            width={Platform.OS == "ios" ? "50" : "45"}
          />
          <SvgXml
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
          />

          {/* <SvgXml
            onPress={() => {
              navigation.navigate("Message", { data: Data });
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
          /> */}
        </View>

        <View
          style={{
            backgroundColor: primaryColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -30,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 0,
              backgroundColor: primaryColor,
            }}
          >
            <Text
              style={{
                color: "#BEBBBB",
                fontSize: 16,
                fontFamily: "Poppins-SemiBold",
                marginTop: 20,
              }}
            >
              #Installment Service
            </Text>
            <View style={{ flex: 0.5 }} />
          </View>
          <View style={{ backgroundColor: primaryColor, marginBottom: -1 }}>
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 22 : 20.5,
                fontFamily: "Poppins-SemiBold",
                color: textColor,
                paddingHorizontal: 20,
                marginTop: 15,
              }}
            >
              {Title}
            </Text>

            <View
              style={{
                marginHorizontal: 20,
                paddingTop: 15,
              }}
            >
              <AnimatedHeight
                onChange={(height) => {
                  //setNewNavigation(newHeight + 55 + height);
                  //console.log(height)
                  //setTextHeight(height);
                }}
                button={true}
                text={Description}
              />
            </View>
            
          </View>
          <View style={{ height: 2, backgroundColor: "#FAFAFA" }} />
          
          <View style={{ height: 2, backgroundColor: "#FAFAFA" }} />
          <View
            style={{
              backgroundColor: primaryColor,
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: Platform.OS == "ios" ? 22 : 20.5,
                marginBottom: 20,
                marginTop: 0,
                color: "#535353",
              }}
            >
              Service List
            </Text>

            <View
              style={{
                backgroundColor: primaryColor,
                overflowY: "hidden",
                overflow: "hidden",

                height: ServiceTableHeight != 0 ? ServiceTableHeight : "auto",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  onLayout={(e) => {
                    setServiceTableHeight(e.nativeEvent.layout.height);
                  }}
                  style={{
                    flex: 1.2,
                    maxHeight: 182,
                  }}
                >
                  {Array.isArray(ServiceList) && ServiceList.length > 0 ? (
                    ServiceList.map((item, i) => (
                      <Button
                        onPress={() => {
                          setActiveService(item);
                        }}
                        key={i}
                        style={
                          ActiveService == item
                            ? styles.activeButton
                            : styles.inactiveButton
                        }
                        title={item}
                      />
                    ))
                  ) : (
                    <Button
                      onPress={() => {
                        setActiveService(NewDataList[0].mainTitle);
                      }}
                      style={
                        NewDataList.length > 0 &&
                        NewDataList[0].mainTitle == ActiveService
                          ? styles.activeButton
                          : styles.inactiveButton
                      }
                      title={NewDataList.length > 0 && NewDataList[0].mainTitle}
                    />
                  )}
                  {Facilities&&Facilities.length!=0&&(
                    <Button
                    onPress={() => {
                      setActiveService("Extra Facilities");
                    }}
                    style={
                      ActiveService == "Extra Facilities"
                        ? styles.activeButton
                        : styles.inactiveButton
                    }
                    title={"Extra Facilities"}
                  />
                  )}
                </View>
                <View
                  style={{
                    width: 1,
                    backgroundColor: "#FFF3F3",
                    marginLeft: 20,
                    marginRight: 30,
                  }}
                />
                <View
                  style={{
                    flex: 2,
                    marginRight: 0,
                    maxHeight: ServiceTableHeight,
                  }}
                >
                  {Array.isArray(SubServiceList) &&
                  SubServiceList.length > 0 ? (
                    SubServiceList.map((item, i) => (
                      <ServiceTable
                        key={i}
                        item={item}
                        i={i}
                        name={ActiveService}
                        NewDataList={NewDataList}
                        height={ServiceTableHeight}
                      />
                    ))
                  ) : ActiveService != "Extra Facilities" ? (
                    <ServiceTable
                      height={ServiceTableHeight}
                      NewDataList={NewDataList}
                      name={ActiveService}
                    />
                  ) : (
                    <></>
                  )}
                  {ActiveService == "Extra Facilities" && (
                    <View>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: Platform.OS == "ios" ? 16.5 : 15,
                          fontFamily: "Poppins-SemiBold",
                          color: "#95979D",
                          
                        }}
                      >
                        Extra Facilities
                      </Text>
                      {Array.isArray(Facilities) &&
                        Facilities.map((doc, i) =>
                          ServiceTableHeight - 30 > (i + 1) * 25 ? (
                            <Text
                              numberOfLines={1}
                              onLayout={(e) => {
                                //console.log(e.nativeEvent.layout.height);
                              }}
                              style={{
                                fontSize: Platform.OS == "ios" ? 16.5 : 15,
                                fontFamily: "Poppins-Medium",

                                color: textColor,
                              }}
                              key={i + 1}
                            >
                              {doc.title}
                            </Text>
                          ) : null
                        )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: primaryColor,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginVertical: 25,
              marginBottom:0
            }}
          >
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 15 : 14,
                color: "black",
                fontFamily: "Poppins-Medium",
              }}
            >
              {InstallmentData?.installmentType} {(Price/InstallmentData.installmentCount).toFixed(2)} ৳
            </Text>
            <TouchableOpacity
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
              }}
            >
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 16.5 : 15,
                  fontFamily: "Poppins-SemiBold",
                  color: "#707070",
                  marginRight: 0,
                }}
              >
                Show All
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#707070"
              />
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            paddingHorizontal:20,
            marginBottom:25,
            marginTop:5
          }}>
            {/* <Text style={{
                fontSize:Platform.OS == "ios" ? 15 : 14
            }}>Duration ({data.subsData.payAsYouGo?"Pay As Go":data.subsData.totalDuration+" "+`${data.subsData.subscriptionType=="Monthly"?"Month":data.subsData.subscriptionType=="Yearly"?"Year":"Week"}`})</Text> */}
            {InstallmentData&&InstallmentData.advancedPaymentAmount&&(
                <Text style={{
                    fontSize:Platform.OS == "ios" ? 15 : 14,
                }}>Advanced Payment {InstallmentData?.advancedPaymentAmount}৳</Text>
            )}
          </View>
          <View style={{ backgroundColor: primaryColor }}>
            <IconButton
              onPress={() => {
                navigation.navigate("OfferNow", {
                  type: "INSTALLMENT",
                  gigs: data,
                  data:data,
                  selectedPackage:null,
                  services:null,
                  category:Category
                });
              }}
              style={{
                borderRadius: 5,
                marginHorizontal: 20,
                backgroundColor: "#4ADE80",
                borderWidth: 0,
                marginVertical: 0,
                color: textColor,
                marginTop: 0,
                height: 35,
              }}
              title={`Continue`}
            />
          </View>
        </View>

        <View style={{ height: 2, backgroundColor: "#FAFAFA" }} />
        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 15,
          }}
        >
          {RelatedServices.length > 4 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                }}
              >
                Related Service
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ width: 10 }} />
                {RelatedServices.map((doc, i) => (
                  <RelatedService data={doc} key={i} navigation={navigation} />
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
                }}
              >
                You Might Also Like
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ width: 10 }} />
                {UnRelatedServices.map((doc, i) => (
                  <RelatedService data={doc} key={i} navigation={navigation} />
                ))}
                <View style={{ width: 10 }} />
              </ScrollView>
            </View>
          )}
        </View>

        <View style={{ height: 70 }} />
      </ScrollView>
      {/* {showButton && (
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
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Message", { data: Data });
            }}
          >
            <SvgXml xml={messageIcon} height="50" width={"50"} />
          </Pressable>
        </Animated.View>
      )} */}
       <View style={{
        position:"absolute",
        top:0,
        left:0,
        zIndex:100
       }}>
       <FixedBackHeader navigation={navigation} Yoffset={offset?offset:0}/>
       </View>
    </View>
  );
};

export default InstallmentService;
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

function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}

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
const backIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="45.858" height="38.26" viewBox="0 0 45.858 38.26">
<defs>
  <filter id="Path_20928" x="0" y="0" width="45.858" height="38.26" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_20928)">
  <path id="Path_20928-2" data-name="Path 20928" d="M30.612,85.471A1.267,1.267,0,1,1,32.4,87.266l-6.691,6.691h22.25a1.266,1.266,0,1,1,0,2.533H25.709q3.226,3.228,6.454,6.454a1.9,1.9,0,0,1,.515.668,1.266,1.266,0,0,1-2.069,1.361l-8.845-8.844a1.27,1.27,0,0,1-.027-1.78Q26.172,89.907,30.612,85.471Z" transform="translate(-12.39 -79.08)" fill="#fff"/>
</g>
</svg>
`;
export const Screen = ({ navigation, route }) => {
  const params = route.params;
  const data = params.data;
  const setPrice=params.setPrice;
  const setSelectedPackage=params.setSelectedPackage;
  const setNewNavigation = params.setNewNavigation;
  const [feature,setFeature]=React.useState()
  const isFocused=useIsFocused()
  const [layoutHeight,setLayoutHeight]=React.useState()

  React.useLayoutEffect(()=>{
    
    if(data){
        setFeature(data.features)
    }
  },[data])
  React.useEffect(()=>{
    if(isFocused&&setPrice){
      setSelectedPackage(data)
      setPrice(data.price)
    }

  },[isFocused])
  React.useEffect(()=>{
    if(layoutHeight){
      setNewNavigation(val=>{
        if(val<(layoutHeight+50)){
          return layoutHeight+50
        }else{
          return val
        }
      })
    }
  },[layoutHeight])

  const NewRows=({doc})=>{
    return(
        <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            marginVertical:10
        }}>
            <Text style={{
              fontSize:Platform.OS=="ios"? 16.5:15,
              fontFamily:"Poppins-Medium",
              color:textColor
            }}>{doc.title}</Text>
            <SvgXml xml={doc.isAvailable?Available:notAvailable} height="20" width={"20"}/>
        </View>
    )
  }

  return (
    <View
      style={{
        paddingHorizontal:20,
        paddingVertical:15,
        
      }}
      onLayout={(e) => {
        const offsetHeight = e.nativeEvent.layout.height;
        if(!layoutHeight||layoutHeight<offsetHeight){
          setLayoutHeight(offsetHeight)
        }
        // setNewNavigation((val) => {
        //   if (!val || val < offsetHeight) {
        //     return offsetHeight;
        //   } else {
        //     val;
        //   }
        // });
      }}
    >
        {
            feature&&feature.map((doc,i)=>(
                <NewRows key={i} doc={doc}/> 
            ))
        }
    </View>
  );
};
const notAvailable=`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="3" viewBox="0 0 17 3">
<line id="Line_5979" data-name="Line 5979" x2="14" transform="translate(1.5 1.5)" fill="none" stroke="#666" stroke-linecap="round" stroke-width="3"/>
</svg>
`
const Available=`<svg xmlns="http://www.w3.org/2000/svg" width="14.889" height="14.515" viewBox="0 0 14.889 14.515">
<path id="Path_20918" data-name="Path 20918" d="M45.921,37.151a.439.439,0,0,1,.456.619q-4.083,6.579-8.168,13.156a1.53,1.53,0,0,1-1.056.715,1.423,1.423,0,0,1-1.326-.507l-3.935-4.82a1.551,1.551,0,0,1,.326-2.272,1.536,1.536,0,0,1,1.155-.239,1.552,1.552,0,0,1,.771.393q1.366,1.24,2.729,2.482a.364.364,0,0,0,.52-.049L45.646,37.3A.44.44,0,0,1,45.921,37.151Z" transform="translate(-31.537 -37.144)" fill="#4ade80"/>
</svg>
`