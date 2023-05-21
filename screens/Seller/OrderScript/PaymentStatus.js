import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SvgXml } from "react-native-svg";
import { socket } from "../../../Class/socket";
import IconButton from "../../../components/IconButton";
import AnimatedHeight from "../../../Hooks/AnimatedHeight";
import ViewMore from "../../../Hooks/ViewMore";
import { styles } from "../../create_dashboard/BusinessTitle";

export default function PaymentStatus({ navigation, route }) {
  const type = route?.params?.type;
  const order = route?.params?.order;
  const [layoutHeight, setLayoutHeight] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}>
      {type ? (
        <View
          style={{
            marginTop: "20%",
            flex: 1,
            alignItems: "center",
          }}>
          <SvgXml xml={success} />
          <Text
            style={{
              fontSize: 24,
              
              fontWeight: "400",
              marginTop: 32,
            }}>
            Your transaction has been completed successfully.
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
            }}>
            <SvgXml
              style={{
                marginTop: 32,
              }}
              xml={failed}
            />
            <Text
              style={{
                marginTop: 32,
                fontSize: 20,
                
                fontWeight: "400",
                textAlign: "center",
              }}>
              We're sorry,We were unable to process your payment. Please check
              your payment details and try again.
            </Text>
            <ViewMore
              style={{
                marginTop: 36,
                marginBottom: 60,
              }}
              width={"37%"}
              height={layoutHeight}
              component={
                <Text
                  onLayout={(e) => {
                    setLayoutHeight(e.nativeEvent.layout.height);
                  }}
                  style={[
                    styles.spText,
                    { marginTop: 0, textAlign: "center" },
                  ]}>
                  We apologize, but we are currently unable to process your
                  payment. There may be a number of reasons why this has
                  occurred, including issues with your account balance, problems
                  with the payment gateway, or technical difficulties on our
                  end.{"\n"} Please check your payment details and account
                  balance, and try again. If the problem persists, please
                  contact{" "}
                  <Text style={{ color: "#4ADE80" }}>customer support</Text> for
                  assistance in resolving the issue. We appreciate your patience
                  and understanding as we work to resolve this matter.
                </Text>
              }
            />
          </View>
        </ScrollView>
      )}
      <IconButton
        onPress={() => {
          navigation.navigate("OrderDetails", {data:order,orderId:order?.id,type:order.type});
          socket.emit("updateOrder", {
            receiverId: order?.service?.user?.id,
            order: order
          });
          socket.emit("updateOrder", {
            receiverId: order.user.id,
            order: order
          });
        }}
        active={true}
        style={{
          height: 44,
          marginBottom: 20,
          marginTop: 20,
          backgroundColor: type ? "#4ADE80" : "#EC2700",
        }}
        title={"Back to order"}
      />
    </View>
  );
}
const success = `<svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5074_38020)">
<path d="M28.925 0H32.0328C38.9187 0.426563 45.6922 3.13594 50.7359 7.88437C56.5203 13.1109 60.0359 20.6578 60.5 28.4297V31.5C60.0641 39.3047 56.5297 46.8797 50.7266 52.1297C45.6688 56.8312 38.9422 59.5687 32.0609 60H28.9953C21.2141 59.5594 13.6531 56.0297 8.40781 50.2547C3.66406 45.2203 0.940625 38.4609 0.5 31.5844V28.4484C0.940625 21.1125 4.03906 13.9266 9.32187 8.78438C14.4594 3.53437 21.6125 0.45 28.925 0ZM44.5531 17.7797C37.8406 23.9953 31.1562 30.2391 24.4672 36.4781C21.5844 33.4219 18.7625 30.3141 15.8422 27.2906C14.1687 25.5422 10.9813 25.9219 9.72969 27.9891C8.73125 29.4937 8.9375 31.65 10.2172 32.9297C14.825 37.8937 19.4703 42.825 24.0828 47.7891C32.2438 40.2234 40.3672 32.6203 48.5047 25.0266C49.5312 24.0234 50.8531 23.0953 51.1484 21.5906C51.6031 19.8328 50.6469 17.8641 49.0109 17.1C47.5672 16.3828 45.7156 16.6641 44.5531 17.7797Z" fill="#4ADE80"/>
<path d="M44.5531 17.7797C45.7156 16.6641 47.5672 16.3828 49.0109 17.1C50.6468 17.8641 51.6031 19.8328 51.1484 21.5906C50.8531 23.0953 49.5312 24.0235 48.5047 25.0266C40.3672 32.6203 32.2437 40.2235 24.0828 47.7891C19.4703 42.825 14.825 37.8938 10.2172 32.9297C8.93747 31.65 8.73122 29.4938 9.72966 27.9891C10.9812 25.9219 14.1687 25.5422 15.8422 27.2906C18.7625 30.3141 21.5843 33.4219 24.4672 36.4781C31.1562 30.2391 37.8406 23.9953 44.5531 17.7797Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_5074_38020">
<rect width="60" height="60" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>
`;
const failed = `<svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.5 0C13.97 0 0.5 13.47 0.5 30C0.5 46.53 13.97 60 30.5 60C47.03 60 60.5 46.53 60.5 30C60.5 13.47 47.03 0 30.5 0ZM40.58 36.9C41.45 37.77 41.45 39.21 40.58 40.08C40.13 40.53 39.56 40.74 38.99 40.74C38.42 40.74 37.85 40.53 37.4 40.08L30.5 33.18L23.6 40.08C23.15 40.53 22.58 40.74 22.01 40.74C21.44 40.74 20.87 40.53 20.42 40.08C20.0016 39.6566 19.7669 39.0853 19.7669 38.49C19.7669 37.8947 20.0016 37.3234 20.42 36.9L27.32 30L20.42 23.1C20.0016 22.6766 19.7669 22.1053 19.7669 21.51C19.7669 20.9147 20.0016 20.3434 20.42 19.92C21.29 19.05 22.73 19.05 23.6 19.92L30.5 26.82L37.4 19.92C38.27 19.05 39.71 19.05 40.58 19.92C41.45 20.79 41.45 22.23 40.58 23.1L33.68 30L40.58 36.9Z" fill="#EC2700"/>
</svg>
`;
