import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { primaryColor, secondaryColor } from "../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { textColor } from "./../assets/colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const SearchFilter = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [Online,setOnline]= React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch2 = () => setOnline((previousState) => !previousState);
  const [visible, setVisible] = useState(false);
  const [Category, setCategory]= React.useState('Select');
  const [SellerLevel, setSellerLevel]= React.useState();
  const [SellerLocation, setSellerLocation]= React.useState()
  const [type,setType] =React.useState('category');
  const [data, setData] = useState();
  const category=[
    {
      label: "Select Category",
      value: "Select",
    },
    {
      label: "Builder",
      value: "Builder",
    },
    {
      label: "IT & Technology",
      value: "IT",
    },
    {
      label: "Music & Audio",
      value: "Music",
    },
    {
      label: "Lawyer",
      value: "Lawyer",
    },
    {
      label: "Parlor & Salon",
      value: "Parlor",
    },
    {
      label: "House Keeper",
      value: "House",
    },
    {
      label: "Electrician & Mechanician",
      value: "Electrician",
    },  
  ]
  const sellerLevel=[
    {
      label: "Seller level 1",
      value:1
    },
    {
      label: "Seller level 2",
      value:2
    },
    {
      label: "Seller level 3",
      value:3
    },
    {
      label: "Seller level 4",
      value:4
    },
    {
      label: "Seller level 5",
      value:5
    }
  ]
  const sellerLocation=[
    {
      label:'Barishal',
      value:'Barishal'
    },
    {
      label:'Chittagong',
      value:'Chittagong'
    },
    {
      label:'Dhaka',
      value:'Dhaka'
    },
    {
      label:'Khulna',
      value:'Khulna'
    },
    {
      label:'Rajshahi',
      value:'Rajshahi'
    },
    {
      label:'Rangpur',
      value:'Rangpur'
    },
    {
      label:'Sylhet',
      value:'Sylhet'
    },
  ]
  if(visible){
    return(
      <Selection onChange={(val)=>{
        if(type=='category'){
          setCategory(val);
        }else if(type=='seller_level'){
          setSellerLevel(val);
        }else if(type=='seller_location'){
          setSellerLocation(val);
        }
      }} data={data} close={setVisible} visible={visible} />
    )
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View>
          <View style={styles.box}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Sort By
            </Text>
          </View>
          <View style={[styles.box1, { flexDirection: "row" }]}>
            <Text style={{ flex: 7 }}>Online Seller</Text>
            <View style={styles.container}>
              <Switch
                trackColor={{ false: "#767577", true: "#808000" }}
                thumbColor={isEnabled ? "#f4f3f4 " : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.gap}></View>
          <View style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 7,
              }}
            >
              Verified Seller
            </Text>
            <View style={styles.container}>
              <Switch
                trackColor={{ false: "#767577", true: "#808000" }}
                thumbColor={Online ? "#f4f3f4 " : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={Online}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: secondaryColor,
              height: 2,
            }}
          ></View>
          <View style={styles.box}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Filter
            </Text>
          </View>
          <View
            style={{
              backgroundColor: secondaryColor,
              height: 2,
            }}
          ></View>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
              setType('category')
              setData(category)
            }}
            style={[styles.box1, { flexDirection: "row" }]}
          >
            <Text
              style={{
                flex: 9,
              }}
            >
              Category
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 3,
              }}
            >
              <Text
                style={{
                  marginRight: 20,
                  flex: 2,
                }}
              >
                {Category}
              </Text>
              <AntDesign
                style={{
                  marginTop: 5,
                }}
                name="right"
                size={16}
                color="black"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.box}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Filter
            </Text>
          </View>
          <View style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 4,
              }}
            >
              Price Rang
            </Text>
            <TextInput placeholder='৳' style={styles.input}>
            </TextInput>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                To
              </Text>
            </View>
            <TextInput placeholder='৳' style={styles.input}>
            </TextInput>
          </View>
          <View style={styles.gap}></View>
          <TouchableOpacity onPress={() => {
              setVisible(true);
              setType('seller_level')
              setData(sellerLevel)
            }} style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 9,
              }}
            >
              Seller Level
            </Text>
            <View style={styles.touch}>
              <AntDesign
                style={{
                  marginTop: 5,
                  marginLeft: 18,
                }}
                name="right"
                size={16}
                color="black"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.gap}></View>
          <TouchableOpacity onPress={() => {
              setVisible(true);
              setType('seller_location')
              setData(sellerLocation)
            }} style={[styles.box1, { flexDirection: "row" }]}>
            <Text
              style={{
                flex: 9,
              }}
            >
              Seller Location
            </Text>
            <View style={styles.touch}>
              <AntDesign
                style={{
                  marginTop: 5,
                  marginLeft: 18,
                }}
                name="right"
                size={16}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  box: {
    height: 50,
    backgroundColor: "#fbfbfb",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box1: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 30,
    width: 120,
    borderWidth: 1,
    flex: 3,
    borderRadius: 5,
    padding:5
  },
  touch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  gap: {
    backgroundColor: secondaryColor,
    height: 2,
  },
  text: {
    fontSize: 18,
    color: textColor,
  },
  view: {
    marginTop: 5,
    backgroundColor: primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    width: '80%',
    height:40,
    backgroundColor: 'green',
    alignSelf: 'center',
    margin: 10,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const Selection = (props) => {
  const data = props.data ? props.data : [];
  if (!props.visible) {
    return <></>;
  }
  return (
    <View
      style={{
        backgroundColor: secondaryColor,
      }}
    >
      {data.map((doc, i) => (
          <TouchableOpacity
            style={styles.view}
            key={i}
            onPress={() => {
              if (props.close) {
                props.close(!props.visible);
              }
              if (props.onChange) {
                props.onChange(doc.value);
              }
            }}
          >
            <Text style={styles.text}>{doc.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={() =>{
          props.close(!props.visible);
        }}>
          <Text style={{
            color:'white'
          }}>Close</Text>
        </TouchableOpacity>
    </View>
  );
};
