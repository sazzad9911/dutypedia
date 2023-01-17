import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import Barcode from "./../../components/Barcode";
import {
  dateConverter,
  localTimeToServerDate,
  serverTimeToLocalDate,
} from "../../action";
import { getSubsOrderById } from "../../Class/service";
import Avatar from "../../components/Avatar";
import BackHeader from "../../components/BackHeader";
import IconButton from "../../components/IconButton";
import SubHeader from "../../components/SubHeader";
import FixedBackHeader from "../Seller/components/FixedBackHeader";
import uuid from "react-native-uuid";
import ActivityLoader from "../../components/ActivityLoader";
const { width, height } = Dimensions.get("window");

export default function InstallmentScript({ navigation, route }) {
  const data = route.params.data;
  const service = data.service;
  const providerInfo = service.providerInfo;
  const user = useSelector((state) => state.user);
  const subsData = data.subsData;
  const installmentData = data.installmentData;
  const [subsOrders, setSubsOrders] = useState();
  const vendor = useSelector((state) => state.vendor);
  const [totalPaid, setTotalPaid] = useState();
  const isFocused = useIsFocused();
  const [Counter, setCounter] = useState(50);
  const [orders, setOrder] = useState();
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  //console.log(data.createdAt)
  //console.log(providerInfo)
  //console.warn(installmentData)
  useEffect(() => {
    setSubsOrders();
    setLoader(true);
    getSubsOrderById(user.token, data.id)
      .then((res) => {
        //console.log(res.data.order.installmentOrders)
        setLoader(false);
        setSubsOrders(res.data.order.installmentOrders);
        setActiveIndex(res.data.order.installmentOrders.length - 1);
        let paid = 0;
        res.data.order.installmentOrders.map((doc, i) => {
          if (doc.paid) {
            paid = paid + 1;
          }
        });
       
        setTotalPaid(paid);
      })
      .catch((err) => {
        setLoader(false);
        console.warn(err.response.data.message);
      });
  }, [isFocused]);
  useEffect(() => {
    if (
      subsOrders &&
      subsOrders.length < installmentData.installmentCount
    ) {
      let being = installmentData.installmentCount - subsOrders.length;
      let arr = [];
      //console.log(subsOrders[subsOrders.length-1].status)
      for (let i = 0; i < being; i++) {
        setSubsOrders((val) => [
          ...val,
          {
            createdAt: new Date(),
            dateFrom: localTimeToServerDate(
              subsOrders[subsOrders.length - 1].dateTo,
              i *
                (installmentData.installmentType == "Monthly"
                  ? 30
                  : installmentData.installmentType == "Yearly"
                  ? 365
                  : 7)
            ),
            dateTo: localTimeToServerDate(
              subsOrders[subsOrders.length - 1].dateTo,
              (i + 1) *
                (installmentData.installmentType == "Monthly"
                  ? 30
                  : installmentData.installmentType == "Yearly"
                  ? 365
                  : 7)
            ),
            delivered: false,
            deliveredAt: null,
            id: uuid.v4(),
            offlineOrderId: null,
            orderId: null,
            paid: false,
            received: false,
            refundRequestByUser: false,
            status:subsOrders[subsOrders.length-1].status=="CANCELLED"?"CANCELLED":"UPCOMING",
            updatedAt: new Date(),
          },
        ]);
      }
    } 
  }, [subsOrders && subsOrders.length, Counter]);
  useEffect(()=>{
    if(subsOrders){
      setOrder(subsOrders)
    }
  },[subsOrders])


  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SubHeader navigation={navigation} title="Subscription" />
      <ScrollView showsVerticalScrollIndicator={false}>
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
                width: "60%",
              }}
            >
              <Text
                numberOfLines={1}
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
              height: 30,
            }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              flex: 1,
              marginLeft: "10%",
            }}
          >
             <Text style={{
              fontSize:12,
              textAlign:"center",
              width:"100%",
              marginRight:2,
              fontWeight:"200",
              marginVertical:0
             }}>Date: {serverTimeToLocalDate(data.createdAt)}</Text>
            <View
              style={{
                width: width / 3,
                height: 50,
                overflow: "hidden",
                marginTop:0,
                
              }}
            >
             
              <Barcode
                height="50"
                width="150"
                value={data ? data.id : "dsfff"}
                options={{ format: "CODE128", background: "white" }}
                rotation={0}
              />
            </View>
            <Text style={{
              fontSize:12,
              textAlign:"center",
              width:"100%",
              marginRight:2,
              fontWeight:"200",
              marginVertical:0
             }}>{data.id}</Text>
          </View>
          
        </View>
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
              flex: 1.8,
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
              width: 1,
              backgroundColor: "#C0FFD7",
              height: 30,
            }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              flex: 1,
              marginLeft: "10%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                Status{" "}
              </Text>
              {data.status == "CANCELED" ? (
                <Text
                  style={{
                    color: "#DA1E37",
                  }}
                >
                  Inactive
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#4CAF50",
                  }}
                >
                  Active
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                Total Paid{" "}
              </Text>
              <Text
                style={{
                  color: "#8F8F8F",
                }}
              >
                {totalPaid}
              </Text>
            </View>
          </View>
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
          <Text
            style={[
              styles.text,
              {
                flex: 1,
              },
            ]}
          >
            Payment
          </Text>
          <Text
            style={[
              styles.text,
              {
                flex: 2,
                marginLeft: 0,
                textAlign: "center",
              },
            ]}
          >
            Payment Date
          </Text>
          <Text
            style={[
              styles.text,
              {
                flex: 0.5,
                marginLeft: 0,
                textAlign: "right",
              },
            ]}
          >
            Status
          </Text>
        </View>
        {subsOrders &&
          subsOrders.map((doc, i) => (
            <Cart
              activeIndex={activeIndex}
              onPress={() => {
                if (vendor) {
                  //console.log(i)
                  navigation.navigate("VendorOrderDetails", {
                    data: data,
                    subsOrder: doc,
                    index: i,
                  });
                } else {
                  navigation.navigate("OrderDetails", {
                    data: data,
                    subsOrder: doc,
                    index: i,
                  });
                }
              }}
              data={doc}
              key={i}
              index={i}
              page={page}
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
        
        {loader && <ActivityLoader />}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          <IconButton
            disabled={page > 1 ? false : true}
            onPress={() => {
              if (page > 1) {
                //handlePages(page + 1);
                setPage((val) => val - 1);
              }
            }}
            title={"Previous"}
          />
          <IconButton
            disabled={
              subsOrders && subsOrders.length / 12 > page ? false : true
            }
            onPress={() => {
              let pageValue = subsOrders.length / 12;
              if (pageValue > page) {
                //handlePages(page + 1);
                setPage((val) => val + 1);
              }
            }}
            title={"Next"}
          />
        </View>

        <View
          style={{
            height: 20,
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  smallText: {
    fontSize: 16,
    marginHorizontal: 0,
  },
});
const Cart = ({ data, onPress, index, page, activeIndex }) => {
  return (
    <Pressable disabled={data.orderId?false:true}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
          borderBottomColor: "#C0FFD7",
          borderBottomWidth: 1,
          borderTopColor: "#C0FFD7",
          borderTopWidth:index!=0? 0:1,
          opacity:data.orderId?1:.3
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
        >
        {index==0?"Advanced":`${index}${shift(index)} Month`}
        </Text>
        <View
          style={{
            height: 10,
            width: 1,
            backgroundColor: "#E2E2E2",
          }}
        />
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {data.dateFrom} To {data.dateTo}
        </Text>
        <View
          style={{
            height: 10,
            width: 1,
            backgroundColor: "#E2E2E2",
          }}
        />
        <Text
          style={{
            textAlign: "right",
            fontSize: 16,
          }}
        >
          {data.paid?"Paid":"Due"}
        </Text>
      </View>
    </Pressable>
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
      return "Upcoming";
  }
};
const shift=(index)=>{
  if(index==1){
    return 'st'
  }else if(index==2){
    return 'nd'
  }else if(index==3||index==4){
    return 'rd'
  }else if(index>=5){
    return 'th'
  }
}