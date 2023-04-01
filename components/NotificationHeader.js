import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

export default function NotificationHeader({ navigation, route }) {
  const inset = useSafeAreaInsets();
  return (
    <View>
      <View style={{ height: inset?.top }} />
      <View style={styles.container}>
        <SvgXml xml={icon} height="24" width="24" />
        <Text style={styles.text}>Notifications</Text>
      </View>
    </View>
  );
}
const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.1063 10.5C19.1112 9.56925 18.9328 8.64664 18.5811 7.78486C18.2295 6.92307 17.7116 6.13898 17.0569 5.47736C16.4023 4.81574 15.6237 4.28955 14.7657 3.92882C13.9077 3.5681 12.987 3.37991 12.0563 3.375H12C10.1136 3.37996 8.30613 4.13282 6.97398 5.46848C5.64184 6.80414 4.89375 8.61357 4.89375 10.5C4.89375 13.8 4.2 15.6844 3.61875 16.6781C3.5201 16.8509 3.46821 17.0464 3.46821 17.2453C3.46821 17.4442 3.5201 17.6397 3.61875 17.8125C3.71682 17.9843 3.85879 18.1269 4.03011 18.2257C4.20144 18.3246 4.39596 18.3761 4.59375 18.375H8.625V18.75C8.625 19.6451 8.98058 20.5035 9.61352 21.1365C10.2465 21.7694 11.1049 22.125 12 22.125C12.8951 22.125 13.7536 21.7694 14.3865 21.1365C15.0194 20.5035 15.375 19.6451 15.375 18.75V18.375H19.4063C19.604 18.3761 19.7986 18.3246 19.9699 18.2257C20.1412 18.1269 20.2832 17.9843 20.3813 17.8125C20.4799 17.6397 20.5318 17.4442 20.5318 17.2453C20.5318 17.0464 20.4799 16.8509 20.3813 16.6781C19.8 15.6844 19.1063 13.8 19.1063 10.5ZM14.625 18.75C14.625 19.4462 14.3484 20.1139 13.8562 20.6062C13.3639 21.0984 12.6962 21.375 12 21.375C11.3038 21.375 10.6361 21.0984 10.1438 20.6062C9.65157 20.1139 9.375 19.4462 9.375 18.75V18.375H14.625V18.75ZM19.7344 17.4375C19.7005 17.4944 19.6524 17.5415 19.5949 17.5744C19.5375 17.6072 19.4725 17.6247 19.4063 17.625H4.59375C4.52754 17.6247 4.46254 17.6072 4.40506 17.5744C4.34757 17.5415 4.29954 17.4944 4.26563 17.4375C4.23413 17.3797 4.21841 17.3146 4.22006 17.2487C4.2217 17.1829 4.24065 17.1187 4.275 17.0625C4.89375 15.9844 5.64375 13.9687 5.64375 10.5C5.64252 9.66405 5.80595 8.83605 6.12472 8.06326C6.44348 7.29048 6.91134 6.58805 7.50157 5.99607C8.0918 5.4041 8.79285 4.93418 9.5647 4.61314C10.3365 4.2921 11.1641 4.12623 12 4.125H12.0469C12.8799 4.12868 13.7041 4.29656 14.4722 4.61905C15.2403 4.94153 15.9373 5.41229 16.5233 6.00439C17.1093 6.59649 17.5728 7.29831 17.8873 8.06971C18.2018 8.84111 18.3612 9.66696 18.3563 10.5C18.3563 13.9687 19.1063 15.9844 19.725 17.0625C19.7594 17.1187 19.7783 17.1829 19.7799 17.2487C19.7816 17.3146 19.7659 17.3797 19.7344 17.4375ZM20.9156 6.53437C20.8661 6.55907 20.8116 6.57191 20.7563 6.57187C20.6864 6.57236 20.6177 6.5533 20.5581 6.51686C20.4985 6.48042 20.4502 6.42803 20.4188 6.36562C19.6502 4.8086 18.4659 3.49452 16.9969 2.56875C16.955 2.54228 16.9188 2.50782 16.8902 2.46735C16.8617 2.42687 16.8414 2.38118 16.8305 2.33286C16.8196 2.28454 16.8184 2.23456 16.8268 2.18576C16.8353 2.13696 16.8532 2.09029 16.8797 2.04843C16.9062 2.00658 16.9406 1.97034 16.9811 1.9418C17.0216 1.91325 17.0673 1.89296 17.1156 1.88208C17.1639 1.8712 17.2139 1.86994 17.2627 1.87838C17.3115 1.88681 17.3581 1.90478 17.4 1.93125C18.9823 2.93115 20.2574 4.34899 21.0844 6.02812C21.1069 6.07238 21.1203 6.12066 21.124 6.17017C21.1277 6.21967 21.1215 6.26941 21.1058 6.3165C21.0901 6.3636 21.0652 6.4071 21.0325 6.4445C20.9999 6.4819 20.9602 6.51245 20.9156 6.53437ZM3.24375 6.57187C3.18844 6.57191 3.13387 6.55907 3.08438 6.53437C3.03984 6.51245 3.0001 6.4819 2.96746 6.4445C2.93482 6.4071 2.90993 6.3636 2.89423 6.3165C2.87853 6.26941 2.87234 6.21967 2.87601 6.17017C2.87969 6.12066 2.89315 6.07238 2.91563 6.02812C3.74264 4.34899 5.01772 2.93115 6.6 1.93125C6.64186 1.90478 6.68853 1.88681 6.73733 1.87838C6.78613 1.86994 6.83612 1.8712 6.88443 1.88208C6.93275 1.89296 6.97845 1.91325 7.01892 1.9418C7.05939 1.97034 7.09385 2.00658 7.12032 2.04843C7.14679 2.09029 7.16475 2.13696 7.17319 2.18576C7.18162 2.23456 7.18036 2.28454 7.16948 2.33286C7.1586 2.38118 7.13831 2.42687 7.10977 2.46735C7.08122 2.50782 7.04499 2.54228 7.00313 2.56875C5.53412 3.49452 4.34983 4.8086 3.58125 6.36562C3.54981 6.42803 3.50154 6.48042 3.44191 6.51686C3.38227 6.5533 3.31364 6.57236 3.24375 6.57187Z" fill="#4D4E4F"/>
</svg>
`;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
});
