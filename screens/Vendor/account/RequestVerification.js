import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch } from "react-redux";
import IconButton from "../../../components/IconButton";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import DVDVD from "../../../assets/Images/DVDVD.png";
const { width, height } = Dimensions.get("window");

export default function RequestVerification({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isFocused) {
      // dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      // dispatch(setHideBottomBar(true));
    }, 5);
  }, [isFocused]);

  return (
    <SafeAreaView style={{
      flex:1
    }}>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 28,
            marginBottom: 32,
            paddingHorizontal: 28,
          }}>
          <Image
            source={DVDVD}
            style={{
              width: width - 56,
              height: 230,
            }}
          />
          <Text
            style={{
              color: "#09090A",
              fontSize: 24,
              fontWeight: "400",
              
              marginTop: 28,
            }}>
            Verify Your Account Before Withdrawing Funds
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              
              marginTop: 28,
              color: "#484848",
            }}>
            Thank you for choosing to withdraw funds from our platform. To
            ensure the security of your account, we require all users to verify
            their identity before processing any withdrawal requests. Please
            take a moment to verify your account by completing the verification
            process. This will allow us to confirm that you are the authorized
            account holder and prevent any unauthorized withdrawals. Once your
            account has been verified, you will be able to complete your
            withdrawal request. Thank you for your understanding and cooperation
            in keeping your account secure.
          </Text>
          <IconButton
            onPress={() => {
              navigation.navigate("FirstStepVerification");
            }}
            style={{
              height: 44,
              backgroundColor: "#4ADE80",
              color: "#ffffff",
              borderRadious: 4,
              marginTop: 28,
            }}
            title={"Verify now"}
          />
          <IconButton
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              height: 44,
              borderRadious: 4,
              marginTop: 12,
              borderColor: "#E6E6E6",
            }}
            title={"Cancel"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
