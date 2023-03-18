import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import IconButton from "../../../components/IconButton";
import Input from "../../../components/Input";
import RadioButton from "../../../components/RadioButton";

export default function WithdrawFirst({ navigation }) {
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

  const save = () => {
    setNameError();
    setBankNameError();
    setAccountHolderError();
    setBranchNameError();
    setOwnerShipError();
    setAccountHolderError();
    setHolderNameError();
    if (!bankName) {
      setBankNameError("*Bank name is required");
      return;
    }
    if (!branchName) {
      setBranchNameError("*Branch name is required");
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

    if (!name&&accountHolder=="Other") {
      setNameError("*Relationship name is required");
      return;
    }
    if (!accountHolder) {
      setAccountHolderError("*Select account holder");
      return;
    }
    navigation.navigate("WithdrawSecond");
  };

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
          <Text style={[styles.smallText, styles.gap1]}>
            Bank Information
          </Text>
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
