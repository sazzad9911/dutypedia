import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  Alert,
  Pressable,
  Animated as Animation,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  backgroundColor,
  assentColor,
  secondaryColor,
  textColor,
} from "./../assets/colors";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProfileOption from "./../components/ProfileOption";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "./../components/Button";
import RatingView from "./../components/RatingView";
import { user, calenderIcon, noticeIcon, serviceIcon } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "./../Cart/ReviewCart";
import RelatedService from "./../Cart/RelatedService";
import IconButton from "./../components/IconButton";
import { Menu } from "react-native-paper";
import { Rows, ServiceTable, TabBar, TabScreen } from "./VendorProfile";
import Animated, { FadeIn, StretchInY } from "react-native-reanimated";
import ServiceCart from "./../Cart/ServiceCart";
import {
  getService,
  getOtherServices,
  getRelatedServices,
  getUnRelatedServices,
} from "../Class/service";
import { useSelector, useDispatch } from "react-redux";
import { SliderBox } from "react-native-image-slider-box";
import { serverToLocal } from "../Class/dataConverter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from "@react-navigation/native";
import Avatar from "../components/Avatar";
const Tab = createMaterialTopTabNavigator();
import OutsideView from "react-native-detect-press-outside";
import { Shadow } from "react-native-shadow-2";
import InsetShadow from "react-native-inset-shadow";
import { Tooltip } from "react-native-paper";
import useHandleScroll from "../components/constants/FabView";

const { width, height } = Dimensions.get("window");
const OtherProfile = (props) => {
  const window = Dimensions.get("window");
  const newUser = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [Lines, setLines] = React.useState(3);
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
  const [Active, setActive] = React.useState("Bargaining");
  const [Facilities, setFacilities] = React.useState([]);
  const [NewDataList, setNewDataList] = React.useState([]);
  const [ServiceList, setServiceList] = React.useState([]);
  const [ActiveService, setActiveService] = React.useState();
  const [SubServiceList, setSubServiceList] = React.useState([]);
  // const user= useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(false);
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
  const [RelatedServices, setRelatedServices] = React.useState([]);
  const [UnRelatedServices, setUnRelatedServices] = React.useState([]);
  const [Gigs, setGigs] = React.useState();
  const [PackageService, setPackageService] = React.useState();
  const [NameDropDown, setNameDropDown] = React.useState(false);
  const [PositionDropDown, setPositionDropDown] = React.useState(false);
  const childRef = React.useRef();
  const scrollRef = React.useRef();
  const scrollY = new Animation.Value(0);
  const diffClamp = Animation.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 500],
    outputRange: [0, 500],
  });
  const params = props.route.params;
  const data = params.data;
  const [ImageIndex, setImageIndex] = React.useState(0);
  //console.log(data)
  const { handleScroll, showButton } = useHandleScroll();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    setActive("Bargaining");
    setLoader(true);
    setActiveServiceData(null);
    if (data) {
      //setBackgroundImage(data.service.wallPhoto);
      setImage(data.service.profilePhoto);
      setImages(data.images);
      setPrice(data.price);
      setTitle(data.title);
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
      //console.log()
      setCategory(data.service.dashboard);
      setActiveServiceData(arr);
      if (data.services.category) {
        try {
          dispatch({
            type: "SET_NEW_LIST_DATA",
            playload: serverToLocal(
              data.services.options,
              data.service.category
            ),
          });
          setNewDataList(
            serverToLocal(data.services.options, data.service.category)
          );
        } catch (e) {
          console.warn(e.message);
        }
        return;
      }
      try {
        dispatch({
          type: "SET_NEW_LIST_DATA",
          playload: serverToLocal(data.services, data.service.dashboard),
        });
        setNewDataList(serverToLocal(data.services, data.service.dashboard));
      } catch (e) {
        console.warn(e.message);
      }
    }
  }, [data]);
  React.useEffect(() => {
    setActive("Bargaining");
    //setLoader(true);
    if (Data) {
      setBackgroundImage(Data.service.wallPhoto);
      setImage(Data.service.profilePhoto);
      setImages(Data.service.gigs[0].images);
      setPrice(Data.service.gigs[0].price);
      setTitle(Data.service.gigs[0].title);
      setDescription(Data.service.gigs[0].description);
      //setNewDataList(response.data.service.gigs[0].services.options)
      setFacilities(Data.service.gigs[0].facilites.selectedOptions);
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
      setCategory(Data.service.gigs[0].services.category);
      setActiveServiceData(arr);
      try {
        dispatch({
          type: "SET_NEW_LIST_DATA",
          playload: serverToLocal(
            Data.service.gigs[0].services.options,
            Data.service.gigs[0].services.category
          ),
        });
        setNewDataList(
          serverToLocal(
            Data.service.gigs[0].services.options,
            Data.service.gigs[0].services.category
          )
        );
      } catch (e) {
        console.warn(e.message);
      }
    }
  }, [Bargaining + Data]);
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
  }, [NewDataList.length + Click + Refresh]);
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
      getOtherServices(newUser.token, Data.service.id, "ONETIME")
        .then((res) => {
          setFixedService(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          setFixedService([]);
          console.warn(err.response.data);
        });
    }
  }, [Active + Data + newUser]);

  React.useEffect(() => {
    if (newUser && data) {
      setLoader(true);
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
            setUnRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response);
        });
    }
  }, [data]);
  const showCart = (doc) => {
    setGigs(doc);
    setClick(true);
    setImages(doc.images);
    //console.log(doc.services);
    setPrice(doc.price);
    setFacilities(doc.facilites.selectedOptions);
    setTitle(doc.title);
    setDescription(doc.description);
    try {
      dispatch({
        type: "SET_NEW_LIST_DATA",
        playload: serverToLocal(doc.services, Category),
      });
      setNewDataList(serverToLocal(doc.services, Category));
    } catch (e) {
      console.log(e.message);
    }
  };

  const clickFixed = (doc) => {
    setClick(true);
    setImages(doc.images);
    setGigs(doc);
    //console.log(doc.services);
    setPrice(doc.price);
    setFacilities(doc.facilites.selectedOptions);
    setTitle(doc.title);
    setDescription(doc.description);
    try {
      dispatch({
        type: "SET_NEW_LIST_DATA",
        playload: serverToLocal(doc.services, Category),
      });
      setNewDataList(serverToLocal(doc.services, Category));
    } catch (e) {
      console.log(e.message);
    }
    //console.log("ok");
    navigation.navigate("FixedService", { data: doc });
  };
  const clickPackage = (doc) => {};

  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  //console.warn(Data.service.profilePhoto)
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          backgroundColor: "#f1f1f2",
        }}
        onScroll={(e) => handleScroll(e)}
      >
        <OutsideView
          childRef={childRef}
          onPressOutside={() => {
            // handle press outside of childRef event
            setNameDropDown(false);
            setPositionDropDown(false);
          }}
        >
          <View style={styles.container}>
            <InsetShadow
              shadowColor={"black"}
              elevation={20}
              shadowRadius={20}
              shadowOffset={50}
              left={true}
              right={true}
              bottom={true}
              top={true}
              containerStyle={{
                height: 400,
                width: width,
              }}
            >
              <SliderBox imageComponentStyle={{
                opacity:.5,
                backgroundColor:'black'
              }}
                images={Images}
                sliderBoxHeight={width}
                dotColor="#232F6D"
                inactiveDotColor="#ffffff"
                currentImageEmitter={(index) => setImageIndex(index)}
                dotStyle={{
                  width: 0,
                  height: 0,
                  borderRadius: 10,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.92)",
                }}
                
              />
              <View
                style={{
                  backgroundColor: "#707070",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 20,
                  position: "absolute",
                  right: 10,
                  bottom: 30,
                }}
              >
                <Text
                  style={{
                    color: primaryColor,
                  }}
                >
                  {ImageIndex + 1} Of 4
                </Text>
              </View>
            </InsetShadow>
            

            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: 400,
                justifyContent: "flex-end",
                elevation: 2,
                paddingBottom: 80,
                elevation:5
              }}
            >
              <SvgXml
                style={{
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowColor: "#707070",
                  shadowRadius: 3,
                  elevation: 0,
                  shadowOpacity: 0,
                }}
                xml={threeDot}
                height="50"
                width={"50"}
              />

              <SvgXml
                style={{
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowColor: "#707070",
                  shadowRadius: 3,
                  elevation: 0,
                  shadowOpacity: 0.3,
                }}
                xml={loveIcon}
                height="50"
                width={"50"}
              />
              <SvgXml
                style={{
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowColor: "#707070",
                  shadowRadius: 3,
                  elevation: 0,
                  shadowOpacity: 0.3,
                }}
                xml={shareIcon}
                height="50"
                width={"50"}
              />

              <SvgXml
                style={{
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowColor: "#707070",
                  shadowRadius: 3,
                  elevation: 0,
                  shadowOpacity: 0.3,
                }}
                xml={messageIcon}
                height="50"
                width={"50"}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                backgroundColor: primaryColor,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: -20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16.5,
                  fontFamily: "Poppins-SemiBold",
                  color: "#BEBBBB",
                  marginTop: 15,
                }}
              >
                #Fixed Service
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  {
                    fontFamily: "Poppins-SemiBold",
                    marginTop: 5,
                    fontSize: 22,
                  },
                ]}
              >
                {data ? data.title : "Easin Arafat It Consulting Center"}
              </Text>
            </View>
            {Description ? (
              <TouchableOpacity
                disabled={Description.split("").length > 130 ? false : true}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginVertical: 20,
                }}
                onPress={() => {
                  if (Lines == 3) {
                    setLines(100);
                  } else {
                    setLines(3);
                  }
                }}
              >
                <Text
                  numberOfLines={Lines}
                  style={{
                    marginHorizontal: 20,
                    textAlign: "justify",

                    fontSize: 16.5,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    lineHeight: 25,
                    marginBottom: Lines != 3 ? 20 : 0,
                  }}
                >
                  {Lines &&
                    Description.split("").map((doc, i) => {
                      if (Lines != 3) {
                        return `${doc}`;
                      }
                      if (i < 130) {
                        return `${doc}`;
                      }
                    })}
                  {Description.split("").length > 129 && Lines == 3
                    ? "...."
                    : ""}
                  {Description.split("").length > 129 && Lines == 3 && (
                    <Text
                      style={{
                        color: "#4ADE80",
                        fontSize: 14,
                      }}
                    >
                      More
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text>N/A</Text>
            )}
            <View
              style={{
                backgroundColor: primaryColor,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 22,
                  marginBottom: 20,
                  marginTop: 10,
                }}
              >
                Service List
              </Text>

              <View
                style={{
                  backgroundColor: primaryColor,

                  overflowY: "hidden",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flex: 1.2,
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
                        title={
                          NewDataList.length > 0 && NewDataList[0].mainTitle
                        }
                      />
                    )}
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
                  </View>
                  <View
                    style={{
                      width: 1,
                      backgroundColor: "#e5e5e5",
                      marginLeft: 30,
                      marginRight: 30,
                    }}
                  />
                  <View style={{ flex: 2, marginRight: 0 }}>
                    {Array.isArray(SubServiceList) &&
                    SubServiceList.length > 0 ? (
                      SubServiceList.map((item, i) => (
                        <ServiceTable
                          key={i}
                          item={item}
                          i={i}
                          name={ActiveService}
                          NewDataList={NewDataList}
                        />
                      ))
                    ) : ActiveService != "Extra Facilities" ? (
                      <ServiceTable
                        NewDataList={NewDataList}
                        name={ActiveService}
                      />
                    ) : (
                      <></>
                    )}
                    {ActiveService == "Extra Facilities" && (
                      <View>
                        <Text
                          style={{
                            fontSize: 16.5,
                            fontFamily: "Poppins-SemiBold",
                            color: "#95979D",
                            lineHeight: 30,
                          }}
                        >
                          Extra Facilities
                        </Text>
                        {Array.isArray(Facilities) &&
                          Facilities.map((doc, i) => (
                            <Text
                              style={{
                                fontSize: 16.5,
                                fontFamily: "Poppins-Medium",
                                lineHeight: 25,
                              }}
                              key={i}
                            >
                              {doc.title}
                            </Text>
                          ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: primaryColor,
                marginTop: 10,
                paddingBottom: 10,
              }}
            >
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
                  alignSelf: "flex-end",
                  alignItems: "center",
                  marginRight: 20,
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins-SemiBold",
                    color: "#707070",
                    marginRight: 0,
                  }}
                >
                  Show All
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color="#707070"
                />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: primaryColor }}>
              <Text
                style={{
                  marginHorizontal: 20,
                  fontSize: 17,
                  marginBottom: 20,
                  color: textColor,
                  marginTop: 20,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                From {Price} ৳
              </Text>
              <Button
                onPress={() => {
                  navigation.navigate("OfferNow", {
                    data: data,
                    gigs: data,
                    type: "ONETIME",
                  });
                }}
                style={{
                  borderRadius: 5,
                  marginHorizontal: 20,
                  backgroundColor: "#FEA31E",
                  borderWidth: 0,
                  marginBottom: 10,
                  color: textColor,
                }}
                title={`Continue ${Price}৳`}
              />
            </View>
          </View>
        </OutsideView>

        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}
        >
          {RelatedServices.length > 0 && (
            <View>
              <Text
                style={{
                  fontSize: 22,
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
                  <RelatedService
                    data={doc}
                    key={i}
                    navigation={props.navigation}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {UnRelatedServices.length > 0 && (
            <View>
              <Text
                style={{
                  fontSize: 22,
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
                  <RelatedService
                    data={doc}
                    key={i}
                    navigation={props.navigation}
                  />
                ))}
                <View style={{ width: 10 }} />
              </ScrollView>
            </View>
          )}
        </View>
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
          }}
        >
          <SvgXml xml={messageIcon} height="50" width={"50"} />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default OtherProfile;
const styles = StyleSheet.create({
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
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
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
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: 15,
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
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
  },
});
const Options = ({ text, Icon }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        marginBottom: 1,
        backgroundColor: primaryColor,
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingVertical: 5,
      }}
    >
      <Icon
        style={{
          flex: 1,
        }}
      />
      <Text
        style={{
          fontSize: 15,
          flex: 8,
          marginLeft: 10,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
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
      }}
    >
      <SvgXml xml={icon} height="22" width="22" />
      <View
        style={{
          flex: 6,
          marginLeft: 10,
        }}
      >
        <Text
          numberOfLines={lines}
          style={{
            fontFamily: "Poppins-SemiBold",
            marginBottom: 5,
            fontSize: 16.5,
            color: "#333333",
          }}
        >
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
  const isFocused = useIsFocused();
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

  return (
    <View>
      <View style={{ backgroundColor: primaryColor, marginBottom: -1 }}>
        <Text
          style={{
            fontSize: 21,
            fontFamily: "Poppins-SemiBold",
            color: textColor,
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          {Title}
        </Text>
        {Description ? (
          <TouchableOpacity
            disabled={
              Description && Description.split("").length > 130 ? false : true
            }
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginVertical: 20,
            }}
            onPress={() => {
              if (NewLines == 3) {
                setNewLines(100);
              } else {
                setNewLines(3);
              }
            }}
          >
            <Text
              numberOfLines={NewLines}
              style={{
                marginHorizontal: 20,
                textAlign: "justify",

                fontSize: 16.5,
                color: textColor,
                fontFamily: "Poppins-Medium",
                lineHeight: 25,
                marginBottom: NewLines != 3 ? 20 : 0,
              }}
            >
              {NewLines &&
                Description &&
                Description.split("").map((doc, i) => {
                  if (NewLines != 3) {
                    return `${doc}`;
                  }
                  if (i < 130) {
                    return `${doc}`;
                  }
                })}
              {Description &&
              Description.split("").length > 129 &&
              NewLines == 3
                ? "...."
                : ""}
              {Description &&
                Description.split("").length > 129 &&
                NewLines == 3 && (
                  <Text
                    style={{
                      color: "#4ADE80",
                      fontSize: 14,
                    }}
                  >
                    More
                  </Text>
                )}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text>N/A</Text>
        )}
      </View>
      <View
        style={{
          backgroundColor: primaryColor,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 22,
            marginBottom: 30,
            marginTop: 40,
          }}
        >
          Service List
        </Text>

        <View
          style={{
            backgroundColor: primaryColor,
            height: 180,
            overflowY: "hidden",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1.2,
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
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: "#e5e5e5",
                marginLeft: 30,
                marginRight: 30,
              }}
            />
            <View style={{ flex: 2, marginRight: 0 }}>
              {Array.isArray(SubServiceList) && SubServiceList.length > 0 ? (
                SubServiceList.map((item, i) => (
                  <ServiceTable
                    key={i}
                    item={item}
                    i={i}
                    name={ActiveService}
                    NewDataList={NewDataList}
                  />
                ))
              ) : ActiveService != "Extra Facilities" ? (
                <ServiceTable NewDataList={NewDataList} name={ActiveService} />
              ) : (
                <></>
              )}
              {ActiveService == "Extra Facilities" && (
                <View>
                  <Text
                    style={{
                      fontSize: 16.5,
                      fontFamily: "Poppins-SemiBold",
                      color: "#95979D",
                      lineHeight: 30,
                    }}
                  >
                    Extra Facilities
                  </Text>
                  {Array.isArray(Facilities) &&
                    Facilities.map((doc, i) => (
                      <Text
                        style={{
                          fontSize: 16.5,
                          fontFamily: "Poppins-Medium",
                          lineHeight: 25,
                        }}
                        key={i}
                      >
                        {doc.title}
                      </Text>
                    ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: primaryColor,
          marginTop: 5,
          paddingBottom: 10,
        }}
      >
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
            alignSelf: "flex-end",
            alignItems: "center",
            marginRight: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-SemiBold",
              color: "#707070",
              marginRight: 0,
            }}
          >
            Show All
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={22}
            color="#707070"
          />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: primaryColor }}>
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 17,
            marginBottom: 20,
            color: textColor,
            marginTop: 20,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          From {Price} ৳
        </Text>
        <Button
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
            marginBottom: 10,
            color: textColor,
          }}
          title="Offer Now"
        />
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
  //console.log(FixedService)
  return (
    <View
      style={{
        marginHorizontal: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 20,
      }}
    >
      {FixedService.map(
        (doc, i) =>
          i < 12 && (
            <ServiceCart onPress={() => onPress(doc)} key={i} data={doc} />
          )
      )}
    </View>
  );
};
const PackageScreen = ({ navigation, route }) => {
  const params = route.params;
  const PackageService = params.PackageService;
  const onPress = route.onPress;
  //console.log(FixedService)
  return (
    <View
      style={{
        marginHorizontal: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 20,
      }}
    >
      {PackageService.map(
        (doc, i) =>
          i < 12 && <ServiceCart onPress={onPress} key={i} data={doc} />
      )}
    </View>
  );
};
