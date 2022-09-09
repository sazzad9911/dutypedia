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

const Pricing = ({ navigation, route }) => {
  const [CenterName, setCenterName] = React.useState();
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [TeamNumber, setTeamNumber] = React.useState(0);
  const [Day, setDay] = React.useState();
  const [Month, setMonth] = React.useState();
  const [Year, setYear] = React.useState();
  const [checked, setChecked] = React.useState(false);
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
  const [Service, setService] = React.useState([
    {
      title: "Home Delivery Available",
      checked: false,
    },
    {
      title: "Home Service Available",
      checked: false,
    },
    {
      title: "Online Support Available",
      checked: false,
    },
  ]);
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

  const addOne = () => {
    setTeamNumber(TeamNumber + 1);
    setTimer(setTimeout(addOne, 20));
  };

  const stopTimer = () => {
    clearTimeout(timer);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.viewBox}>
          <Text style={styles.text}>Informations</Text>
          <Input
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
              value={selectedItem}
              onChange={(val) => {
                setData(val);
              }}
              DATA={DATA}
              style={{
                width: 120,
                marginTop: 10,
              }}
            />
            <Input
              style={{
                marginHorizontal: 0,
                borderWidth: 1,
                borderColor: "#e5e5e5",
                marginVertical: 10,
                marginLeft: 10,
                width: width - 170,
              }}
              placeholder="Name"
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <DropDown
              style={{
                marginTop: 5,
                width: 120,
              }}
              placeholder="Gender"
              DATA={["Male", "Female", "Other"]}
            />

            <Input
              style={{
                marginHorizontal: 0,
                borderWidth: 1,
                borderColor: "#e5e5e5",
                marginLeft: 10,
                width: width - 170,
                marginTop: 5,
              }}
              placeholder="Position"
            />
          </View>
          <Text
            style={{
              color: textColor,
              fontSize: 15,
              fontFamily: "Poppins-Medium",
              marginTop: 5,
            }}
          >
            How many team/ Worker do you have?
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity
              onPress={() => {
                setTeamNumber((num) => {
                  if (num > 0) {
                    return (num = num - 1);
                  }
                  return 0;
                });
              }}
              style={styles.button}
            >
              <FontAwesome5 name="minus" size={20} color="#707070" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginHorizontal: 20,
              }}
            >
              {TeamNumber}
            </Text>
            <TouchableOpacity
             
              onPress={() => {
                setTeamNumber((num) => num + 1);
              }}
              style={styles.button}
            >
              <FontAwesome name="plus" size={20} color="#707070" />
            </TouchableOpacity>
          </View>
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
              style={{
                marginTop: 10,
              }}
              placeholder="Month"
              DATA={DateTime.day}
            />
            <DropDown
              style={{
                marginTop: 10,
                marginLeft: 10,
              }}
              placeholder="Month"
              DATA={DateTime.month}
            />
            <DropDown
              style={{
                marginTop: 10,
                marginLeft: 10,
              }}
              placeholder="Year"
              DATA={DateTime.year}
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
              <Days title="Saturday" />
              <Days title="Sunday" />
              <Days title="Monday" />
              <Days title="Tuesday" />
              <Days title="Wednesday" />
              <Days title="Thursday" />
              <Days title="Friday" />
            </Animated.View>
          ) : (
            <></>
          )}
        </Animated.View>
        <View style={styles.viewBox}>
          <Text style={styles.text}>Service</Text>
          <Input
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              marginLeft: 0,
              width: 120,
            }}
            placeholder="Starting Price"
          />
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
                  //console.log(arr);
                }}
              />
            ))}

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
              if (buttonVisible) {
                let arr = Service;
                arr.push({
                  title: buttonVisible,
                  checked: true,
                });
                setService(arr);
                setButtonVisible(null);
              }
            }}
            style={{
              flexDirection: "row",
              borderWidth: 0,
              width: 100,
              marginTop: 10,
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
            title={buttonVisible ? "Save" : "Add More"}
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate("Service");
          }}
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: backgroundColor,
            color: "white",
            borderWidth: 0,
          }}
          title="Next"
        />
        <MainOptions
          setValue={setSelectedItem}
          setData={setData}
          style={{
            marginTop: Platform.OS == "ios" ? 145 : 152,
            marginLeft: 20,
            width: 120,
          }}
          Data={Data}
        />
      </View>
    </ScrollView>
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
});
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./../../components/Button";
const Days = ({ title }) => {
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [day, setDay] = React.useState(false);
  const [OpeningTime, setOpeningTime] = React.useState();
  const [ClosingTime, setClosingTime] = React.useState();
  const [Open, setOpen] = React.useState(false);
  const [Close, setClose] = React.useState(false);
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
  return (
    <View style={{ marginBottom: 10 }}>
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
            status={day ? "checked" : "unchecked"}
            onPress={() => {
              setDay(!day);
            }}
          />
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
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
            <Modal
              transparent={true}
              visible={Open}
              onRequestClose={() => setOpen(!Open)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={false}
                  onChange={(e, val) => {
                    setOpeningTime(val);
                    setOpen(false);
                  }}
                  style={{ width: 320, backgroundColor: primaryColor }}
                />
              </View>
            </Modal>
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
            <Modal
              transparent={true}
              visible={Close}
              onRequestClose={() => setClose(!Close)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={false}
                  onChange={(e, val) => {
                    setClosingTime(val);
                    setClose(false);
                  }}
                  style={{ width: 320, backgroundColor: primaryColor }}
                />
              </View>
            </Modal>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <></>
      )}
    </View>
  );
};
const CheckBox = ({ onChange, value, title, style }) => {
  const [checked, setChecked] = React.useState(value);
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
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
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
