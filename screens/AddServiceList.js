import React from "react";
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
const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

const AddServiceList = (props) => {
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

  React.useEffect(() => {
    //console.log(newListData)
    let arr = [];
    if (newListData) {
      newListData.map((item, i) => {
        if (item.title) {
          arr.push(item.title);
        } else {
          setName(item.mainTitle);
        }
      });
    }
    if (
      Array.isArray(newListData) &&
      newListData.length > 0 &&
      !newListData[0].title
    ) {
      arr.push(newListData[0].mainTitle);
    }
    if (arr.length > 0) {
      setServices(uniq(arr));
    }
    //console.log(Services)
  }, [newListData]);
  React.useEffect(() => {
    setData(ListSelection);
  }, [ListSelection]);

  if (Array.isArray(Services) && Services.length == 0) {
    return null;
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
              Data: ListSelection,
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
        <Button
          onPress={() => {
            try {
              setDataError(null);
              //console.log(Data);
              dispatch({ type: "SET_LIST_SELECTION", playload: Data });
              if (params.setListData) {
                params.setListData(Data);
                navigation.navigate(params.name, { data: params.data });
                //console.log(ListSelection);
              } else {
                if (Data.length == 0) {
                  setDataError("You must need at least one service");
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
            position: "absolute",
            backgroundColor: backgroundColor,
            zIndex: 100,
            bottom: 20,
            borderRadius: 5,
            marginHorizontal: 20,
            width: width - 40,
          }}
          title={!params.setListData ? "Next" : "Done"}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddServiceList;
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

  React.useEffect(() => {
    let arr = [];
    if (newListData) {
      newListData.map((item, i) => {
        if (item.title && item.title === props.route.name) {
          if (item.subTitle) {
            arr.push(item.subTitle);
          }
        }
      });
    }
    if (Array.isArray(arr) && arr.length > 0) {
      setServices(uniq(arr));
    }
  }, [props.route.name]);
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

const Table = (props) => {
  const newListData = useSelector((state) => state.newListData);
  const [Data, setData] = React.useState([]);
  const { width, height } = Dimensions.get("window");
  const name = props.route.name;
  const title = props.title;
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
    if (!newListData) {
      return;
    }
    setData([]);
    let arr = [];
    if (title) {
      newListData.map((item, i) => {
        if (item.subTitle.match(title) && item.title.match(name)) {
          arr.push(item.tableName);
        }
      });
      setData(uniq(arr));
    } else {
      newListData.map((item, i) => {
        if (item.title && item.title.match(name)) {
          arr.push(item.tableName);
        } else if (item.mainTitle && item.mainTitle.match(name)) {
          arr.push(item.tableName);
        }
      });
      setData(uniq(arr));
    }
  }, [newListData + title]);

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
            />
          </View>
        ))}
    </View>
  );
};
const Rows = ({ title, item, name, setData, Data }) => {
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
    if (!newListData) {
      return;
    }
    let count = 0;
    let word = "";
    let arr = [];
    newListData.map((doc, j) => {
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
  }, [item + title + newListData]);

  return (
    <View>
      {List &&
        List.map((doc, i) => (
          <CheckBox
            style={{
              marginTop: 5,
              width:220,
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
