import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Text } from "react-native";
import { bigIcon } from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import { FontAwesome } from "@expo/vector-icons";
import { primaryColor, backgroundColor, textColor } from "../../assets/colors";
import Button from "./../../components/Button";
const { height, width } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import { getGigs, getDashboard } from "../../Class/service";
import { vendorLogin } from "../../Class/auth";

const DashboardList = ({ navigation }) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const user = useSelector((state) => state.user);
  const [Data, setData] = React.useState();
  const dispatch = useDispatch();
  const [Loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (Array.isArray(vendorInfo)) {
      setData(vendorInfo);
    } else {
      setData([]);
    }
  }, [vendorInfo]);

  if (Loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }
  const click = (id) => {
    setLoading(true);
    vendorLogin(user.token, id).then((res) => {
      if (res) {
        //console.log(res)
        setLoading(false);
        dispatch({ type: "SET_VENDOR", playload: res });
        navigation.navigate("Profile");
      } else {
        setLoading(false);
        Alert.alert("Problem in log into dashboard");
      }
    });
  };
  return (
    <ScrollView>
      <View
        style={{
          paddingTop: 33,
          alignItems: "center",
          height: 100,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins-Medium",
          }}
        >
          Dutypedia Business Account
        </Text>
      </View>
      <SvgXml
        style={{
          marginTop: height / 10,
          alignSelf: "center",
        }}
        xml={bigIcon}
        height="120"
        width="120"
      />
      <View style={{ height: 50 }} />
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View style={{ width: 10 }} />
        {Data ? (
          Data.map((doc, i) => (
            <Cart key={i} onChange={click} data={doc} />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
        <View style={{ width: 10 }} />
      </ScrollView>
      <View style={{ height: height - (height / 10 + 380) }} />
      <Button
        onPress={() => {
          navigation.navigate("MainCategory");
        }}
        style={{
          borderWidth: 0,
          color: textColor,
          alignSelf: "center",
        }}
        title={"Create an another business account"}
      />
      {/* <Button
        onPress={() => {
          navigation.goBack()
        }}
        style={{
          borderWidth: 1,
          color: textColor,
          alignSelf: "center",
        }}
        title={"Back"}
      /> */}
    </ScrollView>
  );
};

export default DashboardList;
const Cart = ({ data, onChange }) => {
  const id = data.id;
  const image = data.image;
  const title = data.name;
  return (
    <TouchableOpacity
      onPress={() => {
        if (onChange) {
          onChange(id);
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: 250,
          backgroundColor: primaryColor,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: "center",
          margin: 10,
          borderRadius: 5,
          shadowOffset: {
            height: 1,
            width: 1,
          },
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#e5e5e5",
            borderRadius: 20,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            overflow: "hidden",
          }}
        >
          {image ? (
            <Image
              style={{
                height: 35,
                width: 35,
                borderRadius: 20,
              }}
              source={{ uri: image }}
            />
          ) : (
            <FontAwesome name="user" size={35} color={backgroundColor} />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              fontFamily: "Poppins-Medium",
              flex: 1,
            }}
          >
            {title ? title : "Sazzad It Center"}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Poppins-Light",
              color: "#707070",
            }}
          >
            Tap To Login
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
