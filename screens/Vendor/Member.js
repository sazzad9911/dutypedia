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
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import OutsideView from "react-native-detect-press-outside";
const { width, height } = Dimensions.get("window");

const Member = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#4ADE80",
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{ color: focused ? "#4ADE80" : "#333333", fontSize: 16 }}
              >
                Dutypedia User
              </Text>
            ),
          }}
          name="Dutypedia User"
          component={DutyPediaUser}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color, size }) => (
              <Text
                style={{ color: focused ? "#4ADE80" : "#333333", fontSize: 16 }}
              >
                Offline User
              </Text>
            ),
          }}
          name="Offline User"
          component={OfflineUser}
        />
      </Tab.Navigator>
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
  const [AllData, setAllData] = React.useState([]);
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
  }, [Refresh]);
  const search = (val) => {
    let arr = AllData.filter((d) => {
      if (d.user.username.toUpperCase().match(val.toUpperCase())) {
        return d;
      }
    });
    return arr;
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading..</Text>
      </View>
    );
  }
  if (Array.isArray(AllData) && AllData.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddOnlineUser", {
              onChange: onChange,
            });
          }}
          style={{
            width: 80,
            height: 80,
            backgroundColor: primaryColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <AntDesign name="plus" size={50} color="#707070" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Poppins-Medium",
            color: textColor,
            marginTop: 15,
          }}
        >
          Create New Member
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
        {/* <TouchableOpacity
        
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins-Medium",
            }}
          >
            Add Member
          </Text>
          <View style={{ width: 10 }} />
          <AntDesign name="pluscircleo" size={24} color={backgroundColor} />
        </View>
      </TouchableOpacity> */}

        {Loader ? (
          <Text style={{ marginTop: 10, textAlign: "center" }}>Loading...</Text>
        ) : (
          Data.map((doc, i) => (
            <OnlineCart
              onPress={() => {
                navigation.navigate("UserProfile", { user: doc });
              }}
              doc={doc}
              i={i}
              key={i}
              reload={onChange}
            />
          ))
        )}
        <View style={{ height: 10 }} />
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate("AddOnlineUser", {
            onChange: onChange,
          });
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
        }}
      >
        <SvgXml xml={whiteContact} height={"20"} width={"20"} />
      </Pressable>
    </View>
  );
};

const OnlineCart = ({ doc, i, reload, onPress }) => {
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
    <TouchableOpacity onPress={() => {
      if (onPress) {
        onPress();
      }
    }}
     
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          
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
          }}
        >
          {doc.user.profilePhoto ? (
            <Image
              style={{
                height: 50,
                width: 50,
              }}
              source={{ uri: doc.user.profilePhoto }}
            />
          ) : (
            <FontAwesome name="user" size={30} color="#983C85" />
          )}
        </Pressable>
        <View>
          <Text
            numberOfLines={1}
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontFamily: "Poppins-Medium",
            }}
          >
            {doc.user.firstName
              ? doc.user.firstName + " " + doc.user.lastName
              : "Easin Arafat"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginLeft: 10,
              fontSize: 14,
              fontFamily: "Poppins-Medium",
            }}
          >
            {totalOrder > 0 ? `${totalOrder} Orders` : "No Order Yet"}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          setModalVisible((val) => !val);
          setSelectUser(`${doc.user.firstName} ${doc.user.lastName}`);
        }}
        style={{ flexDirection: "row" }}
      >
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
        <SvgXml xml={threeDot} height="20" width={"20"} />
        <View style={{ width: 10 }} />
      </Pressable>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={AlertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
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
        onRequestClose={() => setModalVisible(false)}
      >
        <OutsideView
          childRef={childRef}
          onPressOutside={() => {
            // handle press outside of childRef event
            setModalVisible((val) => !val);
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderColor: "#C0FFD7",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              ref={childRef}
            >
              <IconButton
                onPress={() => {
                  setModalVisible(false);
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
                title={`Remove Message To ${selectUser}`}
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
  const [AllData, setAllData] = React.useState([]);
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
  }, [Reload + vendor + user + Refresh]);
  const search = (val) => {
    let arr = AllData.filter((d) => {
      if (d.name.toUpperCase().match(val.toUpperCase())) {
        return d;
      }
    });
    return arr;
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading..</Text>
      </View>
    );
  }
  if (Array.isArray(AllData) && AllData.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddOfflineUser", {
              reload: reload,
              id: null,
            });
          }}
          style={{
            width: 80,
            height: 80,
            backgroundColor: primaryColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <AntDesign name="plus" size={50} color="#707070" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Poppins-Medium",
            color: textColor,
            marginTop: 15,
          }}
        >
          Create New Member
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          {Loader ? (
            <Text style={{ textAlign: "center" }}>Loading...</Text>
          ) : (
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
            ))
          )}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate("AddOfflineUser", {
            reload: reload,
            id: null,
          });
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
        }}
      >
        <SvgXml xml={whiteContact} height={"20"} width={"20"} />
      </Pressable>
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
      }}
    >
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
          }}
        >
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
            }}
          >
            {doc.name ? doc.name : "Easin Arafat"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginLeft: 10,
              fontSize: 13,
              fontFamily: "Poppins-Medium",
            }}
          >
            {totalOrder > 0 ? `${totalOrder} Orders` : "No Order Yet"}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 10 }} />
       
        <Menu
          contentStyle={{
            backgroundColor: primaryColor,
          }}
          visible={Visible}
          onDismiss={() => setVisible(!Visible)}
          anchor={
            <Entypo
            onPress={() => {
              setVisible((val) => !val);
              setSelectUser(`${doc.name}`);
            }}
            name="dots-three-vertical"
            size={24}
            color={"#707070"}
          />
          }
        >
          <Menu.Item
            onPress={() => {
              setVisible(false);
              navigation.navigate("AddOfflineUser", {
                reload: reload,
                id: doc,
              });
            }}
            title="Edit"
          />
          <Menu.Item
            onPress={() => {
              setAlertVisible(true);
              setVisible(false);
            }}
            title="Delete"
          />
          <Menu.Item
            onPress={() => {
              // setAlertVisible(true);
              // setVisible(false);
            }}
            title="View Profile"
          />
        </Menu>
      </View>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={AlertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
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
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={Visible}
        onRequestClose={() => setVisible(false)}
      >
        <OutsideView
          childRef={childRef}
          onPressOutside={() => {
            // handle press outside of childRef event
            setVisible((val) => !val);
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderColor: "#C0FFD7",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              ref={childRef}
            >
              <IconButton
                onPress={() => {
                  setVisible(false);
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
                title={`Remove Message To ${selectUser}`}
              />
            </View>
          </View>
        </OutsideView>
      </Modal> */}
    </TouchableOpacity>
  );
};
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
          reload();
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
          reload();
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
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
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
              colors={["#983C85", "#983C85", "#983C53"]}
            ></LinearGradient>
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
              ]}
            >
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
            ]}
          >
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
          }}
        >
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
export const AddOnlineUser = () => {
  const [Data, setData] = React.useState([]);
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(true);
  const [SearchValue, setSearchValue] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const [Message, setMessage] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      getRandomUser(user.token, vendor.service.id)
        .then((res) => {
          if (res) {
            setLoader(false);
            //console.log(res.users)
            return setData(res.users);
          }
        })
        .catch((err) => {
          console.warn(err.response.data.msg);
        });
    }
  }, [user]);

  React.useEffect(() => {
    setLoader(true);
    if (SearchValue) {
      getUserByName(user.token, SearchValue)
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
      getRandomUser(user.token, vendor.service.id)
        .then((res) => {
          if (res) {
            setLoader(false);
            return setData(res.users);
          }
        })
        .catch((err) => {
          console.warn(err.response.data.msg);
        });
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            paddingVertical: 10,
            alignItems: "center",
            borderBottomColor: "#E2E2E2",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Dutypedia User
          </Text>
        </View>
        <View style={{ height: 5, backgroundColor: primaryColor }} />
        <View
          style={{
            backgroundColor: primaryColor,
            paddingBottom: 5,
            shadowOffset: {
              height: 1,
              width: 1,
            },
            elevation: 1,
            shadowRadius: 1,
          }}
        >
          <Input
            rightIcon={
              <SvgXml
                style={{
                  position: "absolute",
                  right: 35,
                  top: 18,
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
              borderWidth: 1,
              height: 42,
              borderRadius: 20,
            }}
            placeholder="Search"
          />
        </View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {!Loader ? (
            Data.map((doc, i) =>
              doc.id != user.user.id ? (
                <CartView
                  onChange={(val) => {
                    sendRequest(val);
                  }}
                  doc={doc}
                  key={i}
                />
              ) : (
                <View key={i}></View>
              )
            )
          ) : (
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Loading...
            </Text>
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
          }}
        >
          {Message}
        </Snackbar>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const CartView = ({ doc, onChange }) => {
  const [Send, setSend] = React.useState(false);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
        marginHorizontal: 20,
        alignItems: "center",
        borderBottomWidth: 0,
        borderBottomColor: "#e5e5e5",
        paddingBottom: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#e5e5e5",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            margin: 5,
          }}
        >
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
        <View
          style={{
            marginLeft: 0,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              lineHeight: 20,
            }}
          >
            {doc.firstName + " " + doc.lastName}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontFamily: "Poppins-Light",
              lineHeight: 15,
            }}
          >
            @{doc.username}
          </Text>
        </View>
      </View>
      <IconButton
        LeftIcon={() => <SvgXml xml={contact} width="20" height={"20"} />}
        onPress={() => {
          if (Send) {
            cancelOnlineUser(user.token, doc.id, vendor.service.id)
              .then((res) => {})
              .catch((err) => {
                console.warn(err.response.data.message);
              });
          }
          setSend((val) => !val);
          if (onChange) {
            onChange(doc.id);
          }
        }}
        style={{
          borderRadius: 5,
          borderWidth: 1,
          color: "black",
          height: 40,
          fontSize: 14,
          borderColor: "#C0FFD7",
          width: 140,
        }}
        title={Send ? "Undo" : "Send Request"}
      />
    </View>
  );
};
const searchIcon = `<svg id="__TEMP__SVG__" xmlns="http://www.w3.org/2000/svg" width="13.985" height="14" viewBox="0 0 13.985 14">
<path id="Path_27799" data-name="Path 27799" d="M9.018,3.9A4.791,4.791,0,1,1,4.231,8.688,4.791,4.791,0,0,1,9.018,3.9m0-.9a5.688,5.688,0,1,0,5.688,5.688A5.688,5.688,0,0,0,9.018,3Z" transform="translate(-3.33 -3)" fill="#ff007f"/>
<path id="Path_27800" data-name="Path 27800" d="M30.056,29.117,26.831,25.87l-.621.617,3.225,3.247a.438.438,0,0,0,.621-.617Z" transform="translate(-16.199 -15.863)" fill="#ff007f"/>
</svg>
`;
const contact = `<svg xmlns="http://www.w3.org/2000/svg" width="13.761" height="12.966" viewBox="0 0 13.761 12.966">
<g id="_6324958" data-name="6324958" transform="translate(0 -3.742)">
  <g id="_000000ff" data-name="#000000ff" transform="translate(0 3.742)">
    <path id="Path_28035" data-name="Path 28035" d="M29.455,3.8a3.057,3.057,0,1,1-2.5,3.085,3.061,3.061,0,0,1,2.5-3.085m.02.874a2.2,2.2,0,1,0,2.607,1.381A2.2,2.2,0,0,0,29.475,4.675Z" transform="translate(-24.057 -3.742)" fill="#4ade80"/>
    <path id="Path_28036" data-name="Path 28036" d="M92.279,33.4a.425.425,0,0,1,.8.063,10.124,10.124,0,0,1,.024,1.264,10.474,10.474,0,0,1,1.246.021c.147.019.225.172.334.257v.281c-.094.115-.193.256-.35.28a10.911,10.911,0,0,1-1.23.019,8.794,8.794,0,0,1-.032,1.3.425.425,0,0,1-.8-.032,10.044,10.044,0,0,1-.023-1.272,9.726,9.726,0,0,1-1.289-.027.426.426,0,0,1-.028-.8,8.281,8.281,0,0,1,1.317-.035A7.817,7.817,0,0,1,92.279,33.4Z" transform="translate(-80.918 -29.994)" fill="#4ade80"/>
    <path id="Path_28037" data-name="Path 28037" d="M1.636,66.675a5.95,5.95,0,0,1,10.274,4.076c.03.343-.335.488-.622.455q-5,0-10,0c-.438-.015-.942.1-1.286-.245V70.6a5.981,5.981,0,0,1,1.636-3.922m.878.344A5.173,5.173,0,0,0,.872,70.343q5.086,0,10.174,0a5.292,5.292,0,0,0-.756-2.253,5.091,5.091,0,0,0-7.776-1.071Z" transform="translate(0 -58.247)" fill="#4ade80"/>
  </g>
  <g id="_5eac24ff" data-name="#5eac24ff" transform="translate(0.872 4.603)">
    <path id="Path_28038" data-name="Path 28038" d="M36.634,11.822a2.2,2.2,0,1,1-1.651,1.988A2.208,2.208,0,0,1,36.634,11.822Z" transform="translate(-32.088 -11.75)" fill="#4ade80"/>
    <path id="Path_28039" data-name="Path 28039" d="M9.753,74.173a5.091,5.091,0,0,1,7.776,1.071,5.292,5.292,0,0,1,.756,2.253q-5.088,0-10.174,0A5.173,5.173,0,0,1,9.753,74.173Z" transform="translate(-8.11 -66.262)" fill="#4ade80"/>
  </g>
</g>
</svg>
`;
const threeDot = `<svg xmlns="http://www.w3.org/2000/svg" width="16.227" height="4.127" viewBox="0 0 16.227 4.127">
<g id="Group_17843" data-name="Group 17843" transform="translate(-1685.67 141.407)">
  <g id="_000000ff" data-name="#000000ff" transform="translate(1701.896 -340.568) rotate(90)">
    <path id="Path_6118" data-name="Path 6118" d="M201.177,0h.1A2.08,2.08,0,0,1,202.6.52a2.063,2.063,0,1,1-2.734,0A2.081,2.081,0,0,1,201.177,0Z" transform="translate(-0.007)" fill="#666"/>
    <path id="Path_6119" data-name="Path 6119" d="M200.991,199.166a2.063,2.063,0,1,1-1.563,1.044A2.066,2.066,0,0,1,200.991,199.166Z" transform="translate(-0.006 -193.102)" fill="#666"/>
    <path id="Path_6120" data-name="Path 6120" d="M199.8,398.823a2.064,2.064,0,1,1,2.788,3.043,2.082,2.082,0,0,1-1.314.52h-.1a2.067,2.067,0,0,1-2.013-2.107A2.058,2.058,0,0,1,199.8,398.823Z" transform="translate(0 -386.158)" fill="#666"/>
  </g>
</g>
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
const whiteContact = `<svg xmlns="http://www.w3.org/2000/svg" width="19.806" height="18.662" viewBox="0 0 19.806 18.662">
<g id="_6324958" data-name="6324958" transform="translate(0 -3.742)">
  <g id="_000000ff" data-name="#000000ff" transform="translate(0 3.742)">
    <path id="Path_28035" data-name="Path 28035" d="M30.553,3.827a4.4,4.4,0,1,1-3.594,4.441,4.406,4.406,0,0,1,3.594-4.441m.029,1.258a3.161,3.161,0,1,0,3.752,1.988A3.17,3.17,0,0,0,30.582,5.085Z" transform="translate(-22.784 -3.742)" fill="#fff"/>
    <path id="Path_28036" data-name="Path 28036" d="M92.988,33.513a.611.611,0,0,1,1.145.091,14.571,14.571,0,0,1,.034,1.82,15.075,15.075,0,0,1,1.793.031c.212.028.323.248.481.37v.4c-.135.166-.279.368-.5.4a15.7,15.7,0,0,1-1.77.028,12.657,12.657,0,0,1-.046,1.877.611.611,0,0,1-1.154-.046,14.454,14.454,0,0,1-.033-1.831,14,14,0,0,1-1.855-.039.614.614,0,0,1-.04-1.145,11.92,11.92,0,0,1,1.9-.051A11.25,11.25,0,0,1,92.988,33.513Z" transform="translate(-76.636 -28.605)" fill="#fff"/>
    <path id="Path_28037" data-name="Path 28037" d="M2.355,67.493a8.564,8.564,0,0,1,14.788,5.866c.043.494-.483.7-.9.655q-7.2,0-14.4,0C1.221,73.994.5,74.156,0,73.663v-.525a8.609,8.609,0,0,1,2.355-5.645m1.264.5a7.445,7.445,0,0,0-2.364,4.784q7.32,0,14.644,0a7.618,7.618,0,0,0-1.088-3.243A7.328,7.328,0,0,0,3.619,67.988Z" transform="translate(0 -55.362)" fill="#fff"/>
  </g>
  <g id="_5eac24ff" data-name="#5eac24ff" transform="translate(1.255 4.981)">
    <path id="Path_28038" data-name="Path 28038" d="M37.363,11.854a3.163,3.163,0,1,1-2.377,2.861A3.178,3.178,0,0,1,37.363,11.854Z" transform="translate(-30.819 -11.75)" fill="#fff"/>
    <path id="Path_28039" data-name="Path 28039" d="M10.474,74.764a7.328,7.328,0,0,1,11.192,1.541,7.617,7.617,0,0,1,1.088,3.243q-7.323,0-14.644,0A7.445,7.445,0,0,1,10.474,74.764Z" transform="translate(-8.11 -63.378)" fill="#fff"/>
  </g>
</g>
</svg>
`;
