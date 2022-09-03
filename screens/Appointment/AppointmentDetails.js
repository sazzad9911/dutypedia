import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { primaryColor, secondaryColor, textColor } from "../../assets/colors";
const { width, height } = Dimensions.get("window");
import Animated, { ZoomIn, FadeIn, FadeInDown } from "react-native-reanimated";
import OutsideView from "react-native-detect-press-outside";
import { backgroundColor } from "./../../assets/colors";
import { Menu, Divider, Provider } from "react-native-paper";

const AppointmentDetails = ({ route, navigation }) => {
  const [Visible, setVisible] = React.useState(false);
  const ref = React.useRef();
  const params = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Provider
        childRef={ref}
        onPressOutside={() => {
          //setVisible(false);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            alignItems: "center",
            backgroundColor: primaryColor,
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 5,
              margin: 10,
              marginLeft: 0,
            }}
            source={{
              uri: "https://www.ouc.com/images/business/3-4.jpg?sfvrsn=3294c0f0_2",
            }}
          />
          <View style={{}}>
            <Text
              style={{
                color: textColor,
                fontFamily: "Poppins-Medium",
              }}
            >
              Easin Arafat
            </Text>
            <Text
              style={{
                color: textColor,
                fontFamily: "Poppins-Medium",
                marginTop: -5,
              }}
            >
              @easinarafat
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 0,
            backgroundColor: primaryColor,
            minHeight: height - 110,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Medium",
              }}
            >
              01/012/2022 08:00 AM
            </Text>

            {params && params.status && params.status == "ok" ? (
              <Text
                style={{
                  fontSize: 15,
                  color: "green",
                }}
              >
                {params && params.request ? "(Accepted)" : "(Completed)"}
              </Text>
            ) : params && params.status ? (
              <Text
                style={{
                  fontSize: 15,
                  color: "red",
                }}
              >
                {"(Canceled)"}
              </Text>
            ) : params && params.request ? (
              <View style={{ flexDirection: "row" }}>
                <SmallButton
                  style={{
                    backgroundColor: "red",
                    marginRight: 10,
                  }}
                  title="Cancel"
                />
                {params && params.sent ? (
                  <></>
                ) : (
                  <SmallButton
                    style={{
                      backgroundColor: "green",
                    }}
                    title="Accept"
                  />
                )}
              </View>
            ) : (
              <Menu
                style={{
                  marginTop: -68,
                  marginLeft: -25,
                }}
                contentStyle={{
                  backgroundColor: primaryColor,
                  padding: 10,
                }}
                visible={Visible}
                onDismiss={() => setVisible(!Visible)}
                anchor={
                  <Entypo
                    onPress={() => {
                      setVisible(!Visible);
                    }}
                    name="dots-three-vertical"
                    size={24}
                    color={textColor}
                  />
                }
              >
                <MenuItem
                  onPress={() => {
                    setVisible(false);
                  }}
                  title="Cancel Appointment"
                />
                <View style={{ height: 1, backgroundColor: "#e5e5e5" }} />
                <MenuItem
                  onPress={() => {
                    setVisible(false);
                  }}
                  title="Complete"
                />
              </Menu>
            )}
          </View>
          <Text
            numberOfLines={1}
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              fontSize: 18,
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}
          >
            Business Deal And Contract Sign
          </Text>
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              color: textColor,
              textAlign: "justify",
              fontFamily: "Poppins-Light",
            }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem{" "}
          </Text>
        </View>
      </Provider>
    </ScrollView>
  );
};

export default AppointmentDetails;
const MenuItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={{
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins-Light",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
});
const SmallButton = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={[
        {
          backgroundColor: "blue",
          margin: 2,
          paddingVertical: 5,
          paddingHorizontal: 15,
          borderRadius: 5,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: "white",
          fontSize: 13,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
