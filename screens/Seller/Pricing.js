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
} from "react-native";
import { primaryColor, textColor } from "./../../assets/colors";
import Input from "./../../components/Input";
import SuggestionBox from "./../../components/SuggestionBox";
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
  const [HomeDelivery, setHomeDelivery] = React.useState(false);
  const [HomeService, setHomeService] = React.useState(false);
  const [OnlineSupport, setOnlineSupport] = React.useState(false);
  const [InputVisible, setInputVisible] = React.useState(false);
  const [text, setText] = React.useState();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
          {/* <View style={{ zIndex: 1 }}>
            <SuggestionBox
              style={{
                width: 120,
                marginTop: 10,
              }}
              placeholder="Title"
            />
          </View> */}
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
          <View
            style={{
              borderWidth: 1,
              borderColor: "#e5e5e5",
              borderRadius: 5,
              height: 45,
              marginTop: 5,
            }}
          >
            <Picker
              style={{
                width: 120,
                height: 45,
                transform: [{ translateY: -5 }],
              }}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label="Gender" value="" />
              <Picker.Item label="Male" value="js" />
              <Picker.Item label="Female" value="js" />
              <Picker.Item label="Other" value="js" />
            </Picker>
          </View>
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
          <View
            style={{
              borderWidth: 1,
              borderColor: "#e5e5e5",
              borderRadius: 5,
              height: 45,
              marginTop: 10,
            }}
          >
            <Picker
              style={{
                width: 115,
                height: 45,
                transform: [{ translateY: -5 }],
              }}
              selectedValue={Day}
              onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
            >
              <Picker.Item label="Day" value="" />
              <Picker.Item label="1" value="" />
              <Picker.Item label="2" value="" />
            </Picker>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#e5e5e5",
              borderRadius: 5,
              height: 45,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            <Picker
              style={{
                width: 115,
                height: 45,
                transform: [{ translateY: -5 }],
              }}
              selectedValue={Month}
              onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
            >
              <Picker.Item label="Month" value="" />
              {Array.isArray(DateTime.month) &&
                DateTime.month.map((doc, i) => (
                  <Picker.Item key={i} label={doc} value={doc} />
                ))}
            </Picker>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#e5e5e5",
              borderRadius: 5,
              height: 45,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            <Picker
              style={{
                width: 115,
                height: 45,
                transform: [{ translateY: -5 }],
              }}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label="Year" value="" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2021" value="2021" />
            </Picker>
          </View>
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
        <CheckBox
          style={{
            marginTop: 10,
          }}
          value={HomeDelivery}
          title="Home Delivery Available"
          onChange={() => {
            setHomeDelivery(!HomeDelivery);
          }}
        />
        <CheckBox
          style={{
            marginTop: 5,
          }}
          value={HomeService}
          title="Home Delivery Available"
          onChange={() => {
            setHomeService(!HomeService);
          }}
        />
        <CheckBox
          style={{
            marginTop: 5,
          }}
          value={OnlineSupport}
          title="Home Delivery Available"
          onChange={() => {
            setOnlineSupport(!OnlineSupport);
          }}
        />

        <Button
          style={{
            flexDirection: "row",
            borderWidth: 0,
            width: 100,
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
          title="Add More"
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
                fontSize: 15,
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
              flex:1
            }}
          >
            <Text
              style={{
                fontSize: 15,
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
  const [checked, setChecked] = React.useState(false);
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
        }}
      >
        <Checkbox
          status={value ? "checked" : "unchecked"}
          onPress={() => {
            onChange();
          }}
        />
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
