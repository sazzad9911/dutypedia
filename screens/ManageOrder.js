import React from "react";
import { View,Text ,TouchableOpacity,StyleSheet} from "react-native";
import { AntDesign } from '@expo/vector-icons';

const ManageOrder = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          margin: 10,
        }}
      >
        Order
      </Text>
      <TouchableOpacity style={styles.box}>
        <Text
          style={{
            flex: 2,
            marginLeft: 30,
          }}
        >
          Bargaining
        </Text>
        <Text
          style={{
            marginRight: 20,
          }}
        >
          0
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Text
          style={{
            flex: 2,
            marginLeft: 30,
          }}
        >
          Fixed Price
        </Text>
        <Text
          style={{
            marginRight: 20,
          }}
        >
          0
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Text
          style={{
            flex: 2,
            marginLeft: 30,
          }}
        >
          Package
        </Text>
        <Text
          style={{
            marginRight: 20,
          }}
        >
          0
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Text
          style={{
            flex: 2,
            marginLeft: 30,
          }}
        >
          Installment
        </Text>
        <Text
          style={{
            marginRight: 20,
          }}
        >
          0
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Text
          style={{
            flex: 2,
            marginLeft: 30,
          }}
        >
          Subscription
        </Text>
        <Text
          style={{
            marginRight: 20,
          }}
        >
          0
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ManageOrder;
const styles = StyleSheet.create({
    box:{
      height:50,
     
      flexDirection:'row',
      borderColor:'#808080',
      borderWidth:1,
      justifyContent:'center',
      alignItems:'center',
      padding:10,
      }
  })
