import React from "react";
import { View, ScrollView,Text } from "react-native";
import ServiceCart from "./../../Cart/ServiceCart";
import {useSelector, useDispatch} from "react-redux";
import { getOtherServices } from './../../Class/service';

const AllPackageList = ({ navigation, route }) => {
  const [FixedService,setFixedService]= React.useState();
  const serviceId=route.params.serviceId
  const user= useSelector((state) => state.user);
  const onPress=route.params.onPress
  const [Loader, setLoader]= React.useState(true);
  React.useEffect(() => {
    if (user) {
      getOtherServices(user.token, serviceId, "ONETIME")
        .then((res) => {
          setFixedService(res.data.gigs);
          //console.log(res.data.gigs);
          setLoader(false);
        })
        .catch((err) => {
          console.warn(err.response.data);
          setLoader(false);
        });
    }
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal:10
        }}
      >
        {FixedService &&
          FixedService.map((doc, i) => <ServiceCart onPress={()=>{
            onPress(doc)
            navigation.goBack()
          }} key={i} data={doc} />)}
          {Loader&&(
            <Text style={{marginTop:10,textAlign: "center"}}>Loading...</Text>
          )}
      </View>
    </ScrollView>
  );
};

export default AllPackageList;
