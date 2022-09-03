import React from "react";
import { ScrollView,Text } from "react-native";
import AppointmentCart from './../../Cart/AppointmentCart';

const Send = ({navigation,route}) => {
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
        Sent
      </Text>
      <AppointmentCart request={true} status={'ok'} onPress={()=>{
        navigation.navigate('AppointmentDetails',{status: 'ok',request: true,sent: true})
      }}/>
      <AppointmentCart request={true} status={true} onPress={()=>{
        navigation.navigate('AppointmentDetails',{status:'df',request: true,sent: true})
      }}/>
      <AppointmentCart request={true} onPress={()=>{
        navigation.navigate('AppointmentDetails',{request: true,sent: true})
      }}/>
    </ScrollView>
  );
};

export default Send;

