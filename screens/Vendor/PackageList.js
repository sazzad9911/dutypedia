import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { Platform, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import { ServiceTable } from "../VendorProfile";
import ActivityLoader from "../../components/ActivityLoader";
import { useDispatch } from "react-redux";
import { serverToLocal } from "../../Class/dataConverter";
import { assentColor, textColor } from "../../assets/colors";
import { MaterialIcons } from "@expo/vector-icons";
import ServiceListViewer from "../../components/ServiceListViewer";
const primaryColor = "white";
const backgroundColor = "#4ADE80";

const Tab = createMaterialTopTabNavigator();

export default function PackageList({ navigation, route }) {
  const params = route.params;
  const userId = params.userId;
  const data = params.data;
  const offline=params.offline;
  const [packageData, setPackageData] = React.useState();
  const primaryColor = "white";

  React.useEffect(() => {
    //console.log(userId)
    //console.log(data)
    if (data) {
      //console.log(data.packageData)
      setPackageData(data.packageData);
    }
  }, [data]);
  if (!packageData) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingLeft: 0,
            elevation: 0,
            borderBottomColor: "#FAFAFA",
            borderBottomWidth: 2,
            backgroundColor: "white",
          },
          tabBarLabelStyle: {
            fontSize: Platform.OS == "ios" ? 12 : 10.5,
          },
          tabBarItemStyle: {
            margin: 0,
            padding: 0,
            width: 120,
            borderTopWidth: 0,
            borderTopColor: "#F0F0F0",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#4ADE80",
            marginLeft: 0,
          },
          tabBarScrollEnabled: true,
          tabBarPressColor: primaryColor,
          swipeEnabled: true,
        }}
      >
        {packageData &&
          packageData.map((doc, i) => (
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused, color, size }) => (
                  <Text
                    style={{
                      color: focused ? "#4ADE80" : "black",
                      fontFamily: "Poppins-SemiBold",
                      fontSize: Platform.OS == "ios" ? 16.5 : 15,
                    }}
                  >
                    {doc.price}৳
                  </Text>
                ),
              }}
              key={i}
              name={doc.id}
              initialParams={{
                doc: doc,
                data: data,
                userId: userId,
                offline:offline
              }}
              component={Screen}
            />
          ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
export const Screen = ({ navigation, route }) => {
  const params = route.params;
  const data = params.data;
  const doc = params.doc;
  const userId = params.userId;
  const offline=params.offline;
  const primaryColor = "white";
  const textColor = "black";
  //const setPrice=params.setPrice;
  //const setSelectedPackage=params.setSelectedPackage;
  //const setNewNavigation = params.setNewNavigation;
  const [feature, setFeature] = React.useState();
  const isFocused = useIsFocused();
  const [layoutHeight, setLayoutHeight] = React.useState();
  const [Facilities, setFacilities] = React.useState([]);
  const [NewDataList, setNewDataList] = React.useState(null);
  const [ServiceList, setServiceList] = React.useState([]);
  const [ActiveService, setActiveService] = React.useState();
  const [SubServiceList, setSubServiceList] = React.useState([]);
  const [ServiceTableHeight, setServiceTableHeight] = React.useState(0);
  const [Category, setCategory] = React.useState();
  const initialState = [
    {
      title: "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
    {
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
  ];
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    //console.log(data)
    //console.log(doc)
    if (doc) {
      setFeature(doc.features);
    }
    if (data) {
      setFacilities(data.facilites.selectedOptions);
      let arr = initialState;
      data.service.activeServiceTypes.forEach((doc) => {
        arr = arr.map((d) => {
          if (d.type == doc) {
            //console.log(doc);
            return {
              title: d.title,
              value: true,
              type: d.type,
            };
          } else {
            return d;
          }
        });
      });
      setCategory(data?.service?.category);
      //setActiveServiceData(arr);
      dispatch({
        type: "SET_NEW_LIST_DATA",
        playload: 
          data.skills
      });
      setNewDataList(
        serverToLocal(data.skills)
      );
     
    }
  }, [data + doc]);
  // React.useEffect(() => {
  //   //console.log(NewDataList.length);
  //   if (Array.isArray(NewDataList)) {
  //     let array = [];
  //     NewDataList.map((item, i) => {
  //       if (item.title) {
  //         if (i == 0) {
  //           setActiveService(item.title);
  //         }
  //         array.push(item.title);
  //       } else {
  //         if (i == 0) {
  //           setServiceList([]);
  //           setActiveService(item.mainTitle);
  //         }
  //       }
  //     });
  //     if (array.length > 0) {
  //       setServiceList(uniq(array));
  //     }
  //   }
  // }, [NewDataList]);
  React.useEffect(() => {
    setSubServiceList([]);

    if (Array.isArray(NewDataList)) {
      let arr = [];
      NewDataList.map((item) => {
        if (item.title && item.title.match(ActiveService)) {
          arr.push(item.subTitle);
        } else {
          setSubServiceList([]);
        }
      });
      if (arr.length > 0) {
        setSubServiceList(uniq(arr));
      }
    }
  }, [ActiveService]);

  const NewRows = ({ doc }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: Platform.OS == "ios" ? 16.5 : 15,
            fontFamily: "Poppins-Medium",
            color: textColor,
          }}
        >
          {doc.title}
        </Text>
        <SvgXml
          xml={doc.isAvailable ? Available : notAvailable}
          height="20"
          width={"20"}
        />
      </View>
    );
  };

  if (!NewDataList) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
        onLayout={(e) => {
          const offsetHeight = e.nativeEvent.layout.height;
          if (!layoutHeight || layoutHeight < offsetHeight) {
            setLayoutHeight(offsetHeight);
          }
          // setNewNavigation((val) => {
          //   if (!val || val < offsetHeight) {
          //     return offsetHeight;
          //   } else {
          //     val;
          //   }
          // });
        }}
      >
        {feature && feature.map((doc, i) => <NewRows key={i} doc={doc} />)}
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: "#FAFAFA",
          marginHorizontal: 20,
        }}
      />
      
      <ServiceListViewer skills={data?.skills} serviceCategory={{name:data?.service?.category}}/>
      <IconButton
        onPress={() => {
          navigation.navigate("SelectDate", {
            data: data,
            userId: userId,
            selectedPackage: doc,
            offline:offline
          });
        }}
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          backgroundColor: "#4ADE80",
          height: 35,
          marginBottom:15
        }}
        title={"Select"}
      />
      <IconButton
        onPress={() => {
          navigation.goBack()
        }}
        style={{
          marginHorizontal: 20,
          marginVertical: 0,
          backgroundColor: "transparent",
          height: 35,
          borderWidth:0
        }}
        title={"Back"}
      />
      <View style={{height:20}}/>
    </ScrollView>
  );
};
const notAvailable = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="3" viewBox="0 0 17 3">
  <line id="Line_5979" data-name="Line 5979" x2="14" transform="translate(1.5 1.5)" fill="none" stroke="#666" stroke-linecap="round" stroke-width="3"/>
  </svg>
  `;
const Available = `<svg xmlns="http://www.w3.org/2000/svg" width="14.889" height="14.515" viewBox="0 0 14.889 14.515">
  <path id="Path_20918" data-name="Path 20918" d="M45.921,37.151a.439.439,0,0,1,.456.619q-4.083,6.579-8.168,13.156a1.53,1.53,0,0,1-1.056.715,1.423,1.423,0,0,1-1.326-.507l-3.935-4.82a1.551,1.551,0,0,1,.326-2.272,1.536,1.536,0,0,1,1.155-.239,1.552,1.552,0,0,1,.771.393q1.366,1.24,2.729,2.482a.364.364,0,0,0,.52-.049L45.646,37.3A.44.44,0,0,1,45.921,37.151Z" transform="translate(-31.537 -37.144)" fill="#4ade80"/>
  </svg>
  `;
const styles = StyleSheet.create({
  activeContent: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  inactiveContent: {},
  backgroundContainer: {
    minHeight: 300,
  },
  container: {
    minHeight: 30,
    backgroundColor: primaryColor,
  },
  profile: {
    borderWidth: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: backgroundColor,
    width: 110,
    height: 110,
    marginTop: -55,
    alignSelf: "center",
    backgroundColor: primaryColor,
    borderColor: backgroundColor,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: assentColor,
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5,
    shadowColor: backgroundColor,
    elevation: 5,
    shadowOpacity: 0.1,
  },
  iconTop: {
    position: "absolute",
    right: 20,
    top: 50,
    zIndex: 4,
  },
  iconBottom: {
    position: "absolute",
    zIndex: 4,
    bottom: -10,
    right: -10,
  },
  headLine: {
    fontSize: Platform.OS == "ios" ? 22 : 20.5,
    fontFamily: "Poppins-SemiBold",
  },
  text: {
    textAlign: "center",
    fontSize: Platform.OS == "ios" ? 14 : 13,
    fontFamily: "Poppins-Medium",
  },
  image: {
    width: 110,
    height: 110,
  },
  starIcon: {
    marginRight: 3,
  },
  activeButton: {
    color: "#666666",
    backgroundColor: "#4ADE80",
    borderRadius: 15,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: Platform.OS == "ios" ? 13.5 : 12,
    fontFamily: "Poppins-SemiBold",
  },
  inactiveButton: {
    color: textColor,
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: Platform.OS == "ios" ? 13.5 : 12,
    fontFamily: "Poppins-SemiBold",
  },
});
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
