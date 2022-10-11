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
import {
  brain,
  flag,
  info,
  star,
  user,
  verified,
  appointmentIcon,
  chatIcon,
  callIcon,
  calenderIcon,
  noticeIcon,
  serviceIcon,
} from "../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "./../Cart/ReviewCart";
import RelatedService from "./../Cart/RelatedService";
import IconButton from "./../components/IconButton";
import { Menu } from "react-native-paper";
import { Rows, ServiceTable } from "./VendorProfile";
import Animated, { FadeIn } from "react-native-reanimated";
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

const { width, height } = Dimensions.get("window");
const OtherProfile = (props) => {
  const window = Dimensions.get("window");
  const newUser = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [Lines, setLines] = React.useState(2);
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
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
  ];
  const [Active, setActive] = React.useState("Bargaining");
  const [NewLines, setNewLines] = React.useState(4);
  const [Facilities, setFacilities] = React.useState([]);
  const [NewDataList, setNewDataList] = React.useState([]);
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
  const [RelatedServices, setRelatedServices] = React.useState([]);
  const [UnRelatedServices, setUnRelatedServices] = React.useState([]);

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
    if (serviceId && newUser) {
      getService(newUser.token, serviceId)
        .then((response) => {
          if (response.data) {
            setLoader(false);

            setData(response.data);
            setBackgroundImage(response.data.service.wallPhoto);
            setImage(response.data.service.profilePhoto);
            setImages(response.data.service.gigs[0].images);
            setPrice(response.data.service.gigs[0].price);
            setTitle(response.data.service.gigs[0].title);
            setDescription(response.data.service.gigs[0].description);
            //setNewDataList(response.data.service.gigs[0].services.options)
            setFacilities(
              response.data.service.gigs[0].facilites.selectedOptions
            );
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
            setCategory(response.data.service.gigs[0].services.category);
            setActiveServiceData(arr);
            try {
              dispatch({
                type: "SET_NEW_LIST_DATA",
                playload: serverToLocal(
                  response.data.service.gigs[0].services.options,
                  response.data.service.gigs[0].services.category
                ),
              });
              setNewDataList(
                serverToLocal(
                  response.data.service.gigs[0].services.options,
                  response.data.service.gigs[0].services.category
                )
              );
            } catch (e) {
              console.warn(e.message);
            }
          }
        })
        .catch((error) => {
          console.warn(error.response.data);
        });
    }
  }, [serviceId + Refresh]);
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
  }, [Bargaining]);
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
    if (user && Data) {
      getOtherServices(newUser.token, Data.service.id, "ONETIME")
        .then((res) => {
          setFixedService(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          console.warn(err.response.data);
        });
    }
  }, [Active]);
  React.useEffect(() => {
    if (newUser && Data) {
      getRelatedServices(newUser.token, Data.service.id, Data.service.dashboard)
        .then((response) => {
          if (response.data) {
            setRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response);
        });
      getUnRelatedServices(
        newUser.token,
        Data.service.id,
        Data.service.dashboard
      )
        .then((response) => {
          if (response.data) {
            setUnRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response);
        });
    }
  }, [Data]);
  const showCart = (doc) => {
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
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#f1f1f2",
        }}
      >
        <View style={styles.container}>
          {backgroundImage ? (
            <Image
              source={{ uri: backgroundImage }}
              style={styles.backgroundContainer}
            />
          ) : (
            <LinearGradient
              style={styles.backgroundContainer}
              colors={["#1C4802", "#1C4802", "#1C4802"]}
            ></LinearGradient>
          )}

          <View style={styles.profile}>
            {image ? (
              <Image style={styles.image} source={{ uri: image }} />
            ) : (
              <FontAwesome name="user" size={90} color="#1C4802" />
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
          >
            <Text
              style={[
                styles.headLine,
                { fontFamily: "Poppins-SemiBold", marginTop: 15 },
              ]}
            >
              {Data
                ? Data.service.serviceCenterName
                : "Easin Arafat It Consulting Center"}
            </Text>
            <Text
              style={{
                marginTop: 2,
                fontSize: 17,
                fontFamily: "Poppins-SemiBold",
              }}
            >
              {Data ? Data.service.providerInfo.title : ""}{" "}
              {Data?.service.providerInfo.name}
              {` (${Data?.service.providerInfo.gender})`}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
              }}
            >
              Position of {Data?.service.providerInfo.position}
            </Text>
          </View>
          <SvgXml
            style={{
              position: "absolute",
              right: 30,
              zIndex: 6,
              top: 230,
            }}
            xml={verified}
            height="50"
            width="50"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: primaryColor,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: -1,
            marginBottom: -1,
          }}
        >
          <IconButton
            style={{
              borderRadius: 20,
              height: 35,
              width: 35,
              margin: 10,
            }}
            LeftIcon={() => (
              <SvgXml xml={appointmentIcon} height="18" width="18" />
            )}
          />
          <IconButton
            style={{
              borderRadius: 20,
              height: 35,
              margin: 10,
              flex: 2,
              marginLeft: 0,
            }}
            title="Chat"
            LeftIcon={() => <SvgXml xml={chatIcon} height="20" width="20" />}
          />
          <IconButton
            style={{
              borderRadius: 20,
              height: 35,
              margin: 10,
              flex: 2,
              marginLeft: 0,
            }}
            title="Call"
            LeftIcon={() => <SvgXml xml={callIcon} height="20" width="20" />}
          />
          <Menu
            contentStyle={{
              backgroundColor: primaryColor,
            }}
            visible={Visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#e5e5e5",
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 0,
                }}
              >
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color="#808080"
                />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                setVisible(false);
              }}
              title="Copy URL"
            />
            <Menu.Item
              onPress={() => {
                setVisible(false);
                navigation.navigate("Support_1");
              }}
              title="Report"
            />
          </Menu>
        </View>
        <BarOption
          icon={brain}
          title={`Specialty in ${Data?.service.speciality}`}
        />
        <BarOption
          icon={user}
          title={`Worker and Team (${Data?.service.worker} member)`}
        />
        <BarOption
          icon={flag}
          title={`Since ${Data?.service.startDate.split("-")[0]}`}
        />
        <ProfileOption
          onPress={() => {
            navigation.navigate("Company Calender", { vendor: Data });
          }}
          Icon={() => <SvgXml xml={calenderIcon} height="20" width="20" />}
          title="Company Calender"
        />
        <ProfileOption
          style={{
            marginBottom: 5,
          }}
          Icon={() => <SvgXml xml={noticeIcon} height="20" width="20" />}
          title="Notice"
        />
        <View
          style={{
            backgroundColor: primaryColor,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: -5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: -5,
              marginBottom: -1,
              paddingTop: 5,
            }}
          >
            <SvgXml xml={info} height="20" width="20" />
            <Text
              style={{
                marginLeft: 10,
                color: textColor,
                fontSize: 15,
                fontFamily: "Poppins-SemiBold",
              }}
            >
              About
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setLines((num) => {
                  if (num === 2) {
                    return 30;
                  } else {
                    return 2;
                  }
                });
              }}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Text
                numberOfLines={Lines}
                style={{
                  fontSize: 14,
                  textAlign: "justify",
                  fontFamily: "Poppins-Medium",
                  lineHeight: 20,
                  marginTop: 10,
                }}
              >
                {Data?.service.about}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="15"
                width="15"
              />
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="15"
                width="15"
              />
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="15"
                width="15"
              />
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="15"
                width="15"
              />
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="15"
                width="15"
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Poppins-Medium",
                  fontSize: 13,
                }}
              >
                4.6
              </Text>
              <Text
                style={{
                  marginLeft: 30,
                  fontFamily: "Poppins-Medium",
                  fontSize: 13,
                }}
              >
                Profile View {Data?.service.views}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={{
            backgroundColor: primaryColor,
            marginTop: -1,
            paddingBottom: 5,
            paddingTop: 10,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: 5 }} />
          {ActiveServiceData &&
            ActiveServiceData.map((item, i) => (
              <View key={i} style={{ flexDirection: "row" }}>
                <IconButton
                  disabled={!item.value}
                  onPress={() => {
                    setActive(item.title);
                    setClick(false);
                    if (item.title == "Bargaining") {
                      setBargaining((val) => !val);
                    }
                  }}
                  active={item.title == Active ? true : false}
                  style={{
                    height: 35,
                    marginVertical: 10,
                    borderRadius: 20,
                  }}
                  title={item.title}
                />
                <View style={{ width: 10 }} />
              </View>
            ))}
        </ScrollView>
        {Active == "Bargaining" ? (
          <Animated.View entering={FadeIn}>
            <View style={{ backgroundColor: primaryColor, marginBottom: -1 }}>
              <SliderBox
                images={Images}
                sliderBoxHeight={width}
                dotColor="#232F6D"
                inactiveDotColor="#ffffff"
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
              <TouchableOpacity
                onPress={() => {
                  if (NewLines == 4) {
                    setNewLines(100);
                  } else {
                    setNewLines(4);
                  }
                }}
              >
                <Text
                  numberOfLines={NewLines}
                  style={{
                    marginHorizontal: 20,
                    textAlign: "justify",
                    marginVertical: 10,
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    lineHeight: 18,
                  }}
                >
                  {Description}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ backgroundColor: primaryColor, paddingHorizontal: 20 }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  marginBottom: 5,
                  marginTop: 10,
                }}
              >
                Service List
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#e5e5e5",
                  marginBottom: 20,
                }}
              />
              <View
                style={{
                  backgroundColor: primaryColor,
                  height: 140,
                  overflowY: "hidden",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1.2,
                      marginLeft: 20,
                      height: 200,
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
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                  <View style={{ flex: 2, marginRight: 20 }}>
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
                            fontSize: 15,
                            fontFamily: "Poppins-Medium",
                            color: "#707070",
                          }}
                        >
                          Extra Facilities
                        </Text>
                        {Array.isArray(Facilities) &&
                          Facilities.map((doc, i) => (
                            <Text
                              style={{
                                fontSize: 13,
                                fontFamily: "Poppins-Light",
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
                <LinearGradient
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    bottom: 0,
                    height: 20,
                    width: (width / 3.2) * 2,
                    left: (width / 3.2) * 1.2,
                  }}
                  colors={[
                    "rgba(255, 255, 255, 0.252)",
                    "rgba(255, 255, 255, 0.343)",
                    "#ffff",
                  ]}
                ></LinearGradient>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#e5e5e5",
                  marginVertical: 20,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: primaryColor,
                marginTop: -5,
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
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins-SemiBold",
                    color: "#707070",
                    marginRight: 5,
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
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                From {Price} ৳
              </Text>
              <Button
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
          </Animated.View>
        ) : Active == "Fixed" ? (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: primaryColor,
              paddingLeft: 10,
            }}
            entering={FadeIn}
          >
            {!Click &&
              FixedService &&
              FixedService.map(
                (doc, i) =>
                  i < 6 && (
                    <ServiceCart
                      onPress={() => {
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
                      }}
                      key={i}
                      data={doc}
                    />
                  )
              )}
            {Array.isArray(FixedService) && FixedService.length > 6 && !Click && (
              <IconButton
                onPress={() => {
                  navigation.navigate("AllPackageList", {
                    serviceId: Data.service.id,
                    onPress: (doc) => showCart(doc),
                  });
                }}
                style={{
                  marginLeft: width / 2 - 60,
                  width: 120,
                }}
                title="Show All"
                Icon={() => (
                  <AntDesign name="right" size={20} color={textColor} />
                )}
              />
            )}
            {!Click && !FixedService && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SvgXml
                  xml={serviceIcon}
                  style={{ marginVertical: 100 }}
                  height="200"
                  width="200"
                />
              </View>
            )}
            {Click && (
              <View>
                <View style={{ backgroundColor: primaryColor }}>
                  <SliderBox
                    images={Images}
                    sliderBoxHeight={width}
                    dotColor="#232F6D"
                    inactiveDotColor="#ffffff"
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
                  <Text
                    style={{
                      marginHorizontal: 20,
                      fontSize: 21,
                      color: textColor,
                      fontFamily: "Poppins-SemiBold",
                      marginVertical: 15,
                      marginTop: 25,
                    }}
                  >
                    {Title}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      if (NewLines == 4) {
                        setNewLines(100);
                      } else {
                        setNewLines(4);
                      }
                    }}
                    disabled={Description.length > 100 ? false : true}
                  >
                    <Text
                      numberOfLines={NewLines}
                      style={{
                        marginHorizontal: 20,
                        textAlign: "justify",
                        marginVertical: 5,
                        fontSize: 14,
                        color: textColor,
                        fontFamily: "Poppins-Medium",
                        marginTop: 0,
                        lineHeight: 18,
                      }}
                    >
                      {Description}
                    </Text>
                    {/* {Description.length > 100 && (
                  <Text
                    style={{
                      marginHorizontal: 20,
                      fontSize: 14,
                      fontFamily: "Poppins-Medium",
                      color: "green",
                      marginTop: -5,
                    }}
                  >
                    Read {NewLines == 4 ? "More" : "Less"}
                  </Text>
                )} */}
                  </TouchableOpacity>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      marginRight: 20,
                      fontSize: 18,
                      fontFamily: "Poppins-Medium",
                      color: "black",
                      marginTop: 10,
                    }}
                  >
                    From {Price}৳
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    backgroundColor: primaryColor,
                    paddingVertical: 20,
                    marginTop: -1,
                    marginBottom: -1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Service List
                  </Text>
                  <View style={{ height: 1, backgroundColor: "#e5e5e5" }} />
                </View>
                <View
                  style={{
                    backgroundColor: primaryColor,
                    height: 140,
                    overflowY: "hidden",
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flex: 1.2,
                        marginLeft: 20,
                        height: 200,
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
                            NewDataList[0].mainTitle == ActiveService
                              ? styles.activeButton
                              : styles.inactiveButton
                          }
                          title={NewDataList[0].mainTitle}
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
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    />
                    <View style={{ flex: 2, marginRight: 20 }}>
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
                              fontSize: 15,
                              fontFamily: "Poppins-Medium",
                              color: "#707070",
                            }}
                          >
                            Extra Facilities
                          </Text>
                          {Array.isArray(Facilities) &&
                            Facilities.map((doc, i) => (
                              <Text
                                style={{
                                  fontSize: 13,
                                  fontFamily: "Poppins-Light",
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
                  <LinearGradient
                    style={{
                      position: "absolute",
                      zIndex: 100,
                      bottom: 0,
                      height: 20,
                      width: (width / 3.2) * 2,
                      left: (width / 3.2) * 1.2,
                    }}
                    colors={[
                      "rgba(255, 255, 255, 0.252)",
                      "rgba(255, 255, 255, 0.343)",
                      "#ffff",
                    ]}
                  ></LinearGradient>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#e5e5e5",
                    marginVertical: 10,
                    marginHorizontal: 20,
                  }}
                />
                <View style={{ backgroundColor: primaryColor }}>
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
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Poppins-Medium",
                        color: "#707070",
                        marginRight: 5,
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
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    From {Price} ৳
                  </Text>
                  <Button
                    style={{
                      borderRadius: 5,
                      marginHorizontal: 20,
                      backgroundColor: "#FEA31E",
                      borderWidth: 0,
                      marginBottom: 10,
                      color: textColor,
                    }}
                    title="Continue"
                  />
                </View>
              </View>
            )}
          </Animated.View>
        ) : (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              backgroundColor: primaryColor,
            }}
            entering={FadeIn}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            alignItems: "flex-end",
            paddingRight: 20,
            backgroundColor: primaryColor,
          }}
        >
          <TouchableOpacity
            style={{ width: 70, flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                color: textColor,
                fontSize: 14,
                fontFamily: "Poppins-SemiBold",
              }}
            >
              Show All
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={textColor}
            />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
            paddingVertical: 20,
          }}
        >
          <RatingView
            style={{
              marginHorizontal: 20,
            }}
            title="Seller Communication"
            rate={4.6}
          />
          <RatingView
            style={{
              marginHorizontal: 20,
              marginTop: 5,
            }}
            title="Service As Describe"
            rate={4.6}
          />
          <RatingView
            style={{
              marginHorizontal: 20,
              marginTop: 5,
            }}
            title="Service Quality"
            rate={3.2}
          />
          <RatingView
            style={{
              marginHorizontal: 20,
              marginTop: 5,
            }}
            title="Service Quality"
            rate={3.2}
          />
          <RatingView
            style={{
              marginHorizontal: 20,
              marginTop: 5,
            }}
            title="Service Quality"
            rate={3.2}
          />
        </View>
        <ReviewCart navigation={navigation} />
        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 5,
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
    </SafeAreaView>
  );
};

export default OtherProfile;
const styles = StyleSheet.create({
  backgroundContainer: {
    minHeight: 230,
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
    color: "white",
    backgroundColor: backgroundColor,
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
  },
  inactiveButton: {
    color: textColor,
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
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
      <SvgXml xml={icon} height="20" width="20" />
      <View
        style={{
          flex: 6,
          marginLeft: 10,
        }}
      >
        <Text
          numberOfLines={lines}
          style={{
            fontFamily: "Poppins-Medium",
            marginBottom: 5,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: "#e5e5e5",
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
};
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
