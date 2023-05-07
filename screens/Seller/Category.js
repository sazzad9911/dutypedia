import React from "react";
import { ScrollView, KeyboardAvoidingView,Platform,View } from "react-native";
import MainCategoryCart from "./../../Cart/Seller/MainCategoryCart";
import { useSelector, useDispatch } from "react-redux";
import BackHeader from "./../../components/BackHeader";
import { setListData } from "../../action";
import {AllData }from '../../Data/AllData'
import { shortAZ } from './../../action';
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";

const Category = (props) => {
  const Data = useSelector((state) => state.allData);
  const [search, setSearch] = React.useState();
  React.useEffect(() => {
    AllData.sort(function (a, b) {
      return a.title>b.title
    })
  },[])
  const [allData, setAllData] = React.useState(AllData);
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(0);
  const isFocused=useIsFocused()

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
    // Interval to update count
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    // Subscribe for the focus Listener
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch({ type: "SET_LENGTH", playload: 0 });
      let arr=[]
      dispatch(setListData(arr));
      dispatch({ type: "SET_NEW_DATA", playload:null})
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
    <KeyboardAvoidingView style={{flex: 1,paddingTop:25}} behavior={Platform.OS === "ios" ? "padding" : null}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <BackHeader
        value={search}
        onChange={(val) => {
          setSearch(val);
          if (val) {
            let arr = AllData.filter((d) => {
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
            setAllData(AllData);
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
        <View style={{height:10}}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Category;
