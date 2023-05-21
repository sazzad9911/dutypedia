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
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome, FontAwesome5,Ionicons } from "@expo/vector-icons";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import SuggestionBox, { MainOptions } from "../../components/SuggestionBox";
import IconButton from "../../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../../assets/colors";
import { Entypo } from '@expo/vector-icons';
import { updateData } from "../../Class/update";
import { getService } from "../../Class/service";
import ActivityLoader from "../../components/ActivityLoader";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
const { width, height } = Dimensions.get("window");

export default function EditVendorInfo({ navigation, route }) {
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
  const [TeamNumber, setTeamNumber] = useState("0");
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const data = route.params.data;
  const [centerName, setCenterName] = useState();
  const [name, setName] = useState();
  const [specialty, setSpecialty] = useState();
  const [gender, setGender] = useState();
  const [newSpecialty,setNewSpecialty]=useState([])
  const user=useSelector(state=>state.user)
  const vendor=useSelector(state=>state.vendor)
  const dispatch=useDispatch()
  const [loader,setLoader]=useState(false)
  const isFocused=useIsFocused()

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
  }, [isFocused]);
  useEffect(() => {
    if (data) {
      setCenterName(data.service.serviceCenterName);
      setSelectedItem(data.service.providerInfo.title);
      setTitle(data.service.providerInfo.title);
      setName(data.service.providerInfo.name);
      setGender(data.service.providerInfo.gender);
      setPosition(data.service.providerInfo.position);
      setSelectedPositions(data.service.providerInfo.position);
      setTeamNumber(data.service.worker.toString());
      setSpecialty(data.service.speciality);
    }
  }, [data]);
  const updateInfo=()=>{
    setLoader(true)
    updateData(user.token,{
      serviceId:vendor.service.id,
      serviceCenterName:centerName,
      providerInfo:{
        title:selectedItem,
        name:name,
        gender:gender,
        position:SelectedPositions
      },
      worker:parseInt(TeamNumber)
    }).then(res=>{
      updateVendorInfo()
    }).catch(err=>{
      setLoader(false)
      console.error(err.response.data.msg)
    })
  }
  const updateVendorInfo=async()=>{
    const res=await getService(user.token,vendor.service.id);
    if(res){
      setLoader(false)
      dispatch({ type: "SET_VENDOR", playload: res.data });
      navigation.goBack()
    }
  }
  if(loader){
    return(
      <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <ActivityLoader/>
      </View>
    )
  }
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
          <Input
            value={centerName}
            onChange={setCenterName}
            style={styles.input}
            placeholder={"Center Name"}
          />
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
            <Input
              value={name}
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
              onChange={(val) => {
                setGender(val);
              }}
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
              marginHorizontal: 20,
            }}>
            How many team/ Worker do you have?
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setData([]);
                setPositions([]);
                let num = parseInt(TeamNumber);
                if (num > 0) {
                  setTeamNumber(`${num - 1}`);
                }
              }}
              style={styles.button}>
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
              style={styles.button}>
              <FontAwesome name="plus" size={20} color="#707070" />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.levels,
              {
                marginTop: 5,
              },
            ]}>
            Specialty{"  "}
            <Text
              style={{
                color: "#707070",
              }}>
              (max 25 letter)
            </Text>
          </Text>
          <View style={{
            paddingHorizontal:20,
            flexDirection:"row",
            flexWrap:"wrap"
          }}>
            {newSpecialty.map((doc,i)=>(
              <Chip key={i} onRemove={()=>{
                setNewSpecialty(val=>val.filter((e,j)=>j!=i))
              }} backgroundColor={backgroundColor} title={doc}/>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
            }}>
            <Input
              value={specialty}
              onChange={e=>{
                setSpecialty(e)
                if(e.length>24){
                  setNewSpecialty(val=>[...val,e])
                  setSpecialty("")
                }
              }}
              style={{
                width:width-140,
                borderWidth:1
              }}
              placeholder={"Your specialty"}
            />
            <IconButton onPress={()=>{
              if(newSpecialty.length>24){
                Alert.alert("Specialty can't more then 25")
                return
              }
              if(specialty){
                setNewSpecialty(val=>[...val,specialty])
                setSpecialty("")
              }
            }} style={{
              marginVertical:5,
              backgroundColor:backgroundColor,
              width:80
            }} title={"Add"}/>
          </View>
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
          <IconButton onPress={updateInfo}
            style={{
              marginHorizontal: 20,
              marginVertical: 30,
              backgroundColor: backgroundColor,
            }}
            title={"Update"}
          />
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
const Chip=({title,backgroundColor,onRemove})=>{
  return(
    <View style={{
      borderColor:"#e5e5e5",
      borderWidth:1,
      paddingHorizontal:10,
      paddingVertical:5,
      borderRadius:20,
      margin:5,
      flexDirection:"row",
      alignItems:"center"
    }}>
      
      <Text style={{
        color:"black",
        fontSize:16
      }}>{title}</Text>
      <Ionicons onPress={onRemove?onRemove:null} style={{
        marginLeft:5
      }} name="close-circle-outline" size={21} color="#707070" />
    </View>
  )
}