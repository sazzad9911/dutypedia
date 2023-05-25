import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopTabBar from "./components/TopTabBar";
import { useSelector } from "react-redux";
import { primaryColor, backgroundColor, textColor } from "../../assets/colors";
const Tab = createMaterialTopTabNavigator();

const AllServiceList = () => {
  const listData = useSelector((state) => state.listData);
  const [Services, setServices] = React.useState([]);
  const [Name, setName] = React.useState(listData[0].mainTitle);
  React.useEffect(() => {
   
    let arr = [];
    if (listData) {
      listData.map((item, i) => {
        if (item.title) {
          arr.push(item.title);
        } else {
          //setName(item.mainTitle);
        }
      });
    }
    if (arr.length > 0) {
      setServices(uniq(arr));
    }
    //console.log(Services)
  }, [listData]);

  if (Array.isArray(Services) && Services.length == 0) {
    return null;
  }
  return (
    <Tab.Navigator tabBar={(props) => <TopTabBar {...props} />}>
      {Services.map((doc, i) => (
        <Tab.Screen key={i} name={doc} component={ComponentScreen} />
      ))}
      <Tab.Screen name={'Extra Facilities'} component={ExtraFacilities} />
    </Tab.Navigator>
  );
};

export default AllServiceList;
const ComponentScreen = (props) => {
  const [Services, setServices] = React.useState([]);
  const listData = useSelector((state) => state.listData);

  React.useEffect(() => {
    let arr = [];
    if (listData) {
      listData.map((item, i) => {
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
            <Table {...props} title={doc} />
          </View>
        ))
      ) : (
        <View style={styles.view}>
          <Text style={styles.text}>Lists</Text>
          
          <Table {...props} />
        </View>
      )}
    </ScrollView>
  );
};
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
const Table = (props) => {
  const listData = useSelector((state) => state.listData);
  const [Data, setData] = React.useState([]);
  const { width, height } = Dimensions.get("window");
  const name = props.route.name;
  const title = props.title;

  React.useEffect(() => {
    if (!listData) {
      return;
    }
    setData([]);
    let arr = [];
    if (title) {
      listData.map((item, i) => {
        if (item.subTitle.match(title) && item.title.match(name)) {
          arr.push(item.tableName);
        }
      });
      setData(uniq(arr));
    } else {
      listData.map((item, i) => {
        if (item.title && item.title.match(name)) {
          arr.push(item.tableName);
        } else if (item?.mainTitle && item?.mainTitle.match(name)) {
          arr.push(item?.tableName);
        }
      });
      setData(uniq(arr));
    }
  }, [listData + title]);

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
  const listData = useSelector((state) => state.listData);

  React.useEffect(() => {
    if (!listData) {
      return;
    }
    let count = 0;
    let word = "";
    listData.map((doc, j) => {
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
  }, [item + title + listData]);

  return (
    <Text
      style={{
        fontSize: 13,
        fontFamily: "Poppins-Light",
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
const ExtraFacilities = () => {
  const businessForm = useSelector((state) => state.businessForm);
  return (
    <ScrollView>
      <View style={styles.view}>
        <Text style={styles.text}>Lists</Text>
        <View style={{ height: 1.5, backgroundColor: "#e5e5e5" }} />
        {Array.isArray(businessForm.facilities) &&
          businessForm.facilities.map(
            (doc, i) => doc.checked && <Text style={{
              fontSize:13,
              fontFamily: "Poppins-Light",
              color:textColor,
              marginTop:5
            }} key={i}>{doc.title}</Text>
          )}
      </View>
    </ScrollView>
  );
};
