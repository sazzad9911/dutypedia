import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import TextArea from "./../../components/TextArea";
import { useSelector, useDispatch } from "react-redux";
import { Color } from "../../assets/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "./../../components/Button";
import {
  dateConverter,
  dateDifference,
  convertDate,
  fileFromURL,
} from "../../action";
const { width, height } = Dimensions.get("window");

const FixedOffers = () => {
  const [To, setTo] = React.useState();
  const [From, setFrom] = React.useState();
  const [FromVisible, setFromVisible] = React.useState(false);
  const [FromDateError, setFromDateError] = React.useState();
  const [ToDateError, setToDateError] = React.useState();
  const [ToVisible, setToVisible] = React.useState(false);
  const [Description, setDescription] = React.useState();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <TextArea
          value={Description}
          onChange={(e) => {
            setDescription(e);
          }}
          placeholder="Description (Optional)"
        />
        <Text
          style={{
            fontSize: 20,
            color: textColor,
            fontFamily: "Poppins-Medium",
            marginVertical: 20,
          }}
        >
          Price 130৳
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            backgroundColor: "#e5e5e5",
            padding: 5,
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Poppins-Medium",
            }}
          >
            Delivery Time
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => {
                setFromVisible(true);
              }}
              style={{
                color: textColor,
                borderRadius: 5,
              }}
              title={From ? From : "Select Date"}
            />
            {FromDateError && (
              <Text style={{ color: "red", marginTop: 2 }}>
                {FromDateError}
              </Text>
            )}
            <DateTimePickerModal
              date={new Date()}
              isVisible={FromVisible}
              mode="date"
              onConfirm={(date) => {
                let newDate = dateConverter(new Date());
                let oldDate = dateConverter(date);
                if (dateDifference(newDate, oldDate) >= 0) {
                  setFromDateError(null);
                  setFrom(dateConverter(date));
                  setFromVisible(false);
                } else {
                  setFromDateError("Please select upcoming date");
                  setFromVisible(false);
                }
              }}
              onCancel={() => setFromVisible(false)}
            />
          </View>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 8,
              color: textColor,
            }}
          >
            TO
          </Text>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => {
                setToVisible(true);
              }}
              style={{
                color: textColor,
                borderRadius: 5,
              }}
              title={To ? To : "Select Date"}
            />
            {ToDateError && (
              <Text style={{ color: "red", marginTop: 2 }}>{ToDateError}</Text>
            )}
            <DateTimePickerModal
              date={new Date()}
              isVisible={ToVisible}
              mode="date"
              onConfirm={(date) => {
                let newDate = dateConverter(new Date(From));
                let oldDate = dateConverter(date);
                if (dateDifference(newDate, oldDate) >= 0) {
                  setToDateError(null);
                  setTo(dateConverter(date));
                  setToVisible(false);
                } else {
                  setToDateError("Please select upcoming date");
                  setToVisible(false);
                }
              }}
              onCancel={() => setToVisible(false)}
            />
          </View>
        </View>
        <Button
          style={{
            backgroundColor: "#E2B529",
            borderRadius: 5,
            marginTop: "100%",
          }}
          title="Send Request"
        />
      </View>
    </ScrollView>
  );
};
export default FixedOffers;
