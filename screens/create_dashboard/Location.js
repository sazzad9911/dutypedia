import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  TextInput,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Input from "../../components/Input";
import { icon, styles } from "./BusinessTitle";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  convertDate,
  serverTimeToLocal,
  serverTimeToLocalDate,
} from "../../action";
import IconButton from "../../components/IconButton";
import TextArea from "../../components/TextArea";
import { ImageButton } from "../Seller/Service";
const { width, height } = Dimensions.get("window");
import Group from "./../../assets/Images/Group.png";
import ViewMore from "../../Hooks/ViewMore";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DistrictList } from "../../Data/district";
import InputButton from "../Vendor/account/InputButton";
import { AreaList } from "../../Data/area";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import PageChip from "./components/PageChip";

export default function Location({ navigation, route }) {
  const businessForm = useSelector((state) => state.businessForm);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [date, setDate] = useState();
  const data = route?.params?.data;
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [division, setDivision] = useState(businessForm?.division);
  const [district, setDistrict] = useState(businessForm?.district);
  const [area, setArea] = useState(businessForm?.area);
  const [address, setAddress] = useState(businessForm?.address);
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef(null);
  const scrollRef = useRef();
  const [select, setSelect] = useState();
  const [districtError, setDistrictError] = useState();
  const [areaError, setAreaError] = useState();

  // variables
  const snapPoints = useMemo(() => ["70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
    setIndex(index);
  }, []);
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PageChip currentPage={12} totalPage={14} />
        <View
          style={{
            marginTop: 24,
            paddingHorizontal: 20,
          }}>
          <Image
            style={{
              width: width - 40,
              height: 230,
            }}
            source={Group}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginTop: 36,
            }}>
            <SvgXml
              style={{
                marginRight: 8,
              }}
              xml={icon}
            />
            <Text style={[styles.headLine, { flex: 1 }]}>Tips for address</Text>
          </View>
          <ViewMore
            style={{
              marginTop: 24,
            }}
            width={142}
            height={layoutHeight}
            component={
              <Text
                onLayout={(e) => setLayoutHeight(e.nativeEvent.layout.height)}
                style={[styles.spText, { marginTop: 0 }]}>
                Set Your Address: As a seller, you may need to provide your
                address for internal purposes. If you are a company, please
                provide your business address. If you are an individual without
                a physical service center, you can provide your current
                location. Please note that your address will not be visible to
                buyers, it will only be used for internal purposes. day, please
                enter your preferred working hours instead. This will help
                buyers determine whether your services fit their needs.
              </Text>
            }
          />

          <Text style={[styles.headLine, { marginTop: 36 }]}>Address</Text>
          <InputButton
            value={division}
            onPress={() => {
              setSelect("Division");
              setIndex(0);
            }}
            style={styles.input}
            placeholder={"Division"}
          />

          <View style={{ flexDirection: "row", marginTop: 8 }}>
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
              style={[styles.input, { marginTop: 0, width: width / 2 - 28 }]}
              placeholder="District"
            />
            <View style={{ width: 16 }} />
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
              style={[styles.input, { marginTop: 0, width: width / 2 - 28 }]}
              placeholder="Area"
            />
          </View>
          <Input
            value={address}
            onChange={(e) => {
              if (e?.split("")?.length > 100) {
                return;
              }
              setAddress(e);
            }}
            style={[styles.input, { marginTop: 8 }]}
            placeholder={"Address"}
          />

          <IconButton
            active={division && district && area ? true : false}
            disabled={division && district && area ? false : true}
            onPress={() => {
              dispatch({ type: "DIVISION", playload: division });
              dispatch({ type: "DISTRICT", playload: district });
              dispatch({ type: "AREA", playload: area });
              dispatch({ type: "ADDRESS", playload: address });
              navigation.navigate("About", {
                data: {
                  keywords: data?.keywords,
                  serviceCenterName: data.serviceCenterName,
                  providerName: data.providerName,
                  gender: data.gender,
                  position: data.position,
                  numberOfTeam: data.numberOfTeam,
                  established: data.established,
                  workingTime: data.workingTime,
                  fullTime: data.fullTime,
                  price: data?.price,
                  serviceCategory: data?.serviceCategory,
                  skills: data?.skills,
                  facilities: data?.facilities,
                  serviceTitle: data.serviceTitle,
                  serviceDescription: data.serviceDescription,
                  images: data.images,
                  address: {
                    division: division,
                    district: district,
                    area: area,
                    address: address,
                  },
                },
              });
            }}
            style={styles.button}
            title={"Continue"}
          />
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

const vectorImage = `<svg width="353" height="230" viewBox="0 0 353 230" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask0_3642_71567)">
<path d="M352.614 0H0V230H352.614V0Z" fill="white"/>
</g>
<mask id="mask1_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask1_3642_71567)">
<path d="M264.265 71.783V62.4542H274.031H285.346V91.2962H306.117V128.818H285.346H285.036H264.886H264.265H197.261V71.783H264.265Z" fill="#CBE2E2"/>
</g>
<mask id="mask2_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask2_3642_71567)">
<path d="M282.842 71.0103H279.938V73.8485H282.842V71.0103Z" fill="white"/>
</g>
<mask id="mask3_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask3_3642_71567)">
<path d="M282.842 64.9934H279.938V67.8316H282.842V64.9934Z" fill="white"/>
</g>
<mask id="mask4_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask4_3642_71567)">
<path d="M303.302 95.3166H300.398V98.1548H303.302V95.3166Z" fill="white"/>
</g>
<mask id="mask5_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask5_3642_71567)">
<path d="M303.302 100.657H300.398V103.495H303.302V100.657Z" fill="white"/>
</g>
<mask id="mask6_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask6_3642_71567)">
<path d="M177.314 33.9342V58.949H165.872V47.518H140.941V82.8552H116.377V128.818H140.941H141.308H165.138H165.872H177.314H190.065H212.398V33.9342H177.314Z" fill="#CBE2E2"/>
</g>
<mask id="mask7_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask7_3642_71567)">
<path d="M174.495 33.9342V58.949H163.048V47.518H138.117V82.8552H113.558V128.818H138.117H138.484H162.314H163.048H174.495H187.245H209.579V33.9342H174.495Z" fill="#D3EBEB"/>
</g>
<mask id="mask8_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask8_3642_71567)">
<path d="M144.029 52.394H140.593V55.752H144.029V52.394Z" fill="white"/>
</g>
<mask id="mask9_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask9_3642_71567)">
<path d="M144.029 58.7053H140.593V62.0633H144.029V58.7053Z" fill="white"/>
</g>
<mask id="mask10_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask10_3642_71567)">
<path d="M150.891 52.394H147.455V55.752H150.891V52.394Z" fill="white"/>
</g>
<mask id="mask11_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask11_3642_71567)">
<path d="M150.891 58.7053H147.455V62.0633H150.891V58.7053Z" fill="white"/>
</g>
<mask id="mask12_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask12_3642_71567)">
<path d="M120.312 86.411H116.876V89.769H120.312V86.411Z" fill="white"/>
</g>
<mask id="mask13_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask13_3642_71567)">
<path d="M127.325 86.411H123.889V89.769H127.325V86.411Z" fill="white"/>
</g>
<mask id="mask14_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask14_3642_71567)">
<mask id="mask15_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask15_3642_71567)">
<path d="M310.094 117.222C310.094 113.873 307.505 110.966 304.088 110.745C303.938 110.736 303.787 110.731 303.637 110.731C300.925 110.731 298.596 112.295 297.518 114.545C296.398 114.117 295.188 113.873 293.913 113.873C289.959 113.873 286.556 116.136 284.96 119.407C283.384 118.795 281.666 118.455 279.863 118.455C273.434 118.455 268.031 122.746 266.487 128.561H310.094V117.222Z" fill="#71C7C2"/>
</g>
<mask id="mask16_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask16_3642_71567)">
<path d="M111.487 128.469H155.414C153.866 122.654 148.467 118.363 142.033 118.363C140.235 118.363 138.517 118.703 136.936 119.315C135.34 116.044 131.937 113.781 127.984 113.781C126.708 113.781 125.499 114.025 124.378 114.453C123.301 112.203 120.971 110.639 118.26 110.639C114.527 110.639 111.501 113.597 111.501 117.245C111.501 117.498 111.52 117.751 111.548 117.995H111.482V128.469H111.487Z" fill="#71C7C2"/>
</g>
<mask id="mask17_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask17_3642_71567)">
<path d="M84.1458 128.598H282.329" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<mask id="mask18_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask18_3642_71567)">
<path d="M287.573 128.598H310.042" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<mask id="mask19_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask19_3642_71567)">
<path d="M313.224 128.598H317.347" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<mask id="mask20_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask20_3642_71567)">
<path d="M75.3444 128.598H79.4627" stroke="#192A34" stroke-width="1.45" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<mask id="mask21_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask21_3642_71567)">
<path d="M251.289 83.4256C251.289 81.052 253.256 79.1292 255.685 79.1292C258.114 79.1292 260.081 81.052 260.081 83.4256C260.081 85.7992 258.114 87.722 255.685 87.722C253.256 87.722 251.289 85.7992 251.289 83.4256Z" fill="white"/>
</g>
<mask id="mask22_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask22_3642_71567)">
<path d="M252.103 86.1902C251.887 86.1902 251.769 86.4478 251.92 86.6042C252.861 87.5886 254.198 88.2096 255.685 88.2096C257.172 88.2096 258.509 87.5886 259.45 86.6042C259.601 86.4478 259.483 86.1902 259.267 86.1902H252.103Z" fill="#232F49"/>
</g>
<mask id="mask23_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask23_3642_71567)">
<path d="M256.137 87.7312H255.229V125.81H256.137V87.7312Z" fill="#232F49"/>
</g>
<mask id="mask24_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask24_3642_71567)">
<path d="M256.829 119.568H254.541V128.736H256.829V119.568Z" fill="#232F49"/>
</g>
<mask id="mask25_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask25_3642_71567)">
<path d="M175.422 83.4256C175.422 81.052 177.389 79.1292 179.818 79.1292C182.247 79.1292 184.214 81.052 184.214 83.4256C184.214 85.7992 182.247 87.722 179.818 87.722C177.394 87.722 175.422 85.7992 175.422 83.4256Z" fill="white"/>
</g>
<mask id="mask26_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask26_3642_71567)">
<path d="M176.241 86.1902C176.025 86.1902 175.907 86.4478 176.058 86.6042C176.994 87.5886 178.331 88.2096 179.818 88.2096C181.305 88.2096 182.642 87.5886 183.583 86.6042C183.734 86.4478 183.616 86.1902 183.4 86.1902H176.241Z" fill="#232F49"/>
</g>
<mask id="mask27_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask27_3642_71567)">
<path d="M180.275 87.7312H179.366V125.81H180.275V87.7312Z" fill="#232F49"/>
</g>
<mask id="mask28_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask28_3642_71567)">
<path d="M180.967 119.568H178.679V128.736H180.967V119.568Z" fill="#232F49"/>
</g>
<mask id="mask29_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask29_3642_71567)">
<path d="M213.269 66.838C211.287 63.2362 211.937 58.6868 215.076 55.982C216.766 54.5284 218.978 53.6452 221.406 53.6452C221.628 53.6452 221.844 53.6544 222.061 53.6682C228.782 54.1098 232.523 61.571 229.073 67.2244C226.259 71.8428 221.331 77.8734 221.331 77.8734C221.331 77.8734 215.928 71.668 213.269 66.838Z" fill="#DD4757"/>
</g>
<mask id="mask30_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask30_3642_71567)">
<path d="M224.169 62.1276C224.169 60.6372 222.931 59.4274 221.406 59.4274C219.881 59.4274 218.644 60.6372 218.644 62.1276C218.644 63.618 219.881 64.8278 221.406 64.8278C222.931 64.8278 224.169 63.618 224.169 62.1276Z" fill="white"/>
</g>
<mask id="mask31_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask31_3642_71567)">
<path d="M114.254 187.436V43.079C114.254 38.1938 110.202 34.2286 105.199 34.2286H44.4121C39.4136 34.2286 35.3564 38.1892 35.3564 43.079V187.436C35.3564 192.321 39.4089 196.287 44.4121 196.287H105.199C110.202 196.287 114.254 192.326 114.254 187.436Z" fill="#232F49"/>
</g>
<mask id="mask32_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask32_3642_71567)">
<path d="M38.6135 179.17H110.997V43.1572C110.997 39.9326 108.324 37.3198 105.02 37.3198H44.5862C41.2869 37.3198 38.6088 39.9326 38.6088 43.1572V179.17H38.6135Z" fill="#EEC441"/>
</g>
<mask id="mask33_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask33_3642_71567)">
<path d="M38.6135 179.17H110.997V43.1572C110.997 39.9326 108.324 37.3198 105.02 37.3198H44.5862C41.2869 37.3198 38.6088 39.9326 38.6088 43.1572V179.17H38.6135Z" fill="#CBE2E2"/>
</g>
<mask id="mask34_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask34_3642_71567)">
<path d="M95.7759 37.329C76.7233 55.9498 57.6708 74.5706 38.6182 93.1914V102.428C56.2399 85.2058 73.8617 67.9834 91.4787 50.7656C96.063 46.2852 100.643 41.8094 105.227 37.329H95.7759Z" fill="white"/>
</g>
<mask id="mask35_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask35_3642_71567)">
<path d="M111.002 84.5664V93.8032L91.4787 112.884C73.857 130.106 56.2352 147.329 38.6182 164.547V155.31C62.7445 131.726 86.8709 108.146 111.002 84.5664Z" fill="white"/>
</g>
<mask id="mask36_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask36_3642_71567)">
<path d="M38.6135 92.6348V101.872C45.1228 108.233 51.6274 114.591 58.1368 120.952L110.997 172.615V163.378C86.871 139.794 62.7446 116.214 38.6135 92.6348Z" fill="white"/>
</g>
<mask id="mask37_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask37_3642_71567)">
<path d="M79.4391 187.938C79.4391 185.435 77.3635 183.411 74.8077 183.411C72.2473 183.411 70.1764 185.44 70.1764 187.938C70.1764 190.44 72.252 192.464 74.8077 192.464C77.3682 192.469 79.4391 190.44 79.4391 187.938Z" fill="#1A2641"/>
</g>
<mask id="mask38_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask38_3642_71567)">
<path d="M49.2081 52.8954C48.0503 50.7932 48.4315 48.1344 50.2672 46.552C51.2508 45.701 52.5499 45.1858 53.9666 45.1858C54.0937 45.1858 54.2208 45.1904 54.3478 45.1996C58.2732 45.4572 60.4571 49.818 58.4473 53.1208C56.8047 55.8164 53.9242 59.34 53.9242 59.34C53.9242 59.34 50.7613 55.7152 49.2081 52.8954Z" fill="#232F49"/>
</g>
<mask id="mask39_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask39_3642_71567)">
<path d="M55.5763 50.14C55.5763 49.2706 54.8562 48.5622 53.9619 48.5622C53.0724 48.5622 52.3475 49.266 52.3475 50.14C52.3475 51.0094 53.0677 51.7178 53.9619 51.7178C54.8562 51.7178 55.5763 51.014 55.5763 50.14Z" fill="white"/>
</g>
<mask id="mask40_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask40_3642_71567)">
<path d="M67.7524 94.9072C65.4509 90.7304 66.2134 85.4588 69.8516 82.3262C71.8096 80.638 74.3747 79.6168 77.1893 79.6168C77.4435 79.6168 77.6976 79.626 77.9518 79.6398C85.7413 80.155 90.0809 88.803 86.0802 95.358C82.8185 100.708 77.1046 107.7 77.1046 107.7C77.1046 107.7 70.8353 100.501 67.7524 94.9072Z" fill="#DD4757"/>
</g>
<mask id="mask41_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask41_3642_71567)">
<path d="M80.3898 89.4424C80.3898 87.7174 78.959 86.3144 77.1893 86.3144C75.4196 86.3144 73.9888 87.7174 73.9888 89.4424C73.9888 91.172 75.4196 92.5704 77.1893 92.5704C78.959 92.5704 80.3898 91.172 80.3898 89.4424Z" fill="white"/>
</g>
<mask id="mask42_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask42_3642_71567)">
<path d="M94.7923 128.8C93.7474 126.905 94.091 124.517 95.743 123.096C96.6279 122.332 97.7952 121.868 99.0707 121.868C99.1883 121.868 99.3013 121.872 99.4142 121.882C102.944 122.116 104.912 126.035 103.1 129.007C101.622 131.431 99.0283 134.605 99.0283 134.605C99.0283 134.605 96.1902 131.335 94.7923 128.8Z" fill="#232F49"/>
</g>
<mask id="mask43_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask43_3642_71567)">
<path d="M100.52 126.321C100.52 125.539 99.8708 124.904 99.0706 124.904C98.2705 124.904 97.621 125.539 97.621 126.321C97.621 127.103 98.2705 127.737 99.0706 127.737C99.8708 127.737 100.52 127.107 100.52 126.321Z" fill="white"/>
</g>
<mask id="mask44_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask44_3642_71567)">
<path d="M61.0549 160.683C59.3511 157.587 59.9112 153.677 62.6081 151.354C64.0577 150.103 65.9639 149.344 68.049 149.344C68.2373 149.344 68.4255 149.348 68.6138 149.362C74.3889 149.744 77.6035 156.156 74.643 161.014C72.2238 164.979 67.9878 170.163 67.9878 170.163C67.9878 170.163 63.3376 164.832 61.0549 160.683Z" fill="#232F49"/>
</g>
<mask id="mask45_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask45_3642_71567)">
<path d="M70.4212 156.63C70.4212 155.351 69.3575 154.312 68.049 154.312C66.7406 154.312 65.6769 155.351 65.6769 156.63C65.6769 157.913 66.7406 158.948 68.049 158.948C69.3575 158.948 70.4212 157.913 70.4212 156.63Z" fill="white"/>
</g>
<mask id="mask46_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask46_3642_71567)">
<path d="M181.235 177.62C181.235 179.202 171.13 180.486 158.662 180.486C146.194 180.486 136.089 179.202 136.089 177.62C136.089 176.037 146.194 174.754 158.662 174.754C171.13 174.754 181.235 176.037 181.235 177.62Z" fill="#E2F4F4"/>
</g>
<mask id="mask47_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask47_3642_71567)">
<path d="M165.359 119.296C165.086 119.066 164.747 118.915 164.38 118.855C163.227 118.675 162.272 119.034 161.646 120.189C161.109 121.178 160.836 122.319 160.526 123.413C160.088 124.941 159.758 126.509 159.57 128.105C159.415 129.426 159.33 130.842 159.791 132.103C160.493 134.026 162.403 134.95 163.947 133.621C166.508 131.417 165.397 126.532 165.679 123.441C165.802 122.084 166.564 120.308 165.359 119.296Z" fill="#232F49"/>
</g>
<mask id="mask48_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask48_3642_71567)">
<path d="M166.211 116.647C166.046 116.803 165.769 117.18 165.604 117.341C165.703 117.176 166.334 116.003 166.329 115.607C166.324 115.437 166.117 115.4 166.023 115.524C165.679 115.989 165.439 116.467 165.096 116.932C165.289 116.325 165.472 115.713 165.628 115.097C165.675 114.913 165.435 114.834 165.326 114.972C165.006 115.396 164.667 116.274 164.456 116.776C164.54 116.316 164.578 115.455 164.592 114.972C164.597 114.83 164.338 114.811 164.291 114.936C164.06 115.566 163.895 116.854 163.599 117.797C163.411 117.429 163.105 116.96 162.799 117.318C163.161 117.521 162.954 119.273 163.914 119.697C164.677 120.032 165.265 119.255 165.566 118.726C165.91 118.11 166.136 117.461 166.47 116.84C166.55 116.679 166.348 116.513 166.211 116.647Z" fill="#E27E5E"/>
</g>
<mask id="mask49_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask49_3642_71567)">
<path d="M166.87 175.61C166.188 175.205 165.138 175.301 164.38 175.2C163.091 175.03 161.763 174.46 160.516 174.096C160.516 174.096 155.927 173.866 155.861 174.036C155.659 174.565 154.925 176.502 155.301 177.082C155.654 177.624 157.612 177.592 157.612 177.592L165.049 177.762C165.886 177.781 166.686 177.358 167.072 176.631C167.265 176.258 167.303 175.867 166.87 175.61Z" fill="#2A3C65"/>
</g>
<mask id="mask50_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask50_3642_71567)">
<path d="M155.184 139.95H163.453L161.001 174.266C158.982 175.591 155.184 174.506 155.184 174.506V139.95Z" fill="#1A2641"/>
</g>
<mask id="mask51_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask51_3642_71567)">
<path d="M162.272 176.019C161.589 175.614 160.54 175.711 159.782 175.61C158.492 175.439 157.165 174.869 155.918 174.506C155.918 174.506 151.329 174.276 151.263 174.446C151.056 174.97 150.322 176.911 150.703 177.491C151.056 178.034 153.014 178.002 153.014 178.002L160.45 178.172C161.288 178.19 162.088 177.767 162.474 177.04C162.672 176.663 162.705 176.272 162.272 176.019Z" fill="#344873"/>
</g>
<mask id="mask52_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask52_3642_71567)">
<path d="M158.709 140.185L148.702 139.665C148.702 139.665 148.406 142.034 149.182 144.969C150.232 148.943 150.063 152.674 150.251 156.773C150.576 163.907 150.929 174.496 150.929 174.496C152.948 175.821 156.746 174.736 156.746 174.736L158.709 140.185Z" fill="#232F49"/>
</g>
<mask id="mask53_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask53_3642_71567)">
<path d="M160.733 144.113C163.557 143.258 164.225 140.07 163.218 137.443C161.166 132.089 163.02 126.215 161.166 121.09C160.144 118.266 158.728 116.495 155.56 116.486H155.513C155.504 116.486 155.499 116.486 155.49 116.486C155.48 116.486 155.475 116.486 155.466 116.486H155.419C152.251 116.495 149.94 118.266 148.919 121.095C147.065 126.219 148.999 132.356 146.947 137.71C145.94 140.337 147.422 143.258 150.246 144.113C150.265 144.118 150.289 144.127 150.307 144.132C151.988 144.633 153.729 144.909 155.475 144.969C155.48 144.969 155.48 144.969 155.485 144.969H155.494C157.245 144.909 158.987 144.638 160.667 144.132C160.695 144.127 160.714 144.123 160.733 144.113Z" fill="#1A2641"/>
</g>
<mask id="mask54_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask54_3642_71567)">
<path d="M152.905 109.558C153.649 109.048 155.593 108.942 156.977 108.937C157.847 108.933 158.6 109.521 158.789 110.354C159.048 111.476 159.151 113.082 159.311 113.661C159.471 114.259 159.405 114.609 159.043 115.179C158.605 115.869 158.083 116.536 157.184 116.633C157.193 116.656 156.977 117.001 156.803 118.128C156.685 118.887 154.073 118.786 153.955 118.197C153.428 115.639 152.152 110.078 152.905 109.558Z" fill="#E27E5E"/>
</g>
<mask id="mask55_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask55_3642_71567)">
<path d="M156.836 119.112C156.911 118.79 156.958 118.574 156.854 118.257C156.779 118.031 155.758 118.16 155.537 118.34C155.362 118.478 155.372 118.74 155.461 118.915C155.555 119.099 155.711 119.255 155.899 119.347C156.548 122.696 156.44 126.095 156.473 129.508C156.478 129.867 157.198 130.907 157.772 130.7C158.182 130.553 158.506 129.246 158.502 128.993C158.469 125.552 156.836 119.126 156.836 119.112Z" fill="white"/>
</g>
<mask id="mask56_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask56_3642_71567)">
<path d="M157.895 111.651C158.055 111.2 158.436 110.897 158.902 110.86C158.911 110.915 158.925 110.966 158.935 111.021C158.426 111.049 158.064 111.463 157.993 111.959C157.923 112.433 158.106 112.884 158.337 113.289C158.389 113.381 158.252 113.477 158.196 113.381C157.899 112.861 157.683 112.249 157.895 111.651Z" fill="#DF6041"/>
</g>
<mask id="mask57_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask57_3642_71567)">
<path d="M152.618 108.523C153.725 107.603 155.711 108.16 156.078 107.999C156.134 107.902 156.214 107.806 156.323 107.727C156.756 107.405 157.264 107.493 157.72 107.7C157.763 107.654 157.81 107.612 157.866 107.576L157.871 107.571C158.182 107.327 158.634 107.336 158.94 107.585C159.613 108.132 159.631 109.19 159.274 110.046C159.123 110.409 158.765 110.648 158.37 110.667C157.824 110.694 157.236 110.575 156.652 110.469C156.28 110.405 155.89 110.414 155.532 110.524C155.306 110.593 155.094 110.704 154.901 110.865C154.275 111.394 154.19 112.111 154.346 112.815C154.195 112.534 153.998 112.162 153.433 112.346C153.202 112.419 153.014 112.599 152.967 112.829C152.844 113.445 153.673 113.914 154.214 113.947C154.346 114.793 154.383 115.58 153.202 115.81C151.861 116.081 150.858 109.991 152.618 108.523Z" fill="white"/>
</g>
<mask id="mask58_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask58_3642_71567)">
<path d="M155.565 114.365C155.527 114.181 155.814 114.54 156.647 113.809C157.066 113.441 157.476 113.16 157.725 112.999C157.895 112.889 158.097 112.838 158.304 112.852C158.582 112.87 158.826 112.889 159.405 112.999C159.523 113.022 160.135 116.026 157.683 116.573C155.645 117.024 155.725 115.138 155.565 114.365Z" fill="white"/>
</g>
<mask id="mask59_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask59_3642_71567)">
<path d="M155.833 114.752L154.346 112.82L155.946 114.669L155.833 114.752Z" fill="white"/>
</g>
<mask id="mask60_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask60_3642_71567)">
<path d="M157.885 113.229C157.942 113.192 158.003 113.165 158.073 113.146C158.139 113.128 158.215 113.119 158.285 113.123C158.483 113.137 159.066 113.464 159.066 113.464C158.761 113.418 158.52 113.395 158.356 113.381C158.285 113.376 158.215 113.385 158.144 113.404C158.078 113.422 158.017 113.45 157.956 113.487C157.744 113.625 157.433 113.836 157.104 114.108C157.104 114.112 157.631 113.395 157.885 113.229Z" fill="#09104F"/>
</g>
<mask id="mask61_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask61_3642_71567)">
<path d="M157.984 116.219C158.704 115.488 158.346 114.108 158.158 113.634C158.238 114.135 158.323 115.511 157.984 116.219Z" fill="#09104F"/>
</g>
<mask id="mask62_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask62_3642_71567)">
<path d="M158.643 111.789C158.648 111.78 158.657 111.775 158.666 111.766C158.85 111.642 159.019 112.254 158.728 112.235C158.553 112.222 158.549 111.904 158.643 111.789Z" fill="#09104F"/>
</g>
<mask id="mask63_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask63_3642_71567)">
<path d="M156.657 111.959C156.666 111.95 156.671 111.946 156.68 111.936C156.864 111.812 157.033 112.424 156.742 112.406C156.567 112.392 156.563 112.074 156.657 111.959Z" fill="#09104F"/>
</g>
<mask id="mask64_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask64_3642_71567)">
<path d="M161.881 144.886H161.17V141.091C161.17 140.116 160.361 139.325 159.363 139.325C158.365 139.325 157.556 140.116 157.556 141.091V144.886H156.845V141.091C156.845 139.734 157.975 138.626 159.368 138.626C160.761 138.626 161.891 139.73 161.891 141.091V144.886H161.881Z" fill="#344873"/>
</g>
<mask id="mask65_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask65_3642_71567)">
<path d="M167.129 141.57H151.705V151.975H167.129V141.57Z" fill="#344873"/>
</g>
<mask id="mask66_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask66_3642_71567)">
<path d="M167.129 141.57H151.705V145.999H167.129V141.57Z" fill="#2A3C65"/>
</g>
<mask id="mask67_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask67_3642_71567)">
<path d="M155.456 144.463H154.36V147.678H155.456V144.463Z" fill="#F2CF31"/>
</g>
<mask id="mask68_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask68_3642_71567)">
<path d="M164.442 144.463H163.345V147.678H164.442V144.463Z" fill="#F2CF31"/>
</g>
<mask id="mask69_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask69_3642_71567)">
<path d="M161.151 138.437C160.959 138.465 160.775 138.455 160.596 138.368H160.591C160.351 137.991 159.9 137.719 158.775 137.756C158.426 137.618 158.125 137.453 157.81 137.333C157.645 137.568 157.419 138.391 156.633 138.998C156.633 138.998 157.339 139.352 157.348 139.362C157.339 139.394 157.325 139.725 157.457 140.01C157.814 140.774 159.043 140.838 159.744 140.861C160.431 140.88 160.808 140.024 160.808 140.024C160.535 139.734 160.634 139.306 160.808 139.155C161.123 139.164 161.481 139.095 161.5 138.736C161.504 138.529 161.349 138.409 161.151 138.437Z" fill="#E27E5E"/>
</g>
<mask id="mask70_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask70_3642_71567)">
<path d="M157.556 136.174C156.727 134.808 154.675 134.472 153.56 133.34C152.477 132.241 151.804 130.704 151.569 129.122C151.263 127.043 151.635 124.945 152.195 122.949C152.51 121.826 152.538 120.281 152.171 119.168C151.503 117.148 150.538 118.395 149.634 119.669C146.641 123.873 144.052 130.98 146.951 135.755C147.78 137.117 149.488 137.936 150.929 138.511C152.609 139.178 155.762 140.272 157.325 138.837C157.758 138.442 157.96 137.83 157.904 137.255C157.866 136.827 157.739 136.477 157.556 136.174Z" fill="#232F49"/>
</g>
<mask id="mask71_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask71_3642_71567)">
<path d="M195.793 154.192C195.793 155.774 205.898 157.058 218.366 157.058C230.834 157.058 240.939 155.774 240.939 154.192C240.939 152.61 230.834 151.326 218.366 151.326C205.898 151.326 195.793 152.61 195.793 154.192Z" fill="#E2F4F4"/>
</g>
<mask id="mask72_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask72_3642_71567)">
<path d="M210.882 152.186C211.522 151.782 212.501 151.878 213.207 151.777C214.412 151.607 216.304 151.036 217.467 150.673C217.467 150.673 220.536 150.443 220.597 150.613C220.79 151.142 221.472 153.079 221.119 153.658C220.79 154.201 219.528 154.169 219.528 154.169L212.586 154.339C211.805 154.358 211.056 153.934 210.699 153.208C210.51 152.83 210.478 152.439 210.882 152.186Z" fill="#2A3C65"/>
</g>
<mask id="mask73_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask73_3642_71567)">
<path d="M221.844 116.523H213.574L217.472 150.673C219.472 151.722 220.602 150.613 220.602 150.613L221.844 116.523Z" fill="#E27E5E"/>
</g>
<mask id="mask74_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask74_3642_71567)">
<path d="M215.471 152.591C216.111 152.186 217.09 152.283 217.796 152.182C219.001 152.012 220.611 151.441 221.774 151.078C221.774 151.078 224.842 150.848 224.903 151.018C225.096 151.542 225.779 153.484 225.426 154.063C225.096 154.606 224.113 154.574 224.113 154.574L217.17 154.744C216.389 154.762 215.641 154.339 215.283 153.612C215.095 153.24 215.067 152.844 215.471 152.591Z" fill="#344873"/>
</g>
<mask id="mask75_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask75_3642_71567)">
<path d="M219.1 117.525L228.32 116.242C228.32 116.242 228.617 118.611 227.84 121.546C226.791 125.52 226.96 129.251 226.772 133.349C226.442 140.484 224.903 151.023 224.903 151.023C223.859 151.897 221.773 151.082 221.773 151.082L219.1 117.525Z" fill="#E88B6D"/>
</g>
<mask id="mask76_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask76_3642_71567)">
<path d="M221.844 133.515V116.523H213.574L214.53 132.457C215.758 133.713 221.844 133.515 221.844 133.515Z" fill="#1A2641"/>
</g>
<mask id="mask77_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask77_3642_71567)">
<path d="M227.982 133.349C228.17 129.251 227.342 125.52 228.396 121.546C229.172 118.611 228.325 116.242 228.325 116.242L218.319 116.762L219.27 133.515C224.329 135.185 227.977 133.405 227.982 133.349Z" fill="#232F49"/>
</g>
<mask id="mask78_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask78_3642_71567)">
<path d="M216.295 120.69C213.471 119.835 212.803 116.647 213.81 114.02C215.862 108.666 214.007 102.792 215.862 97.6672C216.883 94.8428 218.3 93.0718 221.472 93.0626H221.519C221.529 93.0626 221.533 93.0626 221.543 93.0626C221.552 93.0626 221.557 93.0626 221.566 93.0626H221.613C224.781 93.0718 227.092 94.8474 228.113 97.6718C229.968 102.796 228.033 108.933 230.085 114.287C231.093 116.914 229.61 119.835 226.786 120.69C226.767 120.695 226.744 120.704 226.725 120.709C225.045 121.21 223.303 121.486 221.557 121.546C221.552 121.546 221.548 121.546 221.548 121.546C221.543 121.546 221.543 121.546 221.538 121.546C219.787 121.486 218.046 121.215 216.37 120.709C216.333 120.699 216.314 120.695 216.295 120.69Z" fill="#71C7C2"/>
</g>
<mask id="mask79_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask79_3642_71567)">
<path d="M224.122 86.1304C223.379 85.6198 221.435 85.514 220.051 85.5094C219.18 85.5048 218.427 86.0936 218.239 86.9262C217.98 88.0486 217.876 89.654 217.716 90.2336C217.556 90.8316 217.622 91.1812 217.985 91.7516C218.422 92.4416 218.945 93.1086 219.844 93.2052C219.834 93.2282 220.051 93.5732 220.225 94.7002C220.343 95.4592 222.955 95.358 223.073 94.7692C223.6 92.2116 224.875 86.6502 224.122 86.1304Z" fill="#E88B6D"/>
</g>
<mask id="mask80_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask80_3642_71567)">
<path d="M219.133 88.228C218.973 87.7772 218.592 87.4736 218.126 87.4368C218.116 87.492 218.102 87.5426 218.093 87.5978C218.601 87.6254 218.964 88.0394 219.034 88.5362C219.105 89.01 218.921 89.4608 218.691 89.8656C218.639 89.9576 218.78 90.0496 218.832 89.9576C219.128 89.4332 219.345 88.8214 219.133 88.228Z" fill="#DF6041"/>
</g>
<mask id="mask81_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask81_3642_71567)">
<path d="M224.409 85.0954C223.303 84.1754 221.312 84.732 220.95 84.571C220.893 84.4698 220.813 84.3778 220.705 84.2996C220.272 83.9776 219.764 84.065 219.307 84.272C219.265 84.226 219.218 84.1846 219.161 84.1478L219.156 84.1432C218.846 83.8994 218.394 83.9086 218.088 84.157C217.415 84.7044 217.396 85.7624 217.754 86.618C217.905 86.9814 218.262 87.2206 218.658 87.239C219.208 87.2666 219.792 87.147 220.376 87.0412C220.747 86.9768 221.138 86.986 221.496 87.0964C221.722 87.1654 221.933 87.2758 222.126 87.4368C222.752 87.9658 222.837 88.6834 222.682 89.3872C222.832 89.1066 223.03 88.734 223.595 88.918C223.826 88.9916 224.018 89.171 224.061 89.401C224.183 90.0174 223.355 90.4866 222.814 90.5188C222.682 91.3652 222.644 92.1518 223.826 92.3818C225.167 92.6578 226.169 86.5628 224.409 85.0954Z" fill="#F2CF31"/>
</g>
<mask id="mask82_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask82_3642_71567)">
<path d="M221.463 90.9374C221.5 90.7534 221.213 91.1122 220.38 90.3808C219.961 90.0128 219.552 89.7322 219.302 89.5712C219.133 89.4608 218.926 89.4102 218.723 89.424C218.446 89.4424 218.201 89.4608 217.622 89.5712C217.504 89.5942 216.893 92.598 219.345 93.1454C221.383 93.5962 221.303 91.7102 221.463 90.9374Z" fill="white"/>
</g>
<mask id="mask83_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask83_3642_71567)">
<path d="M221.082 91.241L222.682 89.3964L221.19 91.3284L221.082 91.241Z" fill="white"/>
</g>
<mask id="mask84_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask84_3642_71567)">
<path d="M219.142 89.8058C219.086 89.769 219.02 89.7414 218.954 89.723C218.883 89.7046 218.813 89.7 218.742 89.7046C218.545 89.7184 217.961 90.045 217.961 90.045C218.267 89.999 218.507 89.976 218.672 89.9622C218.742 89.9576 218.813 89.9668 218.883 89.9806C218.949 89.999 219.011 90.0266 219.072 90.0634C219.284 90.2014 219.594 90.413 219.924 90.689C219.924 90.6844 219.396 89.9668 219.142 89.8058Z" fill="#09104F"/>
</g>
<mask id="mask85_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask85_3642_71567)">
<path d="M219.043 92.7912C218.323 92.0598 218.676 90.6798 218.869 90.206C218.789 90.7074 218.705 92.0828 219.043 92.7912Z" fill="#09104F"/>
</g>
<mask id="mask86_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask86_3642_71567)">
<path d="M218.38 88.366C218.37 88.3568 218.366 88.3522 218.356 88.343C218.173 88.2188 218.003 88.8306 218.295 88.8122C218.474 88.7984 218.479 88.4764 218.38 88.366Z" fill="#09104F"/>
</g>
<mask id="mask87_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask87_3642_71567)">
<path d="M220.366 88.5362C220.357 88.527 220.352 88.5224 220.343 88.5132C220.159 88.389 219.99 89.0008 220.281 88.9824C220.46 88.9686 220.465 88.6466 220.366 88.5362Z" fill="#09104F"/>
</g>
<mask id="mask88_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask88_3642_71567)">
<path d="M217.156 117.295C212.459 114.227 208.957 111.292 209.823 110.027C210.689 108.758 214.803 110.8 219.5 113.864C224.197 116.927 227.699 119.867 226.833 121.132C225.967 122.401 221.853 120.359 217.156 117.295Z" fill="#ECC385"/>
</g>
<mask id="mask89_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask89_3642_71567)">
<path d="M223.576 117.277C223.694 117.594 223.736 117.861 223.75 118.123C223.764 118.386 223.745 118.629 223.703 118.869C223.661 119.108 223.595 119.342 223.496 119.577C223.397 119.816 223.28 120.051 223.072 120.322C222.837 120.078 222.719 119.793 222.658 119.517C222.602 119.237 222.597 118.956 222.649 118.685C222.701 118.413 222.795 118.156 222.941 117.912C223.091 117.677 223.28 117.447 223.576 117.277Z" fill="#D6AB6E"/>
</g>
<mask id="mask90_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask90_3642_71567)">
<path d="M223.576 117.277C223.576 117.277 223.049 119.421 223.072 120.327C222.837 120.083 222.719 119.798 222.658 119.522C222.602 119.241 222.597 118.961 222.649 118.689C222.701 118.418 222.795 118.16 222.941 117.916C223.091 117.677 223.28 117.447 223.576 117.277Z" fill="#DDB171"/>
</g>
<mask id="mask91_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask91_3642_71567)">
<path d="M221.129 115.676C221.251 115.994 221.289 116.26 221.303 116.523C221.317 116.785 221.298 117.029 221.256 117.268C221.213 117.507 221.147 117.742 221.049 117.976C220.945 118.215 220.832 118.45 220.625 118.721C220.39 118.478 220.272 118.192 220.211 117.916C220.154 117.636 220.15 117.355 220.201 117.084C220.248 116.812 220.347 116.555 220.493 116.311C220.644 116.081 220.832 115.851 221.129 115.676Z" fill="#D6AB6E"/>
</g>
<mask id="mask92_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask92_3642_71567)">
<path d="M221.129 115.676C221.129 115.676 220.601 117.82 220.625 118.726C220.39 118.482 220.272 118.197 220.211 117.921C220.154 117.64 220.15 117.36 220.201 117.088C220.248 116.817 220.347 116.559 220.493 116.316C220.644 116.081 220.832 115.851 221.129 115.676Z" fill="#DDB171"/>
</g>
<mask id="mask93_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask93_3642_71567)">
<path d="M218.681 114.08C218.803 114.397 218.841 114.664 218.855 114.926C218.869 115.189 218.85 115.432 218.808 115.672C218.766 115.911 218.7 116.145 218.601 116.385C218.497 116.624 218.385 116.858 218.177 117.13C217.942 116.886 217.824 116.601 217.763 116.325C217.707 116.044 217.702 115.764 217.754 115.492C217.801 115.221 217.9 114.963 218.046 114.719C218.196 114.48 218.385 114.255 218.681 114.08Z" fill="#D6AB6E"/>
</g>
<mask id="mask94_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask94_3642_71567)">
<path d="M218.681 114.08C218.681 114.08 218.154 116.224 218.177 117.13C217.942 116.886 217.824 116.601 217.763 116.325C217.707 116.044 217.702 115.764 217.754 115.492C217.801 115.221 217.9 114.963 218.046 114.719C218.196 114.48 218.385 114.255 218.681 114.08Z" fill="#DDB171"/>
</g>
<mask id="mask95_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask95_3642_71567)">
<path d="M216.238 112.484C216.361 112.801 216.398 113.068 216.413 113.33C216.427 113.592 216.408 113.836 216.366 114.075C216.323 114.315 216.257 114.549 216.158 114.788C216.055 115.028 215.942 115.262 215.735 115.538C215.499 115.294 215.382 115.009 215.321 114.733C215.264 114.453 215.259 114.172 215.311 113.901C215.358 113.629 215.457 113.372 215.598 113.128C215.749 112.884 215.937 112.654 216.238 112.484Z" fill="#D6AB6E"/>
</g>
<mask id="mask96_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask96_3642_71567)">
<path d="M216.238 112.484C216.238 112.484 215.711 114.627 215.735 115.538C215.499 115.294 215.382 115.009 215.321 114.733C215.264 114.453 215.259 114.172 215.311 113.901C215.358 113.629 215.457 113.372 215.598 113.128C215.749 112.884 215.937 112.654 216.238 112.484Z" fill="#DDB171"/>
</g>
<mask id="mask97_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask97_3642_71567)">
<path d="M213.791 110.883C213.913 111.2 213.951 111.467 213.965 111.729C213.979 111.992 213.96 112.235 213.918 112.475C213.876 112.714 213.81 112.948 213.711 113.183C213.607 113.422 213.494 113.657 213.287 113.928C213.052 113.684 212.934 113.399 212.873 113.123C212.817 112.843 212.812 112.562 212.864 112.291C212.911 112.019 213.01 111.762 213.156 111.518C213.301 111.283 213.49 111.058 213.791 110.883Z" fill="#D6AB6E"/>
</g>
<mask id="mask98_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask98_3642_71567)">
<path d="M213.791 110.883C213.791 110.883 213.264 113.027 213.287 113.933C213.052 113.689 212.934 113.404 212.873 113.128C212.817 112.847 212.812 112.567 212.864 112.295C212.911 112.024 213.01 111.766 213.156 111.522C213.301 111.283 213.49 111.058 213.791 110.883Z" fill="#DDB171"/>
</g>
<mask id="mask99_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask99_3642_71567)">
<path d="M219.222 113.905C219.222 113.905 218.775 114.393 218.427 114.531C217.349 114.494 216.657 114.972 216.653 114.972C216.398 114.926 215.998 114.747 215.796 114.591C215.476 114.351 215.264 114.761 215.41 115.028C215.645 115.46 216.187 115.672 216.389 115.69C216.436 115.929 216.243 116.408 216.201 116.679C216.102 117.323 216.483 117.429 217.024 117.838C217.73 118.376 218.484 118.634 218.771 118.105C218.921 117.829 219.688 115.966 219.679 115.934C219.688 115.925 220.394 115.57 220.394 115.57C219.613 114.963 219.387 114.14 219.222 113.905Z" fill="#E88B6D"/>
</g>
<mask id="mask100_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask100_3642_71567)">
<path d="M219.472 112.746C220.3 111.38 222.352 111.044 223.468 109.912C224.55 108.813 225.223 107.277 225.459 105.694C225.765 103.615 225.393 101.517 224.833 99.521C224.517 98.3986 224.489 96.853 224.856 95.7444C225.525 93.7204 226.489 94.9716 227.393 96.2412C230.387 100.446 232.975 107.553 230.076 112.327C229.248 113.689 227.539 114.508 226.099 115.083C224.419 115.75 221.265 116.845 219.702 115.409C219.269 115.014 219.067 114.402 219.124 113.827C219.161 113.404 219.288 113.05 219.472 112.746Z" fill="#8CCFCB"/>
</g>
<mask id="mask101_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask101_3642_71567)">
<path d="M293.286 193.421C293.286 195.003 283.177 196.287 270.713 196.287C258.245 196.287 248.14 195.003 248.14 193.421C248.14 191.838 258.245 190.555 270.713 190.555C283.181 190.56 293.286 191.838 293.286 193.421Z" fill="#E2F4F4"/>
</g>
<mask id="mask102_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask102_3642_71567)">
<path d="M260.881 191.052C261.451 190.638 262.317 190.734 262.947 190.633C264.016 190.458 265.117 189.874 266.153 189.502C266.153 189.502 269.96 189.267 270.017 189.442C270.186 189.98 270.798 191.967 270.483 192.561C270.191 193.117 268.567 193.085 268.567 193.085L262.401 193.26C261.705 193.278 261.041 192.846 260.721 192.101C260.552 191.714 260.523 191.314 260.881 191.052Z" fill="#2A3C65"/>
</g>
<mask id="mask103_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask103_3642_71567)">
<path d="M271.311 154.532H265.71L266.148 189.506C268.652 190.56 270.012 189.446 270.012 189.446L271.311 154.532Z" fill="#BCD2D2"/>
</g>
<mask id="mask104_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask104_3642_71567)">
<path d="M265.47 191.466C266.035 191.052 266.906 191.148 267.536 191.047C268.605 190.872 269.706 190.288 270.742 189.916C270.742 189.916 274.549 189.681 274.606 189.856C274.775 190.394 275.387 192.381 275.072 192.975C274.78 193.531 273.156 193.499 273.156 193.499L266.99 193.674C266.294 193.692 265.63 193.26 265.31 192.515C265.136 192.128 265.108 191.728 265.47 191.466Z" fill="#344873"/>
</g>
<mask id="mask105_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask105_3642_71567)">
<path d="M269.226 154.772L277.331 154.238C277.331 154.238 277.604 156.667 276.884 159.671C275.91 163.742 276.065 167.56 275.891 171.759C275.585 179.064 274.601 189.911 274.601 189.911C273.184 191.084 270.737 189.916 270.737 189.916L269.226 154.772Z" fill="#CBE2E2"/>
</g>
<mask id="mask106_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask106_3642_71567)">
<path d="M278.701 155.733C276.601 150.25 279.002 140.475 277.1 135.222C276.055 132.328 273.688 130.511 270.445 130.502H270.398C270.389 130.502 270.384 130.502 270.374 130.502C270.365 130.502 270.36 130.502 270.351 130.502H270.304C267.541 130.511 266.962 134.007 266.138 135.985C265.724 136.988 265.056 138.083 265.07 139.191C265.084 140.245 265.677 141.077 266.388 141.827C266.209 146.39 266.233 151.299 264.726 155.236C263.7 157.927 279.731 158.424 278.701 155.733Z" fill="#DD4757"/>
</g>
<mask id="mask107_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask107_3642_71567)">
<path d="M271.739 120.75C270.916 120.502 270.021 120.515 269.198 120.842C268.379 121.164 267.484 121.886 267.786 122.769C266.722 122.714 265.522 122.834 264.877 123.768C264.444 124.398 264.515 125.18 265.037 125.7C263.498 126.679 263.903 128.851 265.602 129.329C264.435 130.525 266.515 132.397 268.007 131.983C268.063 132.701 268.793 132.981 269.555 133.004C270.803 133.046 271.739 131.896 271.739 131.896V120.75Z" fill="#1A2641"/>
</g>
<mask id="mask108_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask108_3642_71567)">
<path d="M273.024 123.409C272.262 122.884 270.271 122.779 268.854 122.769C267.96 122.765 267.193 123.367 266.995 124.223C266.732 125.373 266.572 127.006 266.463 127.609C266.087 129.692 268.078 130.543 268.996 130.645C268.986 130.668 269.254 132.071 269.033 133.391C268.901 134.168 271.829 132.857 271.951 132.25C272.488 129.637 273.796 123.942 273.024 123.409Z" fill="#AE4C33"/>
</g>
<mask id="mask109_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask109_3642_71567)">
<path d="M270.059 126.891C269.974 126.845 269.876 126.817 269.796 126.804C269.504 126.748 268.732 126.877 268.868 127.319C268.892 127.388 268.944 127.434 268.995 127.471C269.245 127.618 269.617 127.622 269.89 127.563C270.05 127.526 270.219 127.438 270.271 127.273C270.323 127.093 270.21 126.969 270.059 126.891Z" fill="#A14027"/>
</g>
<mask id="mask110_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask110_3642_71567)">
<path d="M267.814 127.415C267.739 127.42 267.64 127.438 267.569 127.392C267.852 126.859 268.11 126.118 267.913 125.557C267.748 125.097 267.357 124.784 266.882 124.747C266.873 124.803 266.859 124.858 266.849 124.913C267.372 124.941 267.739 125.364 267.814 125.874C267.88 126.334 267.621 126.951 267.39 127.365C267.287 127.406 267.626 127.751 267.814 127.737C268.026 127.719 268.026 127.402 267.814 127.415Z" fill="#A14027"/>
</g>
<mask id="mask111_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask111_3642_71567)">
<path d="M267.146 125.695C267.136 125.686 267.131 125.681 267.122 125.672C266.934 125.543 266.76 126.173 267.061 126.15C267.24 126.137 267.249 125.81 267.146 125.695Z" fill="#311E16"/>
</g>
<mask id="mask112_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask112_3642_71567)">
<path d="M269.184 125.87C269.174 125.861 269.17 125.856 269.16 125.847C268.972 125.718 268.798 126.348 269.099 126.325C269.273 126.311 269.282 125.985 269.184 125.87Z" fill="#311E16"/>
</g>
<mask id="mask113_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask113_3642_71567)">
<path d="M270.916 152.78C271.226 152.559 271.49 152.329 271.777 152.136C271.998 152.329 272.422 153.102 273.349 153.525C273.349 153.525 272.733 154.04 272.723 154.049C272.742 154.082 272.836 154.404 272.77 154.721C272.601 155.563 271.391 155.912 270.695 156.092C270.017 156.267 268.892 155.876 268.892 155.876C269.316 155.195 269.932 154.9 269.226 154.776L268.661 155.416C268.266 153.98 269.782 153.001 270.916 152.78Z" fill="#AE4C33"/>
</g>
<mask id="mask114_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask114_3642_71567)">
<path d="M271.575 150.687C271.989 149.896 272.86 149.21 273.575 148.667C274.691 147.816 275.477 146.584 275.811 145.24C276.55 142.273 275.34 139.081 273.9 136.505C273.312 135.456 273.514 132.098 274.385 132.31C276.545 132.839 278.324 136.528 279.623 139.348C281.176 142.729 281.694 147.103 278.917 150.015C277.355 151.653 276.408 153.944 273.975 153.829C273.213 153.792 272.446 153.493 271.942 152.932C271.212 152.122 271.222 151.363 271.575 150.687Z" fill="#DD4757"/>
</g>
<mask id="mask115_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask115_3642_71567)">
<path d="M271.575 150.687C271.989 149.896 272.86 149.21 273.575 148.667C274.69 147.816 275.476 146.584 275.811 145.24C276.55 142.273 275.34 139.081 273.9 136.505C273.89 136.487 273.881 136.464 273.867 136.445C277.166 139.886 278.38 145.112 274.987 148.833C273.89 150.038 271.645 151.312 273.085 153.125C273.377 153.493 273.749 153.718 274.154 153.833C274.093 153.833 274.032 153.833 273.97 153.829C273.208 153.792 272.441 153.493 271.937 152.932C271.212 152.122 271.222 151.363 271.575 150.687Z" fill="#C73848"/>
</g>
<mask id="mask116_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask116_3642_71567)">
<path d="M279.303 125.276C279.821 124.757 279.896 123.975 279.463 123.344C278.818 122.411 277.618 122.291 276.554 122.346C276.856 121.463 275.957 120.741 275.142 120.419C274.055 119.991 272.855 120.101 271.843 120.635C271.165 119.683 269.386 119.775 269.127 120.732C267.626 120.313 266.19 121.173 266.873 123.423C266.953 123.685 268.84 123.933 270.087 124.057C271.132 124.163 271.895 125.12 271.683 126.127L271.579 126.601C271.73 126.321 272.027 125.493 272.577 125.658C272.822 125.732 273.034 125.911 273.086 126.15C273.227 126.79 272.37 127.277 271.81 127.31C271.476 127.328 271.193 127.825 271.132 128.092C271.043 128.478 271.156 128.846 271.208 129.228C271.25 129.568 271.09 129.697 270.986 130.01C270.855 130.415 270.826 130.842 271.057 131.215C271.495 131.928 270.596 132.935 271.688 133.354C272.375 133.616 273.015 133.216 273.537 132.793C273.796 133.391 274.545 133.506 275.166 133.239C275.867 132.94 276.272 132.278 276.333 131.56C277.825 131.974 279.905 130.102 278.738 128.906C280.437 128.432 280.837 126.256 279.303 125.276Z" fill="#1A2641"/>
</g>
<mask id="mask117_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask117_3642_71567)">
<path d="M270.45 128.239C270.488 128.05 270.191 128.418 269.334 127.668C268.901 127.291 268.487 127.001 268.228 126.836C268.054 126.721 267.842 126.67 267.635 126.684C267.353 126.702 267.099 126.721 266.506 126.836C266.388 126.859 265.753 129.945 268.275 130.507C270.365 130.971 270.285 129.035 270.45 128.239Z" fill="white"/>
</g>
<mask id="mask118_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask118_3642_71567)">
<path d="M270.054 128.552L271.702 126.656L270.172 128.639L270.054 128.552Z" fill="white"/>
</g>
<mask id="mask119_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask119_3642_71567)">
<path d="M268.063 127.075C268.007 127.038 267.941 127.006 267.87 126.992C267.8 126.974 267.729 126.965 267.654 126.969C267.452 126.983 266.849 127.319 266.849 127.319C267.16 127.273 267.414 127.245 267.579 127.236C267.654 127.231 267.725 127.241 267.795 127.259C267.866 127.277 267.927 127.305 267.988 127.342C268.209 127.484 268.525 127.701 268.864 127.981C268.868 127.981 268.327 127.245 268.063 127.075Z" fill="#3D6CF3"/>
</g>
<mask id="mask120_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask120_3642_71567)">
<path d="M267.965 130.148C267.226 129.398 267.588 127.977 267.786 127.494C267.701 128.004 267.612 129.416 267.965 130.148Z" fill="#09104F"/>
</g>
<mask id="mask121_3642_71567" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="353" height="230">
<path d="M353 0H0V230H353V0Z" fill="white"/>
</mask>
<g mask="url(#mask121_3642_71567)">
<path d="M238.967 186.088C238.967 185.9 239.88 183.241 238.44 181.833C238.981 181.314 239.127 181.005 239.31 180.306C239.461 180.513 239.621 180.679 239.663 180.522C239.856 179.814 239.866 179.124 239.706 178.462C239.725 178.485 240.195 178.563 240.186 178.37C240.096 176.957 237.498 174.892 237.672 175.168C238.553 176.571 239.687 180.352 237.578 181.364C236.971 181.281 235.065 181.111 233.738 181.111C230.09 181.111 228.749 181.521 226.574 177.946C226.005 177.008 225.943 175.964 225.553 174.956C225.67 174.437 224.56 172.017 224.094 171.874C223.821 171.792 223.703 173.567 223.703 173.567C223.628 173.567 223.228 173.549 223.157 173.553C223.058 172.969 222.418 172.33 222.108 172.141C221.915 172.026 221.9 173.365 221.938 173.825C221.354 174.124 221.138 174.607 220.639 175.048C219.99 175.619 219.076 175.738 218.559 175.761C218.323 175.771 218.126 175.936 218.069 176.157C217.933 176.714 217.702 177.666 217.693 177.739C217.57 178.696 219.98 179.998 222.211 178.866C222.658 180.104 222.621 180.688 222.846 181.981C223.058 183.2 223.27 184.432 223.802 185.564C224.258 186.535 224.946 187.39 225.896 187.928C226.127 188.057 226.386 188.172 226.584 188.356C226.777 188.536 227.12 190.877 226.984 191.277C226.913 191.484 225.567 191.59 225.689 191.976C225.774 192.243 226.471 192.243 226.955 192.229C227.247 192.22 228.542 192.243 228.739 191.976C228.932 191.714 228.777 191.01 228.786 190.707C228.8 190.215 229.577 187.432 229.577 187.432H234.98C235.004 189.373 236.872 190.702 236.872 190.702C236.995 190.941 237.385 191.618 237.084 191.838C237.009 191.889 236.919 191.912 236.83 191.935C236.491 192.027 235.625 192.39 236.331 192.597C236.679 192.699 237.145 192.699 237.503 192.657C237.823 192.616 238.647 192.565 238.859 192.289C237.969 187.349 238.986 188.186 238.967 186.088Z" fill="#232F49"/>
</g>
<path d="M227.125 178.098C226.094 179.694 223.807 180.923 221.891 180.619L221.99 182.105C224.296 182.468 226.645 180.794 227.902 178.857L227.125 178.098Z" fill="#F2CF31"/>
<path d="M229.064 179.814C228.278 179.814 227.501 179.777 226.739 179.694C226.607 179.681 226.508 179.566 226.522 179.432C226.536 179.303 226.654 179.202 226.791 179.221C234.373 179.993 243.156 176.829 252.898 169.804C260.608 164.243 266.755 157.757 269.174 154.799C269.259 154.698 269.414 154.68 269.518 154.762C269.621 154.845 269.64 154.997 269.555 155.098C267.122 158.074 260.942 164.597 253.19 170.186C244.318 176.585 236.213 179.814 229.064 179.814Z" fill="#F2CF31"/>
</g>
</svg>
`;
const dateIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75 4V6.25M18.25 4V6.25M4 19.75V8.5C4 7.90326 4.23705 7.33097 4.65901 6.90901C5.08097 6.48705 5.65326 6.25 6.25 6.25H19.75C20.3467 6.25 20.919 6.48705 21.341 6.90901C21.7629 7.33097 22 7.90326 22 8.5V19.75M4 19.75C4 20.3467 4.23705 20.919 4.65901 21.341C5.08097 21.7629 5.65326 22 6.25 22H19.75C20.3467 22 20.919 21.7629 21.341 21.341C21.7629 20.919 22 20.3467 22 19.75M4 19.75V12.25C4 11.6533 4.23705 11.081 4.65901 10.659C5.08097 10.2371 5.65326 10 6.25 10H19.75C20.3467 10 20.919 10.2371 21.341 10.659C21.7629 11.081 22 11.6533 22 12.25V19.75M13 13.75H13.008V13.758H13V13.75ZM13 16H13.008V16.008H13V16ZM13 18.25H13.008V18.258H13V18.25ZM10.75 16H10.758V16.008H10.75V16ZM10.75 18.25H10.758V18.258H10.75V18.25ZM8.5 16H8.508V16.008H8.5V16ZM8.5 18.25H8.508V18.258H8.5V18.25ZM15.25 13.75H15.258V13.758H15.25V13.75ZM15.25 16H15.258V16.008H15.25V16ZM15.25 18.25H15.258V18.258H15.25V18.25ZM17.5 13.75H17.508V13.758H17.5V13.75ZM17.5 16H17.508V16.008H17.5V16Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export const Screen = ({ select, value, onChange, onClose, type }) => {
  //console.log(value)
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          marginVertical: 12,
          fontWeight: "400",
          fontSize: 20,
          width: "100%",
          textAlign: "center",
        }}>
        {type ? type : "Division"}
      </Text>
      <BottomSheetScrollView
        contentContainerStyle={{
          backgroundColor: "#ffffff",
        }}>
        {type == "Division" &&
          DistrictList.map((doc, i) => (
            <Pressable
              onPress={() => {
                if (onChange) {
                  onChange(doc.title);
                }
              }}
              style={newStyles.box}
              key={i}>
              <Text style={newStyles.textSp}>{doc.title}</Text>
              {select == doc.title && <SvgXml xml={tick} />}
            </Pressable>
          ))}
        {type == "District" &&
          DistrictList.filter((d) => d.title.match(value))[0].data.map(
            (doc, i) => (
              <Pressable
                onPress={() => {
                  if (onChange) {
                    onChange(doc);
                  }
                }}
                style={newStyles.box}
                key={i}>
                <Text style={newStyles.textSp}>{doc}</Text>
                {select == doc && <SvgXml xml={tick} />}
              </Pressable>
            )
          )}
        {type == "Area" &&
          AreaList.filter((d) => d.title.match(value))[0].data.map((doc, i) => (
            <Pressable
              onPress={() => {
                if (onChange) {
                  onChange(doc);
                }
              }}
              style={newStyles.box}
              key={i}>
              <Text style={newStyles.textSp}>{doc}</Text>
              {select == doc && <SvgXml xml={tick} />}
            </Pressable>
          ))}
      </BottomSheetScrollView>
      <IconButton
        onPress={onClose}
        style={{
          marginVertical: 8,
          backgroundColor: "#4ADE80",
          marginHorizontal: 8,
          color: "white",
        }}
        title={"Done"}
      />
    </View>
  );
};
const tick = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.725 1.22423C14.055 0.885479 14.5413 0.664229 15.0188 0.792979C15.5688 0.907979 15.9525 1.42673 16 1.97298V2.03548C15.9688 2.44423 15.7487 2.80423 15.46 3.08298C12.5825 5.95548 9.7075 8.82923 6.835 11.7042C6.54625 11.993 6.18625 12.263 5.75625 12.2442C5.325 12.2605 4.9625 11.9917 4.67375 11.7017C3.30125 10.3267 1.9275 8.95298 0.55125 7.58298C0.2625 7.30423 0.0375 6.94798 0 6.54048V6.47923C0.03875 5.92298 0.42875 5.39423 0.9875 5.28048C1.46625 5.15173 1.95125 5.37923 2.28125 5.71923C3.44375 6.87298 4.59625 8.03673 5.75875 9.19048C8.41625 6.53798 11.0662 3.87798 13.725 1.22423Z" fill="#4ADE80"/>
</svg>
`;
const newStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "400",
  },
  input: {
    borderColor: "#A3A3A3",
    padding: 0,
    borderWidth: 1,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  radio: {
    height: 16,
    width: 16,
  },
  padding: {
    paddingLeft: 20,
  },
  textArea: {
    paddingHorizontal: 20,
    minHeight: 60,
    marginTop: 16,
    borderColor: "#A3A3A3",
    width: "100%",
  },
  button: {
    borderRadius: 4,
    backgroundColor: "#4ADE80",
    height: 44,
    color: "white",
    marginTop: 28,
  },
  box: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomColor: "#F1EFEF",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSp: {
    color: "#484848",
    fontWeight: "400",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 2,
  },
});
