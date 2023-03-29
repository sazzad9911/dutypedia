import React from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native";
import { map } from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import { primaryColor, textColor, backgroundColor } from "../../assets/colors";
const { width, height } = Dimensions.get("window");
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

const VendorAddress = ({route}) => {
  const vendor = useSelector((state) => state.vendor);
  const address=route?.params?.address;

  return (
    <View style={{ flex: 1 }}>
      <SvgXml
        xml={map}
        style={{ flex: 1, paddingHorizontal: 20, position: "absolute" }}
      />
      <View style={{
        flex: 1,
        justifyContent: "center"
      }}>
        <Text
          style={[
            styles.text,
          ]}
        >
          Your Physical
        </Text>
        <Text style={styles.text}>Address</Text>
        <View
          style={{
            backgroundColor: primaryColor,
            marginHorizontal: 20,
            marginTop: 50,
            borderRadius: 10,
            paddingBottom:20
          }}
        >
          <Options
            title={"City"}
            subTitle={vendor ? vendor.location.region:address?address.division : ""}
          />
          <Options
            title={"District"}
            subTitle={vendor ? vendor.location.city:address?address.district : ""}
          />
          <Options
            title={"Area"}
            subTitle={vendor ? vendor.location.area:address?address.area : ""}
          />
          {vendor && vendor.location.address && (
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                marginVertical: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Light",
                  color: textColor,
                }}
              >
                {vendor.location.address}
              </Text>
              <TouchableOpacity>
                <FontAwesome5 name="edit" size={20} color={textColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default VendorAddress;
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginHorizontal: 20,
    lineHeight: 70,
    fontFamily: "Poppins-Light",
  },
});
const Options = ({ title, subTitle,onPress }) => {
  const vendor=useSelector(state=>state.vendor)

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 20,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins-Medium",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Poppins-Light",
          }}
        >
          {subTitle}
        </Text>
      </View>
      {vendor&&(
        <TouchableOpacity onPress={()=>{
          if(onPress){
              onPress()
          }
        }}>
          <FontAwesome5 name="edit" size={20} color={textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};
