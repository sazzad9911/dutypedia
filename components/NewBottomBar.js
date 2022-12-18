import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Color } from "./../assets/colors";
import { Badge } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { dashboard, order } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { checkVendor } from "./../Class/auth";
import { useDispatch } from "react-redux";

const NewBottomBar = (props) => {
  const navigation = props.navigation;
  const [route, setRoute] = React.useState(0);
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = useSelector((state) => state.vendor);
  const [User, setUser] = React.useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();

  React.useEffect(() => {
    if (vendor) {
      setUser(true);
    } else {
      setUser(false);
    }
    //console.log(vendorInfo)
  }, [vendor]);
 
  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  if (keyboardStatus) {
    return <></>;
  }
  const styles = StyleSheet.create({
    box: {
      backgroundColor: primaryColor,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 5,
      shadowOffset: {
        height: 1,
        width: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 13,
      color: "#808080",
      fontFamily: "Poppins-Light",
    },
  });

  return (
    <Animated.View entering={FadeIn} style={styles.box}>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Home");
            setRoute(0);
        }}
        style={styles.button}
      >
        {vendor ? (
          <>
            {route == 0 ? (
              <SvgXml xml={dashboard} height="24" width="24" />
            ) : (
              <SvgXml xml={dashboard} height="24" width="24" />
            )}
            <Text style={styles.text}>Dashboard</Text>
          </>
        ) : (
          <>
            {route == 0 ? (
              <Ionicons name="home" size={24} color={backgroundColor} />
            ) : (
              <Ionicons name="home-outline" size={24} color="#808080" />
            )}
            <Text style={styles.text}>Home</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (route == 1&&vendor) {
            try {
              navigation.navigate("VendorOrder");
              return;
            } catch (e) {
              console.warn(e.message);
            }
          }
          dispatch({ type: "SET_INTEREST_CATEGORY", playload: "search" });
          navigation.navigate("Search");
          setRoute(1);
        }}
        style={styles.button}
      >
        {vendor ? (
          <>
            {route == 1 ? (
              <SvgXml xml={order} height="24" width="24" />
            ) : (
              <SvgXml xml={order} height="24" width="24" />
            )}
            <Text style={styles.text}>Order</Text>
          </>
        ) : (
          <>
            {route == 1 ? (
              <Ionicons name="search-sharp" size={24} color={backgroundColor} />
            ) : (
              <Ionicons name="search-outline" size={24} color="#808080" />
            )}
            <Text style={styles.text}>Search</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Message" });
          setRoute(2);
          if (Array.isArray(user)) {
            navigation.navigate("LogIn");
            return;
          }
          navigation.navigate("Message");
        }}
        style={styles.button}
      >
        {route == 2 ? (
          <Ionicons
            name="paper-plane-sharp"
            size={24}
            color={backgroundColor}
          />
        ) : (
          <Ionicons name="paper-plane-outline" size={24} color="#808080" />
        )}
        <Text style={styles.text}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Notification" });
          if (Array.isArray(user)) {
            navigation.navigate("LogIn");
            setRoute(3);
            return;
          }
          navigation.navigate("Notification");
          setRoute(3);
        }}
        style={styles.button}
      >
        <Badge
          style={{
            position: "absolute",
            top: -5,
            left: 25,
            zIndex: 10,
          }}
        >
          3
        </Badge>
        {route == 3 ? (
          <Ionicons
            name="notifications-sharp"
            size={24}
            color={backgroundColor}
          />
        ) : (
          <Ionicons name="notifications-outline" size={24} color="#808080" />
        )}
        <Text style={styles.text}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: "SET_INTEREST_CATEGORY", playload: "MainProfile" });
          if (Array.isArray(user)) {
            setRoute(4);
            navigation.navigate("LogIn");
            return;
          }
          if (route === 4) {
            try {
              navigation.navigate("MainProfile");
            } catch (e) {
              navigation.navigate("Profile");
              console.warn(e.message);
            } 
            setRoute(4);
          } else {
            navigation.navigate("Profile");
            setRoute(4);
          }
        }}
        style={styles.button}
      >
        {vendor ? (
          <>
            {route == 4 ? (
              <Ionicons name="menu" size={28} color={backgroundColor} />
            ) : (
              <Ionicons name="menu-outline" size={28} color="#808080" />
            )}
            <Text style={styles.text}>Menu</Text>
          </>
        ) : (
          <>
            {route == 4 ? (
              <Ionicons
                name="person-circle"
                size={24}
                color={backgroundColor}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={24}
                color="#808080"
              />
            )}
            <Text style={styles.text}>Profile</Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NewBottomBar;
