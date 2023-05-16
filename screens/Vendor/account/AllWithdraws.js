import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState,useEffect } from "react";
import { ScrollView, View, Animated, Text, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import AccountSearchBar from "./AccountSearchBar";
import { TopBox } from "./RecentWithdraw";
import WithdrawCart from "./WithdrawCart";
import BottomSheet from "@gorhom/bottom-sheet";
import AccountDropDown from "./AccountDropDown";
import customStyle from "../../../assets/stylesheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAllWithdraws } from "../../../Class/account";
import ActivityLoader from "../../../components/ActivityLoader";
import { NoThing } from "./RecentTransaction";
import { dateDifference } from "../../../action";
import { allExporters } from "./expoters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

export const AllWithdraws = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [data, setData] = useState();
  const [allData, setAllData] = useState();
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [filterDate, setFilterDate] = useState();
  const [filterTypes, setFilterTypes] = useState();
  useEffect(() => {
    if (user && vendor) {
      getAllWithdraws(user.token, vendor.service.id)
        .then((res) => {
          setAllData(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
    }
  }, [isFocused]);
  const inset=useSafeAreaInsets()

  useEffect(() => {
    if (filterDate) {
      let arr = allData.filter(
        (d) => dateDifference(d.createdAt, filterDate) == 0
      );
      setData(arr);
    }
    if (filterTypes) {
      if (filterTypes == "ALL") {
        setData(allData);
        return;
      }
      let arr = allData.filter((d) => d.status.match(filterTypes));
      setData(arr);
    }
    if (!filterDate && !filterTypes) {
      setData(allData);
    }
  }, [filterDate, filterTypes]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFilterDate(date);
    setFilterTypes();
    hideDatePicker();
  };
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  });
  const [index, setIndex] = useState(-1);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", 340], []);
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
  }, []);
  React.useEffect(() => {
    if (isFocused) {
      //dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      //dispatch(setHideBottomBar(true));
    }, 50);
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop:inset?.top
      }}>
      <ScrollView
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#ffffff",
          }}>
          <AccountSearchBar
            onDate={showDatePicker}
            onSort={() => {
              setIndex(1);
            }}
          />
          <TopBox />
        </View>
        
       {data&&data.map((doc,i)=>(
        <WithdrawCart data={doc} key={i} />
       ))}
       {!data&&(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityLoader/>
        </View>
       )}
       {data&&data.length==0&&(
        <NoThing/>
       )}
        <View
          style={{
            height: 10,
          }}
        />
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={filterDate?filterDate:new Date()}
      />
      {index != -1 && (
        <View
          style={{
            backgroundColor: "#00000010",
            position: "absolute",
            width: width,
            height: height,
            top: -100,
          }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        style={[
          {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "#ffffff",
          },
          customStyle.shadow,
        ]}>
        <AccountDropDown data={allExporters} onSelect={e=>{
          setFilterTypes(e.key)
          setFilterDate()
          bottomSheetRef.current.close()
        }} />
      </BottomSheet>
    </View>
  );
};
