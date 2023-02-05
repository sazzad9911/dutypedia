import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Alert,
  RefreshControl,
} from "react-native";
import BackHeader from "./../../components/BackHeader";
import DropDown from "./../../components/DropDown";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { primaryColor, textColor, backgroundColor, Color } from "../../assets/colors";
import { Entypo } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import {
  StretchInY,
  FadeIn,
  Easing,
  useAnimatedScrollHandler,
  Extrapolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import uuid from "react-native-uuid";
import { dateConverter } from "../../action";
import {
  createNotice,
  getNotice,
  deleteNotice,
  updateNotice,
} from "../../Class/notice";
import { useDispatch, useSelector } from "react-redux";

const Notice = (props) => {
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [ScrollRef, setScrollRef] = React.useState(true);
  const [Data, setData] = React.useState([]);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const [Position, setPosition] = React.useState(false);
  const navigation = props.navigation;
  //animated header
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 150);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
  });
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [Loader, setLoader] = React.useState(true);
  const [AllData, setAllData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const isFocused=useIsFocused()

  React.useEffect(() => {
    //console.warn("ok")
    setLoader(true);
    setData([]);
    setAllData([]);
    if (vendor && user) {
      getNotice(user.token, vendor.service.id).then((res) => {
        setLoader(false);
        if (res) {
          setData(res.notices);
          setAllData(res.notices);
        }
      });
    }
  }, [Refresh,isFocused]);

  const onChange = (val) => {
    createNotice(user.token, {
      subject: val.subject,
      message: val.description,
      record: val.record,
      authorName: val.name,
      authorPosition: val.position,
      date: val.date,
      serviceId: vendor.service.id,
    })
      .then((res) => {
        if (res) {
          setLoader(!Loader);
          navigation.goBack();
        }
      })
      .catch((err) => {
        Alert.alert("Opps!", err.response.data);
      });
  };
  const search = (val) => {
    return AllData.filter((d) => {
      if (d.record.toUpperCase().match(val.toUpperCase())) {
        return d;
      }
    });
  };
  if (!AllData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <ActivityLoader/>
      </View>
    );
  }
  if (Array.isArray(AllData) && AllData.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{
          fontSize:18
        }}>No Notice Found!</Text>
      </View>
    );
  }
  return (
    <ScrollView
      scrollEnabled={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      
      scrollEventThrottle={16}
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y);
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={{ height: 150 }} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddNotice", {
              onChange: onChange,
              value: null,
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Medium",
              }}
            >
              Add Notice
            </Text>
            <View style={{ width: 10 }} />
            <AntDesign name="pluscircleo" size={24} color={backgroundColor} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            alignItems: "center",
            marginVertical: 10,
            backgroundColor: backgroundColor,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.text}>Id/ Record</Text>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}>Notice</Text>
          <Text style={styles.text}></Text>
        </View>
        {Data&&
          Data.map((doc, i) => (
            <Cart
              {...props}
              value={doc}
              key={i}
              setData={setLoader}
              Data={Data}
              i={i}
            />
          ))
        }
      </View>
      <Animated.View
        style={[
          {
            transform: [{ translateY: translateY }],
            zIndex: 200,
            backgroundColor: "#f5f5f5",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          },
        ]}
      >
        <View
          style={{
            height: 150,

            backgroundColor: "#fbfbfb",
          }}
        >
          <BackHeader
            onChange={(val) => {
              if (!val) {
                setData(AllData);
                return;
              }
              setData(search(val));
            }}
            placeholder="Search"
            {...props}
            inputWidth={80}
            title="Notice"
          />
          {/* <DropDown
            DATA={["All", "Price"]}
            style={{
              marginHorizontal: 20,
            }}
            placeholder="Filter By"
          /> */}
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default Notice;
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    flex: 1,
    textAlign: "center",
    color: "white",
    marginVertical: 10,
  },
  text2: {
    fontSize: 15,
    fontFamily: "Poppins-Light",
    flex: 1,
    textAlign: "center",
    color: textColor,
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
  },
  text3: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: textColor,
  },
});

import { Menu } from "react-native-paper";
import SubHeader from "./../../components/SubHeader";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import DateTime from "./../Seller/DateTime";
import AlertModal from "./components/AlertModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TextArea from "./../../components/TextArea";
import SuggestionBox, { MainOptions } from "./../../components/SuggestionBox";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import ActivityLoader from "../../components/ActivityLoader";
import { useIsFocused } from "@react-navigation/native";

const Cart = ({ value, setData, Data, i, navigation }) => {
  const [Visible, setVisible] = React.useState(false);
  const [ModalVisible, setModalVisible] = React.useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
        paddingBottom: 10,
        alignItems: "center",
      }}
    >
      <Text numberOfLines={1} style={styles.text2}>
        {value.record}
      </Text>
      <View
        style={{
          width: 1,
          backgroundColor: "#e5e5e5",
          height: 20,
          marginHorizontal: 5,
        }}
      />
      <Text numberOfLines={1} style={styles.text2}>
        {value.date}
      </Text>
      <View
        style={{
          width: 1,
          backgroundColor: "#e5e5e5",
          height: 20,
          marginHorizontal: 5,
        }}
      />
      <Text numberOfLines={1} style={styles.text2}>
        {value.message}
      </Text>
      <IconButton
        onPress={() => {
          navigation.navigate("ViewCart", {
            value: value,
            setData: setData,
          });
        }}
        style={{
          borderRadius: 5,
          color: "white",
          backgroundColor: backgroundColor,
          borderWidth: 0,
          height: 40,
          marginLeft: 5,
        }}
        title="View"
      />
    </View>
  );
};
//setModalVisible, onChange, value,
export const AddNotice = (props) => {
  const onChange = props.route.params.onChange;
  const value = props.route.params.value;
  let date = new Date();
  const [Day, setDay] = React.useState(dateConverter(date));
  const [Visible, setVisible] = React.useState(false);
  const navigation = props.navigation;
  const DATA = [
    {
      title: "Administrative Assistant",
      value: "Administrative Assistant",
    },
    {
      title: "Executive Assistant",
      value: "Executive Assistant",
    },
    {
      title: "Marketing Manager",
      value: "Marketing Manager",
    },
    {
      title: "Software Engineer",
      value: "Software Engineer",
    },
    {
      title: "Sales Manager",
      value: "Sales Manager",
    },
    {
      title: "Office Assistant",
      value: "Office Assistant",
    },
    {
      title: "General Manager",
      value: "General Manager",
    },
    {
      title: "Head of Department",
      value: "Head of Department",
    },
  ];
  const [Data, setData] = React.useState([]);
  const [Position, setPosition] = React.useState();
  const [Record, setRecord] = React.useState();
  const [Subject, setSubject] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Name, setName] = React.useState();
  const isDark=useSelector(state=>state.isDark)
  const colors=new Color(isDark)
  const backgroundColor=colors.getBackgroundColor()

  React.useEffect(() => {
    if (value) {
      setDay(value.date);
      setName(value.authorName);
      setRecord(value.record);
      setDescription(value.message);
      setPosition(value.authorPosition);
      setSubject(value.subject);
    }
  }, [value]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Text
          style={{
            color: textColor,
            fontSize: 15,
            fontFamily: "Poppins-Medium",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          Select Date
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onPress={() => {
              setVisible(true);
            }}
            style={{
              borderRadius: 5,
              borderColor: "#e5e5e5",
              height: 42,
              marginTop: 10,
              color: textColor,
              width: 100,
            }}
            title={Day}
          />
          <DateTimePickerModal
            isVisible={Visible}
            mode="date"
            onConfirm={(date) => {
              setDay(dateConverter(date));
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
          />
        </View>
        <Input
          value={Record}
          onChange={(val) => {
            setRecord(val);
          }}
          style={[
            styles.input,
            {
              marginTop: 25,
            },
          ]}
          placeholder="Id/ Record Number"
        />
        <Input
          value={Subject}
          onChange={(val) => {
            setSubject(val);
          }}
          style={styles.input}
          placeholder="Subject"
        />
        <View style={{ paddingHorizontal: 20 }}>
          <TextArea
            value={Description}
            onChange={(val) => {
              setDescription(val);
            }}
            placeholder="Describe your notice"
          />
        </View>
        <View>
          <Text
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              fontSize: 15,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            Your Personal Information
          </Text>
          <Input
            value={Name}
            onChange={(val) => {
              setName(val);
            }}
            style={{
              padding: 0,
              borderWidth: 1,
              width: 200,
            }}
            placeholder="Your Name"
          />
          <View
            style={{
              marginLeft: 20,
            }}
          >
            <SuggestionBox
              value={Position}
              placeholder="Position"
              onChange={(val) => {
                setData(val);
              }}
              onSelect={(val) => {
                setPosition(val);
              }}
              DATA={DATA}
              style={{
                width: 200,
                marginTop: 10,
              }}
              returnKeyType="next"
            />
          </View>
        </View>
        <IconButton
          onPress={() => {
            if (onChange) {
              try {
                onChange({
                  name: Name,
                  date: Day,
                  id: uuid.v4(),
                  record: Record,
                  subject: Subject,
                  description: Description,
                  position: Position,
                });
              } catch (e) {
                console.log(e.message);
              }
            }

            // setModalVisible(false);
          }}
          disabled={
            Day && Name && Subject && Position && Description && Record
              ? false
              : true
          }
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius: 5,
            backgroundColor:
              Day && Name && Subject && Position && Description && Record
                ? backgroundColor
                : "#707070",
            borderWidth: 0,
            height: 45,
            marginTop: 25,
          }}
          title="Save"
        />
        <MainOptions
          setValue={(val) => {
            //setSelectedItem(value);
            setPosition(val);
          }}
          setData={setData}
          style={{
            marginTop: Platform.OS == "ios" ? 448 : 455,
            marginLeft: 20,
            width: 200,
            maxHeight: 90,
          }}
          Data={Data}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const InstructionCart = ({ title }) => {
  const [Visible, setVisible] = React.useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setVisible(!Visible);
      }}
      style={{
        width: width - 40,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Medium",
            color: textColor,
          }}
        >
          {title}
        </Text>
        <AntDesign name={Visible ? "up" : "down"} size={22} color={textColor} />
      </View>
      {Visible && (
        <Animated.View entering={StretchInY}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Light",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Harum, voluptate?
          </Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};
const total = (arr) => {
  let amount = 0;
  arr.forEach((doc) => {
    amount += parseInt(doc.amount);
  });
  return amount;
};
export const ViewCart = (props) => {
  const [AlertVisible, setAlertVisible] = React.useState(false);
  const setData = props.route.params.setData;
  const navigation = props.navigation;
  const [value, setValue] = React.useState(props.route.params.value);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);

  React.useEffect(() => {
    //console.log(value.id)
  }, []);

  const Delete = () => {
    deleteNotice(user.token, value.id).then((res) => {
      if (res) {
        setData((val) => !val);
        navigation.goBack();
        return;
      }
      Alert.alert("Opps!", "Something went wrong");
    });
  };
  const Edit = (val) => {
    let options = {
      noticeId: value.id,
      authorName: val.name,
      record: val.record,
      date: val.date,
      authorPosition: val.position,
      message: val.description,
      subject: val.subject,
    };
    //setValue(options);
    updateNotice(user.token, options)
      .then((res) => {
        if (res) {
          setValue(res.data.notice);
          setData((val) => !val);
          navigation.goBack();
        }
      })
      .catch((err) => {
        Alert.alert("Opps!", err.response.data);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          justifyContent: "space-between",
          backgroundColor: primaryColor,
          paddingBottom: 10,
          paddingTop:10
        }}
      >
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          name="ios-chevron-back-outline"
          size={24}
          color="#707070"
        />
        {setData && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 70,
            }}
          >
            {/* <Ionicons name="md-print" size={24} color="#707070" /> */}
            <AntDesign
              onPress={() => {
                navigation.navigate("AddNotice", {
                  onChange: Edit,
                  value: value,
                });
              }}
              name="edit"
              size={24}
              color="#707070"
            />
            <AntDesign
              onPress={() => {
                setAlertVisible(true);
              }}
              name="delete"
              size={24}
              color="#707070"
            />
          </View>
        )}
      </View>
      <ScrollView
        bounces={false}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={[
              styles.text3,
              {
                marginTop: 10,
              },
            ]}
          >
            Record Number
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                styles.text3,
                {
                  fontSize: 14,
                  fontFamily: "Poppins-Light",
                },
              ]}
            >
              {value.record}
            </Text>
            <Text style={styles.text3}>Date: {value.date}</Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#e5e5e5",
              marginVertical: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            SUBJECT: {value.subject}
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: "#e5e5e5",
              marginVertical: 10,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            {value.message}
          </Text>
          <View
            style={{
              alignItems: "flex-end",
              marginVertical: 10,
            }}
          >
            <Text style={styles.text3}>{value.authorName}</Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Light",
                color: textColor,
              }}
            >
              {value.authorPosition}
            </Text>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={AlertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <AlertModal
          title="Hey"
          subTitle={"Are you sure want to delete this?"}
          onChange={(e) => {
            if (e == "ok") {
              Delete();
              setAlertVisible(false);
            } else {
              setAlertVisible(false);
            }
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};
