import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Header from "./../components/Header";
import Search from "./Search";
import Message from "./Message";
import Notification from "./Notification";
import Profile from "./Profile";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ChatHeader from "./../components/ChatHeader";
import BottomBar from "./../components/BottomBar";
import SearchScreen from "./SearchScreen";
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Animated, { SlideInRight, SlideInLeft } from "react-native-reanimated";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { primaryColor, textColor } from "./../assets/colors";
import SearchFilter from "./../components/SearchFilter";
import { useSelector, useDispatch } from "react-redux";
import { setBottomSheet } from "./../action";
import bottomRef from '../action';
import AllReviewHeader from './../components/AllReviewHeader';
import Appointment from './Appointment';

const Tab = createBottomTabNavigator();

const TabRoute = () => {
  const bottomSheetRef = React.useRef();
  const bottomSheet= useSelector(state=>state.bottomSheet)
  const dispatch=useDispatch()
  const [visible, setVisible]= React.useState(false)
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <Tab.Navigator tabBar={(props) => {
        if(bottomSheetRef && bottomSheetRef.current && props.state.index!=5){
          bottomSheetRef.current.close()
        }
        return(
          <BottomBar {...props} /> 
        )
      }}>
        <Tab.Screen
          options={{ header: (props) => <Header {...props} /> }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{ lazy: false, header: (props) => <Header {...props} /> }}
          name="Search"
          component={Search}
        />
        <Tab.Screen
          options={{
            lazy: false,
            header: (props) => <ChatHeader {...props} />,
          }}
          name="Message"
          component={Message}
        />
        <Tab.Screen
          options={{ header: (props) => <Header {...props} /> }}
          name="Notification"
          component={Notification}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="SearchScreen"
         component={SearchScreen}
        />
        <Tab.Screen
          options={{ header:(props)=><AllReviewHeader title="Appointment" {...props}/> }}
          name="Appointment"
         component={Appointment}
        />
      </Tab.Navigator>
      <Bottom bottomSheetRef={bottomSheetRef} />
    </KeyboardAvoidingView>
  );
};

export default TabRoute;
const Bottom = (props) => {
  const [disabled, setDisabled] = React.useState(true);
  const bottomSheet = useSelector((state) => state.bottomSheet);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const snapPoints = React.useMemo(() => ["10%", "60%"], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    dispatch(setBottomSheet(index));
  }, []);
  const handleClosePress = () => props.bottomSheetRef.current.close();
  return (
    <BottomSheet
      ref={props.bottomSheetRef}
      index={bottomSheet}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: primaryColor,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 30,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        {visible ? (
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={{
              position: "absolute",
              left: 10,
            }}
          >
           <Ionicons name="chevron-back-outline" size={24} color={textColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleClosePress();
            }}
            style={{
              position: "absolute",
              left: 10,
            }}
          >
            <AntDesign name="close" size={24} color={textColor} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            justifySelf: "center",
            textAlign: "center",
          }}
        >
          Filter
        </Text>
      </View>
      <BottomSheetScrollView>
        <SearchFilter
          visible={visible}
          setVisible={setVisible}
          disabled={setDisabled}
        />
      </BottomSheetScrollView>
      {visible ? (
        <></>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          style={styles.button}
          onPress={() => {
            setDisabled(true);
            handleClosePress();
          }}
        >
          <Text
            style={{
              color: "white",
              opacity: disabled ? 0.4 : 1,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      )}
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "green",
    alignSelf: "center",
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
