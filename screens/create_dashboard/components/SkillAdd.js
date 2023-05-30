import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { getCategorySkills, getSkillSuggestion } from "../../../Class/service";
//import { AllData } from "../../../Data/AllData";
import ViewMore from "../../../Hooks/ViewMore";
import { styles } from "../BusinessTitle";
import CommonHeader from "../CommonHeader";
import OptionCart, { Cart } from "./OptionCart";
const { width, height } = Dimensions.get("window");

export default function SkillAdd({ onClose, onSelect, category,categoryName,oldSkills }) {
  const [skills, setSkills] = useState(oldSkills?oldSkills:[]);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [text, setText] = useState();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [AllCategories, setAllCategories] = useState();
  const [All,setAll]=useState([])
  const [AllData,setAllData]=useState([])
 

  useEffect(() => {
    if (text && text?.split("")?.length > 1) {
      const filteredCategory =
      text === ""
        ? AllData
        : AllData.filter((cat) =>
            cat.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .startsWith(text.toLowerCase().replace(/\s+/g, ""))
          );
      setData(filteredCategory);
      //console.log(arr[0].title)
    } else {
      setData([]);
    }
  }, [text]);
  useEffect(() => {
   
    getCategorySkills(user.token, category).then((res) => {
      setAll(res.data.suggestions);
      setAllCategories(res.data.suggestions)
    });
   
    getSkillSuggestion(user.token,categoryName).then(res=>{
      setAllData(res.data.skills)
      
    })
    
  }, [categoryName,category]);
  
  useEffect(() => {
    if (All&&skills.length>0) {
      try {
        let arr=[]
        All.map((doc)=>{
          let a = skills.filter((d) => d == doc);
          if (a?.length == 0) {
            arr.push(doc)
          }
        })
        setAllCategories(arr)
      } catch (e) {
        console.log(e.message);
      }
    }else{
      setAllCategories(All)
    }
  }, [skills?.length,All?.length]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}>
      <Heder
        onSelect={() => {
          onClose ? onClose(false) : null;
          onSelect ? onSelect(skills) : null;
        }}
        onBack={() => onClose(false)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
        }}>
        {AllCategories&&AllCategories?.length>0 && (
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
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    lineHeight: 24,
                    marginRight: 15,
                  }}>
                  Suggest Skill{""}
                </Text>
                {AllCategories.map((doc, i) => (
                  <Text onPress={()=>{
                    try {
                      setSkills((d) => [...d, doc]);
                    } catch (e) {
                      console.log(e.message);
                    }
                  }}
                    key={i}
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      lineHeight: 24,
                      textDecorationLine: "underline",
                      marginRight: 15,
                    }}>
                    {doc}
                  </Text>
                ))}
              </View>
            }
          />
        )}
        <View>
          {skills && skills.length < 50 && (
            <AddBox
              onWrite={setText}
              value={text}
              onChange={(e) => {
                try {
                  setSkills((d) => [...d, e]);
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
              marginTop: 12,
            }}>
            <Text style={styles.text}>Max 25 characters </Text>
            <Text style={styles.text}>Max 50 skill </Text>
          </View>
          {skills && skills.length > 0 && (
            <View
              style={{
                marginTop: 24,
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: -4,
              }}>
              {skills.map((doc, i) => (
                <BT
                  onDelete={() => {
                    setSkills((d) => d.filter((c, j) => i != j));
                  }}
                  key={i}
                  title={doc}
                />
              ))}
            </View>
          )}
          <View
            style={{
              position: "absolute",
              width: width - 40,
              top: 70,
              zIndex: 300,
              backgroundColor: "#ffffff",
            }}>
            <OptionCart
              Child={(data) => (
                <Cart
                  onPress={() => {
                    setText(data?.doc?.name);
                    setTimeout(() => {
                      setData([]);
                    }, 100);
                  }}
                  title={data?.doc?.name}
                  key={data?.index}
                  index={data?.index}
                />
              )}
              data={data}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const Heder = ({ onBack, onSelect }) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: inset?.top,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Pressable onPress={onBack}>
        <SvgXml xml={back} />
      </Pressable>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "500",
          color: "#1A1A1A",
        }}>
        Add Skill
      </Text>
      <Text
        onPress={onSelect}
        style={{
          color: "#4ADE80",
          fontSize: 20,
          fontWeight: "400",
        }}>
        Done
      </Text>
    </View>
  );
};
const back = `<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 16.5L1.5 9L9 1.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const AddBox = ({ onChange, onWrite, value }) => {
  const [text, setText] = useState(value);
  useEffect(() => {
    if (onWrite) {
      onWrite(text);
    }
  }, [text]);
  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);

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
        returnKeyLabel="add"
        onSubmitEditing={() => {
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
        }}>
        <Text
          style={{
            fontSize: 14,

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
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        margin: 4,
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
      <Text>{title}</Text>
    </View>
  );
};
const dateIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12L8 8M11.495 8.505L12 8M8 12L9.905 10.095M3 11C3.21 12.46 3.875 13.875 5 15C7.76 17.76 12.24 17.76 15 15C17.76 12.24 17.76 7.76 15 5C12.24 2.24 7.76 2.24 5 5C4.285 5.715 3.75 6.55 3.41 7.44" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
