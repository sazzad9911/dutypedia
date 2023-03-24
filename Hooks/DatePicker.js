import React,{useState} from "react";
import { View, Text, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { dateConverter } from "../action";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DatePicker({ value, style, onChange }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (onChange) {
      onChange(date);
    }
    hideDatePicker();
  };
  return (
    <Pressable onPress={showDatePicker}
      style={[{
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#E6E6E6",
        flexDirection: "row",
        maxWidth:130
      },style]}>
      <SvgXml xml={icon} />
      <Text
        style={{
          marginLeft: 8,
          fontSize: 12,
          color: "#A3A3A3",
        }}>
        {value ? dateConverter(value) : "mm/dd/yyyy"}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}
const icon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.33333 1V3M13.6667 1V3M1 15V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V15M1 15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15M1 15V8.33333C1 7.8029 1.21071 7.29419 1.58579 6.91912C1.96086 6.54405 2.46957 6.33333 3 6.33333H15C15.5304 6.33333 16.0391 6.54405 16.4142 6.91912C16.7893 7.29419 17 7.8029 17 8.33333V15M9 9.66667H9.00711V9.67378H9V9.66667ZM9 11.6667H9.00711V11.6738H9V11.6667ZM9 13.6667H9.00711V13.6738H9V13.6667ZM7 11.6667H7.00711V11.6738H7V11.6667ZM7 13.6667H7.00711V13.6738H7V13.6667ZM5 11.6667H5.00711V11.6738H5V11.6667ZM5 13.6667H5.00711V13.6738H5V13.6667ZM11 9.66667H11.0071V9.67378H11V9.66667ZM11 11.6667H11.0071V11.6738H11V11.6667ZM11 13.6667H11.0071V13.6738H11V13.6667ZM13 9.66667H13.0071V9.67378H13V9.66667ZM13 11.6667H13.0071V11.6738H13V11.6667Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
