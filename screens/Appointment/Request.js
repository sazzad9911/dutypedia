import React from "react";
import { ScrollView, Text } from "react-native";
import AppointmentCart from "./../../Cart/AppointmentCart";
import { ListView } from "../Appointment";
import Animated,{ SlideInRight, SlideInLeft} from 'react-native-reanimated';

const Request = ({ navigation }) => {
  return (
    <ScrollView>
      <Text
        style={{
          marginVertical: 15,
          marginHorizontal: 20,
          fontSize: 20,
          fontFamily: 'Poppins-Medium'
        }}
      >
        Request
      </Text>
      <ListView onPress={()=>{
        navigation.navigate('Receive')
      }} title="Receive" number={1} />
      <ListView onPress={()=>{
        navigation.navigate('Send')
      }} title="Send" number={0} />
    </ScrollView>
  );
};

export default Request;

const Receive = () => {
  return (
    <Animated.View>
      <ScrollView>
        <Text
          style={{
            marginVertical: 15,
            marginHorizontal: 20,
            fontSize: 20,
          }}
        >
          Receive
        </Text>
        <ListView title="Receive" number={1} />
        <ListView title="Send" number={0} />
      </ScrollView>
    </Animated.View>
  );
};
const Cancel = () => {
  return (
    <Animated.View>

    </Animated.View>
  );
};
