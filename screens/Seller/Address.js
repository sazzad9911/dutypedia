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
import {useSelector,useDispatch} from 'react-redux';
import IconButton from "../../components/IconButton";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";

const Address = ({ navigation }) => {
  const DATA = ["Dhaka", "Borishal", "Slyhet"];
  const [Division, setDivision] = React.useState();
  const [District, setDistrict] = React.useState();
  const [Area, setArea] = React.useState();
  const [NewDistrictList, setDistrictList] = React.useState([]);
  const [NewAreaList, setAreaList] = React.useState([]);
  const [DivisionError, setDivisionError] = React.useState();
  const [DistrictError, setDistrictError] = React.useState();
  const [AreaError, setAreaError] = React.useState();
  const [address, setAddress] = React.useState();
  const [AddressError, setAddressError] = React.useState();
  const dispatch = useDispatch();
  const businessForm = useSelector((state) => state.businessForm);
  const isFocused=useIsFocused()

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
  React.useEffect(() => {
    if(businessForm&&businessForm.division){
      setDivision(businessForm.division)
    }
    if(businessForm&&businessForm.district){
      setDistrict(businessForm.district)
    }
    if(businessForm&&businessForm.area){
      setArea(businessForm.area)
    }
    if(businessForm&&businessForm.address){
      setAddress(businessForm.address)
    }

  },[businessForm])
  const checkValidity = () => {
    setDivisionError(null);
    setDistrictError(null);
    setAreaError(null);
    setAddressError(null);
    if (!Division) {
      setDivisionError("This field is required");
      return;
    }
    if (!District) {
      setDistrictError("This field is required");
      return;
    }
    if (!Area) {
      setAreaError("This field is required");
      return;
    }
    dispatch({type: 'DIVISION',playload:Division})
    dispatch({type:'DISTRICT',playload:District})
    dispatch({type:'AREA',playload:Area})
    dispatch({type:'ADDRESS',playload:address})
    navigation.navigate("Review");
  };
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <DropDown value={Division}
            error={DivisionError}
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
            <DropDown value={District}
              error={DistrictError}
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
              message="Please select division first."
            />
            <DropDown value={Area}
              error={AreaError}
              onChange={(val) => {
                setArea(val);
              }}
              style={{
                marginTop: "10%",
                marginHorizontal: 20,
                width: width / 2 - 40,
              }}
              DATA={NewAreaList}
              placeholder="Area"
              message="Please select division & district first."
            />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <TextArea
              value={address}
              onChange={(val) => {
                setAddress(val);
              }}
              error={AddressError}
              style={{
                marginTop: "5%",
              }}
              placeholder="Address"
            />
          </View>
          <IconButton
            onPress={() => {
              checkValidity();
            }}
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
