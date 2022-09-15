import React from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { headerSvg } from "../../assets/icon";
import { primaryColor, backgroundColor } from "./../../assets/colors";
import Input from "./../../components/Input";
import DropDown from "./../../components/DropDown";
import TextArea from "./../../components/TextArea";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import { AreaList } from "../../Data/area";
import { DivisionList } from "../../Data/division";
import { DistrictList } from "../../Data/district";

const Address = () => {
  const DATA = ["Dhaka", "Borishal", "Slyhet"];
  const [Division, setDivision] = React.useState();
  const [District, setDistrict] = React.useState();
  const [Area, setArea] = React.useState();
  const [NewDistrictList, setDistrictList] = React.useState([]);
  const [NewAreaList, setAreaList] = React.useState([]);

  const searchDistrict = (value) => {
    if (value) {
      let arr = DistrictList.filter((d) => d.title === value);
      setDistrictList(arr[0].data);
    } else {
      setDistrictList([]);
    }
  };
  const searchArea = (value) => {
    if (value) {
      let arr = AreaList.filter((d) => d.title === value);
      setAreaList(arr[0].data);
    } else {
      setAreaList([]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView>
        <View style={{ backgroundColor: primaryColor, flex: 1 }}>
          <SvgXml
            style={{
              position: "absolute",
              top: -50,
              left: -2,
            }}
            xml={headerSvg}
            width="100%"
          />
          <Text
            style={{
              fontSize: 37,
              fontFamily: "Poppins-Light",
              color: "white",
              marginTop: 25,
              marginLeft: 20,
            }}
          >
            One More
          </Text>
          <Text
            style={{
              fontSize: 37,
              fontFamily: "Poppins-Light",
              color: "white",
              marginTop: 20,
              marginLeft: 80,
            }}
          >
            Step to Go
          </Text>
          <DropDown
            style={{
              marginTop: "40%",
              marginHorizontal: 20,
            }}
            DATA={DivisionList}
            placeholder="Division"
            onChange={(val) => {
              setDivision(val);
              searchDistrict(val);
            }}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <DropDown
              style={{
                marginTop: "10%",
                marginHorizontal: 20,
                width: width / 2 - 40,
              }}
              DATA={NewDistrictList}
              placeholder="District"
              onChange={(value) => {
                setDistrict(value);
                searchArea(value);
              }}
            />
            <DropDown
              style={{
                marginTop: "10%",
                marginHorizontal: 20,
                width: width / 2 - 40,
              }}
              DATA={NewAreaList}
              placeholder="Area"
            />
          </View>
          <TextArea
            style={{
              marginTop: "5%",
              marginHorizontal: 20,
            }}
            placeholder="Address"
          />
          <Button
            style={{
              marginTop: "20%",
              marginBottom: "20%",
              borderRadius: 5,
              backgroundColor: backgroundColor,
              color: "white",
              marginHorizontal: 20,
              borderWidth: 0,
              height: 45,
            }}
            title="Continue"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Address;
