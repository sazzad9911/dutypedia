import React, { useRef } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

export default function AccountSearchBar({ onSort, onDate }) {
  const ref = useRef();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (ref) {
            ref.current.focus();
          }
        }}
        style={styles.inputBox}>
        <TextInput ref={ref} placeholder="eg. Parlour" style={{ flex: 1 }} />
        <SvgXml xml={icon} />
      </Pressable>

      <TouchableOpacity
        style={{
          marginLeft: 16,
        }}
        onPress={() => {
          if (onDate) {
            onDate();
          }
        }}>
        <SvgXml xml={date} />
      </TouchableOpacity>
      <View
        style={{
          height: 15,
          width: 1,
          backgroundColor: "#e6e6e6",
          marginHorizontal: 16,
        }}
      />
      <TouchableOpacity onPress={() => {
          if (onSort) {
            onSort();
          }
        }}>
        <SvgXml xml={sort} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  inputBox: {
    flex: 3,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 8,
    flexDirection: "row",
    padding: 8,
  },
});
const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.4438 16.4438L21.0001 21" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;
const date = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.25 1V3.25M15.75 1V3.25M1.5 16.75V5.5C1.5 4.90326 1.73705 4.33097 2.15901 3.90901C2.58097 3.48705 3.15326 3.25 3.75 3.25H17.25C17.8467 3.25 18.419 3.48705 18.841 3.90901C19.2629 4.33097 19.5 4.90326 19.5 5.5V16.75M1.5 16.75C1.5 17.3467 1.73705 17.919 2.15901 18.341C2.58097 18.7629 3.15326 19 3.75 19H17.25C17.8467 19 18.419 18.7629 18.841 18.341C19.2629 17.919 19.5 17.3467 19.5 16.75M1.5 16.75V9.25C1.5 8.65326 1.73705 8.08097 2.15901 7.65901C2.58097 7.23705 3.15326 7 3.75 7H17.25C17.8467 7 18.419 7.23705 18.841 7.65901C19.2629 8.08097 19.5 8.65326 19.5 9.25V16.75M10.5 10.75H10.508V10.758H10.5V10.75ZM10.5 13H10.508V13.008H10.5V13ZM10.5 15.25H10.508V15.258H10.5V15.25ZM8.25 13H8.258V13.008H8.25V13ZM8.25 15.25H8.258V15.258H8.25V15.25ZM6 13H6.008V13.008H6V13ZM6 15.25H6.008V15.258H6V15.25ZM12.75 10.75H12.758V10.758H12.75V10.75ZM12.75 13H12.758V13.008H12.75V13ZM12.75 15.25H12.758V15.258H12.75V15.25ZM15 10.75H15.008V10.758H15V10.75ZM15 13H15.008V13.008H15V13Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const sort = `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.64272 0C3.17195 0 3.69921 0 4.22844 0C4.23043 4.81762 4.22646 9.63524 4.23043 14.4529C4.57334 14.0541 4.91625 13.6577 5.2552 13.2566C5.63181 13.6878 6.00446 14.1236 6.37314 14.5641C5.39594 15.7117 4.41675 16.857 3.43756 18C2.46036 16.8524 1.47721 15.7094 0.5 14.5618C0.870664 14.126 1.24331 13.6901 1.61794 13.2566C1.95689 13.653 2.2998 14.0495 2.64073 14.4459C2.6447 9.6306 2.64073 4.8153 2.64272 0Z" fill="#484848"/>
<path d="M7.3999 0C11.1006 0 14.7993 0 18.5 0C18.5 0.619011 18.5 1.2357 18.5 1.85471C14.7993 1.85471 11.1006 1.85471 7.3999 1.85471C7.3999 1.2357 7.3999 0.619011 7.3999 0Z" fill="#484848"/>
<path d="M7.3999 4.63678C10.3077 4.63678 13.2136 4.63678 16.1214 4.63678C16.1214 5.25579 16.1214 5.87248 16.1214 6.49149C13.2136 6.49149 10.3077 6.49149 7.3999 6.49149C7.3999 5.87248 7.3999 5.25579 7.3999 4.63678Z" fill="#484848"/>
<path d="M7.3999 9.27356C9.51487 9.27356 11.6279 9.27356 13.7428 9.27356C13.7428 9.89257 13.7428 10.5093 13.7428 11.1283C11.6279 11.1283 9.51487 11.1283 7.3999 11.1283C7.3999 10.5093 7.3999 9.89257 7.3999 9.27356Z" fill="#484848"/>
<path d="M7.3999 13.9103C8.722 13.9103 10.0421 13.9103 11.3642 13.9103C11.3642 14.5294 11.3642 15.146 11.3642 15.7651C10.0421 15.7651 8.722 15.7651 7.3999 15.7651C7.3999 15.146 7.3999 14.5294 7.3999 13.9103Z" fill="#484848"/>
</svg>
`;
