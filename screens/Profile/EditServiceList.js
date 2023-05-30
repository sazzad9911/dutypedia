import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopTabBar from "../Seller/components/TopTabBar";
import { useSelector, useDispatch } from "react-redux";
import { Color } from "../../assets/colors";
import { CheckBox } from "../Seller/Pricing";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import { useIsFocused } from "@react-navigation/native";
import { localOptionsToServer, serverToLocal } from "../../Class/dataConverter";
import { updateData, updateGigsData } from "../../Class/update";
import { getGigs, getService } from "../../Class/service";
import ActivityLoader from "../../components/ActivityLoader";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

const EditServiceList = (props) => {
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
  const isFocused = useIsFocused();
  //console.log("df")
  const gigs = params.gigs;
  const NewDataList = params.NewDataList;
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const vendor = useSelector((state) => state.vendor);
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
    if (getGigs) {
      setData(gigs?.skills);
    } 
    //console.log(NewDataList)
    //setData(ListSelection);
  }, [gigs.id,isFocused]);
  const updateData = () => {
    setLoader(true);
    updateGigsData(user.token, {
      gigId: gigs.id,
      skills: Data
    })
      .then((res) => {
        updateVendorInfo();
      })
      .catch((err) => {
        setLoader(false);
        console.error(err.response.data.msg);
      });
  };
  const updateVendorInfo = async () => {
    const res = await getService(user.token, vendor.service.id);
    if (res) {
      setLoader(false);
      dispatch({ type: "SET_VENDOR", playload: res.data });
      navigation.navigate("VendorProfile");
    }
  };

  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => (
          <TopTabBar
            style={{
              marginTop: 0,
            }}
            {...props}
            id={true}
          />
        )}>
       <Tab.Screen
          name={"Service List"}
          component={ComponentScreen}
          initialParams={{
            setData: setData,
            Data: gigs?.skills,
            category:category,
            skills:skills,
            
          }}
        />
        
      </Tab.Navigator>
      <View>
        {DataError && (
          <Text style={{ color: "red", textAlign: "center" }}>{DataError}</Text>
        )}
        <IconButton
          onPress={() => {
            //console.log(Data.length)
            if (Data && Data.length < 2) {
              setDataError("*Please select one and more options");
            }
            if(facilities){
              navigation.navigate("EditExtraFacilities",{
                skills:Data,
                facilities:facilities,
                gigs:gigs
              })
              return
            }
            updateData();
          }}
          style={{
            position: "absolute",
            backgroundColor: backgroundColor,
            zIndex: 100,
            bottom: 20,
            borderRadius: 5,
            marginHorizontal: 20,
            width: width - 40,
          }}
          title={facilities?"Continue":"Update"}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditServiceList;
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
                  params.setFacilities((val) => {
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
