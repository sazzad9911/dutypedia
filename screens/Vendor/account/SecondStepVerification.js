import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import IconButton from "../../../components/IconButton";
import Input from "../../../components/Input";
import RadioButton from "../../../components/RadioButton";
import TextArea from "../../../components/TextArea";
import DatePicker from "../../../Hooks/DatePicker";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DistrictList } from "../../../Data/district";
import InputButton from "./InputButton";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

export default function SecondStepVerification({ navigation, route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const type = route?.params?.type;
  const [index, setIndex] = useState(-1);
  React.useEffect(() => {
    if (isFocused) {
      //dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      // dispatch(setHideBottomBar(true));
    }, 50);
  }, [isFocused]);
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [select, setSelect] = useState();
  const [presentDivision, setPresentDivision] = useState();
  const [presentDistrict, setPresentDistrict] = useState();
  const [presentUpazila, setPresentUpazila] = useState();
  const [presentPostalCode, setPresentPostalCode] = useState();
  const [presentFullAddress, setPresentFullAddress] = useState();
  const [permanentDivision, setPermanentDivision] = useState();
  const [permanentDistrict, setPermanentDistrict] = useState();
  const [permanentUpazila, setPermanentUpazila] = useState();
  const [permanentPostalCode, setPermanentPostalCode] = useState();
  const [permanentFullAddress, setPermanentFullAddress] = useState();
  const [presentDistrictError, setPresentDistrictError] = useState();
  const [permanentDistrictError, setPermanentDistrictError] = useState();
  const [nameError,setNameError]=useState()
  const [genderError,setGenderError]=useState()
  const [presentError,setPresentError]=useState()
  const [permanentError,setPermanentError]=useState()
  const [dateError,setDateError]=useState()
  const inset=useSafeAreaInsets()

  React.useEffect(() => {
    if (index == -1) {
      dispatch(setHideBottomBar(false));
    } else {
      dispatch(setHideBottomBar(true));
    }
  }, [index]);

  const bottomSheetRef = useRef(null);
  const scrollRef=useRef()
  // variables
  const snapPoints = useMemo(() => ["25%", "60%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
    setIndex(index);
  }, []);
  const next = () => {
    setNameError()
    setGenderError()
    setDateError()
    setPresentError()
    setPermanentError()
    if(!name){
      setNameError("*Name is required")
      scrollRef?.current.scrollTo({y:0})
      return
    }
    if(type!="Company"&&!gender){
      setGenderError("*Gender is required")
      scrollRef?.current.scrollTo({y:10})
      return
    }
    if(!date){
      setDateError("*Date is required")
      scrollRef?.current.scrollTo({y:50})
      return
    }
    
    if(type!="Company"&&(!presentDistrict||!presentDivision||!presentUpazila||!presentPostalCode||!presentFullAddress)){
      setPresentError("*Address is required")
      scrollRef?.current.scrollTo({y:100})
      return
    }
    if(!permanentDistrict || !permanentDivision ||!permanentUpazila||!permanentPostalCode||!permanentFullAddress){
      setPermanentError("*Address is required")
      return
    }

    let data = {
      type: type,
      name: name,
      gender: gender,
      date: date,
      presentAddress: {
        division: presentDivision,
        district: presentDistrict,
        upazila: presentUpazila,
        postalCode: presentPostalCode,
        fullAddress: presentFullAddress,
      },
      permanentAddress: {
        division: permanentDivision,
        district: permanentDistrict,
        upazila: permanentUpazila,
        postalCode: permanentPostalCode,
        fullAddress: permanentFullAddress,
      },
    };
    
    navigation.navigate("ThirdStepVerification", {data:data});
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1,paddingTop:inset?.top }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
     
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 28,
            marginBottom: 32,
            paddingHorizontal: 28,
          }}>
          <Text style={[styles.text, { marginBottom: 12 }]}>
            {type == "Company" && "Company "}Name
          </Text>
          <Input error={nameError}
            value={name}
            onChange={setName}
            style={styles.input}
            placeholder={`Type your ${
              type == "Company" ? "company" : "full"
            } name`}
          />
          {type != "Company" && (
            <>
              <Text style={[styles.text, { marginTop: 28 }]}>gender</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12,
                }}>
                <RadioButton
                  dark={true}
                  value={gender == "Male" ? true : false}
                  onChange={() => setGender("Male")}
                  margin={0}
                  style={styles.radio}
                  selectStyle={styles.radio}
                  title={"Male"}
                />
                <View style={{ width: 12 }} />
                <RadioButton
                  dark={true}
                  value={gender == "Female" ? true : false}
                  onChange={() => setGender("Female")}
                  margin={0}
                  selectStyle={styles.radio}
                  style={[styles.radio]}
                  title={"Female"}
                />
                <View style={{ width: 12 }} />
                <RadioButton
                  dark={true}
                  value={gender == "Other" ? true : false}
                  onChange={() => setGender("Other")}
                  margin={0}
                  selectStyle={styles.radio}
                  style={styles.radio}
                  title={"Other"}
                />
              </View>
              {genderError&&(<Text style={styles.errorText}>{genderError}</Text>)}
            </>
          )}
          <Text style={[styles.text, { marginTop: 28 }]}>
            {type == "Company" ? "Established date" : "Date of birth"}
          </Text>
          <DatePicker
            value={date}
            onChange={setDate}
            style={{
              marginTop: 12,
            }}
          />
          {dateError&&(<Text style={styles.errorText}>{dateError}</Text>)}
          {type != "Company" && (
            <>
              <Text style={[styles.text, { marginTop: 28 }]}>
                Present address
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                  justifyContent: "space-between",
                }}>
                <InputButton
                  onPress={() => {
                    setIndex(1);
                    setSelect("Present Division");
                    setPresentDistrictError();
                  }}
                  value={presentDivision}
                  style={[
                    styles.input,
                    { width: width / 2 - 48 },
                    styles.padding,
                  ]}
                  editable={false}
                  placeholder={"Division"}
                />

                <InputButton
                  error={presentDistrictError}
                  onPress={() => {
                    if (!presentDivision) {
                      setPresentDistrictError("*Division not selected");
                      return;
                    }
                    setIndex(1);
                    setSelect("Present District");
                  }}
                  value={presentDistrict}
                  style={[
                    styles.input,
                    { width: width / 2 - 48 },
                    styles.padding,
                  ]}
                  editable={false}
                  placeholder={"District"}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                  justifyContent: "space-between",
                }}>
                <Input
                  value={presentUpazila}
                  style={[
                    styles.input,
                    { width: width / 2 - 48 },
                    styles.padding,
                  ]}
                  onChange={setPresentUpazila}
                  placeholder={"Upazilla/City"}
                />
                <Input
                  style={[
                    styles.input,
                    { width: width / 2 - 48 },
                    styles.padding,
                  ]}
                  keyboardType={"number-pad"}
                  value={presentPostalCode}
                  onChange={setPresentPostalCode}
                  placeholder={"Postal code"}
                />
              </View>
              <TextArea
                value={presentFullAddress}
                style={styles.textArea}
                onChange={setPresentFullAddress}
                placeholder={"Full address"}
              />
              {presentError&&(<Text style={styles.errorText}>{presentError}</Text>)}
            </>
          )}

          <Text style={[styles.text, { marginTop: 28 }]}>
            {type == "Company" ? "Company address" : "Permanent Address"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              justifyContent: "space-between",
            }}>
            <InputButton
              onPress={() => {
                setIndex(1);
                setSelect("Permanent Division");
                setPermanentDistrictError()
              }}
              value={permanentDivision}
              editable={false}
              style={[styles.input, { width: width / 2 - 48 }, styles.padding]}
              placeholder={"Division"}
            />
            <InputButton
              onPress={() => {
                if (!permanentDivision) {
                  setPermanentDistrictError("*Division not selected");
                  return;
                }
                setIndex(1);
                setSelect("Permanent District");
              }}
              error={permanentDistrictError}
              editable={false}
              value={permanentDistrict}
              style={[styles.input, { width: width / 2 - 48 }, styles.padding]}
              placeholder={"District"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              justifyContent: "space-between",
            }}>
            <Input
              value={permanentUpazila}
              onChange={setPermanentUpazila}
              style={[styles.input, { width: width / 2 - 48 }, styles.padding]}
              placeholder={"Upazilla/City"}
            />
            <Input
              value={permanentPostalCode}
              onChange={setPermanentPostalCode}
              style={[styles.input, { width: width / 2 - 48 }, styles.padding]}
              placeholder={"Postal code"}
              keyboardType={"number-pad"}
            />
          </View>
          <TextArea
            value={permanentFullAddress}
            onChange={setPermanentFullAddress}
            style={styles.textArea}
            placeholder={"Full address"}
          />
          {permanentError&&(<Text style={styles.errorText}>{permanentError}</Text>)}
          <IconButton
            onPress={() => {
              next();
            }}
            style={styles.button}
            title={"Next"}
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
            top: -100,
          }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}>
        {select == "Present Division" && (
          <Screen
            onChange={(e) => {
              setPresentDivision(e);
              
            }}
            onClose={()=>bottomSheetRef?.current?.close()}
            select={presentDivision}
          />
        )}
        {select == "Present District" && (
          <Screen
            value={presentDivision}
            onChange={(e) => {
              setPresentDistrict(e);
              //bottomSheetRef?.current?.close();
            }}
            onClose={()=>bottomSheetRef?.current?.close()}
            select={presentDistrict}
          />
        )}
        {select == "Permanent Division" && (
          <Screen
            onChange={(e) => {
              setPermanentDivision(e);
              //bottomSheetRef?.current?.close();
            }}
            onClose={()=>bottomSheetRef?.current?.close()}
            select={permanentDivision}
          />
        )}
        {select == "Permanent District" && (
          <Screen
            value={permanentDivision}
            onChange={(e) => {
              setPermanentDistrict(e);
              //bottomSheetRef?.current?.close();
            }}
            onClose={()=>bottomSheetRef?.current?.close()}
            select={permanentDistrict}
          />
        )}
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
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
    flexDirection:"row",
    justifyContent:"space-between"
  },
  textSp: {
    color: "#484848",
    fontWeight: "400",
    fontSize: 16,
    
  },
  errorText:{
    color:"red",
    marginTop:2
  }
});
const Screen = ({ select, value, onChange, onClose }) => {
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
        {value ? "District" : "Division"}
      </Text>
      <BottomSheetScrollView
        contentContainerStyle={{
          backgroundColor: "#ffffff",
        }}>
        {!value &&
          DistrictList.map((doc, i) => (
            <Pressable
              onPress={() => {
                if (onChange) {
                  onChange(doc.title);
                }
              }}
              style={styles.box}
              key={i}>
              <Text style={styles.textSp}>{doc.title}</Text>
              {select==doc.title&&(<SvgXml xml={tick}/>)}
            </Pressable>
          ))}
        {value &&
          DistrictList.filter((d) => d.title.match(value))[0].data.map(
            (doc, i) => (
              <Pressable
                onPress={() => {
                  if (onChange) {
                    onChange(doc);
                  }
                }}
                style={styles.box}
                key={i}>
                <Text style={styles.textSp}>{doc}</Text>
                {select==doc&&(<SvgXml xml={tick}/>)}
              </Pressable>
            )
          )}
      </BottomSheetScrollView>
      <IconButton onPress={onClose}
        style={{
          marginBottom: 20,
          backgroundColor: "#4ADE80",
          marginHorizontal: 8,
          color:"white"
        }}
        title={"Done"}
      />
    </View>
  );
};
const tick=`<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.725 1.22423C14.055 0.885479 14.5413 0.664229 15.0188 0.792979C15.5688 0.907979 15.9525 1.42673 16 1.97298V2.03548C15.9688 2.44423 15.7487 2.80423 15.46 3.08298C12.5825 5.95548 9.7075 8.82923 6.835 11.7042C6.54625 11.993 6.18625 12.263 5.75625 12.2442C5.325 12.2605 4.9625 11.9917 4.67375 11.7017C3.30125 10.3267 1.9275 8.95298 0.55125 7.58298C0.2625 7.30423 0.0375 6.94798 0 6.54048V6.47923C0.03875 5.92298 0.42875 5.39423 0.9875 5.28048C1.46625 5.15173 1.95125 5.37923 2.28125 5.71923C3.44375 6.87298 4.59625 8.03673 5.75875 9.19048C8.41625 6.53798 11.0662 3.87798 13.725 1.22423Z" fill="#4ADE80"/>
</svg>
`