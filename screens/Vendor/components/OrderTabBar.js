import React from "react"
import {View,Text,ScrollView} from "react-native"
import Button from "../../../components/Button";
import { useDispatch,useSelector } from "react-redux";
import { Color } from "../../../assets/colors";

const OrderTabBar=(props)=>{
    const [initialState, setInitialState] = React.useState([
      {
        title: "Bargaining",
        value: true,
        type: "STARTING",
      },
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
    const orders=useSelector(state=>state.orders)
    const [Active,setActive]=React.useState('STARTING')
    const [scrollRef,setScrollRef]=React.useState();
    const  [layout,setLayout]=React.useState()
    const isDark=useSelector(state=>state.isDark);
    const  colors=new Color(isDark)
    const textColor=colors.getTextColor();
    const primaryColor=colors.getPrimaryColor()

    const ref=React.useRef()
    React.useEffect(()=>{
      //console.log(props)
      setActive(props.state.routeNames[props.state.index])
      if (layout && scrollRef) {
        scrollRef.scrollTo({ x: props.state.index * 100, animated: true });
      }
    },[props.state.index])
    return(
      <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#F1EFEF",
        marginVertical: 10,
        width:"100%"
      }}
    >
      <ScrollView  ref={ref=>setScrollRef(ref)}
        
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View style={{ width: 10 }} />
        {initialState &&
          initialState.map((doc, i) => (
            <View onLayout={e=>setLayout(e.nativeEvent.layout)}
              style={{
                alignItems: "center",
                width: 120,
              }}
              key={i}
            >
              <Button
                onPress={() => {
                  props.navigation.navigate(doc.type)
                }}
                style={{
                  color: textColor,
                  borderWidth: 0,
                  backgroundColor: primaryColor,
                  borderBottomWidth: 0,
                  borderRadius: 0,
                }}
                active={Active == doc.type ? true : false}
                title={`${doc.title} (${
                  orders ? orders.filter(d=>d.type==doc.type).length : "0"
                })`}
              />
              {Active == doc.type && (
                <View
                  style={{
                    width: "50%",
                    borderBottomColor: "#AC5DCB",
                    borderBottomWidth: 3,
                  }}
                />
              )}
            </View>
          ))}
        <View style={{ width: 0 }} />
      </ScrollView>
    </View>
    )
  }
  export default OrderTabBar