import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Animated from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { DistrictList } from "../../Data/district";

export default function AddressPicker({ value, onChange,onDistrict,onDivision  }) {
  const [openValue,setOpenValue]=useState()
  return (
    <View
      style={{
        marginTop: 12,
      }}>
      {DistrictList.map((doc, i) => (
        <Card openValue={openValue} onDistrict={onDistrict} value={value} onChange={e=>{
          onChange(e)
          if(onDivision){
            onDivision(e?doc.title:undefined)
          }
          setOpenValue(doc.title)
        }} key={i} data={doc} />
      ))}
    </View>
  );
}
const Card = ({ data, value, onChange ,openValue,onDistrict}) => {
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    if(openValue!=data.title){
      setOpen(false)
    }
  },[openValue])
  return (
    <View>
      <Pressable
        onPress={() => {
          setOpen((t) => !t);
          if(value==data.title){
            onChange()
            return
          }
          
          onChange(data.title)
        }}
        style={styles.container}>
        <Text style={[styles.text,value&&value==data?.title?styles.active:null]}>{data?.title}</Text>
        {value && value == data?.title && (
          <SvgXml xml={right} />
        )}
      </Pressable>
      {open && (
        <Animated.View>
          {data && data.data.map((doc, i) => <SmallCard value={value} onChange={e=>{
            onChange(e)
            if(onDistrict){
              onDistrict(e)
            }
          }} key={i} title={doc} />)}
        </Animated.View>
      )}
    </View>
  );
};
const SmallCard = ({ title ,value,onChange}) => {
  return (
    <Pressable onPress={()=>{
        if(value&&value==title){
            onChange("")
            return
        }
        onChange(title)
    }} style={[styles.container, { paddingLeft: 24 }]}>
      <Text style={[styles.text, { color: "#484848", fontSize: 14 },value&&value==title?styles.active:null]}>
        {title}
      </Text>
      {value && value == title && (
          <SvgXml xml={right} />
        )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1EFEF",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
  },
  active: {
    color: "#4ADE80",
  },
});
const right = `<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.725 0.723741C14.055 0.384991 14.5413 0.16374 15.0188 0.29249C15.5688 0.40749 15.9525 0.926241 16 1.47249V1.53499C15.9688 1.94374 15.7487 2.30374 15.46 2.58249C12.5825 5.45499 9.7075 8.32874 6.835 11.2037C6.54625 11.4925 6.18625 11.7625 5.75625 11.7437C5.325 11.76 4.9625 11.4912 4.67375 11.2012C3.30125 9.82624 1.9275 8.45249 0.55125 7.08249C0.2625 6.80374 0.0375 6.44749 0 6.03999V5.97874C0.03875 5.42249 0.42875 4.89374 0.9875 4.77999C1.46625 4.65124 1.95125 4.87874 2.28125 5.21874C3.44375 6.37249 4.59625 7.53624 5.75875 8.68999C8.41625 6.03749 11.0662 3.37749 13.725 0.723741Z" fill="#4ADE80"/>
</svg>
`;
