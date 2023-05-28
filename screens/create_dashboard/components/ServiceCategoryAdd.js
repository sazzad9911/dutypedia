import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { getCategory } from "../../../Class/service";
import IconButton from "../../../components/IconButton";
import Input from "../../../components/Input";
import { AllData } from "../../../Data/AllData";
import { styles } from "../BusinessTitle";
import CommonHeader from "../CommonHeader";
import OptionCart, { Cart } from "./OptionCart";
const { width, height } = Dimensions.get("window");

export default function ServiceCategoryAdd({ onClose,onSelect }) {
  const [text, setText] = useState();
  const [data, setData] = useState();
  const user=useSelector(state=>state.user)
  const [key,setKey]=useState()
  const [categories,setCategories]=useState()

  useEffect(() => {
    if (text&&text?.split("")?.length>1&&categories) {
      const filteredCategory =
      text === ""
        ? categories
        : categories.filter((cat) =>
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
  }, [text,categories]);
  useEffect(()=>{
    getCategory(user.token).then(res=>{
      setCategories(res.data.categories)
    })
  },[])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={20}>
      <CommonHeader onPress={() => onClose(false)} title={"Service Category"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}>
        <Text style={[styles.headLine, { lineHeight: 32, marginTop: 24 }]}>
          Which service category best describes your business?
        </Text>
        <View>
          <Input returnKeyType={"done"} onSubmitEditing={()=>{
            if(onSelect){
              onSelect(text,key?key:{
                name:text
              })
          }
          if(onClose){
              onClose(false)
          }
          }}
            value={text}
            onChange={e=>{
                if(e?.split("").length>50){
                    return
                }
                setText(e)
            }}
            style={[styles.input]}
            placeholder={"Type here"}
          />
          <Text style={styles.text}>Max 50 characters </Text>
          <View
            style={{
              position: "absolute",
              width: width - 40,
              top:70,
              zIndex:100,
              backgroundColor:"#ffffff"
            }}>
            <OptionCart
              Child={(data) => (
                <Cart
                  onPress={() => {
                    setText(data?.doc?.name);
                    setKey(data?.doc)
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
        <IconButton onPress={()=>{
            if(onSelect){
                onSelect(text,key?key:{
                  name:key,
                })
            }
            if(onClose){
                onClose(false)
            }
            
        }} active={text?true:false}
        disabled={text?false:true}
          style={[
            styles.button,
            {
              marginTop: "100%",
            },
          ]}
          title={"Done"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
