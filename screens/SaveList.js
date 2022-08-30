import React from "react";
import { View, ScrollView, FlatList, Text } from "react-native";
import { Bear } from "./../assets/icon";
import { SvgXml } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import SearchItem from "./../Cart/SearchItem";

const SaveList = ({ navigation }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#48496D",
          height: 230,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: "absolute",
            top: 30,
            left: 20,
          }}
          name="left"
          size={24}
          color="#f5f5f5"
        />
        <SvgXml
          style={{
            marginTop: 30,
          }}
          xml={Bear}
          height="100"
          width="100"
        />
        <Text
          style={{
            color: "white",
            marginTop: 15,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Created By Easin Arafat
        </Text>
      </View>
      <ScrollView onScroll={(e)=>{
        console.log(e.current)
      }}
        style={{
          height: "100%",
        }}
      >
        <Text
          style={{
            marginLeft: 5,
            fontSize: 17,
            marginHorizontal: 10,
            marginVertical: 20,
            fontWeight: "bold",
          }}
        >
          Save List
        </Text>
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
      </ScrollView>
    </View>
  );
};

export default SaveList;
