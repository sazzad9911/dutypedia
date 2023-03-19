import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { RangeSlider } from "@sharcoux/slider";
import SwitchCart from "./SwitchCart";
import { OnlineTutionIcon } from "../../assets/icon";
import DropDown from "../DropDown";
import DropDownRight from "./DropDownRight";

export default function FilterCard() {
  const [range, setRange] = useState([50, 25000]);
  const [online,setOnline]=useState(false)
  const [verified,setVerified]=useState(false)
  return (
    <View
      style={{
        paddingHorizontal: 32,
        paddingTop: 28,
        paddingBottom: 36,
      }}>
      <Text style={[styles.largeText, { textAlign: "center" }]}>Filter</Text>
      <View style={styles.lineBox}>
        <Text style={[styles.largeText]}>Price</Text>
        <View style={{ height: 20 }} />
        <RangeSlider
          range={range} // set the current slider's value
          minimumValue={50} // Minimum value
          maximumValue={25000} // Maximum value
          //step={0} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
          //minimumRange={20 || 0} // Minimum range between the two thumbs
          crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
          outboundColor="#C6F3CE" // The track color outside the current range value
          inboundColor="#4ADE80" // The track color inside the current range value
          thumbTintColor="#4ADE80" // The color of the slider's thumb
          thumbStyle={undefined} // Override the thumb's style
          trackStyle={undefined} // Override the tracks' style
          minTrackStyle={undefined} // Override the tracks' style for the minimum range
          midTrackStyle={undefined} // Override the tracks' style for the middle range
          maxTrackStyle={undefined} // Override the tracks' style for the maximum range
          vertical={false} // If true, the slider will be drawn vertically
          inverted={false} // If true, min value will be on the right, and max on the left
          enabled={true} // If false, the slider won't respond to touches anymore
          trackHeight={5} // The track's height in pixel
          thumbSize={15} // The thumb's size in pixel
          thumbImage={undefined} // An image that would represent the thumb
          slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
          onValueChange={(e) => {
            setRange(e);
          }} // Called each time the value changed. The type is (range: [number, number]) => void
          onSlidingStart={undefined} // Called when the slider is pressed. The type is (range: [number, number]) => void
          onSlidingComplete={undefined} // Called when the press is released. The type is (range: [number, number]) => void
          CustomThumb={() => (
            <View
              style={{
                backgroundColor: "white",
                height: 17,
                width: 17,
                borderRadius: 9,
                borderWidth: 1,
                borderColor: "#4CD964",
              }}></View>
          )} // Provide your own component to render the thumb. The type is a component: ({ value: number, thumb: 'min' | 'max' }) => JSX.Element
          // Add any View Props that will be applied to the container (style, ref, etc)
        />
        <View style={{ height: 20 }} />
        <View style={{
          flexDirection:"row",
          alignItems:"center"
        }}>
          <InputBox value={range[0]}  />
          <Text style={[styles.mediumText,{marginHorizontal:12}]}>to</Text>
          <InputBox onChange={e=>{
            setRange([range[0],parseInt(e)])
          }} value={range[1]}/> 
        </View>
      </View>
      <Text style={[styles.largeText, { marginBottom:32}]}>Status</Text>
      <SwitchCart value={online} onChange={()=>setOnline(t=>!t)} title={"Online Seller"}/>
      <View style={{height:20}}/>
      <SwitchCart value={verified} onChange={()=>setVerified(t=>!t)} title={"Verified Seller"}/>
      <DropDownRight data={["Older","Newest"]} title={"Sort by"}/>
      <Text style={[styles.largeText,{marginTop:32}]}>Location</Text>
    </View>
  );
}
const InputBox = ({value,onChange}) => {
  return (
    <View
      style={{
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius: 4,
        height: 34,
        flex:1
      }}>
      <TextInput value={value.toFixed(0).toString()} onChange={onChange} style={{flex:1,textAlign:"center"}} />
    </View>
  );
};
const styles = StyleSheet.create({
  largeText: {
    fontSize: 20,
    lineHeight: 23,
    fontWeight: "400",
  },
  mediumText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  lineBox: {
    marginVertical: 32,
  },
  checkBox:{
    margin:0
  }
});
