import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import SuggestionBox, { MainOptions } from "../../components/SuggestionBox";
import IconButton from "../../components/IconButton";
import { useSelector } from "react-redux";
import { Color } from "../../assets/colors";
const { width, height } = Dimensions.get("window");

export default function EditVendorInfo({navigation,route}) {
  const DATA = [
    {
      title: "Mr",
      value: "Mr.",
    },
    {
      title: "Mrs",
      value: "Mrs.",
    },
    {
      title: "Miss",
      value: "Miss.",
    },
    {
      title: "Dr. (Doctor)",
      value: "Dr.",
    },
    {
      title: "Esq. (Esquire)",
      value: "Dr.",
    },
    {
      title: "Hon. (Honorable)",
      value: "Hon.",
    },
    {
      title: "Jr. (Junior)",
      value: "Jr.",
    },
  ];
  const PositionData = [
    {
      title: "Administrative Assistant",
      value: "Administrative Assistant",
    },
    {
      title: "Executive Assistant",
      value: "Executive Assistant",
    },
    {
      title: "Marketing Manager",
      value: "Marketing Manager",
    },
    {
      title: "Software Engineer",
      value: "Software Engineer",
    },
    {
      title: "Sales Manager",
      value: "Sales Manager",
    },
    {
      title: "Office Assistant",
      value: "Office Assistant",
    },
    {
      title: "General Manager",
      value: "General Manager",
    },
    {
      title: "Head of Department",
      value: "Head of Department",
    },
  ];
  const [Data, setData] = useState();
  const [Title, setTitle] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [Positions, setPositions] = useState([]);
  const [SelectedPositions, setSelectedPositions] = useState();
  const [Position, setPosition] = React.useState();
  const [TeamNumber,setTeamNumber]=useState("0")
  const isDark=useSelector(state=>state.isDark)
  const colors=new Color(isDark)
  const backgroundColor=colors.getBackgroundColor()
  const data=route.params.data;
  const [centerName,setCenterName]=useState()
  const [name,setName]=useState()
  const [specialty,setSpecialty]=useState()
  const [gender,setGender]=useState()
  
  useEffect(()=>{
    if(data){
        setCenterName(data.service.serviceCenterName)
        setSelectedItem(data.service.providerInfo.title)
        setTitle(data.service.providerInfo.title)
        setName(data.service.providerInfo.name)
        setGender(data.service.providerInfo.gender)
        setPosition(data.service.providerInfo.position)
        setSelectedPositions(data.service.providerInfo.position)
        setTeamNumber(data.service.worker.toString())
        setSpecialty(data.service.speciality)
    }
  },[data])
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 0,
          }}>
          <View style={{ height: 15 }} />
          <Text style={styles.levels}>Service Center Name</Text>
          <Input value={centerName} 
          onChange={setCenterName} style={styles.input} placeholder={"Center Name"} />
          <Text style={styles.levels}>Service Provider Information</Text>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              flex: 1,
            }}>
            <SuggestionBox
              placeholder="Title"
              value={selectedItem}
              onChange={(val) => {
                setData(val);
              }}
              onSelect={(val) => {
                setTitle(val);
              }}
              onFocus={() => {
                setData([]);
                setPositions([]);
              }}
              DATA={DATA}
              style={{
                width: 120,
                marginTop: 5,
              }}
              returnKeyType="next"
            />
            <Input value={name}
            onChange={setName}
              placeholder={"Name"}
              style={{
                borderWidth: 1,
                width: width - 180,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginVertical: 5,
            }}>
            <DropDown
              onChange={(val) => {setGender(val)}}
              style={{
                marginTop: 5,
                width: 120,
              }}
              value={gender}
              placeholder="Gender"
              DATA={["Male", "Female", "Other"]}
            />

            <SuggestionBox
              placeholder="Position"
              onChange={(val) => {
                setPositions(val);
              }}
              value={SelectedPositions}
              onSelect={(val) => {
                setPosition(val);
              }}
              DATA={PositionData}
              style={{
                marginTop: 5,
                marginLeft: 20,
                width: width - 180,
              }}
              returnKeyType="next"
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              marginTop: 10,
              marginHorizontal:20
            }}
          >
            How many team/ Worker do you have?
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5,marginHorizontal:20 }}>
            <TouchableOpacity
              onPress={() => {
                setData([]);
                setPositions([]);
                let num = parseInt(TeamNumber);
                if (num > 0) {
                  setTeamNumber(`${num - 1}`);
                }
              }}
              style={styles.button}
            >
              <FontAwesome5 name="minus" size={20} color="#707070" />
            </TouchableOpacity>
            <TextInput
              value={TeamNumber}
              keyboardType="numeric"
              onEndEditing={() => {
                if (!TeamNumber) {
                  setTeamNumber("0");
                }
              }}
              onFocus={() => {
                setData([]);
                setPositions([]);
              }}
              onChangeText={(val) => {
                setTeamNumber(val);
                setData([]);
                setPositions([]);
              }}
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Medium",
                marginHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#e5e5e5",
                height: 40,
                width: 70,
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setData([]);
                setPositions([]);
                let num = parseInt(TeamNumber) + 1;
                setTeamNumber(`${num}`);
              }}
              style={styles.button}
            >
              <FontAwesome name="plus" size={20} color="#707070" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.levels,{
            marginTop:5
          }]}>Specialty{"  "}<Text style={{
            color:"#707070",
          }}>(eg. web, mobile, ...)</Text>
          </Text>
          <Input value={specialty} 
          onChange={setSpecialty} style={styles.input} placeholder={"Your specialty"} />
          <MainOptions
            setValue={(value) => {
              setSelectedItem(value);
              setTitle(value);
            }}
            setData={setData}
            style={{
              marginTop: Platform.OS == "ios" ? 145 : 152,
              marginLeft: 20,
              width: 120,
            }}
            Data={Data}
          />
          <MainOptions
            setValue={(value) => {
              setSelectedPositions(value);
              setPosition(value);
            }}
            setData={setPositions}
            style={{
              marginTop: Platform.OS == "ios" ? 203 : 210,
              marginLeft: 150,
              width: width - 170,
            }}
            Data={Positions}
          />
          <IconButton style={{
            marginHorizontal:20,
            marginVertical:30,
            backgroundColor:backgroundColor
          }} title={"Update"}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  levels: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginHorizontal: 20,
    lineHeight: 35,
  },
  input: {
    borderWidth: 1,
  },
  halfInput: {
    width: width / 2 - 40,
    borderWidth: 1,
  },
  button: {
    height: 35,
    width: 35,
    borderRadius: 18,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
