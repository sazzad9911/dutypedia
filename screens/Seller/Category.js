import React from "react";
import { ScrollView } from "react-native";
import MainCategoryCart from "./../../Cart/Seller/MainCategoryCart";
import { useSelector, useDispatch } from "react-redux";

const Category = (props) => {
  const allData = useSelector((state) => state.allData);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {allData.map((data, i) => (
        <MainCategoryCart
          onPress={() => {
            if (data.data) {
              props.navigation.navigate("SubCategories", {
                title: data.title,
                data: data.data,
                image:data.image
              });
            } else {
              props.navigation.navigate("TableData", {
                title: data.title,
                list:data.list
              });
            }
          }}
          key={i}
          title={data.title}
          icon={data.icon}
          {...props}
          color={data.color}
        />
      ))}
    </ScrollView>
  );
};

export default Category;
