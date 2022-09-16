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
import ProfileOption from "./../../components/ProfileOption";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

const { width, height } = Dimensions.get("window");
const Review = (props) => {
  const window = Dimensions.get("window");
  const [image, setImage] = React.useState(null);
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      return result;
    }
    return null;
  };
  React.useEffect(() => {
    //console.log(listData);
    (async () => {
      if (Array.isArray(listData)) {
        listData.map((item) => {
          setServiceList((val) => [...val, item.title]);
        });
        await setServiceList((val) => uniq(val));
        setActiveService(ServiceList[0]);
      }
    })();
  }, []);
  React.useEffect(() => {
    setSubServiceList([]);
    if (Array.isArray(listData)) {
      listData.map((item) => {
        if (item.title && item.title.match(ActiveService)) {
          setSubServiceList((val) => [...val, {
            title: item.subTitle,
            tableName:item.tableName
          }]);
        }
      });
      setSubServiceList((val) => uniqObject(val));
    }
  }, [ActiveService]);
  function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }
  function uniqObject(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item.tableName != ary[pos - 1].tableName;
    });
  }
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
              source={{ uri: backgroundImage }}
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
              <Image style={styles.image} source={{ uri: image }} />
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
                      setImage(result.uri);
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
                    setBackgroundImage(result.uri);
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
        <ScrollView
          style={{
            backgroundColor: primaryColor,
            marginTop: 1,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: 10 }} />
          <Button
            style={{
              flex: 4,
              marginLeft: 10,
              height: 30,
              backgroundColor: textColor,
              color: "white",
              marginVertical: 10,
            }}
            title="Bargaining"
          />
          <View style={{ width: 10 }} />
        </ScrollView>
        <View style={{ backgroundColor: primaryColor }}>
          <Image
            style={{
              width: "100%",
              height: 230,
            }}
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261__340.jpg",
            }}
          />
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
                    marginBottom: 10,
                  }}
                >
                  Read {NewLines == 4 ? "More" : "Less"}
                </Text>
              )}
          </TouchableOpacity>
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
            flexDirection: "row",
            minHeight: 200,
          }}
        >
          <View
            style={{
              flex: 1.2,
              marginLeft: 20,
            }}
          >
            {Array.isArray(ServiceList) &&
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
              ))}
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
              SubServiceList.map((item, i) => (
                <ServiceTable key={i} item={item.title} i={i} tableName={item.tableName}/>
              ))}
          </View>
        </View>
        <View style={{ backgroundColor: primaryColor }}>
          <Button onPress={()=>{
            navigation.navigate('Service List')
          }}
            style={{
              alignSelf: "flex-end",
              width: 120,
              color: textColor,
              borderWidth: 0,
              height: 30,
            }}
            title="Show All"
          />
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
          style={{ height: 50, backgroundColor: primaryColor, marginTop: -1 }}
        />
      </ScrollView>
      <View>
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
        <Button
          disabled={ButtonPress ? false : true}
          style={{
            height: 45,
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: ButtonPress ? backgroundColor : "#707070",
            borderWidth: 0,
          }}
          title="Confirm"
        />
      </View>
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
    width: 80,
    height: 80,
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
const ServiceTable = ({ item, i, tableName}) => {
  const listData = useSelector((state) => state.listData);
  const [Data, setData] = React.useState([]);
  React.useEffect(() => {
    if (listData) {
      let arr = listData.filter(
        (d, j) => d.subTitle == item && tableName == d.tableName && j < 8
      );
      setData(arr)
      console.log('------------------------------------------')
      console.log(arr)
      console.log('-------------------------------------')
      console.log(listData)
    
    }
  }, [item]);
  return (
    <View
      style={{
        paddingBottom: 5,
        borderColor: "#e5e5e5",
      }}
      key={i}
    >
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 15,
        }}
      >
        {item}
      </Text>
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 14,
          color: "#707070",
        }}
      >
        {tableName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 13,
          }}
        >
          {Array.isArray(Data) &&
            Data.map((data, j) => {
              return `${j != 0 ? ", " : ""}${data.data.title}`;
            })}
        </Text>
      </View>
    </View>
  );
};
