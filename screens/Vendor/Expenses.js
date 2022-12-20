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
  StatusBar
} from "react-native";
import BackHeader from "./../../components/BackHeader";
import DropDown from "./../../components/DropDown";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "../../assets/colors";
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
import { dateConverter, dateDifference, convertDate } from "../../action";
import {
  getExpenses,
  createExpenses,
  deleteExpenses,
  updateExpenses,
} from "../../Class/expenses";
import { useSelector, useDispatch } from "react-redux";

const Expenses = (props) => {
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [ScrollRef, setScrollRef] = React.useState(true);
  const [Data, setData] = React.useState([
    {
      id: 1,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 2,
      name: "dfs",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 3,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 4,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 5,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 6,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 7,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 8,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 9,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
    {
      id: 10,
      name: "fd",
      amount: "877",
      date: "40-374-22",
    },
  ]);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const [Position, setPosition] = React.useState(false);
  const navigation = props.navigation;
  //animated header
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [10, 200],
    outputRange: [0, -300],
  });
  const newScrollY = new Animated.Value(0);
  const [Loader, setLoader] = React.useState(true);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [AllData, setAllData] = React.useState([]);
  const OPTIONS = [
    "All",
    "Last week",
    "Last Month",
    "Last 6 Month",
    "Last year",
  ];
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();

  const styles = StyleSheet.create({
    text: {
      fontSize: 15,
      fontFamily: "Poppins-Medium",
      flex: 1,
      textAlign: "center",
      color: "white",
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
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (event) => {
  //     if (
  //       lastContentOffset.value > event.contentOffset.y &&
  //       isScrolling.value
  //     ) {
  //       translateY.value = 0;
  //       console.log("scrolling up");
  //     } else if (
  //       lastContentOffset.value < event.contentOffset.y &&
  //       isScrolling.value
  //     ) {
  //       translateY.value = -100;
  //       console.log("scrolling down");
  //     }
  //     lastContentOffset.value = event.contentOffset.y;
  //   },
  //   onBeginDrag: (e) => {
  //     isScrolling.value = true;
  //   },
  //   onEndDrag: (e) => {
  //     isScrolling.value = false;
  //   },
  // });
  const isFocused=useIsFocused()
  React.useEffect(() => {
    if (user && vendor) {
      //setLoader(true);
      getExpenses(user.token, vendor.service.id)
        .then((res) => {
          if (res) {
            setLoader(false);
            setData(res.expenses);
            setAllData(res.expenses);
            return;
          }
        })
        .catch((err) => {
          setLoader(false);
          Alert.alert("Opps!", err.response.data.msg);
        });
    }
  }, [Refresh+isFocused]);
  const search = (value) => {
    let arr = AllData.filter((d) => {
      if (d.title.toUpperCase().match(value.toUpperCase())) {
        return d;
      }
    });
    return arr;
  };
  const filter = (index) => {
    //index=0 for all,1 for week, 2 for month, 3 for 1/2 yr, 4 for 1 yr
    let date = new Date();
    date = dateConverter(date);
    if (index === 0) {
      return AllData;
    } else if (index === 1) {
      let arr = AllData.filter((d) => {
        let difference = dateDifference(d.date, date);
        if (difference >= 0 && difference <= 7) {
          return d;
        }
      });
      return arr;
    } else if (index === 2) {
      let arr = AllData.filter((d) => {
        let difference = dateDifference(d.date, date);
        if (difference >= 0 && difference <= 30) {
          return d;
        }
      });
      return arr;
    } else if (index === 3) {
      let arr = AllData.filter((d) => {
        let difference = dateDifference(d.date, date);
        if (difference >= 0 && difference <= 183) {
          return d;
        }
      });
      return arr;
    } else if (index === 4) {
      let arr = AllData.filter((d) => {
        let difference = dateDifference(d.date, date);
        if (difference >= 0 && difference <= 365) {
          return d;
        }
      });
      return arr;
    }
  };
  const onChange = (val) => {
    setLoader(true);
    createExpenses(user.token, {
      amount: parseInt(val.amount),
      title: val.name,
      date: val.date,
      serviceId: vendor.service.id,
    })
      .then((res) => {
        setLoader(false);
        if (res) {
          navigation.goBack();
          return;
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.response.data);
        Alert.alert("Opps!", err.response.data.msg);
      });
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: textColor }}>Loading...</Text>
      </View>
    );
  }
  if (Array.isArray(AllData) && AllData.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddExpenses", {
              onChange: onChange,
              value: null,
            });
          }}
          style={{
            width: 80,
            height: 80,
            backgroundColor: primaryColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <AntDesign name="plus" size={50} color="#707070" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Poppins-Medium",
            color: textColor,
            marginTop: 15,
          }}
        >
          Create New Notice
        </Text>
      </View>
    );
  }
  const scroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y: newScrollY } },
      },
    ],
    {
      useNativeDriver: true, // <- Native Driver used for animated events
    }
  );

  return (
    <View style={{
      flex:1,
    }}>
      <View style={{height:25}}/>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            {
              transform: [{ translateY: translateY }],
              backgroundColor: "#f5f5f5",
              paddingTop: 0,
              left: 0,
              right: 0,
            },
          ]}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingBottom:10
            }}
          >
            <BackHeader
              onChange={(val) => {
                setData(search(val));
              }}
              placeholder="Search"
              {...props}
              inputWidth={80}
              title="Expenses"
            />
            <DropDown
              onChange={(val) => {
                let index = OPTIONS.indexOf(val);
                setData(filter(index));
              }}
              DATA={OPTIONS}
              style={{
                marginHorizontal: 20,
              }}
              placeholder="Filter By"
            />
          </View>
        </Animated.View>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddExpenses", {
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
                Add Expenses
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
              paddingVertical: 10,
            }}
          >
            <Text style={styles.text}>Date</Text>
            <Text style={styles.text}>Name Of Expenses</Text>
            <Text style={styles.text}>Amount</Text>
          </View>
          {Data &&
            Data.map((doc, i) => (
              <Cart
                {...props}
                value={doc}
                key={i}
                setData={setLoader}
                Data={Data}
                i={i}
              />
            ))}
          <View style={{ height: 50 }} />
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 0,
            backgroundColor: backgroundColor,
            borderRadius: 5,
            paddingHorizontal: 5,
            paddingVertical: 5,
            bottom: 0,
            marginBottom: 10,
            position: "absolute",
          }}
        >
          <Text style={styles.text}>Total :</Text>
          <Text style={styles.text}></Text>
          <Text style={styles.text}>{total(Data)}৳</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Expenses;

import { Menu } from "react-native-paper";
import SubHeader from "./../../components/SubHeader";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import DateTime from "./../Seller/DateTime";
import AlertModal from "./components/AlertModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IconButton from "../../components/IconButton";
import { useIsFocused } from "@react-navigation/native";

const Cart = ({ value, setData, Data, i, navigation }) => {
  const [Visible, setVisible] = React.useState(false);
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [AlertVisible, setAlertVisible] = React.useState(false);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();

  const styles = StyleSheet.create({
    text: {
      fontSize: 15,
      fontFamily: "Poppins-Medium",
      flex: 1,
      textAlign: "center",
      color: "white",
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
  });

  const Delete = () => {
    deleteExpenses(user.token, value.id)
      .then((res) => {
        if (res) {
          setData((val) => !val);
        }
      })
      .catch((err) => {
        console.warn(err.response.data.msg);
      });
  };
  const edit = (val) => {
    let options = {
      expenseId: value.id,
      title: val.name,
      amount: parseInt(val.amount),
      date: val.date,
      serviceId: vendor.service.id,
    };
    updateExpenses(user.token, options)
      .then((res) => {
        if (res) {
          setData((val) => !val);
          navigation.goBack();
        }
      })
      .catch((err) => {
        console.warn(err.response.data.msg);
      });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
        paddingBottom: 10,
      }}
    >
      <Text style={styles.text2}>{Data[i].date}</Text>
      <View style={{ width: 1, backgroundColor: "#e5e5e5" }} />
      <Text style={styles.text2}>{Data[i].title}</Text>
      <View style={{ width: 1, backgroundColor: "#e5e5e5" }} />
      <Text style={styles.text2}>{Data[i].amount}</Text>

      <Menu
        contentStyle={{
          backgroundColor: primaryColor,
        }}
        visible={Visible}
        onDismiss={() => {
          setVisible(!Visible);
        }}
        anchor={
          <Entypo
            onPress={() => {
              setVisible(!Visible);
            }}
            name="dots-three-vertical"
            size={22}
            color={textColor}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            navigation.navigate("AddExpenses", {
              onChange: edit,
              value: value,
            });
            setVisible(!Visible);
          }}
          title="Edit"
        />
        <Menu.Item
          onPress={() => {
            //Delete();
            setAlertVisible(true);
            setVisible(!Visible);
          }}
          title="Delete"
        />
      </Menu>
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
    </View>
  );
};
//setModalVisible, onChange, value,
export const AddExpenses = (props) => {
  const onChange = props.route.params.onChange;
  const value = props.route.params.value;
  let date = new Date();
  const [Day, setDay] = React.useState(dateConverter(date));
  const [Month, setMonth] = React.useState();
  const [Year, setYear] = React.useState();
  const [DayError, setDayError] = React.useState();
  const [MonthError, setMonthError] = React.useState();
  const [YearError, setYearError] = React.useState();
  const [Name, setName] = React.useState();
  const [Amount, setAmount] = React.useState();
  const [Visible, setVisible] = React.useState(false);
  const navigation = props.navigation;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();
  const styles = StyleSheet.create({
    text: {
      fontSize: 15,
      fontFamily: "Poppins-Medium",
      flex: 1,
      textAlign: "center",
      color: "white",
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
  });

  React.useEffect(() => {
    if (value) {
      //console.log(value);
      setName(value.title);
      setAmount(value.amount.toString());
      let newDate = value.date.split("-");
      setDay(value.date);
      setMonth(DateTime.month[parseInt(newDate[1]) - 1]);
      setYear(newDate[2]);
    }
  }, [value]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView>
        <Input
          value={Name}
          onChange={(val) => {
            setName(val);
          }}
          style={[
            styles.input,
            {
              marginTop: 25,
            },
          ]}
          placeholder="Name Of Expenses"
        />
        <Input
          value={Amount}
          onChange={(val) => {
            setAmount(val);
          }}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Amount"
        />
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
        <IconButton
          onPress={() => {
            if (onChange) {
              onChange({
                name: Name,
                amount: Amount,
                date: Day,
                id: uuid.v4(),
              });
            }

            // setModalVisible(false);
          }}
          disabled={Day && Name && Amount ? false : true}
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius: 5,
            backgroundColor:
              Day && Name && Amount ? backgroundColor : "#707070",
            borderWidth: 0,
            height: 45,
            marginTop: 25,
            color: Day && Name && Amount ? "white" : "black",
          }}
          title="Save"
        />
        <InstructionCart title={"Expencess Name?"} />
        <InstructionCart title={"Ammount?"} />
        <InstructionCart title={"Date?"} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const InstructionCart = ({ title }) => {
  const [Visible, setVisible] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const backgroundColor = colors.getBackgroundColor();
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
