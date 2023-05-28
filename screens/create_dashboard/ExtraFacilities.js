import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ViewMore from "../../Hooks/ViewMore";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import { icon, styles } from "./BusinessTitle";
import PageChip from "./components/PageChip";
import Extra from "../../assets/Extra.png";
import { SvgXml } from "react-native-svg";
import TextOp from "../Profile/TextOp";
import IconButton from "../../components/IconButton";
import { CheckBox } from "../Seller/Pricing";
import customStyle from "../../assets/stylesheet";
import Input from "../../components/Input";
const { width, height } = Dimensions.get("window");

export default function ExtraFacilities({ navigation, route }) {
  const isFocused = useIsFocused();
  const businessForm=useSelector(state=>state.businessForm)
  const dispatch = useDispatch();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const serviceCategory = route?.params?.serviceCategory;
  const skills = route?.params?.skills;
  const [Service, setService] = React.useState([
    {
      id: 1,
      title: "Home Delivery Available",
      checked: false,
    },
    {
      id: 2,
      title: "Home Service Available",
      checked: false,
    },
    {
      id: 3,
      title: "Online Support Available",
      checked: false,
    },
  ]);
  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [ServiceError, setServiceError] = React.useState();
 
  React.useEffect(() => {
    if(businessForm?.facilities){
        setService(businessForm.facilities)
      }
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
    <View
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PageChip currentPage={3} totalPage={14} />
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 20,
          }}>
          <Image
            style={{
              width: width - 40,
              height: 230,
            }}
            source={Extra}
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
            <Text style={[styles.headLine, { flex: 1 }]}>
              Tips for Extra Facilities
            </Text>
          </View>
          <ViewMore
            view={true}
            style={{
              marginTop: 24,
            }}
            lowHeight={70}
            width={135}
            position={{
              bottom: 0,
            }}
            height={layoutHeight}
            component={
              <View
                onLayout={(e) => setLayoutHeight(e.nativeEvent.layout.height)}
                style={{ width: "100%" }}>
                <TextOp
                  style={{ marginTop: 0 }}
                  text={`Identify Unique Offerings: Think about the additional services or features you can provide to enhance the value you offer to potential clients. Consider what makes your business special and how you can go the extra mile to meet their needs.`}
                  number={"1."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={`Showcase Your Differentiators: Highlight the unique facilities you provide to attract attention and stand out in your category. Whether it's offering a free consultation, 24/7 customer support, or personalized solutions, make sure to emphasize the benefits clients can enjoy by choosing your services.`}
                  number={"2."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={`Be Clear and Concise: When describing your extra facilities, use clear and concise language to convey their value. Focus on the specific advantages they bring and how they can positively impact clients' experiences with your business.`}
                  number={"3."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={`Keep it Relevant: Ensure that the extra facilities you offer are relevant to your skills and align with your overall service offerings. This will help create a cohesive and compelling profile that resonates with potential clients.`}
                  number={"4."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={
                    "Update as Needed: As your business evolves, revisit and update the extra facilities you provide. Stay responsive to market trends and client demands, and adapt your offerings accordingly to maintain a competitive edge."
                  }
                  number={"5."}
                />
              </View>
            }
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginTop: 36,
              }}>
              Extra facilities ( Optional )
            </Text>
            {Array.isArray(Service) &&
              Service.map((doc, i) => (
                <CheckBox
                  key={i}
                  style={{
                    marginTop: 24,
                  }}
                  value={doc.checked}
                  title={doc.title}
                  onChange={() => {
                    let arr = Service;
                    setService(null);
                    arr[i] = {
                      title: doc.title,
                      checked: !doc.checked,
                      id: i + 1,
                    };
                    setService(arr);
                    //setChange(!change);
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
                }}>
                {ServiceError}
              </Text>
            )}

            {Service && Service.length < 24 && (
              <IconButton
                onPress={() => {
                  setButtonVisible(true);
                }}
                style={{
                  flexDirection: "row",
                  borderWidth: 0,
                  width: 100,
                  marginTop: 20,
                }}
                LeftIcon={() => <SvgXml xml={plus} />}
                title={"Add More"}
              />
            )}
          </View>
          <IconButton
            active={true}
            disabled={false}
            onPress={() => {
              //dispatch({ type: "SPECIALITY", playload: skills });
              dispatch({ type: "FACILITIES", playload: Service });
              navigation.navigate("BusinessTitle", {
                serviceCategory: serviceCategory,
                skills: skills,
                facilities:Service?.filter(d=>d?.checked)
              });
            }}
            style={styles.button}
            title={"Continue"}
          />
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={buttonVisible}
        onRequestClose={() => setButtonVisible(false)}>
        <AddCard
          onSelect={(e) => {
            setService((d) => [
              ...d,
              {
                id: d.length,
                title: e,
                checked: true,
              },
            ]);
            setButtonVisible(false);
          }}
          onClose={() => setButtonVisible(false)}
        />
      </Modal>
    </View>
  );
}
const AddCard = ({ onClose, onSelect }) => {
  const [text, setText] = useState();
  const [textError, setTextError] = useState();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <View style={[customStyle.fullBox, { backgroundColor: "#0000001e" }]}>
        <View
          style={[
            {
              backgroundColor: "#ffffff",
              width: width - 40,

              borderRadius: 10,
              padding: 20,
            },
            customStyle.shadow,
          ]}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              textAlign: "center",
            }}>
            Add Feature
          </Text>
          <Input
            error={textError}
            value={text}
            onChange={setText}
            style={[styles.input]}
          />
          <Text style={styles.text}>Max 40 character</Text>
          <View style={{ flexDirection: "row" }}>
            <IconButton
              onPress={() => {
                setTextError();
                if (!text) {
                  setTextError("*Text is required");
                  return;
                }
                if (text && text.split("").length > 40) {
                  setTextError("*Text must be less then 40 character");
                  return;
                }
                if (onSelect) {
                  onSelect(text);
                  setText();
                }
              }}
              style={[
                newStyles.button,
                {
                  backgroundColor: "#4ADE80",
                  color: "#ffffff",
                },
              ]}
              title={"Add"}
            />
            <View style={{ width: 20 }} />
            <IconButton
              onPress={onClose}
              style={newStyles.button}
              title={"Cancel"}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const newStyles = StyleSheet.create({
  button: {
    width: (width - 100) / 2,
    marginTop: 20,
  },
});
const plus = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 9H17M9 17V1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
