import React from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { noticeVector } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import { Color, textColor } from "../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { getNotice, createNotice } from "../Class/notice";
import { AntDesign } from "@expo/vector-icons";
import ActivityLoader from "../components/ActivityLoader";
import Button from "../components/Button";
const { width, height } = Dimensions.get("window");
import { FAB } from "react-native-paper";
import Animated, { SlideInRight } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import OutsideView from "react-native-detect-press-outside";
import IconButton from "../components/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

export default function UserNotice({ navigation, route }) {
  const serviceId =
    route.params && route.params.serviceId ? route.params.serviceId : null;
  const Vendor =
    route.params && route.params.vendor ? route.params.vendor : null;
  const user = useSelector((state) => state.user);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const assentColor = colors.getAssentColor();
  const [AllNotice, seAllNotice] = React.useState();
  const [Loader, setLoader] = React.useState(true);
  const [SearchOpen, setSearchOpen] = React.useState(false);
  const [Ref, setRef] = React.useState();
  const [Reload, setReload] = React.useState(false);
  const vendor = useSelector((state) => state.vendor);
  const [Data, setData] = React.useState([]);
  const [Search, setSearch] = React.useState();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (vendor || serviceId) {
      getNotice(user.token, serviceId ? serviceId : vendor.service.id)
        .then((res) => {
          if (res) {
            setLoader(false);
            seAllNotice(res.notices);
            setData(res.notices);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
    }
  }, [vendor + Reload + serviceId, isFocused]);
  const onChange = (val) => {
    createNotice(user.token, {
      subject: val.subject,
      message: val.description,
      record: val.record,
      authorName: val.name,
      authorPosition: val.position,
      date: val.date,
      serviceId: vendor.service.id,
    })
      .then((res) => {
        if (res) {
          setReload((val) => !val);
          //setLoader(!Loader);
          navigation.goBack();
        }
      })
      .catch((err) => {
        Alert.alert("Opps!", err.response.data);
      });
  };
  React.useEffect(() => {
    if (Search) {
      let arr = AllNotice.filter(
        (d) =>
          d.record.toUpperCase().match(Search.toUpperCase()) ||
          d.subject.toUpperCase().match(Search.toUpperCase()) ||
          dateConvert(d.date).toUpperCase().match(Search.toUpperCase())
      );
      setData(arr);
    } else {
      setData(AllNotice);
    }
  }, [Search]);
  const childRef = React.useRef();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
          style={{
            flexDirection: "row",
            paddingLeft: 20,
            paddingVertical: 10,
            justifyContent: "space-between",
            shadowOffset: { height: 1, width: 1 },
            shadowRadius: 2,
            elevation: 1,
            shadowOpacity: 0.01,
            shadowColor: "black",
            backgroundColor: primaryColor,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ flexDirection: "row" }}>
            <AntDesign name="left" size={22} color={"#C2D5F6"} />
            <Text
              style={{
                color: "#C2D5F6",
                fontSize: 16,
                marginLeft: 10,
              }}>
              Notice
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            {SearchOpen && (
              <Animated.View ref={childRef} entering={SlideInRight}>
                <TextInput
                  autoFocus={true}
                  onBlur={() => {
                    setSearchOpen(false);
                  }}
                  value={Search}
                  onChangeText={(e) => setSearch(e)}
                  ref={(ref) => setRef(ref)}
                  style={{
                    width: width / 2 - 20,
                    borderColor: "#C2D5F6",
                    borderBottomWidth: 1,
                    height: 25,
                  }}
                  placeholder="Search"
                />
              </Animated.View>
            )}

            <View style={{ backgroundColor: primaryColor, paddingRight: 20 }}>
              <AntDesign
                onPress={() => {
                  setSearchOpen((val) => !val);
                }}
                style={{
                  marginLeft: 10,
                }}
                name="search1"
                size={24}
                color={"#C2D5F6"}
              />
            </View>
          </View>
        </View>
        <ScrollView scrollEventThrottle={16}
        onScroll={()=>{
          setSearchOpen(false);
        }}
         showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 5,
            }}>
            <SvgXml
              style={{ marginLeft: "5%", marginBottom: 20 }}
              xml={noticeVector}
              height="250"
              width={"90%"}
            />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: "10%",
              }}>
              {Loader && <ActivityLoader />}
            </View>
            {Data &&
              Data.map((doc, i) => (
                <NoticeCart
                  setData={setReload}
                  navigation={navigation}
                  key={i}
                  data={doc}
                />
              ))}
            {Data && Data.length == 0 && !Loader && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}>
                <Text
                  style={{
                    color: textColor,
                    fontSize: 18,
                    fontFamily: "Poppins-Medium",
                    marginTop: "30%",
                    textAlign: "center",
                  }}>
                  No Notice Found
                </Text>
              </View>
            )}
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
        {vendor && (
          <FAB
            color="#FFFFFF"
            icon="plus"
            style={{
              position: "absolute",
              borderRadius: 30,
              backgroundColor: "#43B05C",
              bottom: 20,
              right: 20,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("AddNotice", {
                onChange: onChange,
                value: null,
              });
            }}
          />
        )}
    </SafeAreaView>
  );
}

const NoticeCart = ({ data, navigation, setData }) => {
  //console.log(data)
  const vendor = useSelector((state) => state.vendor);

  return (
    <View
      style={{
        borderColor: "#C2D4F8",
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        width: width / 2 - 15,
        margin: 5,
      }}>
      <Text
        numberOfLines={1}
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 16,
        }}>
        Id/Record No {data.record}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 5,
          fontSize: 14,
        }}>
        {dateConvert(data.date)}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 20,
          fontSize: 12,
          fontFamily: "Poppins-SemiBold",
        }}>
        {data.subject}
      </Text>
      <Text
        numberOfLines={3}
        style={{
          fontSize: 12,
          fontFamily: "Poppins-Medium",
          color: textColor,
          marginTop: 5,
          height: 50,
        }}>
        {data.message}
      </Text>
      <IconButton
        onPress={() => {
          navigation.navigate("ViewCart", {
            value: data,
            setData: vendor ? setData : null,
          });
        }}
        style={{
          borderColor: "#C2D4F8",
          borderWidth: 0.5,
          borderRadius: 5,
          color: "#C2D4F8",
          marginVertical: 5,
          height: 30,
        }}
        title={"View"}
      />
    </View>
  );
};
const dateConvert = (date) => {
  const newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth();
  let year = newDate.getFullYear();

  return `${day > 9 ? day : "0" + day}/${
    month > 8 ? month + 1 : "0" + (month + 1)
  }/${year}`;
};
