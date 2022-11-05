import React from "react";
import { View, SafeAreaView, ScrollView, Text, Alert } from "react-native";
import SubHeader from "./../../components/SubHeader";
import RadioButton from "../../components/RadioButton";
import { Color } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import Input from "./../../components/Input";
import IconButton from "./../../components/IconButton";
import { SvgXml } from "react-native-svg";
import { CheckBox } from "../Seller/Pricing";
import {
  acceptOrder,
  createOrder,
  createVendorOrder,
  getLastOrder,
} from "../../Class/service";
import { localOptionsToServer } from "../../Class/dataConverter";
import Animated, { FadeIn, StretchInY } from "react-native-reanimated";

const AcceptOrder = (props) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const [Service, setService] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Deliver, setDeliver] = React.useState();
  const [Condition_1, setCondition_1] = React.useState(false);
  const [Condition_2, setCondition_2] = React.useState(false);
  const [Condition_3, setCondition_3] = React.useState(false);
  const [Condition_4, setCondition_4] = React.useState(false);
  const [ServiceError, setServiceError] = React.useState();
  const [DeliverError, setDeliverError] = React.useState();
  const [Confirmation_1Error, setConfirmation_1Error] = React.useState();
  const [Confirmation_2Error, setConfirmation_2Error] = React.useState();
  const [DescriptionError, setDescriptionError] = React.useState();
  const user = useSelector((state) => state.user);
  const ListSelection = useSelector((state) => state.ListSelection);
  const ref = React.useRef();
  const params = props.route.params;
  const [Loader, setLoader] = React.useState(true);
  const navigation = props.navigation;
  const [DeliverMethod, setDeliverMethod] = React.useState({
    online: [
      "Online File Share",
      "Deliver In Video/Voice Call",
      "Delivered In Another Platform",
      "Other",
    ],
    offline: [
      {
        title: "My Self",
        options: [
          "By Walk",
          "By Vehicles",
          "Customer Will Come To My Place",
          "Other",
        ],
      },
      { title: "Courier Service" },
      { title: "Labor" },
      { title: "Other" },
    ],
  });
  const [Select, setSelect] = React.useState();
  const [SubSelect, setSubSelect] = React.useState();
  const [CourierServiceName, setCourierServiceName] = React.useState();
  const [CourierServiceAddress, setCourierServiceAddress] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const [OtherService, setOtherService] = React.useState();
  const newVendor = params.vendor;
  const data = params.data;
  //console.log(data)

  React.useEffect(() => {
    if (user && vendor) {
      getLastOrder(user.token, vendor.service.id)
        .then((res) => {
          //console.log(res.data);
          setLoader(false);
          const data = res.data;
          if (data) {
            const agreement = data.agreement;
            setService(agreement.serviceType);
            setDeliver(agreement.deliverBy);
            setSelect(
              agreement.deliverMethodPhysical
                ? agreement.deliverMethodPhysical
                : agreement.deliverMethodOnline
            );
            setDescription(agreement.selfDeliverMethodOther);
            setCourierServiceName(agreement.courierServiceName);
            setCourierServiceAddress(agreement.courierServiceAddress);
            setOtherService(agreement.otherServiceType);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
    }
  }, [user + vendor]);

  const validate = () => {
    setServiceError(null);
    setDeliverError(null);
    setConfirmation_1Error(null);
    setConfirmation_2Error(null);
    //console.log(Description);
    if (!Service) {
      setServiceError("This field is required");
      ref.current.scrollTo({ y: 10 });
      return;
    }
    if (Service == "Other" && !OtherService) {
      setServiceError("This field is required");
      ref.current.scrollTo({ y: 10 });
      return;
    }
    if (!Deliver || !Select) {
      setDeliverError("This field is required");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (Select == "My Self" && !SubSelect) {
      setDeliverError("This field is required");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (Select == "Courier Service" && !CourierServiceName) {
      setDeliverError("This field is required with typing");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (Select == "Courier Service" && !CourierServiceAddress) {
      setDeliverError("This field is required with typing");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (
      Select != "Labor" &&
      Select != "Courier Service" &&
      Select != "My Self" &&
      !Description
    ) {
      setDeliverError("This field is required with typing");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (SubSelect == "Other" && !Description) {
      setDeliverError("This field is required with typing");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    // if (
    //   (Select == "Courier Service" && !CourierServiceName) ||
    //   !CourierServiceAddress
    // ) {
    //   setDeliverError("This field is required");
    //   ref.current.scrollTo({ y: 400 });
    //   return;
    // }
    if (!Condition_1 || !Condition_2 || !Condition_3) {
      setConfirmation_1Error("Be agree with all conditions");
      ref.current.scrollTo({ y: 600 });
      return;
    }
    if (!Condition_4) {
      setConfirmation_2Error("This field is required");
      return;
    }
    if (!params.facilities || !params.id) {
      Alert.alert("Opps!", "Something went wrong. Please try again.");
      return;
    }
    setLoader(true);
    if (newVendor) {
      createVendorOrder(
        user.token,
        user.user.id,
        data.facilites,
        data.services,
        data.service.id,
        data.type,
        data.price,
        Description,
        data.price,
        params.from,
        params.to,
        "VENDOR",
        {
          deliverMethodOnline: Select,
          selfDeliverMethodOther: Description,
          courierServiceName: CourierServiceName,
          courierServiceAreaName: CourierServiceAddress,
          otherServiceType: OtherService,
          deliverBy: Deliver,
          serviceType: Service,
        }
      ).then(res=>{
        setLoader(false);
        navigation.navigate(data.type, { reload: res });
      }).catch(err=>{
        setLoader(false);
        console.warn(err.response.data.msg)
      })
      return
    }
    acceptOrder(user.token, {
      orderId: params.id,
      selectedServices: {
        options: localOptionsToServer(ListSelection),
        type: ListSelection[0].subTitle ? 3 : ListSelection[0].title ? 2 : 1,
        category: params.data.service.category,
      },
      deliverBy: Deliver,
      serviceType: Service,
      deliverMethodPhysical: Select,
      facilites: params.facilities,
      deliverMethodOnline: Select,
      selfDeliverMethodOther: Description,
      courierServiceName: CourierServiceName,
      courierServiceAreaName: CourierServiceAddress,
      otherServiceType: OtherService,
    })
      .then((response) => {
        setLoader(false);
        navigation.navigate("VendorOrder", { reload: response });
      })
      .catch((error) => {
        setLoader(false);
        Alert.alert("Opps!", error.response.data.msg);
        console.warn(error.response.data.msg);
        navigation.goBack();
        //console.warn(error.response.data.msg);
      });
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubHeader title="Order Confirmation" {...props} />
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            borderWidth: 1,
            borderColor: "#e5e5e5",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              marginVertical: 20,
              fontFamily: "Poppins-Medium",
              fontSize: 20,
              color: textColor,
            }}
          >
            What Type Of Service/Item You Want To Give
          </Text>
          {ServiceError && <Text style={{ color: "red" }}>{ServiceError}</Text>}
          <View style={{ height: 10 }} />
          <RadioButton
            style={{ marginTop: 0 }}
            onChange={() => {
              setService("Teaching/Tutorial");
            }}
            value={Service == "Teaching/Tutorial" ? true : false}
            title="Teaching/Tutorial"
          />
          <RadioButton
            style={{ marginTop: 10 }}
            onChange={() => {
              setService("Consultation");
            }}
            value={Service == "Consultation" ? true : false}
            title="Consultation"
          />
          <RadioButton
            style={{ marginTop: 10 }}
            onChange={() => {
              setService("Manufacture");
            }}
            value={Service == "Manufacture" ? true : false}
            title="Manufacture"
          />
          <RadioButton
            style={{ marginTop: 10 }}
            onChange={() => {
              setService("Fixing");
            }}
            value={Service == "Fixing" ? true : false}
            title="Fixing"
          />
          <RadioButton
            style={{ marginTop: 10 }}
            onChange={() => {
              setService("Recover");
            }}
            value={Service == "Recover" ? true : false}
            title="Recover"
          />
          <RadioButton
            style={{ marginTop: 10 }}
            onChange={() => {
              setService("Build");
            }}
            value={Service == "Build" ? true : false}
            title="Build"
          />
          <RadioButton
            style={{ marginTop: 10 }}
            onChange={() => {
              setService("Maintenance");
            }}
            value={Service == "Maintenance" ? true : false}
            title="Maintenance"
          />
          <RadioButton
            style={{ marginTop: 10 }}
            onChange={() => {
              setService("Other");
            }}
            value={Service == "Other" ? true : false}
            title="Other"
          />
          {Service == "Other" && (
            <Input
              value={OtherService}
              style={{
                marginVertical: 10,
              }}
              onChange={(e) => {
                setOtherService(e);
              }}
              placeholder="Describe here"
            />
          )}
          <View style={{ height: 10 }} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              color: textColor,
              marginVertical: 20,
            }}
          >
            Service Deliver By
          </Text>
          {DeliverError && <Text style={{ color: "red" }}>{DeliverError}</Text>}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <IconButton
              onPress={() => {
                setDeliver("Online");
                setSelect(null);
                setSubSelect(null);
                setDescription(null);
              }}
              LeftIcon={() => <SvgXml xml={online} height="25" width="25" />}
              style={{
                flex: 1,
                marginRight: 10,
                backgroundColor: Deliver == "Online" ? "#E3EBE4" : primaryColor,
                color: textColor,
              }}
              title="Online"
            />
            <IconButton
              onPress={() => {
                setDeliver("Physical");
                setSelect(null);
                setSubSelect(null);
                setDescription(null);
              }}
              LeftIcon={() => <SvgXml xml={offline} height="25" width="25" />}
              style={{
                flex: 1,
                backgroundColor:
                  Deliver == "Physical" ? "#E3EBE4" : primaryColor,
              }}
              title="Physical"
            />
          </View>
          {Deliver == "Online" ? (
            <Animated.View entering={FadeIn}>
              <Text
                style={{
                  fontSize: 20,
                  color: textColor,
                  fontFamily: "Poppins-Medium",
                  marginVertical: 10,
                }}
              >
                Delivery Method
              </Text>
              {DeliverMethod.online.map((doc, i) => (
                <View key={i}>
                  <RadioButton
                    style={{ marginTop: 10 }}
                    onChange={() => {
                      setSelect(doc);
                      setDescription(null);
                    }}
                    value={Select == doc ? true : false}
                    title={doc}
                  />
                  {Select == doc && (
                    <Input
                      value={Description}
                      onChange={(e) => {
                        setDescription(e);
                      }}
                      style={{
                        marginVertical: 10,
                      }}
                      placeholder="Service Name"
                    />
                  )}
                </View>
              ))}
            </Animated.View>
          ) : Deliver == "Physical" ? (
            <Animated.View entering={FadeIn}>
              <Text
                style={{
                  fontSize: 20,
                  color: textColor,
                  fontFamily: "Poppins-Medium",
                  marginVertical: 10,
                }}
              >
                Delivery Method
              </Text>
              {DeliverMethod.offline.map((doc, i) => (
                <View key={i}>
                  <RadioButton
                    style={{ marginTop: 10 }}
                    onChange={() => {
                      setSelect(doc.title);
                      setDescription(null);
                      setSubSelect(null);
                    }}
                    value={Select == doc.title ? true : false}
                    title={doc.title}
                  />
                  {Select == "My Self" && doc.title == "My Self" && (
                    <View entering={FadeIn} style={{ marginVertical: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          marginHorizontal: 30,
                        }}
                      >
                        {doc.options &&
                          doc.options.map((doc, i) => (
                            <RadioButton
                              style={{ marginLeft: 5, marginTop: 5 }}
                              key={i}
                              onChange={() => {
                                setSubSelect(doc);
                                setDescription(null);
                              }}
                              value={SubSelect == doc ? true : false}
                              title={doc}
                            />
                          ))}
                      </View>
                      {SubSelect == "Other" && (
                        <Input
                          value={Description}
                          onChange={(e) => setDescription(e)}
                          placeholder="Type here"
                        />
                      )}
                    </View>
                  )}
                  {Select == "Courier Service" &&
                    doc.title == "Courier Service" && (
                      <View style={{ marginBottom: 10 }}>
                        <Input
                          value={CourierServiceName}
                          onChange={(e) => setCourierServiceName(e)}
                          placeholder="Courier Service Name"
                        />
                        <Input
                          value={CourierServiceAddress}
                          onChange={(e) => setCourierServiceAddress(e)}
                          placeholder="Branch or Area Name"
                        />
                      </View>
                    )}
                  {Select == "Other" && doc.title == "Other" && (
                    <Input
                      value={Description}
                      onChange={(e) => {
                        setDescription(e);
                      }}
                      placeholder="Type here"
                    />
                  )}
                </View>
              ))}
            </Animated.View>
          ) : (
            <></>
          )}
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 20,
              color: textColor,
              marginVertical: 20,
            }}
          >
            Before Accept Order Confirm Our Condition
          </Text>
          {Confirmation_1Error && (
            <Text style={{ color: "red" }}>{Confirmation_1Error}</Text>
          )}
          <CheckBox
            value={Condition_1}
            onChange={(e) => {
              setCondition_1((val) => !val);
            }}
            style={{
              marginTop: 10,
              fontSize: 14,
            }}
            title="Yes I Talked And Collect All Information What My Customer Want"
          />
          <CheckBox
            value={Condition_2}
            onChange={(e) => {
              setCondition_2((val) => !val);
            }}
            style={{
              marginTop: 10,
              fontSize: 14,
            }}
            title="If I Deliver Any Service/Item In Online/Physical I Will Save All Of My Proof & Documents For Future Inquiries"
          />
          <CheckBox
            value={Condition_3}
            onChange={(e) => {
              setCondition_3((val) => !val);
            }}
            style={{
              marginTop: 10,
              fontSize: 14,
            }}
            title="If I Do Any Fraud Or Criminal Activities Dutypedia Can Suspend Myaccount Without Any Discussion"
          />
          <View style={{ height: 20 }} />
        </View>
        <View
          style={{
            borderColor: "#e5e5e5",
            borderWidth: 1,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            padding: 20,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <CheckBox
            style={{ fontSize: 14 }}
            value={Condition_4}
            onChange={(e) => {
              setCondition_4((val) => !val);
            }}
            title="Yes, I Understand And Agree To The Dutypedia Terms Of Service, Including The User Agreement And Privacy Policy"
          />
          {Confirmation_2Error && (
            <Text style={{ color: "red" }}>{Confirmation_2Error}</Text>
          )}
          <IconButton
            onPress={() => {
              try {
                validate();
              } catch (e) {
                console.warn(e.message);
              }
            }}
            style={{
              color: textColor,
              marginVertical: 10,
              marginTop: 20,
              backgroundColor: "#FEA31E",
            }}
            title="Confirm"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AcceptOrder;

const online = `
<svg xmlns="http://www.w3.org/2000/svg" width="44.679" height="44.679" viewBox="0 0 44.679 44.679">
  <g id="Group_17566" data-name="Group 17566" transform="translate(18589.465 9920.83)">
    <g id="Group_17565" data-name="Group 17565">
      <rect id="Rectangle_7205" data-name="Rectangle 7205" width="9" height="4" transform="translate(-18586 -9909)" fill="#f0bc5e"/>
      <rect id="Rectangle_7208" data-name="Rectangle 7208" width="8" height="4" transform="translate(-18556 -9895)" fill="#f0bc5e"/>
      <rect id="Rectangle_7209" data-name="Rectangle 7209" width="16" height="15" rx="7.5" transform="translate(-18575 -9906)" fill="#f0bc5e"/>
      <rect id="Rectangle_7206" data-name="Rectangle 7206" width="7" height="4" transform="translate(-18586 -9906)" fill="#f0bc5e"/>
      <rect id="Rectangle_7207" data-name="Rectangle 7207" width="7" height="4" transform="translate(-18555 -9892)" fill="#f0bc5e"/>
      <g id="_3957993" data-name="3957993" transform="translate(-18589.465 -9920.83)">
        <g id="_000000ff" data-name="#000000ff">
          <path id="Path_27290" data-name="Path 27290" d="M1.285,0h14.7a1.459,1.459,0,0,1,1.3,1.394c.01,1.456,0,2.913,0,4.37q4.323,0,8.646,0c0,.48,0,.96,0,1.44-2.882,0-5.765,0-8.647,0q0,2.789,0,5.578A10.8,10.8,0,0,1,33.114,23.06c3.392,0,6.785,0,10.177,0a1.466,1.466,0,0,1,1.388,1.271V43.4a1.5,1.5,0,0,1-1.288,1.28H28.666a1.466,1.466,0,0,1-1.278-1.4c-.01-1.456,0-2.911,0-4.368q-4.323,0-8.646,0c0-.48,0-.96,0-1.44,2.882,0,5.765,0,8.647,0q0-2.788,0-5.576a10.789,10.789,0,0,1-13.268-2.551,10.72,10.72,0,0,1-2.551-7.725c-3.391,0-6.782,0-10.174,0A1.468,1.468,0,0,1,0,20.346V1.3A1.491,1.491,0,0,1,1.285,0m.156,1.443q0,9.366,0,18.732,5.153,0,10.307,0a10.813,10.813,0,0,1,4.1-6.452c.01-2.171,0-4.343,0-6.514H8.545c.663.534,1.331,1.062,1.992,1.6-.3.375-.6.752-.9,1.125Q7.49,8.2,5.334,6.486C6.772,5.341,8.2,4.188,9.643,3.042c.3.375.6.749.9,1.125-.663.534-1.332,1.061-1.993,1.6q3.653,0,7.307,0,0-2.161,0-4.322-7.206,0-14.411,0M14.459,17.295c1.271,0,2.54,0,3.812,0a14.343,14.343,0,0,1,1.168-2.307c.409-.655.9-1.256,1.353-1.879a9.4,9.4,0,0,0-6.333,4.184m9.427-4.184c.456.622.944,1.223,1.353,1.88A14.451,14.451,0,0,1,26.408,17.3c1.271,0,2.542,0,3.813,0a9.408,9.408,0,0,0-6.334-4.184M19.837,17.3h5.005a19.141,19.141,0,0,0-2.5-3.844,19.141,19.141,0,0,0-2.5,3.844m-6.143,1.443a9.363,9.363,0,0,0,0,7.2h4.1a13.424,13.424,0,0,1,0-7.2h-4.1m5.6,0a12.051,12.051,0,0,0,0,7.2h6.1a12.082,12.082,0,0,0,0-7.2h-6.1m7.6,7.2h4.1a9.371,9.371,0,0,0,0-7.2h-4.1a13.462,13.462,0,0,1,0,7.2M32.93,24.5a10.825,10.825,0,0,1-4.1,6.45c-.015,2.172,0,4.345-.005,6.518q3.655,0,7.308,0-.992-.8-1.993-1.6c.3-.377.6-.75.9-1.127q2.157,1.717,4.306,3.443-2.152,1.725-4.307,3.445-.448-.563-.9-1.123l2-1.6q-3.657,0-7.314,0,0,2.161,0,4.322,7.206,0,14.411,0,0-9.366,0-18.732-5.153,0-10.307,0m-18.471,2.88a9.418,9.418,0,0,0,6.333,4.184c-.469-.642-.973-1.261-1.39-1.939a14.523,14.523,0,0,1-1.132-2.247c-1.271,0-2.54,0-3.811,0m5.377,0a19.172,19.172,0,0,0,2.5,3.843,19.2,19.2,0,0,0,2.5-3.843H19.837m5.4,2.308c-.408.655-.894,1.256-1.35,1.877a9.423,9.423,0,0,0,6.334-4.184c-1.271,0-2.542,0-3.813,0A14.369,14.369,0,0,1,25.236,29.691Z" fill="#313131"/>
          <path id="Path_27291" data-name="Path 27291" d="M348.337,49.581a2.161,2.161,0,1,1-1.493,2.487,2.175,2.175,0,0,1,1.493-2.487m.356,1.4a.719.719,0,1,0,.975.81A.724.724,0,0,0,348.693,50.983Z" transform="translate(-316.536 -45.165)" fill="#313131"/>
          <path id="Path_27292" data-name="Path 27292" d="M313.8,66.063h1.441c0,.48,0,.96,0,1.44-.481,0-.962,0-1.442,0C313.8,67.022,313.8,66.543,313.8,66.063Z" transform="translate(-286.417 -60.298)" fill="#313131"/>
          <path id="Path_27293" data-name="Path 27293" d="M412.9,66.063h1.44c0,.48,0,.96,0,1.44-.48,0-.96,0-1.44,0C412.9,67.024,412.9,66.543,412.9,66.063Z" transform="translate(-376.869 -60.298)" fill="#313131"/>
          <path id="Path_27294" data-name="Path 27294" d="M41.286,132.129q1.441,0,2.882,0c0,.48,0,.96,0,1.44-.961,0-1.922,0-2.883,0C41.285,133.088,41.286,132.609,41.286,132.129Z" transform="translate(-37.683 -120.598)" fill="#313131"/>
          <path id="Path_27295" data-name="Path 27295" d="M90.786,132.126h4.322q0,.72,0,1.44c-1.443,0-2.887.014-4.329-.009C90.79,133.08,90.782,132.6,90.786,132.126Z" transform="translate(-82.858 -120.596)" fill="#313131"/>
          <path id="Path_27296" data-name="Path 27296" d="M41.286,165.159q3.6,0,7.206,0c0,.481,0,.961,0,1.442q-3.6,0-7.205,0C41.285,166.118,41.286,165.639,41.286,165.159Z" transform="translate(-37.683 -150.745)" fill="#313131"/>
          <path id="Path_27297" data-name="Path 27297" d="M41.286,198.189q2.882,0,5.765,0c.005.476-.008.953.009,1.429-1.924.029-3.849.005-5.773.012C41.285,199.148,41.286,198.669,41.286,198.189Z" transform="translate(-37.683 -180.893)" fill="#313131"/>
          <path id="Path_27298" data-name="Path 27298" d="M388.125,297.263c.958,0,1.916,0,2.875,0,.013.481,0,.963.005,1.443h-2.881Q388.123,297.983,388.125,297.263Z" transform="translate(-354.255 -271.32)" fill="#313131"/>
          <path id="Path_27299" data-name="Path 27299" d="M437.675,297.286h2.881c0,.48,0,.961,0,1.441h-2.882Q437.673,298.007,437.675,297.286Z" transform="translate(-399.481 -271.343)" fill="#313131"/>
          <path id="Path_27300" data-name="Path 27300" d="M388.125,330.32q3.6,0,7.205,0,0,.72,0,1.44-3.6,0-7.206,0Q388.123,331.04,388.125,330.32Z" transform="translate(-354.255 -301.495)" fill="#313131"/>
          <path id="Path_27301" data-name="Path 27301" d="M404.64,363.351q2.884-.005,5.765,0c0,.48,0,.96,0,1.44q-2.882,0-5.765,0C404.64,364.311,404.641,363.831,404.64,363.351Z" transform="translate(-369.33 -331.642)" fill="#313131"/>
          <path id="Path_27302" data-name="Path 27302" d="M117.234,412.982a2.161,2.161,0,1,1-1.631,2.292,2.175,2.175,0,0,1,1.631-2.292m.169,1.469a.719.719,0,1,0,1.069.658A.724.724,0,0,0,117.4,414.451Z" transform="translate(-105.504 -376.886)" fill="#313131"/>
          <path id="Path_27303" data-name="Path 27303" d="M82.58,429.411c.48,0,.96,0,1.44,0,0,.48,0,.961,0,1.441h-1.44C82.579,430.371,82.581,429.891,82.58,429.411Z" transform="translate(-75.374 -391.938)" fill="#313131"/>
          <path id="Path_27304" data-name="Path 27304" d="M181.67,429.394c.483,0,.965-.014,1.447.009-.01.477,0,.954-.005,1.431h-1.441C181.67,430.354,181.671,429.874,181.67,429.394Z" transform="translate(-165.817 -391.921)" fill="#313131"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`;
const offline = `
<svg xmlns="http://www.w3.org/2000/svg" width="51.403" height="48.842" viewBox="0 0 51.403 48.842">
  <g id="_4456513" data-name="4456513" transform="translate(-51.333 -61.465)">
    <g id="_4c241dff" data-name="#4c241dff" transform="translate(51.333 61.465)">
      <path id="Path_27318" data-name="Path 27318" d="M93.429,62.112A4.276,4.276,0,0,1,99.81,64.59a10.207,10.207,0,0,1,.159,2.632c0,1.239.008,2.479,0,3.718a.852.852,0,0,1-.841.8c-.8,0-1.6.006-2.4,0a1.025,1.025,0,0,0,.24.368c1.156,1.388,2.287,2.8,3.455,4.175,1.663.193,3.319.461,4.986.6.982.094,2.046-.2,2.953.3a2.144,2.144,0,0,1,.983,2.233c.88.108,1.815.006,2.718.05a.854.854,0,0,1-.024,1.7c-.6.019-1.205,0-1.808.008q.011,10.268.023,20.537a.861.861,0,0,1-.438.773c-.346.191-.762.078-1.134.178a4.294,4.294,0,0,0-3.563,4.067.9.9,0,0,1-.845,1.006q-9.49.008-18.982,0a3.841,3.841,0,0,1-.354.861q11.174,0,22.349,0a3.426,3.426,0,0,1,5.063-4.424,3.485,3.485,0,0,1,.884,4.433,1.072,1.072,0,0,1,1.226.495.857.857,0,0,1-.771,1.2q-23.976.006-47.957,0a.855.855,0,1,1,0-1.707c4.417.005,8.836-.008,13.255.006a4.976,4.976,0,0,1-.374-1.063,3.426,3.426,0,0,1,4.313-3.951,3.469,3.469,0,0,1,2.37,2.428c2.614.013,5.227-.014,7.84.014l.105-.044a10.7,10.7,0,0,1-1.57-4.058c.138-.166-.016-.323-.069-.475a22.742,22.742,0,0,1,.083-6.159l-.024-.105c-1.289-1.773-2.562-3.556-3.846-5.333-1.411,1.023-2.779,2.1-4.207,3.1a1.85,1.85,0,0,1-.421.2q-3.032,1.152-6.059,2.309-4.568,1.746-9.138,3.484a1.4,1.4,0,0,1-.748.156.858.858,0,0,1-.693-1.042,7.216,7.216,0,0,1,1.619-3.726,8.133,8.133,0,0,1,2.374-1.38c1.26-.586,2.514-1.183,3.777-1.764,1.957-.936,3.934-1.829,5.887-2.771.292-.416.57-.842.857-1.262q-.821.013-1.643,0a.867.867,0,0,1-.875-.9c0-2.851,0-5.7,0-8.553a.855.855,0,0,1,.864-.826c2.178,0,4.357,0,6.536,0l.092-.034q1.41-2.806,2.822-5.613a3.934,3.934,0,0,1,2.858-2.1,5.321,5.321,0,0,1-.319-1.712,17.019,17.019,0,0,1,.083-2.531,4.3,4.3,0,0,1,1.942-2.791m-.174,2.807a4.983,4.983,0,0,0-.138,1.638,5.2,5.2,0,0,0,.151,1.764,2.586,2.586,0,0,0,2.34,1.707c.875.016,1.75,0,2.626.009.058-1.445.013-2.91.023-4.362a2.57,2.57,0,0,0-5-.756M90.4,72q-2.214,4.4-4.423,8.8a2.116,2.116,0,0,0,1.351,2.813c1.339.36,2.683.705,4.027,1.049a1.464,1.464,0,0,0,1.712-.818q1.083-2.606,2.157-5.217c-.849-.743-1.7-1.48-2.545-2.229a.854.854,0,0,1,1.127-1.279c1.682,1.456,3.35,2.926,5.028,4.386a.89.89,0,0,0,.668.22c1.579-.089,3.165-.133,4.74-.247,0-.329,0-.657,0-.984-1.236-.178-2.479-.315-3.717-.486-.41-.064-.909-.013-1.2-.364q-2.186-2.64-4.361-5.291a4.577,4.577,0,0,0-1.052-.972,3.844,3.844,0,0,0-1.174-.55A2.218,2.218,0,0,0,90.4,72M80.263,78.6c-.005,2.266.008,4.532-.006,6.8l.07.06c.63-.02,1.264.024,1.891-.02.678-.967,1.342-1.948,1.981-2.939a3.963,3.963,0,0,1-.026-1.634A14.694,14.694,0,0,1,85.13,78.6q-2.433,0-4.867,0m25.7.031c.014.27.006.539.005.81a11.356,11.356,0,0,0,1.4-.01.425.425,0,0,0-.077-.829,10.421,10.421,0,0,0-1.331.029m-9.409,1.247q-.958,2.378-1.958,4.74c-.093.321-.41.534-.476.855,2.233-.046,4.47,0,6.706-.023.01-1.352-.009-2.705.009-4.057a7.68,7.68,0,0,1-2.213-.073A6.153,6.153,0,0,1,96.692,79.9l-.137-.019m6,1.415c-.028,1.7,0,3.393-.015,5.089a.874.874,0,0,1-.913.787c-2.381.005-4.763-.006-7.143.005.941,2.108,1.829,4.239,2.8,6.334a.821.821,0,0,1,.063.412c-.233,2.31-.478,4.618-.709,6.929q-.269,2.578-.532,5.158c2.44.026,4.884-.008,7.326.018a8.348,8.348,0,0,1,.6-1.815,6.054,6.054,0,0,1,4.509-3.273c.013-3.951-.026-7.9.005-11.853l-.074-.029a.831.831,0,0,0,.059-.285c0-2.518-.009-5.036-.006-7.555l-.059-.059c-1.971.055-3.94-.02-5.909.136M85.1,84.256q-1.8,2.666-3.6,5.331a1.319,1.319,0,0,1-.586.413q-5.385,2.527-10.776,5.048a2.542,2.542,0,0,0-1.459,1.826c4.656-1.813,9.338-3.559,14-5.355,1.632-1.159,3.219-2.386,4.825-3.581a.863.863,0,0,1,1.194.213q2.263,3.133,4.52,6.272a.91.91,0,0,1,.213.63c-.1,1.125-.252,2.248-.289,3.378a12.416,12.416,0,0,0,1.274,6.243l.113,0c.333-3.549.722-7.094,1.082-10.641-1.1-2.535-2.236-5.063-3.3-7.615a4.866,4.866,0,0,1-1.349-.077c-1.326-.336-2.646-.685-3.971-1.029a4.046,4.046,0,0,1-1.8-1.049l-.093,0m-3.647,21a1.715,1.715,0,0,0-1.184,1.593,1.708,1.708,0,1,0,1.184-1.593m28.257,0a1.7,1.7,0,0,0,.59,3.313,1.694,1.694,0,0,0,1.638-1.991A1.725,1.725,0,0,0,109.709,105.264Z" transform="translate(-63.14 -61.465)" fill="#4c241d"/>
      <path id="Path_27319" data-name="Path 27319" d="M86.113,102.4c1.78-.064,3.569-.013,5.353-.026a.857.857,0,0,1,.82,1.083.891.891,0,0,1-.958.63c-1.717-.013-3.436.021-5.152-.018A.858.858,0,0,1,86.113,102.4Z" transform="translate(-81.196 -97.233)" fill="#4c241d"/>
      <path id="Path_27320" data-name="Path 27320" d="M153.612,103.179a.853.853,0,0,1,.8-.827c2.122-.014,4.243.009,6.365-.011,1.308.019,2.616,0,3.924.008a.857.857,0,0,1,.138,1.707c-2.319.034-4.642-.025-6.96.029-1.157-.053-2.322,0-3.482-.026A.86.86,0,0,1,153.612,103.179Z" transform="translate(-140.771 -97.209)" fill="#4c241d"/>
      <path id="Path_27321" data-name="Path 27321" d="M112.65,137.513a.859.859,0,0,1,.783-1.066c1.9-.011,3.8.005,5.7-.008.605.084,1.362-.2,1.839.292a.861.861,0,0,1-.522,1.416c-.89.029-1.781,0-2.671.015-1.411-.01-2.822,0-4.232-.005A.872.872,0,0,1,112.65,137.513Z" transform="translate(-104.926 -127.02)" fill="#4c241d"/>
      <path id="Path_27322" data-name="Path 27322" d="M371.1,143.131a.913.913,0,1,1-.365,1.5A.916.916,0,0,1,371.1,143.131Z" transform="translate(-330.417 -132.829)" fill="#4c241d"/>
      <path id="Path_27323" data-name="Path 27323" d="M51.971,184.329c1.193-.056,2.393-.01,3.588-.024a.86.86,0,0,1,.862,1.093.914.914,0,0,1-1,.621c-1.16-.023-2.326.045-3.481-.035A.861.861,0,0,1,51.971,184.329Z" transform="translate(-51.333 -168.881)" fill="#4c241d"/>
      <path id="Path_27324" data-name="Path 27324" d="M98.986,185.3a.859.859,0,0,1,.859-.97q1.851,0,3.7,0c.776,0,1.552-.006,2.327,0a.854.854,0,0,1,.016,1.7c-.959.018-1.919,0-2.878.008-1.056,0-2.11,0-3.166,0A.869.869,0,0,1,98.986,185.3Z" transform="translate(-92.994 -168.904)" fill="#4c241d"/>
      <path id="Path_27325" data-name="Path 27325" d="M132.145,238.73a.914.914,0,1,1-.236,1.565A.919.919,0,0,1,132.145,238.73Z" transform="translate(-121.499 -216.416)" fill="#4c241d"/>
    </g>
    <g id="_ffded5ff" data-name="#ffded5ff" transform="translate(81.307 63.175)">
      <path id="Path_27326" data-name="Path 27326" d="M290.251,76.835a2.57,2.57,0,0,1,5,.756c-.01,1.452.035,2.917-.023,4.362-.876-.009-1.751.008-2.626-.009a2.586,2.586,0,0,1-2.34-1.707,5.2,5.2,0,0,1-.151-1.764A4.984,4.984,0,0,1,290.251,76.835Z" transform="translate(-290.11 -75.091)" fill="#ffded5"/>
      <path id="Path_27327" data-name="Path 27327" d="M392.47,197.994a10.419,10.419,0,0,1,1.331-.029.425.425,0,0,1,.077.829,11.359,11.359,0,0,1-1.4.01C392.476,198.533,392.484,198.264,392.47,197.994Z" transform="translate(-379.62 -182.534)" fill="#ffded5"/>
    </g>
    <g id="_d2ddffff" data-name="#d2ddffff" transform="translate(60.746 64.894)">
      <path id="Path_27328" data-name="Path 27328" d="M139.477,89.552a18.146,18.146,0,0,1,5.778-.758,17.018,17.018,0,0,0-.083,2.531,5.321,5.321,0,0,0,.319,1.712,3.934,3.934,0,0,0-2.858,2.1q-1.416,2.806-2.822,5.613l-.092.034c-2.179,0-4.358,0-6.536,0a.855.855,0,0,0-.864.826c-.006,2.851,0,5.7,0,8.553a.867.867,0,0,0,.875.9q.821.009,1.643,0c-.287.419-.565.846-.857,1.262-1.953.941-3.93,1.834-5.887,2.771a18.513,18.513,0,0,1-1.164-12.6c.959-.006,1.919.01,2.878-.008a.854.854,0,0,0-.016-1.7c-.776-.008-1.552,0-2.327,0a18.39,18.39,0,0,1,2.3-4.283c.89-.018,1.781.014,2.671-.015a.861.861,0,0,0,.522-1.416c-.477-.5-1.234-.208-1.839-.292a20.894,20.894,0,0,1,2.9-2.545c2.317-.054,4.641.005,6.96-.029a.857.857,0,0,0-.138-1.707c-1.308-.006-2.616.011-3.924-.008.851-.313,1.68-.7,2.56-.935M127.554,107.67a.914.914,0,1,0,1.238.993A.922.922,0,0,0,127.554,107.67Z" transform="translate(-126.321 -88.786)" fill="#d2ddff"/>
      <path id="Path_27329" data-name="Path 27329" d="M322.159,107.33a18.756,18.756,0,0,1,5.467,4.682,19,19,0,0,1,2.927,5.276c-.906-.5-1.971-.208-2.953-.3-1.667-.138-3.323-.405-4.986-.6-1.167-1.377-2.3-2.787-3.455-4.175a1.025,1.025,0,0,1-.24-.368c.8.01,1.6.005,2.4,0a.852.852,0,0,0,.841-.8c.009-1.239,0-2.479,0-3.718m3.854,4.544a.913.913,0,1,0,1.142,1.193A.918.918,0,0,0,326.013,111.874Z" transform="translate(-294.743 -105.002)" fill="#d2ddff"/>
      <path id="Path_27330" data-name="Path 27330" d="M309.09,218.506c1.968-.156,3.938-.08,5.909-.136l.059.059c0,2.518.005,5.036.006,7.555a.832.832,0,0,1-.059.285,18.457,18.457,0,0,1-11.835,11.794c.231-2.311.476-4.62.709-6.929a.821.821,0,0,0-.063-.412c-.968-2.1-1.855-4.227-2.8-6.334,2.38-.011,4.761,0,7.143-.005a.874.874,0,0,0,.913-.787C309.093,221.9,309.063,220.2,309.09,218.506Z" transform="translate(-279.09 -202.103)" fill="#d2ddff"/>
      <path id="Path_27331" data-name="Path 27331" d="M169.26,290.754c1.427-1,2.8-2.081,4.207-3.1,1.284,1.776,2.557,3.56,3.846,5.333l.024.105a22.742,22.742,0,0,0-.083,6.159c.013.08.04.242.054.323a5.47,5.47,0,0,0-1.066-.049,18.454,18.454,0,0,1-13.462-6.257q3.03-1.156,6.059-2.309A1.851,1.851,0,0,0,169.26,290.754Z" transform="translate(-158.203 -262.686)" fill="#d2ddff"/>
    </g>
    <g id="_ffffffff" data-name="#ffffffff" transform="translate(74.001 70.804)">
      <path id="Path_27332" data-name="Path 27332" d="M236.5,137.061a2.218,2.218,0,0,1,2.335-1.165,3.844,3.844,0,0,1,1.174.55,4.576,4.576,0,0,1,1.052.972q2.181,2.644,4.361,5.291c.3.351.793.3,1.2.364,1.238.171,2.481.308,3.717.486,0,.328,0,.655,0,.984-1.575.114-3.161.158-4.74.247a.89.89,0,0,1-.668-.22c-1.677-1.46-3.345-2.93-5.028-4.386a.854.854,0,0,0-1.127,1.279c.842.749,1.7,1.486,2.545,2.229q-1.079,2.608-2.157,5.217a1.464,1.464,0,0,1-1.712.818c-1.344-.344-2.688-.689-4.027-1.049a2.116,2.116,0,0,1-1.351-2.813Q234.285,141.46,236.5,137.061Z" transform="translate(-231.912 -135.863)" fill="#fff"/>
    </g>
    <g id="_ffce56ff" data-name="#ffce56ff" transform="translate(68.45 78.604)">
      <path id="Path_27333" data-name="Path 27333" d="M187.7,198q2.433,0,4.867,0a14.694,14.694,0,0,0-.958,2.263,3.963,3.963,0,0,0,.026,1.634c-.639.99-1.3,1.972-1.981,2.939-.626.044-1.26,0-1.891.02l-.07-.06C187.7,202.528,187.691,200.262,187.7,198Z" transform="translate(-187.69 -197.996)" fill="#ffce56"/>
      <path id="Path_27334" data-name="Path 27334" d="M300.564,208.18l.137.019a6.153,6.153,0,0,0,1.931,1.424,7.679,7.679,0,0,0,2.213.073c-.018,1.352,0,2.705-.009,4.057-2.236.02-4.473-.024-6.706.023.065-.321.383-.534.476-.855Q299.606,210.559,300.564,208.18Z" transform="translate(-284.266 -206.902)" fill="#ffce56"/>
    </g>
    <g id="_9dc1e4ff" data-name="#9dc1e4ff" transform="translate(56.87 84.256)">
      <path id="Path_27335" data-name="Path 27335" d="M111.862,243.02l.093,0a4.046,4.046,0,0,0,1.8,1.049c1.324.344,2.645.693,3.971,1.029a4.866,4.866,0,0,0,1.349.077c1.066,2.552,2.2,5.08,3.3,7.615-.36,3.548-.749,7.093-1.082,10.641l-.113,0a12.416,12.416,0,0,1-1.274-6.243c.036-1.13.19-2.253.289-3.378a.91.91,0,0,0-.213-.63q-2.261-3.135-4.52-6.272a.863.863,0,0,0-1.194-.213c-1.607,1.2-3.194,2.423-4.825,3.581-4.664,1.8-9.346,3.543-14,5.355a2.542,2.542,0,0,1,1.459-1.827q5.385-2.529,10.776-5.048a1.319,1.319,0,0,0,.586-.413Q110.066,245.689,111.862,243.02Z" transform="translate(-95.44 -243.02)" fill="#9dc1e4"/>
    </g>
    <g id="_6b4f5bff" data-name="#6b4f5bff" transform="translate(68.46 105.17)">
      <path id="Path_27336" data-name="Path 27336" d="M188.953,409.713a1.7,1.7,0,1,1-1.184,1.593A1.7,1.7,0,0,1,188.953,409.713Z" transform="translate(-187.768 -409.623)" fill="#6b4f5b"/>
      <path id="Path_27337" data-name="Path 27337" d="M414.161,409.72a1.725,1.725,0,0,1,2.228,1.322,1.708,1.708,0,1,1-3.368,0A1.723,1.723,0,0,1,414.161,409.72Z" transform="translate(-384.718 -409.626)" fill="#6b4f5b"/>
    </g>
  </g>
</svg>
`;
