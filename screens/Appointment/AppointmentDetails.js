import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { primaryColor, secondaryColor, textColor } from "../../assets/colors";
const { width, height } = Dimensions.get("window");
import Animated, {
  ZoomIn,FadeIn,FadeInDown
} from "react-native-reanimated";
import OutsideView from "react-native-detect-press-outside";
import { backgroundColor } from './../../assets/colors';

const AppointmentDetails = ({ route, navigation }) => {
  const [Visible, setVisible] = React.useState(false);
  const ref = React.useRef();
  const params = route.params;

  return (
    <ScrollView>
      <OutsideView
        childRef={ref}
        onPressOutside={() => {
          setVisible(false);
        }}
      >
        <View
          style={{
            marginTop: 20,
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
              }}
            >
              01/012/2022
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
              <View style={{flexDirection: "row"}}>
                <SmallButton style={{
                  backgroundColor:'red',
                  marginRight:10
                }} title="Cancel"/>
                <SmallButton style={{
                  backgroundColor:'green'
                }} title="Accept"/>
              </View>
            ) : (
              <Entypo
                onPress={() => {
                  setVisible(!Visible);
                }}
                name="dots-three-vertical"
                size={24}
                color={textColor}
              />
            )}
          </View>
          <Text
            numberOfLines={1}
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              fontSize: 20,
              color: textColor,
              fontWeight: "bold",
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
            }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem{" "}
          </Text>
          <View
              ref={ref}
              style={{
                position: "absolute",
                right: 40,
                top: 18,
                zIndex: 1,
                backgroundColor: primaryColor,
              }}
            >
              {Visible ? (
                <Animated.View
                  
                  style={{
                    backgroundColor: primaryColor,
                    width: 180,
                    borderWidth: 1,
                    borderColor: "#e5e5e5",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <MenuItem title="Cancel Appointment" />
                  <View style={{ height: 1, backgroundColor: "#e5e5e5" }} />
                  <MenuItem title="Complete" />
                </Animated.View>
              ) : (
                <></>
              )}
            </View>
        </View>
      </OutsideView>
    </ScrollView>
  );
};

export default AppointmentDetails;
const MenuItem = ({ title }) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
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
const SmallButton=({title,style,onPress})=>{
  return(
    <TouchableOpacity onPress={()=>{
      if(onPress){
        onPress()
      }
    }} style={[{
      backgroundColor:'blue',
      margin:2,
      paddingVertical: 5,
      paddingHorizontal:15,
      borderRadius:5
    },style]}>
      <Text style={{
        color:'white',
        fontSize:13,
        fontWeight:'bold'
      }}>{title}</Text>
    </TouchableOpacity>
  )
}