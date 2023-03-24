import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch } from "react-redux";
import IconButton from "../../../components/IconButton";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";

export default function ThirdStepVerification({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isFocused) {
     // dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
     // dispatch(setHideBottomBar(true));
    }, 50);
  }, [isFocused]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginHorizontal: 28,
          marginVertical: 32,
        }}>
        <Text style={styles.headLine}>Identity Verification*</Text>
        <Text style={[styles.text, { marginTop: 28 }]}>
          Upload{" "}
          <Text style={{ color: "#7566FF" }}>
            Birth certificate/ Passport/NID/Driving License
          </Text>
        </Text>
        <Text style={[styles.text, { color: "#EC2700", marginTop: 20 }]}>
          At least one document is required
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
          <IconButton style={[styles.smButton]} title={"Choose file"} />
          <Text style={[styles.small, { marginLeft: 12 }]}>No file chosen</Text>
        </View>
        <Text style={[styles.exSmall, { marginTop: 12 }]}>
          Per file size limit (Maximum 2 MB)
        </Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}>
          <SvgXml xml={plus} />
          <Text style={[styles.small, { marginLeft: 8 }]}>Add more file</Text>
        </Pressable>
        <View style={styles.step} />
        <Text style={[styles.headLine]}>Address verification</Text>
        <Text style={[styles.text, { marginTop: 28 }]}>
          Upload{" "}
          <Text style={{ color: "#7566FF" }}>
          Bank statement or any utility bill like Gas bill/Water bill/ Current bill
          </Text>
        </Text>
        <Text style={[styles.text,{color:"#EC2700"}]}>*note <Text style={{color:"#000000"}}>(Document address and input address must be match)</Text></Text>
        <Text style={[styles.text, { color: "#EC2700", marginTop: 20 }]}>
          At least one document is required
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
          <IconButton style={[styles.smButton]} title={"Choose file"} />
          <Text style={[styles.small, { marginLeft: 12 }]}>No file chosen</Text>
        </View>
        <Text style={[styles.exSmall, { marginTop: 12 }]}>
          Per file size limit (Maximum 2 MB)
        </Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}>
          <SvgXml xml={plus} />
          <Text style={[styles.small, { marginLeft: 8 }]}>Add more file</Text>
        </Pressable>
        <IconButton onPress={()=>{
            navigation.navigate("ConfirmationScreen")
        }} style={styles.button} title={"confirm"} />
      </View>
    </ScrollView>
  );
}
const plus = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" rx="10" fill="#4CD964"/>
<path d="M10 4V16M16 10H4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const styles = StyleSheet.create({
  step: {
    backgroundColor: "#E6E6E6",
    marginVertical: 32,
    height: 1,
  },
  headLine: {
    fontSize: 20,
    fontWeight: "400",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 23,
  },
  small: {
    fontSize: 14,
    fontWeight: "400",
  },
  exSmall: {
    fontSize: 12,
    fontWeight: "400",
  },
  smButton: {
    borderColor: "#484848",
    height: 32,
    width: 112,
  },
  button:{
    height:44,
    backgroundColor:"#4ADE80",
    marginVertical:32,
    color:"white"
  }
});
