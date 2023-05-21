import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { View,Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch } from "react-redux";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";

export default function ConfirmationScreen({navigation}) {
  const isFocused=useIsFocused()
  const dispatch=useDispatch()

  React.useEffect(() => {
    if (isFocused) {
       dispatch(setHideBottomBar(true));
    } else {
      dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      // dispatch(setHideBottomBar(true));
    }, 50);
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
      }}>
      <SvgXml xml={icon} />
      <Text style={{
        marginTop:32,
        color:"#4CD964",
        fontSize:24
      }}>Request Successfully sent</Text>
      <Text style={{
        marginTop:24,
        fontSize:16,
        fontWeight:"400",
        color:"#484848",
        
      }}>
        Thank you for submitting your verification documents. We are now
        reviewing your information and will notify you of the verification
        status via our in-app chat on your mobile device or via our chat feature
        on the desktop website. If we need any additional information, we will
        contact you directly via chat. Thank you for your patience and for being
        a part of our community.
      </Text>
      <Text onPress={()=>{
        navigation.navigate("AccountBalance")
      }} style={{
        color:"#4CD964",
        textDecorationLine:"underline",
        marginTop:24,
        fontSize:16,
      }}>Back to dashboard</Text>
    </View>
  );
}
const icon = `<svg width="76" height="77" viewBox="0 0 76 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3268_21895)">
<path d="M36.005 0.5H39.9416C48.6637 1.04031 57.2434 4.47219 63.6322 10.4869C70.9591 17.1072 75.4122 26.6666 76 36.5109V40.4C75.4478 50.2859 70.9709 59.8809 63.6203 66.5309C57.2138 72.4863 48.6934 75.9538 39.9772 76.5H36.0941C26.2378 75.9419 16.6606 71.4709 10.0166 64.1559C4.00781 57.7791 0.558125 49.2172 0 40.5069V36.5347C0.558125 27.2425 4.48281 18.1403 11.1744 11.6269C17.6819 4.97687 26.7425 1.07 36.005 0.5ZM55.8006 23.0209C47.2981 30.8941 38.8312 38.8028 30.3584 46.7056C26.7069 42.8344 23.1325 38.8978 19.4334 35.0681C17.3137 32.8534 13.2763 33.3344 11.6909 35.9528C10.4263 37.8587 10.6875 40.59 12.3084 42.2109C18.145 48.4987 24.0291 54.745 29.8716 61.0328C40.2088 51.4497 50.4984 41.8191 60.8059 32.2003C62.1063 30.9297 63.7806 29.7541 64.1547 27.8481C64.7306 25.6216 63.5194 23.1278 61.4472 22.16C59.6184 21.2516 57.2731 21.6078 55.8006 23.0209Z" fill="#4ADE80"/>
<path d="M55.8006 23.0206C57.2731 21.6075 59.6185 21.2512 61.4472 22.1596C63.5194 23.1275 64.7306 25.6212 64.1547 27.8478C63.7806 29.7537 62.1063 30.9293 60.806 32.2C50.4985 41.8187 40.2088 51.4493 29.8716 61.0325C24.0291 54.7446 18.145 48.4984 12.3085 42.2106C10.6875 40.5896 10.4263 37.8584 11.691 35.9525C13.2763 33.334 17.3138 32.8531 19.4335 35.0678C23.1325 38.8975 26.7069 42.834 30.3585 46.7053C38.8313 38.8025 47.2981 30.8937 55.8006 23.0206Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_3268_21895">
<rect width="76" height="76" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
`;
