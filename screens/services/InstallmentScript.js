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
import { DataTable } from "react-native-paper";
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
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [pageContent, setPageContent] = useState();
  //console.log(data.createdAt)
  //console.log(providerInfo)
  //console.warn(installmentData)
  useEffect(() => {
    //console.log(data)
    (async () => {
      setLoader(true);
      const res = await getSubsOrderById(user.token, data.id);
      //console.log(res.data.order.installmentOrders)

      //console.log(res.data.order.installmentOrders)
      if (res) {
        setSubsOrders(res.data.order.installmentOrders);
        setLoader(false);
        setActiveIndex(
          installmentData.advancedPayment
            ? res.data.order.installmentOrders.length
            : res.data.order.installmentOrders.length - 1
        );
        let paid = 0;
        let total = 0;
        res.data.order.installmentOrders.map((doc, i) => {
          if (doc.paid) {
            paid = paid + 1;
            total =
              total +
              installmentData.totalAmount / installmentData.installmentCount;
          }
        });
        setPaidAmount(total.toFixed(1));
        setTotalPaid(paid);
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    //console.log(installmentData)
    if (
      subsOrders &&
      subsOrders.length < parseInt(installmentData.installmentCount)
    ) {
      if (installmentData.advancedPayment) {
        setSubsOrders((val) => [
          {
            createdAt: new Date(),
            dateFrom: localTimeToServerDate(
              data.deliveryDateFrom,
              0 *
                (installmentData.installmentType == "Monthly"
                  ? 30
                  : installmentData.installmentType == "Yearly"
                  ? 365
                  : 7)
            ),
            dateTo: localTimeToServerDate(
              data.deliveryDateFrom,
              1 *
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
            orderId: data.id,
            paid: data.paidAdvanced,
            received: false,
            refundRequestByUser: false,
            status: data.cancelledBy ? "CANCELLED" : "UPCOMING",
            updatedAt: new Date(),
          },
          ...val,
        ]);
      }
      let being = installmentData.installmentCount - subsOrders.length;
      let arr = [];
      //console.log(being)
      //console.log(subsOrders)
      //console.log(subsOrders[subsOrders.length-1].status)
      for (let i = 0; i < being; i++) {
        setSubsOrders((val) => [
          ...val,
          {
            createdAt: new Date(),
            dateFrom: localTimeToServerDate(
              data.deliveryDateFrom,
              i *
                (installmentData.installmentType == "Monthly"
                  ? 30
                  : installmentData.installmentType == "Yearly"
                  ? 365
                  : 7)
            ),
            dateTo: localTimeToServerDate(
              data.deliveryDateFrom,
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
            status:
              subsOrders[subsOrders.length - 1]?.status == "CANCELLED"
                ? "CANCELLED"
                : "UPCOMING",
            updatedAt: new Date(),
          },
        ]);
      }
    }
  }, [subsOrders]);
  useEffect(() => {
    if (subsOrders) {
      let arr = subsOrders.filter(
        (d, i) => ((i < (10 * (page+1))&& (i >= (page)*10)))
      );
      setPageContent(arr);
    }else{

    }
  }, [page, subsOrders?.length]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomColor: "#E4E4E4",
            borderBottomWidth: 1,
            justifyContent: "center",
          }}>
          <SvgXml
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: "absolute",
              top: 10,
              left: 20,
              zIndex: 100,
            }}
            xml={backIcon}
            width={"20"}
            height={"20"}
          />
          <View
            style={{
              alignItems: "center",
              borderBottomWidth: 2,
              paddingVertical: 8.5,
              position: "absolute",
              borderBottomColor: "#4ADE80",
            }}>
            <Text
              style={{
                color: "#4ADE80",
                fontSize: 16,
              }}>
              Installment
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              width: "100%",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  marginRight: 10,
                }}>
                Status
              </Text>
              {data.status == "CANCELED" ? (
                <Text
                  style={{
                    color: "#DA1E37",
                    fontSize: 13,
                  }}>
                  Inactive
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#4CAF50",
                    fontSize: 13,
                  }}>
                  Active
                </Text>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1.8,
            }}>
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
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}>
                {providerInfo.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#666666",
                }}>
                {providerInfo.position}({providerInfo.gender})
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              flex: 1,
              marginLeft: "10%",
            }}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                width: "100%",
                marginRight: 2,
                fontWeight: "200",
                marginVertical: 0,
              }}>
              Date: {serverTimeToLocalDate(data.createdAt)}
            </Text>
            <View
              style={{
                width: width / 3,
                height: 40,
                overflow: "hidden",
                marginTop: 0,
              }}>
              <Barcode
                height="40"
                width="150"
                value={data ? data.id : "dsfff"}
                options={{ format: "CODE128", background: "white" }}
                rotation={0}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                width: "100%",
                marginRight: 2,
                fontWeight: "200",
                marginVertical: 0,
              }}>
              {data.id}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flex: 1.8,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
              }}>
              {service.serviceCenterName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 5,
                marginBottom: 5,
              }}>
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
              flex: 1.3,
              marginLeft: "10%",
            }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                }}>
                Total Paid{" "}
              </Text>

              <Text
                style={{
                  color: "#8F8F8F",
                }}>
                {totalPaid}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                }}>
                Paid Amount{" "}
              </Text>
              <Text
                style={{
                  color: "#8F8F8F",
                }}>
                {installmentData.advancedPaymentAmount && totalPaid > 0
                  ? amountConverter(
                      parseInt(paidAmount) +
                        parseInt(installmentData.advancedPaymentAmount)
                    )
                  : paidAmount}
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
          }}>
          <Text
            style={[
              styles.text,
              {
                flex: 1,
              },
            ]}>
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
            ]}>
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
            ]}>
            Status
          </Text>
        </View>
        {pageContent &&
          pageContent.map((doc, i) => (
            <Cart
              activeIndex={activeIndex}
              onPress={() => {
                if (vendor) {
                  //console.log(i)
                  // navigation.navigate("VendorOrderDetails", {
                  //   data: data,
                  //   subsOrder: doc,
                  //   index: i,
                  // });
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
              installmentData={installmentData}
              orders={subsOrders}
            />
          ))}
        {pageContent && pageContent.length == 0 && (
          <Text
            style={{
              marginVertical: 10,
              textAlign: "center",
            }}>
            No Order Found
          </Text>
        )}

        {loader && <ActivityLoader />}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(subsOrders?.length / 10)}
          onPageChange={(page) => {
            setPage(page)
          }}
          label={`${parseInt(subsOrders?.length / 10) + 1} of ${page + 1}`}
          selectPageDropdownLabel={"Rows per page"}
        />
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
const Cart = ({ data, onPress, index, page, activeIndex, installmentData,orders }) => {
  index=orders.indexOf(data)
  return (
    <Pressable
      disabled={data.orderId ? false : true}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}>
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
          borderTopWidth: index != 0 ? 0 : 1,
          opacity: data.orderId ? 1 : 0.3,
          backgroundColor: activeIndex == index ? "#F2F2F6" : "white",
        }}>
        <Text
          style={{
            fontSize: 16,
          }}>
          {index == 0 && installmentData.advancedPayment
            ? "Advanced"
            : !installmentData.advancedPayment
            ? `${index + 1}${shift(index + 1)} Month`
            : `${index}${shift(index)} Month`}
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
          }}>
          {index == 0 && installmentData.advancedPayment
            ? `${data.dateFrom}`
            : `${data.dateFrom} To ${data.dateTo}`}
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
            color: data.paid ? "black" : "red",
          }}>
          {data.paid ? "Paid" : "Due"}
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
const shift = (index) => {
  if (index == 1) {
    return "st";
  } else if (index == 2) {
    return "nd";
  } else if (index == 3 || index == 4) {
    return "rd";
  } else if (index >= 5) {
    return "th";
  }
};
const backIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="10.498" height="18.144" viewBox="0 0 10.498 18.144">
<path id="arrow-ios-back-outline" d="M20.745,25.642a1.6,1.6,0,0,1-1.17-.479L12.33,17.387a1.163,1.163,0,0,1,0-1.646l7.5-7.775A1.669,1.669,0,0,1,21.945,7.8a1.18,1.18,0,0,1,.195,1.827l-6.7,6.946,6.48,6.946a1.157,1.157,0,0,1,.2,1.386A1.536,1.536,0,0,1,20.745,25.642Z" transform="translate(-11.989 -7.498)" fill="#666"/>
</svg>
`;
const amountConverter = (number) => {
  let point = 0;
  if (number > 1000) {
    point = number / 1000;
    point = point.toFixed(1);
    return `${point}k`;
  }
  return number;
};
