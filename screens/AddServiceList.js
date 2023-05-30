import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopTabBar from "./Seller/components/TopTabBar";
import { useSelector, useDispatch } from "react-redux";
import { Color } from "../assets/colors";
import { CheckBox } from "./Seller/Pricing";
import Button from "./../components/Button";
import IconButton from "../components/IconButton";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

const AddServiceList = (props) => {
  
  const params = props.route.params;
  const facilities = params?.facilities;
  const skills = params?.skills;
  const category = params?.category;
  const selected=params?.selected;

  const ListSelection = useSelector((state) => state.ListSelection);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const navigation = props.navigation;
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const dispatch = useDispatch();
  const [Data, setData] = React.useState(selected?selected:[]);
  const [DataError, setDataError] = React.useState();
  const [Facilities, setFacilities] = React.useState([]);
  const styles = StyleSheet.create({
    view: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    text: {
      fontFamily: "Poppins-Medium",
      fontSize: 15,
      color: textColor,
    },
  });
  const isFocused = useIsFocused();
  //console.log("df")
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

  React.useEffect(() => {
    setData(ListSelection);
  }, [ListSelection]);

  

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator tabBar={(props) => <TopTabBar {...props} />}>
        <Tab.Screen
          name={"Service List"}
          component={ComponentScreen}
          initialParams={{
            setData: setData,
            Data: Data,
            category:category,
            skills:skills,

          }}
        />
        {facilities && (
          <Tab.Screen
            name={"Extra Facilities"}
            initialParams={{
              facilites: params.facilites,
              setData: setFacilities,
            }}
            component={ExtraFacilities}
          />
        )}
      </Tab.Navigator>
      <View
        style={{
          paddingVertical: 12,
        }}>
        {DataError && (
          <Text style={{ color: "red", textAlign: "center" }}>{DataError}</Text>
        )}
        <IconButton
          onPress={() => {
            try {
              dispatch({ type: "SET_LIST_SELECTION", playload: Data });
              if (params.setListData) {
                params.setListData(Data);
                if (params.setFacilities) {
                  params.setFacilities(Facilities);
                }
                navigation.navigate(params.name, { data: params.data });
                //console.log(ListSelection);
              } else {
                if (Data.length == 0) {
                  setDataError("You must need at least one service");
                  return;
                }
                if (params.data == "PACKAGE") {
                  navigation.navigate("AddPackage", {
                    data: Data,
                  });
                  return;
                }
                
               
                navigation.navigate("Service", {
                  direct: params.data,
                  data: Data,
                });
              }
            } catch (e) {
              console.warn(e.message);
            }
          }}
          style={{
            backgroundColor: backgroundColor,
            zIndex: 100,
            borderRadius: 5,
            marginHorizontal: 20,
            width: width - 40,
          }}
          title={!params.setListData ? "Next" : "Done"}
        />
      </View>
    </View>
  );
};

export default AddServiceList;
const ComponentScreen = (props) => {
  const params = props.route.params;
  //console.log(params);
  const skills=params?.skills;
  const category=params?.category;
  const Data=params?.Data;
  const setData=params?.setData;
//console.log(skills)
  const styles = StyleSheet.create({
    view: {
      marginHorizontal: 20,
      marginBottom: 28,
    },
    text: {
      fontWeight: "500",
      fontSize: 20,
    },
  });

  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.view]} >
        <Text style={styles.text}>{category}</Text>

        {skills &&
          skills.map((doc, i) => (
            <CheckBox
              style={{
                width: width / 2 - 30,
                alignItems: "flex-start",
                marginVertical: 8,
              }}
              key={i}
              value={
                Array.isArray(Data) &&
                Data.filter(
                  (d) =>
                    d == doc
                    
                ).length > 0
                  ? true
                  : false
              }
              onChange={(e) => {
                try {
                  let arr = Data.filter(
                    (d) =>
                      d==e
                  );
                  //console.log(arr);
                  if (arr.length > 0) {
                    //console.log(e);
                    //let newArr = Data.filter((d) => d.data.title != e);

                    setData((val) => val.filter((d) => d != e));
                  } else {
                    let arr = Data;
                    arr.push(doc);
                    setData(Data);
                  }
                } catch (e) {
                  console.warn(e.message);
                }
              }}
              title={doc}
            />
          ))}
      </View>
    </ScrollView>
  );
};

function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
const ExtraFacilities = (props) => {
  const facilites = props.route.params.facilites;
  const params = props.route.params;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();
  const styles = StyleSheet.create({
    view: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    text: {
      fontWeight: "500",
      fontSize: 20,
    },
  });
  return (
    <ScrollView>
      <View style={styles.view}>
        <Text style={styles.text}>Lists</Text>
        <View style={{ height: 1.5, backgroundColor: "#e5e5e5" }} />
        {Array.isArray(facilites) &&
          facilites.map((doc, i) => (
            <CheckBox
              onChange={(e) => {
                try {
                  params.setData((val) => {
                    let arr = val.filter((s) => s.title.match(e));
                    if (arr.length > 0) {
                      return val.filter((s) => s.title != e);
                    } else {
                      return [...val, doc];
                    }
                  });
                } catch (err) {
                  console.warn(err.message);
                }
              }}
              style={{
                marginTop: 20,
              }}
              key={i}
              title={doc.title}
            />
          ))}
      </View>
    </ScrollView>
  );
};
