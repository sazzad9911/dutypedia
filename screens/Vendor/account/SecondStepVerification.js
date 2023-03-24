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
  React.useEffect(() => {
    if (index == -1) {
      dispatch(setHideBottomBar(false));
    } else {
      dispatch(setHideBottomBar(true));
    }
  }, [index]);

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "60%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
    setIndex(index);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 28,
            marginBottom: 32,
            paddingHorizontal: 28,
          }}>
          <Text style={[styles.text, { marginBottom: 12 }]}>
            {type == "Company" && "Company "}Name
          </Text>
          <Input
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
                <Input
                  onPress={() => {
                    setIndex(1);
                    setSelect("Division");
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

                <Input onPress={()=>{
                  setIndex(1);
                  setSelect("District");
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
                  placeholder={"Upazilla"}
                />
                <Input
                  style={[
                    styles.input,
                    { width: width / 2 - 48 },
                    styles.padding,
                  ]}
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
            <Input
              onPress={() => {
                setIndex(1);
                setSelect("Division");
              }}
              value={permanentDivision}
              editable={false}
              style={[styles.input, { width: width / 2 - 48 }, styles.padding]}
              placeholder={"Division"}
            />
            <Input
              onPress={() => {
                setIndex(1);
                setSelect("District");
              }}
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
              placeholder={"Upazilla"}
            />
            <Input
              value={permanentPostalCode}
              onChange={setPermanentPostalCode}
              style={[styles.input, { width: width / 2 - 48 }, styles.padding]}
              placeholder={"Postal code"}
            />
          </View>
          <TextArea
            value={permanentFullAddress}
            onChange={setPermanentFullAddress}
            style={styles.textArea}
            placeholder={"Full address"}
          />
          <IconButton
            onPress={() => {
              navigation.navigate("ThirdStepVerification");
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
        <Screen select={select} />
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
});
const Screen = ({ select }) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <BottomSheetScrollView
        contentContainerStyle={{
          backgroundColor: "#ffffff",
        }}>
          {DistrictList.map((doc,i)=>(
            <View>
              <Text>{}</Text>
            </View>
          ))}
        </BottomSheetScrollView>
    </View>
  );
};
