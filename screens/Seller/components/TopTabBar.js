import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { primaryColor, textColor ,backgroundColor} from "../../../assets/colors";
import { useSelector, useDispatch } from "react-redux";

const TopTabBar = (props) => {
  const listData = useSelector((state) => state.listData);
  const [Services, setServices] = React.useState([]);

  React.useEffect(() => {
    if(props.state.routeNames){
        setServices(props.state.routeNames)
    }
   // console.log(props.state.routeNames)
  }, [props.state.routeNames.length]);
  function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }
  return (
    <View
      style={{
        backgroundColor: primaryColor,
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5'
      }}
    >
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
      {
        Array.isArray(Services)&&Services.map((doc,i)=>(
            <Button i={i} {...props}  key={i} title={doc} />
        ))
      }
      </ScrollView>
    </View>
  );
};

export default TopTabBar;
const Button = (props) => {
    const title = props.title
    const index=props.state.index
    const i=props.i
  return (
    <TouchableOpacity onPress={() =>{
        props.navigation.navigate(title)
    }}
      style={{
        margin: 10,
        borderBottomColor: "#707070",
        borderBottomWidth: index==i?2:0,
        paddingHorizontal: 3,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Poppins-Medium",
          color:index==i?backgroundColor:textColor,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
