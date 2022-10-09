import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Animated,
} from "react-native";
import {
  textColor,
  primaryColor,
  secondaryColor,
  Color,
} from "./../assets/colors";
import Cart from "../Cart/Cart";
import Cart1 from "../Cart/Cart1";
import Cart2 from "../Cart/Cart2";
import Options from "../Cart/Options";
import Seller from "../Cart/Seller";
import SellerCart from "./../Cart/SellerCart";
import CombineCart from "./../Cart/CombineCart";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { getServiceGigs } from "./../Class/service";
import Header from "./../components/Header";
import { colors, screenStyles } from "../components/constants";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AllData } from "./../Data/AllData";

const { width, height } = Dimensions.get("window");

const Home = (props) => {
  const navigation = props.navigation;
  const [trans, setTrans] = React.useState(1);
  const colorScheme = useColorScheme();
  const colors = new Color(false);
  const TextColor = colors.getTextColor();

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const [Temporary, setTemporary] = React.useState([]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const user = useSelector((state) => state.user);
  const [SomeSuggest, setSomeSuggest] = React.useState(null);

  React.useEffect(() => {
    setSomeSuggest(null);
    if (user) {
      getServiceGigs(user.token)
        .then((res) => {
          if (res.data) {
            return setSomeSuggest(res.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response.data);
        });
    }
  }, [Refresh]);
  React.useEffect(() => {
    //console.log(AllData.length);
    let arr = [];
    for (let i = 0; i < AllData.length; i = i + 3) {
      if (i + 1 < AllData.length && i + 2 < AllData.length) {
        arr.push({
          index: i,
          num:3
        });
      } else if (i + 1 < AllData.length) {
        arr.push({
          index: i,
          num:2
        });
      } else {
        arr.push({
          index: i,
          num:1
        });
      }
    }
    setTemporary(arr);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        bounces={false}
        refreshControl={
          <RefreshControl
            progressViewOffset={72}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 100 }} />
        <View>
          {/* <Text
            style={{
              fontSize: 20,
              color: TextColor,
              marginLeft: 5,
              paddingLeft: 15,
              paddingRight: 15,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Category
          </Text> */}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <View style={{ width: 15 }} />
        </ScrollView>
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            marginVertical: 15,
            marginLeft: 5,
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 18,
          }}
        >
          What is Your Best Interested Category
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          {Temporary.map((item, i) =>
            item.num == 3 ? (
              <CombineCart key={i}
                num={[AllData[item.index], AllData[item.index + 1], AllData[item.index + 2]]}
                Component={(props) => <Cart1 {...props} />}
              />
            ) : item.num == 2 ? (
              <CombineCart key={i}
                num={[AllData[item.index], AllData[item.index + 1]]}
                Component={(props) => <Cart1 {...props}/>}
              />
            ) : (
              <CombineCart key={i}
                num={[AllData[item.index]]}
                Component={() => <Cart1 {...props}/>}
              />
            )
          )}
          <View style={{ width: 15 }} />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              marginVertical: 15,
              flex: 5,
              marginLeft: 5,
              fontSize: 14,
              paddingLeft: 15,
              paddingRight: 15,
              fontSize: 18,
            }}
          >
            Some Suggest
          </Text>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              flex: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                textDecorationLine: "underline",
                marginRight: 20,
                fontSize: 14,
                textAlign: "right",
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          {!SomeSuggest && (
            <View
              style={{
                height: 270,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Loading...</Text>
            </View>
          )}
          {SomeSuggest &&
            SomeSuggest.map((doc, i) => (
              <Cart2 key={i} data={doc} navigation={props.navigation} />
            ))}
          <View style={{ width: 15 }} />
        </ScrollView>

        {/* <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            marginVertical: 15,
            marginLeft: 5,
            paddingLeft: 15,
            paddingRight: 15,
            fontSize:18
          }}
        >
          Top Seller
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          <Options />
          <Options />
          <Options />
          <Options />
          <View style={{ width: 15 }} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          <CombineCart
            num={[2, 3, 4]}
            Component={() => <Seller navigation={navigation} />}
          />
          <CombineCart
            num={[2, 3, 4]}
            Component={() => <Seller navigation={navigation} />}
          />
          <CombineCart
            num={[2, 3, 4]}
            Component={() => <Seller navigation={navigation} />}
          />
          <View style={{ width: 15 }} />
        </ScrollView>
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            marginVertical: 10,
            marginLeft: 5,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          Popular Category
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <Options name="New Service" />
          <Options name="Electricity Service" />
          <Options />
          <Options />
        </View> */}
        <View style={{ height: 19 }} />
        <View style={{ marginHorizontal: 20 }}>
          <SellerCart {...props} />
        </View>
        <View style={{ height: 10 }} />
      </ScrollView>
      <Animated.View
        style={[
          {
            transform: [{ translateY: translateY }],
            position: "absolute",
            top: 30,
            left: 0,
            right: 0,
            backgroundColor: "#fbfbfb",
            zIndex: 500,
          },
        ]}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Poppins-SemiBold",
              color: textColor,
            }}
          >
            Dutypedia
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SearchScreen_1");
            }}
            style={{
              backgroundColor: "#e5e5e5",
              width: 35,
              height: 35,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  content: {
    alignSelf: "stretch",
  },
  headerBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: colors.transparent,
    flex: 1,
    overflow: "hidden",
    zIndex: 3,
  },
  tabContainer: {},
  input: {
    margin: 20,
    backgroundColor: primaryColor,
    height: 40,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
});
