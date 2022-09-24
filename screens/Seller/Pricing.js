import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Animated as Animation,
} from "react-native";
import {
  primaryColor,
  textColor,
  backgroundColor,
} from "./../../assets/colors";
import Input from "./../../components/Input";
import SuggestionBox, { MainOptions } from "./../../components/SuggestionBox";
import DropDown from "./../../components/DropDown";
const { width, height } = Dimensions.get("window");
import { Picker } from "@react-native-picker/picker";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DateTime from "./DateTime";
import { Checkbox } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import OutsideView from "react-native-detect-press-outside";
import { useSelector, useDispatch } from "react-redux";
import InputModal from "./InputModal";
//import {localOptionsToServer} from '../../Class/dataConverter'

const Pricing = ({ navigation, route }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [bounceValue, setBounceValue] = React.useState(new Animated.Value(300));
  const animatedHeight = Animated.spring(bounceValue, {
    toValue: 6000,
    velocity: 3,
    tension: 2,
    friction: 8,
    useNativeDriver: true,
  }).start();
  const [InputVisible, setInputVisible] = React.useState(false);
  const [text, setText] = React.useState();
  const [selectedItem, setSelectedItem] = React.useState(null);
  const DATA = [
    {
      title: "Mr",
      value: "Mr.",
    },
    {
      title: "Mrs",
      value: "Mrs.",
    },
    {
      title: "Miss",
      value: "Miss.",
    },
    {
      title: "Dr. (Doctor)",
      value: "Dr.",
    },
    {
      title: "Esq. (Esquire)",
      value: "Dr.",
    },
    {
      title: "Hon. (Honorable)",
      value: "Hon.",
    },
    {
      title: "Jr. (Junior)",
      value: "Jr.",
    },
  ];
  const [Data, setData] = React.useState([]);
  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [timer, setTimer] = React.useState(null);
  const [Positions, setPositions] = React.useState([]);
  const [SelectedPositions, setSelectedPositions] = React.useState();
  const PositionData = [
    {
      title: "Administrative Assistant",
      value: "Administrative Assistant",
    },
    {
      title: "Executive Assistant",
      value: "Executive Assistant",
    },
    {
      title: "Marketing Manager",
      value: "Marketing Manager",
    },
    {
      title: "Software Engineer",
      value: "Software Engineer",
    },
    {
      title: "Sales Manager",
      value: "Sales Manager",
    },
    {
      title: "Office Assistant",
      value: "Office Assistant",
    },
    {
      title: "General Manager",
      value: "General Manager",
    },
    {
      title: "Head of Department",
      value: "Head of Department",
    },
  ];
  const [visible, setVisible] = React.useState({
    title: "",
    visible: false,
  });
  const hideDialog = () =>
    setVisible({
      title: "Hide",
      visible: false,
    });
  const [change, setChange] = React.useState(false);
  ///////////////////////-----------------------------------
  const [ServiceName, setServiceName] = React.useState();
  const [ServiceNameError, setServiceNameError] = React.useState();
  const [Title, setTitle] = React.useState();
  const [TitleError, setTitleError] = React.useState();
  const [Name, setName] = React.useState();
  const [NameError, setNameError] = React.useState();
  const [Gender, setGender] = React.useState();
  const [GenderError, setGenderError] = React.useState();
  const [Position, setPosition] = React.useState();
  const [PositionError, setPositionError] = React.useState();
  const [TeamNumber, setTeamNumber] = React.useState("0");
  const [TeamNumberError, setTeamNumberError] = React.useState();
  const [Day, setDay] = React.useState();
  const [DayError, setDayError] = React.useState();
  const [Month, setMonth] = React.useState();
  const [MonthError, setMonthError] = React.useState();
  const [Year, setYear] = React.useState();
  const [YearError, setYearError] = React.useState();
  const [Times, setTimes] = React.useState([]);
  const [TimesError, setTimesError] = React.useState([]);
  const [StartingPrice, setStartingPrice] = React.useState();
  const [StartingPriceError, setStartingPriceError] = React.useState();
  const [Service, setService] = React.useState([
    {
      id:1,
      title: "Home Delivery Available",
      checked: false,
    },
    {
      id:2,
      title: "Home Service Available",
      checked: false,
    },
    {
      id:3,
      title: "Online Support Available",
      checked: false,
    },
  ]);
  const [ServiceCounter, setServiceCounter] = React.useState(0);
  const [ServiceError, setServiceError] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const [TimeError, setTimeError] = React.useState();
  //reference values================
  const [Ref, setRef] = React.useState();
  const serviceNameRef = React.useRef();
  const titleRef = React.useRef();
  const nameRef = React.useRef();
  const positionRef = React.useRef();
  const priceRef = React.useRef();
  const [genderRef, setGenderRef] = React.useState(false);
  const dispatch = useDispatch();
  const [ModalVisible, setModalVisible] = React.useState(false);
  const businessForm = useSelector((state) => state.businessForm);
  const listData = useSelector((state) => state.listData);

  React.useEffect(() => {
    // if(listData){
    //   localOptionsToServer(listData)
    // }
  },[])

  React.useEffect(() => {
    setServiceCounter(0);
    Service.forEach((doc, i) => {
      if (doc.checked) {
        setServiceCounter((d) => d + 1);
      }
    });
  }, [Service.length + change]);
  const scrollingTo = (position) => {
    if (Ref.scrollTo) {
      Ref.scrollTo({ x: 0, y: position, animated: true });
    }
  };
  React.useEffect(() => {
    if (businessForm && businessForm.serviceCenterName) {
      setServiceName(businessForm.serviceCenterName);
    }
    if (businessForm && businessForm.title) {
      setTitle(businessForm.title);
      setSelectedItem(businessForm.title);
    }
    if (businessForm && businessForm.name) {
      setName(businessForm.name);
    }
    if (businessForm && businessForm.gender) {
      setGender(businessForm.gender);
    }
    if (businessForm && businessForm.position) {
      setPosition(businessForm.position);
      setSelectedPositions(businessForm.position);
    }
    if (businessForm && businessForm.teamNumber) {
      setTeamNumber(businessForm.teamNumber);
    }
    if (businessForm && businessForm.startDate) {
      setDay(businessForm.startDate.day);
      setMonth(businessForm.startDate.month);
      setYear(businessForm.startDate.year);
    }
    if (businessForm && businessForm.workingTime) {
      setTimes(businessForm.workingTime);
      if (businessForm.workingTime == true) {
        setChecked(true);
      }
    }
    if (businessForm && businessForm.price) {
      setStartingPrice(businessForm.price);
    }
    if (businessForm && businessForm.facilities) {
      setService(businessForm.facilities);
      setServiceCounter(businessForm.facilities.length);
    }
  }, [businessForm]);
  const CheckValidity = () => {
    setServiceNameError(null);
    setTitleError(null);
    setNameError(null);
    setGenderError(null);
    setPositionError(null);
    setTeamNumberError(null);
    setDayError(null);
    setMonthError(null);
    setYearError(null);
    setTimeError(null);
    setServiceError(null);
    setStartingPriceError(null);
    if (!ServiceName) {
      setServiceNameError("This field is required");
      scrollingTo(0);
      return;
    }
    if (!Title) {
      setTitleError("This field is required");
      scrollingTo(0);
      return;
    }
    if (!Name) {
      setNameError("This field is required");
      scrollingTo(0);
      return;
    }
    if (!Gender) {
      setGenderError("This field is required");
      scrollingTo(0);
      return;
    }
    if (!Position) {
      setPositionError("This field is required");
      scrollingTo(0);
      return;
    }
    if (parseInt(TeamNumber) <= 0) {
      setTeamNumberError("You must have at least one team");
      scrollingTo(50);
      return;
    }
    if (!Day || !Month || !Year) {
      setDayError("*required");
      setMonthError("*required");
      setYearError("*required");
      scrollingTo(100);
      return;
    }
    if (!checked && Times.length == 0) {
      setTimeError("Please select any time");
      scrollingTo(250);
      return;
    }
    if (!StartingPrice) {
      setStartingPriceError("This field is required");
      return;
    }
    if (ServiceCounter == 0) {
      setServiceError("Please select any facilities");
      return;
    }
    dispatch({ type: "SERVICE_CENTER_NAME", playload: ServiceName });
    dispatch({ type: "TITLE", playload: Title });
    dispatch({ type: "NAME", playload: Name });
    dispatch({ type: "GENDER", playload: Gender });
    dispatch({ type: "POSITION", playload: Position });
    dispatch({ type: "TEAM_NUMBER", playload: TeamNumber });
    dispatch({
      type: "START_DATE",
      playload: {
        day: Day,
        month: Month,
        year: Year,
      },
    });
    dispatch({
      type: "WORKING_TIME",
      playload: Times.length == 0 ? true : Times,
    });
    dispatch({ type: "PRICE", playload: StartingPrice });
    dispatch({ type: "FACILITIES", playload: Service });
    navigation.navigate("Service");
  };
  //------------------------------------------

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <Animation.ScrollView
        ref={(ref) => setRef(ref)}
        scrollToOverflowEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.viewBox}>
          <Text style={styles.text}>Informations</Text>
          <Input
            value={ServiceName}
            innerRef={serviceNameRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              if (titleRef.current) {
                titleRef.current.focus();
              }
            }}
            error={ServiceNameError}
            onChange={(val) => {
              if (val.length < 8) {
                setServiceNameError("Name must be at least 8 characters");
                return;
              }
              setServiceNameError(null);
              setServiceName(val);
            }}
            onFocus={() => {
              setData([]);
              setPositions([]);
            }}
            style={{
              marginHorizontal: 0,
              borderWidth: 1,
              borderColor: "#e5e5e5",
              marginTop: 10,
            }}
            placeholder="Service center name"
          />
          <Text
            style={[
              styles.text,
              {
                marginTop: 5,
              },
            ]}
          >
            Service Provider Information
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <SuggestionBox
              innerRef={titleRef}
              placeholder="Title"
              value={selectedItem}
              error={TitleError}
              onChange={(val) => {
                setData(val);
              }}
              onSelect={(val) => {
                setTitle(val);
              }}
              DATA={DATA}
              style={{
                width: 120,
                marginTop: 10,
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (nameRef.current) {
                  nameRef.current.focus();
                }
              }}
            />
            <Input
              value={Name}
              innerRef={nameRef}
              onChange={(val) => {
                setName(val);
              }}
              onFocus={() => {
                setData([]);
                setPositions([]);
              }}
              error={NameError}
              style={{
                marginHorizontal: 0,
                borderWidth: 1,
                borderColor: "#e5e5e5",
                marginVertical: 10,
                marginLeft: 10,
                width: width - 170,
              }}
              placeholder="Name"
              returnKeyType="next"
              onSubmitEditing={() => {
                setGenderRef(true);
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <DropDown
              value={Gender}
              visible={genderRef}
              onChange={(val) => {
                setGender(val);
                if (positionRef.current) {
                  positionRef.current.focus();
                }
              }}
              error={GenderError}
              style={{
                marginTop: 5,
                width: 120,
              }}
              placeholder="Gender"
              DATA={["Male", "Female", "Other"]}
            />

            <SuggestionBox
              innerRef={positionRef}
              error={PositionError}
              placeholder="Position"
              value={SelectedPositions}
              onChange={(val) => {
                setPositions(val);
              }}
              onSelect={(val) => {
                setPosition(val);
              }}
              DATA={PositionData}
              style={{
                marginTop: 5,
                marginLeft: 10,
                width: width - 170,
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (priceRef.current) {
                  //priceRef.current.focus();
                }
              }}
            />
          </View>
          <Text
            style={{
              color: textColor,
              fontSize: 15,
              fontFamily: "Poppins-Medium",
              marginTop: 10,
            }}
          >
            How many team/ Worker do you have?
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity
              onPress={() => {
                setData([]);
                setPositions([]);
                let num = parseInt(TeamNumber);
                if (num > 0) {
                  setTeamNumber(`${num - 1}`);
                }
              }}
              style={styles.button}
            >
              <FontAwesome5 name="minus" size={20} color="#707070" />
            </TouchableOpacity>
            <TextInput
              value={TeamNumber}
              keyboardType="numeric"
              onEndEditing={() => {
                if (!TeamNumber) {
                  setTeamNumber("0");
                }
              }}
              onFocus={() => {
                setData([]);
                setPositions([]);
              }}
              onChangeText={(val) => {
                setTeamNumber(val);
                setData([]);
                setPositions([]);
              }}
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Medium",
                marginHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#e5e5e5",
                height: 40,
                width: 70,
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              value={TeamNumber}
            />
            <TouchableOpacity
              onPress={() => {
                setData([]);
                setPositions([]);
                let num = parseInt(TeamNumber) + 1;
                setTeamNumber(`${num}`);
              }}
              style={styles.button}
            >
              <FontAwesome name="plus" size={20} color="#707070" />
            </TouchableOpacity>
          </View>
          {TeamNumberError && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 2,
                fontFamily: "Poppins-Light",
                color: "red",
                marginTop: 3,
              }}
            >
              {TeamNumberError}
            </Text>
          )}
          <Text
            style={{
              color: textColor,
              fontSize: 15,
              fontFamily: "Poppins-Medium",
              marginTop: 10,
            }}
          >
            Established/ Starting Date
          </Text>
          <View style={{ flexDirection: "row" }}>
            <DropDown
              value={Day}
              error={DayError}
              onChange={(val) => {
                setDay(val);
              }}
              style={{
                marginTop: 10,
              }}
              placeholder="Date"
              DATA={DateTime.day}
            />
            <DropDown
              value={Month}
              error={MonthError}
              onChange={(val) => {
                setMonth(val);
              }}
              style={{
                marginTop: 10,
                marginLeft: 10,
              }}
              placeholder="Month"
              DATA={DateTime.month}
            />
            <DropDown
              value={Year}
              error={YearError}
              onChange={(val) => {
                setYear(val);
              }}
              style={{
                marginTop: 10,
                marginLeft: 10,
              }}
              placeholder="Year"
              DATA={DateTime.year()}
            />
          </View>
        </View>
        <Animated.View style={[styles.viewBox, { maxHeight: animatedHeight }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>Times</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  borderWidth: Platform.OS == "ios" ? 1 : 0,
                  borderColor: "#e5e5e5",
                  height: 33,
                  width: 33,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginRight: Platform.OS == "ios" ? 10 : 0,
                }}
              >
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
              <Text style={styles.text}>24/7 open</Text>
            </View>
          </View>
          {!checked ? (
            <Animated.View entering={FadeIn}>
              <Days
                value={Times}
                error={TimesError[0]}
                onChange={(val) => {
                  let arr = Times;
                  arr[0] = val;
                  setTimes(arr);
                }}
                setVisible={setVisible}
                title="Saturday"
              />
              <Days
                value={Times}
                error={TimesError[1]}
                onChange={(val) => {
                  let arr = Times;
                  arr[1] = val;
                  setTimes(arr);
                }}
                setVisible={setVisible}
                title="Sunday"
              />
              <Days
                value={Times}
                error={TimesError[2]}
                onChange={(val) => {
                  let arr = Times;
                  arr[2] = val;
                  setTimes(arr);
                }}
                setVisible={setVisible}
                title="Monday"
              />
              <Days
                value={Times}
                error={TimesError[3]}
                onChange={(val) => {
                  let arr = Times;
                  arr[3] = val;
                  setTimes(arr);
                }}
                setVisible={setVisible}
                title="Tuesday"
              />
              <Days
                value={Times}
                error={TimesError[4]}
                onChange={(val) => {
                  let arr = Times;
                  arr[4] = val;
                  setTimes(arr);
                }}
                setVisible={setVisible}
                title="Wednesday"
              />
              <Days
                value={Times}
                error={TimesError[5]}
                onChange={(val) => {
                  let arr = Times;
                  arr[5] = val;
                  setTimes(arr);
                }}
                setVisible={setVisible}
                title="Thursday"
              />
              <Days
                value={Times}
                error={TimesError[6]}
                onChange={(val) => {
                  let arr = Times;
                  arr[6] = val;
                  setTimes(arr);
                }}
                setVisible={setVisible}
                title="Friday"
              />
            </Animated.View>
          ) : (
            <></>
          )}
          {TimeError && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 2,
                fontFamily: "Poppins-Light",
                color: "red",
                marginTop: 3,
              }}
            >
              {TimeError}
            </Text>
          )}
        </Animated.View>
        <View style={styles.viewBox}>
          <Text style={styles.text}>Service Fee</Text>
          <Input
            value={StartingPrice}
            innerRef={priceRef}
            error={StartingPriceError}
            onChange={(val) => {
              setStartingPrice(val);
            }}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              marginLeft: 0,
              width: 120,
            }}
            placeholder="Starting Price"
          />
          <Text
            style={[
              styles.text,
              {
                marginTop: 10,
              },
            ]}
          >
            Choose your facilities
          </Text>
          {Array.isArray(Service) &&
            Service.map((doc, i) => (
              <CheckBox
                key={i}
                style={{
                  marginTop: 10,
                }}
                value={doc.checked}
                title={doc.title}
                onChange={() => {
                  let arr = Service;
                  setService(null);
                  arr[i] = {
                    title: doc.title,
                    checked: !doc.checked,
                  };
                  setService(arr);
                  setChange(!change);
                  //console.log(arr);
                }}
              />
            ))}
          {ServiceError && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 2,
                fontFamily: "Poppins-Light",
                color: "red",
                marginTop: 3,
              }}
            >
              {ServiceError}
            </Text>
          )}
          {buttonVisible && (
            <Input
              onChange={(val) => {
                setButtonVisible(val);
              }}
              style={{}}
            />
          )}
          <Button
            onPress={() => {
              setButtonVisible(true);
            }}
            style={{
              flexDirection: "row",
              borderWidth: 0,
              width: 100,
              marginTop: 10,
              color: textColor,
            }}
            Icon={() => (
              <FontAwesome
                style={{
                  marginRight: 10,
                }}
                name="plus"
                size={20}
                color="#707070"
              />
            )}
            title={"Add More"}
          />
        </View>
        <Button
          onPress={() => {
            CheckValidity();
          }}
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: backgroundColor,
            color: "white",
            borderWidth: 0,
            height: 45,
          }}
          title="Next"
        />
        <MainOptions
          setValue={(value) => {
            setSelectedItem(value);
            setTitle(value);
          }}
          setData={setData}
          style={{
            marginTop: Platform.OS == "ios" ? 145 : 152,
            marginLeft: 20,
            width: 120,
          }}
          Data={Data}
        />

        <MainOptions
          setValue={(value) => {
            setSelectedPositions(value);
            setPosition(value);
          }}
          setData={setPositions}
          style={{
            marginTop: Platform.OS == "ios" ? 203 : 210,
            marginLeft: 150,
            width: width - 170,
          }}
          Data={Positions}
        />
        <Modal
          transparent={true}
          animationType="fade"
          visible={buttonVisible}
          onRequestClose={() => setButtonVisible((val) => !val)}
        >
          <InputModal
            onChange={(val) => {
              let arr = Service;
              arr.push({
                title: val,
                checked: true,
                id:arr.length+2
              });
              setService(arr);
            }}
            Close={setButtonVisible}
          />
        </Modal>
      </Animation.ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Pricing;
const styles = StyleSheet.create({
  viewBox: {
    backgroundColor: primaryColor,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minHeight: 50,
    borderRadius: 5,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    
  },
  button: {
    backgroundColor: primaryColor,
    height: 35,
    width: 35,
    borderRadius: 18,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontFamily: "Poppins-Light",
    fontSize: 13,
    marginTop: 3,
    marginBottom: 3,
    color: "red",
    margin: 3,
  },
});
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./../../components/Button";
import { Paragraph, Dialog, Portal, Snackbar } from "react-native-paper";

const Days = ({ title, error, onChange, value }) => {
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [day, setDay] = React.useState(false);
  const [OpeningTime, setOpeningTime] = React.useState();
  const [ClosingTime, setClosingTime] = React.useState();
  const [Open, setOpen] = React.useState(false);
  const [Close, setClose] = React.useState(false);
  const [Error, setError] = React.useState(null);
  React.useEffect(() => {
    setError(error);
  }, [error]);
  React.useEffect(() => {
    if (Array.isArray(value)) {
      let arr = value.filter((item) => item.title == title);
      if (arr.length > 0) {
        setDay(true);
        setOpeningTime(arr[0].openingTime)
        setClosingTime(arr[0].closingTime)
      }
    }
  }, [value]);
  const toTime = (timestamp) => {
    let date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const Box = React.forwardRef((props, ref) => (
    <Checkbox
      {...props}
      innerRef={ref}
      status={day ? "checked" : "unchecked"}
      onPress={() => {
        setDay(!day);
      }}
    />
  ));
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        onPress={() => {}}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            borderWidth: Platform.OS == "ios" ? 1 : 0,
            borderColor: "#e5e5e5",
            height: 33,
            width: 33,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginRight: Platform.OS == "ios" ? 10 : 0,
          }}
        >
          <Box />
        </View>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
      {day ? (
        <Animated.View entering={FadeIn} style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e5e5e5",
              borderRadius: 5,
              margin: 5,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Poppins-Medium",
                color: "#707070",
                marginRight: 10,
              }}
            >
              {OpeningTime ? toTime(OpeningTime) : "Opening Time"}
            </Text>
            <MaterialCommunityIcons name="clock" size={24} color="#707070" />
            <DateTimePickerModal
              date={OpeningTime?OpeningTime: new Date()}
              buttonTextColorIOS={backgroundColor}
              isVisible={Open}
              mode="time"
              onConfirm={(e) => {
                if (ClosingTime && ClosingTime < e) {
                  setError(`Opening time can't be earlier from closing time.`);
                  setOpen(false);
                  setOpeningTime(null);
                  return;
                }
                setError(null);
                setOpeningTime(e);
                setOpen(false);
                if (onChange) {
                  onChange({
                    title: title,
                    openingTime: e,
                    closingTime: ClosingTime,
                  });
                }
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setClose(true);
            }}
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e5e5e5",
              borderRadius: 5,
              margin: 5,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Poppins-Medium",
                color: "#707070",
                marginRight: 10,
              }}
            >
              {ClosingTime ? toTime(ClosingTime) : "Closing Time"}
            </Text>
            <MaterialCommunityIcons name="clock" size={24} color="#707070" />
            <DateTimePickerModal date={ClosingTime?ClosingTime:new Date()}
              buttonTextColorIOS={backgroundColor}
              isVisible={Close}
              mode="time"
              onConfirm={(e) => {
                if (OpeningTime && OpeningTime >= e) {
                  setError(`Opening time can't be earlier from closing time.`);
                  setClose(false);
                  setClosingTime(null);
                  return;
                }
                setError(null);
                setClosingTime(e);
                setClose(false);
                if (onChange) {
                  onChange({
                    title: title,
                    openingTime: OpeningTime,
                    closingTime: e,
                  });
                }
              }}
              onCancel={() => {
                setClose(false);
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <></>
      )}
      {Error && <Text style={styles.error}>{Error}</Text>}
    </View>
  );
};
export const CheckBox = ({ onChange, value, title, style }) => {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(value)
  },[value])
  return (
    <View style={[{ flexDirection: "row", alignItems: "center"}, style]}>
      <View
        style={{
          borderWidth: Platform.OS == "ios" ? 1 : 0,
          borderColor: "#e5e5e5",
          height: 33,
          width: 33,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginRight: Platform.OS == "ios" ? 10 : 0,
        }}
      >
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            onChange();
            setChecked(!checked);
          }}
        />
      </View>
      <Text style={[styles.text,{
        flex: 1,
      }]}>{title}</Text>
    </View>
  );
};
