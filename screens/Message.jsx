import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ChatCart from "../Cart/ChatCart";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatList from "./message/ChatList";
import ContactList from "./message/ContactList";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./ChatScreen";
import { StatusBar } from "expo-status-bar";
import { SvgXml } from "react-native-svg";
import { setChatSearchRef } from "../Reducers/chatSearchRef";
import { useDispatch, useSelector } from "react-redux";
const Stack = createStackNavigator();

const Message = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="MessageScreen"
        component={MessageScreen}
      />
      <Stack.Screen
        name="ChatScreen"
        options={{
          headerShown: false,
        }}
        component={ChatScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SearchScreen"
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

export default Message;
const MessageScreen = ({ navigation }) => {
  const inset = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: inset?.top,
        }}
      />
      <StatusBar style="light" backgroundColor="#ffffff" />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SearchScreen");
        }}
        style={{
          position: "absolute",
          top: inset.top + 15,
          right: 20,
          zIndex: 1,
        }}>
        <SvgXml xml={searchIcon} />
      </TouchableOpacity>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#767676",
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#ffffff",
            elevation: 0,
            borderBottomWidth: 0,
            marginLeft:20,
            marginRight:60
          },
          tabBarItemStyle: {
            flexDirection: "row",
            alignItems: "center",
            
          },
          tabBarIndicatorContainerStyle:{
            marginHorizontal:0
          },
          tabBarContentContainerStyle:{
            
          }
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color }) => (
              <View style={{
                flexDirection:"row"
              }}>
                <SvgXml xml={focused?activeChat:inActiveChat}/>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    lineHeight: 16,
                    color: focused ? "#000000" : "#767676",
                    marginLeft:8
                  }}>
                  Chats
                </Text>
              </View>
            ),
          }}
          name="Chat List"
          component={ChatList}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color }) => (
              <View style={{flexDirection:"row"}}>
                <SvgXml xml={focused?activeContact:inActiveContact}/>
                <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  lineHeight: 16,
                  color: focused ? "#000000" : "#767676",
                  marginLeft:8
                }}>
                Contact list
              </Text>
              </View>
            ),
          }}
          name="Contact List"
          component={ContactList}
        />
      </Tab.Navigator>
    </View>
  );
};

const searchIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.15625 14.0625C11.4182 14.0625 14.0625 11.4182 14.0625 8.15625C14.0625 4.89432 11.4182 2.25 8.15625 2.25C4.89432 2.25 2.25 4.89432 2.25 8.15625C2.25 11.4182 4.89432 14.0625 8.15625 14.0625Z" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.3328 12.333L15.75 15.7502" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const SearchScreen = ({ navigation }) => {
  const inset = useSafeAreaInsets();
  const chatSearchRef = useSelector((state) => state.chatSearchRef);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: inset?.top,
        }}
      />
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <View
        style={{
          flexDirection: "row",
          //justifyContent: vendor ? "space-between" : "flex-end",
          paddingVertical: 16,
          alignItems: "center",
          paddingBottom: 6,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: "row",
            borderRadius: 4,
            backgroundColor: "#ffffff",
            flex: 1,
            height: 32,
            paddingHorizontal: 16,
            alignItems: "center",
            borderWidth:1,
            borderColor:"#D1D1D1"
          }}>
          <TextInput
            onChangeText={(e) => dispatch(setChatSearchRef(e))}
            value={chatSearchRef}
            style={{ flex: 1 }}
            placeholder="Type name"
          />
          <SvgXml xml={searchIcon} />
        </View>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginLeft: 8,
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              color: "#000000",
            }}>
            Cancel
          </Text>
        </Pressable>
      </View>
      <Tab.Navigator
         screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#767676",
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#ffffff",
            elevation: 0,
            borderBottomWidth: 0,
            marginLeft:20,
            marginRight:20    
          },
          tabBarItemStyle: {
            flexDirection: "row",
            alignItems: "center",
            
          },
          tabBarIndicatorContainerStyle:{
            marginHorizontal:0
          },
          tabBarContentContainerStyle:{
            
          }
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color }) => (
              <View style={{
                flexDirection:"row"
              }}>
                <SvgXml xml={focused?activeChat:inActiveChat}/>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    lineHeight: 16,
                    color: focused ? "#000000" : "#767676",
                    marginLeft:8
                  }}>
                  Chats
                </Text>
              </View>
            ),
          }}
          name="Chat List"
          initialParams={{
            search: true,
          }}
          component={ChatList}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused, color }) => (
              <View style={{flexDirection:"row"}}>
                <SvgXml xml={focused?activeContact:inActiveContact}/>
                <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  lineHeight: 16,
                  color: focused ? "#000000" : "#767676",
                  marginLeft:8
                }}>
                Contact list
              </Text>
              </View>
            ),
          }}
          name="Contact List"
          initialParams={{
            search: true,
          }}
          component={ContactList}
        />
      </Tab.Navigator>
    </View>
  );
};
const activeChat=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.96096 3.19482H3.83584C3.62763 3.19482 3.42743 3.20281 3.23523 3.22677C1.08108 3.41047 0 4.68041 0 7.02061V10.2154C0 13.4102 1.28128 14.0412 3.83584 14.0412H4.15616C4.33233 14.0412 4.56456 14.161 4.66867 14.2968L5.62963 15.5747C6.05405 16.1418 6.74274 16.1418 7.16717 15.5747L8.12813 14.2968C8.24825 14.137 8.44044 14.0412 8.64064 14.0412H8.96096C11.3073 14.0412 12.5806 12.9709 12.7648 10.8144C12.7888 10.6228 12.7968 10.4231 12.7968 10.2154V7.02061C12.7968 4.47275 11.5155 3.19482 8.96096 3.19482ZM3.6036 9.58444C3.15515 9.58444 2.8028 9.22503 2.8028 8.78574C2.8028 8.34645 3.16316 7.98704 3.6036 7.98704C4.04404 7.98704 4.4044 8.34645 4.4044 8.78574C4.4044 9.22503 4.04404 9.58444 3.6036 9.58444ZM6.3984 9.58444C5.94995 9.58444 5.5976 9.22503 5.5976 8.78574C5.5976 8.34645 5.95796 7.98704 6.3984 7.98704C6.83884 7.98704 7.1992 8.34645 7.1992 8.78574C7.1992 9.22503 6.84685 9.58444 6.3984 9.58444ZM9.2012 9.58444C8.75275 9.58444 8.4004 9.22503 8.4004 8.78574C8.4004 8.34645 8.76076 7.98704 9.2012 7.98704C9.64164 7.98704 10.002 8.34645 10.002 8.78574C10.002 9.22503 9.64164 9.58444 9.2012 9.58444Z" fill="black"/>
<path d="M16 3.82578V7.02059C16 8.618 15.5035 9.70423 14.5105 10.3033C14.2703 10.447 13.99 10.2553 13.99 9.97579L13.998 7.02059C13.998 3.82578 12.1642 1.99676 8.96099 1.99676L4.08411 2.00474C3.80383 2.00474 3.61164 1.7252 3.75579 1.48559C4.35639 0.495195 5.44548 0 7.03907 0H12.1642C14.7187 0 16 1.27792 16 3.82578Z" fill="black"/>
</svg>
`
const inActiveChat=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7968 8.02061V11.2154C13.7968 11.4231 13.7888 11.6228 13.7647 11.8144C13.5806 13.9709 12.3073 15.0412 9.96094 15.0412H9.64062C9.44042 15.0412 9.24823 15.137 9.12811 15.2968L8.16715 16.5747C7.74273 17.1418 7.05404 17.1418 6.62962 16.5747L5.66866 15.2968C5.60456 15.2223 5.52622 15.1614 5.43822 15.1175C5.35021 15.0736 5.25432 15.0477 5.15615 15.0412H4.83583C2.28128 15.0412 1 14.4102 1 11.2154V8.02061C1 5.68041 2.08108 4.41047 4.23523 4.22677C4.42742 4.20281 4.62762 4.19482 4.83583 4.19482H9.96094C12.5155 4.19482 13.7968 5.47275 13.7968 8.02061Z" stroke="#767676" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 4.82578V8.02059C17 10.3688 15.9189 11.6307 13.7647 11.8144C13.7888 11.6227 13.7968 11.4231 13.7968 11.2154V8.02059C13.7968 5.47273 12.5155 4.19481 9.96094 4.19481H4.83583C4.62762 4.19481 4.42742 4.2028 4.23523 4.22676C4.41941 2.07825 5.69268 1 8.03903 1H13.1641C15.7187 1 17 2.27792 17 4.82578Z" stroke="#767676" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.2052 9.98535H10.2132M7.40241 9.98535H7.41041M4.59961 9.98535H4.60762" stroke="#767676" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
const activeContact=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.62104 0C3.52912 0 1.82844 1.70409 1.82844 3.80019C1.82844 5.85629 3.43331 7.52038 5.52523 7.59238C5.58911 7.58438 5.65298 7.58438 5.70089 7.59238H5.75678C6.73835 7.55956 7.66871 7.14554 8.35115 6.43785C9.03359 5.73015 9.41461 4.78427 9.41365 3.80019C9.41365 1.70409 7.71297 0 5.62104 0ZM9.67714 9.71969C7.44948 8.23161 3.81656 8.23161 1.57293 9.71969C0.558911 10.3997 0 11.3198 0 12.3038C0 13.2879 0.558911 14.1999 1.56495 14.8719C2.68277 15.624 4.15191 16 5.62104 16C7.09018 16 8.55932 15.624 9.67714 14.8719C10.6832 14.1919 11.2421 13.2799 11.2421 12.2878C11.2341 11.3038 10.6832 10.3917 9.67714 9.71969ZM14.3959 4.27061C14.5237 5.82269 13.4218 7.18276 11.8968 7.36677H11.8569C11.809 7.36677 11.7611 7.36677 11.7212 7.38277C10.9467 7.42277 10.236 7.17476 9.70109 6.71874C10.5235 5.9827 10.9946 4.87864 10.8988 3.67858C10.844 3.05456 10.6325 2.45457 10.284 1.9345C10.7023 1.73055 11.1639 1.63165 11.629 1.64634C12.094 1.66102 12.5485 1.78885 12.9532 2.01878C13.3579 2.24872 13.7008 2.57386 13.9521 2.96617C14.2035 3.35848 14.3558 3.80616 14.3959 4.27061Z" fill="black"/>
<path d="M15.9913 11.6726C15.9274 12.4487 15.4324 13.1207 14.602 13.5767C13.8036 14.0167 12.7975 14.2248 11.7995 14.2008C12.3744 13.6807 12.7097 13.0327 12.7736 12.3447C12.8534 11.3526 12.3823 10.4006 11.4402 9.64053C10.9052 9.2165 10.2824 8.88049 9.60376 8.63248C11.3683 8.12045 13.588 8.46447 14.9533 9.56852C15.6879 10.1606 16.0632 10.9046 15.9913 11.6726Z" fill="black"/>
</svg>
`
const inActiveContact=`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7668 2.61489C14.3898 2.61489 15.6949 3.88289 15.6949 5.44165C15.6949 6.96809 14.44 8.21186 12.8756 8.2684C12.8033 8.26032 12.7303 8.26032 12.658 8.2684M14.3814 15.5372C14.9838 15.416 15.5527 15.1818 16.0212 14.8345C17.3263 13.8896 17.3263 12.3308 16.0212 11.3859C15.561 11.0467 15.0005 10.8206 14.4065 10.6913M6.70144 8.1634C6.61778 8.15533 6.51739 8.15533 6.42536 8.1634C5.46511 8.13193 4.55526 7.74087 3.88847 7.07305C3.22169 6.40523 2.85034 5.51308 2.85307 4.58554C2.85307 2.60682 4.50954 0.999607 6.56758 0.999607C7.55162 0.982471 8.50241 1.34341 9.21078 2.00303C9.91915 2.66265 10.3271 3.56692 10.3448 4.51689C10.3626 5.46687 9.9887 6.38475 9.30543 7.0686C8.62216 7.75246 7.68548 8.14627 6.70144 8.1634ZM2.51843 11.1436C0.493856 12.452 0.493856 14.5842 2.51843 15.8845C4.81909 17.3705 8.59216 17.3705 10.8928 15.8845C12.9174 14.5761 12.9174 12.4439 10.8928 11.1436C8.60052 9.66562 4.82745 9.66562 2.51843 11.1436Z" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`