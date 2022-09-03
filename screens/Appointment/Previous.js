import React from "react";
import { ScrollView,Text } from "react-native";
import AppointmentCart from './../../Cart/AppointmentCart';

const Previous = ({navigation,route}) => {
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
        Previous
      </Text>
      <AppointmentCart status={'ok'} onPress={()=>{
        navigation.navigate('AppointmentDetails',{status: 'ok'})
      }}/>
      <AppointmentCart status={true} onPress={()=>{
        navigation.navigate('AppointmentDetails',{status:'df'})
      }}/>
      <AppointmentCart onPress={()=>{
        navigation.navigate('AppointmentDetails')
      }}/>
    </ScrollView>
  );
};

export default Previous;

