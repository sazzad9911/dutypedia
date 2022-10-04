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
} from "./../assets/colors";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProfileOption from "./../components/ProfileOption";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
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
} from "../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "./../Cart/ReviewCart";
import RelatedService from "./../Cart/RelatedService";
import IconButton from "./../components/IconButton";
import { Menu } from "react-native-paper";

const { width, height } = Dimensions.get("window");
const OtherProfile = (props) => {
  const window = Dimensions.get("window");
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [Lines, setLines] = React.useState(2);
  const navigation = props.navigation;
  const [Visible, setVisible] = React.useState(false);
  const initialState = [
    {
      title: "Bargaining",
      value: true,
    },
    {
      title: "Fixed",
      value: false,
    },
    {
      title: "Installment",
      value: false,
    },
    {
      title: "Subscription",
      value: false,
    },
    {
      title: "Package",
      value: false,
    },
  ];
  const [Active, setActive] = React.useState("Bargaining");
  const [NewLines, setNewLines] = React.useState(false);
  return (
    <SafeAreaView>
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
              <FontAwesome name="user" size={90} color="#983C85" />
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
          >
            <Text style={[styles.headLine, { fontFamily: "Poppins-Medium" }]}>
              Easin Arafat It Consulting Center
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 17,
                fontFamily: "Poppins-Medium",
              }}
            >
              Easin Arafat (Male)
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Medium",
              }}
            >
              Position of Ceo
            </Text>
          </View>
          <SvgXml
            style={{
              position: "absolute",
              right: 30,
              zIndex: 6,
              top: 210,
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
          }}
        >
          <IconButton
            style={{
              borderRadius: 20,
              height: 37,
              width: 37,
              margin: 10,
            }}
            LeftIcon={() => (
              <SvgXml xml={appointmentIcon} height="20" width="20" />
            )}
          />
          <IconButton
            style={{
              borderRadius: 20,
              height: 37,
              margin: 10,
              width: width / 4 + 20,
              marginLeft: 0,
            }}
            title="Chat"
            LeftIcon={() => <SvgXml xml={chatIcon} height="20" width="20" />}
          />
          <IconButton
            style={{
              borderRadius: 20,
              height: 37,
              margin: 10,
              width: width / 4 + 20,
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
                  borderColor: "#b5b5b5",
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
              }}
              title="Report"
            />
          </Menu>
        </View>
        <BarOption
          icon={brain}
          title="Specialty in Graphic Design, Software Engineer, Data Science"
        />
        <BarOption icon={user} title="Worker and Team (12 member)" />
        <BarOption icon={flag} title="Since 2020" />
        <ProfileOption
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
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in
              </Text>
              <View>
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
              </View>
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
                height="18"
                width="18"
              />
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="18"
                width="18"
              />
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="18"
                width="18"
              />
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="18"
                width="18"
              />
              <SvgXml
                style={styles.starIcon}
                xml={star}
                height="18"
                width="18"
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Poppins-Medium",
                }}
              >
                4.6
              </Text>
              <Text
                style={{
                  marginLeft: 30,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Profile View 10k
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: 10 }} />
          {initialState &&
            initialState.map((item, i) => (
              <View key={i} style={{ flexDirection: "row" }}>
                <IconButton
                  onPress={() => {
                    setActive(item.title);
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
        <View style={{ backgroundColor: primaryColor }}>
          <Image
            style={{
              width: "100%",
              height: width - 80,
            }}
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261__340.jpg",
            }}
          />
          <Text
            numberOfLines={NewLines ? 100 : 4}
            style={{
              marginHorizontal: 20,
              textAlign: "justify",
              marginVertical: 10,
              fontSize: 14,
              color: textColor,
              fontFamily: "Poppins-Light",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </Text>
        </View>
        <View style={{backgroundColor:primaryColor,paddingHorizontal:20}}>
          <Text style={{
            fontFamily: "Poppins-Medium",
            fontSize:16,
            marginBottom:3
          }}>Service List</Text>
          <View style={{height:1,backgroundColor: "#e5e5e5"}}/>
          
          <View style={{height:1,backgroundColor: "#e5e5e5"}}/>
        </View>
        <View style={{backgroundColor: primaryColor}}>
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 17,
              marginBottom: 20,
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}
          >
            From 500 ৳
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
        </View>
        <ReviewCart navigation={navigation} />
        <View
          style={{
            backgroundColor: primaryColor,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins-SemiBold",
              color: textColor,
              paddingHorizontal: 20,
            }}
          >
            Related Service
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ width: 10 }} />
            <RelatedService navigation={props.navigation} />
            <RelatedService navigation={props.navigation} />
            <RelatedService navigation={props.navigation} />
          </ScrollView>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Poppins-SemiBold",
              color: textColor,
              paddingHorizontal: 20,
            }}
          >
            Related Service
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ width: 10 }} />
            <RelatedService navigation={props.navigation} />
            <RelatedService navigation={props.navigation} />
            <RelatedService navigation={props.navigation} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtherProfile;
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
    width: 110,
    height: 110,
    marginTop: -45,
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
    fontSize: 20,
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
            backgroundColor: "#f1f1f2",
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
};
