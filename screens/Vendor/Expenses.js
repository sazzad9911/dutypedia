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
} from "react-native";
import BackHeader from "./../../components/BackHeader";
import DropDown from "./../../components/DropDown";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor, textColor, backgroundColor } from "../../assets/colors";
import { Entypo } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import Animated, { StretchInY } from "react-native-reanimated";
import uuid from 'react-native-uuid';

const Expenses = (props) => {
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [Data, setData] = React.useState([
    {
      name: "Rent",
      amount: "5000",
      date: "12-09-2022",
      id:uuid.v4(),
    },
  ]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
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
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
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
            borderRadius: 5,
          }}
        >
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}>Name Of Expenses</Text>
          <Text style={styles.text}>Amount</Text>
        </View>
        {Data&&Data.map((doc,i)=>(
            <Cart value={doc} key={i} setData={setData} Data={Data} i={i} />
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
          <Text style={styles.text}>{total(Data)}৳</Text>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        visible={ModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddExpenses onChange={val=>{
            setData(d=>[...d,val])
        }} setModalVisible={setModalVisible} />
      </Modal>
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

const Cart = ({value,setData,Data,i}) => {
  const [Visible, setVisible] = React.useState(false);
  const [ModalVisible, setModalVisible]= React.useState(false);

  const Delete=() => {
    setData(val=>{
        return val.filter(d=>d.id!=value.id);
    })
  }
  const edit=(val) => {
    let options={
        id:value.id,
        name:val.name,
        amount:val.amount,
        date:val.date
    }
    setData(val=>{
        val.forEach((d,i)=>{
            if(d.id==value.id){
                val[i]=options
            }
        })
        return val
    })
  }
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 10,
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
        <Menu.Item onPress={() => {
            setModalVisible(true)
            setVisible(!Visible)
        }} title="Edit" />
        <Menu.Item onPress={() => {
            Delete()
        }} title="Delete" />
      </Menu>
      <Modal
        animationType="fade"
        visible={ModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddExpenses value={value} onChange={val=>{
            edit(val)
        }} setModalVisible={setModalVisible} />
      </Modal>
    </View>
  );
};
const AddExpenses = ({ setModalVisible, onChange,value }) => {
  const [Day, setDay] = React.useState();
  const [Month, setMonth] = React.useState();
  const [Year, setYear] = React.useState();
  const [DayError, setDayError] = React.useState();
  const [MonthError, setMonthError] = React.useState();
  const [YearError, setYearError] = React.useState();
  const [Name, setName] = React.useState();
  const [Amount, setAmount] = React.useState();

  React.useEffect(() => {
    if(value){
        setName(value.name);
        setAmount(value.amount);
        let newDate=value.date.split('-');
        setDay(newDate[0])
        setMonth(DateTime.month[parseInt(newDate[1])-1])
        setYear(newDate[2])
    }
  },[value])

  return (
    <View style={{ flex: 1 }}>
      <SubHeader
        onPress={() => {
          setModalVisible(false);
        }}
        style={{
          paddingTop: 10,
        }}
        title="Create New Expenses List"
      />
      <ScrollView>
        <Input value={Name}
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
        <Input value={Amount}
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
          <DropDown
            value={Day}
            error={DayError}
            onChange={(val) => {
              setDay(val);
            }}
            style={{
              marginTop: 10,
            }}
            placeholder="Date"
            DATA={DateTime.day}
          />
          <DropDown
            value={Month}
            error={MonthError}
            onChange={(val) => {
              setMonth(val);
            }}
            style={{
              marginTop: 10,
              marginLeft: 10,
            }}
            placeholder="Month"
            DATA={DateTime.month}
          />
          <DropDown
            value={Year}
            error={YearError}
            onChange={(val) => {
              setYear(val);
            }}
            style={{
              marginTop: 10,
              marginLeft: 10,
            }}
            placeholder="Year"
            DATA={DateTime.year()}
          />
        </View>
        <Button
          onPress={() => {
            if (onChange) {
              onChange({
                name: Name,
                amount: Amount,
                date: `${Day}-${DateTime.month.indexOf(Month)+1}-${Year}`,
                id:uuid.v4(),
              });
            }
            setModalVisible(false);
          }}
          disabled={Day && Month && Year && Name && Amount ? false : true}
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius: 5,
            backgroundColor:
              Day && Month && Year && Name && Amount
                ? backgroundColor
                : "#707070",
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
const total=(arr)=>{
    let amount=0;
    arr.forEach(doc=>{
        
        amount+=parseInt(doc.amount);
    })
    return amount;
}