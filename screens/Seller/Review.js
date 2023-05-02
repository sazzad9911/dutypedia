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
  Alert, 
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  backgroundColor,
  assentColor,
  secondaryColor,
  textColor,
} from "./../../assets/colors.js";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "./../../components/Button";
import RatingView from "./../../components/RatingView";
import { brain, flag, info, star, user, verified } from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "./../../Cart/ReviewCart";
import RelatedService from "./../../Cart/RelatedService";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox } from "../../screens/Seller/Pricing";
import { Badge } from "react-native-paper";
import ProfileOption from "./../../components/ProfileOption";
import { fileFromURL } from "./../../action";
import { uploadFile } from "../../Class/upload";
import { createService, getService, getDashboard } from "../../Class/service";
import { StackActions } from "@react-navigation/native";
import { localOptionsToServer } from "../../Class/dataConverter";
import { vendorLogin } from "../../Class/auth.js";
import IconButton from "../../components/IconButton.js";
import Carousel from "react-native-reanimated-carousel";


const { width, height } = Dimensions.get("window");
const Review = (props) => {
  const window = Dimensions.get("window");
  const [profileImage, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [Lines, setLines] = React.useState(2);
  const navigation = props.navigation;
  const businessForm = useSelector((state) => state.businessForm);
  const listData = useSelector((state) => state.listData);
  const [NewLines, setNewLines] = React.useState(4);
  const [ServiceList, setServiceList] = React.useState([]);
  const [ActiveService, setActiveService] = React.useState();
  const [SubServiceList, setSubServiceList] = React.useState([]);
  const [ButtonPress, setButtonPress] = React.useState(false);
  const [Images, setImages] = React.useState([]);
  const newUser = useSelector((state) => state.user);
  const [Loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [Id, setId] = React.useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      return result.assets[0];
    }
    return null;
  };
  console.log("revice")
  React.useEffect(() => {
    // console.log('-------------------------')
    //console.log(localOptionsToServer(listData));
    if (businessForm) {
      setImages([
        businessForm.firstImage,
        businessForm.secondImage,
        businessForm.thirdImage,
        businessForm.forthImage,
      ]);
    }
    if (Array.isArray(listData)) {
      let array = [];
      listData.map((item, i) => {
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
  }, []);
  React.useEffect(() => {
    setSubServiceList([]);
    if (Array.isArray(listData)) {
      let arr = [];
      listData.map((item) => {
        if (item.title && item.subTitle && item.title.match(ActiveService)) {
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
  const confirm = async () => {
    if (!newUser) {
      console.log("Invalid user");
      return;
    }
    setLoading(true);
    let blobImages = [];
    Array.isArray(Images) &&
      Images.forEach((image, i) => {
        blobImages.push(fileFromURL(image));
      });
    const result = await uploadFile(blobImages, newUser.token);
    if(!result){
      setLoading(false);
      //console.log(result)
      Alert.alert("Opps!","Failed to upload images")
    }
      //setLoading(false)
      let Img1 = [];
      if (profileImage) {
        Img1.push(fileFromURL(profileImage));
      } else {
        Img1 = null;
      }
      let Img2 = [];
      if (backgroundImage) {
        Img2.push(fileFromURL(backgroundImage));
      } else {
        Img2 = null;
      }

      let img1 = await uploadFile(Img1, newUser.token);
      let img2 = await uploadFile(Img2, newUser.token);
      const res = await createService(
        businessForm,
        listData,
        result,
        newUser.token,
        Array.isArray(img1) ? img1[0] : null,
        Array.isArray(img2) ? img2[0] : null
      ).catch(err=>{
        console.warn(err.response.data.msg)
        Alert.alert(res.response.data.msg)
      })
      if(!res){
        setLoading(false);
        //Alert.alert(res.response.data.msg)
        return
      }
      const data=await vendorLogin(newUser.token, res.data.service.id);
      if(!data){
        setLoading(false);
        Alert.alert("Opps!",data.response.data.msg)
        return
      }
      setLoading(false);
      dispatch({ type: "SET_VENDOR", playload: data });
            //navigation.navigate("Profile");
      // setTimeout(()=>{
      //   navigation.navigate("MainProfile");
      // },100)
   
  };
  //console.log(Images)
  //return null
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#f1f1f2",
        }}
      >
        <View style={styles.container}>
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
            {profileImage ? (
              <Image style={styles.image} source={{ uri: profileImage.uri }} />
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
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
          >
            <Text style={styles.headLine}>
              {businessForm && businessForm.serviceCenterName
                ? businessForm.serviceCenterName
                : ""}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontFamily: "Poppins-SemiBold",
              }}
            >
              {businessForm && businessForm.name ? businessForm.name : "-"}(
              {businessForm && businessForm.gender ? businessForm.gender : ""})
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-SemiBold",
              }}
            >
              Position of{" "}
              {businessForm && businessForm.position
                ? businessForm.position
                : ""}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              right: 20,
              zIndex: 6,
              top: 210,
              backgroundColor: "#e5e5e5",
              paddingHorizontal: 5,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Light",
                fontSize: 14,
                color: textColor,
              }}
            >
              New Account
            </Text>
          </View>
          <View
            style={[
              styles.cameraIcon,
              {
                top: 10,
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
        <BarOption
          icon={brain}
          title={`Specialty in ${
            businessForm && businessForm.speciality
              ? businessForm.speciality
              : ""
          }`}
        />
        <BarOption
          icon={user}
          title={`Worker and Team (${
            businessForm && businessForm.teamNumber
              ? businessForm.teamNumber
              : ""
          } member)`}
        />
        <BarOption
          icon={flag}
          title={`Since ${
            businessForm && businessForm.startDate
              ? businessForm.startDate.year
              : ""
          }`}
        />
        <View
          style={{
            backgroundColor: primaryColor,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <SvgXml xml={info} height="20" width="20" />
            <Text
              style={{
                marginLeft: 10,
                color: textColor,
                fontSize: 15,
                fontFamily: "Poppins-Medium",
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
                }}
              >
                {businessForm && businessForm.about ? businessForm.about : ""}
              </Text>
              <View>
                {businessForm &&
                  businessForm.about &&
                  businessForm.about.length > 200 && (
                    <Text
                      style={{
                        color: "tomato",
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 14,
                        marginTop: 1,
                      }}
                    >
                      {Lines === 2 ? "READ MORE" : "READ LESS"}
                    </Text>
                  )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ProfileOption
          Icon={() => (
            <AntDesign name="calendar" size={24} color={assentColor} />
          )}
          title="Company Calender"
        />
        <ProfileOption
          onPress={() => {
            navigation.navigate("Vendor Address");
          }}
          style={{
            marginBottom: 5,
          }}
          Icon={() => (
            <FontAwesome5
              style={{
                marginRight: 5,
              }}
              name="address-card"
              size={24}
              color={assentColor}
            />
          )}
          title="Address"
        />

        <View style={{ backgroundColor: primaryColor }}>
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
              source={{ uri: Images[index].uri }}
            />
          )}
        />
          {/* <SliderBox
            images={Images}
            sliderBoxHeight={250}
            dotColor="#232F6D"
            inactiveDotColor="#ffffff"
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 10,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)",
            }}
          /> */}
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 17,
              marginTop: 10,
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}
          >
            {businessForm && businessForm.serviceTitle
              ? businessForm.serviceTitle
              : ""}
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (NewLines == 4) {
                setNewLines(100);
              } else {
                setNewLines(4);
              }
            }}
            disabled={
              businessForm &&
              businessForm.description &&
              businessForm.description.length > 230
                ? false
                : true
            }
          >
            <Text
              numberOfLines={NewLines}
              style={{
                marginHorizontal: 20,
                textAlign: "justify",
                marginVertical: 5,
                fontSize: 14,
                color: textColor,
                fontFamily: "Poppins-Light",
              }}
            >
              {businessForm && businessForm.description
                ? businessForm.description
                : ""}
            </Text>
            {businessForm &&
              businessForm.description &&
              businessForm.description.length > 230 && (
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
              )}
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "flex-end",
              marginRight: 20,
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: "black",
            }}
          >
            From {businessForm && businessForm.price ? businessForm.price : ""}৳
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
                <Button style={styles.activeButton} title={ActiveService} />
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
              {Array.isArray(SubServiceList) && SubServiceList.length > 0 ? (
                SubServiceList.map((item, i) => (
                  <ServiceTable
                    key={i}
                    item={item}
                    i={i}
                    name={ActiveService}
                  />
                ))
              ) : ActiveService != "Extra Facilities" ? (
                <ServiceTable name={ActiveService} />
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
                  {Array.isArray(businessForm.facilities) &&
                    businessForm.facilities.map(
                      (doc, i) =>
                        doc.checked && (
                          <Text
                            style={{
                              fontSize: 13,
                              fontFamily: "Poppins-Light",
                            }}
                            key={i}
                          >
                            {doc.title}
                          </Text>
                        )
                    )}
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
              flex: (width / 3.2) * 2,
              left: (width / 3.2) * 1.2,
            }}
            colors={[
              "rgba(255, 255, 255, 0.252)",
              "rgba(255, 255, 255, 0.343)",
              "#ffff",
            ]}
          ></LinearGradient>
        </View>
        <View style={{ backgroundColor: primaryColor }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Service List");
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
          <View
            style={{
              height: 1,
              backgroundColor: "#e5e5e5",
              marginTop: 5,
              marginBottom: 10,
              marginHorizontal: 20,
            }}
          />
        </View>
        <View
          style={{ height: 30, backgroundColor: primaryColor, marginTop: -1 }}
        />
      </ScrollView>
      <View style={{ backgroundColor: primaryColor }}>
        <CheckBox
          onChange={() => {
            setButtonPress(!ButtonPress);
          }}
          style={{
            marginHorizontal: 20,
            marginTop: 10,
          }}
          title="I agree with all the terms and conditions"
        />
        <IconButton
          onPress={confirm}
          disabled={ButtonPress ? false : true}
          style={{
            height: 45,
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: ButtonPress ? backgroundColor : "#707070",
            borderWidth: 0,
            color:ButtonPress ? "white" : "black",
          }}
          title="Confirm"
        />
      </View>
      <Modal visible={Loading} onRequestClose={() => {}}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Review;
const styles = StyleSheet.create({
  backgroundContainer: {
    minHeight: 200,
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
  text: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  image: {
    width: 89,
    height: 89,
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
            fontFamily: "Poppins-SemiBold",
            marginBottom: 5,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: "#f1f1f2",
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
};
const ServiceTable = ({ item, i, name }) => {
  const listData = useSelector((state) => state.listData);
  const [Data, setData] = React.useState([]);
  const [TableName, setTableName] = React.useState();
  React.useEffect(() => {
    if (listData) {
      setData([]);
      let arr = [];
      if (item) {
        listData.forEach((data) => {
          if (data.subTitle && data.subTitle == item) {
            arr.push(data.tableName);
          }
        });
      } else {
        listData.forEach((item) => {
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
  return (
    <View
      style={{
        paddingBottom: 5,
        borderColor: "#e5e5e5",
        minHeight: 10,
      }}
      key={i}
    >
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 15,
          margin: 0,
        }}
      >
        {item}
      </Text>
      {Data.length > 0 ? (
        Data.map((item, i) => (
          <View key={i}>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 14,
                color: "#707070",
              }}
            >
              {item}
            </Text>
            <Rows item={item} name={name} />
          </View>
        ))
      ) : (
        <View>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 14,
              color: "#707070",
            }}
          >
            {name}
          </Text>
          <Rows name={name} />
        </View>
      )}
    </View>
  );
};
const Rows = ({ title, item, name }) => {
  const [text, setText] = React.useState();
  const listData = useSelector((state) => state.listData);

  React.useEffect(() => {
    //console.log(item);
    if (!listData) {
      return;
    }
    let count = 0;
    let word = "";
    listData.map((doc, j) => {
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
  }, [item + title + listData]);

  return (
    <Text
      style={{
        fontSize: 13,
        fontFamily: "Poppins-Light",
      }}
    >
      {text}
    </Text>
  );
};
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}

const styler = StyleSheet.create({
  box: {
    padding: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    marginVertical: 0,
    marginTop: 5,
    alignItems: "center",
  },
  icon: {
    flex: 1,
  },
  text: {
    flex: 10,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  text2: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#707070",
  },
});
