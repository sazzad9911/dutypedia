import React from "react";
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
} from "../../Class/member";
import { fileFromURL } from "../../action";
import { uploadFile } from "../../Class/upload";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import IconButton from "../../components/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
const {width,height}=Dimensions.get("window")

const Member = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      >
        <Tab.Screen name="Dutypedia User" component={DutyPediaUser} />
        <Tab.Screen name="Offline User" component={OfflineUser} />
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
          console.log(res);
          setData(res.members);
          setAllData(res.members);
        }
      });
    }
  }, [Refresh]);
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
    <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Input
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
        }}
        placeholder="search"
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddOnlineUser", {
            onChange: onChange,
          });
        }}
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
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          alignItems: "center",
          marginVertical: 10,
          backgroundColor: backgroundColor,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "white",
            margin: 10,
          }}
        >
          S/N
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "white",
            margin: 10,
          }}
        >
          Member
        </Text>
      </View>
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
  );
};
const OnlineCart = ({ doc, i, reload, onPress }) => {
  const [AlertVisible, setAlertVisible] = React.useState(false);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);

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
        marginVertical: 5,
        marginHorizontal: 20,
        backgroundColor: "#e5e5e5",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Medium",
            color: textColor,
            margin: 10,
          }}
        >
          {i + 1 < 10 ? "0" + (i + 1) : i + 1}
        </Text>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5,
            backgroundColor: "#f5f5f5",
          }}
        >
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
        </View>
        <Text
          numberOfLines={1}
          style={{
            marginLeft: 10,
            fontSize: 15,
            fontFamily: "Poppins-Medium",
          }}
        >
          {doc.user.firstName
            ? doc.user.firstName + " " + doc.user.lastName
            : "Easin Arafat"}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Feather name="send" size={22} color={backgroundColor} />
        <View style={{ width: 15 }} />
        <AntDesign
          onPress={() => {
            setAlertVisible(true);
          }}
          name="delete"
          size={22}
          color={backgroundColor}
        />
        <View style={{ width: 10 }} />
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
    <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Input
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
        }}
        placeholder="search"
      />
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate("AddNotice", {
          //   onChange: onChange,
          //   value: null,
          // });
          navigation.navigate("AddOfflineUser", {
            reload: reload,
            id: null,
          });
        }}
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
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          alignItems: "center",
          marginVertical: 10,
          backgroundColor: backgroundColor,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "white",
            margin: 10,
          }}
        >
          S/N
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "white",
            margin: 10,
          }}
        >
          Member
        </Text>
      </View>
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
  );
};
const OfflineCart = ({ doc, i, navigation, reload, onPress }) => {
  const [Visible, setVisible] = React.useState(false);
  const [AlertVisible, setAlertVisible] = React.useState(false);
  const user = useSelector((state) => state.user);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20,
        backgroundColor: "#e5e5e5",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Medium",
            color: textColor,
            margin: 10,
          }}
        >
          {i + 1 < 10 ? "0" + (i + 1) : i + 1}
        </Text>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5,
            backgroundColor: "#f5f5f5",
          }}
        >
          {doc.profilePhoto ? (
            <Image
              style={{
                height: 40,
                width: 40,
              }}
              source={{ uri: doc.profilePhoto }}
            />
          ) : (
            <FontAwesome name="user" size={30} color="#983C85" />
          )}
        </View>
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
                setVisible(true);
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
              //setAlertVisible(true);
              //setVisible(false);
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
    console.log(result);
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
            value={SearchValue}
            onChange={(val) => {
              setSearchValue(val);
            }}
            style={{
              borderWidth: 1,
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

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
        marginHorizontal: 20,
        alignItems: "center",
        borderBottomWidth: 1,
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
            marginLeft: 5,
            width:width-230
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
          onPress={() => {
            setSend(true);
            if (onChange) {
              onChange(doc.id);
            }
          }}
          disabled={Send ? true : false}
          style={{
            borderRadius: 5,
            backgroundColor: Send ? "#707070" : backgroundColor,
            borderWidth: 0,
            color: Send ? "black" : "white",
            width:110,
            fontSize:14,
          }}
          title={Send ? "Request Sent" : "Add Member"}
        />
      
    </View>
  );
};
