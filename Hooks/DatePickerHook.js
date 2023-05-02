import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
const { width, height } = Dimensions.get("window");
import OutsideView from 'react-native-detect-press-outside';
import IconButton from "../components/IconButton";

export default function DatePickerHook({ date, mode, onChange,onClose }) {
    const childRef = React.useRef();

  return (
    <OutsideView style={{
        flex:1
    }}
      childRef={childRef}
      onPressOutside={() => {
        if(onClose){
            onClose()
        }
      }}
    >
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor:"#00000032"
      }}>
      <View ref={childRef} style={{
        backgroundColor:"white",
        width:"100%",
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        paddingTop:10,
        paddingBottom:10
      }}>
        <RNDateTimePicker onChange={(e)=>{
            if(onClose&&onChange){
                onChange(e)
                onClose()
            }
        }} value={new Date()} display="spinner" />
        <IconButton active={true} style={styles.button} title={"Done"}/>
        <IconButton style={styles.button} onPress={onClose} title={"Cancel"}/>
      </View>
    </View>
    </OutsideView>
  );
}
const styles=StyleSheet.create({
    button:{
        marginHorizontal:20,
        marginVertical:10
    }
})
