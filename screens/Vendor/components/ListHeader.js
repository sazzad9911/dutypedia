import { Animated, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../../components/Button";
import {Color} from "../../../assets/colors"
import { useSelector } from "react-redux";
import React from "react"

function ListHeader({ state, descriptors, navigation, position }) {
    const isDark=useSelector(state=>state.isDark)
    const colors=new Color(isDark)
    const textColor=colors.getTextColor()
    const assentColor=colors.getAssentColor()
    const backgroundColor=colors.getBackgroundColor()
    const primaryColor=colors.getPrimaryColor()
    const orders=useSelector(state=>state.orders)
    const [scrollRef,setScrollRef]=React.useState();
    const  [layout,setLayout]=React.useState()
    const [initialState, setInitialState] = React.useState([
        
        {
          title: "Fixed",
          value: false,
          type: "ONETIME",
        },
        {
          title: "Installment",
          value: false,
          type: "INSTALLMENT",
        },
        {
          title: "Subscription",
          value: false,
          type: "SUBS",
        },
        {
          title: "Package",
          value: false,
          type: "PACKAGE",
        },
      ]);

    React.useEffect(()=>{
        //console.log(props)

        if (layout && scrollRef) {
          scrollRef.scrollTo({ x: state.index * 100, animated: true });
        }
      },[state.index])

  return (
    <View style={{
        height:39,
        borderBottomColor:"#F1EFEF",
        borderBottomWidth:1
    }}>
      <ScrollView ref={ref=>setScrollRef(ref)} showsHorizontalScrollIndicator={false} horizontal={true}>
      <View style={{ width: 10 }} />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          });

          return (
            <View key={index} onLayout={e=>setLayout(e.nativeEvent.layout)}
              style={{
                alignItems: "center",
                width: 90,
              }}
            >
              <Button
                onPress={onPress}
                style={{
                  color: textColor,
                  borderWidth: 0,
                  backgroundColor: primaryColor,
                  borderBottomWidth: 0,
                  borderRadius: 0,
                }}
                active={isFocused ? true : false}
                title={`${initialState[index].title}`}
              />
              {isFocused && (
                <Animated.View
                  style={[{
                    width: "50%",
                    borderBottomColor: "#AC5DCB",
                    borderBottomWidth: 3,
                    transform:[{
                        scaleX:opacity
                    }]
                  }]}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
export default ListHeader;
