import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  Text,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import { icon, styles } from "./EditBusinessTitle";
//import PageChip from "./components/PageChip";
import keyword from "../../assets/keyword.png";
import ViewMore from "../../Hooks/ViewMore";
import TextOp from "./TextOp";
import Input from "../../components/Input";
import IconButton from "../../components/IconButton";
const { width, height } = Dimensions.get("window");

export default function EditKeywords({ navigation, route }) {
  const isFocused = useIsFocused();
  const businessForm = useSelector((state) => state.businessForm);
  const dispatch = useDispatch();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [keywords, setKeyword] = useState(
    businessForm?.keyword ? businessForm.keyword : []
  );
  const [length, setLength] = useState(0);
  const data = route?.params?.data;

  useEffect(() => {
    setLength(keywords.length);
  }, [keywords.length]);

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
    if (data.data) {
      setKeyword(data.data.service.keywords);
    }
  }, [isFocused]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <PageChip currentPage={10} totalPage={14} /> */}
        <View
          style={{
            marginTop: 0,
            paddingHorizontal: 20,
          }}>
          <Image
            style={{
              width: width - 40,
              height: 230,
            }}
            source={keyword}
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
              Tips for Add Keywords Your Profile for Improved Visibility.
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
                <Text style={[styles.spText, { marginTop: 0 }]}>
                  Enhance your profile visibility by adding relevant keywords!
                  Keywords help potential customers find your profile easily
                  when they search for specific services. Here are some
                  guidelines for adding keywords to your profile:
                </Text>

                <TextOp
                  style={{ marginTop: 20 }}
                  text={`Think about the services you offer and the skills you possess. These can be specific services, areas of expertise, or industry-related terms.`}
                  number={"1."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={`Consider the common search terms or phrases that potential customers might use to find businesses like yours.`}
                  number={"2."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={`Include both broad and specific keywords to cover a range of search queries.`}
                  number={"3."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={`Use terms that accurately represent your offerings and reflect your strengths.`}
                  number={"4."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={
                    "Avoid excessive or irrelevant keywords that may confuse or mislead users."
                  }
                  number={"5."}
                />
                <TextOp
                  style={{ marginTop: 5 }}
                  text={
                    "Keep your keywords up to date and relevant as your business evolves. Remember, using the right keywords will increase your chances of being discovered by potential customers."
                  }
                  number={"6."}
                />
              </View>
            }
          />
          <Text style={[styles.headLine, { marginTop: 36 }]}>Add Keyword</Text>

          {keywords && keywords.length < 25 && (
            <AddBox
              onChange={(e) => {
                try {
                  setKeyword((d) => [...d, e]);
                } catch (e) {
                  console.log(e.message);
                }
              }}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text style={styles.text}>Max 25 character </Text>
            <Text style={styles.text}>Max 25 Tag </Text>
          </View>
          {keywords && keywords.length > 0 && (
            <View
              style={{
                marginTop: 32,
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: -4,
              }}>
              {keywords.map((doc, i) => (
                <BT
                  onDelete={() => {
                    setKeyword((d) => d.filter((c, j) => i != j));
                  }}
                  key={i}
                  title={doc}
                />
              ))}
            </View>
          )}
          <Text style={[styles.text, { marginTop: 32 }]}>
            Example : Bridge Builder, Business Plans, Graphic design, Events
            Items, Bike repair, photographer, Baby Care, Business lawyers,
            Cooking Lessons, Dj Mixing{" "}
          </Text>
          <IconButton
            active={length > 0 ? true : false}
            disabled={length > 0 ? false : true}
            onPress={() => {
              dispatch({ type: "KEYWORD", playload: keywords });
              navigation?.navigate("EditAbout", {
                data: {
                  serviceCenterName: data?.serviceCenterName,
                  providerName: data?.providerName,
                  gender: data?.gender,
                  worker: data?.numberOfTeam,
                  keywords: keywords,
                  position: data?.position,
                  data: data?.data,
                },
              });
            }}
            style={styles.button}
            title={"Continue"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const AddBox = ({ onChange, onWrite, value }) => {
  const [text, setText] = useState(value);

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: "row",
        height: 45,
        paddingLeft: 10,
        alignItems: "center",
        borderColor: "#A3A3A3",
        marginTop: 24,
      }}>
      <TextInput
        returnKeyType="done"
        onEndEditing={() => {
          if (!text) {
            return;
          }
          if (onChange) {
            onChange(text);
            setText();
          }
        }}
        value={text}
        onChangeText={(e) => {
          if (e?.split("")?.length > 25) {
            return;
          }
          setText(e);
        }}
        style={{
          flex: 1,
        }}
        placeholder="Type Skill"
      />
      <Pressable
        onPress={() => {
          if (!text) {
            return;
          }
          if (onChange) {
            onChange(text);
            setText();
          }
        }}
        style={{
          width: 73,
          backgroundColor: text ? "#4ADE80" : "#E4E4E4",
          height: "100%",
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          borderLeftWidth: 1,
          borderLeftColor: "#A3A3A3",
          flexDirection: "row",
        }}>
        <SvgXml xml={addIcon} />
        <Text
          style={{
            fontSize: 14,
            marginLeft: 5,
            color: text ? "#ffffff" : "#767676",
          }}>
          Add
        </Text>
      </Pressable>
    </View>
  );
};
const BT = ({ title, onDelete }) => {
  return (
    <View
      style={{
        borderColor: "#E6E6E6",
        borderWidth: 0,
        borderRadius: 4,
        padding: 8,
        margin: 4,
        backgroundColor: "#4ADE80",
      }}>
      <SvgXml
        onPress={onDelete}
        style={{
          position: "absolute",
          right: -9,
          top: -9,
        }}
        xml={dateIcon}
      />
      <Text style={{ color: "white" }}>{title}</Text>
    </View>
  );
};
const dateIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 12L8 8M11.495 8.505L12 8M8 12L9.905 10.095M3 11C3.21 12.46 3.875 13.875 5 15C7.76 17.76 12.24 17.76 15 15C17.76 12.24 17.76 7.76 15 5C12.24 2.24 7.76 2.24 5 5C4.285 5.715 3.75 6.55 3.41 7.44" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
const addIcon = `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.496288 0.185907C0.000516716 0.486075 -0.153827 1.3169 0.173569 1.91187C0.25308 2.05659 0.379361 2.1906 0.486934 2.25492C0.664663 2.3514 0.851747 2.35676 6.42216 2.37284C10.4164 2.38356 12.2264 2.37284 12.348 2.32996C12.5772 2.25492 12.7877 2.04587 12.9046 1.77787C12.9841 1.60098 12.9981 1.48842 12.9841 1.15073C12.9654 0.646879 12.8298 0.368152 12.5164 0.191268L12.3106 0.0787048H6.48764C0.809653 0.084065 0.664663 0.084065 0.496288 0.185907Z" fill="white"/>
<path d="M0.809517 5.78728C0.786131 5.798 0.706621 5.81944 0.636464 5.83552C0.472766 5.8784 0.196818 6.15177 0.0985991 6.37153C0.0144115 6.54842 -0.00897399 7.13267 0.0518282 7.3846C0.0705365 7.465 0.164078 7.6258 0.252943 7.74373C0.566308 8.14038 0.220204 8.11894 6.51089 8.11894C10.4256 8.11894 12.1842 8.10286 12.3152 8.05998C12.7642 7.92061 12.9887 7.53468 12.9933 6.92363C12.9933 6.33937 12.7595 5.9588 12.3152 5.81944C12.1842 5.77656 10.435 5.76048 6.49218 5.76584C3.39127 5.76584 0.837579 5.77656 0.809517 5.78728Z" fill="white"/>
<path d="M15.4628 7.04679C15.2523 7.17543 15.0793 7.43272 15.0091 7.7168C14.981 7.84009 14.9577 8.43506 14.9577 9.14796V10.3701H13.8118C12.7547 10.3701 12.6472 10.3808 12.4788 10.4773C11.9783 10.7721 11.8146 11.6029 12.1467 12.2032C12.3806 12.6213 12.4648 12.6481 13.7977 12.6642L14.953 12.6803L14.967 14.0096L14.981 15.3389L15.1214 15.5962C15.3178 15.9553 15.5376 16.0786 15.9866 16.0786C16.4356 16.0786 16.6554 15.9553 16.8519 15.5962L16.9922 15.3389L17.0062 14.0096L17.0203 12.6803L18.1755 12.6642C19.5085 12.6481 19.5927 12.6213 19.8265 12.2032C20.1633 11.5975 19.9902 10.7399 19.4757 10.4719C19.3073 10.3862 19.1577 10.3701 18.1521 10.3701H17.0156V9.14796C17.0156 8.43506 16.9922 7.84009 16.9641 7.7168C16.894 7.41664 16.7116 7.15935 16.4824 7.04143C16.2158 6.90206 15.6966 6.90742 15.4628 7.04679Z" fill="white"/>
<path d="M0.622411 11.5654C0.365171 11.6833 0.276306 11.7637 0.154702 11.9942C-0.158663 12.6106 0.0237435 13.436 0.524192 13.6987C0.706599 13.7952 0.907714 13.8005 4.51843 13.8005C8.16656 13.8005 8.32558 13.7952 8.49395 13.6987C8.84474 13.4896 9.01779 13.1412 9.01779 12.6374C9.01311 12.096 8.76523 11.6779 8.37235 11.5493C8.11511 11.4689 0.809495 11.485 0.622411 11.5654Z" fill="white"/>
</svg>
`;
