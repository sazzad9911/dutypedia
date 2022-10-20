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
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { getOrders } from "../../Class/service";
import Button from "../../components/Button";
import DropDown from "../../components/DropDown";
import { SvgXml } from "react-native-svg";
import ActivityLoader from "./../../components/ActivityLoader";
import { createStackNavigator } from "@react-navigation/stack";
import OrderDetails from "./OrderDetails";
import AddServiceList from "./../AddServiceList";
import AcceptOrder from "./AcceptOrder";
const Stack = createStackNavigator();

const Order = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOrder"
        component={VendorOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOrderDetails"
        component={OrderDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddServiceList"
        component={AddServiceList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AcceptOrder"
        component={AcceptOrder}
      />
    </Stack.Navigator>
  );
};

const VendorOrder = ({ navigation, route }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const initialState = [
    {
      title: "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
  ];
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(true);
  const [Orders, setOrders] = React.useState(null);
  const [AllOrders, setAllOrders] = React.useState(null);
  const user = useSelector((state) => state.user);
  const [Active, setActive] = React.useState("STARTING");
  const vendor = useSelector((state) => state.vendor);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    if (user) {
      //setLoader(true);
      //console.log(vendor.service.id);
      getOrders(user.token, "vendor", vendor.service.id)
        .then((res) => {
          if (res.data) {
            setLoader(false);
            // console.log(res.data.orders);
            //console.log(res.data.orders[0].service.serviceCenterName);
            setAllOrders(res.data.orders);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
    }
  }, [user + Refresh]);
  React.useEffect(() => {
    if (AllOrders) {
      let arr = [];
      AllOrders.forEach((doc, i) => {
        if (doc.service.gigs[0].type == Active) {
          arr.push(doc);
        }
      });
      setOrders(arr);
    }
  }, [Active + AllOrders]);
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
        <View style={{ height: 33 }} />
        <ScrollView
          style={{
            marginVertical: 20,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: 10 }} />
          {initialState &&
            initialState.map((doc, i) => (
              <Button
                onPress={() => {
                  setActive(doc.type);
                }}
                style={{
                  color: Active == doc.type ? "white" : textColor,
                  marginRight: 10,
                  backgroundColor:
                    Active == doc.type ? backgroundColor : primaryColor,
                }}
                active={Active == doc.type ? true : false}
                key={i}
                title={doc.title}
              />
            ))}
          <View style={{ width: 0 }} />
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 0,
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              paddingHorizontal: 10,
              paddingVertical: 5,
              flex: 2,
              borderRadius: 5,
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholderTextColor={assentColor}
              placeholder="Search Now"
            />
            <AntDesign name="search1" size={24} color={assentColor} />
          </View>
          <DropDown
            style={{
              marginLeft: 15,
            }}
            DATA={["Paid", "Due", "Refound"]}
            placeholder="Select"
          />
        </View>
      </Animated.View>
    );
  };
  return (
    <ScrollView
      style={{ flexGrow: 1 }}
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
      {Loader && <ActivityLoader />}
      {Orders &&
        Orders.map((doc, i) => (
          <OrderCart
            onPress={() => {
              navigation.navigate("VendorOrderDetails", { data: doc });
            }}
            key={i}
            data={doc}
          />
        ))}

      {Orders && Orders.length == 0 && (
        <Text style={{ color: textColor, textAlign: "center" }}>
          No data available
        </Text>
      )}
    </ScrollView>
  );
};

export default Order;

const OrderCart = ({ data, onPress }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
          dispatch({ type: "SET_LIST_SELECTION", playload: [] });
        }
      }}
    >
      <View
        style={{
          backgroundColor: primaryColor,
          marginHorizontal: 10,
          marginVertical: 5,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 5,
          shadowOffset: {
            height: 1,
            width: 1,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 2,
          shadowColor: "#d5d5d5",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
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
              {data && data.user.profilePhoto ? (
                <Image
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  source={{ uri: data.user.profilePhoto }}
                />
              ) : (
                <FontAwesome name="user" size={35} color={assentColor} />
              )}
            </View>
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                marginRight: 20,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {data ? data.user.firstName : "Um"}{" "}
                {data ? data.user.lastName : "Um"}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: textColor,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {"Id: "}
                {data ? data.id : "Empty position"}
              </Text>
            </View>
          </View>
          <SvgXml xml={icon} height="24" width="24" />
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
            alignItems: "flex-start",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", paddingHorizontal: 10 }}
          >
            <Text
              numberOfLines={2}
              style={{
                color: textColor,
                fontSize: 14,
                fontFamily: "Poppins-Medium",
              }}
            >
              {data
                ? data.service.gigs[0].title
                : "I will give you a best service"}
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
          <View
            style={{ flex: 1, alignItems: "center", paddingHorizontal: 10 }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                color: textColor,
                fontFamily: "Poppins-Medium",
              }}
            >
              Offer Price {data ? data.service.gigs[0].price : "0"}৳
            </Text>
            <View
              style={{
                padding: 3,
                backgroundColor: data && data.paid ? "green" : backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                paddingHorizontal: 15,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {data && data.paid ? "Paid" : "Due"}
              </Text>
            </View>
          </View>
          <View
            style={{ width: 1, backgroundColor: "#e5e5e5", height: "50%" }}
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text>
              {data && data.status ? exporters(data.status) : "Unknown"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="15.069" height="14.313" viewBox="0 0 15.069 14.313">
<path id="Path_19954" data-name="Path 19954" d="M4.449,13.449a8.24,8.24,0,0,1,7.364.606,7.274,7.274,0,0,1,1.894,1.7,6.332,6.332,0,0,1,1.362,3.8v.184a6.279,6.279,0,0,1-.98,3.24,7.185,7.185,0,0,1-2.454,2.345,8.242,8.242,0,0,1-7.168.506A10.731,10.731,0,0,1,2.5,26.65a15.434,15.434,0,0,1-2.2.512.262.262,0,0,1-.295-.2V26.9a.414.414,0,0,1,.114-.213A3.522,3.522,0,0,0,.8,25.4a10.3,10.3,0,0,0,.4-2.1,6.516,6.516,0,0,1-.956-1.975A6.37,6.37,0,0,1,0,19.728v-.179a6.332,6.332,0,0,1,1.376-3.817,7.444,7.444,0,0,1,3.072-2.284m-.635,5.2a1,1,0,1,0,1.1.535,1.007,1.007,0,0,0-1.1-.535m3.531,0a1,1,0,1,0,1.072.509,1.008,1.008,0,0,0-1.072-.509m3.5,0a1,1,0,1,0,1.08.5A1.007,1.007,0,0,0,10.847,18.651Z" transform="translate(0 -12.853)" fill="#546a79"/>
</svg>`;
const exporters = (key) => {
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return "Waiting for accept";
    case "ACCEPTED":
      return "Accepted";
    case "WAITING_FOR_PAYMENT":
      return "Waiting for payment";
    case "PROCESSING":
      return "Processing";
    case "DELIVERED":
      return "Delivery";
    case "REFUNDED":
      return "Refound";
    case "CANCELLED":
      return "Cancelled";
    case "COMPLETED":
      return "Completed";
    default:
      return "Unknown";
  }
};
