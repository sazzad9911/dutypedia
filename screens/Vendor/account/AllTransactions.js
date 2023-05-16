import { useIsFocused } from "@react-navigation/native";
import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { ScrollView, View, Animated, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import AccountSearchBar from "./AccountSearchBar";
import TransactionCart from "./TransactionCart";
import BottomSheet from "@gorhom/bottom-sheet";
import AccountDropDown from "./AccountDropDown";
import customStyle from "../../../assets/stylesheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAllTransactions } from "../../../Class/account";
import { dateDifference } from "../../../action";
import ActivityLoader from "../../../components/ActivityLoader";
import { NoThing } from "./RecentTransaction";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

export default function AllTransactions() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
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
  const [data,setData]=useState()
  const [allData,setAllData]=useState()
  const user=useSelector(state=>state.user)
  const vendor=useSelector(state=>state.vendor)
  const [filterDate,setFilterDate]=useState()
  const [filterTypes,setFilterTypes]=useState()
  const inset=useSafeAreaInsets()
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFilterDate(date)
    setFilterTypes()
    hideDatePicker();
  };
  useEffect(()=>{
    if(user&&vendor){
      getAllTransactions(user.token,vendor.service.id).then(res=>{
        setAllData(res.data.orders)
        setData(res.data.orders)
      }).catch(err=>{
        console.error(err.response.data.msg)
      })
    }
  },[isFocused])

  useEffect(()=>{
    if(filterDate){
      let arr=allData.filter(d=>dateDifference(d.createdAt,filterDate)==0)
      setData(arr)
    }
    if(filterTypes){
      if(filterTypes=="ALL"){
        setData(allData)
        return
      }
      let arr=allData.filter(d=>d.type.match(filterTypes))
      setData(arr)
    }
    if(!filterDate&&!filterTypes){
      setData(allData)
    }
  },[filterDate,filterTypes])
  //console.log(data[2])

  return (
    <View style={{ flex: 1, paddingHorizontal: 20,paddingTop:inset?.top }}>
      <ScrollView
        style={{ flexGrow: 1 }}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}>
        <AccountSearchBar
          onDate={showDatePicker}
          onSort={() => {
            setIndex(1);
          }}
        />
        {data&&data.map((doc,i)=>(
          <TransactionCart data={doc} key={i} />
        ))}
        {!data&&(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityLoader/>
        </View>
       )}
       {data&&data.length==0&&(
        <NoThing/>
       )}
        <View style={{ height: 10 }} />
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
        <AccountDropDown onSelect={(e)=>{
          setFilterTypes(e)
          setFilterDate()
          bottomSheetRef.current.close()
        }} />
      </BottomSheet>
    </View>
  );
}
