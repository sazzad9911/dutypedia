import React from "react";
import { ScrollView, View,Text, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import IconButton from "../../components/IconButton";
import SubHeader from "../../components/SubHeader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { dateConverter, dateDifference } from "../../action";
import ReadMoreText from "rn-read-more-text";
import { styles } from "../create_dashboard/BusinessTitle";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChooseDateOrder({ navigation, route }) {
  const [FromVisible, setFromVisible] = React.useState(false);
  const [ToVisible, setToVisible] = React.useState(false);
  const [From, setFrom] = React.useState();
  const [To, setTo] = React.useState();
  const [FromDateError, setFromDateError] = React.useState();
  const [ToDateError, setToDateError] = React.useState();
  const [textRef,setTextRef] = React.useState();
  const content=`We offer buyers the option to select a delivery date that is convenient for them, with the flexibility to choose a delivery window that suits their schedule. However, we also want to remind buyers to communicate with the seller about their availability to ensure a successful delivery. Before selecting a delivery date, we recommend that buyers reach out to the seller to confirm their ability to deliver during the chosen time frame. This will help avoid any potential conflicts or delays in the delivery process. We strive to provide the best possible service to our buyers and sellers, and clear communication is key to ensuring a positive experience for all parties involved. Thank you for choosing our platform for your needs.If you have any questions or concerns regarding our delivery policy, please refer to our Delivery Policy section`
  const params=route?.params;
  const handleManualToggle = () =>{
    if(textRef){
      textRef.toggle()
    }
  };
  const inset=useSafeAreaInsets()
  return (
    <View style={{ flex: 1 }}>
      <SubHeader
        style={{
          marginTop: inset?.top,
        }}
        navigation={navigation}
        title={"Chose Delivery Date"}
      />
      <ScrollView contentContainerStyle={{ backgroundColor: "#ffffff" }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 20,
            alignItems: "flex-start",
          }}>
          <View style={{ flex: 1 }}>
            <IconButton
              Icon={() => <SvgXml xml={calenderNew} />}
              onPress={() => {
                setFromVisible(true);
              }}
              style={{
                color: "#767676",
                borderRadius: 4,
                borderColor: "#D1D1D1",
                height: 40,
              }}
              title={From ? From : "dd/mm/yyyy"}
            />
            {FromDateError && (
              <Text style={{ color: "red", marginTop: 2 }}>
                {FromDateError}
              </Text>
            )}
            <DateTimePickerModal
              date={new Date()}
              isVisible={FromVisible}
              themeVariant="light"
              mode="date"
              onConfirm={(date) => {
                let newDate = dateConverter(new Date());
                let oldDate = dateConverter(date);
                if (dateDifference(newDate, oldDate) >= 0) {
                  setFromDateError(null);
                  setFrom(dateConverter(date));
                  setFromVisible(false);
                } else {
                  setFromDateError("Please select current and current date");
                  setFromVisible(false);
                }
              }}
              onCancel={() => setFromVisible(false)}
            />
          </View>
          <Text
            style={{
              marginHorizontal: 15,
              marginTop: 11,
              color: "#000000",
              fontSize: 14,
            }}>
            T0
          </Text>
          <View style={{ flex: 1 }}>
            <IconButton
              Icon={() => <SvgXml xml={calenderNew} />}
              onPress={() => {
                setToVisible(true);
              }}
              style={{
                color: "#767676",
                borderRadius: 4,
                borderColor: "#D1D1D1",
                height: 40,
              }}
              title={To ? To : "dd/mm/yyyy"}
            />
            {ToDateError && (
              <Text style={{ color: "red", marginTop: 2 }}>{ToDateError}</Text>
            )}
            <DateTimePickerModal
              date={new Date()}
              isVisible={ToVisible}
              mode="date"
              themeVariant="light"
              onConfirm={(date) => {
                let newDate = dateConverter(new Date(From));
                let oldDate = dateConverter(date);
                if (dateDifference(newDate, oldDate) >= 0) {
                  setToDateError(null);
                  setTo(dateConverter(date));
                  setToVisible(false);
                } else {
                  setToDateError("Please select current and current date");
                  setToVisible(false);
                }
              }}
              onCancel={() => setToVisible(false)}
            />
          </View>
        </View>
        <IconButton
          onPress={() => {
            params?.setFrom(From)
            params?.setTo(To)
            navigation?.goBack()
          }}
          disabled={From && To ? false : true}
          active={From && To ? true : false}
          style={{
            marginHorizontal: 20,
            marginTop: 12,
          }}
          title={"Confirm"}
        />
        <View
          style={{
            marginHorizontal: 20,
            paddingBottom: 40,
          }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 36,
            }}>
            <SvgXml
              style={{
                marginRight: 8,
              }}
              xml={icon}
            />
            <Text style={[styles.headLine, { flex: 1 }]}>
              Important Delivery Instructions for Buyers on our Platform
            </Text>
          </View>
          
          <Pressable style={{ marginTop: 24 }} onPress={handleManualToggle}>
            <ReadMoreText
              ref={(e) => setTextRef(e)}
              style={[styles.spText, { marginTop: 0 }]}
              limitLines={3}
              //renderFooter={renderFooter}
            >
              {`${content}`}
            </ReadMoreText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
const calenderNew = `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16667 1V2.75M12.3333 1V2.75M1.25 13.25V4.5C1.25 4.03587 1.43437 3.59075 1.76256 3.26256C2.09075 2.93437 2.53587 2.75 3 2.75H13.5C13.9641 2.75 14.4092 2.93437 14.7374 3.26256C15.0656 3.59075 15.25 4.03587 15.25 4.5V13.25M1.25 13.25C1.25 13.7141 1.43437 14.1592 1.76256 14.4874C2.09075 14.8156 2.53587 15 3 15H13.5C13.9641 15 14.4092 14.8156 14.7374 14.4874C15.0656 14.1592 15.25 13.7141 15.25 13.25M1.25 13.25V7.41667C1.25 6.95254 1.43437 6.50742 1.76256 6.17923C2.09075 5.85104 2.53587 5.66667 3 5.66667H13.5C13.9641 5.66667 14.4092 5.85104 14.7374 6.17923C15.0656 6.50742 15.25 6.95254 15.25 7.41667V13.25M8.25 8.58333H8.25622V8.58956H8.25V8.58333ZM8.25 10.3333H8.25622V10.3396H8.25V10.3333ZM8.25 12.0833H8.25622V12.0896H8.25V12.0833ZM6.5 10.3333H6.50622V10.3396H6.5V10.3333ZM6.5 12.0833H6.50622V12.0896H6.5V12.0833ZM4.75 10.3333H4.75622V10.3396H4.75V10.3333ZM4.75 12.0833H4.75622V12.0896H4.75V12.0833ZM10 8.58333H10.0062V8.58956H10V8.58333ZM10 10.3333H10.0062V10.3396H10V10.3333ZM10 12.0833H10.0062V12.0896H10V12.0833ZM11.75 8.58333H11.7562V8.58956H11.75V8.58333ZM11.75 10.3333H11.7562V10.3396H11.75V10.3333Z" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="24" height="24" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3642_71276" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_3642_71276" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;