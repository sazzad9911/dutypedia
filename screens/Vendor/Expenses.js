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
} from "react-native";
import BackHeader from "./../../components/BackHeader";
import DropDown from "./../../components/DropDown";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor, textColor, backgroundColor } from "../../assets/colors";
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

const Expenses = (props) => {
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [ScrollRef, setScrollRef] = React.useState(true);
  const [Data, setData] = React.useState([
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
    },
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id: uuid.v4(),
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
    inputRange: [0, 200],
    outputRange: [0, -200],
  });

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
  const onChange = (val) => {
    return setData((d) => [...d, val]);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      
      <ScrollView
        style={{ flexGrow: 0 }}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        showsVerticalScrollIndicator={false}
      >
      <View style={{height:190}}/>
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
              justifyContent: "space-between",
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
              setData={setData}
              Data={Data}
              i={i}
            />
          ))}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 20,
            backgroundColor: backgroundColor,
            borderRadius: 5,
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}
        >
          <Text style={styles.text}>Total :</Text>
          <Text style={styles.text}></Text>
          <Text style={styles.text}>{total(Data)}৳</Text>
        </View>
      </ScrollView>
      <Animated.View
        style={[
          { transform: [{ translateY: translateY }],
          zIndex:200,
          backgroundColor:'#f5f5f5',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          },
        ]}
      >
        <View style={{
          height:200,
          
          backgroundColor:'#fbfbfb'
        }}>
          <BackHeader
            placeholder="Search"
            {...props}
            inputWidth={80}
            title="Expenses"
          />
          <DropDown
            DATA={["All", "Price"]}
            style={{
              marginHorizontal: 20,
            }}
            placeholder="Filter By"
          />
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default Expenses;
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

import { Menu } from "react-native-paper";
import SubHeader from "./../../components/SubHeader";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import DateTime from "./../Seller/DateTime";
import AlertModal from "./components/AlertModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Cart = ({ value, setData, Data, i, navigation }) => {
  const [Visible, setVisible] = React.useState(false);
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [AlertVisible, setAlertVisible] = React.useState(false);

  const Delete = () => {
    setData((val) => {
      return val.filter((d) => d.id != value.id);
    });
  };
  const edit = (val) => {
    let options = {
      id: value.id,
      name: val.name,
      amount: val.amount,
      date: val.date,
    };
    return setData((val) => {
      val.forEach((d, i) => {
        if (d.id == value.id) {
          val[i] = options;
        }
      });
      return val;
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
      <Text style={styles.text2}>{Data[i].name}</Text>
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

  React.useEffect(() => {
    if (value) {
      setName(value.name);
      setAmount(value.amount);
      let newDate = value.date.split("-");
      setDay(value.date);
      setMonth(DateTime.month[parseInt(newDate[1]) - 1]);
      setYear(newDate[2]);
    }
  }, [value]);

  return (
    <View style={{ flex: 1 }}>
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
          <Button
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
        <Button
          onPress={() => {
            if (onChange) {
              onChange({
                name: Name,
                amount: Amount,
                date: Day,
                id: uuid.v4(),
              });
            }
            navigation.goBack();
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
          }}
          title="Save"
        />
        <InstructionCart title={"Expencess Name?"} />
        <InstructionCart title={"Ammount?"} />
        <InstructionCart title={"Date?"} />
      </ScrollView>
    </View>
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
