import React from "react";
import { ScrollView } from "react-native";
import MainCategoryCart from "./../../Cart/Seller/MainCategoryCart";
import {
  BuilderIcon,
  BusinessServiceIcon,
  CookerIcon,
  ElectricIcon,
  EntertainmentIcon,
  HouseKeeperIcon,
  ItIcon,
  MusicIcon,
  OnlineTutionIcon,
  PainterIcon,
  SaloonIcon,
  RentIcon,
} from "../../assets/icon";
import { useSelector, useDispatch } from "react-redux";

const Category = (props) => {
  const allData = useSelector((state) => state.allData);

  const DATA = [
    {
      title: "Builder Services",
      icon: BuilderIcon,
      color: "#FF9C68",
    },
    {
      title: "Business Services",
      icon: BusinessServiceIcon,
      color: "blue",
    }, 
    {
      title: "Cooking Services",
      icon: CookerIcon,
      color: "#ED488B",
    },
    {
      title: "Electrician & Mechanician",
      icon: ElectricIcon,
      color: "#FFB800",
    },
    {
      title: "Entertainment",
      icon: EntertainmentIcon,
      color: "#8E4DD5",
    },
    {
      title: "House Keeper",
      icon: HouseKeeperIcon,
      color: "#FF4155",
    },
    {
      title: "It & Technology",
      icon: ItIcon,
      color: "#2381FF",
    },
    {
      title: "Music & Audio Service",
      icon: MusicIcon,
      color: "#FEB944",
    },
    {
      title: "Online Tution",
      icon: OnlineTutionIcon,
      color: "#FBB540",
    },
    {
      title: "Painter",
      icon: PainterIcon,
      color: "#D934BF",
    },
    {
      title: "Parlour & Saloon",
      icon: SaloonIcon,
      color: "#FF5364",
    },
    {
      title: "Labor",
      icon: RentIcon,
      color: "#61AFF6",
    },
  ];
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
