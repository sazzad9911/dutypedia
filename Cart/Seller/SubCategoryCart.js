import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor, textColor } from "./../../assets/colors";
import { useSelector, useDispatch } from "react-redux";

const SubCategoryCart = ({ title, onPress, deleteData, data, id, nextId }) => {
  const [Selected, setSelected] = React.useState(false);
  const allData = useSelector((state) => state.allData);
  const listData= useSelector((state) => state.listData)

  React.useEffect(() => {
    
  if (listData) {
      let arr=listData.filter(d=>{
        if(d.title===title || d.subTitle&&d.subTitle===title){
          //console.log(title);
          return d
        }
      });
      if(arr.length > 0) { 
        setSelected(true);
        //console.log(true);
      }else {
        setSelected(false);
        //console.log(false);
      }
    }
  }, [listData&& listData.length]);
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={{
        flexDirection: "row",
        marginVertical: 5,
        marginHorizontal: 20,
        backgroundColor: Selected ? "#C2F3A9" : primaryColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "space-between",
        borderRadius: 5,
        shadowColor: "#d5d5d5",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          fontFamily: "Poppins-Medium",
        }}
      >
        {title}
      </Text>
      {data.deletable ? (
        <TouchableOpacity
          onPress={() => {
            deleteData(data.title);
          }}
        >
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      ) : (
        <AntDesign name="right" size={24} color={textColor} />
      )}
    </TouchableOpacity>
  );
};

export default SubCategoryCart;
