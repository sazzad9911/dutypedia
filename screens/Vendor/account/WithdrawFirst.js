import React, { useState } from "react";
import { ScrollView, StyleSheet, View,Text } from "react-native";
import IconButton from "../../../components/IconButton";
import Input from "../../../components/Input";
import RadioButton from "../../../components/RadioButton";

export default function WithdrawFirst() {
    const [ownerShipError,setOwnerShipError]=useState()
    const [accountHolderError,setAccountHolderError]=useState()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{
        paddingHorizontal:20
      }}>
        <Input
          placeholder={"Bank name"}
          style={[styles.input,styles.gap1]}
        />
        
        <Input
          placeholder={"Branch name"}
          style={[styles.input,styles.gap2]}
        />
        
        <Input
          placeholder={"Account Number"}
          style={[styles.input,styles.gap2]}
        />
       
        <Text style={[styles.largeFont,styles.gap1]}>Additional information</Text>
       
        <Text style={[styles.smallText,styles.gap1]}>Who is the owner of this account ?</Text>
        <View style={styles.gap1}/>
        <RadioButton  dark={true} title={"Myself"}/>
        <RadioButton style={styles.radio}  dark={true} title={"Parents"}/>
        <RadioButton style={styles.radio} dark={true} title={"Family member"}/>
        <RadioButton style={styles.radio} dark={true} title={"Other"}/>
        {ownerShipError&&(<Text style={[styles.smallText,{color:"red",marginTop:14}]}>Select ownership</Text>)}
        <Input
          placeholder={"Account holder name"}
          style={[styles.input,styles.gap1]}
        />
        <Text style={[styles.smallText,styles.gap1]}>Realation with Account holder ?</Text>
        <View style={styles.gap1}/>
        <RadioButton dark={true} title={"Father"}/>
        <RadioButton style={styles.radio}  dark={true} title={"Mother"}/>
        <RadioButton style={styles.radio} dark={true} title={"Brother"}/>
        <RadioButton style={styles.radio} dark={true} title={"Sister"}/>
        <RadioButton style={styles.radio} dark={true} title={"Other"}/>
        {ownerShipError&&(<Text style={[styles.smallText,{color:"red",marginTop:14}]}>Select relationship</Text>)}
        <IconButton style={{
            marginVertical:20
        }} title={"Save and continue"}/>
      </View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: "#000000",
        marginHorizontal: 0,
        marginVertical:0
    },
    largeFont:{
        fontSize:24,
        fontWeight:"400",
    },
    gap1:{
        marginTop:20,
    },
    gap2:{
        marginTop:8,
        
    },
    smallText:{
        fontSize:16
    },
    radio:{
        marginVertical:4
    }
})