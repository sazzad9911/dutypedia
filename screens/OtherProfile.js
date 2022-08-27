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
import { brain, flag, info, star, user, verified } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "./../Cart/ReviewCart";
import RelatedService from "./../Cart/RelatedService";

const { width, height } = Dimensions.get("window");
const OtherProfile = (props) => {
  const window = Dimensions.get("window");
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [Lines, setLines] = React.useState(2);
  const navigation = props.navigation;

  return (
    <ScrollView style={{
      backgroundColor:'#f1f1f2'
    }}>
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
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
        >
          <Text style={styles.headLine}>Easin Arafat It Consulting Center</Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Easin Arafat (Male)
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Position of Ceo
          </Text>
        </View>
        <SvgXml style={{
          position: "absolute",
          right: 30,
          zIndex: 6,
          top:210
        }} xml={verified} height="50" width="50" />
      </View>
      <BarOption icon={brain} title='Specialty in Graphic Design, Software Engineer, Data Science'/>
      <BarOption icon={user} title='Worker and Team (12 member)'/>
      <BarOption icon={flag} title='Since 2020'/>
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
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in
            </Text>
            <View>
              <Text
                style={{
                  color: "tomato",
                  fontWeight: "bold",
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
            <SvgXml style={styles.starIcon} xml={star} height="18" width="18" />
            <SvgXml style={styles.starIcon} xml={star} height="18" width="18" />
            <SvgXml style={styles.starIcon} xml={star} height="18" width="18" />
            <SvgXml style={styles.starIcon} xml={star} height="18" width="18" />
            <SvgXml style={styles.starIcon} xml={star} height="18" width="18" />
            <Text
              style={{
                marginLeft: 10,
              }}
            >
              4.6
            </Text>
            <Text
              style={{
                marginLeft: 30,
              }}
            >
              Profile View 10k
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <Button
              style={{
                flex: 4,
              }}
              title="Appointment"
            />
            <Button
              style={{
                flex: 4,
                marginLeft: 10,
                backgroundColor: "green",
                color: "white",
                borderWidth: 0,
              }}
              title="Message"
            />
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#b5b5b5",
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="dots-three-horizontal" size={20} color="#808080" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ProfileOption
        Icon={() => <AntDesign name="calendar" size={24} color={assentColor} />}
        title="Company Calender"
      />
      <ProfileOption style={{
        marginBottom:5
      }}
        Icon={() => (
          <FontAwesome5
            style={{
              marginRight: 5,
            }}
            name="clipboard-list"
            size={24}
            color={assentColor}
          />
        )}
        title="Notice"
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
        <Button
          style={{
            flex: 4,
            marginLeft: 10,
            height: 30,
            marginVertical: 10,
          }}
          title="Fixed"
        />
        <Button
          style={{
            flex: 4,
            marginLeft: 10,
            height: 30,
            marginVertical: 10,
          }}
          title="Package"
        />
        <Button
          style={{
            flex: 4,
            marginLeft: 10,
            height: 30,
            marginVertical: 10,
          }}
          title="Installment"
        />
        <Button
          style={{
            flex: 4,
            marginLeft: 10,
            height: 30,
            marginVertical: 10,
          }}
          title="Subscription"
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
            textAlign: "justify",
            marginVertical: 10,
            fontSize: 14,
            color: textColor,
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 17,
            fontWeight: "bold",
            marginBottom: 20,
            color: textColor,
          }}
        >
          From 500 ৳
        </Text>
        <Button
          style={{
            borderRadius: 5,
            marginHorizontal: 20,
            backgroundColor: "#F1C00F",
            borderWidth: 0,
            marginBottom: 10,
          }}
          title="Continue"
        />
      </View>
      <View
        style={{
          backgroundColor: primaryColor,
          marginTop: 2,
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
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
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
      <View
        style={{
          backgroundColor: primaryColor,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
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
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
  },
  image: {
    width: 80,
    height: 80,
  },
  starIcon:{
    marginRight:3
  }
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
const BarOption=({icon,title})=>{
  const [lines,setLines]=React.useState(1)
  return (
    <TouchableOpacity onPress={()=>{
      setLines(d=>{
        if(d===1) {
          return 10;
        }
        return 1
      })
    }}
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          backgroundColor: primaryColor,
          paddingVertical:5
        }}
      >
        <SvgXml xml={icon} height="20" width="20" />
        <View style={{
          flex:6,
          marginLeft: 10,
        }}>
          <Text numberOfLines={lines}
            style={{
              fontWeight: "bold",
              marginBottom:5
            }}
          >
            {title}
          </Text>
          <View style={{
            height:1,
            backgroundColor:'#f1f1f2'
          }}></View>
        </View>
      </TouchableOpacity>
  )
}