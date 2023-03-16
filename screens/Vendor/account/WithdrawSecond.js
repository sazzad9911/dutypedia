import React,{useState} from "react";
import { ScrollView, View, StyleSheet, Text, Linking, Alert } from "react-native";
import IconButton from "../../../components/IconButton";
import Input from "../../../components/Input";
import { CheckBox } from "../../Seller/Pricing";

export default function WithdrawSecond({ navigation }) {
  const [amount,setAmount]=useState()
  const [check,setCheck]=useState(false)
  const [amountError,setAmountError]=useState()
  const [checkError,setCheckError]=useState()

  const save=()=>{
    setAmountError()
    setCheckError()
    if(!amount){
      setAmountError("*Amount is required")
      return
    }
    if(amount<5000){
      setAmountError("*The requested amount must be equal to or less than the available amount.")
      return
    }
    if(!check){
      Alert.alert("","Accept terms and conditions")
      return
    }
    navigation.navigate("WithdrawFinal")
  }
  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <Text style={[styles.gap1, styles.smallText]}>
          Available for withdraw <Text style={{
            fontWeight:"500"
          }}>5000</Text>৳
        </Text>
        <Text style={[styles.gap1]}>Enter amount</Text>
        <Input error={amountError} value={amount}
        onChange={setAmount}
          placeholder={"0.00"}
          keyboardType={"number-pad"}
          style={styles.input}
        />
        <View style={{
          flexDirection:"row",
          marginVertical:20
        }}>
          <CheckBox value={check} onChange={()=>setCheck(v=>(!v))} />
          <Text style={styles.extraSmall}>I accept all the <Text onPress={()=>{
            Linking.openURL("https://duty.com.bd")
          }} style={{
            textDecorationLine:"underline",
            color:"#7566FF"
          }}>terms and conditions</Text> of the duty.</Text>
        </View>
        <IconButton active={amount&&check?true:false} onPress={()=>{
         save()
        }} title={"Send withdraw request"}/>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal: 0,
    marginTop: 8,
  },
  largeFont: {
    fontSize: 16,
    fontWeight: "600",
  },
  gap1: {
    marginTop: 20,
  },
  gap2: {
    marginTop: 8,
  },
  smallText: {
    fontSize: 16,
  },
  extraSmall: {
    fontSize: 14,
  },
  radio: {
    marginVertical: 4,
  },
});
