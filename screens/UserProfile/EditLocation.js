import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Group from "./../../assets/Images/Group.png";
const { width, height } = Dimensions.get("window");
import IconButton from "../../components/IconButton";
import MenuItem from "../../components/Profile/MenuItem";
import ViewMore from "../../Hooks/ViewMore";
import { styles } from "../create_dashboard/BusinessTitle";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import InputButton from "../Vendor/account/InputButton";
import { Screen } from "../create_dashboard/Location";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { updateUserAddress, updateUserData } from "../../Class/update";
import { getUserInfo } from "../../Class/member";
import { storeJson } from "../../Class/storage";
import customStyle from "../../assets/stylesheet";
import ActivityLoader from "../../components/ActivityLoader";

export default function EditLocation({ navigation }) {
  const [type, setType] = useState("Only me");
  const [visible, setVisible] = React.useState(false);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();
  const [area, setArea] = useState();
  const [address, setAddress] = useState();
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef(null);
  const [select, setSelect] = useState();
  const [districtError, setDistrictError] = useState();
  const [areaError, setAreaError] = useState();
  // variables
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const snapPoints = useMemo(() => ["70%"], []);
  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
    setIndex(index);
  }, []);
  //console.log(user?.user)
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
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

  useEffect(() => {
    if (user?.user?.address) {
      setDivision(user?.user?.address?.division)
      setDistrict(user?.user?.address?.district)
      setArea(user?.user?.address?.thana)
      setAddress(user?.user?.address?.address)
    }
    if (user) {
      setType(user?.user?.hideAddress ? "Only me" : "Public");
    }
  }, [user?.user?.address]);

  const updateUser = async (types) => {
    // console.log(`${division}, ${district}, ${area}${address?",":""} ${address?address:""}`)
    // return
    setLoader(true);
    try {
      await updateUserAddress(user.token, division, district, area, address);
    } catch (err) {
      console.error(err.message);
    }

    updateUserData(user.token, {
      hideAddress: type == "Only me" ? true : false,
    })
      .then((res) => {
        //console.log(res.data)
        getUser(res.data.token);
        console.warn("Upload Successful");
      })
      .catch((err) => {
        setLoader(false);
        console.error(err.response.data.msg);
      });
  };
  const getUser = async (token) => {
    const res = await getUserInfo(user.token, user.user.id);
    setLoader(false);
    storeJson("user", {
      token: token,
      user: res.data.user,
    });
    dispatch({
      type: "SET_USER",
      playload: {
        token: token,
        user: res.data.user,
      },
    });
    navigation.goBack();
  };
  if (loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <Image
            style={{
              width: width - 40,
              height: 230,
              marginTop: 36,
            }}
            source={Group}
          />

          <View style={{ marginBottom: 32 }}>
            <View style={{ flexDirection: "row", marginTop: 36 }}>
              <SvgXml xml={light} />
              <Text
                style={{
                  fontWeight: "500",
                  
                  fontSize: 24,
                  marginLeft: 8,
                  flex: 1,
                }}>
                Why are we asking for your address?
              </Text>
            </View>
            <ViewMore
              view={true}
              style={{
                marginTop: 24,
              }}
              lowHeight={70}
              width={167}
              position={{
                bottom: 0,
              }}
              height={layoutHeight}
              component={
                <View
                  style={{ width: "100%" }}
                  onLayout={(e) =>
                    setLayoutHeight(e.nativeEvent.layout.height)
                  }>
                  <Text style={[styles.spText, { marginTop: 0 }]}>
                    At Duty, we understand that your privacy is important to
                    you. That's why we offer you the option to keep your address
                    information private by selecting the "Only Me" option. This
                    means that no one else will be able to see your address
                    without your consent.
                  </Text>
                  <Text style={[styles.spText, { marginTop: 24 }]}>
                    However, providing your location information can greatly
                    enhance your experience on our platform. By sharing your
                    location, you can easily find products and services that are
                    available near you, making your search more efficient and
                    saving you valuable time.
                  </Text>
                  <Text style={[styles.spText, { marginTop: 24 }]}>
                    In addition, sharing your address with potential buyers or
                    sellers is necessary for the seamless and secure connection
                    between you and them. This ensures that your transactions
                    are smooth and hassle-free, with products or services
                    delivered to the correct location.
                  </Text>
                  <Text style={[styles.spText, { marginTop: 24 }]}>
                    Rest assured that we take privacy and security very
                    seriously at Duty. We only share your information with
                    relevant parties in order to facilitate your transactions,
                    and your data is kept confidential and secure.
                  </Text>
                  <Text style={[styles.spText, { marginTop: 24 }]}>
                    Thank you for trusting us with your address information. We
                    are committed to providing you with a safe, convenient, and
                    enjoyable shopping experience on our platform
                  </Text>
                </View>
              }
            />
          </View>
          <View>
            <Text style={[newStyle.text, { marginTop: 0 }]}>Division</Text>
            <InputButton
              value={division}
              onPress={() => {
                setSelect("Division");
                setIndex(0);
              }}
              style={[styles.input, { marginTop: 8, borderColor: "#a3a3a3" }]}
              placeholder={"Division"}
            />

            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <View>
                <Text style={newStyle.text}>District</Text>
                <InputButton
                  error={districtError}
                  onPress={() => {
                    setDistrictError();
                    setAreaError();
                    if (!division) {
                      setDistrictError("Select division");
                      return;
                    }
                    setSelect("District");
                    setIndex(0);
                  }}
                  value={district}
                  style={[
                    styles.input,
                    {
                      marginTop: 8,
                      width: width / 2 - 26.5,
                      borderColor: "#a3a3a3",
                    },
                  ]}
                  placeholder="District"
                />
              </View>
              <View style={{ width: 13 }} />
              <View>
                <Text style={newStyle.text}>Thana</Text>
                <InputButton
                  error={areaError}
                  onPress={() => {
                    setDistrictError();
                    setAreaError();
                    if (!district) {
                      setAreaError("Select district");
                      return;
                    }
                    setSelect("Area");
                    setIndex(0);
                  }}
                  value={area}
                  style={[
                    styles.input,
                    {
                      marginTop: 8,
                      width: width / 2 - 26.5,
                      borderColor: "#a3a3a3",
                    },
                  ]}
                  placeholder="Thana"
                />
              </View>
            </View>
            <Text style={[newStyle.text, { marginTop: 12 }]}>Address</Text>
            <TextArea
              value={address}
              onChange={setAddress}
              style={[styles.input, { marginTop: 8, borderColor: "#a3a3a3" }]}
              placeholder={"Address"}
            />
            <View
              style={{
                alignItems: "flex-end",
                marginTop: 24,
              }}>
              <MenuItem
                onChange={setType}
                visible={visible}
                onClose={closeMenu}
                button={
                  <IconButton
                    style={{
                      borderWidth: 0,
                    }}
                    LeftIcon={() => (
                      <SvgXml xml={type == "Only me" ? onlyme : pub} />
                    )}
                    Icon={() => <SvgXml xml={arrow} />}
                    onPress={openMenu}
                    title={type}
                  />
                }
              />
            </View>
            <IconButton
              onPress={updateUser}
              active={division && district && area ? true : false}
              disabled={division && district && area ? false : true}
              style={[styles.button, { marginTop: 36 }]}
              title={"Update"}
            />
          </View>
        </View>
      </ScrollView>
      {index != -1 && (
        <View
          style={{
            backgroundColor: "#00000010",
            position: "absolute",
            width: width,
            height: height,
            top: 0,
          }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}>
        {select == "Division" ? (
          <Screen
            onChange={(e) => {
              setDivision(e);
            }}
            onClose={() => bottomSheetRef?.current?.close()}
            select={division}
            type={select}
          />
        ) : select == "District" ? (
          <Screen
            onChange={(e) => {
              setDistrict(e);
            }}
            onClose={() => bottomSheetRef?.current?.close()}
            select={district}
            type={select}
            value={division}
          />
        ) : (
          <Screen
            onChange={(e) => {
              setArea(e);
            }}
            onClose={() => bottomSheetRef?.current?.close()}
            select={area}
            type={select}
            value={district}
          />
        )}
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}
const address = `<svg width="18" height="29" viewBox="0 0 18 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 10.7C16.45 6.08 12.42 4 8.87998 4H8.86998C5.33998 4 1.29998 6.07 0.249978 10.69C-0.920022 15.85 2.23998 20.22 5.09998 22.97C6.1137 23.9512 7.46918 24.4998 8.87998 24.5C10.24 24.5 11.6 23.99 12.65 22.97C15.51 20.22 18.67 15.86 17.5 10.7ZM8.87998 15.71C8.46631 15.71 8.0567 15.6285 7.67453 15.4702C7.29235 15.3119 6.9451 15.0799 6.65259 14.7874C6.36009 14.4949 6.12806 14.1476 5.96976 13.7655C5.81146 13.3833 5.72998 12.9737 5.72998 12.56C5.72998 12.1463 5.81146 11.7367 5.96976 11.3545C6.12806 10.9724 6.36009 10.6251 6.65259 10.3326C6.9451 10.0401 7.29235 9.80808 7.67453 9.64978C8.0567 9.49148 8.46631 9.41 8.87998 9.41C9.71541 9.41 10.5166 9.74187 11.1074 10.3326C11.6981 10.9234 12.03 11.7246 12.03 12.56C12.03 13.3954 11.6981 14.1966 11.1074 14.7874C10.5166 15.3781 9.71541 15.71 8.87998 15.71Z" fill="#767676"/>
</svg>
`;
const light = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="24" height="24" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_4970_40895" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_4970_40895" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;
const onlyme = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8.78049C9.16707 8.78049 10.2863 8.31795 11.1116 7.49462C11.9368 6.67128 12.4004 5.55461 12.4004 4.39024C12.4004 3.22588 11.9368 2.1092 11.1116 1.28587C10.2863 0.462542 9.16707 0 8 0C6.83293 0 5.71366 0.462542 4.88842 1.28587C4.06318 2.1092 3.59956 3.22588 3.59956 4.39024C3.59956 5.55461 4.06318 6.67128 4.88842 7.49462C5.71366 8.31795 6.83293 8.78049 8 8.78049ZM8 10.9756C3.59076 10.9756 0 13.9259 0 17.561C0 17.8068 0.193619 18 0.440044 18H15.56C15.8064 18 16 17.8068 16 17.561C16 13.9259 12.4092 10.9756 8 10.9756Z" fill="#767676"/>
</svg>
`;
const pub = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C3.58161 0 0 3.58161 0 8C0 12.4184 3.58161 16 8 16C12.4184 16 16 12.4184 16 8C16 3.58161 12.4184 0 8 0ZM10.6545 11.5355C10.5287 11.6606 10.3968 11.7919 10.2897 11.8994C10.1932 11.9961 10.1252 12.1155 10.0906 12.2448C10.0419 12.4274 10.0026 12.6119 9.93677 12.789L9.37581 14.3003C8.93194 14.3971 8.47258 14.4516 8 14.4516V13.5684C8.05452 13.1613 7.75355 12.3987 7.27 11.9152C7.07645 11.7216 6.96774 11.459 6.96774 11.1852V10.1526C6.96774 9.7771 6.76548 9.43194 6.43677 9.25032C5.97323 8.99387 5.31387 8.63548 4.86226 8.40806C4.49194 8.22161 4.14935 7.98419 3.84129 7.70645L3.81548 7.68323C3.59518 7.48437 3.39958 7.25974 3.2329 7.01419C2.93032 6.57 2.43742 5.83935 2.1171 5.36452C2.77742 3.89677 3.96742 2.71806 5.44613 2.07774L6.22064 2.46516C6.56387 2.63677 6.96774 2.38742 6.96774 2.00355V1.63903C7.22548 1.59742 7.48774 1.57097 7.75452 1.56097L8.66742 2.47387C8.86903 2.67548 8.86903 3.00226 8.66742 3.20387L8.51613 3.35484L8.18258 3.68839C8.08193 3.78903 8.08193 3.95258 8.18258 4.05323L8.33387 4.20452C8.43452 4.30516 8.43452 4.46871 8.33387 4.56935L8.07581 4.82742C8.02735 4.87578 7.96168 4.90293 7.89323 4.9029H7.60323C7.53613 4.9029 7.47161 4.92903 7.42323 4.97613L7.10323 5.28742C7.064 5.32562 7.03793 5.37529 7.02876 5.42927C7.0196 5.48325 7.02783 5.53874 7.05226 5.58774L7.55516 6.59387C7.64097 6.76548 7.51613 6.96742 7.32452 6.96742H7.14258C7.08032 6.96742 7.02032 6.94484 6.97355 6.90419L6.67419 6.64419C6.60645 6.58543 6.52458 6.5453 6.43663 6.52777C6.34868 6.51023 6.25768 6.5159 6.17258 6.54419L5.1671 6.87935C5.09033 6.90495 5.02357 6.95406 4.97627 7.01971C4.92896 7.08537 4.90352 7.16424 4.90355 7.24516C4.90355 7.39129 4.98613 7.52452 5.11677 7.59L5.47419 7.76871C5.77774 7.92064 6.11258 7.99968 6.45194 7.99968C6.79129 7.99968 7.18064 8.88 7.48419 9.03193H9.63742C9.91129 9.03193 10.1735 9.14064 10.3674 9.33419L10.809 9.77581C10.9935 9.96037 11.0971 10.2107 11.0971 10.4716C11.097 10.6694 11.0579 10.8651 10.9819 11.0477C10.906 11.2303 10.7947 11.396 10.6545 11.5355ZM13.4516 8.58871C13.2648 8.54193 13.1019 8.42742 12.9952 8.2671L12.4152 7.3971C12.3303 7.26999 12.285 7.12058 12.285 6.96774C12.285 6.8149 12.3303 6.6655 12.4152 6.53839L13.0471 5.59064C13.1219 5.47871 13.2245 5.38774 13.3452 5.32774L13.7639 5.11839C14.2 5.98677 14.4516 6.96355 14.4516 8C14.4516 8.27968 14.4277 8.55355 14.3929 8.82387L13.4516 8.58871Z" fill="#767676"/>
</svg>
`;
const arrow = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1L8.06061 6.5118C7.47727 7.16273 6.52273 7.16273 5.93939 6.5118L1 1" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const newStyle = StyleSheet.create({
  text: {
    fontSize: 16,
    
    fontWeight: "400",
  },
});
