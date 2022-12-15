import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Color } from "../../assets/colors";
import Input from "./../../components/Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import {
  dateConverter,
  dateDifference,
  convertDate,
  fileFromURL,
} from "../../action";
import TextArea from "./../../components/TextArea";
import IconButton from "./../../components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { SvgXml } from "react-native-svg";
import {
  hto_1,
  hto_2,
  hto_3,
  hto_4,
  hto_5,
  hto_6,
} from "../../assets/OfferIcons";
import { Entypo } from "@expo/vector-icons";
import { CheckBox } from "../Seller/Pricing";
import { createOrder, getOrders } from "../../Class/service";
import { localOptionsToServer, serverToLocal } from "../../Class/dataConverter";

const OfferNow = ({ navigation, route }) => {
  const params = route.params ? route.params : null;
  const data = params ? params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const [FromVisible, setFromVisible] = React.useState(false);
  const [ToVisible, setToVisible] = React.useState(false);
  const [From, setFrom] = React.useState();
  const [To, setTo] = React.useState();
  const [FromDateError, setFromDateError] = React.useState();
  const [ToDateError, setToDateError] = React.useState();
  const [Price, setPrice] = React.useState();
  const [PriceError, setPriceError] = React.useState();
  const [Document, setDocument] = React.useState();
  const [Visible, setVisible] = React.useState(false);
  const [Check, setCheck] = React.useState(false);
  const user = useSelector((state) => state.user);
  const [Description, setDescription] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const [Loader, setLoader] = React.useState(false);
  const gigs = params.gigs;
  const [ListData, setListData] = React.useState([]);
  const [Facilities, setFacilities] = React.useState([]);
  const dispatch=useDispatch()
  const type=route.params.type
  const selectedPackage=params.selectedPackage
  const [services,setServices]=React.useState([])
  const service=params.services;
  const category=params.category;

  React.useEffect(() => {
    //console.log(service);
    if(category&&service){
      try{
        setServices(serverToLocal(service.options,service.category))
      }catch(err){
        console.log(err.message)
      }
    }
    if (gigs) {
      setPrice(gigs.price);
      try {
        if (gigs.services.category) {
          setListData(
            serverToLocal(gigs.services.options, gigs.services.category)
          );
        } else {
          setListData(serverToLocal(gigs.services, data.service.category));
        }
      } catch (e) {
        console.warn(e.message);
      }
      setFacilities(gigs.facilites.selectedOptions);
    }
    if(selectedPackage&&services){
      setPrice(selectedPackage.price);
    }
  }, [gigs]);
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type === "success") {
      return result;
    }
    return false;
  };
  const validate = () => {
    
    if (!From) {
      setFromDateError("Invalid date");
      return;
    }
    if (!To) {
      setToDateError("Invalid date");
      return;
    }
    if (!Price) {
      setPriceError("Invalid price");
      return;
    }
    
    setLoader(true);
    createOrder(
      user.token,
      gigs?gigs.service.id:data.service.id,
      type,
      selectedPackage?parseInt(selectedPackage.price):gigs?parseInt(gigs.price):data.service.gigs.filter(d=>d.type==type)[0].price,
      Description,
      parseInt(Price),
      From,
      To,
      vendor ? "VENDOR" : "USER",
      service?service:gigs?gigs.services:"",
      service?[]:gigs?gigs.facilites.selectedOptions:"",
      selectedPackage?selectedPackage:undefined,
      params.packageData
    )
      .then((res) => {
        if (res) {
          try {
             
            getNewOrderUser()
            
          } catch (e) {
            setLoader(false);
            console.warn(e.message);
          }
        }
      })
      .catch((err) => {
        setLoader(false);
        console.warn(err.response.data.msg);
      });
  };
  const getNewOrderUser = async () => {
    try {
      const res = await getOrders(user.token, "user");
      setLoader(false);
      navigation.navigate("ManageOrder", { reload: res,active:gigs?gigs.type:data.service.gigs[0].type,type:type });
      dispatch({ type: "USER_ORDERS", playload: res.data.orders });
      dispatch({ type: "SET_ORDER_SOCKET", playload: res });
    } catch (e) {
      console.warn(e.message);
    }
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: textColor }}>Loading....</Text>
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          borderWidth: 1,
          borderColor: "#e5e5e5",
          borderRadius: 5,
          paddingVertical: 20,
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              borderRadius: 30,
              width: 60,
              height: 60,
              overflow: "hidden",
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e5e5e5",
            }}
          >
            {data && data.service.profilePhoto ? (
              <Image
                style={{ height: 60, width: 60 }}
                source={{ uri: data.service.profilePhoto }}
              />
            ) : (
              <FontAwesome name="user" size={50} color={assentColor} />
            )}
          </View>
          <View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                fontFamily: "Poppins-SemiBold",
                color: textColor,
              }}
            >
              {data ? data.service.serviceCenterName : "---"}
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                }}
              >
                {data ? data.service.providerInfo.title : ""}{" "}
                {data ? data.service.providerInfo.name : "Sazzad Hossain"}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                  marginLeft: 5,
                }}
              >
                (
                {data
                  ? data.service.providerInfo.gender.toUpperCase()
                  : "Other"}
                )
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}
            >
              {data ? data.service.providerInfo.position : "---"}
            </Text>
          </View>
        </View>
        <View
          style={{ height: 1, backgroundColor: "#e5e5e5", marginTop: 20 }}
        />
        {gigs&&!selectedPackage && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 20,
                backgroundColor: "#e5e5e5",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Price
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {gigs.price}৳
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                backgroundColor: "#e5e5e5",
                padding: 5,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Service List
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: 25,
                paddingVertical: 5,
              }}
            >
              {ListData.length > 0 ? (
                ListData.map((doc, i) => (
                  <Text key={i}>
                    {i == 0 ? "" : ", "}
                    {doc.data.title}
                  </Text>
                ))
              ) : (
                <Text>N/A</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                backgroundColor: "#e5e5e5",
                padding: 5,
                borderRadius: 5,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Facilities
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: 25,
                paddingVertical: 5,
                marginBottom: 5,
              }}
            >
              {Facilities.length > 0 ? (
                Facilities.map((doc, i) => (
                  <Text key={i}>
                    {i == 0 ? "" : ", "}
                    {doc.title}
                  </Text>
                ))
              ) : (
                <Text>N/A</Text>
              )}
            </View>
          </>
        )}
        {!gigs&&!selectedPackage && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 20,
                backgroundColor: "#e5e5e5",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Starting Price
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {data ? data.service.gigs[0].price : "-"}৳
              </Text>
            </View>
            <Input
              error={PriceError}
              value={Price}
              onChange={(e) => {
                if (parseInt(e) >= data.service.gigs[0].price) {
                  setPrice(parseInt(e));
                  setPriceError(null);
                } else {
                  setPriceError(
                    `Price can be large or equal to ${data.service.gigs[0].price}৳`
                  );
                }
              }}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                marginTop: 15,
                marginLeft: 20,
                color: textColor,
              }}
              placeholderTextColor={assentColor}
              placeholder="Your Price"
            />
          </>
        )}
        {selectedPackage && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 20,
                backgroundColor: "#e5e5e5",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
               Package
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Price
              </Text>
            </View>
          </>
        )}
        {selectedPackage && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 20,
                backgroundColor: "#e5e5e5",
                padding: 5,
                borderRadius: 5,
                marginBottom:10
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
               {selectedPackage.name}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {selectedPackage.price}৳
              </Text>
            </View>
            
          </>
        )}
        {services && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 10,
                backgroundColor: "#e5e5e5",
                padding: 5,
                borderRadius: 5,
                marginBottom:10
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
               Service List
              </Text>
              
            </View>
            <View style={{
              marginHorizontal:20,
              marginVertical:5
            }}>
            {services.map((doc,i)=>(
              <Text key={i}>{`${i!=0?", ":""}${doc.data.title}`}</Text>
            ))}
            </View>
          </>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 10,
            backgroundColor: "#e5e5e5",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: "Poppins-Medium",
            }}
          >
            Delivery Time
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          <View style={{ flex: 1 }}>
            <IconButton
              onPress={() => {
                setFromVisible(true);
              }}
              style={{
                color: textColor,
                borderRadius: 5,
              }}
              title={From ? From : "Select Date"}
            />
            {FromDateError && (
              <Text style={{ color: "red", marginTop: 2 }}>
                {FromDateError}
              </Text>
            )}
            <DateTimePickerModal
              date={new Date()}
              isVisible={FromVisible}
              mode="date"
              onConfirm={(date) => {
                let newDate = dateConverter(new Date());
                let oldDate = dateConverter(date);
                if (dateDifference(newDate, oldDate) >= 0) {
                  setFromDateError(null);
                  setFrom(dateConverter(date));
                  setFromVisible(false);
                } else {
                  setFromDateError("Please select current and current date");
                  setFromVisible(false);
                }
              }}
              onCancel={() => setFromVisible(false)}
            />
          </View>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 8,
              color: textColor,
            }}
          >
            TO
          </Text>
          <View style={{ flex: 1 }}>
            <IconButton
              onPress={() => {
                setToVisible(true);
              }}
              style={{
                color: textColor,
                borderRadius: 5,
              }}
              title={To ? To : "Select Date"}
            />
            {ToDateError && (
              <Text style={{ color: "red", marginTop: 2 }}>{ToDateError}</Text>
            )}
            <DateTimePickerModal
              date={new Date()}
              isVisible={ToVisible}
              mode="date"
              onConfirm={(date) => {
                let newDate = dateConverter(new Date(From));
                let oldDate = dateConverter(date);
                if (dateDifference(newDate, oldDate) >= 0) {
                  setToDateError(null);
                  setTo(dateConverter(date));
                  setToVisible(false);
                } else {
                  setToDateError("Please select current and current date");
                  setToVisible(false);
                }
              }}
              onCancel={() => setToVisible(false)}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <TextArea
            onChange={(e) => setDescription(e)}
            value={Description}
            placeholderTextColor={assentColor}
            style={{
              width: width - 80,
            }}
            placeholder="Your Requirements"
          />
          <Text
            style={{
              color: "#606060",
              fontFamily: "Poppins-Medium",
              lineHeight: 20,
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            We Suggest To Tell Your Requirement To Seller, It Will Help Us For
            Future Inquiries.
          </Text>
        </View>
        {!Document ? (
          <IconButton
            onPress={() => {
              pickDocument().then((res) => {
                if (res) {
                  setDocument(fileFromURL(res));
                }
              });
            }}
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              marginTop: 25,
            }}
            LeftIcon={() => (
              <Ionicons name="md-attach" size={24} color={assentColor} />
            )}
            title="Attachment"
          />
        ) : (
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginRight: 10,
              }}
            >
              {Document.name}
            </Text>
            <Ionicons
              onPress={() => {
                setDocument(null);
              }}
              name="close"
              size={24}
              color="red"
            />
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 20,
            borderTopWidth: 1,
            paddingTop: 10,
            borderTopColor: "#e5e5e5",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setVisible(!Visible);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Poppins-Medium",
                marginBottom: 10,
                color: textColor,
              }}
            >
              How to order work
            </Text>
            <Entypo
              name={`chevron-thin-${Visible ? "up" : "down"}`}
              size={20}
              color={assentColor}
            />
          </TouchableOpacity>
          {Visible && (
            <>
              <View style={{ height: 10 }} />
              <Cart
                i={0}
                Icon={hto_1}
                description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
              />
              <Cart
                i={0}
                Icon={hto_2}
                description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
              />
              <Cart
                i={0}
                Icon={hto_3}
                description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
              />
              <Cart
                i={0}
                Icon={hto_4}
                description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
              />
              <Cart
                i={0}
                Icon={hto_5}
                description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
              />
              <Cart
                i={0}
                Icon={hto_6}
                description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
              />
            </>
          )}
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#e5e5e5",
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <CheckBox
          value={Check}
          style={{ color: textColor, fontSize: 14 }}
          onChange={() => {
            setCheck((v) => !v);
          }}
          title="Yes, I Understand And Agree To The Dutypedia Terms Of Service,
          Including The User Agreement And Privacy Policy"
        />
        <Button
          onPress={() => {
            validate();
          }}
          disabled={Price && From && To && Check ? false : true}
          style={{
            color: textColor,
            marginTop: 15,
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor:
              Price && From && To && Check ? "#FEA31E" : primaryColor,
            borderWidth: Price && From && To && Check ? 0 : 1,
          }}
          title="Offer Your Price"
        />
      </View>
    </ScrollView>
  );
};

export default OfferNow;
const Cart = ({ Icon, description, i }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  return (
    <View
      style={{
        width: width - 85,
        borderRadius: 5,
        backgroundColor: primaryColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowColor: "black",
        shadowOpacity: 0,
        shadowRadius: 1,
        elevation: 1,
        marginBottom: 10,
      }}
    >
      <SvgXml xml={Icon} height="35" width="35" />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            color: textColor,
          }}
        >
          Your order request
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            color: textColor,
            flex: 1,
            lineHeight: 20,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};
