import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { serverTimeToLocalDate } from "../../action";
import Avatar from "../../components/Avatar";
import BackHeader from "../../components/BackHeader";
import IconButton from "../../components/IconButton";
import SubHeader from "../../components/SubHeader";
import FixedBackHeader from "../Seller/components/FixedBackHeader";
const { width, height } = Dimensions.get("window");

export default function SubscriptionScript({ navigation, route }) {
  const data = route.params.data;
  const service = data.service;
  const providerInfo = service.providerInfo;
  const user = useSelector((state) => state.user);
  const subsData = data.subsData;
  const subsOrders = data.subsOrders;
  const vendor = useSelector((state) => state.vendor);
  const [totalPaid,setTotalPaid]=useState()
  //console.log(providerInfo)
  //console.warn(user.token)
  useEffect(()=>{
    let paid=0;
    subsOrders&&subsOrders.map((doc,i)=>{
        if(doc.paid){
            paid=paid+1
        }
    })
    setTotalPaid(paid)
  },[])
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <SubHeader navigation={navigation} title="Subscription" />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1.8,
            }}
          >
            <Avatar
              style={{
                height: 50,
                width: 50,
              }}
            />
            <View
              style={{
                justifyContent: "center",
                marginLeft: 10,
                width:"60%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {providerInfo.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#666666",
                }}
              >
                {providerInfo.position}({providerInfo.gender})
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: "#C0FFD7",
              height: 50,
            }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 14,
              }}
            >
              Status{" "}
              {data.status=="CANCELED"?(
                <Text
                style={{
                  color: "#DA1E37",
                }}
              >
                Inactive
              </Text>
              ):(
                <Text
                style={{
                  color: "#4CAF50",
                }}
              >
                Active
              </Text>
              )}
              
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 5,
              }}
            >
              Total Paid{" "}
              <Text
                style={{
                  color: "#8F8F8F",
                }}
              >
                {totalPaid}
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
            }}
          >
            {service.serviceCenterName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            {service.gigs[0].title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderColor: "#C0FFD7",
            borderWidth: 1,
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text}>SL</Text>
          <Text style={styles.text}>Payment Date</Text>
          <Text style={styles.text}>Delivery Date</Text>
        </View>
        {subsOrders &&
          subsOrders.map((doc, i) => (
            <Cart
              onPress={() => {
                if (vendor) {
                  navigation.navigate("VendorOrderDetails", {
                    data: data,
                    subsOrder:doc
                  });
                } else {
                  navigation.navigate("OrderDetails", {
                    data: data,
                    subsOrder:doc
                  });
                }
              }}
              data={doc}
              key={i}
            />
          ))}
        {subsOrders && subsOrders.length == 0 && (
          <Text
            style={{
              marginVertical: 10,
              textAlign: "center",
            }}
          >
            No Order Found
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  smallText: {
    fontSize: 11,
    marginHorizontal: 10,
  },
});
const Cart = ({ data, onPress }) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        borderColor: "#C0FFD7",
        borderWidth: 1,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Text style={styles.smallText}>01</Text>
        <Text style={styles.smallText}>
          {serverTimeToLocalDate(data.dateFrom)} -{" "}
          {serverTimeToLocalDate(data.dateTo)}
        </Text>
        <Text style={styles.smallText}>
          {serverTimeToLocalDate(data.dateFrom)} -{" "}
          {serverTimeToLocalDate(data.dateTo)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 0,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.smallText}>
            Payment:{" "}
            <Text style={{ color: "#4ADE80", textAlign: "center" }}>
              {data && data.status ? exporters(data.status) : "Unknown"}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.smallText}>
            Status: <Text>Delivered</Text>
          </Text>
        </View>
        <IconButton
          onPress={() => {
            if (onPress) {
              onPress();
            }
          }}
          style={{
            fontSize: 10,
            borderWidth: 0,
            flex: 1,
            color:"#6366F1"
          }}
          Icon={() => <SvgXml xml={Icon} height="10" width={"10"} />}
          title={"View Recept"}
        />
      </View>
    </View>
  );
};
const Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="6.391" height="10.282" viewBox="0 0 6.391 10.282">
<path id="Path_27804" data-name="Path 27804" d="M34.789,8.2a.5.5,0,0,0-.546-.156.341.341,0,0,0-.06.605q2.377,2.127,4.76,4.251-2.354,2.107-4.715,4.208c-.147.12-.272.3-.172.481a.428.428,0,0,0,.679.056q2.492-2.228,4.988-4.454a.348.348,0,0,0,.13-.433,4.678,4.678,0,0,0-.565-.535C37.79,10.88,36.284,9.545,34.789,8.2Z" transform="translate(-33.761 -7.753)" fill="#6366f1" stroke="#333" stroke-width="0.5"/>
</svg>
`;
const exporters = (key) => {
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return "Waiting for accept";
    case "ACCEPTED":
      return "Accepted";
    case "WAITING_FOR_PAYMENT":
      return "Waiting for payment";
    case "PROCESSING":
      return "Processing";
    case "DELIVERED":
      return "Delivered";
    case "REFUNDED":
      return "Refunded";
    case "CANCELLED":
      return "Cancelled";
    case "COMPLETED":
      return "Completed";
    default:
      return "Unknown";
  }
};
