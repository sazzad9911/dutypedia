import React from "react";
import { View, Text, Dimensions, TextInput } from "react-native";
import { noticeVector } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import { Color, textColor } from "../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { getNotice } from "../Class/notice";
import { AntDesign } from "@expo/vector-icons";
import ActivityLoader from "../components/ActivityLoader";
import Button from "../components/Button";
const { width, height } = Dimensions.get("window");
import { FAB } from "react-native-paper";
import Animated, { SlideInRight } from "react-native-reanimated";

export default function Notice({ navigation, route }) {
  const serviceId =
    route.params && route.params.serviceId ? route.params.serviceId : null;
  const vendor =
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
  const ref = React.useRef();
  React.useEffect(() => {
    if (serviceId) {
      getNotice(user.token, serviceId)
        .then((res) => {
          if (res) {
            setLoader(false);
            seAllNotice(res.notices);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.msg);
        });
    }
  }, [serviceId]);
  return (
    <View style={{ flex: 1 }}>
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
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            onPress={() => {
              navigation.goBack();
            }}
            name="left"
            size={22}
            color={"#C2D5F6"}
          />
          <Text
            style={{
              color: "#C2D5F6",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            Notice
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {SearchOpen && (
            <Animated.View entering={SlideInRight}>
              <TextInput
                ref={ref}
                style={{
                  width: width / 2 - 40,
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
                //ref?.current.focus()
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
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 5,
        }}
      >
        <SvgXml
          style={{ marginLeft: "5%", marginBottom: 20 }}
          xml={noticeVector}
          height="250"
          width={"90%"}
        />
        {Loader && <ActivityLoader />}
        {AllNotice &&
          AllNotice.map((doc, i) => (
            <NoticeCart navigation={navigation} key={i} data={doc} />
          ))}
        {AllNotice && AllNotice.length == 0 && !Loader && (
          <Text
            style={{
              color: textColor,
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              marginTop: "30%",
            }}
          >
            No Notice Found
          </Text>
        )}
      </View>
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
          onPress={() => {}}
        />
      )}
    </View>
  );
}

const NoticeCart = ({ data, navigation }) => {
  //console.log(data)
  const [Data, setData] = React.useState();

  return (
    <View
      style={{
        borderColor: "#C2D4F8",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: width / 2 - 15,
        margin: 5,
        height: 185,
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 16,
        }}
      >
        Id/Record No {data.record}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 5,
          fontSize: 14,
        }}
      >
        {dateConvert(data.date)}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 20,
          fontSize: 12,
          fontFamily: "Poppins-SemiBold",
        }}
      >
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
        }}
      >
        {data.message}
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("ViewCart", {
            value: data,
            setData: null,
          });
        }}
        style={{
          borderColor: "#C2D4F8",
          borderWidth: 1,
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
