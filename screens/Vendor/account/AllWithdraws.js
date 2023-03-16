import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, View, Animated, Text, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import AccountSearchBar from "./AccountSearchBar";
import { TopBox } from "./RecentWithdraw";
import WithdrawCart from "./WithdrawCart";
import BottomSheet from "@gorhom/bottom-sheet";
import AccountDropDown from "./AccountDropDown";
import customStyle from "../../../assets/stylesheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const { width, height } = Dimensions.get("window");

export const AllWithdraws = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
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
      dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      dispatch(setHideBottomBar(true));
    }, 50);
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
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
          <AccountSearchBar onDate={showDatePicker}
            onSort={() => {
              setIndex(1);
            }}
          />
          <TopBox />
        </View>
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
        <WithdrawCart />
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
        <AccountDropDown />
      </BottomSheet>
    </View>
  );
};
