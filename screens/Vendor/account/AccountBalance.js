import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
  StatusBar,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import AccountDetailsCart from "./AccountDetailsCart";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecentTransaction from "./RecentTransaction";
import RecentWithdraw from "./RecentWithdraw";
import IconButton from "../../../components/IconButton";
import { getAccountInfo } from "../../../Class/account";
import { getVerificationDetails } from "../../../Class/service";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import customStyle from "../../../assets/stylesheet";
import ActivityLoader from "../../../components/ActivityLoader";
const { width, height } = Dimensions.get("window");

export default function AccountBalance({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const Tab = createMaterialTopTabNavigator();
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [data, setData] = useState();
  const [verification, setVerification] = useState();
  const inset=useSafeAreaInsets()
  //console.log(vendor.service.verified)

  // React.useEffect(() => {
  //   if (isFocused) {
  //     dispatch(setHideBottomBar(true));
  //   } else {
  //     dispatch(setHideBottomBar(false));
  //   }
  // }, [isFocused]);
  useEffect(() => {
    getAccountInfo(user.token, vendor.service.id)
      .then((res) => {
        
        setData(res.data);
      })
      .catch((err) => {
        console.error(err.response.data.msg);
      });
    getVerificationDetails(user.token, vendor.service.id).then((res) => {
      //console.log(res.data)
      //console.log(res.data.verification)
      setVerification(res.data.verification);
    });
  }, [isFocused]);
  if(!data){
    return(
      <View style={customStyle.fullBox}>
        <ActivityLoader/>
      </View>
    )
  }
  return (
    <View style={{ flex: 1,paddingTop:inset?.top }}>
     
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <MasterCart
          onVerify={() => {
            if(!verification){
              navigation.navigate("FirstStepVerification");
              return
            }
            navigation.navigate("ReviewVerification");
          }}
          verified={data?.service?.verified}
          id={data?.id}
          name={`${user?.user.name}`}
        />
        <AccountDetailsCart
          amount={data?.balance}
          totalEarnings={data?.totalEarnings}
          pendingAmount={data?.pending}
          onWithdraw={() => {
            
            
            if (verification?.accept) {
              navigation.navigate("WithdrawFirst",{id:data?.id});
            }else if(!verification){
              navigation.navigate("RequestVerification")
              
            } else {
              navigation.navigate("ReviewVerification");
            }
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            height: 450,
          }}>
          <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen
              name="Transaction history"
              component={RecentTransaction}
            />
            <Tab.Screen name="Withdraw history" component={RecentWithdraw} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
}
const MasterCart = ({ name, id, verified, onVerify }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        marginVertical: 10,
        backgroundColor: "#485563",
        padding: 0,
        width: width - 40,
        marginLeft: 20,
        height: 207,
        borderRadius: 10,
        overflow: "hidden",
      }}>
      <SvgXml
        width={width}
        style={{
          width: width,
          position: "absolute",
          zIndex: -1,
        }}
        xml={cart}
      />
      <View
        style={{
          top: 0,
          height: "100%",
          width: "100%",
          padding: "8%",
        }}>
        <View
          style={{
            height: 75,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <SvgXml xml={chip} />
          {verified ? (
            <SvgXml xml={verifiedIcon} />
          ) : (
            <TouchableHighlight
              onPress={onVerify}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 5,
                borderColor: "white",
                borderWidth: 1,
              }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                }}>
                Verify now
              </Text>
            </TouchableHighlight>
          )}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}>
          <Text
            style={{
              fontSize: 24,
              color: "white",
            }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "white",
              marginVertical: 5,
            }}>
            Id No: {id}
          </Text>
        </View>
      </View>
    </View>
  );
};
const verifiedIcon = `<svg width="84" height="20" viewBox="0 0 84 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.353 1.549C6.77496 1.06223 7.29673 0.671956 7.88287 0.404682C8.46901 0.137407 9.1058 -0.000610312 9.75 2.02868e-06C11.107 2.02868e-06 12.323 0.600002 13.147 1.549C13.7897 1.50311 14.4347 1.59609 15.0383 1.82161C15.6419 2.04713 16.1899 2.39992 16.645 2.856C17.1009 3.31106 17.4536 3.85888 17.6791 4.46226C17.9046 5.06564 17.9977 5.71047 17.952 6.353C18.4386 6.77505 18.8287 7.29686 19.0958 7.883C19.3629 8.46913 19.5007 9.10588 19.5 9.75C19.5006 10.3942 19.3626 11.031 19.0953 11.6171C18.828 12.2033 18.4378 12.725 17.951 13.147C17.9967 13.7895 17.9036 14.4344 17.6781 15.0377C17.4526 15.6411 17.0999 16.1889 16.644 16.644C16.1889 17.0999 15.6411 17.4526 15.0377 17.6781C14.4344 17.9036 13.7895 17.9967 13.147 17.951C12.725 18.4378 12.2033 18.828 11.6171 19.0953C11.031 19.3626 10.3942 19.5006 9.75 19.5C9.1058 19.5006 8.46901 19.3626 7.88287 19.0953C7.29673 18.828 6.77496 18.4378 6.353 17.951C5.71038 17.997 5.06538 17.9042 4.46181 17.6789C3.85824 17.4535 3.31023 17.1009 2.855 16.645C2.39897 16.1898 2.04622 15.6419 1.8207 15.0383C1.59518 14.4347 1.50218 13.7897 1.548 13.147C1.06141 12.7249 0.671328 12.2031 0.404228 11.617C0.137128 11.0309 -0.000733612 10.3941 2.93585e-06 9.75C2.93585e-06 8.393 0.600003 7.177 1.549 6.353C1.50326 5.71047 1.5963 5.06562 1.82182 4.46222C2.04734 3.85883 2.40005 3.31103 2.856 2.856C3.31103 2.40005 3.85883 2.04734 4.46222 1.82182C5.06562 1.5963 5.71047 1.50326 6.353 1.549ZM13.36 7.936C13.42 7.85605 13.4634 7.76492 13.4877 7.66795C13.512 7.57098 13.5166 7.47014 13.5014 7.37136C13.4861 7.27257 13.4513 7.17783 13.3989 7.0927C13.3465 7.00757 13.2776 6.93378 13.1963 6.87565C13.1149 6.81753 13.0228 6.77624 12.9253 6.75423C12.8278 6.73222 12.7269 6.72992 12.6285 6.74746C12.5301 6.76501 12.4362 6.80205 12.3523 6.85641C12.2684 6.91077 12.1962 6.98135 12.14 7.064L8.904 11.594L7.28 9.97C7.13783 9.83752 6.94978 9.7654 6.75548 9.76883C6.56118 9.77225 6.37579 9.85097 6.23838 9.98838C6.10097 10.1258 6.02226 10.3112 6.01883 10.5055C6.0154 10.6998 6.08752 10.8878 6.22 11.03L8.47 13.28C8.54699 13.3569 8.6398 13.4162 8.74199 13.4536C8.84418 13.4911 8.9533 13.5059 9.06177 13.4969C9.17024 13.488 9.27546 13.4555 9.37013 13.4019C9.4648 13.3482 9.54665 13.2745 9.61 13.186L13.36 7.936Z" fill="#4ADE80"/>
<path d="M33.7298 3.83088L29.6097 14.75H27.9648L23.8446 3.83088H25.3642L28.7951 13.2461L32.2259 3.83088H33.7298ZM43.1259 10.1286C43.1259 10.4001 43.1103 10.6873 43.0789 10.9902H36.2173C36.2695 11.8361 36.5567 12.4993 37.0789 12.9798C37.6115 13.4497 38.2538 13.6847 39.0058 13.6847C39.622 13.6847 40.1337 13.5437 40.5411 13.2617C40.9588 12.9693 41.2512 12.5829 41.4183 12.1025H42.9536C42.7238 12.9275 42.2643 13.6012 41.575 14.1234C40.8857 14.6351 40.0293 14.891 39.0058 14.891C38.1912 14.891 37.4601 14.7082 36.8126 14.3427C36.1755 13.9771 35.6742 13.4602 35.3086 12.7918C34.9431 12.1129 34.7603 11.3296 34.7603 10.4419C34.7603 9.55415 34.9379 8.77608 35.293 8.10766C35.6481 7.43925 36.1442 6.9275 36.7812 6.57241C37.4288 6.20687 38.1703 6.0241 39.0058 6.0241C39.8204 6.0241 40.5411 6.20165 41.1677 6.55674C41.7943 6.91184 42.2747 7.4027 42.609 8.02934C42.9536 8.64553 43.1259 9.34527 43.1259 10.1286ZM41.6533 9.83091C41.6533 9.28783 41.5332 8.82307 41.293 8.43665C41.0528 8.03978 40.7238 7.74213 40.3061 7.54369C39.8988 7.33481 39.4444 7.23037 38.9431 7.23037C38.2225 7.23037 37.6063 7.46014 37.0946 7.91967C36.5933 8.37921 36.306 9.01629 36.2329 9.83091H41.6533ZM46.4333 7.55936C46.6839 7.06849 47.039 6.68729 47.4985 6.41575C47.9685 6.14421 48.5377 6.00844 49.2061 6.00844V7.48103H48.8301C47.2322 7.48103 46.4333 8.34787 46.4333 10.0816V14.75H45.0077V6.16509H46.4333V7.55936ZM51.5881 4.77083C51.3165 4.77083 51.0868 4.67684 50.8988 4.48884C50.7108 4.30085 50.6168 4.07109 50.6168 3.79955C50.6168 3.528 50.7108 3.29824 50.8988 3.11025C51.0868 2.92226 51.3165 2.82826 51.5881 2.82826C51.8492 2.82826 52.0685 2.92226 52.246 3.11025C52.434 3.29824 52.528 3.528 52.528 3.79955C52.528 4.07109 52.434 4.30085 52.246 4.48884C52.0685 4.67684 51.8492 4.77083 51.5881 4.77083ZM52.2774 6.16509V14.75H50.8518V6.16509H52.2774ZM58.2005 7.34004H56.399V14.75H54.9734V7.34004H53.8611V6.16509H54.9734V5.55413C54.9734 4.59328 55.2188 3.89354 55.7097 3.4549C56.211 3.00581 57.0099 2.78126 58.1066 2.78126V3.97187C57.4799 3.97187 57.0361 4.0972 56.775 4.34785C56.5243 4.58806 56.399 4.99015 56.399 5.55413V6.16509H58.2005V7.34004ZM60.599 4.77083C60.3275 4.77083 60.0977 4.67684 59.9097 4.48884C59.7217 4.30085 59.6277 4.07109 59.6277 3.79955C59.6277 3.528 59.7217 3.29824 59.9097 3.11025C60.0977 2.92226 60.3275 2.82826 60.599 2.82826C60.8601 2.82826 61.0794 2.92226 61.257 3.11025C61.445 3.29824 61.539 3.528 61.539 3.79955C61.539 4.07109 61.445 4.30085 61.257 4.48884C61.0794 4.67684 60.8601 4.77083 60.599 4.77083ZM61.2883 6.16509V14.75H59.8627V6.16509H61.2883ZM71.5509 10.1286C71.5509 10.4001 71.5353 10.6873 71.5039 10.9902H64.6423C64.6945 11.8361 64.9817 12.4993 65.5039 12.9798C66.0366 13.4497 66.6789 13.6847 67.4308 13.6847C68.047 13.6847 68.5588 13.5437 68.9661 13.2617C69.3838 12.9693 69.6763 12.5829 69.8434 12.1025H71.3786C71.1489 12.9275 70.6893 13.6012 70 14.1234C69.3107 14.6351 68.4543 14.891 67.4308 14.891C66.6162 14.891 65.8851 14.7082 65.2376 14.3427C64.6005 13.9771 64.0992 13.4602 63.7337 12.7918C63.3681 12.1129 63.1854 11.3296 63.1854 10.4419C63.1854 9.55415 63.3629 8.77608 63.718 8.10766C64.0731 7.43925 64.5692 6.9275 65.2063 6.57241C65.8538 6.20687 66.5953 6.0241 67.4308 6.0241C68.2454 6.0241 68.9661 6.20165 69.5927 6.55674C70.2193 6.91184 70.6998 7.4027 71.034 8.02934C71.3786 8.64553 71.5509 9.34527 71.5509 10.1286ZM70.0783 9.83091C70.0783 9.28783 69.9582 8.82307 69.718 8.43665C69.4778 8.03978 69.1488 7.74213 68.7311 7.54369C68.3238 7.33481 67.8695 7.23037 67.3682 7.23037C66.6475 7.23037 66.0313 7.46014 65.5196 7.91967C65.0183 8.37921 64.7311 9.01629 64.658 9.83091H70.0783ZM72.9 10.4262C72.9 9.54893 73.0776 8.7813 73.4327 8.12333C73.7878 7.45492 74.2734 6.93795 74.8896 6.57241C75.5162 6.20687 76.216 6.0241 76.9888 6.0241C77.6573 6.0241 78.2787 6.18076 78.8531 6.49408C79.4275 6.79695 79.8661 7.19904 80.169 7.70035V3.15724H81.6103V14.75H80.169V13.1364C79.887 13.6482 79.4693 14.0711 78.9157 14.4054C78.3622 14.7291 77.7147 14.891 76.9732 14.891C76.2108 14.891 75.5162 14.703 74.8896 14.327C74.2734 13.951 73.7878 13.4236 73.4327 12.7448C73.0776 12.0659 72.9 11.2931 72.9 10.4262ZM80.169 10.4419C80.169 9.79436 80.0385 9.23039 79.7774 8.74997C79.5163 8.26955 79.1612 7.90401 78.7121 7.65335C78.2734 7.39226 77.7878 7.26171 77.2552 7.26171C76.7225 7.26171 76.2369 7.38703 75.7982 7.63769C75.3596 7.88834 75.0097 8.25388 74.7486 8.7343C74.4875 9.21472 74.357 9.77869 74.357 10.4262C74.357 11.0842 74.4875 11.6586 74.7486 12.1495C75.0097 12.6299 75.3596 13.0006 75.7982 13.2617C76.2369 13.5124 76.7225 13.6377 77.2552 13.6377C77.7878 13.6377 78.2734 13.5124 78.7121 13.2617C79.1612 13.0006 79.5163 12.6299 79.7774 12.1495C80.0385 11.6586 80.169 11.0894 80.169 10.4419Z" fill="white"/>
</svg>
`;
const cart = `<svg width="329" height="207" viewBox="0 0 329 207" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="328.914" height="207" rx="12" fill="url(#paint0_linear_2820_18796)"/>
<defs>
<linearGradient id="paint0_linear_2820_18796" x1="0" y1="103.5" x2="328.914" y2="103.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#485563"/>
<stop offset="1" stop-color="#29323C"/>
</linearGradient>
</defs>
</svg>

`;
const chip = `<svg width="52" height="35" viewBox="0 0 52 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2960_17342)">
<path d="M45.6469 0.578857H5.98647C2.68024 0.578857 0 3.17689 0 6.38173V28.8678C0 32.0727 2.68024 34.6707 5.98647 34.6707H45.6469C48.9531 34.6707 51.6333 32.0727 51.6333 28.8678V6.38173C51.6333 3.17689 48.9531 0.578857 45.6469 0.578857Z" fill="#F2E07C"/>
<path d="M45.6465 0.941406H5.9861C2.8865 0.941406 0.373779 3.37706 0.373779 6.3816V28.8677C0.373779 31.8722 2.8865 34.3079 5.9861 34.3079H45.6465C48.7461 34.3079 51.2588 31.8722 51.2588 28.8677V6.3816C51.2588 3.37706 48.7461 0.941406 45.6465 0.941406Z" stroke="#672525" stroke-width="0.737886"/>
<path d="M0.00732422 12.1207H16.5255" stroke="#672525" stroke-width="0.737886"/>
<path d="M16.5249 6.11694H33.0431" stroke="#672525" stroke-width="0.737886"/>
<path d="M39.4409 17.6248H51.8838" stroke="#672525" stroke-width="0.737886"/>
<path d="M33.043 11.3707H51.6257" stroke="#672525" stroke-width="0.737886" stroke-linecap="round"/>
<path d="M0.373779 23.8796H51.6255" stroke="#672525" stroke-width="0.737886" stroke-linecap="round"/>
<path d="M16.5249 24.3691V34.6366" stroke="#672525" stroke-width="0.737886" stroke-linecap="round"/>
<path d="M8.78223 12.1207V23.6438" stroke="#672525" stroke-width="0.737886" stroke-linecap="round"/>
<path d="M24.7849 24.6304V34.6374" stroke="#672525" stroke-width="0.737886" stroke-linecap="round"/>
<path d="M39.4409 11.3707V23.8795" stroke="#672525" stroke-width="0.737886" stroke-linecap="round"/>
<path d="M16.5249 0.362793V12.1209" stroke="#672525" stroke-width="0.737886" stroke-linecap="round"/>
<path d="M32.5269 23.8796V34.8877" stroke="#672525" stroke-width="0.737886"/>
<path d="M33.043 0.362793V11.3708" stroke="#672525" stroke-width="0.737886" stroke-linecap="round"/>
<path d="M22.0915 20.5263C23.7537 20.5263 25.1012 19.2272 25.1012 17.6248C25.1012 16.0224 23.7537 14.7234 22.0915 14.7234C20.4293 14.7234 19.0818 16.0224 19.0818 17.6248C19.0818 19.2272 20.4293 20.5263 22.0915 20.5263Z" stroke="#672525" stroke-width="0.737886"/>
<path d="M27.2975 20.5263C28.9598 20.5263 30.3072 19.2272 30.3072 17.6248C30.3072 16.0224 28.9598 14.7234 27.2975 14.7234C25.6353 14.7234 24.2878 16.0224 24.2878 17.6248C24.2878 19.2272 25.6353 20.5263 27.2975 20.5263Z" stroke="#672525" stroke-width="0.737886"/>
</g>
<defs>
<clipPath id="clip0_2960_17342">
<rect width="52" height="35" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const TabBar = ({ state, navigation }) => {
  //console.log(state.index)
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      }}>
      {state.routes.map((doc, i) => (
        <IconButton
          onPress={() => {
            navigation.navigate(doc.name);
          }}
          style={{
            borderRadius: 30,
            height: 37,
            paddingHorizontal: 20,
            backgroundColor: state.index === i ? "#484848" : null,
            color: state.index === i ? "white" : "black",
            borderWidth: state.index === i ? 0 : 1,
          }}
          key={i}
          title={doc.name}
        />
      ))}
    </View>
  );
};
