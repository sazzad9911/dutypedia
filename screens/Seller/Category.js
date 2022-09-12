import React from "react";
import { ScrollView, KeyboardAvoidingView } from "react-native";
import MainCategoryCart from "./../../Cart/Seller/MainCategoryCart";
import { useSelector, useDispatch } from "react-redux";
import BackHeader from "./../../components/BackHeader";
import { setListData } from "../../action";

const Category = (props) => {
  const Data = useSelector((state) => state.allData);
  const [search, setSearch] = React.useState();
  const [allData, setAllData] = React.useState([]);
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    //setAllData(Data);
    // console.log(Data.length)
    if (Data.length > 0) {
      setAllData(Data);
    }
  }, [Data.length]);

  React.useEffect(() => {
    // Interval to update count
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    // Subscribe for the focus Listener
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(setListData([]));
      //setAllData(Data);
      setCount(0);
    });
    return () => {
      // Clear setInterval in case of screen unmount
      clearTimeout(interval);
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, [props.navigation]);
  const fromArray = (title, arr) => {
    if (arr) {
      return arr.filter((d) => d.title.match(title));
    }
    return [];
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <BackHeader
        value={search}
        onChange={(val) => {
          setSearch(val);
          if (val) {
            let arr = Data.filter((d) => {
              if (
                d.title.match(val) ||
                (d.data && fromArray(val, d.data).length > 0) ||
                (d.data &&
                  d.data.data &&
                  fromArray(val, d.data.data).length > 0)
              ) {
                //console.log(fromArray(val,d.data).length);
                return d;
              }
            });
            setAllData(arr);
          } else {
            setAllData(Data);
          }
        }}
        {...props}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {allData.map((data, i) => (
          <MainCategoryCart
            onPress={() => {
              if (data.data) {
                props.navigation.navigate("SubCategories", {
                  title: data.title,
                  data: data.data,
                  image: data.image,
                  id: i,
                  mainTitle: data.title,
                });
              } else {
                props.navigation.navigate("TableData", {
                  title: data.title,
                  list: data.list,
                  exit: true,
                  id: i,
                  mainTitle: data.title,
                });
              }
            }}
            key={i}
            title={data.title}
            icon={data.icon}
            {...props}
            color={data.color}
          />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Category;
