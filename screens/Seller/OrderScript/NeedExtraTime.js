import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Alert, Modal } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { convertDate, dateConverter, dateDifference } from "../../../action";
import IconButton from "../../../components/IconButton";
import ViewMore from "../../../Hooks/ViewMore";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import { styles } from "../../create_dashboard/BusinessTitle";
import { requestForTime } from "../../../Class/service";
import { socket } from "../../../Class/socket";
import customStyle from "../../../assets/stylesheet";
import ActivityLoader from "../../../components/ActivityLoader";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function NeedExtraTime({ navigation, route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [dates, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const data = route?.params?.data;
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);

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

  const confirm = async () => {
    setLoader(true);
    //console.log(data.service)
    try {
      await requestForTime(user.token, data.id, dateConverter(dates));
      socket.emit("updateOrder", {
        receiverId: data.user.id,
        order: data,
      });
      socket.emit("updateOrder", {
        receiverId: user.user.id,
        order: data,
      });
      setLoader(false);
      navigation.goBack();
    } catch (err) {
      setLoader(false);
      Alert.alert(err.message);
    }
  };
  if (loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <View>
          <IconButton
            onPress={() => setVisible(true)}
            style={{
              marginTop: 32,
              height: 40,
              color: "#767676",
            }}
            Icon={() => <SvgXml xml={calender} />}
            title={dates ? convertDate(dates) : "dd/mm/yy"}
          />
          <Modal transparent={true} visible={visible}>
            <DateTimePickerModal
              date={new Date()}
              isVisible={true}
              themeVariant="light"
              mode="date"
              onConfirm={(e) => {
                if (dateDifference(data.deliveryDateTo, e) > 0) {
                  setDate(e);
                  setVisible(false);
                } else {
                  setVisible(false);
                  Alert.alert(
                    "Opps!",
                    "You need to select upcoming date from delivery"
                  );
                }
              }}
              onCancel={() => {
                setVisible(false);
              }}
            />
          </Modal>
        </View>
        <IconButton
          onPress={confirm}
          active={dates ? true : false}
          disabled={dates ? false : true}
          style={{
            marginTop: 32,
            height: 44,
          }}
          title={"Send Request"}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 36,
          }}>
          <SvgXml
            style={{
              marginRight: 8,
            }}
            xml={light}
          />
          <Text style={[styles.headLine, { flex: 1 }]}>
            Instructions for Requesting Extra Delivery Time as a Seller on Duty
          </Text>
        </View>
        <ViewMore
          style={{
            marginTop: 24,
          }}
          width={"37%"}
          height={layoutHeight}
          component={
            <Text
              onLayout={(e) => {
                setLayoutHeight(e.nativeEvent.layout.height);
              }}
              style={[styles.spText, { marginTop: 0 }]}>
              If you are unable to deliver your order within the specified
              delivery time, you have the option to request for extra time from
              the buyer. However, please keep in mind that if the buyer does not
              accept your extra delivery time request, and you are unable to
              deliver within the present delivery time, the order will be marked
              as failed and payment will be refunded to the buyer. Before
              sending a request for extra time, we recommend that you
              communicate with the buyer to discuss the situation and see if a
              mutually agreed upon solution can be reached. It is important to
              ensure that you can realistically meet the new delivery deadline
              before making a request for extra time. Thank you for your
              cooperation and understanding in this matter.
            </Text>
          }
        />

        <View style={{ height: 32 }} />
      </View>
    </ScrollView>
  );
}
const calender = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.91667 1V2.75M12.0833 1V2.75M1 13.25V4.5C1 4.03587 1.18437 3.59075 1.51256 3.26256C1.84075 2.93437 2.28587 2.75 2.75 2.75H13.25C13.7141 2.75 14.1592 2.93437 14.4874 3.26256C14.8156 3.59075 15 4.03587 15 4.5V13.25M1 13.25C1 13.7141 1.18437 14.1592 1.51256 14.4874C1.84075 14.8156 2.28587 15 2.75 15H13.25C13.7141 15 14.1592 14.8156 14.4874 14.4874C14.8156 14.1592 15 13.7141 15 13.25M1 13.25V7.41667C1 6.95254 1.18437 6.50742 1.51256 6.17923C1.84075 5.85104 2.28587 5.66667 2.75 5.66667H13.25C13.7141 5.66667 14.1592 5.85104 14.4874 6.17923C14.8156 6.50742 15 6.95254 15 7.41667V13.25M8 8.58333H8.00622V8.58956H8V8.58333ZM8 10.3333H8.00622V10.3396H8V10.3333ZM8 12.0833H8.00622V12.0896H8V12.0833ZM6.25 10.3333H6.25622V10.3396H6.25V10.3333ZM6.25 12.0833H6.25622V12.0896H6.25V12.0833ZM4.5 10.3333H4.50622V10.3396H4.5V10.3333ZM4.5 12.0833H4.50622V12.0896H4.5V12.0833ZM9.75 8.58333H9.75622V8.58956H9.75V8.58333ZM9.75 10.3333H9.75622V10.3396H9.75V10.3333ZM9.75 12.0833H9.75622V12.0896H9.75V12.0833ZM11.5 8.58333H11.5062V8.58956H11.5V8.58333ZM11.5 10.3333H11.5062V10.3396H11.5V10.3333Z" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const light = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="24" height="24" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_5568_43284" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_5568_43284" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;
const newStyles = StyleSheet.create({
  mt32: {
    marginTop: 32,
  },
});
