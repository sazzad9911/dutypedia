import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import SubHeader from "../../components/SubHeader";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import OfferNow from "../Seller/OfferNow";

export default function ServiceOrder({ navigation, route }) {
  const data = route?.params?.data;
  const type = route.params?.type;
  const serviceList = route?.params?.serviceList;
  const facilities = route?.params?.facilities;
  const selectedPackage = route?.params?.selectedPackage;
  const services = route?.params?.services;
  const category = route?.params?.category;

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <SubHeader
        
        navigation={navigation}
        title={
          type == "STARTING"
            ? "Offer Your Price"
            : type == "ONETIME"
            ? "Fixed Price Service"
            : "Package Service"
        }
      />
      {type == "STARTING" && (
        <OfferNow navigation={navigation} type={type} data={data} />
      )}
      {type == "ONETIME" && (
        <OfferNow
          navigation={navigation}
          type={type}
          data={data}
          gigs={data}
          serviceList={serviceList}
          facilities={facilities}
        />
      )}
      {type == "PACKAGE" && (
        <OfferNow
          navigation={navigation}
          type={type}
          data={data}
          gigs={data}
          serviceList={serviceList}
          facilities={facilities}
          selectedPackage={selectedPackage}
          services={services}
          category={category}
        />
      )}
    </View>
  );
}
