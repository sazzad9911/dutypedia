import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { getOrders } from "../Class/service";

const ManageOrder = () => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const [Orders, setOrders] = React.useState(null);
  const user = useSelector((state) => state.user);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const Header = () => {
    return (
      <Animated.View
        style={[
          {
            transform: [{ translateY: translateY }],
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: secondaryColor,
            zIndex: 500,
          },
        ]}
      >
        <Text>Header</Text>
      </Animated.View>
    );
  };
  React.useEffect(() => {
    if (user) {
      setLoader(true);
      getOrders(user.token, "user")
        .then((res) => {
          if (res.data) {
            setLoader(false);
            setOrders(res.data.orders);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
    }
  }, [user + Refresh]);

  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: textColor }}>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={{ flexGrow: 1, flex: 1 }}
      stickyHeaderIndices={[0]}
      scrollEventThrottle={16}
      stickyHeaderHiddenOnScroll={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            //setPageChange(true);
            onRefresh();
          }}
        />
      }
      showsVerticalScrollIndicator={false}
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y);
        //scroll;
      }}
    >
      <Header />
      <OrderCart />
      <OrderCart />
      <OrderCart />
    </ScrollView>
  );
};

export default ManageOrder;

const OrderCart = ({ data }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();

  return (
    <View
      style={{
        backgroundColor: primaryColor,
        marginHorizontal: 20,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowOpacity: 0,
        shadowRadius: 1,
        elevation: 1,
        shadowColor: "black",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              borderWidth: 1,
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              borderColor: "#e5e5e5",
            }}
          >
            <FontAwesome name="user" size={35} color={assentColor} />
          </View>
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                color: textColor,
                fontSize: 16,
                fontFamily: "Poppins-Medium",
              }}
            >
              Sazaad Hossain
            </Text>
            <Text
              style={{
                color: textColor,
                fontSize: 14,
                fontFamily: "Poppins-Medium",
              }}
            >
              Id: 24484859i234
            </Text>
          </View>
        </View>
        <AntDesign name="message1" size={24} color={assentColor} />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: textColor,
              textAlign: "center",
            }}
          >
            Service Name
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: textColor,
              textAlign: "center",
            }}
          >
            Price
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: textColor,
              marginLeft: 15,
              textAlign: "center",
            }}
          >
            Status
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          minHeight: 100,
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: textColor,
              fontSize: 14,
              fontFamily: "Poppins-Medium",
            }}
          >
            I will give you a best service
          </Text>
        </View>
        <View
          style={{
            width: 1,
            backgroundColor: "#e5e5e5",
            height: "50%",
            marginHorizontal: 10,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}
          >
            Offer Price 500৳
          </Text>
          <View
            style={{
              padding: 5,
              backgroundColor: backgroundColor,
              width: 50,
            }}
          >
            <Text>Due</Text>
          </View>
        </View>
        <View style={{ width: 1, backgroundColor: "#e5e5e5", height: "50%" }} />
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
};
