import React from "react";
import { ScrollView,Text } from "react-native";
import AppointmentCart from './../../Cart/AppointmentCart';

const Upcoming = ({navigation}) => {
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
        Appointment
      </Text>
      <AppointmentCart  onPress={()=>{
        navigation.navigate('AppointmentDetails')
      }}/>
      <AppointmentCart  onPress={()=>{
        navigation.navigate('AppointmentDetails')
      }}/>
      <AppointmentCart onPress={()=>{
        navigation.navigate('AppointmentDetails')
      }}/>
    </ScrollView>
  );
};

export default Upcoming;

