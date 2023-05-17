import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import customStyle from "../../../assets/stylesheet";
import { getBankDetails, saveBankDetails } from "../../../Class/service";
import ActivityLoader from "../../../components/ActivityLoader";
import IconButton from "../../../components/IconButton";
import Input from "../../../components/Input";
import RadioButton from "../../../components/RadioButton";

export default function WithdrawFirst({ navigation, route }) {
  const [ownerShipError, setOwnerShipError] = useState();
  const [accountHolderError, setAccountHolderError] = useState();
  const [bankName, setBankName] = useState();
  const [bankNameError, setBankNameError] = useState();
  const [branchName, setBranchName] = useState();
  const [branchNameError, setBranchNameError] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [accountNumberError, setAccountNumberError] = useState();
  const [ownerShip, setOwnerShip] = useState();
  const [accountHolder, setAccountHolder] = useState();
  const [name, setName] = useState();
  const [nameError, setNameError] = useState();
  const [holderName, setHolderName] = useState();
  const [holderNameError, setHolderNameError] = useState();
  const amount = route?.params?.amount;
  const id = route?.params?.id;
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const vendor = useSelector((state) => state.vendor);
  const [routingNumber, setRoutingNumber] = useState();
  const [routingNumberError, setRoutingNumberError] = useState();
  //console.log(id)
  const save = async () => {
    setNameError();
    setBankNameError();
    setAccountHolderError();
    setBranchNameError();
    setOwnerShipError();
    setAccountHolderError();
    setHolderNameError();
    setRoutingNumberError();
    if (!bankName) {
      setBankNameError("*Bank name is required");
      return;
    }
    if (!branchName) {
      setBranchNameError("*Branch name is required");
      return;
    }
    if (!routingNumber) {
      setRoutingNumberError("*Routing number is required");
      return;
    }
    if (!accountNumber) {
      setAccountNumberError("*Account Number is required");
      return;
    }
    if (!holderName) {
      setHolderNameError("*Account holder name is required");
      return;
    }

    if (!name && accountHolder == "Other") {
      setNameError("*Relationship name is required");
      return;
    }
    if (!accountHolder) {
      setAccountHolderError("*Select account holder");
      return;
    }
    setLoader(true);
    saveBankDetails(user.token, {
      serviceId: vendor.service.id,
      accountId: id,
      bankName: bankName,
      branchName: branchName,
      accountNumber: accountNumber,
      accountHolderName: holderName,
      relation: accountHolder === "Other" ? name : accountHolder,
      routingNumber: routingNumber,
    }).then((res) => {
      setLoader(false);
      navigation.navigate("WithdrawSecond", {
        data: {
          bankName: bankName,
          branchName: branchName,
          accountNumber: accountNumber,
          accountHolder: holderName,
          relation: accountHolder,
          otherType: name,
          amount: amount,
        },
      });
    })
      .catch((err) => {
        setLoader(false);
        Alert.alert(err.response.data.msg);
      })
      
  };
  useEffect(() => {
    getBankDetails(user.token, id)
      .then((res) => {
        //console.log(res.data)
        if (res.data.bankDetails) {
          let details = res.data.bankDetails;
          setHolderName(details.accountHolderName);
          setAccountNumber(details.accountNumber);
          setBankName(details.bankName);
          setBranchName(details.branchName);
          setAccountHolder(
            details.relation != "Myself" &&
              details.relation != "Father" &&
              details.relation != "Mother" &&
              details.relation != "Brother" &&
              details.relation != "Sister"
              ? "Other"
              : details.relation
          );
          setName(details.relation);
          setRoutingNumber(details.routingNumber);
        }
      })
      .catch((err) => {
        console.error(err.response.data.msg);
      });
  }, [isFocused]);

  if (loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <Text style={[styles.smallText, styles.gap1]}>Bank Information</Text>
          <Input
            error={bankNameError}
            value={bankName}
            onChange={(e) => setBankName(e)}
            placeholder={"Bank name"}
            style={[styles.input, styles.gap1]}
          />

          <Input
            error={branchNameError}
            value={branchName}
            onChange={(e) => setBranchName(e)}
            placeholder={"Branch name"}
            style={[styles.input, styles.gap2]}
          />
          <Input
            error={routingNumberError}
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e)}
            placeholder={"Routing number"}
            style={[styles.input, styles.gap2]}
          />

          <Input
            error={accountNumberError}
            value={accountNumber}
            onChange={setAccountNumber}
            placeholder={"Account Number"}
            style={[styles.input, styles.gap2]}
          />
          <Input
            error={holderNameError}
            value={holderName}
            onChange={setHolderName}
            placeholder={"Account holder name"}
            style={[styles.input, styles.gap2]}
          />
          <Text style={[styles.smallText, styles.gap1]}>
            Realation with Account holder ?
          </Text>
          <View style={styles.gap1} />
          <RadioButton
            value={accountHolder == "Myself" ? true : false}
            onChange={() => setAccountHolder("Myself")}
            dark={true}
            title={"Myself"}
            style={styles.radio}
          />
          <RadioButton
            value={accountHolder == "Father" ? true : false}
            onChange={() => setAccountHolder("Father")}
            dark={true}
            title={"Father"}
            style={styles.radio}
          />
          <RadioButton
            value={accountHolder == "Mother" ? true : false}
            onChange={() => setAccountHolder("Mother")}
            style={styles.radio}
            dark={true}
            title={"Mother"}
          />
          <RadioButton
            value={accountHolder == "Brother" ? true : false}
            onChange={() => setAccountHolder("Brother")}
            style={styles.radio}
            dark={true}
            title={"Brother"}
          />
          <RadioButton
            value={accountHolder == "Sister" ? true : false}
            onChange={() => setAccountHolder("Sister")}
            style={styles.radio}
            dark={true}
            title={"Sister"}
          />
          <RadioButton
            value={accountHolder == "Other" ? true : false}
            onChange={() => setAccountHolder("Other")}
            style={styles.radio}
            dark={true}
            title={"Other"}
          />
          {accountHolder == "Other" && (
            <Input
              error={nameError}
              value={name}
              onChange={setName}
              placeholder={"Type Relation name"}
              style={[styles.input, styles.gap1]}
            />
          )}
          {accountHolderError && (
            <Text style={[styles.smallText, { color: "red", marginTop: 14 }]}>
              Select relationship
            </Text>
          )}
          <IconButton
            onPress={() => {
              save();
            }}
            active={
              bankName && branchName && holderName && accountHolder
                ? true
                : false
            }
            style={{
              marginVertical: 20,
            }}
            title={"Save and continue"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal: 0,
  },
  largeFont: {
    fontSize: 24,
    fontWeight: "400",
  },
  gap1: {
    marginTop: 20,
  },
  gap2: {
    marginTop: 8,
  },
  smallText: {
    fontSize: 16,
  },
  radio: {
    marginVertical: 4,
  },
});
