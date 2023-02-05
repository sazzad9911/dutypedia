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
import { getService } from "../../Class/service";
import ActivityLoader from "../../components/ActivityLoader";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

const EditServiceList = (props) => {
  const [Services, setServices] = React.useState([]);
  const params = props.route.params;
  const [Name, setName] = React.useState(
    params.NewDataList.length > 0 ? params.NewDataList[0] : "Name"
  );
  const newListData = useSelector((state) => state.newListData);
  const ListSelection = useSelector((state) => state.ListSelection);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const navigation = props.navigation;
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();
  const dispatch = useDispatch();
  const [Data, setData] = React.useState([]);
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
  const gigs=params.gigs
  const isFocused=useIsFocused()
  const NewDataList=params.NewDataList;
  const user=useSelector(state=>state.user)
  const [loader,setLoader]=useState(false)
  const vendor=useSelector(state=>state.vendor)
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
   // console.log(NewDataList.length)
    let arr = [];
    if (NewDataList) {
        NewDataList.map((item, i) => {
        if (item.title) {
          arr.push(item.title);
        } else {
          setName(item.mainTitle);
        }
      });
    }
    if (
      Array.isArray(NewDataList) &&
      NewDataList.length > 0 &&
      !NewDataList[0].title
    ) {
      arr.push(NewDataList[0].mainTitle);
    }
    if (arr.length > 0) {
      setServices(uniq(arr));
      //console.log(uniq(arr))
    }
   // console.log(Services)
  }, [isFocused]);
  React.useEffect(() => {
    if(gigs.services.category){
        setData(serverToLocal(gigs.services.options,gigs.services.category))
    }else{
        setData(serverToLocal(gigs.services,gigs.service.category))
    }
    //setData(ListSelection);
  }, [gigs.id]);
  const updateData = () => {
    setLoader(true);
    updateGigsData(user.token,{
      gigId:gigs.id,
      services:{
        options:localOptionsToServer(Data),
        category:gigs.service.category
      }
    }).then(res=>{
      updateVendorInfo()
    }).catch(err=>{
      setLoader(false)
      console.error(err.response.data.msg)
    })
  };
  const updateVendorInfo=async()=>{
    const res=await getService(user.token,vendor.service.id);
    if(res){
      setLoader(false)
      dispatch({ type: "SET_VENDOR", playload: res.data });
      navigation.navigate("VendorProfile");
    }
  }

  if (Array.isArray(Services) && Services.length == 0) {
    return null;
  }
  if(loader){
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityLoader/>
        </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator tabBar={(props) => <TopTabBar {...props} id={true} />}>
        {Services.map((doc, i) => (
          <Tab.Screen
            key={i}
            name={doc}
            component={ComponentScreen}
            initialParams={{
              setData: setData,
              Data: Data,
              NewDataList:NewDataList
            }}
          />
        ))}
        {/* <Tab.Screen
          name={"Extra Facilities"}
          initialParams={{
            facilites: params.facilites,
            setData: setFacilities,
          }}
          component={ExtraFacilities}
        /> */}
      </Tab.Navigator>
      <View>
        {DataError && (
          <Text style={{ color: "red", textAlign: "center" }}>{DataError}</Text>
        )}
        <IconButton
          onPress={() => {
            //console.log(Data.length)
            if(Data&&Data.length<2){
                setDataError("*Please select one and more options")
            }
            updateData()
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
          title={"Update"}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditServiceList;
const ComponentScreen = (props) => {
  const params = props.route.params;
  //console.log(params);
  const [Services, setServices] = React.useState([]);
  const newListData = useSelector((state) => state.newListData);
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
      fontFamily: "Poppins-Medium",
      fontSize: 15,
      color: textColor,
    },
  });
  const NewDataList=params.NewDataList;
  const isFocused=useIsFocused()

  React.useEffect(() => {
    let arr = [];
    if (NewDataList) {
        NewDataList.map((item, i) => {
        if (item.title && item.title === props.route.name) {
          if (item.subTitle) {
            arr.push(item.subTitle);
          }
        }
      });
    }
    if (Array.isArray(arr) && arr.length > 0) {
      setServices(uniq(arr));
      //console.log(uniq(arr))
    }
  }, [props.route.name,isFocused]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {Array.isArray(Services) && Services.length > 0 ? (
        Services.map((doc, i) => (
          <View style={styles.view} key={i}>
            <Text style={styles.text}>{doc}</Text>
            <View style={{ height: 1.5, backgroundColor: "#e5e5e5" }} />
            <Table
              Data={params.Data}
              setData={params.setData}
              {...props}
              title={doc}
              NewDataList={NewDataList}
            />
          </View>
        ))
      ) : (
        <View style={styles.view}>
          <Text style={styles.text}>Lists</Text>
          <View style={{ height: 1.5, backgroundColor: "#e5e5e5" }} />
          <Table Data={params.Data} setData={params.setData} {...props} />
        </View>
      )}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

const Table = (props) => {
  const newListData = useSelector((state) => state.newListData);
  const [Data, setData] = React.useState([]);
  const { width, height } = Dimensions.get("window");
  const name = props.route.name;
  const title = props.title;
  const NewDataList=props.NewDataList;
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
      fontFamily: "Poppins-Medium",
      fontSize: 15,
      color: textColor,
    },
  });

  React.useEffect(() => {
    if (!NewDataList) {
      return;
    }
    setData([]);
    let arr = [];
    if (title) {
        NewDataList.map((item, i) => {
        if (item.subTitle.match(title) && item.title.match(name)) {
          arr.push(item.tableName);
        }
      });
      setData(uniq(arr));
    } else {
        NewDataList.map((item, i) => {
        if (item.title && item.title.match(name)) {
          arr.push(item.tableName);
        } else if (item.mainTitle && item.mainTitle.match(name)) {
          arr.push(item.tableName);
        }
      });
      setData(uniq(arr));
    }
  }, [NewDataList + title]);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {Array.isArray(Data) &&
        Data.map((item, i) => (
          <View
            style={{
              padding: 10,
              width: width / 2 - 30,
              marginRight: 10,
            }}
            key={i}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Medium",
                color: "#707070",
              }}
            >
              {item}
            </Text>
            <Rows
              setData={props.setData}
              name={name}
              title={title}
              item={item}
              Data={props.Data}
              NewDataList={NewDataList}
            />
          </View>
        ))}
    </View>
  );
};
const Rows = ({ title, item, name, setData, Data,NewDataList }) => {
  const [text, setText] = React.useState();
  const newListData = useSelector((state) => state.newListData);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();
  const ListSelection = useSelector((state) => state.ListSelection);
  const dispatch = useDispatch();
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
  //console.log(Data);
  const [List, setList] = React.useState([]);
  React.useEffect(() => {
    if (!NewDataList) {
      return;
    }
    let count = 0;
    let word = "";
    let arr = [];
    //console.log(NewDataList.length)
    NewDataList.map((doc, j) => {
      if (
        doc.subTitle &&
        doc.title &&
        doc.tableName.match(item) &&
        doc.subTitle.match(title) &&
        doc.title.match(name)
      ) {
        word = word + `${count != 0 ? ", " : ""}${doc.data.title}`;
        count++;
        arr.push(doc);
      } else if (
        doc.title &&
        doc.title.match(name) &&
        doc.tableName.match(item)
      ) {
        word = word + `${count != 0 ? ", " : ""}${doc.data.title}`;
        count++;
        arr.push(doc);
      } else if (doc.mainTitle && doc.mainTitle.match(name)) {
        word = word + `${count != 0 ? ", " : ""}${doc.data.title}`;
        count++;
        arr.push(doc);
      }
    });
    setList(arr);
    setText(word);
  }, [item + title + NewDataList]);

  return (
    <View>
      {List &&
        List.map((doc, i) => (
          <CheckBox
            style={{
              marginTop: 5,
              width: width / 2 - 30,
            }}
            key={i}
            value={
              Array.isArray(Data) &&
              Data.filter(
                (d) =>
                  d.mainTitle == doc.mainTitle &&
                  d.tableName == doc.tableName &&
                  d.data.title == doc.data.title
              ).length > 0
                ? true
                : false
            }
            onChange={(e) => {
              try {
                let arr = Data.filter(
                  (d) =>
                    d.mainTitle == doc.mainTitle &&
                    d.tableName == doc.tableName &&
                    d.data.title == e
                );
                //console.log(arr);
                if (arr.length > 0) {
                  //console.log(e);
                  //let newArr = Data.filter((d) => d.data.title != e);

                  setData((val) => val.filter((d) => d.data.title != e));
                } else {
                  let arr = Data;
                  arr.push(doc);
                  setData(Data);
                }
              } catch (e) {
                console.warn(e.message);
              }
            }}
            title={doc.data.title}
          />
        ))}
    </View>
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
      fontFamily: "Poppins-Medium",
      fontSize: 15,
      color: textColor,
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
              key={i}
              title={doc.title}
            />
          ))}
      </View>
    </ScrollView>
  );
};
