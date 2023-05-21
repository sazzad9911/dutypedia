import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  KeyboardAvoidingView,
  RefreshControl,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import {
  primaryColor,
  textColor,
  backgroundColor,
  assentColor,
} from "../../assets/colors";
import TopTabBar from "./../Seller/components/TopTabBar";
import BackHeader from "./../../components/BackHeader";
import Input from "./../../components/Input";
import { AntDesign, FontAwesome, EvilIcons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "./../../components/DropDown";
import Animated, { StretchInY } from "react-native-reanimated";
import Button from "./../../components/Button";
import TextArea from "./../../components/TextArea";
import { DivisionList } from "../../Data/division";
import { DistrictList } from "../../Data/district";
import { AreaList } from "../../Data/area";
import { Menu } from "react-native-paper";
import AlertModal from "./components/AlertModal";
import {
  createOfflineMembers,
  getOfflineMembers,
  deleteOfflineMember,
  updateOfflineMembers,
  getRandomUser,
  getUserByName,
  createOnlineUser,
  getOnlineUser,
  deleteOnlineMember,
  cancelOnlineUser,
} from "../../Class/member";
import { fileFromURL } from "../../action";
import { uploadFile } from "../../Class/upload";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import IconButton from "../../components/IconButton";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import OutsideView from "react-native-detect-press-outside";
import ActivityLoader from "../../components/ActivityLoader";
import { useIsFocused } from "@react-navigation/native";
import customStyle from "../../assets/stylesheet";
const { width, height } = Dimensions.get("window");

const Member = ({ navigation }) => {
  const [routeName, setRouteName] = useState();
  return <DutyPediaUser navigation={navigation} />;
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#4ADE80",
          },
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{
                  color: focused ? "#4ADE80" : "#333333",
                  fontSize: 16,
                }}>
                Dutypedia User
              </Text>
            ),
          }}
          name="Dutypedia User"
          component={DutyPediaUser}
          initialParams={{
            setRouteName: setRouteName,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{
                  color: focused ? "#4ADE80" : "#333333",
                  fontSize: 16,
                }}>
                Offline User
              </Text>
            ),
          }}
          name="Offline User"
          component={OfflineUser}
          initialParams={{
            setRouteName: setRouteName,
          }}
        />
      </Tab.Navigator>
      <Pressable
        onPress={() => {
          if (routeName == "Dutypedia User") {
            navigation.navigate("AddOnlineUser", { onChange: null });
          } else if (routeName == "Offline User") {
            navigation.navigate("AddOfflineUser", { id: null, reload: null });
          }
        }}
        style={{
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#4ADE80",
          borderRadius: 30,
          bottom: 20,
          right: 20,
          position: "absolute",
        }}>
        <SvgXml xml={whiteContact} height={"20"} width={"20"} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Member;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    flex: 1,
    textAlign: "center",
    color: "white",
    marginVertical: 10,
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
    width: 90,
    height: 90,
    marginTop: -45,
    alignSelf: "center",
    backgroundColor: primaryColor,
    borderColor: backgroundColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
  image: {
    width: 89,
    height: 89,
    borderRadius: 5,
  },
  starIcon: {
    marginRight: 3,
  },
  cameraIcon: {
    position: "absolute",
    top: 0,
    right: -5,
    backgroundColor: "white",
    borderRadius: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#707070",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
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
  backgroundContainer: {
    minHeight: 200,
  },
});

const DutyPediaUser = (props) => {
  const navigation = props.navigation;
  const [Data, setData] = React.useState([]);
  const [Loader, setLoader] = React.useState(true);
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const [AllData, setAllData] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const isFocused = useIsFocused();
  const inset = useSafeAreaInsets();

  const onChange = React.useCallback((data) => {
    setLoader(!Loader);
  });

  React.useEffect(() => {
    setLoader(true);
    if (vendor && user) {
      getOnlineUser(user.token, vendor.service.id).then((res) => {
        setLoader(false);
        if (res) {
          //console.log(res);
          setData(res.members);
          setAllData(res.members);
        }
      });
    }
    if (isFocused) {
      //props.route.params.setRouteName(props.route.name);
    }
  }, [Refresh, isFocused]);
  const search = (val) => {
    let arr = AllData.filter((d) => {
      if (d.user.username.toUpperCase().match(val.toUpperCase())) {
        return d;
      }
    });
    return arr;
  };
  if (!AllData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: inset?.top,
      }}>
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginVertical: 12,
          }}>
          Member list
        </Text>
        <Input
          rightIcon={
            <SvgXml
              style={{
                position: "absolute",
                right: 12,
                top: 10,
              }}
              xml={searchIcon}
              width="20"
              height={"20"}
            />
          }
          onChange={(val) => {
            if (!val) {
              setData(AllData);
              return;
            }
            setData(search(val));
          }}
          style={{
            borderRadius: 4,
            height: 32,
            backgroundColor: "#E6E6E6",
            marginHorizontal: 0,
            borderBottomWidth: 0,
          }}
          placeholder="Search By User"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Data &&
          Data.map((doc, i) => (
            <OnlineCart
              onPress={() => {
                //console.log(doc)
                navigation.navigate("UserProfile", { user: doc });
              }}
              doc={doc}
              i={i}
              key={i}
              reload={onChange}
              navigation={navigation}
            />
          ))}
        {AllData && AllData.length == 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center",height:height-180 }}>
            <Text
              style={{
                fontSize: 18,
              }}>
              No Member Found!
            </Text>
          </View>
        )}
        <View style={{ height: 10 }} />
      </ScrollView>
      {/* <Pressable
        onPress={() => {
          navigation.navigate("AddOnlineUser", {
            onChange: null,
            data: AllData,
          });
        }}
        style={{
          width: 44,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#4ADE80",
          borderRadius: 30,
          bottom: 32,
          right: 20,
          position: "absolute",
        }}>
        <SvgXml xml={whiteContact} height={"20"} width={"20"} />
      </Pressable> */}
    </View>
  );
};

const OnlineCart = ({ doc, i, reload, onPress, navigation }) => {
  const [AlertVisible, setAlertVisible] = React.useState(false);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [modalVisible, setModalVisible] = useState(false);
  const childRef = useRef();
  const [selectUser, setSelectUser] = useState();
  const vendorOrders = useSelector((state) => state.vendorOrders);
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    if (vendorOrders) {
      let number = 0;
      vendorOrders.map((d, i) => {
        if (d.userId == doc.userId) {
          number = number + 1;
        }
      });
      //console.warn(number)
      setTotalOrder(number);
    }
  }, [doc]);
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        marginLeft: 20,
        borderRadius: 5,
        justifyContent: "space-between",
      }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#e5e5e5",
          }}>
          {doc.user.profilePhoto ? (
            <Image
              style={{
                height: 40,
                width: 40,
              }}
              source={{ uri: doc.user.profilePhoto }}
            />
          ) : (
            <FontAwesome name="user" size={30} color="#983C85" />
          )}
        </Pressable>
        <View
          style={{
            borderBottomColor: "#E6E6E6",
            borderBottomWidth: 1,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            height: "100%",
            marginLeft: 16,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: "400",
            }}>
            {doc.user.name
              ? doc.user.name
              : "Easin Arafat"}
          </Text>
          <Pressable
            style={{
              marginRight: 20,
            }}
            onPress={() => {
              setModalVisible((val) => !val);
              setSelectUser(`${doc.user.name}`);
            }}>
            {/* <Feather name="send" size={22} color={backgroundColor} />
        <View style={{ width: 15 }} />
        <AntDesign
          onPress={() => {
            setAlertVisible(true);
          }}
          name="delete"
          size={22}
          color={backgroundColor}
        /> */}
            <SvgXml xml={threeDot} />
          </Pressable>
        </View>
      </View>

      <Modal
        animationType={"fade"}
        transparent={true}
        visible={AlertVisible}
        onRequestClose={() => setAlertVisible(false)}>
        <AlertModal
          title="Hey"
          subTitle={"Are you sure want to delete this?"}
          onChange={(e) => {
            if (e == "ok") {
              //console.log(user.token);
              //console.log(doc.id)
              deleteOnlineMember(user.token, doc.id).then(() => {
                reload();
              });
              setAlertVisible(false);
            } else {
              setAlertVisible(false);
            }
          }}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <OutsideView
          childRef={childRef}
          onPressOutside={() => {
            // handle press outside of childRef event
            setModalVisible((val) => !val);
          }}>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
            }}>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderColor: "#C0FFD7",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
              ref={childRef}>
              <IconButton
                onPress={() => {
                  setModalVisible(false);
                  let newUser = {
                    userId: doc.user.id,
                    user: doc.user,
                  };
                  navigation.navigate("ChatScreen", {
                    data: {
                      users: [newUser],
                    },
                    username: doc.user.username,
                  });
                }}
                LeftIcon={() => (
                  <SvgXml xml={message} height={"20"} width={"20"} />
                )}
                style={{
                  borderWidth: 0,
                  justifyContent: "flex-start",
                  height: 40,
                }}
                title={`Send Message To ${selectUser}`}
              />
              <IconButton
                onPress={() => {
                  setAlertVisible(true);
                  setModalVisible(false);
                }}
                LeftIcon={() => (
                  <SvgXml xml={deleteIcon} height={"20"} width={"20"} />
                )}
                style={{
                  borderWidth: 0,
                  justifyContent: "flex-start",
                  height: 40,
                }}
                title={`Remove ${selectUser}`}
              />
            </View>
          </View>
        </OutsideView>
      </Modal>
    </TouchableOpacity>
  );
};
const OfflineUser = (props) => {
  const navigation = props.navigation;
  const [Reload, setReload] = React.useState(false);
  const [Data, setData] = React.useState([]);
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(true);
  const [AllData, setAllData] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const isFocused = useIsFocused();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const reload = () => {
    setReload(!Reload);
  };
  React.useEffect(() => {
    setLoader(true);
    if (vendor && user) {
      getOfflineMembers(user.token, vendor.service.id).then((res) => {
        if (res) {
          setData(res.members);
          setLoader(false);
          setAllData(res.members);
          return;
        }
        setLoader(false);
        console.warn(res);
      });
    }
    if (isFocused) {
      props.route.params.setRouteName(props.route.name);
    }
  }, [Reload + vendor + user + Refresh, isFocused]);
  const search = (val) => {
    let arr = AllData.filter((d) => {
      if (d.name.toUpperCase().match(val.toUpperCase())) {
        return d;
      }
    });
    return arr;
  };
  if (!AllData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  if (Array.isArray(AllData) && AllData.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>No User Found!</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Input
          rightIcon={
            <SvgXml
              style={{
                position: "absolute",
                right: 35,
                top: 31,
              }}
              xml={searchIcon}
              width="20"
              height={"20"}
            />
          }
          onChange={(val) => {
            if (!val) {
              setData(AllData);
              return;
            }
            setData(search(val));
          }}
          style={{
            borderWidth: 1,
            marginVertical: 10,
            marginTop: 20,
            borderRadius: 20,
            height: 40,
          }}
          placeholder="Search By User"
        />

        <View>
          {Data &&
            Data.map((doc, i) => (
              <OfflineCart
                onPress={() => {
                  navigation.navigate("OfflineProfile", { user: doc });
                }}
                {...props}
                i={i}
                doc={doc}
                key={i}
                reload={reload}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
const OfflineCart = ({ doc, i, navigation, reload, onPress }) => {
  const [Visible, setVisible] = React.useState(false);
  const [AlertVisible, setAlertVisible] = React.useState(false);
  const user = useSelector((state) => state.user);
  const vendorOrders = useSelector((state) => state.vendorOrders);
  const [totalOrder, setTotalOrder] = useState(0);
  const childRef = useRef();
  const [selectUser, setSelectUser] = useState();
  useEffect(() => {
    if (vendorOrders) {
      let number = 0;
      vendorOrders.map((d, i) => {
        if (d.userId == doc.id) {
          number = number + 1;
        }
      });
      //console.warn(number)
      setTotalOrder(number);
    }
  }, [doc]);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "space-between",
      }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5,
            borderWidth: 1,
            borderColor: "#e5e5e5",
          }}>
          {doc.profilePhoto ? (
            <Image
              style={{
                height: 50,
                width: 50,
              }}
              source={{ uri: doc.profilePhoto }}
            />
          ) : (
            <FontAwesome name="user" size={30} color="#983C85" />
          )}
        </View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              marginLeft: 10,
              fontSize: 15,
              fontFamily: "Poppins-Medium",
            }}>
            {doc.name ? doc.name : "Easin Arafat"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginLeft: 10,
              fontSize: 13,
              fontFamily: "Poppins-Medium",
            }}>
            {totalOrder > 0 ? `${totalOrder} Orders` : "No Order Yet"}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 10 }} />
        <Entypo
          onPress={() => {
            setVisible((val) => !val);
            setSelectUser(`${doc.name}`);
          }}
          name="dots-three-vertical"
          size={24}
          color={"#707070"}
        />
      </View>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={AlertVisible}
        onRequestClose={() => setAlertVisible(false)}>
        <AlertModal
          title="Hey"
          subTitle={"Are you sure want to delete this?"}
          onChange={(e) => {
            if (e == "ok") {
              //console.log(user.token);
              //console.log(doc.id)
              deleteOfflineMember(user.token, doc.id).then(() => {
                reload();
              });
              setAlertVisible(false);
            } else {
              setAlertVisible(false);
            }
          }}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Visible}
        onRequestClose={() => setVisible(false)}>
        <OutsideView
          childRef={childRef}
          onPressOutside={() => {
            // handle press outside of childRef event
            setVisible((val) => !val);
          }}>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
            }}>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderColor: "#C0FFD7",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
              ref={childRef}>
              <IconButton
                onPress={() => {
                  setVisible(false);
                  navigation.navigate("AddOfflineUser", {
                    reload: reload,
                    id: doc,
                  });
                }}
                LeftIcon={() => (
                  <SvgXml xml={edit} height={"20"} width={"20"} />
                )}
                style={{
                  borderWidth: 0,
                  justifyContent: "flex-start",
                  height: 40,
                }}
                title={`Edit ${selectUser}`}
              />
              <IconButton
                onPress={() => {
                  setAlertVisible(true);
                  setVisible(false);
                }}
                LeftIcon={() => (
                  <SvgXml xml={deleteIcon} height={"20"} width={"20"} />
                )}
                style={{
                  borderWidth: 0,
                  justifyContent: "flex-start",
                  height: 40,
                }}
                title={`Remove ${selectUser}`}
              />
            </View>
          </View>
        </OutsideView>
      </Modal>
    </TouchableOpacity>
  );
};
const edit = `<svg xmlns="http://www.w3.org/2000/svg" width="20.25" height="20.409" viewBox="0 0 20.25 20.409">
<path id="Path_28063" data-name="Path 28063" d="M16.862,4.487,18.549,2.8A1.875,1.875,0,0,1,21.2,5.451L10.582,16.07a4.5,4.5,0,0,1-1.9,1.13L6,18l.8-2.685a4.5,4.5,0,0,1,1.13-1.9l8.932-8.931Zm0,0L19.5,7.125M18,14v4.75A2.25,2.25,0,0,1,15.75,21H5.25A2.25,2.25,0,0,1,3,18.75V8.25A2.25,2.25,0,0,1,5.25,6H10" transform="translate(-2.25 -1.341)" fill="none" stroke="#4a4a4a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
</svg>
`;
export const AddOfflineUser = (props) => {
  const [backgroundImage, setBackgroundImage] = React.useState();
  const [image, setImage] = React.useState();
  const [Visible, setVisible] = React.useState(false);
  const [Name, setName] = React.useState();
  const [Gender, setGender] = React.useState();
  const [Phone, setPhone] = React.useState();
  const [Division, setDivision] = React.useState();
  const [District, setDistrict] = React.useState();
  const [Area, setArea] = React.useState();
  const [Address, setAddress] = React.useState();
  const [NewDistrictList, setDistrictList] = React.useState([]);
  const [NewAreaList, setAreaList] = React.useState([]);
  const reload = props.route.params.reload;
  const data = props.route.params.id;
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const navigation = props.navigation;
  const [Loader, setLoader] = React.useState(false);

  const searchDistrict = (value) => {
    if (value) {
      let arr = DistrictList.filter((d) => d.title === value);
      setDistrictList(arr[0].data);
    } else {
      setDistrictList([]);
    }
  };
  const searchArea = (value) => {
    if (value) {
      let arr = AreaList.filter((d) => d.title === value);
      setAreaList(arr[0].data);
    } else {
      setAreaList([]);
    }
  };
  React.useEffect(() => {
    if (data) {
      setName(data.name);
      setGender(data.gender);
      setPhone(data.phone);
      if (data.profilePhoto) {
        setImage({ uri: data.profilePhoto });
      }
      if (data.wallPhoto) {
        setBackgroundImage({ uri: data.wallPhoto });
      }
      setDivision(data.region);
      setDistrict(data.city);
      setArea(data.area);
      setAddress(data.address);
    }
  }, [data]);
  const confirm = async () => {
    setLoader(true);
    let profilePhoto = null;
    let wallPhoto = null;
    if (image) {
      let arr = [];
      arr.push(fileFromURL(image));
      profilePhoto = await uploadFile(arr, user.token);
      profilePhoto = profilePhoto[0];
    }
    if (backgroundImage) {
      let arr = [];
      arr.push(fileFromURL(backgroundImage));
      wallPhoto = await uploadFile(arr, user.token);
      wallPhoto = wallPhoto[0];
    }
    await createOfflineMembers(user.token, vendor.service.id, {
      name: Name,
      phone: Phone,
      gender: Gender,
      region: Division,
      city: District,
      area: Area,
      address: Address,
      profilePhoto: profilePhoto,
      wallPhoto: wallPhoto,
    })
      .then((res) => {
        setLoader(false);
        if (res) {
          //reload();
          navigation.goBack();
          return;
        }
        console.warn(res);
        return;
      })
      .catch((err) => {
        setLoader(false);
        console.warn(err);
      });
  };
  const save = async () => {
    setLoader(true);
    let profilePhoto = null;
    let wallPhoto = null;
    if (image) {
      if (!image.type) {
        profilePhoto = image.uri;
      } else {
        let arr = [];
        arr.push(fileFromURL(image));
        profilePhoto = await uploadFile(arr, user.token);
        profilePhoto = profilePhoto[0];
      }
    }
    if (backgroundImage) {
      if (!backgroundImage.type) {
        wallPhoto = backgroundImage.uri;
      } else {
        let arr = [];
        arr.push(fileFromURL(backgroundImage));
        wallPhoto = await uploadFile(arr, user.token);
        wallPhoto = wallPhoto[0];
      }
    }

    const d = {
      name: Name,
      phone: Phone,
      gender: Gender,
      region: Division,
      city: District,
      area: Area,
      address: Address,
      profilePhoto: profilePhoto,
      wallPhoto: wallPhoto,
      memberId: data.id,
      serviceId: vendor.service.id,
    };
    await updateOfflineMembers(user.token, d)
      .then((res) => {
        setLoader(false);
        if (res) {
          //reload();
          navigation.goBack();
          return;
        }
        console.warn(res);
        return;
      })
      .catch((err) => {
        setLoader(false);
        console.warn(err);
      });
  };
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {backgroundImage ? (
            <Image
              source={{ uri: backgroundImage.uri }}
              style={styles.backgroundContainer}
            />
          ) : (
            <LinearGradient
              style={styles.backgroundContainer}
              colors={["#983C85", "#983C85", "#983C53"]}></LinearGradient>
          )}

          <View style={styles.profile}>
            {image ? (
              <Image style={styles.image} source={{ uri: image.uri }} />
            ) : (
              <FontAwesome name="user" size={80} color="#983C85" />
            )}
            <View
              style={[
                styles.cameraIcon,
                {
                  top: -5,
                },
              ]}>
              <EvilIcons
                onPress={() => {
                  pickImage().then((result) => {
                    if (result) {
                      setImage(result);
                    }
                  });
                }}
                name="camera"
                size={24}
                color={backgroundColor}
              />
            </View>
          </View>
          <View
            style={[
              styles.cameraIcon,
              {
                top: 40,
                right: 10,
                height: 30,
                width: 30,
              },
            ]}>
            <EvilIcons
              onPress={() => {
                pickImage().then((result) => {
                  if (result) {
                    setBackgroundImage(result);
                  }
                });
              }}
              name="camera"
              size={30}
              color={backgroundColor}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: textColor,
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 20,
          }}>
          Member Information
        </Text>
        <Input
          value={Name}
          onChange={(val) => {
            setName(val);
          }}
          style={offlineStyles.input}
          placeholder="Member Name"
        />
        <DropDown
          value={Gender}
          onChange={(val) => {
            setGender(val);
          }}
          DATA={["Male", "Female", "Other"]}
          style={offlineStyles.dropdown}
          placeholder="Gender"
        />
        <Input
          value={Phone}
          onChange={(val) => {
            setPhone(val);
          }}
          keyboardType="numeric"
          style={offlineStyles.input}
          placeholder="Phone Number"
        />
        <IconButton
          onPress={() => {
            setVisible(!Visible);
          }}
          style={{
            color: textColor,
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 5,
          }}
          title={Visible ? "Less" : "More"}
        />
        {Visible && (
          <Animated.View entering={StretchInY}>
            <DropDown
              value={Division}
              DATA={DivisionList}
              onChange={(val) => {
                searchDistrict(val);
                setDivision(val);
              }}
              style={offlineStyles.dropdown}
              placeholder="Division"
            />
            <DropDown
              value={District}
              onChange={(val) => {
                searchArea(val);
                setDistrict(val);
              }}
              DATA={NewDistrictList}
              style={offlineStyles.dropdown}
              placeholder="District"
            />
            <DropDown
              value={Area}
              onChange={(val) => {
                setArea(val);
              }}
              DATA={NewAreaList}
              style={offlineStyles.dropdown}
              placeholder="Area"
            />
            <TextArea
              value={Address}
              onChange={(val) => {
                setAddress(val);
              }}
              style={offlineStyles.dropdown}
              placeholder="Your Address"
            />
          </Animated.View>
        )}
        <IconButton
          onPress={() => {
            if (data) {
              save();
            } else {
              confirm();
            }
          }}
          disabled={Name && Gender && Phone ? false : true}
          style={{
            backgroundColor:
              Name && Gender && Phone ? backgroundColor : "#707070",
            height: 45,
            borderRadius: 5,
            marginVertical: 10,
            marginHorizontal: 20,
            borderWidth: 0,
            color: Name && Gender && Phone ? "white" : "black",
          }}
          title={data ? "Save Changes" : "Add Member"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const offlineStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  dropdown: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  button: {},
});
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    //console.log(result);
    return result;
  }
  return null;
};
export const AddOnlineUser = ({ navigation, route }) => {
  const [Data, setData] = React.useState();
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(true);
  const [SearchValue, setSearchValue] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const [Message, setMessage] = React.useState(null);
  const data = route?.params?.data;
  const [All, setAll] = useState();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    //console.log(data)
    if (user) {
      fetch();
    }
  }, [user, isFocused]);
  const fetch = async () => {
    const { members } = await getOnlineUser(user.token, vendor.service.id);
    const { users } = await getRandomUser(user.token, vendor.service.id);
    let arr = [];
    users.map((doc) => {
      if (members?.filter((d) => d.userId == doc.id)?.length == 0) {
        arr.push(doc);
      } else {
        //console.log("d")
      }
    });

    setData(arr);
    setAll(arr);
  };

  React.useEffect(() => {
    setLoader(true);
    if (SearchValue) {
      getUserByName(user.token, SearchValue, vendor.service.id)
        .then((res) => {
          setLoader(false);
          if (res) {
            return setData(res.users);
          }
        })
        .catch((err) => {
          console.warn(err.response.data.msg);
        });
    } else {
      setData(All);
    }
  }, [SearchValue]);
  const sendRequest = (id) => {
    createOnlineUser(user.token, id, vendor.service.id)
      .then((res) => {
        if (res) {
          setMessage("Request has sent successful");
          return;
        }
      })
      .catch((err) => {
        setMessage(err.response.data.msg);
      });
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              marginVertical: 12,
            }}>
            Add Member
          </Text>
          <Input
            rightIcon={
              <SvgXml
                style={{
                  position: "absolute",
                  right: 12,
                  top: 10,
                }}
                xml={searchIcon}
                width="20"
                height={"20"}
              />
            }
            value={SearchValue}
            onChange={(val) => {
              setSearchValue(val);
            }}
            style={{
              borderRadius: 4,
              height: 32,
              backgroundColor: "#E6E6E6",
              marginHorizontal: 0,
              borderBottomWidth: 0,
            }}
            placeholder="Search By User"
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {Data ? (
            Data.map((doc, i) =>
              doc.id != user.user.id ? (
                <CartView
                  onChange={(val) => {
                    sendRequest(val);
                  }}
                  setMessage={setMessage}
                  doc={doc}
                  key={i}
                />
              ) : null
            )
          ) : (
            <View style={customStyle.fullBox}>
              <ActivityLoader />
            </View>
          )}
        </ScrollView>
        <Snackbar
          visible={Message}
          onDismiss={() => setMessage(null)}
          action={{
            label: "Ok",
            onPress: () => {
              setMessage(null);
            },
          }}>
          {Message}
        </Snackbar>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const CartView = ({ doc, onChange, setMessage }) => {
  const [Send, setSend] = React.useState(false);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  useEffect(() => {
    if (doc.alreadySentRequest) {
      setSend(true);
    } else {
      setSend(false);
    }
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        marginLeft: 20,
        alignItems: "center",
        borderBottomWidth: 0,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          height: "100%",
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#e5e5e5",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            margin: 0,
          }}>
          {doc.profilePhoto ? (
            <Image
              style={{
                height: 40,
                width: 40,
              }}
              source={{ uri: doc.profilePhoto }}
            />
          ) : (
            <FontAwesome name="user" size={25} color="#983C85" />
          )}
        </View>
        <View
          style={{
            marginLeft: 12,
            flexDirection: "row",
            flex: 1,
            height: "100%",
            borderBottomWidth: 1,
            alignItems: "center",
            paddingVertical: 12,
            borderBottomColor: "#E6E6E6",
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: "400",
              
              flex: 1,
            }}>
            {doc.name}
          </Text>
          {/* <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontFamily: "Poppins-Light",
              lineHeight: 15,
            }}>
            @{doc.username}
          </Text> */}
          <Pressable
            onPress={() => {
              if (Send) {
                cancelOnlineUser(user.token, doc.id, vendor.service.id)
                  .then((res) => {
                    setMessage("Request cancelled!");
                  })
                  .catch((err) => {
                    console.warn(err.response.data.message);
                  });
                setSend((val) => !val);
                return;
              }
              setSend((val) => !val);
              if (onChange) {
                onChange(doc.id);
              }
            }}
            style={{
              marginRight: 20,
              marginLeft: 20,
            }}
            title={Send ? "Undo" : "Send Request"}>
            <SvgXml
              xml={!Send ? contact : sendContact}
              width="20"
              height={"20"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const searchIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.74363 1.33398C4.20476 1.33398 1.33594 4.13945 1.33594 7.60016C1.33594 11.0609 4.20476 13.8663 7.74363 13.8663C9.25789 13.8663 10.6495 13.3527 11.7461 12.4938L13.8309 14.5273L13.8863 14.5739C14.0797 14.7139 14.3538 14.6979 14.5288 14.5264C14.7212 14.3377 14.7208 14.0321 14.5279 13.8439L12.4673 11.8341C13.5131 10.719 14.1513 9.23247 14.1513 7.60016C14.1513 4.13945 11.2825 1.33398 7.74363 1.33398ZM7.74105 2.29883C10.7348 2.29883 13.1618 4.67217 13.1618 7.59984C13.1618 10.5275 10.7348 12.9009 7.74105 12.9009C4.74726 12.9009 2.32031 10.5275 2.32031 7.59984C2.32031 4.67217 4.74726 2.29883 7.74105 2.29883Z" fill="#767676"/>
</svg>
`;
const contact = `<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 13.5C4.0396 13.5 0 16.86 0 21C0 21.28 0.217822 21.5 0.49505 21.5H17.505C17.7822 21.5 18 21.28 18 21C18 16.86 13.9604 13.5 9 13.5ZM12.6733 2.16002C12.2123 1.63641 11.6464 1.21767 11.0132 0.931495C10.3799 0.645323 9.69374 0.498252 9 0.500016C7.61386 0.500016 6.34653 1.07002 5.44554 2.01002C4.58416 2.91002 4.04951 4.15002 4.04951 5.50002C4.04951 6.44002 4.30693 7.32002 4.77228 8.07002C5.0198 8.50002 5.33663 8.89002 5.71287 9.21002C6.57426 10.01 7.72277 10.5 9 10.5C10.8119 10.5 12.3762 9.52002 13.2376 8.07002C13.4951 7.64002 13.6931 7.16002 13.802 6.66002C13.901 6.29002 13.9505 5.90002 13.9505 5.50002C13.9505 4.22002 13.4653 3.05002 12.6733 2.16002ZM10.8515 6.42002H9.93069V7.39002C9.93069 7.63932 9.83264 7.87841 9.6581 8.0547C9.48356 8.23098 9.24684 8.33002 9 8.33002C8.75317 8.33002 8.51644 8.23098 8.3419 8.0547C8.16736 7.87841 8.06931 7.63932 8.06931 7.39002V6.42002H7.14852C6.90168 6.42002 6.66495 6.32098 6.49042 6.1447C6.31588 5.96841 6.21782 5.72932 6.21782 5.48002C6.21782 5.23071 6.31588 4.99162 6.49042 4.81534C6.66495 4.63905 6.90168 4.54002 7.14852 4.54002H8.06931V3.65002C8.06931 3.40071 8.16736 3.16162 8.3419 2.98534C8.51644 2.80905 8.75317 2.71002 9 2.71002C9.24684 2.71002 9.48356 2.80905 9.6581 2.98534C9.83264 3.16162 9.93069 3.40071 9.93069 3.65002V4.54002H10.8515C11.0983 4.54002 11.335 4.63905 11.5096 4.81534C11.6841 4.99162 11.7822 5.23071 11.7822 5.48002C11.7822 5.72932 11.6841 5.96841 11.5096 6.1447C11.335 6.32098 11.0983 6.42002 10.8515 6.42002Z" fill="#4ADE80"/>
</svg>
`;
const sendContact = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12C4.0396 12 0 15.36 0 19.5C0 19.78 0.217822 20 0.49505 20H17.505C17.7822 20 18 19.78 18 19.5C18 15.36 13.9604 12 9 12ZM12.6733 1.66005C12.2123 1.13644 11.6464 0.717696 11.0132 0.431525C10.3799 0.145354 9.69374 -0.00171709 9 4.61871e-05C7.61386 4.61871e-05 6.34653 0.570046 5.44554 1.51005C4.58416 2.41005 4.04951 3.65005 4.04951 5.00005C4.04951 5.94005 4.30693 6.82005 4.77228 7.57005C5.0198 8.00005 5.33663 8.39005 5.71287 8.71005C6.57426 9.51005 7.72277 10 9 10C10.8119 10 12.3762 9.02005 13.2376 7.57005C13.4951 7.14005 13.6931 6.66005 13.802 6.16005C13.901 5.79005 13.9505 5.40005 13.9505 5.00005C13.9505 3.72005 13.4653 2.55005 12.6733 1.66005ZM10.8515 5.92005H7.14852C7.02629 5.92005 6.90527 5.89573 6.79235 5.84849C6.67944 5.80125 6.57684 5.73201 6.49042 5.64473C6.40399 5.55744 6.33544 5.45381 6.28867 5.33977C6.24189 5.22572 6.21782 5.10349 6.21782 4.98005C6.21782 4.8566 6.24189 4.73437 6.28867 4.62032C6.33544 4.50628 6.40399 4.40265 6.49042 4.31537C6.57684 4.22808 6.67944 4.15884 6.79235 4.1116C6.90527 4.06436 7.02629 4.04005 7.14852 4.04005H10.8515C10.9737 4.04005 11.0947 4.06436 11.2076 4.1116C11.3206 4.15884 11.4232 4.22808 11.5096 4.31537C11.596 4.40265 11.6646 4.50628 11.7113 4.62032C11.7581 4.73437 11.7822 4.8566 11.7822 4.98005C11.7822 5.10349 11.7581 5.22572 11.7113 5.33977C11.6646 5.45381 11.596 5.55744 11.5096 5.64473C11.4232 5.73201 11.3206 5.80125 11.2076 5.84849C11.0947 5.89573 10.9737 5.92005 10.8515 5.92005Z" fill="black" fill-opacity="0.87"/>
</svg>
`;
const threeDot = `<svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="2" cy="2" r="2" fill="black" fill-opacity="0.87"/>
<circle cx="2" cy="8" r="2" fill="black" fill-opacity="0.87"/>
<circle cx="2" cy="14" r="2" fill="black" fill-opacity="0.87"/>
</svg>
`;
const message = `<svg xmlns="http://www.w3.org/2000/svg" width="23.108" height="23.108" viewBox="0 0 23.108 23.108">
<g id="Group_17847" data-name="Group 17847" transform="translate(-7.496 -591)">
  <g id="Path_20915" data-name="Path 20915" transform="translate(18.539 591) rotate(45)" fill="none" stroke-linecap="round">
    <path d="M6.312,1.308a2.6,2.6,0,0,1,4.509,0l5.912,10.346c.989,1.731-.378,4.461-2.254,3.885l-5.832-2.2-5.991,2.2C.291,15.727-.589,13.385.4,11.654Z" stroke="none"/>
    <path d="M 8.566041946411133 1.000003814697266 C 7.985912322998047 1.000003814697266 7.467731475830078 1.300713539123535 7.179911613464355 1.804403305053711 L 1.268181800842285 12.1499137878418 C 0.9354915618896484 12.73212337493896 0.9091224670410156 13.43331336975098 1.20100212097168 13.93628311157227 C 1.433701515197754 14.33727359771729 1.844781875610352 14.54922389984131 2.389811515808105 14.54922389984131 C 2.409385681152344 14.54922389984131 2.429207801818848 14.5489501953125 2.449225425720215 14.54840755462646 L 8.650311470031738 12.26754379272461 L 14.79606056213379 14.58973789215088 C 14.86165237426758 14.60779190063477 14.92520141601562 14.61693382263184 14.98531150817871 14.61693382263184 C 15.40178203582764 14.61693382263184 15.69804191589355 14.16220378875732 15.77892208099365 14.02283382415771 C 16.12163162231445 13.43227386474609 16.15658187866211 12.6621036529541 15.86390209197998 12.1499137878418 L 9.952181816101074 1.804403305053711 C 9.664352416992188 1.300713539123535 9.146171569824219 1.000003814697266 8.566041946411133 1.000003814697266 M 8.566042900085449 9.5367431640625e-07 C 9.444036483764648 9.5367431640625e-07 10.32203197479248 0.4360885620117188 10.82042217254639 1.308263778686523 L 16.73214149475098 11.65377330780029 C 17.72126197814941 13.38473320007324 16.35443687438965 16.11475372314453 14.47776222229004 15.53847312927246 L 8.645611763000488 13.33477401733398 L 2.654321670532227 15.53847312927246 C 0.2913322448730469 15.72747230529785 -0.5891780853271484 13.38473415374756 0.3999423980712891 11.65377330780029 L 6.311672210693359 1.308263778686523 C 6.810056686401367 0.4360885620117188 7.68804931640625 9.5367431640625e-07 8.566042900085449 9.5367431640625e-07 Z" stroke="none" fill="#4a4a4a"/>
  </g>
  <line id="Line_5970" data-name="Line 5970" y1="3.989" transform="translate(18.166 603.625) rotate(45)" fill="none" stroke="#4a4a4a" stroke-linecap="round" stroke-width="0.5"/>
</g>
</svg>
`;
const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21.25" viewBox="0 0 17 21.25">
<g id="_000000ff" data-name="#000000ff" transform="translate(0)">
  <path id="Path_28040" data-name="Path 28040" d="M18.4,0h4.381a2.045,2.045,0,0,1,1.56.842,3.121,3.121,0,0,1,.395,1.748,24.1,24.1,0,0,1,2.9.068,1.889,1.889,0,0,1,1.284,2.611,2.222,2.222,0,0,1-1.2,1.076c-.008,4.081.008,8.163-.008,12.243a2.609,2.609,0,0,1-2.286,2.661H15.8a2.505,2.505,0,0,1-1.845-1.071,3.416,3.416,0,0,1-.493-2.077c.01-3.918,0-7.836,0-11.754a2.192,2.192,0,0,1-1.25-1.182,1.885,1.885,0,0,1,1.332-2.508,24.369,24.369,0,0,1,2.893-.068,3.112,3.112,0,0,1,.4-1.75A2.037,2.037,0,0,1,18.4,0m-.65,1.27c-.369.33-.285.872-.315,1.315,2.1.008,4.2,0,6.3,0,.048-.581-.015-1.375-.69-1.546-1.3-.116-2.618-.012-3.927-.051-.457.025-1.009-.088-1.368.277m-4.165,2.4a.891.891,0,0,0,.306,1.685c4.256.046,8.518,0,12.776.023.385-.017.836.05,1.144-.241a.891.891,0,0,0,.007-1.315,1.144,1.144,0,0,0-.832-.239q-6.313,0-12.625,0a2.437,2.437,0,0,0-.775.09m.867,2.7q0,5.947,0,11.893a1.987,1.987,0,0,0,.591,1.634,2.1,2.1,0,0,0,1.452.357c2.9-.017,5.806.017,8.708-.015a1.581,1.581,0,0,0,1.515-1.653c.029-4.072,0-8.143.013-12.215Q20.586,6.368,14.447,6.373Z" transform="translate(-12.085)" fill="#4a4a4a"/>
  <path id="Path_28041" data-name="Path 28041" d="M43.409,46.631a.515.515,0,0,1,.844.451c.018,3.079.008,6.162.005,9.243.05.361-.275.777-.654.618-.341-.089-.347-.505-.352-.787q.005-4.367,0-8.735A1.379,1.379,0,0,1,43.409,46.631Z" transform="translate(-38.152 -38.931)" fill="#4a4a4a"/>
  <path id="Path_28042" data-name="Path 28042" d="M61.161,46.586a.5.5,0,0,1,.789.455c.027,3.032,0,6.067.013,9.1,0,.287-.017.7-.364.785-.371.153-.691-.258-.641-.613-.015-2.969,0-5.939-.008-8.909C60.972,47.132,60.916,46.774,61.161,46.586Z" transform="translate(-52.956 -38.911)" fill="#4a4a4a"/>
  <path id="Path_28043" data-name="Path 28043" d="M78.771,46.655a.518.518,0,0,1,.864.448c.018,3.022,0,6.046.008,9.071-.007.28-.01.686-.347.775-.378.164-.713-.255-.658-.619-.012-2.967,0-5.934-.008-8.9A1.474,1.474,0,0,1,78.771,46.655Z" transform="translate(-67.744 -38.938)" fill="#4a4a4a"/>
</g>
</svg>
`;
const whiteContact = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.8665 0.748522C8.75114 0.584002 9.66495 0.694658 10.4847 1.06557C11.3045 1.43649 11.9909 2.04983 12.4513 2.82292C12.9118 3.59601 13.1241 4.49167 13.0597 5.38917C12.9953 6.28667 12.6573 7.14286 12.0913 7.84231C11.5252 8.54177 10.7583 9.05086 9.89399 9.30097C9.02964 9.55107 8.10939 9.53016 7.25729 9.24106C6.40519 8.95195 5.66222 8.40856 5.12852 7.68411C4.59482 6.95967 4.29605 6.08902 4.2725 5.18952C4.24631 4.14299 4.59361 3.12133 5.25217 2.30757C5.91072 1.49381 6.83751 0.941123 7.8665 0.748522ZM7.8955 2.00652C7.27684 2.16395 6.72034 2.50501 6.29925 2.98481C5.87816 3.46461 5.61221 4.06067 5.53641 4.69453C5.4606 5.32839 5.57849 5.97035 5.87456 6.53591C6.17063 7.10148 6.631 7.56416 7.19509 7.86304C7.75918 8.16192 8.40054 8.283 9.03477 8.21036C9.669 8.13771 10.2664 7.87473 10.7483 7.45603C11.2302 7.03734 11.574 6.48255 11.7345 5.86468C11.895 5.24681 11.8647 4.59482 11.6475 3.99452C11.3788 3.25773 10.8465 2.6467 10.1535 2.27951C9.46053 1.91233 8.65603 1.81507 7.8955 2.00652Z" fill="white"/>
<path d="M16.4495 5.57152C16.5015 5.45735 16.5874 5.36197 16.6956 5.29833C16.8037 5.2347 16.9288 5.20589 17.0539 5.21583C17.1789 5.22577 17.2979 5.27398 17.3946 5.35389C17.4914 5.43381 17.5611 5.54156 17.5945 5.66252C17.6437 6.26788 17.6551 6.87573 17.6285 7.48252C18.2262 7.45726 18.825 7.46761 19.4215 7.51352C19.6335 7.54152 19.7445 7.76152 19.9025 7.88352V8.28351C19.7675 8.44951 19.6235 8.65152 19.4025 8.68352C18.8135 8.72613 18.2225 8.73548 17.6325 8.71152C17.6636 9.33746 17.6483 9.96485 17.5865 10.5885C17.5402 10.7069 17.4582 10.8078 17.3518 10.8774C17.2455 10.9469 17.1201 10.9816 16.9931 10.9765C16.8661 10.9715 16.7439 10.9269 16.6434 10.8492C16.5429 10.7714 16.4692 10.6642 16.4325 10.5425C16.3828 9.9335 16.3718 9.32193 16.3995 8.71152C15.781 8.73955 15.1613 8.72652 14.5445 8.67251C14.4273 8.63195 14.3252 8.55685 14.2515 8.45711C14.1778 8.35737 14.1361 8.23766 14.1317 8.11374C14.1274 7.98981 14.1607 7.86748 14.2272 7.76284C14.2938 7.6582 14.3904 7.57616 14.5045 7.52752C15.1355 7.45997 15.7708 7.44291 16.4045 7.47652C16.3656 6.84139 16.3806 6.2041 16.4495 5.57152Z" fill="white"/>
<path d="M2.45247 12.7945C3.62909 11.5496 5.152 10.6861 6.82443 10.3157C8.49687 9.94522 10.242 10.0848 11.8342 10.7164C13.4265 11.348 14.7928 12.4426 15.7565 13.8588C16.7203 15.2749 17.2372 16.9476 17.2405 18.6605C17.2835 19.1545 16.7575 19.3605 16.3405 19.3155C11.5405 19.3155 6.74047 19.3155 1.94047 19.3155C1.31847 19.2955 0.597473 19.4575 0.0974731 18.9645V18.4395C0.165029 16.333 1.00296 14.3245 2.45247 12.7945ZM3.71647 13.2945C2.36442 14.5423 1.52228 16.2465 1.35247 18.0785C6.23247 18.0785 11.1138 18.0785 15.9965 18.0785C15.8843 16.929 15.5123 15.8201 14.9085 14.8355C14.3412 13.9171 13.5781 13.1354 12.6737 12.5462C11.7692 11.957 10.7458 11.5749 9.6765 11.4272C8.60722 11.2795 7.51851 11.3698 6.4882 11.6918C5.45789 12.0137 4.51143 12.5593 3.71647 13.2895V13.2945Z" fill="white"/>
<path d="M7.8965 2.00652C8.54379 1.84195 9.22658 1.8865 9.847 2.13379C10.4674 2.38109 10.9936 2.81843 11.3503 3.38314C11.7069 3.94786 11.8756 4.61097 11.8322 5.27745C11.7888 5.94394 11.5356 6.57958 11.1088 7.0933C10.6819 7.60702 10.1035 7.97245 9.45622 8.13723C8.80897 8.302 8.12617 8.25766 7.50567 8.01057C6.88517 7.76347 6.35881 7.32629 6.00202 6.76168C5.64523 6.19708 5.47632 5.53402 5.5195 4.86752C5.56494 4.2014 5.81903 3.5665 6.24571 3.05294C6.67239 2.53939 7.24997 2.17326 7.8965 2.00652Z" fill="white"/>
<path d="M3.71648 13.2885C4.5111 12.5581 5.45727 12.0122 6.48737 11.6898C7.51746 11.3675 8.60604 11.2767 9.6753 11.4239C10.7446 11.5712 11.7681 11.9528 12.6727 12.5415C13.5774 13.1302 14.3408 13.9115 14.9085 14.8295C15.5123 15.814 15.8844 16.923 15.9965 18.0725C11.1145 18.0725 6.23314 18.0725 1.35248 18.0725C1.52229 16.2405 2.36443 14.5363 3.71648 13.2885Z" fill="white"/>
</svg>
`;
