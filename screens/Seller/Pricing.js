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

const Pricing = ({ navigation, route }) => {
  const [CenterName, setCenterName] = React.useState();
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const [TeamNumber, setTeamNumber] = React.useState("0");
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

  const addOne = () => {
    setTeamNumber(TeamNumber + 1);
    setTimer(setTimeout(addOne, 20));
  };

  const stopTimer = () => {
    clearTimeout(timer);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
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
              placeholder="Title"
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

            <SuggestionBox
              placeholder="Position"
              value={SelectedPositions}
              onChange={(val) => {
                setPositions(val);
              }}
              DATA={PositionData}
              style={{
                marginTop: 5,
                marginLeft: 10,
                width: width - 170,
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
              keyboardType="numeric"
              onChangeText={(val) => {
                setTeamNumber(val);
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
                let num = parseInt(TeamNumber) + 1;
                setTeamNumber(`${num}`);
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
              placeholder="Date"
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
          <Text style={styles.text}>Service Fee</Text>
          <Input
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
            height: 45,
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
        <MainOptions
          setValue={setSelectedPositions}
          setData={setPositions}
          style={{
            marginTop: Platform.OS == "ios" ? 203 : 210,
            marginLeft: 150,
            width: width - 170,
          }}
          Data={Positions}
        />
      </KeyboardAvoidingView>
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
import { Paragraph, Dialog, Portal } from "react-native-paper";

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
  
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

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
              buttonTextColorIOS={backgroundColor}
              isVisible={Open}
              mode="time"
              onConfirm={(e) => {
                setOpeningTime(e);
                setOpen(false);
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
            <DateTimePickerModal
              buttonTextColorIOS={backgroundColor}
              isVisible={Close}
              mode="time"
              onConfirm={(e) => {
                setClosingTime(e);
                setClose(false);
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
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>This is a title</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
      </Dialog>
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
