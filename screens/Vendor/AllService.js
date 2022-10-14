import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopTabBar from "../Seller/components/TopTabBar";
import { useSelector } from "react-redux";
import { Color } from "../../assets/colors";
const Tab = createMaterialTopTabNavigator();

const AllService = (props) => {
  const [Services, setServices] = React.useState([]);
  const params=props.route.params;
  const [Name, setName] = React.useState(params.NewDataList.length>0?params.NewDataList[0]:'Name');
  const newListData =useSelector((state) => state.newListData);
  const isDark= useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const secondaryColor=colors.getSecondaryColor();
  const backgroundColor=colors.getBackgroundColor();
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
    if(Array.isArray(newListData)&& newListData.length>0&&!newListData[0].title) {
      arr.push(newListData[0].mainTitle);
    }
    if (arr.length > 0) {
      setServices(uniq(arr));
    }
    //console.log(Services)
  }, [newListData]);

  if (Array.isArray(Services) && Services.length == 0) {
    return null;
  }
  return (
    <Tab.Navigator tabBar={(props) => <TopTabBar {...props} />}>
      {Services.map((doc, i) => (
        <Tab.Screen key={i} name={doc} component={ComponentScreen} />
      ))}
      <Tab.Screen name={'Extra Facilities'} initialParams={{facilites:params.facilites}}
       component={ExtraFacilities} />
    </Tab.Navigator>
  );
};

export default AllService;
const ComponentScreen = (props) => {
  const [Services, setServices] = React.useState([]);
  const newListData = useSelector((state) => state.newListData);
  const isDark= useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const secondaryColor=colors.getSecondaryColor();
  const backgroundColor=colors.getBackgroundColor();
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
            <Table {...props} title={doc} />
          </View>
        ))
      ) : (
        <View style={styles.view}>
          <Text style={styles.text}>Lists</Text>
          <View style={{ height: 1.5, backgroundColor: "#e5e5e5" }} />
          <Table {...props} />
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
  const isDark= useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const secondaryColor=colors.getSecondaryColor();
  const backgroundColor=colors.getBackgroundColor();

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
            <Rows name={name} title={title} item={item} />
          </View>
        ))}
    </View>
  );
};
const Rows = ({ title, item, name }) => {
  const [text, setText] = React.useState();
  const newListData = useSelector((state) => state.newListData);
  const isDark= useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const secondaryColor=colors.getSecondaryColor();
  const backgroundColor=colors.getBackgroundColor();
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
    let count = 0;
    let word = "";
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
      } else if (
        doc.title &&
        doc.title.match(name) &&
        doc.tableName.match(item)
      ) {
        word = word + `${count != 0 ? ", " : ""}${doc.data.title}`;
        count++;
      } else if (doc.mainTitle && doc.mainTitle.match(name)) {
        word = word + `${count != 0 ? ", " : ""}${doc.data.title}`;
        count++;
      }
    });
    setText(word);
  }, [item + title + newListData]);

  return (
    <Text
      style={{
        fontSize: 13,
        fontFamily: "Poppins-Medium",
        color:textColor,
        lineHeight:18
      }}
    >
      {text}
    </Text>
  );
};
function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
const ExtraFacilities = (props) => {
  const facilites=props.route.params.facilites;
  const isDark= useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const secondaryColor=colors.getSecondaryColor();
  const backgroundColor=colors.getBackgroundColor();
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
          facilites.map(
            (doc, i) =><Text style={{
              fontSize:13,
              fontFamily: "Poppins-Medium",
              color:textColor,
              marginTop:5
            }} key={i}>{doc.title}</Text>
          )}
      </View>
    </ScrollView>
  );
};
